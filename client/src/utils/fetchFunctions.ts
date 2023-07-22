import { user, userCall, userSnapshot } from "../store/user/user.types";

const serverUrl = "http://localhost:8000";

const addUser = async (user: userSnapshot): Promise<user | void> => {
  try {
    const res = await fetch(`${serverUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.assign(user, { orders: [] })),
    });

    const createdUser: userCall = await res.json();

    if (createdUser.user) return createdUser.user;
  } catch (error) {
    console.error(error);
  }
};

const getTokenByEmailAndPassword = async (email: string, password: string): Promise<user | void> => {
  try {
    const res = await fetch(`${serverUrl}/log-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: userCall = await res.json();
    if (data.user) return data.user;
  } catch (error) {
    console.error(error);
  }
};

const logOutUser = async () => {
  try {
    await fetch(`${serverUrl}/logout`, {
      method: "POST",
    });
  } catch (error) {
    console.log(error);
  }
};

export { addUser, getTokenByEmailAndPassword, logOutUser };
