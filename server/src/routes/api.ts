import express from "express";
import productsRouter from "./products/products.route.js";
import logInRoute from "./log-in/log-in.route.js";
import registerRoute from "./register/register.route.js";

const api = express.Router();

api.use(productsRouter);
api.use(registerRoute);
api.use(logInRoute);

export default api;
