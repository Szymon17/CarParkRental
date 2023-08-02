type userSnapshot = {
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  orders: number[];
};

type userUpdate = {
  email: string;
  newEmail?: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
};

type userPutResponse = {
  status: string;
  nextUpdateTime: number;
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

type fetchType<T> = {
  status: string;
  message: string;
  payload?: T;
};

type initialStateTypes = {
  user: userSnapshot | null;
  expireTime: string | null;
  nextUpdateTime: number;
  status: "idle" | "loading" | "failed";
  userDropdown: boolean;
};

export { userSnapshot, userCall, initialStateTypes, userPayload, userData, userUpdate, userPutResponse, fetchType };
