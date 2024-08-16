import { useEffect, useMemo, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import "./Sellpage.scss";
import { getAllProducts } from "../../features/ProductSlice";
import { getCategory } from "../../features/CategorySlice";
import { addtocart, deleteItem } from "../../features/CartSlice";
import { Product } from "../../types/interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const Sellpage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state: RootState) => state.category.category
  );
  const products = useAppSelector((state: RootState) => state.product.products);
  const cart = useAppSelector((state: RootState) => state.cart.items);
  const [filterproduct, setFilterproduct] = useState<Product[]>([]);
  const [expandId, setExpandId] = useState<string | null>(null);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  console.log(categories, products);

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
    if (productCat === "") {
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

  const handleAddtoCart = (products: Product) => {
    dispatch(addtocart(products));
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
                type="text"
              />
            </div>
          </div>
          <div className="product-list">
            {filterproduct.map((products) => (
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
                <div>{products.productID}</div>
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
        </div>
        <div className="summary-cart">
          <div className="menu-header">
            <h2>Total Summary</h2>
          </div>
          <div>
            {cart.length > 0 && (
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
                            <p>Quantity: {item.quantity}</p>{" "}
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
                    </div>{" "}
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
              <button className="pay-btn">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellpage;
