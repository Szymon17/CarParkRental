import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStateTypes, userPayload } from "./user.types";

const initialState: initialStateTypes = {
  user: null,
  expireTime: null,
  nextUpdateTime: 0,
  status: "idle",
  userDropdown: false,
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

    changeUserDropdown: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;

      state.userDropdown = payload;
    },
    updateUserOrders: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      if (state.user) state.user.orders.push(payload);
    },
  },
});

export const { logIn, logOut, updateUserState, changeUserDropdown, updateUserOrders } = userSlice.actions;

export default userSlice.reducer;
