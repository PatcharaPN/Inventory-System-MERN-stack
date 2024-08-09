import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../services/authService";

const storedUser = localStorage.getItem("currentUser");
const initialState = {
  currentUser: storedUser ? JSON.parse(atob(storedUser)) : null,
  isLoading: false,
  error: null as string | null,
};
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await login(email, password);
      console.log(user.token);
      localStorage.setItem("currentUser", btoa(JSON.stringify(user)));
      localStorage.setItem("accessToken", user.token);
      return user;
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message || "login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
