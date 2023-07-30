import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { today, tomorrow } from "../../utils/basicFunctions";
import { orderData, orderInitialState } from "./order.types";

const initialState: orderInitialState = {
  pickUpDate: today,
  returnDate: tomorrow,
  pickUpLocation: "Warszawa",
  returnLocation: "Warszawa",
  orderIndex: null,
};

const orderSlice = createSlice({
  name: "order-slice",
  initialState,
  reducers: {
    saveOrderData: (state, action: PayloadAction<orderData>) => {
      const { payload } = action;
      const { pickUpDate, pickUpLocation, returnDate, returnLocation } = payload;

      state.pickUpDate = pickUpDate;
      state.pickUpLocation = pickUpLocation;
      state.returnDate = returnDate;
      state.returnLocation = returnLocation;
    },

    saveOrderIndex: (state, action: PayloadAction<number>) => {
      const { payload } = action;

      state.orderIndex = payload;
    },
  },
});

export const { saveOrderData, saveOrderIndex } = orderSlice.actions;

export default orderSlice.reducer;
