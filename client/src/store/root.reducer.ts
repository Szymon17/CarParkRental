import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/user.reducer";
import productsReducer from "./products/products.reducer";
import orderReducer from "./order/order.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  order: orderReducer,
});

export default rootReducer;
