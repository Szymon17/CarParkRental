import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./products.actions";
import { initialStateTypes, product } from "./products.types";

const initialState: initialStateTypes = {
  products: [],
  status: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    replaceProducts: (state, action: PayloadAction<product[]>) => {
      const { payload } = action;

      state.products = payload;
    },
  },
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
        } else {
          state.products = [];
          state.status = "failed";
        }
      });
  },
});

export const { replaceProducts } = productsSlice.actions;

export default productsSlice.reducer;
