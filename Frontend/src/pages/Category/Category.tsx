import React, { useEffect, useState } from "react";
import "./Category.scss";
import Divider from "../../components/Divider/Divider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { createCategory, getCategory } from "../../features/CategorySlice";
import ContainerData from "../../components/ContainerData/ContainerData";
import SmallModal from "../../components/Modal/ModalSmall/SmallModal";
import CustomInput from "../../components/Input/Input";

const Category = () => {
  const category = useAppSelector(
    (state: RootState) => state.category.category
  );
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = {
      name,
      description,
      createdBy: currentUser._id,
    };
    dispatch(createCategory(categoryData));
    setIsModalOpen(false);
  };
  return (
    <ContainerData
      pagename={"Category"}
      Canadd={true}
      onClickAdd={handleOpenModal}
    >
      {isModalOpen ? (
        <SmallModal header={""} onClose={handleCloseModal}>
          <h2 style={{ fontWeight: "bold", marginBottom: "40px" }}>
            New Category
          </h2>
          <CustomInput
            label={"Name*"}
            placeholder="Insert Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomInput
            label={"Description"}
            placeholder="Insert Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="additem-content">
            <div className="btn-section">
              <button className="btn" onClick={handleSubmit}>
                Save
              </button>
              <button className="btn white" onClick={handleCloseModal}>
                Discard
              </button>
            </div>
          </div>
        </SmallModal>
      ) : null}
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
              Created by <Icon icon="octicon:triangle-down-16" />
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
    </ContainerData>
  );
};

export default Category;
