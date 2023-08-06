import { userSnapshot, update, user, userData, userOrder } from "../types/basicTypes.js";
import { getOffersById, getOrders } from "./offers.model.js";
import usersMongo from "./users.mongo.js";
import bcrypt from "bcrypt";

async function findUserWithEmailAndPassword(email: string, password: string) {
  const user = await usersMongo.findOne({ email: email }, "-__v -_id -createdAt");
  const orders = await getFourUserOrders(user.orders, 0);

  if (user && orders) {
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

async function getFourUserOrders(userOrders: userOrder[], index: number) {
  const ordersId: string[] = [];

  for (let i = 1; i <= 4; i++) {
    const order = userOrders[userOrders.length - index - i];
    if (order) ordersId.push(order.id);
  }

  const orders = await getOrders(ordersId);

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

export { updateUser, deleteUser, findUser, updateUserOrders, findUserWithEmailAndPassword, addUserToDB, getFourUserOrders };
