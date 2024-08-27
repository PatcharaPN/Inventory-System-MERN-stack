import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getAmount,
  getProduct,
} from "../services/productService";
import { getAllAmount, Product, User } from "../types/interface";
import { fetchBrand } from "../services/ApiService";
import axios from "axios";

export interface Brand {
  _id: string;
  name: string;
  prefix: string;
  addedBy: User;
}
export interface LowStockItem {
  _id: string;
  lowStock: number;
  total: number;
  products: Product;
}
export interface ProductState {
  products: Product[];
  brand: Brand[];
  lowStock: LowStockItem[];
  totalAmount: getAllAmount[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  brand: [],
  lowStock: [],
  loading: false,
  totalAmount: [],
  error: null,
};

export const getBrand = createAsyncThunk<Brand[]>("brand/getAll", async () => {
  try {
    const res = await fetchBrand();
    return res;
  } catch (error) {
    console.error("Error when fetching brands", error);
    throw error;
  }
});

export const getAmountSummary = createAsyncThunk<getAllAmount[]>(
  "products/getAmount",
  async () => {
    try {
      const data = await getAmount();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error when fetching amount summary", error);
      throw error;
    }
  },
);

export const addItem = createAsyncThunk<Product, FormData>(
  "product/addItem",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await addProduct(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const lowStock = createAsyncThunk<LowStockItem[]>(
  "product/lowStock",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/lowstock");
      return response.data;
    } catch (error) {
      console.error("Error fetching low stock data:", error);
      throw error;
    }
  },
);

export const createBrand = createAsyncThunk(
  "product/createBrand",
  async (
    brandData: { name: string; prefix: string; addedBy: string },
    thunkAPI,
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/brand",
        brandData,
        { timeout: 10000 },
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to create brand",
      );
    }
  },
);

export const getAllProducts = createAsyncThunk<Product[]>(
  "products/getAll",
  async () => {
    try {
      const data = await getProduct();
      const groupedProducts = data.reduce(
        (acc: Record<string, Product & { _id: string }>, product: Product) => {
          const key = `${product.name}-${product.price}`;
          if (!acc[key]) {
            acc[key] = {
              ...product,
              stock: 0,
              available: 0,
              reserved: 0,
            };
          }
          acc[key].stock += product.stock;
          acc[key].available += product.available;
          acc[key].reserved += product.reserved;
          return acc;
        },
        {} as Record<string, Product & { _id: string }>,
      );
      return Object.values(groupedProducts);
    } catch (error) {
      console.error("Error when fetching products", error);
      throw error;
    }
  },
);

export const deleteOne = createAsyncThunk<Product, string>(
  "products/delete",
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await deleteProduct(productId);
      return res;
    } catch (error) {
      return rejectWithValue("Failed to delete the product");
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch products";
        state.loading = false;
      })
      .addCase(deleteOne.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOne.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id,
        );
      })
      .addCase(deleteOne.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getAmountSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAmountSummary.fulfilled, (state, action) => {
        state.totalAmount = action.payload;
        state.loading = false;
      })
      .addCase(getAmountSummary.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch amount summary";
        state.loading = false;
      })
      .addCase(getBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.brand = action.payload;
        state.loading = false;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch brands";
        state.loading = false;
      })
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brand.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(lowStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(lowStock.fulfilled, (state, action) => {
        state.lowStock = action.payload;
      })
      .addCase(lowStock.rejected, (state, action) => {
        state.error = action.error as string;
      });
  },
});

export default productSlice.reducer;
