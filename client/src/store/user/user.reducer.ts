import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStateTypes, userPayload } from "./user.types";

const initialState: initialStateTypes = {
  user: null,
  expireTime: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user-slice",
  initialState: initialState,
  reducers: {
    logIn: (state, action: PayloadAction<userPayload>) => {
      const { payload } = action;
      const { user, expire } = payload;

      state.expireTime = expire;
      state.user = user;
    },

    logOut: state => {
      state.user = null;
      state.expireTime = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
