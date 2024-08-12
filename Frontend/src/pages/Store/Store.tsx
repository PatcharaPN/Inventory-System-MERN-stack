import React, { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";

import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { createStore, getAllStore } from "../../features/StoreSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import TableComponent from "../../components/TableContainer/TableContainer";
import Modal from "../../components/Modal/Modal";
import SelectInput from "../../components/Input/Selecter/Selecter";
import CustomInput from "../../components/Input/Input";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import { motion } from "framer-motion";

const products: any = [];

const Store = () => {
  const store = useAppSelector((state: RootState) => state.store.store);
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );

  const dispatch = useAppDispatch();
  const [storename, setStoreName] = useState("");
  const [location, setLocation] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    dispatch(getAllStore());
  }, [dispatch]);

  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setSelectedItems(() =>
      products.reduce((acc: any, item: any) => {
        acc[item.id] = isChecked;
        return acc;
      }, {} as { [key: string]: boolean })
    );
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems, [id]: !prevItems[id] };
      setSelectAll(Object.values(updatedItems).every(Boolean));
      return updatedItems;
    });
  };

  const handldeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storeData = {
      storename,
      location,
      owner: currentUser._id,
    };
    dispatch(createStore(storeData));
  };

  return (
    <div>
      <ContainerData
        pagename="Store"
        Canadd={true}
        onClickAdd={handleOpenModal}
      >
        <div className="item-list-wrapper">
          {store.length === 0 ? (
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
                    Store name <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    Location <Icon icon="octicon:triangle-down-16" />
                  </th>
                  <th className="align-header">
                    AddedBy <Icon icon="octicon:triangle-down-16" />
                  </th>

                  <th className="button-section">Action</th>
                </tr>
              </thead>
              <tbody className="content-wrapper">
                {store.map((items, index) => (
                  <motion.tr
                    whileHover={{
                      scale: 1.005,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                    }}
                    key={`${items._id}-${index}`}
                  >
                    <td>
                      <input type="checkbox" />
                    </td>

                    <td>{items.storename || ""}</td>
                    <td>{items.location}</td>
                    <td>{items.owner?.username}</td>
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
      {openModal ? (
        <SmallModal header={""} onClose={handleCloseModal}>
          <div className="additem-content">
            <div className="additem-topmenu">
              <h2 style={{ fontWeight: "bold" }}>New Store</h2>
            </div>
            <div className="additem-form">
              <form className="form-grid">
                <CustomInput
                  label={"Name*"}
                  value={storename}
                  onChange={(e) => setStoreName(e.target.value)}
                />
                <CustomInput
                  label={"Address*"}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="btn-section">
            <button className="btn" onClick={handldeSubmit}>
              Save
            </button>
            <button className="btn white" onClick={handleCloseModal}>
              Discard
            </button>
          </div>
        </SmallModal>
      ) : null}
    </div>
  );
};

export default Store;
