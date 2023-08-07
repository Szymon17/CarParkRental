import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addProducts, getProducts } from "./products.actions";
import { initialStateTypes, product } from "./products.types";

const initialState: initialStateTypes = {
  products: [],
  status: "idle",
  shouldFetch: true,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    replaceProducts: (state, action: PayloadAction<product[]>) => {
      const { payload } = action;

      state.products = payload;
    },

    changeShouldFetchState: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;

      if (payload) state.shouldFetch = payload;
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
    builder.addCase(addProducts.fulfilled, (state, action) => {
      const { payload } = action;

      if (payload) {
        state.products = [...state.products, ...payload];
        state.status = "idle";
      } else {
        state.status = "failed";
        state.shouldFetch = false;
      }
    });
  },
});

export const { replaceProducts, changeShouldFetchState } = productsSlice.actions;

export default productsSlice.reducer;
