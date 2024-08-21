import ActivityBox from "../../components/ActivityBox/ActivityBox";
import "./Home.scss";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getAmountSummary,
  lowStock,
} from "../../features/ProductSlice";
import { getAmountOfPayment } from "../../features/paymentSlice";
import MyChart from "../../components/Graph/BarChart";
import { Product } from "../../types/interface";
import { motion } from "framer-motion";
import WeeklyLineChart from "../../components/Graph/WeekChart";

//var CanvasJSReact = require('@canvasjs/react-charts');

const Home = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();
  const amountPayment = useAppSelector(
    (state: RootState) => state.payment.amount
  );
  const product = useAppSelector((state: RootState) => state.product.products);
  const lowStockProducts = useAppSelector(
    (state: RootState) => state.product.lowStock
  );
  useEffect(() => {
    if (product.length > 0) {
      const lastedSevenday = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const filteredProducts = product.filter(
        (products) => new Date(products.createdAt).getTime() >= lastedSevenday
      );
      const sortedProducts = filteredProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNewProducts(sortedProducts.slice(0, 4));
    }
  }, [product]);
  useEffect(() => {
    dispatch(getAmountOfPayment());
    dispatch(getAllProducts());
  }, []);
  console.log(amountPayment);

  useEffect(() => {
    dispatch(getAmountSummary());
    dispatch(lowStock());
  }, [dispatch]);

  return (
    <div className="menu-container">
      <div className="dashboard-menu">
        <ActivityBox
          total={lowStockProducts.length > 0 ? lowStockProducts[0].total : 0}
          unit={"Items"}
          type={""}
          showType="warning"
          color={"#2DB67D"}
          text="Nearing Out of Stock"
        />
        <ActivityBox
          total={amountPayment}
          unit={"Saled Product"}
          type={""}
          showType="success"
          color={"#FE4646"}
          text="Complete"
        />{" "}
        <ActivityBox
          total={0}
          unit={"Qty"}
          type={""}
          showType="info"
          color={"#FE4646"}
          text="Products sale"
        />{" "}
        <ActivityBox
          total={0}
          unit={"Task"}
          type={""}
          showType="error"
          color={"#FE4646"}
          text="Pending Requests"
        />{" "}
        <ActivityBox
          total={0}
          unit={"Qty"}
          type={""}
          showType="incoming"
          color={"#FE4646"}
          text="Incoming Invoices"
        />
      </div>
      <div className="graph-analysis">
        <div className="dashboard-graph">
          <MyChart />
        </div>
        <div className="dashboard-graph-line">
          <div>
            <WeeklyLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
//WeeklyLineChart
