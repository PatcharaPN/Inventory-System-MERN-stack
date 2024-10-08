import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { fetchPrice } from "../services/ApiService";
import axios from "axios";

export type Price = {
  _id: string;
  name: string;
  unit: string;
  description: string;
  addedBy: User;
};
export interface User {
  name: string;
  role: string;
}
export interface PriceState {
  price: Price[];
  loading: boolean;
  error: string | null;
}

const initialState: PriceState = {
  price: [],
  loading: false,
  error: null,
};
export const getPrice = createAsyncThunk("price/getAll", async () => {
  try {
    const data = await fetchPrice();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const createPrice = createAsyncThunk<
  Price,
  { name: string; unit: string; description: string; addedBy: string }
>("store/create", async (priceData, thunkAPI) => {
  try {
    const response = await axios.post<Price>(
      "http://localhost:3000/api/Price",
      priceData
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPrices: (state, action: PayloadAction<Price[]>) => {
      state.price = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPrice.fulfilled, (state, action) => {
        state.price = action.payload;
        state.loading = false;
      })
      .addCase(getPrice.rejected, (state, action) => {
        state.error = action.error as string;
      })
      .addCase(createPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPrice.fulfilled, (state, action) => {
        state.price.push(action.payload);
        state.loading = false;
      })
      .addCase(createPrice.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});

export default priceSlice.reducer;
