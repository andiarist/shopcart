import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICartInitialState {
  totalElements: number;
}

export const CART_INITIAL_STATE = {
  totalElements: Number(localStorage.getItem('totalElements')) || 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    setTotalElements: (state, action: PayloadAction<number>) => {
      const total = state.totalElements + action.payload;
      state.totalElements = total;
      localStorage.setItem('totalElements', String(total));
    },
    resetCart: (state) => {
      localStorage.removeItem('totalElements');
      state.totalElements = 0;
    },
  },
});

export const { setTotalElements, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
