import protect from "../../utils/protect.js";
import { httpGetOffers, httpPostOrder } from "./offers.controller.js";
import express from "express";

const offersRoute = express.Router();

offersRoute.get("/offers", httpGetOffers);
offersRoute.route("/offers/order").post(protect, httpPostOrder);

export default offersRoute;
