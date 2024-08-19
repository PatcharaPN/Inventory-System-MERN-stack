import React, { useMemo } from "react";
import "./PaymentPage.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../features/CartSlice";

const PaymentPage = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const handlegoback = () => {
    navigate("/");
    dispatch(clearCart());
  };
  // Calculate tax (10%)
  const tax = useMemo(() => {
    return subtotal * 0.1;
  }, [subtotal]);

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return subtotal + tax;
  }, [subtotal, tax]);

  return (
    <div className="paymentmenu-wrapper">
      <div className="paymentmenu">
        <div className="payment-result">
          <div>
            <Icon width={120} className="check-icon" icon="gg:check-o" />
          </div>
          <p className="complete-text">
            Your order operation has been completed
          </p>

          <div className="product-information">
            <div>Order</div>
            <div>Amount</div>
          </div>
          {cart.map((item) => (
            <div key={item.product._id} className="flex-product-info">
              <p>{item.product.name}</p>
              <p>${item.product.price.toFixed(2)}</p>
            </div>
          ))}
          <div className="product-information">
            <div>Total amount</div>
            <div>${totalAmount.toFixed(2)}</div>
          </div>
          <div className="flex-btn-group">
            <button className="back-btn" onClick={handlegoback}>
              Back to main page
            </button>
            <button className="download-receipt">
              <Icon width={30} icon="material-symbols:download" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
