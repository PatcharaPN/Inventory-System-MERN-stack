import { useEffect, useMemo, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import "./Sellpage.scss";
import { getAllProducts } from "../../features/ProductSlice";
import { getCategory } from "../../features/CategorySlice";
import { addtocart, deleteItem } from "../../features/CartSlice";
import { Product } from "../../types/interface";
import { Icon } from "@iconify/react/dist/iconify.js";

const Sellpage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state: RootState) => state.category.category
  );
  const products = useAppSelector((state: RootState) => state.product.products);
  const cart = useAppSelector((state: RootState) => state.cart.items);

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
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="item-list-container-wrapper">
      <div className="sell-page">
        <div className="item-section">
          <div className="filter-product">
            {categories.map((item) => (
              <div className="product-filter-btn">{item.name}</div>
            ))}
          </div>
          <div className="product-list">
            {products.map((products) => (
              <div
                className="product-card"
                onClick={() => handleAddtoCart(products)}
              >
                <div>{products.productID}</div>
                <img
                  className="productcard-img"
                  src={`http://localhost:3000/${products.productImage}`}
                ></img>
                <div>{products.name}</div>
                <div>{products.price}</div>
              </div>
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
                    className={`group-remove ${isOpen ? "open" : ""}`}
                  >
                    <div className="item-wrapper">
                      <div className="product-items-list">
                        <div className="arrow-wrapper" onClick={toggleMenu}>
                          <Icon
                            className="arrow-icon"
                            icon="iconamoon:arrow-right-2-bold"
                          />
                        </div>

                        <div className="item-list-menu">
                          <p>{item.product.name}</p>
                          <p>Quantity: {item.quantity}</p>{" "}
                          <button
                            className="remove-btn"
                            onClick={() => handleDeleteItem(item.product)}
                          >
                            <Icon width={20} icon="pajamas:remove-all" />
                          </button>{" "}
                        </div>
                      </div>
                    </div>{" "}
                    <div className="items-span">
                      {isOpen ? (
                        <div className="quantity-edit">
                          <div className="group-menu">
                            <p>Quantity</p>
                            <input className="input-quantity" type="text" />
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
