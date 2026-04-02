import type store from '../store/store';
import type { CartItem } from './api.types';

// Root State Type
export type RootState = ReturnType<typeof store.getState>;

// App Dispatch Type
export type AppDispatch = typeof store.dispatch;

// User State
export interface UserState {
  userInfo: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    avatar: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  } | null;
}

// Cart State
export interface CartState {
  cartItems: CartItem[];
  farmID: string | null;
  totalPrice: number;
}
