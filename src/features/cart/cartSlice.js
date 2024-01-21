import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, clearCart, deleteCartItem, fetchItemsByUserID, updateCartItem } from './cartAPI';

const initialState = {
  items:[],
  status:"idle"
};

export const addToCartAsync=createAsyncThunk(
  'cart/addToCart',async (item)=>{
    const res=await addToCart(item)
    return res
  }
)
export const fetchItemsByUserIDAsync=createAsyncThunk(
  'cart/fetchItemsByUserIDAsync',async (userID)=>{
    const res=await fetchItemsByUserID(userID)
    return res
  }
)
export const updateCartItemAsync=createAsyncThunk(
  'cart/updateCartItemAsync',async (item)=>{
    const res=await updateCartItem(item)
    return res
  }
)
export const deleteCartItemAsync=createAsyncThunk(
  'cart/deleteCartItemAsync',async (itemID)=>{
    const res=await deleteCartItem(itemID)
    return res
  }
)
export const clearCartAsync=createAsyncThunk(
  'cart/clearCartAsync',async (userID)=>{
    const res=await clearCart(userID)
    return res
  }
)






export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  extraReducers: (builder) => {
    builder
    .addCase(addToCartAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(addToCartAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.items=action.payload;
    })
      .addCase(fetchItemsByUserIDAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIDAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1)
      });
  },
});




export const selectCount = (state) => state.counter.value;




export default cartSlice.reducer;
