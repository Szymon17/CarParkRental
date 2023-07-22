import { JwtPayload } from "jsonwebtoken";

type userSnapshot = {
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
};

interface user extends userSnapshot {
  orders: string[];
}

type userCall = {
  status: string;
  user: user;
};

type initialStateTypes = {
  user: user | null;
  status: "idle" | "loading" | "failed";
};

export { userSnapshot, user, userCall, initialStateTypes };
