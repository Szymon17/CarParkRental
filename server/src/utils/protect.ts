import jwt = require("jsonwebtoken");
import asyncHandler = require("express-async-handler");
import { user, userData, UserRequest } from "../types/basicTypes.js";
import { Request } from "express";
import client from "../services/pg.js";

export interface ProtectUserReques extends Request {
  user?: any;
}

export default asyncHandler(async (req: ProtectUserReques, res, next) => {
  const token = req.cookies.jwt;

  if (token && process.env.SECRET_KEY) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded && typeof decoded !== "string" && decoded.email) {
        req.user = (await client.query<user>("SELECT * from users WHERE email = $1", [decoded.email]))?.rows[0];
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ error: "Not authorized, no token" });
    }
  } else res.status(401).send({ error: "Not authorized, no token" });
});
