import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectLocationsReducer = (state: stateType) => state.locations;

const selectLocations = createSelector([selectLocationsReducer], ({ locations }) => locations);

export { selectLocations };
