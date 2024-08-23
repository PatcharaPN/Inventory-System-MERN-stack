import { Icon } from "@iconify/react/dist/iconify.js";
import ContainerData from "../../components/ContainerData/ContainerData";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../features/AuthSlice";
import { useTranslation } from "react-i18next";

const PermissionPage = () => {
  const { t } = useTranslation(); // Destructure t from useTranslation
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.auth.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ContainerData pagename={t("permission")}>
      {isModalOpen ? (
        <Modal
          header={""}
          children={undefined}
          onClose={() => setIsModalOpen(false)}
        ></Modal>
      ) : null}
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th className="align-header">
              {t("username")} <Icon icon="octicon:triangle-down-16" />
            </th>
            <th className="align-header">
              {t("name")} <Icon icon="octicon:triangle-down-16" />
            </th>
            <th className="align-header">
              {t("role")} <Icon icon="octicon:triangle-down-16" />
            </th>
            <th className="button-section">{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <input type="checkbox" />
              </td>
              <td className="table-data">{user.username}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
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

export default PermissionPage;
