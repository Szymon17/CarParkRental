import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./products.actions";
import { initialStateTypes } from "./products.types";

const initialState: initialStateTypes = {
  products: [],
  status: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const { payload } = action;

        if (payload) {
          state.products = payload;
          state.status = "idle";
        } else state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
