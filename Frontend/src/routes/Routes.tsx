import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import ItemList from "../pages/ItemsList/ItemList";
import Category from "../pages/Category/Category";
import PriceType from "../pages/PriceType/PriceType";
import CompositeItem from "../pages/Composite/CompositeItem";
import LoginHistory from "../pages/LoginHistory/LoginHistory";
import Store from "../pages/Store/Store";
import BrandPage from "../pages/Brand/Brand";
import PermissionPage from "../pages/Permission/Permission";
import Sellpage from "../pages/SellPage/Sellpage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Sellpage />} />
      <Route path="/Dashboard" element={<Home />} />
      <Route path="/item" element={<ItemList />} />
      <Route path="/Category" element={<Category />} />
      <Route path="/Price" element={<PriceType />} />
      <Route path="/Composite" element={<CompositeItem />} />
      <Route path="/History" element={<LoginHistory />} />
      <Route path="/Store" element={<Store />} />
      <Route path="/Brand" element={<BrandPage />} />
      <Route path="/Permission" element={<PermissionPage />} />
    </Routes>
  );
};

export default AppRoutes;
