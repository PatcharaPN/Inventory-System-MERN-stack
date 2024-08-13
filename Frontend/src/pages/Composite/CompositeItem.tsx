import React, { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getTotalComposite } from "../../features/CategorySlice";
import Modal from "../../components/Modal/Modal";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import CustomInput from "../../components/Input/Input";

const CompositeItem = () => {
  const dispatch = useAppDispatch();
  const getTotal = useAppSelector(
    (state: RootState) => state.category.composite
  );
  const [isModalOpen, serOpenModal] = useState(false);
  useEffect(() => {
    dispatch(getTotalComposite());
  }, [dispatch]);
  console.log(getTotal);

  return (
    <div>
      {isModalOpen ? (
        <SmallModal
          header={""}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        >
          <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>
            Add Composite Item
          </h2>
          <CustomInput label={"Name*"} value={""} />
        </SmallModal>
      ) : null}
      <ContainerData pagename="Composite Item" Canadd>
        <div className="item-list-wrapper">
          {getTotal.length === 0 ? (
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
                    Composite Name <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Product Count <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    AddedBy <Icon icon="octicon:triangle-down-16" />
                  </th>{" "}
                  <th className="align-header">
                    Role <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Action <Icon icon="octicon:triangle-down-16" />
                  </th>
                </tr>
              </thead>
              <tbody className="content-wrapper">
                {getTotal.map((total) => (
                  <motion.tr
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    key={total._id}
                  >
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{total.name}</td>

                    <td>{total.productCount}</td>
                    <td>{total.addedBy.username}</td>
                    <td>{total.addedBy.role}</td>
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

export default CompositeItem;
