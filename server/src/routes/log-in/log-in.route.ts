import express from "express";
import { httpLogInWithToken } from "./log-in.controller.js";

const logInRoute = express.Router();

logInRoute.post("/log-in", httpLogInWithToken);

export default logInRoute;
