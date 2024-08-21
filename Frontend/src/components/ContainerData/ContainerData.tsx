import React, { ReactNode } from "react";
import "./ContainerData.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import Divider from "../Divider/Divider";
import "./ContainerData.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
type ContainerProps = {
  pagename: string;
  children?: ReactNode;
  path?: string;
  headerVisible?: boolean;
  onClickAdd?: () => void;
  Canadd?: boolean;
  pagenameContainer?: boolean;
};

const ContainerData: React.FC<ContainerProps> = ({
  path,
  children,
  pagename,
  pagenameContainer = true,
  onClickAdd,
  Canadd = false,
  headerVisible = true,
}) => {
  return (
    <div className="item-list-container-wrapper">
      {pagenameContainer ? (
        <div className="header-menu">
          <h1 className="header">{pagename}</h1>
          <div className="menu-button"></div>
        </div>
      ) : null}
      <div className="item-list-container">
        {headerVisible ? (
          <div>
            <div className="header-top">
              <h3 className="text-header">All items</h3>
              <div className="right-group-btn">
                {Canadd ? (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="add-btn-item"
                    onClick={onClickAdd}
                  >
                    <Icon icon="material-symbols:add" />
                    Add
                  </motion.div>
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
