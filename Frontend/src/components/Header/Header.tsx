import React, { useState } from "react";
import "./Header.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isPopover, setPopover] = useState(false);
  const navigate = useNavigate();
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const dispatch = useAppDispatch();

  const getUserInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return names[0][0] + names[1][0];
    }
    return names[0][0] + names[0][4];
  };
  const logout = async () => {
    dispatch(logout);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <div className="head-container">
      <div className="user-container">
        <Icon color="#7F5AF0" icon="uil:setting" width={30} />
        <Icon color="#7F5AF0" icon="material-symbols:mail" width={30} />
        <div className="popover-user">
          <p>
            {currentUser.username} ({currentUser.role})
          </p>
          <Icon
            onClick={() => setPopover(!isPopover)}
            icon="iconamoon:arrow-down-2-duotone"
          />
        </div>
        <div className={`popover-menu ${isPopover ? "show" : ""}`}>
          <ul>
            <li className="menu" onClick={logout}>
              Edit Profile
            </li>
            <li className="menu" onClick={logout}>
              Setting
            </li>
            <li className="menu" onClick={logout}>
              Log out
            </li>
          </ul>
        </div>
        <div
          className="user-pic"
          style={{
            border: currentUser.role === "admin" ? "solid 2px #00FF95" : "none",
          }}
        >
          {getUserInitials(currentUser.username).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Header;
