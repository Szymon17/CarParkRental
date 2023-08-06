import express from "express";
import accountRoute from "./account/account.route.js";
import offersRoute from "./offers/offers.route.js";
import localizationsRoute from "./localizations/localizations.route.js";

const api = express.Router();

api.use(accountRoute);
api.use(offersRoute);
api.use(localizationsRoute);

export default api;
