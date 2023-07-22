import bcrypt from "bcrypt";
import usersMongo from "./users.mongo.js";

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
        orders: user.orders,
      };
  }
}

export { findUserWithEmailAndPassword };
