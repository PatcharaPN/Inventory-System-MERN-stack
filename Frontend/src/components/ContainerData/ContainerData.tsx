import React, { ReactNode } from "react";
import "./ContainerData.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import Divider from "../Divider/Divider";
type ContainerProps = {
  pagename: string;
  children?: ReactNode;
};

const ContainerData: React.FC<ContainerProps> = ({ children, pagename }) => {
  return (
    <div className="item-list-container-wrapper">
      <div className="header-menu">
        <h1 className="header">{pagename}</h1>
        <div className="menu-button">
          <button className="action-btn export">
            <Icon width={20} icon="uil:export" />
            Export
          </button>
          <button className="action-btn add">
            <Icon width={30} icon="material-symbols:add" />
            Add Item
          </button>
        </div>
      </div>

      <div className="item-list-container">
        <div className="header-top">
          <h3 className="text-header">All items</h3>
          <div className="right-group-btn">
            <div className="searchbar-wrapper">
              <Icon className="search-icon" icon="iconamoon:search-bold" />
              <input
                placeholder="Search product"
                className="searchbar"
                type="text"
              />
            </div>

            <div className="filter-btn">
              <Icon icon="mage:filter-fill" />
              Filter
            </div>
          </div>
        </div>
        <Divider />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ContainerData;
