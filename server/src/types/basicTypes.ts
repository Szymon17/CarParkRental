import { Request } from "express";

type userSnapshot = {
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  orders: string[];
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

type update = { email: string; newEmail?: string; name?: string; surname?: string; phoneNumber?: string };

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

type order = {
  car_id: string;
};

export { CustomRequest, userData, user, logInWithToken, userSnapshot, UserRequest, update, RequestWithQuery, queryBasicData, order };
