import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsFetch } from "../../utils/fetchFunctions";

const getProducts = createAsyncThunk("getProducts", async (params: string) => {
  const products = await getProductsFetch(params);

  return products;
});

const addProducts = createAsyncThunk("addProducts", async (params: string) => {
  const products = await getProductsFetch(params);

  return products;
});

export { getProducts, addProducts };
