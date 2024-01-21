import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, updateUser } from "./authAPI";
export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const data = await createUser(userData);
    return data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUserAsync",
  async (userData) => {
    const data = await updateUser(userData);
    return data;
  }
);
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo) => {
    const res = await loginUser(loginInfo);
    return res;
  }
);

const initialState = {
  loggedInUser: localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser"))
    : null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
        // state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.status = "idle";
        localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
        state.loggedInUser=action.payload
        // state.loggedInUser = action.payload;
      });
  },
});

export default authSlice.reducer;
