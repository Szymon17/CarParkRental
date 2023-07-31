import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocationsFetch } from "../../utils/fetchFunctions";

const getLocations = createAsyncThunk("getLocations", async () => {
  const locatons = await getLocationsFetch();

  return locatons;
});

export { getLocations };
