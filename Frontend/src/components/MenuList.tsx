import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./MenuList.scss";
import { Link } from "react-router-dom";

type SubmenuItem = {
  label: string;
  path?: string;
  onClick: () => void;
};

export type MenuItem = {
  icon: string;
  label: string;
  path?: string;
  submenu?: SubmenuItem[];
  onClick?: () => void;
};

export const menuItems: MenuItem[] = [
  { icon: "material-symbols:dashboard", label: "Dashboard", path: "/" },
  {
    icon: "material-symbols-light:inventory-2-rounded",
    label: "Inventory",
    submenu: [
      {
        label: "Items",
        onClick: () => console.log("Items clicked"),
        path: "/item",
      },
      {
        label: "Store",
        onClick: () => console.log("Price Types clicked"),
        path: "/Store",
      },
      {
        label: "Brand",
        onClick: () => console.log("Price Types clicked"),
        path: "/Brand",
      },
      {
        label: "Composite Items",
        onClick: () => console.log("Composite Items clicked"),
        path: "/Composite",
      },
      {
        label: "Category",
        onClick: () => console.log("Category clicked"),
        path: "/Category",
      },
      {
        label: "Price Types",
        onClick: () => console.log("Price Types clicked"),
        path: "/Price",
      },
    ],
  },
  {
    icon: "akar-icons:cart",
    label: "Sales Orders",
    submenu: [
      { label: "Customers", onClick: () => console.log("Items clicked") },
      {
        label: "Sales Orders",
        onClick: () => console.log("Composite Items clicked"),
      },
      { label: "Packages", onClick: () => console.log("Category clicked") },
      {
        label: "Shipments",
        onClick: () => console.log("Price Types clicked"),
      },
    ],
  },
  { icon: "basil:bag-solid", label: "Purchases Orders" },
  { icon: "basil:invoice-solid", label: "Invoices" },
  { icon: "icon-park-solid:bill", label: "Bills" },
  { icon: "mdi:verified-user", label: "User Permission", path: "/Permission" },
  {
    icon: "material-symbols:history",
    label: "Login History",
    path: "/History",
  },
];

type MenuListProps = {
  isCollapsed: boolean;
};

const MenuList: React.FC<MenuListProps> = ({ isCollapsed }) => {
  const [expandedMenus, setExpandedMenus] = useState<number | null>(null);

  const toggleSubmenu = (index: number) => {
    setExpandedMenus((prev) => (prev === index ? null : index));
  };

  return (
    <div className="menu-list">
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={item.label}
            className={`menu-item ${expandedMenus === index ? "expanded" : ""}`}
          >
            <Link to={item.path || "#"}>
              {" "}
              <div
                className="menu-item-content"
                onClick={() =>
                  item.submenu ? toggleSubmenu(index) : item.onClick?.()
                }
              >
                <div className="menu-items">
                  <Icon color="#7F5AF0" icon={item.icon} width={25} />
                  {item.label}
                </div>
                {item.submenu && (
                  <Icon
                    icon={
                      expandedMenus === index
                        ? "octicon:triangle-down-16"
                        : "octicon:triangle-right-16"
                    }
                    color="#2DB67D"
                    width={25}
                    className="submenu-toggle"
                  />
                )}
              </div>
            </Link>
            {item.submenu && !isCollapsed && (
              <ul className="submenu">
                {item.submenu.map((subItem) => (
                  <Link to={subItem.path || "#"}>
                    <li
                      key={subItem.label}
                      className="submenu-item"
                      onClick={subItem.onClick}
                    >
                      {subItem.label}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
