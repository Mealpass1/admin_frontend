import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    cart: [],
    dishes: [],
    restaurants: [],
    total: 0,
    fee: 0,
    mealServing: 0,
  },
  reducers: {
    add: (state, action) => {
      state.cart = action.payload;
      state.dishes = [];
      state.restaurants = [];
      action.payload.forEach((item) => {
        state.dishes.push(item._id);
        if (!state.restaurants.includes(item._id)) {
          state.restaurants.push(item._id);
        }
      });
    },
    getTotal: (state, action) => {
      state.total = 0;
      state.cart?.forEach((item) => {
        state.total += item.subTotal;
      });
    },
    getFee: (state, action) => {
      state.fee = state.total * 0.015;
    },
    getMealserving: (state, action) => {
      state.mealServing = 0;
      state.cart.forEach((item) => {
        state.mealServing += item.mealServing;
      });
    },
    remove: (state, action) => {
      state.cart = [];
      state.total = 0;
      state.fee = 0;
    },
  },
});

export const { add, getTotal, getFee, getMealserving, remove } =
  cartSlice.actions;

export default cartSlice.reducer;
