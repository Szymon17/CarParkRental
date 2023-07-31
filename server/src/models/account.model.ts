import { userSnapshot, update } from "../types/basicTypes.js";
import usersMongo from "./users.mongo.js";

async function updateUser(updateValues: update, user: userSnapshot) {
  const orginalEmail = user.email;

  user.name = updateValues.name || user.name;
  user.surname = updateValues.surname || user.surname;
  user.email = updateValues.newEmail || user.email;
  user.phoneNumber = updateValues.phoneNumber || user.phoneNumber;

  const isEmailInUse = await usersMongo.findOne({ email: user.email });

  if (!isEmailInUse || orginalEmail === user.email)
    return await usersMongo.findOneAndUpdate(
      { email: orginalEmail },
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

async function findUser(email: string) {
  return await usersMongo.findOne({ email: email });
}

async function updateUserOrders(orderID: string, email: string) {
  const user = await usersMongo.findOne({ email: email });

  if (user) {
    user.orders.push(orderID);
    user.save();
    return user;
  }
}

export { updateUser, deleteUser, findUser, updateUserOrders };
