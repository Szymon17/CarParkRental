import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStateTypes, user } from "./user.types";

const initialState: initialStateTypes = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
  status: "idle",
};

const userSlice = createSlice({
  name: " user-slice",
  initialState: initialState,
  reducers: {
    logIn: (state, action: PayloadAction<user>) => {
      const { payload } = action;

      localStorage.setItem("user", JSON.stringify(payload));
      state.user = payload;
    },

    logOut: state => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
