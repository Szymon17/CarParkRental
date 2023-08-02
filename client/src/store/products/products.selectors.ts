import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectProductsReducer = (state: stateType) => state.products;

const selectProducts = createSelector([selectProductsReducer], ({ products }) => products);

const selectProductByIndex = (index: number) =>
  createSelector([selectProductsReducer], ({ products }) => products.find(product => product.index === index));

const selectLastIndex = createSelector([selectProductsReducer], ({ products }) =>
  products[products.length - 1] ? products[products.length - 1].index : 0
);

const selectProductsStatus = createSelector([selectProductsReducer], ({ status }) => status);

export { selectProducts, selectLastIndex, selectProductByIndex, selectProductsStatus };
