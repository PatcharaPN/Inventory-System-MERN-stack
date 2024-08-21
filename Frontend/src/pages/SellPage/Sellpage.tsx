import { useEffect, useMemo, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import "./Sellpage.scss";
import { getAllProducts } from "../../features/ProductSlice";
import { getCategory } from "../../features/CategorySlice";
import { addtocart, deleteItem } from "../../features/CartSlice";
import { Product } from "../../types/interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { createPayment } from "../../features/paymentSlice";
import ItemList from "../ItemsList/ItemList";
const Sellpage = () => {
  const user = useAppSelector((state: RootState) => state.auth.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state: RootState) => state.category.category
  );
  const products = useAppSelector((state: RootState) => state.product.products);
  const cart = useAppSelector((state: RootState) => state.cart.items);
  const [filterproduct, setFilterproduct] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [expandId, setExpandId] = useState<string | null>(null);
  const outOfStock = useAppSelector((state) => state.cart.outOfStock);
  const [isModalOpen, setModalOpen] = useState(false);

  const [createdBy, setcreatedBy] = useState("");
  const loading = useAppSelector((state) => state.product.loading);
  const [showAlert, setAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setcreatedBy(user._id);
  }, []);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    setFilterproduct(products);
  }, [products]); //ในกรณีทีั่เข้ามาหน้าแรก
  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const tax = useMemo(() => {
    return subtotal * 0.1;
  }, [subtotal]);
  const filteredproduct = (productCat: string) => {
    if (!productCat) {
      setFilterproduct(products);
    } else {
      const filterproduct = products.filter((product) => {
        return product.category._id === productCat;
      });
      setFilterproduct(filterproduct);
    }
  };
  const totalAmount = useMemo(() => {
    return subtotal + tax;
  }, [subtotal, tax]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Not found item in your cart",
        footer: '<a href="#">Try to addding new one</a>',
      });
    } else {
      setModalOpen(true);
    }
  };
  const handlePayment = () => {
    const productID = cart.map((item) => item.product._id);
    handleCreatePayment(productID);
  };
  const handleCreatePayment = (products: string[]) => {
    const paymentData = {
      createdBy,
      products: products,
      status: "Success",
    };
    dispatch(createPayment(paymentData));
    navigate("/Payment");
  };
  const handleAddtoCart = (products: Product) => {
    dispatch(addtocart(products));
    if (outOfStock) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Insufficient amount of product",
        footer: '<a href="#">Try to check stock or contact support</a>',
      });
    }
  };

  const handleDeleteItem = (products: Product) => {
    dispatch(deleteItem(products));
    setIsOpen(false);
  };
  const toggleMenu = (productID: any) => {
    setExpandId((prevID) => (prevID === productID ? null : productID));
  };
  return (
    <div className="item-list-container-wrapper">
      <div className="sell-page">
        <div className="item-section">
          <div className="filter-product">
            <div className="filter-menu">
              <div
                className="product-filter-btn"
                onClick={() => filteredproduct("")}
              >
                All
              </div>
              {categories.map((item) => (
                <div
                  className="product-filter-btn"
                  onClick={() => filteredproduct(item._id)}
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="searchbar-wrapper">
              <Icon className="search-icon" icon="iconamoon:search-bold" />
              <input
                placeholder="Search product"
                className="searchbar"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
              />
            </div>
          </div>
          {
            <div className="product-list">
              {filterproduct
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search) ||
                        item.productID.toLowerCase().includes(search) ||
                        item.name.toUpperCase().includes(search) ||
                        item.productID.toUpperCase().includes(search);
                })
                .map((products) => (
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                    }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="product-card"
                    onClick={() => handleAddtoCart(products)}
                  >
                    <div className="top-product-card">
                      <div>{products.productID}</div>
                      <div>{products.available}</div>
                    </div>
                    <img
                      className="productcard-img"
                      src={`http://localhost:3000/${products.productImage}`}
                    ></img>
                    <div>{products.name}</div>
                    <div className="price-section">
                      <div>{products.price}</div>
                      <div>{products.priceunit}</div>
                    </div>
                  </motion.div>
                ))}
            </div>
          }
        </div>
        <div className="summary-cart">
          <div className="menu-header">
            <h2>Total Summary</h2>
          </div>
          <div>
            {cart.length > 0 ? (
              <div className="items-container">
                {cart.map((item) => (
                  <div
                    key={item.product.productID}
                    className={`group-remove ${
                      expandId === item.product._id ? "open" : ""
                    }`}
                  >
                    <div className="item-wrapper">
                      <div className="product-items-list">
                        <div
                          className="arrow-wrapper"
                          onClick={() => toggleMenu(item.product._id)}
                        >
                          <Icon
                            className="arrow-icon"
                            icon="iconamoon:arrow-right-2-bold"
                          />
                        </div>

                        <div className="item-list-menu">
                          <div className="text-wrapper">
                            <p>{item.product.name}</p>
                            <p>{item.quantity}</p>{" "}
                          </div>
                          <div>
                            <button
                              className="remove-btn"
                              onClick={() => handleDeleteItem(item.product)}
                            >
                              <Icon width={20} icon="pajamas:remove-all" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="items-span">
                      {expandId === item.product._id ? (
                        <div className="quantity-edit">
                          <div className="group-menu">
                            <p>Quantity</p>
                            <input
                              className="input-quantity"
                              placeholder={item.quantity.toString()}
                              type="text"
                            />
                          </div>
                          <div className="group-menu">
                            <p>Discount (%)</p>
                            <input className="input-quantity" type="text" />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empry-cart">Empty cart try to adding new one</div>
            )}
          </div>
          <div className="summary-price">
            <div className="summary-context-wrapper">
              <div className="summary-context">
                <p>Subtotal</p>
                <p>{subtotal.toFixed(2)}</p>
              </div>
              <div className="summary-context">
                <p>Tax</p>
                <p>{tax.toFixed(2)}</p>
              </div>
              <div className="summary-context">
                <p>Total amount</p>
                <p>{totalAmount.toFixed(2)}</p>
              </div>
            </div>
            <div className="group-btn">
              <button className="pay-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <Modal
          header={""}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        >
          <div className="flex-header">
            {" "}
            <h3>Product list</h3>
            <div
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <Icon icon="material-symbols:close" />
            </div>
          </div>
          <div className="grid-layout-payment">
            <div className="list-item">
              {cart.map((item) => (
                <div className="item-list-cart">
                  <div className="item-list-cart">
                    <img
                      width={50}
                      alt=""
                      src={`http://localhost:3000/${item.product.productImage}`}
                    />
                    <p>{item.product.name}</p> <p>{item.quantity}</p>
                  </div>{" "}
                  <button
                    className="remove-btn"
                    onClick={() => handleDeleteItem(item.product)}
                  >
                    <Icon icon="lucide:minus" />
                  </button>
                </div>
              ))}
              <div className="total-amount">
                <div>Total Amount</div>
                <div>{totalAmount}</div>
              </div>
            </div>
            <div className="payment-method">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="payment-method-item"
                onClick={handlePayment}
              >
                <div className="payment-icon">
                  <Icon width={50} icon="flowbite:cash-outline" />
                </div>
                <div className="payment-name">Cash</div>
              </motion.div>{" "}
              <motion.div
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="payment-method-item"
              >
                <div className="payment-icon">
                  <Icon width={50} icon="flowbite:cash-outline" />
                </div>
                <div className="payment-name">Cash</div>
              </motion.div>{" "}
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Sellpage;
