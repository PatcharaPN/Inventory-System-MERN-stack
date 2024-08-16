import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/interface";

interface CartItem {
  product: Product;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}
const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      }
    },

    deleteItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product.name !== action.payload.name
          );
        }
      }
    },
  },
});

export const { addtocart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
