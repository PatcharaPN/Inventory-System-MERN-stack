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
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { useNavigate } from "react-router-dom";
//var CanvasJSReact = require('@canvasjs/react-charts');

const Home = () => {
  const { t } = useTranslation();
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const amountPayment = useAppSelector(
    (state: RootState) => state.payment.amount
  );
  const totalAmount = useAppSelector(
    (state: RootState) => state.product.totalAmount
  );
  const product = useAppSelector((state: RootState) => state.product.products);
  const lowStockProducts = useAppSelector(
    (state: RootState) => state.product.lowStock
  );

  useEffect(() => {
    dispatch(getAmountSummary());
  }, [dispatch]);

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

  console.log(totalAmount);

  return (
    <div className="menu-container">
      <div className="dashboard-menu">
        <ActivityBox
          total={lowStockProducts.length > 0 ? lowStockProducts[0].total : 0}
          unit={t("activityBoxUnit.lowStock")}
          type={""}
          showType="warning"
          color={"#2DB67D"}
          text={t("activityBox.lowStock")}
        />
        <ActivityBox
          total={amountPayment}
          unit={t("activityBoxUnit.complete")}
          type={""}
          showType="success"
          color={"#FE4646"}
          text={t("activityBox.complete")}
        />{" "}
        <ActivityBox
          total={totalAmount[0]?.totalStock}
          unit={t("activityBoxUnit.productsSale")}
          type={""}
          showType="info"
          color={"#FE4646"}
          onClick={() => {
            navigate("/item");
          }}
          text={t("activityBox.productsSale")}
        />{" "}
        <ActivityBox
          total={0}
          unit={t("activityBoxUnit.pendingRequests")}
          type={""}
          showType="error"
          color={"#FE4646"}
          text={t("activityBox.pendingRequests")}
        />{" "}
        <ActivityBox
          total={0}
          unit={t("activityBoxUnit.incomingInvoices")}
          type={""}
          showType="incoming"
          color={"#FE4646"}
          text={t("activityBox.incomingInvoices")}
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
