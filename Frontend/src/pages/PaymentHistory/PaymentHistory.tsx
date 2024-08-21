import { useEffect, useState } from "react";
import ContainerData from "../../components/ContainerData/ContainerData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getAllPayments } from "../../features/paymentSlice";
import "./PaymentHistory.scss";
const PaymentHistory = () => {
  const [currentpage, setCurrentpage] = useState<number>(1);
  const itemPerPage = 7;
  const dispatch = useAppDispatch();
  const paymentHistory = useAppSelector(
    (state: RootState) => state.payment.payments
  );
  const indexOfLastPayment = currentpage * itemPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemPerPage;
  const currentPayments = paymentHistory.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );
  const totalPages = Math.ceil(paymentHistory.length / itemPerPage);
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentpage(page);
    }
  };

  useEffect(() => {
    dispatch(getAllPayments());
  }, []);

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
      <div className="layout-table">
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
              <th className="align-header">
                Status <Icon icon="octicon:triangle-down-16" />
              </th>
              <th className="button-section">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((history) => (
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
                <td>
                  <div className="status-banner">
                    {history.status.toLowerCase()}
                  </div>
                </td>
                {/* Handle missing role */}
                <td>
                  <div className="button-section-wrapper">
                    <div className="button-section">
                      <button className="button-action view">
                        <Icon width={20} icon="hugeicons:view" />
                      </button>
                      <button className="button-action edit" onClick={() => {}}>
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
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <div className="button">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentpage - 1)}
              disabled={currentpage === 1}
            >
              <Icon icon="iconamoon:arrow-left-2-bold" />
            </button>
            <span>
              {currentpage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentpage + 1)}
              disabled={currentpage === totalPages}
            >
              <Icon icon="iconamoon:arrow-right-2-bold" />
            </button>
          </div>
        </div>
      </div>
    </ContainerData>
  );
};

export default PaymentHistory;
