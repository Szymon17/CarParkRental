import ordersMongo from "./orders.mongo.js";
import carsMongo from "./offers.mongo.js";

async function getAvilableCars(receiptDate: Date, returnDate: Date, filters: any = {}) {
  const unvilableCars = await ordersMongo.find(
    {
      $or: [
        { $and: [{ date_of_return: { $gt: receiptDate } }, { date_of_return: { $lt: returnDate } }] },
        { $and: [{ date_of_receipt: { $lt: returnDate } }, { date_of_return: { $gt: receiptDate } }] },
      ],
    },
    "-_id car_id"
  );

  console.log(unvilableCars);

  const orders = unvilableCars.map(order => order.car_id);

  return await carsMongo.find({ _id: { $nin: orders }, ...filters }, "-_id -__v");
}

export { getAvilableCars };
