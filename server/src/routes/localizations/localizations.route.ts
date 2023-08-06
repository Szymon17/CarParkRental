import express from "express";
import { httpGetLocalizations } from "./localizations.controller.js";

const localizationsRoute = express.Router();

localizationsRoute.get("/localizations", httpGetLocalizations);

export default localizationsRoute;
