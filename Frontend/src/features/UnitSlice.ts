import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Unit {
  name: string;
  unit: string;
}

export interface UnitState {
  unit: Unit[];
  loading: boolean;
  error: string | null;
}

export const initialState: UnitState = {
  unit: [],
  loading: false,
  error: null,
};

export const getAllUnit = createAsyncThunk("unit/getall", async () => {
  try {
    const result = await axios.get("http://localhost:3000/api/unit");
    return result.data;
  } catch (error) {
    console.log("Error when getting unit (Client)", error);
  }
});
const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUnit.fulfilled, (state, action) => {
        state.unit = action.payload;
      })
      .addCase(getAllUnit.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});

export default unitSlice.reducer;
