import { Response } from "express";
import { getAvilableCars, getOfferByIndex, saveOrder } from "../../models/offers.model.js";
import { CustomRequest, RequestWithQuery, UserRequest, orderData, queryBasicData } from "../../types/basicTypes.js";
import { updateUserOrders } from "../../models/account.model.js";

const validateOrderData = (userDataOb: orderData): boolean => {
  const { date_of_receipt, date_of_return, place_of_receipt, place_of_return } = userDataOb;

  if (date_of_receipt && date_of_return && place_of_receipt && place_of_return && new Date(date_of_receipt) < new Date(date_of_return)) return true;
  else return false;
};

async function httpGetOffers(req: RequestWithQuery<queryBasicData>, res: Response) {
  const lastIndex = req.query.index ? Number(req.query.index) : Infinity;

  const reciptDate = req.query.rd ? new Date(req.query.rd) : null;
  const returnDate = req.query.rtd ? new Date(req.query.rtd) : null;

  const filters = { ...req.query };

  delete filters.pul, delete filters.rd, delete filters.rl, delete filters.rtd, delete filters.index;

  if (
    (reciptDate !== null && isNaN(reciptDate.getDate())) ||
    (returnDate !== null && isNaN(returnDate.getDate())) ||
    (reciptDate === null && returnDate !== null) ||
    (returnDate === null && reciptDate !== null)
  )
    res.status(404).json({ status: "error", message: "your data in filters is invalid" });
  else {
    const avilableCars = await getAvilableCars(lastIndex, filters, reciptDate, returnDate);

    if (avilableCars.length) res.status(200).json({ status: "ok", message: "Send avilable cars", payload: avilableCars });
    else res.status(404).json({ status: "error", message: "your filtres propably are too demanding" });
  }
}

async function httpPostOrder(req: UserRequest & CustomRequest<{ userData: orderData; productIndex: number }>, res: Response) {
  if (req.user && req.body.productIndex && validateOrderData(req.body.userData)) {
    const product = await getOfferByIndex(req.body.productIndex);

    const chargedAccount = true;

    if (product && chargedAccount) {
      const user_id = req.user._id;
      const car_id = product.id as string;
      const order = { ...req.body.userData, user_id, car_id, cancel: false };

      const orderResult = await saveOrder(order);

      if (orderResult) {
        const userResult = await updateUserOrders(orderResult._id.toString(), product.index, req.user.email);
        if (userResult) res.status(202).json({ status: "ok", message: "Created order" });
        else res.status(404).json({ status: "error", message: "This order is unvilable" });
      } else res.status(404).json({ status: "error", message: "This order is unvilable" });
    }
  } else res.status(404).json({ status: "error", message: "bad data request" });
}

export { httpGetOffers, httpPostOrder };

// const car = {
//   year: 2019,
//   number_of_seats: 5,
//   drive_type: "rear axle",
//   fuel_type: "gasoline",
//   daily_price: 200,
//   power: 400,
//   brand: "Ford",
//   engine_capacity: "5.0l",
//   color: "blue",
//   transmission: "manual",
//   fuel_usage_city: "15l",
//   fuel_usage_outcity: "13l",
// };

// const createorder = {
//   car_id: "64bd6876c26883e911251521",
//   user_id: "64bd363b722d8b96abd5dad1",
//   date_of_receipt: new Date(2023, 6, 25),
//   date_of_return: new Date(2023, 6, 27),
//   cancel: false
// };
