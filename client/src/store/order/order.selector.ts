import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectOrderReducer = (state: stateType) => state.order;

const selectOrder = createSelector([selectOrderReducer], order => order);

export { selectOrder };
