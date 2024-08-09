import React from "react";
import "./Sidebar.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import MenuList, { menuItems } from "../MenuList";

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-relative">
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <Icon
            width={30}
            color="#2DB67D"
            icon={
              isCollapsed
                ? "fluent:chevron-right-24-filled"
                : "fluent:chevron-left-24-filled"
            }
          />
        </div>
      </div>

      <div className="sidebar-content">
        {isCollapsed ? (
          <div className="sidebar-icon">
            <div className="logo">
              <Icon width={50} color="#2DB67D" icon="lucide:figma" />
            </div>
            {menuItems.map((item, index) => (
              <Icon key={index} icon={item.icon} width={30} color="#7F5AF0" />
            ))}
          </div>
        ) : (
          <div className="content">
            <div className="logo">
              <Icon width={50} color="#2DB67D" icon="lucide:figma" />
            </div>
            <MenuList isCollapsed={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
