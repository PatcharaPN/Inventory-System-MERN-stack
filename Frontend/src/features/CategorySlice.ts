import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllCategory } from "../services/categoryService";
import { Categories, CategorieState } from "../types/interface";

export const getCategory = createAsyncThunk("category/getAll", async () => {
  try {
    const res = await getAllCategory();
    return res;
  } catch (error) {
    console.error("Error when fetching category", error);
  }
});

const initialState: CategorieState = {
  category: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Categories[]>) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});

export default categorySlice.reducer;
