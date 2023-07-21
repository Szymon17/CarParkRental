import "dotenv/config";
import { Response } from "express";
import { CustomRequest, logInWithToken } from "../../types/basicTypes.js";
import jwt from "jsonwebtoken";
import { findUserWithEmailAndPassword } from "../../models/log-in.model.js";

async function httpLogInWithToken(req: CustomRequest<logInWithToken>, res: Response) {
  const user = await findUserWithEmailAndPassword(req.body.email, req.body.password);

  if (user) {
    const token = jwt.sign(
      {
        email: user.email,
        surname: user.surname,
        orders: user.orders,
        phoneNumber: user.phoneNumber,
        name: user.name,
      },
      process.env.SECRET_TOKEN
    );

    return res.json({ status: "ok", user: token });
  } else res.json({ status: "Wrong email or password", user: false });
}

export { httpLogInWithToken };
