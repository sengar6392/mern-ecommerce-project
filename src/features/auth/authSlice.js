import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUser, loginUser, registerUser, logoutUser } from "./authAPI";
import { enqueueSnackbar } from "notistack";

export const registerUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const data = await registerUser(userData);
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
export const logoutUserAsync = createAsyncThunk("user/logoutUser", async () => {
  const res = await logoutUser();
  return res;
});

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          state.userInfo = action.payload;
          localStorage.setItem("userInfo", JSON.stringify(action.payload));
        }
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = null;
        localStorage.removeItem("userInfo");
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        state.userInfo = action.payload;
      });
  },
});

export default authSlice.reducer;
