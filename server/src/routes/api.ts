import express from "express";
import productsRouter from "./products/products.route.js";

const api = express.Router();

api.use(productsRouter);

export default api;
