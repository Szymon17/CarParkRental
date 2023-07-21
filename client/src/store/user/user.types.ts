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
  user: string;
};

type initialStateTypes = {
  user: user | null;
  token: string | null;
  status: "idle" | "loading" | "failed";
};

export { userSnapshot, user, userCall, initialStateTypes };
