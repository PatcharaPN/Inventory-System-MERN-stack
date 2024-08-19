import React, { useEffect } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getAllPayments } from "../../features/paymentSlice";

const PaymentHistory = () => {
  const dispatch = useAppDispatch();
  const paymentHistory = useAppSelector(
    (state: RootState) => state.payment.payments
  );

  console.log(paymentHistory);

  useEffect(() => {
    dispatch(getAllPayments());
  }, [dispatch]); // Added dispatch to dependency array

  if (paymentHistory.length === 0) {
    return (
      <ContainerData pagename="Payment History">
        <p>No payment history available.</p>
      </ContainerData>
    );
  }

  return (
    <ContainerData pagename="Payment History">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th className="align-header">
              Date and Time <Icon icon="octicon:triangle-down-16" />
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
          {paymentHistory.map((history) => (
            <tr key={history._id}>
              <td>
                <input type="checkbox" />
              </td>{" "}
              <td className="table-data">
                {" "}
                <img
                  width={50}
                  src={`http://localhost:3000/${history.products.productImage}`}
                  alt=""
                />
                {new Date(history.createdAt).toLocaleString()}
              </td>
              <td>{history.products.name}</td>
              <td>{history.createdBy.name}</td>
              <td>{history.createdBy.role || "N/A"}</td>{" "}
              {/* Handle missing role */}
              <td className="button-section">
                <button className="button-action view">
                  <Icon width={20} icon="hugeicons:view" />
                </button>
                <button className="button-action edit">
                  <Icon width={20} icon="uil:edit" />
                </button>
                <button
                  className="button-action delete"
                  onClick={() => {
                    /* Handle delete */
                  }}
                >
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

export default PaymentHistory;
