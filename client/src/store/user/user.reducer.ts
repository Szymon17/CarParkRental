import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStateTypes, userPayload } from "./user.types";

const initialState: initialStateTypes = {
  user: null,
  expireTime: null,
  nextUpdateTime: 0,
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

    updateUserState: (state, action: PayloadAction<number>) => {
      const { payload } = action;

      state.nextUpdateTime = payload;
    },

    logOut: state => {
      state.user = null;
      state.expireTime = null;
    },
  },
});

export const { logIn, logOut, updateUserState } = userSlice.actions;

export default userSlice.reducer;
