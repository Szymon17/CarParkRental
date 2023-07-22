import bcrypt from "bcrypt";
import { user, userData } from "../types/basicTypes.js";
import usersMongo from "./users.mongo.js";

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

export { addUserToDB };
