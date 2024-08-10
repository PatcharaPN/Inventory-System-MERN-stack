import { Icon } from "@iconify/react/dist/iconify.js";
import ActivityBox from "../../components/ActivityBox/ActivityBox";
import Divider from "../../components/Divider/Divider";
import "./Home.scss";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { getAmountSummary } from "../../features/ProductSlice";
const Home = () => {
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const stock = useAppSelector((state: RootState) => state.product.totalAmonst);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAmountSummary());
  }, [dispatch]);

  useEffect(() => {
    console.log("Current user:", currentUser);
  }, [currentUser]);

  return (
    <div className="menu-container">
      <div className="dashboard">
        <div className="greeting-section">
          <Icon width={35} icon="mdi:greeting-outline" />
          <h1>Hello,{currentUser.username} </h1>
        </div>

        <div className="sales-activity-wrapper">
          <div className="sales-activity">
            <div className="activity-wrapper">
              <p className="sales-header-text">Sales Acticity</p> <Divider />
              <div className="activity">
                <ActivityBox
                  total={0}
                  unit={"Qty"}
                  type={"Packed"}
                  color={"#5A8DF0"}
                />
                <ActivityBox
                  total={0}
                  unit={"Pkgs"}
                  type={"Shipped"}
                  color={"#FE4646"}
                />
                <ActivityBox
                  total={0}
                  unit={"Pkgs"}
                  type={"Delivered"}
                  color={"#2DB67D"}
                />
                <ActivityBox
                  total={0}
                  unit={"Qty"}
                  type={"Invoiced"}
                  color={"#F0CF5A"}
                />{" "}
                <ActivityBox
                  total={0}
                  unit={"Qty"}
                  type={"Invoiced"}
                  color={"#F0CF5A"}
                />{" "}
                <ActivityBox
                  total={0}
                  unit={"Qty"}
                  type={"Invoiced"}
                  color={"#F0CF5A"}
                />
              </div>
            </div>
            <div className="summary-stock-wrapper">
              <div className="summary-inventory-box">
                <h3>Inventory Summary</h3>
                <Divider />
                <div className="summary-total">
                  <p>Quantity in hand</p>
                  <p>{stock.toString()}</p>
                </div>
                <Divider />
                <div className="summary-total">
                  <p>Quantity in shipping</p>
                  <p>0</p>
                </div>
                <div className="summary-total"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-2">
        <div className="product-detail">
          <div className="header-content">
            <h3>Product Details</h3>
            <div className="wrapper-filter">
              This Month
              <Icon icon="iconamoon:arrow-down-2" />
            </div>
          </div>
          <Divider />
        </div>
        <div className="product-detail">
          <div className="header-content">
            <h3>Top Selling Products</h3>
            <div className="wrapper-filter">
              This Month
              <Icon icon="iconamoon:arrow-down-2" />
            </div>
          </div>

          <Divider />
        </div>
      </div>
    </div>
  );
};

export default Home;
