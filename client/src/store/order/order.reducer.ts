import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { today, tomorrow } from "../../utils/basicFunctions";
import { orderData, orderInitialState } from "./order.types";

const initialState: orderInitialState = {
  date_of_receipt: today,
  date_of_return: tomorrow,
  place_of_receipt: "Warszawa",
  place_of_return: "Warszawa",
  productIndex: null,
};

const orderSlice = createSlice({
  name: "order-slice",
  initialState,
  reducers: {
    saveOrderData: (state, action: PayloadAction<orderData>) => {
      const { payload } = action;
      const { date_of_receipt, date_of_return, place_of_receipt, place_of_return } = payload;

      state.date_of_receipt = date_of_receipt;
      state.date_of_return = date_of_return;
      state.place_of_receipt = place_of_receipt;
      state.place_of_return = place_of_return;
    },

    saveOrderIndex: (state, action: PayloadAction<number>) => {
      const { payload } = action;

      state.productIndex = payload;
    },
  },
});

export const { saveOrderData, saveOrderIndex } = orderSlice.actions;

export default orderSlice.reducer;
