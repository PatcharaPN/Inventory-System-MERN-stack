import React, { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { createBrand, getBrand } from "../../features/ProductSlice";
import Modal from "../../components/Modal/Modal";
import CustomInput from "../../components/Input/Input";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";

const BrandPage = () => {
  const brand = useAppSelector((state: RootState) => state.product.brand);
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("");

  useEffect(() => {
    dispatch(getBrand());
  }, []);
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleClosenModal = () => {
    setIsModalOpen(false);
  };
  currentUser;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const brandData = {
      name,
      prefix,
      addedBy: currentUser._id,
    };

    console.log("Submitting brand data:", brandData);

    dispatch(createBrand(brandData));
    setIsModalOpen(false);
  };
  return (
    <ContainerData
      pagename={"Brand"}
      Canadd={true}
      onClickAdd={handleOpenModal}
    >
      {isModalOpen && (
        <SmallModal header={"Add Brand"} onClose={handleClosenModal}>
          <div className="modal-wrapper">
            <form onSubmit={handleSubmit}>
              <CustomInput
                label={"Name*"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <CustomInput
                label={"Prefix*"}
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
              <div className="btn-section">
                <button className="btn" type="submit">
                  Save
                </button>
                <button
                  className="btn white"
                  type="button"
                  onClick={handleClosenModal}
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </SmallModal>
      )}
      <div className="item-list-wrapper">
        {brand.length === 0 ? (
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
                  Brand Name <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="align-header">
                  Prefix <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="align-header">
                  Description <Icon icon="octicon:triangle-down-16" />
                </th>{" "}
                <th className="align-header">
                  AddedBy <Icon icon="octicon:triangle-down-16" />
                </th>
                <th className="align-header">
                  Action <Icon icon="octicon:triangle-down-16" />
                </th>
              </tr>
            </thead>
            <tbody className="content-wrapper">
              {brand.map((brand) => (
                <motion.tr
                  whileHover={{
                    scale: 1.005,
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  key={brand._id}
                >
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{brand.name}</td>
                  <td>{brand.prefix}</td>
                  <td></td>
                  <td>{brand.addedBy?.username}</td>
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
  );
};

export default BrandPage;
