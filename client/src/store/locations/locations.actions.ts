import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocationsFetch } from "../../utils/fetchFunctions";

const getLocations = createAsyncThunk("getLocations", async () => {
  const locations = await getLocationsFetch();

  return locations;
});

export { getLocations };
