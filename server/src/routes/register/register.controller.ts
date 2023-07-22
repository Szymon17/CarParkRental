import { Response } from "express";
import { CustomRequest, userData } from "../../types/basicTypes.js";
import { addUserToDB } from "../../models/register.model.js";
import { generateToken } from "../../utils/generateToken.js";

async function httpAddUser(req: CustomRequest<userData>, res: Response) {
  const user = req.body;
  const isError = await addUserToDB(user);

  if (!isError) {
    generateToken(res, user.email);
    res.status(201).json({ status: "ok" });
  } else res.status(409).json({ error: "email already used" });
}

export { httpAddUser };
