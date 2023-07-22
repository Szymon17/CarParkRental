import { userCall, userData, userPayload } from "../store/user/user.types";

const serverUrl = "http://localhost:8000";

const addUser = async (user: userData) => {
  try {
    const res = await fetch(`${serverUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.assign(user, { orders: [] })),
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getTokenByEmailAndPassword = async (email: string, password: string): Promise<userPayload | void> => {
  try {
    const res = await fetch(`${serverUrl}/log-in`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: userCall = await res.json();
    if (data.user && data.expire) return data;
  } catch (error) {
    console.error(error);
  }
};

const logOutUser = async () => {
  try {
    await fetch(`${serverUrl}/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
  }
};

export { addUser, getTokenByEmailAndPassword, logOutUser };
