import ordersMongo from "./orders.mongo.js";
import carsMongo from "./offers.mongo.js";

async function getAvilableCars(lastIndex: number, receiptDate: Date, returnDate: Date, filters: any = {}) {
  const unvilableCars = await ordersMongo.find(
    {
      $or: [
        { $and: [{ date_of_return: { $gt: receiptDate } }, { date_of_return: { $lt: returnDate } }] },
        { $and: [{ date_of_receipt: { $lt: returnDate } }, { date_of_return: { $gt: receiptDate } }] },
      ],
    },
    "-_id car_id"
  );

  const orders = unvilableCars.map(order => order.car_id);

  return await carsMongo.find({ _id: { $nin: orders }, index: { $gt: lastIndex }, ...filters }, "-_id -__v").limit(5);
}

export { getAvilableCars };
