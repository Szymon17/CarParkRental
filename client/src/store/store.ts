import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistStore, PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./root.reducer";

import logger from "redux-logger";

type rootReducerType = ReturnType<typeof rootReducer>;

type persistConfigExtendType = PersistConfig<rootReducerType> & {
  whitelist?: [keyof rootReducerType];
  blacklist?: [keyof rootReducerType];
};

const persistConfig: persistConfigExtendType = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware({ serializableCheck: false }).concat(logger);
    } else {
      return getDefaultMiddleware({ serializableCheck: false });
    }
  },

  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type dispatchType = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, stateType, unknown, Action<string>>;
export type stateType = ReturnType<typeof store.getState>;
