import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchAllProducts} from './productAPI';



export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const data = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return data.products;
  }
);

const initialState = {
  products:[],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});









export default productSlice.reducer;
