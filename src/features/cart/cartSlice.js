import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  clearCart,
  deleteCartItem,
  fetchItemsByUserID,
  updateCartItem,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const res = await addToCart(item);
    return res;
  }
);
export const fetchItemsByUserIDAsync = createAsyncThunk(
  "cart/fetchItemsByUserIDAsync",
  async () => {
    const res = await fetchItemsByUserID();
    return res;
  }
);
export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItemAsync",
  async (item) => {
    const res = await updateCartItem(item);
    return res;
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItemAsync",
  async (itemId) => {
    const res = await deleteCartItem(itemId);
    return res;
  }
);
export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async () => {
    const res = await clearCart();
    return res;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartItems: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIDAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIDAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) state.items = action.payload;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(clearCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
