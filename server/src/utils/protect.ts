import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import usersMongo from "../models/users.mongo.js";
import { UserRequest } from "../types/basicTypes.js";

export default asyncHandler(async (req: UserRequest, res, next) => {
  let token: string;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

      req.user = await usersMongo.findOne({ email: decoded.email }, "-__v -_id -password -createdAt");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
