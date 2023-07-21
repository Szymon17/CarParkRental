import bcrypt from "bcrypt";
import { user, userData } from "../types/basicTypes.js";
import usersMongo from "./users.mongo.js";

async function saveUser(user: user) {
  await usersMongo.create(user);
}

async function addUserToDB(user: userData) {
  const emailInUse = Boolean(
    await usersMongo.findOne({
      email: user.email,
    })
  );

  if (emailInUse) throw Error("ten email jest już zajęty");

  const encryptedPassword = await bcrypt.hash(user.password, 10);

  const fullUser = Object.assign(user, {
    orders: [],
    createdAt: new Date(),
    password: encryptedPassword,
  });

  await saveUser(fullUser);

  return {
    name: fullUser.name,
    surname: fullUser.surname,
    email: fullUser.email,
    orders: fullUser.orders,
    phoneNumber: fullUser.phoneNumber,
  };
}

export { addUserToDB };
