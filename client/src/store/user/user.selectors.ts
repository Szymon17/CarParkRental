import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectUserState = (state: stateType) => state.user;

export const selectUser = createSelector([selectUserState], ({ user }) => user);

export const selectUserStatus = createSelector([selectUserState], ({ userStatus }) => userStatus);

export const selectNextUpdateTime = createSelector([selectUserState], ({ nextUpdateTime }) => nextUpdateTime);

export const selectUserDropdownState = createSelector([selectUserState], ({ userDropdown }) => userDropdown);

export const selectUserOrders = createSelector([selectUserState], ({ user }) => user?.orders);

export const selectOrdersCount = createSelector([selectUserState], ({ user }) => user?.orders.length || 0);

export const selectFetchOrdersState = createSelector([selectUserState], ({ shouldFetchOrders }) => shouldFetchOrders);

export const selectExpireTime = createSelector([selectUserState], ({ expireTime }) => {
  if (expireTime) return new Date(expireTime).getTime();
  else return new Date().getTime();
});
