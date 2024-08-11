import React, { ReactNode } from "react";
import "./ContainerData.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import Divider from "../Divider/Divider";
import "./ContainerData.scss";
import { Link } from "react-router-dom";
type ContainerProps = {
  pagename: string;
  children?: ReactNode;
  path?: string;
  headerVisible?: boolean;
  onClickAdd?: () => void;
  Canadd?: boolean;
};

const ContainerData: React.FC<ContainerProps> = ({
  path,
  children,
  pagename,
  onClickAdd,
  Canadd = false,
  headerVisible = true,
}) => {
  return (
    <div className="item-list-container-wrapper">
      <div className="header-menu">
        <h1 className="header">{pagename}</h1>
        <div className="menu-button"></div>
      </div>

      <div className="item-list-container">
        {headerVisible ? (
          <div>
            <div className="header-top">
              <h3 className="text-header">All items</h3>
              <div className="right-group-btn">
                {Canadd ? (
                  <div className="add-btn-item" onClick={onClickAdd}>
                    <Icon icon="material-symbols:add" />
                    Add
                  </div>
                ) : null}
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
          </div>
        ) : null}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default ContainerData;
