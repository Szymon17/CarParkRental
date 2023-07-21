import express from "express";
import { httpAddUser } from "./register.controller.js";

const registerRoute = express.Router();

registerRoute.post("/register", httpAddUser);

export default registerRoute;
