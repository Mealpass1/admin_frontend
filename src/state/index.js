import { configureStore } from "@reduxjs/toolkit";
import cart from "./reducers/cart";

const store = configureStore({
  reducer: {
    cart: cart,
  },
  devTools: true,
});

export default store;
