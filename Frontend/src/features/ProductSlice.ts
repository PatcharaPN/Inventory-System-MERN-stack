import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteProduct,
  getAmount,
  getProduct,
} from "../services/productService";
import { getAllAmount, Product } from "../types/interface";

export interface ProductState {
  products: Product[];
  totalAmonst: getAllAmount[];
  loading: boolean;
  error: string | null;
}
const initialState: ProductState = {
  products: [],
  loading: false,
  totalAmonst: [],
  error: null,
};

export const getAmountSummary = createAsyncThunk<getAllAmount[]>(
  "products/getAmont",
  async () => {
    const data = await getAmount();
    if (data.length > 0) {
      return data[0].totalStock;
    }
    return 0;
  }
);

export const getAllProducts = createAsyncThunk<Product[]>(
  "products/getAll",
  async () => {
    const data = await getProduct();

    const groupedProducts = data.reduce(
      (acc: Record<string, Product & { _id: string }>, product: Product) => {
        const key = `${product.name}-${product.price}-${product.category._id}`;

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
      {} as Record<string, Product & { _id: string }>
    );

    return Object.values(groupedProducts);
  }
);

export const deleteOne = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/delete", async (productId: string, { rejectWithValue }) => {
  try {
    const res = await deleteProduct(productId);
    console.log(res);
    return res;
  } catch (error) {
    return rejectWithValue("Failed to delete the product");
  }
});

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
        state.error = action.error as string;
      })
      .addCase(deleteOne.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOne.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(deleteOne.rejected, (state, action) => {
        state.error = action.error as string;
      })
      .addCase(getAmountSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAmountSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.totalAmonst = action.payload;
      });
  },
});

export default productSlice.reducer;
