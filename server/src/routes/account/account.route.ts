import protect from "../../utils/protect.js";
import express from "express";
import { updateProfile } from "./account.controler.js";

const accountRoute = express.Router();

accountRoute.route("/account").put(protect, updateProfile);

export default accountRoute;
