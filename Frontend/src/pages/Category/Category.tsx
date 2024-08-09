import React, { useEffect } from "react";
import "./Category.scss";
import Divider from "../../components/Divider/Divider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getCategory } from "../../features/CategorySlice";

const Category = () => {
  const category = useAppSelector(
    (state: RootState) => state.category.category
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  console.log(category);

  return (
    <div className="item-list-container-wrapper">
      <div className="header-menu">
        <h1 className="header">Category</h1>
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
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" />
                </th>
                <th className="align-header">
                  Category Name <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="align-header">
                  Products <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="align-header">
                  Create by <Icon icon="octicon:triangle-down-16" />
                </th>

                <th className="align-header">
                  Role <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="button-section">Action</th>
              </tr>
            </thead>
            <tbody>
              {category.map((cat) => (
                <tr key={cat._id}>
                  <td>
                    <input type="checkbox" />
                  </td>

                  <td className="table-data">{cat.name}</td>
                  <td>{cat.productCount}</td>

                  <td>{cat.createdBy.name}</td>
                  <td>{cat.createdBy.role}</td>
                  <td className="button-section">
                    <button className="button-action view">
                      <Icon width={20} icon="hugeicons:view" />
                    </button>
                    <button className="button-action edit">
                      <Icon width={20} icon="uil:edit" />
                    </button>
                    <button className="button-action delete" onClick={() => {}}>
                      <Icon width={20} icon="material-symbols:delete-outline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Category;
