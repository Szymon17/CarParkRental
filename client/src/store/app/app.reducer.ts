import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  appEvent: boolean;
};

const initialState: initialStateType = {
  appEvent: false,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState: initialState,
  reducers: {
    registerAppEvent: state => {
      state.appEvent = !state.appEvent;
    },
  },
});

export const { registerAppEvent } = appSlice.actions;

export default appSlice.reducer;
