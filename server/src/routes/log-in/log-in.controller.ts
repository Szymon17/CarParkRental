import "dotenv/config";
import { Response } from "express";
import { CustomRequest, logInWithToken } from "../../types/basicTypes.js";
import { findUserWithEmailAndPassword } from "../../models/log-in.model.js";
import { generateToken } from "../../utils/generateToken.js";

async function httpLogInWithToken(req: CustomRequest<logInWithToken>, res: Response) {
  const user = await findUserWithEmailAndPassword(req.body.email, req.body.password);

  const today = new Date().getTime();
  const expire = new Date(today + 30 * 24 * 60 * 60 * 1000);

  if (user) {
    generateToken(res, user.email);

    return res.json({ status: "ok", user, expire });
  } else res.json({ status: "Wrong email or password", user: false });
}

export { httpLogInWithToken };
