import { Response } from "express";
import { CustomRequest, userData } from "../../types/basicTypes.js";
import { addUserToDB } from "../../models/register.model.js";
import { generateToken } from "../../utils/generateToken.js";

async function httpAddUser(req: CustomRequest<userData>, res: Response) {
  try {
    const user = req.body;
    const userSnapshot = await addUserToDB(user);

    generateToken(res, userSnapshot);
    res.json({ status: "ok", user: userSnapshot });
  } catch (error) {
    res.json({ status: error.message, user: false });
  }
}

export { httpAddUser };
