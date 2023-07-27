import { Response } from "express";
import { getAvilableCars } from "../../models/offers.model.js";
import { RequestWithBodyAndQuery, queryBasicData } from "../../types/basicTypes.js";

async function httpGetOffers(req: RequestWithBodyAndQuery<{ lastIndex: number }, queryBasicData>, res: Response) {
  const lastIndex = req.body.lastIndex | 0;

  const reciptDate = req.query.rd ? new Date(req.query.rd) : null;
  const returnDate = req.query.rtd ? new Date(req.query.rtd) : null;

  const filters = { ...req.query };

  delete filters.pul, delete filters.rd, delete filters.rl, delete filters.rtd;

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

export { httpGetOffers };

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
