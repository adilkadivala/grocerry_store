import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/item";
import cartReducer from "./slices/addtoCard";

export const Store = configureStore({
  reducer: {
    item: itemReducer,
    cart: cartReducer,
  },
});

export default Store;
