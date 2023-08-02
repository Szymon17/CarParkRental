import { userSnapshot, update, user, userData } from "../types/basicTypes.js";
import usersMongo from "./users.mongo.js";
import bcrypt from "bcrypt";

async function findUserWithEmailAndPassword(email: string, password: string) {
  const user = await usersMongo.findOne({ email: email }, "-__v -_id -createdAt");

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid)
      return {
        email: user.email,
        name: user.name,
        surname: user.surname,
        phoneNumber: user.phoneNumber,
        orders: user.orders.map(order => order.carIndex),
      };
  }
}

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

async function updateUserOrders(orderID: string, index: number, email: string) {
  const user = await usersMongo.findOne({ email: email });

  if (user) {
    user.orders.push({ id: orderID, carIndex: index });
    user.save();
    return user;
  }
}

async function saveUser(user: user) {
  await usersMongo.create(user);
}

async function addUserToDB(user: userData): Promise<void | Error> {
  const emailInUse = Boolean(
    await usersMongo.findOne({
      email: user.email,
    })
  );

  if (emailInUse) return new Error("this email is already used");

  const encryptedPassword = await bcrypt.hash(user.password, 10);

  const fullUser = Object.assign(user, {
    orders: [],
    createdAt: new Date(),
    password: encryptedPassword,
  });

  await saveUser(fullUser);
}

export { updateUser, deleteUser, findUser, updateUserOrders, findUserWithEmailAndPassword, addUserToDB };
