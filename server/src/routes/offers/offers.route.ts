import { httpGetOffers } from "./offers.controller.js";
import express from "express";

const offersRoute = express.Router();

offersRoute.post("/offers", httpGetOffers);

export default offersRoute;
