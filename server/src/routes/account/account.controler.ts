import { Response } from "express";
import { CustomRequest, UserRequest, update } from "../../types/basicTypes.js";
import usersMongo from "../../models/users.mongo.js";
import asyncHandler from "express-async-handler";

const updateProfile = asyncHandler(async (req: CustomRequest<update> & UserRequest, res: Response) => {
  const user = req.user;

  if (user) {
    user.name = req.body.name || user.name;
    user.surname = req.body.surname || user.surname;
    user.email = req.body.newEmail || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    const modifiedUser = await usersMongo.findOneAndUpdate(
      { email: req.body.email },
      {
        email: user.email,
        name: user.name,
        surname: user.surname,
        phoneNumber: user.phoneNumber,
      }
    );

    if (modifiedUser) {
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { updateProfile };
