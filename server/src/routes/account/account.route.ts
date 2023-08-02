import protect from "../../utils/protect.js";
import express from "express";
import { deleteProfile, httpLogInWithToken, updateProfile, logoutUser, httpAddUser } from "./account.controler.js";

const accountRoute = express.Router();

accountRoute.post("/log-in", httpLogInWithToken);
accountRoute.post("/logout", logoutUser);
accountRoute.post("/register", httpAddUser);
accountRoute.route("/account").put(protect, updateProfile).delete(protect, deleteProfile);

export default accountRoute;
