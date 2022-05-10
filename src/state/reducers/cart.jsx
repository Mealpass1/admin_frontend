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
        state.dishes.push({
          dish: item.dish,
          restaurant: item.restaurant._id,
          quantity: item.quantity,
          toppings: item.toppings,
          timeOfMeal: item.timeOfMeal,
          daysInWeek: item.daysInWeek,
          deliveryMode: item.deliveryMode,
          mealServing: item.mealServing,
        });
        if (!state.restaurants.some((res) => res.id === item.restaurant._id)) {
          state.restaurants.push({
            name: item.restaurant.businessName,
            id: item.restaurant._id,
          });
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
