import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/authService";
import { getLoginHistory } from "../services/ApiService";
import { User } from "../types/interface";
import axios from "axios";

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
  users: [] as User[],
  isLoading: false,
  error: null as string | null,
};

export const getAllUsers = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const getHistory = createAsyncThunk(
  "auth/history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLoginHistory();
      return response;
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message ||
          "Failed to fetch login history"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await login(email, password);
      localStorage.setItem("currentUser", btoa(JSON.stringify(user)));
      localStorage.setItem("accessToken", user.token);
      return user;
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message || "Login failed"
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
      localStorage.removeItem("currentUser");
      localStorage.removeItem("accessToken");
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
        state.isLoading = false;
      })
      .addCase(getHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loginHistory = action.payload;
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
