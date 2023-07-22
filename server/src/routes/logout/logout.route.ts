import express from "express";
import { logoutUser } from "./logout.controler.js";

const logoutRoute = express.Router();

logoutRoute.post("/logout", logoutUser);

export default logoutRoute;
