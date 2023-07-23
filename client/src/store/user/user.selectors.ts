import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectUserState = (state: stateType) => state.user;

export const selectUser = createSelector([selectUserState], ({ user }) => user);

export const selectNextUpdateTime = createSelector([selectUserState], ({ nextUpdateTime }) => nextUpdateTime);

export const selectExpireTime = createSelector([selectUserState], ({ expireTime }) => {
  if (expireTime) return new Date(expireTime).getTime();
  else return new Date().getTime();
});
