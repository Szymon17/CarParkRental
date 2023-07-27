import ordersMongo from "./orders.mongo.js";
import carsMongo from "./offers.mongo.js";
import { order } from "../types/basicTypes.js";

async function getAvilableCars(lastIndex: number, filters: any = {}, receiptDate: Date | null, returnDate: Date | null) {
  let unvilableCars: order[];

  if (returnDate && receiptDate)
    unvilableCars = (await ordersMongo.find(
      {
        $or: [
          { $and: [{ date_of_return: { $gt: receiptDate } }, { date_of_return: { $lt: returnDate } }] },
          { $and: [{ date_of_receipt: { $lt: returnDate } }, { date_of_return: { $gt: receiptDate } }] },
        ],
      },
      "-_id car_id"
    )) as order[];
  else unvilableCars = [];

  const orders = unvilableCars.map(order => order.car_id);

  return await carsMongo.find({ _id: { $nin: orders }, index: { $gt: lastIndex }, ...filters }, "-_id -__v").limit(5);
}

export { getAvilableCars };
