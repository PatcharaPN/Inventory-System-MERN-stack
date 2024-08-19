import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, User } from "../types/interface";
import axios from "axios";

// Define the Payment type
export type Payment = {
  _id: string;
  createdBy: User;
  products: Product;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

// Define the PaymentState interface
export interface PaymentState {
  payments: Payment[]; // Changed to 'payments' to reflect multiple payments
  loading: boolean;
  error: string | null;
}

// Initialize the state
const initialState: PaymentState = {
  payments: [],
  loading: false,
  error: null,
};

// Define the thunk for creating a payment
export const createPayment = createAsyncThunk<
  Payment,
  { createdBy: string; products: string[]; status: string } // Updated `products` to be an array of strings
>("payment/create", async (paymentData, thunkAPI) => {
  try {
    const response = await axios.post<Payment>(
      "http://localhost:3000/api/payment",
      paymentData
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Define the thunk for fetching all payments
export const getAllPayments = createAsyncThunk<Payment[]>(
  "payment/getAll", // Updated action type to reflect fetching all payments
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Payment[]>(
        "http://localhost:3000/api/payment"
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.error = action.error.message || null;
      })
      .addCase(getAllPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.error = action.error.message || null;
      });
  },
});

export default paymentSlice.reducer;
