import protect from "../../utils/protect.js";
import express from "express";
import { deleteProfile, updateProfile } from "./account.controler.js";

const accountRoute = express.Router();

accountRoute.route("/account").put(protect, updateProfile).delete(protect, deleteProfile);

export default accountRoute;
