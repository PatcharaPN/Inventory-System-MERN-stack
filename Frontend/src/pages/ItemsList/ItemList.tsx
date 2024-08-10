import React, { useEffect } from "react";
import "./ItemList.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import Divider from "../../components/Divider/Divider";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { deleteOne, getAllProducts } from "../../features/ProductSlice";
import { motion } from "framer-motion";
import ContainerData from "../../components/ContainerData/ContainerData";

const ItemList = () => {
  const products = useAppSelector((state: RootState) => state.product.products);
  const dispatch = useAppDispatch();

  const handleDeleteProduct = async (productId: string) => {
    console.log("Deleting product with ID:", productId);

    try {
      await dispatch(deleteOne(productId)).unwrap();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };
  useEffect(() => {
    dispatch(getAllProducts()).unwrap();
  }, [dispatch, handleDeleteProduct]);

  return (
    <div>
      <ContainerData pagename={"Item"} path="/Item/AddItem">
        {" "}
        <div className="item-list-wrapper">
          {products.length === 0 ? (
            <div className="empty-img">
              <img
                width={450}
                src="/assets/undraw_empty_re_opql.svg"
                alt="Empty"
              />
              <h2 className="text-alert">
                Oops! Your inventory is empty. Try to adding new items.
              </h2>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th className="align-header">
                    Product Name <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Product ID <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Category <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Added by <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Location <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Available <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Reserved <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Stock <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="button-section">Action</th>
                </tr>
              </thead>
              <tbody className="content-wrapper">
                {products.map((product) => (
                  <motion.tr
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    key={product._id}
                  >
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="table-data">
                      <img
                        width={50}
                        height={50}
                        src={`http://localhost:3000/${product.productImage}`}
                      />
                      {product.name}
                    </td>
                    <td>{product._id}</td>
                    <td>{product.category.name}</td>
                    <td>{product.createdBy.name}</td>
                    <td>{product.location}</td>
                    <td>{product.available}</td>
                    <td>{product.reserved}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="button-section-wrapper">
                        <div className="button-section">
                          <button className="button-action view">
                            <Icon width={20} icon="hugeicons:view" />
                          </button>
                          <button className="button-action edit">
                            <Icon width={20} icon="uil:edit" />
                          </button>
                          <button
                            className="button-action delete"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <Icon
                              width={20}
                              icon="material-symbols:delete-outline"
                            />
                          </button>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </ContainerData>
    </div>
  );
};

export default ItemList;
