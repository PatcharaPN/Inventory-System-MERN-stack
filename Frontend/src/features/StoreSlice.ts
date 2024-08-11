import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, User } from "../types/interface";
import { fetchStore } from "../services/ApiService";

export interface Store {
  _id: string;
  storename: string;
  location: string;
  owner: User;
  product: Product[];
}

export interface StoreState {
  store: Store[];
  loading: boolean;
  error: string | null;
}

const initialState: StoreState = {
  store: [],
  loading: false,
  error: null,
};

export const getAllStore = createAsyncThunk<Store[]>(
  "store/getAll",
  async () => {
    try {
      const data = await fetchStore();
      return data;
    } catch (error) {
      throw new Error("Error fetching store");
    }
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStore: (state, action: PayloadAction<Store[]>) => {
      state.store = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStore.pending, (state) => {
        state.loading = false;
      })
      .addCase(getAllStore.fulfilled, (store, action) => {
        store.store = action.payload;
        store.loading = false;
      })
      .addCase(getAllStore.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});

export default storeSlice.reducer;
