import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { locationsInitialState } from "./locations.types";
import { getLocations } from "./locations.actions";

const initialState: locationsInitialState = {
  locations: [],
  status: "idle",
};

const locationsSlice = createSlice({
  name: "locations-slice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLocations.pending, state => {
        state.status = "loading";
      })
      .addCase(getLocations.fulfilled, (state, action: PayloadAction<string[] | undefined>) => {
        const { payload } = action;

        if (payload) {
          state.locations = payload;
          state.status = "idle";
        } else state.status = "failed";
      });
  },
});

export default locationsSlice.reducer;
