import asyncHandler from "express-async-handler";
import { Response } from "express";
import { CustomRequest, UserRequest, update } from "../../types/basicTypes.js";
import { deleteUser, updateUser } from "../../models/account.model.js";
import jwt from "jsonwebtoken";

const updateProfile = asyncHandler(async (req: CustomRequest<update> & UserRequest, res: Response) => {
  const user = req.user;

  if (user) {
    const updatedUser = await updateUser(req.body, user);

    if (updatedUser) {
      const nextUpdateTime = new Date().getTime() + 1000 * 60 * 5;

      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      res.json({ status: "ok", message: "Updated user", nextUpdateTime });
    } else res.status(404).json({ status: "error", message: "not found" });
  } else res.status(404).json({ status: "error", message: "not found" });
});

async function deleteProfile(req: CustomRequest<{ email: string }>, res: Response) {
  const token = req.cookies.jwt;
  const tokenEmail = jwt.decode(token).email;

  if (req.body.email === tokenEmail) {
    const user = await deleteUser(req.body.email);

    if (user) res.status(200).json({ status: "ok", meaasge: "Deleted" });
    else res.json({ status: "error", message: "Invalid user data" });
  } else res.json({ status: "error", message: "Your token don't match with email to delete" });
}

export { updateProfile, deleteProfile };
