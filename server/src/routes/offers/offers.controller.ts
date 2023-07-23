import { Request, Response } from "express";
import { getAvilableCars } from "../../models/offers.model.js";

async function httpGetOffers(req: Request, res: Response) {
  console.log(req.query);

  // const car = await carsMongo.find({ ...req.query }, "-_id -__v"); //id będzie potrzebne do wykluczenia zabukowanych aut i przenieść to do warsty model
  const dataOdbioru = new Date(2023, 6, 25);
  const dataZwrotu = new Date(2023, 6, 27);

  console.log(dataOdbioru.toJSON(), dataZwrotu.toJSON());

  const avilableCars = await getAvilableCars(dataOdbioru, dataZwrotu); //ustawić parametry jutro

  res.status(200).json(avilableCars);
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
