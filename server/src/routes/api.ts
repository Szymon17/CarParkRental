import express from "express";
import logInRoute from "./log-in/log-in.route.js";
import registerRoute from "./register/register.route.js";
import accountRoute from "./account/account.route.js";
import logoutRoute from "./logout/logout.route.js";

const api = express.Router();

api.use(registerRoute);
api.use(logInRoute);
api.use(accountRoute);
api.use(logoutRoute);

export default api;
