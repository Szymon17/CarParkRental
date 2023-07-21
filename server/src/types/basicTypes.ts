import { Request } from "express";

type userData = {
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
};

type logInWithToken = {
  email: string;
  password: string;
};

interface CustomRequest<T> extends Request {
  body: T;
}

interface user extends userData {
  createdAt: Date;
  orders: string[];
}

export { CustomRequest, userData, user, logInWithToken };
