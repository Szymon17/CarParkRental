import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectUserState = (state: stateType) => state.user;

export const selectUser = createSelector([selectUserState], ({ user }) => user);
