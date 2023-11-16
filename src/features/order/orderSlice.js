import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderApi";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder:null
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const res = await createOrder(order);
    return res;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers:{
    resetCurrentOrder:(state)=>{
      state.currentOrder=null
    }

  },
  extraReducers: (builder) => {
    builder

      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder=action.payload
      });
  },
});


export const {resetCurrentOrder}=orderSlice.actions;

export default orderSlice.reducer;
