// src/redux/CartSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface CartState {
  cartCount: number;
}

const initialState: CartState = {
  cartCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state) => {
      state.cartCount += 1;
    },
    clearCart: (state) => {
      state.cartCount = 0;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
