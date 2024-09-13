import client from "../services/pg.js";
import { aditionalfilters, dataToGetoffers, order } from "../types/basicTypes.js";

async function getUnvilableCars(receiptDate: Date, returnDate: Date) {
  const query = `
  SELECT car_id
  FROM orders
  WHERE 
    (
      (date_of_return > $1 AND date_of_return < $2) OR
      (date_of_receipt < $2 AND date_of_return > $1)
    )
`;

  try {
    const result = await client.query<{ car_id: string }>(query, [receiptDate, returnDate]);
    return result.rows;
  } catch (error) {
    console.error("Geting unvilable cars error", error);
    throw error;
  }
}

async function getAvilableCars(lastIndex: number, filters: aditionalfilters, count: number, basicFiltersData: dataToGetoffers) {
  const { receiptDate, returnDate, receiptLocation, price_from, price_to } = basicFiltersData;

  let unvilableCars: { car_id: string }[] = await getUnvilableCars(receiptDate, returnDate);

  const orders = unvilableCars.map(order => order.car_id);

  if (count >= 7) count = 6;

  const filterConditions = [];
  const filterValues = [lastIndex, price_from, price_to, receiptLocation, count];

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      filterConditions.push(`"${key}" = $${filterValues.length + 1}`);
      filterValues.push(value);
    }
  }

  const query = `
  SELECT * FROM cars WHERE 
  ${orders.length > 0 ? `id NOT IN (${orders.join(",")}) AND` : ""}
  index < $1
  AND daily_price BETWEEN $2 AND $3
  AND localisation = $4
  ${filterConditions.length > 0 ? `AND ${filterConditions.join(" AND ")}` : ""}
  ORDER BY "index" DESC
  LIMIT $5
  `;

  try {
    const result = await client.query(query, filterValues);
    return result.rows;
  } catch (error) {
    console.error("Błąd podczas wykonywania zapytania:", error);
    throw error;
  }
}

async function getOfferByIndex(index: number) {
  try {
    const res = await client.query(`SELECT * FROM cars WHERE id = $1`, [index]);
    return res.rows[0];
  } catch (error) {
    console.error("Błąd podczas wykonywania zapytania:", error);
    throw error;
  }
}

async function getOffersById(carsId: string[]) {
  return (await client.query<Car>(`SELECT * FROM cars WHERE id = ANY($1)`, [carsId])).rows;
}

async function saveOrder(order: order) {
  const unvilableCars = await getUnvilableCars(new Date(order.date_of_receipt), new Date(order.date_of_return));
  const matchCar = unvilableCars.find(car => car.car_id === order.car_id.toString());

  if (matchCar) return;
  else {
    const query = `
    INSERT INTO orders (car_id, user_id, date_of_receipt, date_of_return, place_of_receipt, place_of_return, cancel)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

    const values = [
      order.car_id,
      order.user_id,
      order.date_of_receipt,
      order.date_of_return,
      order.place_of_receipt,
      order.place_of_return,
      order.cancel,
    ];
    const result = await client.query<order>(query, values);

    return result.rows[0];
  }
}

async function getOrders(ordersId: string[]) {
  const query = `
  SELECT *
  FROM orders
  WHERE id = ANY($1)
  ORDER BY id DESC;
`;
  try {
    const res = await client.query<Reservation>(query, [ordersId]);
    return res.rows;
  } catch (err) {
    console.error(err);
  }
}

export { getAvilableCars, getOfferByIndex, saveOrder, getOrders, getOffersById };
