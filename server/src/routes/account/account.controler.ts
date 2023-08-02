import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import { CustomRequest, UserRequest, update, logInWithToken, userData } from "../../types/basicTypes.js";
import { addUserToDB, deleteUser, findUserWithEmailAndPassword, updateUser } from "../../models/account.model.js";
import { generateToken } from "../../utils/generateToken.js";

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

async function deleteProfile(req: UserRequest, res: Response) {
  const user = await deleteUser(req.user.email);

  if (user) res.status(200).json({ status: "ok", meaasge: "Deleted" });
  else res.json({ status: "error", message: "Invalid user data" });
}

async function httpLogInWithToken(req: CustomRequest<logInWithToken>, res: Response) {
  const user = await findUserWithEmailAndPassword(req.body.email, req.body.password);

  const today = new Date().getTime();
  const expire = new Date(today + 30 * 24 * 60 * 60 * 1000);

  if (user) {
    generateToken(res, user.email);

    return res.json({ status: "ok", user, expire });
  } else res.json({ status: "Wrong email or password", user: false });
}

function logoutUser(req: Request, res: Response) {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
}

async function httpAddUser(req: CustomRequest<userData>, res: Response) {
  const user = req.body;
  const isError = await addUserToDB(user);

  if (!isError) {
    generateToken(res, user.email);
    res.status(201).json({ status: "ok", message: "Created user" });
  } else res.status(409).json({ status: "error", message: "Email already used" });
}

export { updateProfile, deleteProfile, httpLogInWithToken, logoutUser, httpAddUser };
