import jwt = require("jsonwebtoken");
import asyncHandler = require("express-async-handler");
import usersMongo from "../models/users.mongo.js";
import { UserRequest } from "../types/basicTypes.js";
import { Request } from "express";

export interface ProtectUserReques extends Request {
  user?: any;
}

export default asyncHandler(async (req: ProtectUserReques, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_TOKEN || "SecretKey");
      if (decoded && decoded.email) req.user = await usersMongo.findOne({ email: decoded.email }, "-__v -password -createdAt");

      next();
    } catch (error) {
      res.status(401).send({ error: "Not authorized, no token" });
    }
  } else res.status(401).send({ error: "Not authorized, no token" });
});
