import bcrypt from "bcrypt";
import usersMongo from "./users.mongo.js";

async function findUserWithEmailAndPassword(email: string, password: string) {
  const user = await usersMongo.findOne({ email: email }, "-__v -_id -createdAt");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  delete user.password;

  if (isPasswordValid) return user;
}

export { findUserWithEmailAndPassword };
