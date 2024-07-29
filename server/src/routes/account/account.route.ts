import protect from "../../utils/protect.js";
import express = require("express");
import { deleteProfile, httpLogInWithToken, updateProfile, logoutUser, httpRegisterUser, httpGetUserOrderedProducts } from "./account.controler.js";

const accountRoute = express.Router();

accountRoute.get("/test", (req, res) => res.json({ test: "test" }));
accountRoute.post("/log-in", httpLogInWithToken);
accountRoute.post("/logout", logoutUser);
accountRoute.post("/register", httpRegisterUser);
accountRoute.route("/user_orders").get(protect, httpGetUserOrderedProducts as any);
accountRoute
  .route("/account")
  .put(protect, updateProfile as any)
  .delete(protect, deleteProfile as any);

export default accountRoute;
