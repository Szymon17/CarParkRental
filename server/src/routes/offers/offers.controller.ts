import { Response } from "express";
import { getAvilableCars, getOfferByIndex, getOffersById, getOrders, saveOrder } from "../../models/offers.model.js";
import { CustomRequest, RequestWithQuery, UserRequest, aditionalfilters, orderData, queryBasicData } from "../../types/basicTypes.js";
import { getThreeUserOrders, updateUserOrders } from "../../models/account.model.js";
import { ObjectId } from "mongoose";

const validateOrderData = (userDataOb: orderData): boolean => {
  const { date_of_receipt, date_of_return, place_of_receipt, place_of_return } = userDataOb;

  if (date_of_receipt && date_of_return && place_of_receipt && place_of_return && new Date(date_of_receipt) < new Date(date_of_return)) return true;
  else return false;
};

const validateGetOffersData = (reciptDate: Date, returnDate: Date): boolean => {
  return (
    reciptDate !== null &&
    !isNaN(reciptDate.getDate()) &&
    returnDate !== null &&
    !isNaN(returnDate.getDate()) &&
    reciptDate < returnDate &&
    reciptDate > new Date()
  );
};

const createFilters = (query: queryBasicData): aditionalfilters => {
  const filters: aditionalfilters = {};

  if (query.drive_type) filters.drive_type = query.drive_type;
  if (query.fuel_type) filters.fuel_type = query.fuel_type;
  if (query.fuel_type) filters.fuel_type = query.fuel_type;
  if (query.number_of_seats) filters.number_of_seats = query.number_of_seats;
  if (query.brand) filters.brand = query.brand;
  if (query.car_type) filters.car_type = query.car_type;

  return filters;
};

async function httpGetOffers(req: RequestWithQuery<queryBasicData>, res: Response) {
  const tenDaysInMs = 864000000;
  const lastIndex = req.query.index ? Number(req.query.index) : Infinity;

  const receiptDate = req.query.rd ? new Date(req.query.rd) : null;
  const returnDate = req.query.rtd ? new Date(req.query.rtd) : null;

  const receiptLocation = req.query.pul;
  const returnLocation = req.query.rl;

  const price_from = Number(req.query.price_from) || 0;
  const price_to = Number(req.query.price_to) || 500;

  const filters = createFilters(req.query);

  if (validateGetOffersData(receiptDate, returnDate) && receiptLocation !== null && returnLocation !== null) {
    const timeDiff = returnDate.getTime() - receiptDate.getTime();

    if (timeDiff > tenDaysInMs) return res.status(404).json({ status: "error", message: "your rent time is too long" });

    const avilableCars = await getAvilableCars(lastIndex, filters, { returnDate, receiptLocation, receiptDate, price_from, price_to });

    if (avilableCars.length === 0) return res.status(404).json({ status: "error", message: "your filtres propably are too demanding" });
    else return res.status(200).json({ status: "ok", message: "Send avilable cars", payload: avilableCars });
  } else return res.status(404).json({ status: "error", message: "your data in filters is invalid" });
}

async function httpPostOrder(req: UserRequest & CustomRequest<{ userData: orderData; productIndex: number }>, res: Response) {
  console.log(req.user && req.body.productIndex && validateOrderData(req.body.userData));
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

async function httpGetProductByIndex(req: RequestWithQuery<{ index: number }>, res: Response) {
  const index = Number(req.query.index) || -1;

  if (index !== -1) {
    const product = await getOfferByIndex(index);
    if (product) return res.status(200).json({ status: "ok", message: "Responsed product", payload: product });
    else return res.status(404).json({ status: "error", message: "Your product index is invalid" });
  } else return res.status(404).json({ status: "error", message: "There is nothing to return" });
}

async function httpGetUserOrderedProducts(req: UserRequest & RequestWithQuery<{ idnex: string }>, res: Response) {
  const user = req.user;
  const index = req.query.index ? Number(req.query.index) : -1;

  if (index !== -1 && user) {
    const payload = await getThreeUserOrders(user.orders, index);

    if (payload.length > 0) return res.status(200).json({ status: "ok", message: "Responsed user orders", payload });
    else return res.status(404).json({ status: "error", message: "lastIndex is poprably invalid" });
  } else return res.status(404).json({ status: "error", message: "There is no user" });
}

export { httpGetOffers, httpPostOrder, httpGetProductByIndex, httpGetUserOrderedProducts };
