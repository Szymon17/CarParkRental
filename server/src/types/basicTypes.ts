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

interface CustomRequest<T> extends Request {
  body: T;
}

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

export { CustomRequest, userData, user, logInWithToken, userSnapshot, UserRequest, update };
