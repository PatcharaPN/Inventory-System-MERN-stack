import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../services/authService";
import { getLoginHistory } from "../services/ApiService";
import { User } from "../types/interface";

const storedUser = localStorage.getItem("currentUser");
export interface History {
  userId: string;
  user: User;
  ipAddress: string;
  loginTime: Date;
  userAgent: string;
}
const initialState = {
  currentUser: storedUser ? JSON.parse(atob(storedUser)) : null,
  loginHistory: [] as History[],
  isLoading: false,
  error: null as string | null,
};

export const getHistory = createAsyncThunk("auth/history", async () => {
  try {
    const result = await getLoginHistory();
    return result;
  } catch (error) {
    console.log(error);
  }
});
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
      state.loginHistory = [];
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
      })
      .addCase(getHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loginHistory = action.payload;
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
