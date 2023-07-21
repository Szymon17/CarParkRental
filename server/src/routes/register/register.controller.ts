import { Response } from "express";
import { CustomRequest, userData } from "../../types/basicTypes.js";
import { addUserToDB } from "../../models/register.model.js";

async function httpAddUser(req: CustomRequest<userData>, res: Response) {
  try {
    const user = req.body;
    const userSnapshot = await addUserToDB(user);

    res.json({ status: "ok", user: userSnapshot });
  } catch (error) {
    res.json({ status: error.message, user: false });
  }
}

export { httpAddUser };
