import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStateTypes, user } from "./user.types";
import jwt from "jsonwebtoken";

const initialState: initialStateTypes = {
  user: null,
  token: null,
  status: "idle",
};

const userSlice = createSlice({
  name: " user-slice",
  initialState: initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      const token = action.payload;

      const newUser = jwt.decode(token) as user;

      state.token = token;
      state.user = newUser;
    },

    logOut: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
