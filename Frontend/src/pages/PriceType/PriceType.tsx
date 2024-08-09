import React, { useEffect } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getPrice } from "../../features/PriceSlice";

const PriceType = () => {
  const price = useAppSelector((state: RootState) => state.price.price);
  const dispatch = useAppDispatch();

  console.log(price);

  useEffect(() => {
    dispatch(getPrice());
  }, []);

  return (
    <div>
      <ContainerData pagename="Price List">
        <div className="item-list-wrapper">
          {price.length === 0 ? (
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
                    Price Unit <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Price name <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Description <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Added by <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Action <Icon icon="octicon:triangle-down-16" />
                  </th>
                </tr>
              </thead>
              <tbody className="content-wrapper">
                {price.map((price) => (
                  <motion.tr
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    key={price._id}
                  >
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{price.unit}</td>
                    <td>{price.name}</td>
                    <td>{price.description}</td>
                    <td>{price.addedBy.name}</td>

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
                            onClick={() => {}}
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

export default PriceType;
