import express from "express";
import { getProducts } from "./products.controller.js";

const productsRouter = express.Router();

productsRouter.get("/products", getProducts);
export default productsRouter;
