import { Request } from "express";

type userSnapshot = {
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  orders: string[];
  _id?: string;
};

type logInWithToken = {
  email: string;
  password: string;
};

type CustomRequest<T> = Request<unknown, unknown, T, unknown>;

interface UserRequest extends Request {
  user: userSnapshot;
}

type userData = {
  password: string;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
};

interface user extends userData {
  createdAt: Date;
  orders: string[];
}

type update = { newEmail?: string; name?: string; surname?: string; phoneNumber?: string };

type RequestWithQuery<Q> = Request<unknown, unknown, unknown, Q>;

type queryBasicData = {
  rd?: string;
  rtd?: string;
  pul?: string;
  rl?: string;
  number_of_seats?: string;
  fuel_type?: string;
  drive_type?: string;
  index?: string;
};

type orderData = {
  date_of_receipt: string;
  date_of_return: string;
  place_of_receipt: string;
  place_of_return: string;
};

type order = orderData & {
  car_id: string;
  user_id: string;
  cancel: boolean;
};

export { CustomRequest, userData, user, logInWithToken, userSnapshot, UserRequest, update, RequestWithQuery, queryBasicData, orderData, order };
