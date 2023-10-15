import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectAppReducer = (state: stateType) => state.app;

export const getAppEvent = createSelector([selectAppReducer], state => state.appEvent);
