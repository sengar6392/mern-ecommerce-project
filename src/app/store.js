import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../features/products/productSlice"
import authReducer from "../features/auth/authSlice"
import cartReducer from "../features/cart/cartSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    product: productReducer,
    cart:cartReducer
  },
});
