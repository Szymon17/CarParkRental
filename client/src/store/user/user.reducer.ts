import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userInitialStateTypes } from "./user.types";
import { orderData } from "../order/order.types";
import { product } from "../products/products.types";
import { addUserOrders, logInUser } from "./user.actions";

const initialState: userInitialStateTypes = {
  user: null,
  expireTime: null,
  nextUpdateTime: 0,
  userStatus: "idle",
  ordersStatus: "idle",
  userDropdown: false,
};

const userSlice = createSlice({
  name: "user-slice",
  initialState: initialState,
  reducers: {
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
  },

  extraReducers: builder => {
    builder
      .addCase(logInUser.pending, state => {
        state.userStatus = "loading";
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        const { payload } = action;

        if (payload) {
          const { user, expire } = payload;
          state.expireTime = expire;
          state.user = user;
          state.userStatus = "idle";
        } else state.userStatus = "failed";
      });
    builder
      .addCase(addUserOrders.pending, state => {
        state.ordersStatus = "loading";
      })
      .addCase(addUserOrders.fulfilled, (state, action) => {
        const { payload } = action;

        if (payload && state.user) {
          state.user.orders = [...state.user.orders, ...payload];
        } else state.ordersStatus = "failed";
      });
  },
});

export const { logOut, updateUserState, changeUserDropdown } = userSlice.actions;

export default userSlice.reducer;
