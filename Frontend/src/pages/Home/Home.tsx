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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAmountSummary());
  }, [dispatch]);

  useEffect(() => {
    console.log("Current user:", currentUser);
  }, [currentUser]);

  return (
    <div className="menu-container">
      <div className="dashboard"></div>
    </div>
  );
};

export default Home;
