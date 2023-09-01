import protect from "../../utils/protect.js";
import express from "express";
import { deleteProfile, httpLogInWithToken, updateProfile, logoutUser, httpRegisterUser, httpGetUserOrderedProducts } from "./account.controler.js";

const accountRoute = express.Router();

accountRoute.post("/log-in", httpLogInWithToken);
accountRoute.post("/logout", logoutUser);
accountRoute.post("/register", httpRegisterUser);
accountRoute.route("/account").put(protect, updateProfile).delete(protect, deleteProfile);
accountRoute.route("/user_orders").get(protect, httpGetUserOrderedProducts);

export default accountRoute;
