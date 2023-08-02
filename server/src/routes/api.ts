import express from "express";
import accountRoute from "./account/account.route.js";
import offersRoute from "./offers/offers.route.js";

const api = express.Router();

api.use(accountRoute);
api.use(offersRoute);

export default api;
