import { Response } from "express";
import jwt = require("jsonwebtoken");

export const generateToken = (res: Response, email: string) => {
  if (!process.env.SECRET_KEY) {
    console.error("SECRET_KEY not provided as a env variable");
    return;
  }

  const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "30d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, //true on production
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
