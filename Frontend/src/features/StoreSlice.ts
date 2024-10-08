import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, User } from "../types/interface";
import axios from "axios";

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

export const createStore = createAsyncThunk<
  Store,
  { storename: string; location: string; owner: string }
>("store/create", async (storeData, thunkAPI) => {
  try {
    const response = await axios.post<Store>(
      "http://localhost:3000/api/Store",
      storeData
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const getAllStore = createAsyncThunk<Store[]>(
  "store/getAll",
  async () => {
    try {
      const response = await axios.get<Store[]>(
        "http://localhost:3000/api/Store"
      );
      return response.data;
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
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllStore.fulfilled,
        (state, action: PayloadAction<Store[]>) => {
          state.store = action.payload;
          state.loading = false;
        }
      )
      .addCase(getAllStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(createStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStore.fulfilled, (state, action: PayloadAction<Store>) => {
        state.store.push(action.payload);
        state.loading = false;
      })
      .addCase(createStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default storeSlice.reducer;
