import React, { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import TableComponent from "../../components/TableContainer/TableContainer";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getAllStore } from "../../features/StoreSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

const headers = [
  { label: <input type="checkbox" />, key: "checkbox" },
  { label: "Store", key: "id" },
  { label: "Location", key: "category" },
  { label: "Owner", key: "addedBy" },
  { label: "Role", key: "stock" },
  { label: "Action", key: "stock" },
];

const products: any = [];

const Store = () => {
  const store = useAppSelector((state: RootState) => state.store.store);
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    dispatch(getAllStore());
  }, []);

  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setSelectedItems((prevItems) =>
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

  const renderRow = (item: any) => (
    <tr key={item._id}>
      <td>
        <input
          type="checkbox"
          checked={!!selectedItems[item._id]}
          onChange={() => handleCheckboxChange(item.id)}
        />
      </td>
      <td>{item.storename}</td>
      <td>{item.location}</td>
      <td>{item.owner.name}</td>
      <td>{item.owner.role}</td>
      <td>
        <div className="button-section-wrapper">
          <div className="button-section">
            <button className="button-action view">
              <Icon width={20} icon="hugeicons:view" />
            </button>
            <button className="button-action edit">
              <Icon width={20} icon="uil:edit" />
            </button>
            <button className="button-action delete" onClick={() => {}}>
              <Icon width={20} icon="material-symbols:delete-outline" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <ContainerData pagename="Store">
        <TableComponent
          headers={headers}
          data={store}
          renderRow={renderRow}
          onSelectAll={handleSelectAll}
          selectAll={selectAll}
        />
      </ContainerData>
    </div>
  );
};

export default Store;
