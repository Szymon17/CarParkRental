import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectProductsReducer = (state: stateType) => state.products;

const selectProducts = createSelector([selectProductsReducer], ({ products }) => products);
const selectLastIndex = createSelector([selectProductsReducer], ({ products }) =>
  products[products.length - 1] ? products[products.length - 1].index : 0
);

export { selectProducts, selectLastIndex };
