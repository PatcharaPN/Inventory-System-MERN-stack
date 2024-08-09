import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { fetchPrice } from "../services/ApiService";

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
      });
  },
});

export default priceSlice.reducer;
