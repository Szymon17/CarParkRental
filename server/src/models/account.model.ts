import { userSnapshot, CustomRequest, update } from "../types/basicTypes.js";
import usersMongo from "./users.mongo.js";

async function updateUser(updateValues: update, user: userSnapshot) {
  user.name = updateValues.name || user.name;
  user.surname = updateValues.surname || user.surname;
  user.email = updateValues.newEmail || user.email;
  user.phoneNumber = updateValues.phoneNumber || user.phoneNumber;

  return await usersMongo.findOneAndUpdate(
    { email: updateValues.email },
    {
      email: user.email,
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
    },
    {}
  );
}

async function deleteUser(email: string) {
  return await usersMongo.findOneAndDelete({ email: email });
}

export { updateUser, deleteUser };
