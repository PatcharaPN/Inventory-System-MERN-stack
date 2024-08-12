import { Icon } from "@iconify/react/dist/iconify.js";
import ContainerData from "../../components/ContainerData/ContainerData";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../features/AuthSlice";

const PermissionPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.auth.users);
  console.log(users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <ContainerData pagename={"Permission"}>
      {isModalOpen ? (
        <Modal
          header={""}
          children={undefined}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        ></Modal>
      ) : null}
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="" id="" />
            </th>
            <th className="align-header">
              Username <Icon icon="octicon:triangle-down-16" />
            </th>
            <th className="align-header">
              Name <Icon icon="octicon:triangle-down-16" />
            </th>{" "}
            <th className="align-header">
              Role <Icon icon="octicon:triangle-down-16" />
            </th>
            <th className="button-section">Action</th>
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
