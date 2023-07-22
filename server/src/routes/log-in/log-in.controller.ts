import "dotenv/config";
import { Response } from "express";
import { CustomRequest, logInWithToken } from "../../types/basicTypes.js";
import { findUserWithEmailAndPassword } from "../../models/log-in.model.js";
import { generateToken } from "../../utils/generateToken.js";

async function httpLogInWithToken(req: CustomRequest<logInWithToken>, res: Response) {
  const user = await findUserWithEmailAndPassword(req.body.email, req.body.password);

  if (user) {
    generateToken(res, user);

    return res.json({ status: "ok", user: user });
  } else res.json({ status: "Wrong email or password", user: false });
}

export { httpLogInWithToken };
