import { Response } from "express";
import jwt from "jsonwebtoken";
import { userSnapshot } from "../types/basicTypes.js";

export const generateToken = (res: Response, user: userSnapshot) => {
  const token = jwt.sign({ email: user.email }, process.env.SECRET_TOKEN, { expiresIn: "30d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
