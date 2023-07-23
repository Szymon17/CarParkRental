import { fetchType, userCall, userData, userPayload, userPutResponse, userUpdate } from "../store/user/user.types";

const serverUrl = "http://localhost:8000";

const registerUserFetch = async (user: userData): Promise<fetchType<undefined> | void> => {
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
    return;
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

const updateUserFetch = async (userToUpdate: userUpdate): Promise<userPutResponse | undefined> => {
  try {
    const res = await fetch(`${serverUrl}/account`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(userToUpdate),
    });

    const status = (await res.json()) as userPutResponse;

    return status;
  } catch (err) {
    console.error(err);
  }
};

const deleteUserFetch = async (email: string): Promise<fetchType<null> | undefined> => {
  try {
    const res = await fetch(`${serverUrl}/account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const status: fetchType<null> = await res.json();

    return status;
  } catch (err) {
    console.log(err);
  }
};

export { registerUserFetch, getTokenByEmailAndPassword, logOutUser, updateUserFetch, deleteUserFetch };
