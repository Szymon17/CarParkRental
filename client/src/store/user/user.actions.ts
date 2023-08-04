import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTokenByEmailAndPassword, getUserOrders } from "../../utils/fetchFunctions";

const logInUser = createAsyncThunk(
  "log-in",
  async (params: { email: string; password: string; succesHandler?: Function; errorHandler?: Function }) => {
    const { email, password, errorHandler, succesHandler } = params;

    const data = await getTokenByEmailAndPassword(email, password);

    if (data) {
      if (succesHandler) succesHandler();
      return data;
    } else if (errorHandler) errorHandler();
  }
);

const addUserOrders = createAsyncThunk("add-user-orders", async (lastOrderIndex: number) => {
  const userOrders = await getUserOrders(lastOrderIndex);

  return userOrders;
});

export { logInUser, addUserOrders };
