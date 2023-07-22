type userSnapshot = {
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  orders: string[];
};

type userData = {
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

type userPayload = {
  user: userSnapshot;
  expire: string;
};

interface userCall extends userPayload {
  status: string;
}

type initialStateTypes = {
  user: userSnapshot | null;
  expireTime: string | null;
  status: "idle" | "loading" | "failed";
};

export { userSnapshot, userCall, initialStateTypes, userPayload, userData };
