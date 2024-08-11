import React, { useEffect, useState } from "react";
import "./ItemList.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import Divider from "../../components/Divider/Divider";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import {
  addItem,
  deleteOne,
  getAllProducts,
  getBrand,
} from "../../features/ProductSlice";
import { motion } from "framer-motion";
import ContainerData from "../../components/ContainerData/ContainerData";
import CustomInput from "../../components/Input/Input";
import SelectInput from "../../components/Input/Selecter/Selecter";
import { getCategory } from "../../features/CategorySlice";
import { getPrice } from "../../features/PriceSlice";
import { getAllStore } from "../../features/StoreSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

const ItemList = () => {
  const products = useAppSelector((state: RootState) => state.product.products);
  const dispatch = useAppDispatch();
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
  const [OpenModel, setOpenModel] = useState(false);

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
  const handleDeleteProduct = async (productId: string) => {
    console.log("Deleting product with ID:", productId);

    try {
      await dispatch(deleteOne(productId)).unwrap();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };
  useEffect(() => {
    dispatch(getAllProducts()).unwrap();
  }, [dispatch, handleDeleteProduct]);
  const handleCloseModal = () => {
    setOpenModel(false);
  };
  const handleOpenModal = () => {
    setOpenModel(!OpenModel);
  };
  return (
    <div>
      <ContainerData
        pagename={"Item"}
        path="/Item/AddItem"
        Canadd={true}
        onClickAdd={handleOpenModal}
      >
        {" "}
        <div className="item-list-wrapper">
          {products.length === 0 ? (
            <div className="empty-img">
              <img
                width={450}
                src="/assets/undraw_empty_re_opql.svg"
                alt="Empty"
              />
              <h2 className="text-alert">
                Oops! Your inventory is empty. Try to adding new items.
              </h2>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th className="align-header">
                    Product Name <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Product ID <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Category <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Added by <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Available <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Reserved <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Stock <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="button-section">Action</th>
                </tr>
              </thead>
              <tbody className="content-wrapper">
                {products.map((product) => (
                  <motion.tr
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    key={product._id}
                  >
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="table-data">
                      <img
                        width={50}
                        height={50}
                        src={`http://localhost:3000/${product.productImage}`}
                      />
                      {product.name}
                    </td>
                    <td>{product.productID || ""}</td>
                    <td>{product.category.name}</td>
                    <td>{product.createdBy.name}</td>
                    <td>{product.available}</td>
                    <td>{product.reserved}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="button-section-wrapper">
                        <div className="button-section">
                          <button className="button-action view">
                            <Icon width={20} icon="hugeicons:view" />
                          </button>
                          <button className="button-action edit">
                            <Icon width={20} icon="uil:edit" />
                          </button>
                          <button
                            className="button-action delete"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <Icon
                              width={20}
                              icon="material-symbols:delete-outline"
                            />
                          </button>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </ContainerData>{" "}
      {OpenModel ? (
        <Modal header={""} onClose={handleCloseModal}>
          <div className="additem-content">
            <div className="additem-topmenu">
              <h2 style={{ fontWeight: "bold" }}>New Item</h2>
              <div className="btn-section">
                <button className="btn" onClick={handleSubmit}>
                  Save
                </button>
                <button className="btn white" onClick={handleCloseModal}>
                  Discard
                </button>
              </div>
            </div>
            <div className="additem-form">
              <form className="additems-grid">
                <div className="additems-input">
                  <CustomInput
                    required={true}
                    label={"Name*"}
                    value={itemName}
                    placeholder="Name"
                    onChange={(e) => setItemName(e.target.value)}
                  />
                  <CustomInput
                    required={false}
                    label={"SKU"}
                    value={sku}
                    placeholder="Enter SKU"
                    onChange={(e) => setSku(e.target.value)}
                  />
                  <SelectInput
                    label={"Unit"}
                    options={[]}
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder={"Select unit"}
                  />
                  <SelectInput
                    label={"Brand"}
                    options={brandOptions}
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    placeholder={"Select Brand"}
                  />
                  <SelectInput
                    label={"Store"}
                    options={storeOptions}
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    placeholder={"Select Store"}
                  />
                  <CustomInput
                    required={false}
                    label={"Dimension"}
                    value={dimension}
                    placeholder="Enter dimension"
                    onChange={(e) => setDimension(e.target.value)}
                  />
                  <CustomInput
                    required={false}
                    label={"Price"}
                    value={priceValue}
                    placeholder="Enter price"
                    onChange={(e) => setPriceValue(e.target.value)}
                  />
                  <SelectInput
                    label={"Price Type"}
                    options={priceOptions}
                    value={priceType}
                    onChange={(e) => setPriceType(e.target.value)}
                    placeholder={"Price Type"}
                  />{" "}
                  <SelectInput
                    label={"Category"}
                    options={categoryOption}
                    value={categoryType}
                    onChange={(e) => setcategoryType(e.target.value)}
                    placeholder={"Price Type"}
                  />
                </div>
                <div className="image-upload-section">
                  <div className="image-input-border">
                    <div className="upload-text">
                      <p>Drag image here</p> <br /> <p>or</p> <br />{" "}
                      <p style={{ color: "#7F5AF0" }}>Browse Image</p>
                    </div>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                  <p>File: {image?.name}</p>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default ItemList;
