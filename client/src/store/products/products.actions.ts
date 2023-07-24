import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsFetch } from "../../utils/fetchFunctions";

const getProducts = createAsyncThunk("getProducts", async (params: { url: string; lastIndex: number }) => {
  const { url, lastIndex } = params;

  const products = await getProductsFetch(url, lastIndex);

  return products;
});

export { getProducts };
