import React, { useEffect } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { Icon } from "@iconify/react";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { motion } from "framer-motion";
import { getHistory } from "../../features/AuthSlice";

const LoginHistory = () => {
  const loginHistory = useAppSelector(
    (state: RootState) => state.auth.loginHistory
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  return (
    <div>
      <ContainerData pagename="Login History">
        <div className="item-list-wrapper">
          {loginHistory.length === 0 ? (
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
                    <input type="checkbox" />
                  </th>
                  <th className="align-header">Login Time</th>
                  <th className="align-header">IP Address</th>{" "}
                  <th className="align-header">User name</th>
                  <th className="align-header">User role</th>
                  <th className="button-section">Action</th>
                </tr>
              </thead>
              <tbody className="content-wrapper">
                {loginHistory.map((history) => {
                  const loginDate = new Date(history.loginTime);

                  return (
                    <motion.tr
                      whileHover={{
                        scale: 1.005,
                        transition: {
                          duration: 0.3,
                          ease: "easeInOut",
                        },
                      }}
                      key={history.userId + history.loginTime}
                    >
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        {loginDate.toLocaleDateString()}{" "}
                        {loginDate.toLocaleTimeString()}
                      </td>
                      <td>{history.ipAddress}</td>
                      <td>{history.user.username}</td>
                      <td>{history.user.role}</td>

                      <td>
                        <div className="button-section-wrapper">
                          <div className="button-section">
                            <button className="button-action view">
                              <Icon width={20} icon="hugeicons:view" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </ContainerData>
    </div>
  );
};

export default LoginHistory;
