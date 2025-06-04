import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import "./MemberPannel_Styles/ExtraCharges.css";

const ExtraCharges = () => {
  const navigate = useNavigate();
  const [transferData, setTransferData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("transfer data", transferData);

  const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat("en-IN");
    return formatter.format(number);
  };

  useEffect(() => {
    const fetchTransferData = async () => {
      const seniorityId = sessionStorage.getItem("seniority_id");
      if (!seniorityId) {
        setError("No seniority ID found in session");
        setLoading(false);
        return;
      }

      try {
        // https://memberpanel.defencehousingsociety.com/extracharges
        // const response = await axios.get('https://memberpanel.defencehousingsociety.com/extracharges', {
        //   params: { seniority_id: seniorityId }
        // });
        const response = await axios.get(
          "http://localhost:4000/defenceWebsiteRoutes/extracharges",
          {
            params: { seniority_id: seniorityId },
          }
        );
        setTransferData(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransferData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleViewReceipt = (receiptId, paymentId) => {
    const url = `http://localhost:4000/receipt/get-receipt-details/${receiptId}?paymentId=${paymentId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container">
      <div className="header">
        <i
          className="bi bi-arrow-left-circle eback-icon"
          onClick={() => navigate("/dashboard")}
        ></i>
        <h1 className="etitle">Extra Charges</h1>
      </div>
      <div className="eseparator"></div>
      <div className="eseparator"></div>
      <div className="table-responsive">
        <table className="extra-table">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Paid Date</th>
              <th>Paid Amount</th>
              <th>Cheque/DD/Transaction ID</th>
              <th>Seniority ID</th>
              {/* <th>Transfer Date</th> */}
              <th>Reason</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {transferData.length > 0 ? (
              transferData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDate(data.date)}</td>
                  <td>{formatNumber(data.amount)}/-</td>
                  <td>
                    {data.chequeNumber ||
                      data.ddNumber ||
                      data.transactionId ||
                      "-"}
                  </td>
                  <td>{sessionStorage.getItem("seniority_id")}</td>
                  <td>{data.otherCharges || "-"}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleViewReceipt(data.receiptId, data.paymentId);
                      }}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-records">
                <td colSpan="7">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExtraCharges;
