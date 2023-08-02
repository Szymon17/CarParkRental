import ordersMongo from "./orders.mongo.js";
import carsMongo from "./offers.mongo.js";
import { order } from "../types/basicTypes.js";

async function getUnvilableCars(receiptDate: Date, returnDate: Date) {
  return (await ordersMongo.find(
    {
      $or: [
        { $and: [{ date_of_return: { $gt: receiptDate } }, { date_of_return: { $lt: returnDate } }] },
        { $and: [{ date_of_receipt: { $lt: returnDate } }, { date_of_return: { $gt: receiptDate } }] },
      ],
    },
    "-_id car_id"
  )) as { car_id: string }[];
}

async function getAvilableCars(lastIndex: number, filters: any = {}, receiptDate: Date, returnDate: Date) {
  let unvilableCars: { car_id: string }[] = await getUnvilableCars(receiptDate, returnDate);

  const orders = unvilableCars.map(order => order.car_id);
  return await carsMongo
    .find({ _id: { $nin: orders }, index: { $lt: lastIndex }, ...filters }, "-_id -__v")
    .sort({ index: -1 })
    .limit(4);
}

async function getOfferByIndex(index: number) {
  return await carsMongo.findOne({ index: index });
}

async function saveOrder(order: order) {
  const unvilableCars = await getUnvilableCars(new Date(order.date_of_receipt), new Date(order.date_of_return));
  const matchCar = unvilableCars.find(car => car.car_id === order.car_id);

  if (matchCar) return;
  else return await ordersMongo.create(order);
}

export { getAvilableCars, getOfferByIndex, saveOrder };
