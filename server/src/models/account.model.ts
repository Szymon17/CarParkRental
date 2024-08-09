import client from "../services/pg.js";
import { userSnapshot, update, user, userData, userOrder } from "../types/basicTypes.js";
import { validate } from "../utils/validate.js";
import { getOffersById, getOrders } from "./offers.model.js";
import bcrypt = require("bcrypt");
import usersMongo from "./users.mongo.js";

function validateRegister(user: userData): boolean {
  const { email, password, name, surname, phoneNumber } = user;

  if (validate.email(email) && validate.password(password) && validate.name(name) && validate.name(surname) && validate.phoneNumber(phoneNumber))
    return true;
  else return false;
}

async function findUserWithEmailAndPassword(email: string, password: string) {
  const user = (await client.query("SELECT * from users WHERE email = $1", [email])).rows[0];

  if (user) {
    const orders = await getUserOrders(user.orders, 0);

    if (orders) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid)
        return {
          email: user.email,
          name: user.name,
          surname: user.surname,
          phoneNumber: user.phoneNumber,
          orders,
        };
    }
  }
}

async function updateUser(updateValues: update, user: userSnapshot) {
  const orginalEmail = user.email;

  const { name, surname, newEmail, phoneNumber } = updateValues;

  user.name = name && validate.name(name) ? name : user.name;
  user.surname = surname && validate.name(surname) ? surname : user.surname;
  user.email = newEmail && validate.email(newEmail) ? newEmail : user.email;
  user.phoneNumber = phoneNumber && validate.phoneNumber(String(phoneNumber)) ? String(phoneNumber) : user.phoneNumber;

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

async function addUserToDB(user: userData): Promise<void | Error> {
  const emailInUse = (await client.query("SELECT user_id from users WHERE email = $1", [user.email])).rowCount;

  if (emailInUse) return new Error("this email is already used");

  const { email, password, name, surname, phoneNumber } = user;

  const encryptedPassword = await bcrypt.hash(password, 10);

  await client.query(`INSERT INTO users (email, password, name, surname, phoneNumber, orders, "createdAt") VALUES ($1,$2,$3,$4,$5,$6,NOW())`, [
    email,
    encryptedPassword,
    name,
    surname,
    phoneNumber,
    JSON.stringify([]),
  ]);
}

async function getUserOrders(userOrders: userOrder[], index: number, itemsCount: number = 4) {
  const ordersId: string[] = [];

  for (let i = 1; i <= itemsCount; i++) {
    const order = userOrders[userOrders.length - index - i];
    if (order) ordersId.push(order.id);
  }

  const orders = await getOrders(ordersId);

  if (!Array.isArray(orders)) return [];

  const cars_id = orders.map(order => order.car_id);
  const cars = await getOffersById(cars_id);

  return orders.map(orderData => {
    const car = JSON.parse(JSON.stringify(cars.find(car => car.id === orderData.car_id)));
    const data = JSON.parse(JSON.stringify(orderData));

    delete car._id, delete data.user_id, delete data.car_id;

    if (car)
      return {
        car,
        data,
      };
    else return { data, car: "This car is not avilable" };
  });
}

export { updateUser, deleteUser, findUser, updateUserOrders, findUserWithEmailAndPassword, addUserToDB, getUserOrders, validateRegister };
