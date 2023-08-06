import protect from "../../utils/protect.js";
import { httpGetOffers, httpGetProductByIndex, httpPostOrder } from "./offers.controller.js";
import express from "express";

const offersRoute = express.Router();

offersRoute.get("/offers", httpGetOffers);
offersRoute.get("/offers/product", httpGetProductByIndex);
offersRoute.route("/offers/order").post(protect, httpPostOrder);

export default offersRoute;
