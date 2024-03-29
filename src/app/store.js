import { configureStore } from '@reduxjs/toolkit';
import productReducer from "../features/products/productSlice"
import authReducer from "../features/auth/authSlice"
import cartReducer from "../features/cart/cartSlice"
import orderReducer from "../features/order/orderSlice"
import userReducer from '../features/user/userSlice';
export const store = configureStore({
  reducer: {
    auth:authReducer,
    product: productReducer,
    cart:cartReducer,
    order:orderReducer,
    user:userReducer
  },
});
