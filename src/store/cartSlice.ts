import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../types/api.types';

interface CartState {
  cartItems: CartItem[];
  farmID: string | null;
  totalPrice: number;
}

const recalculateTotalPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, cartItem) => {
    const itemTotal =
      cartItem.price *
      cartItem.quantity *
      (cartItem.type === 'block' ? cartItem.quantityMonth || 1 : 1);
    return total + itemTotal;
  }, 0);
};

const initialState: CartState = {
  cartItems: [],
  farmID: null,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ item: CartItem }>) => {
      const { item } = action.payload;

      if (!item || !item.id) {
        console.error('Invalid item provided to addToCart action:', item);
        return;
      }

      const uniqueIdentifier = `${item.id}-${item.type}-${item.farmID}`;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.uniqueIdentifier === uniqueIdentifier,
      );

      if (!state.farmID) {
        state.farmID = item.farmID;
      }

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...item,
          uniqueIdentifier,
          quantity: 1,
          quantityMonth: item.type === 'block' ? 1 : undefined,
        });
      }

      state.totalPrice = recalculateTotalPrice(state.cartItems);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const uniqueIdentifier = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item.uniqueIdentifier !== uniqueIdentifier,
      );

      if (state.cartItems.length === 0) {
        state.farmID = null;
      }

      state.totalPrice = recalculateTotalPrice(state.cartItems);
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const uniqueIdentifier = action.payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.uniqueIdentifier === uniqueIdentifier,
      );

      if (item) {
        item.quantity += 1;
      }

      state.totalPrice = recalculateTotalPrice(state.cartItems);
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const uniqueIdentifier = action.payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.uniqueIdentifier === uniqueIdentifier,
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      state.totalPrice = recalculateTotalPrice(state.cartItems);
    },

    incrementQuantityMonth: (state, action: PayloadAction<string>) => {
      const uniqueIdentifier = action.payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.uniqueIdentifier === uniqueIdentifier,
      );

      if (item && item.type === 'block' && item.quantityMonth !== undefined) {
        item.quantityMonth += 1;
      }

      state.totalPrice = recalculateTotalPrice(state.cartItems);
    },

    decrementQuantityMonth: (state, action: PayloadAction<string>) => {
      const uniqueIdentifier = action.payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.uniqueIdentifier === uniqueIdentifier,
      );

      if (
        item &&
        item.type === 'block' &&
        item.quantityMonth !== undefined &&
        item.quantityMonth > 1
      ) {
        item.quantityMonth -= 1;
      }

      state.totalPrice = recalculateTotalPrice(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.farmID = null;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  incrementQuantityMonth,
  decrementQuantityMonth,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
