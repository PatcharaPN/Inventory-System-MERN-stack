import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "../features/AuthSlice";
import productReducer from "../features/ProductSlice";
import unitReducer from "../features/UnitSlice";
import categoryReducer from "../features/CategorySlice";
import priceReducer from "../features/PriceSlice";
import storeReducer from "../features/StoreSlice";
import cartReducer from "../features/CartSlice";
import paymentReducer from "../features/paymentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    price: priceReducer,
    store: storeReducer,
    cart: cartReducer,
    unit: unitReducer,
    payment: paymentReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
