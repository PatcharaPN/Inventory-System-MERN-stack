import React, { useEffect, useState } from "react";
import ContainerData from "../../../components/ContainerData/ContainerData";
import "./AddItem.scss";
import CustomInput from "../../../components/Input/Input";
import SelectInput from "../../../components/Input/Selecter/Selecter";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { getAllStore } from "../../../features/StoreSlice";
import { getPrice } from "../../../features/PriceSlice";
import { getBrand, addItem } from "../../../features/ProductSlice";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../../features/CategorySlice";
import Modal from "../../../components/Modal/Modal";

const AddItem = () => {
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const navigate = useNavigate();
  const store = useAppSelector((state: RootState) => state.store.store);
  const price = useAppSelector((state: RootState) => state.price.price);
  const category = useAppSelector(
    (state: RootState) => state.category.category
  );
  const brand = useAppSelector((state: RootState) => state.product.brand);
  const dispatch = useAppDispatch();

  const [itemName, setItemName] = useState("");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [priceType, setPriceType] = useState("");
  const [categoryType, setcategoryType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [dimension, setDimension] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    dispatch(getAllStore());
    dispatch(getPrice());
    dispatch(getBrand());
    dispatch(getCategory());
  }, [dispatch]);

  const priceOptions = price.map((price) => ({
    value: price._id || "",
    label: price.unit || "Unnamed Price",
  }));
  const categoryOption = category.map((cat) => ({
    value: cat._id || "",
    label: cat.name || "Unnamed Price",
  }));

  const brandOptions = brand.map((brand) => ({
    value: brand._id || "",
    label: brand.name || "Unnamed Brand",
  }));

  const storeOptions = store.map((store) => ({
    value: store._id || "",
    label: store.storename || "Unnamed Store",
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedStore);
    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("sku", sku);
    formData.append("unit", unit);
    formData.append("store", selectedStore);
    formData.append("priceType", priceType);
    formData.append("brand", selectedBrand);
    formData.append("category", categoryType);
    formData.append("dimension", dimension);
    formData.append("priceValue", priceValue);
    formData.append("createdBy", currentUser._id);
    if (image) {
      formData.append("productImage", image);
    }

    dispatch(addItem(formData));
    navigate("/Item");
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return <div></div>;
};

export default AddItem;
