import { Icon } from "@iconify/react/dist/iconify.js";
import ActivityBox from "../../components/ActivityBox/ActivityBox";
import Divider from "../../components/Divider/Divider";
import "./Home.scss";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { getAmountSummary, lowStock } from "../../features/ProductSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const lowStockProducts = useAppSelector(
    (state: RootState) => state.product.lowStock
  );
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );

  useEffect(() => {
    dispatch(getAmountSummary());
    dispatch(lowStock());
  }, [dispatch]);

  console.log(lowStockProducts);

  useEffect(() => {
    console.log("Current user:", currentUser);
  }, [currentUser]);

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
          total={0}
          unit={"Task"}
          type={""}
          showType="success"
          color={"#FE4646"}
          text="Complete"
        />
      </div>
    </div>
  );
};

export default Home;
