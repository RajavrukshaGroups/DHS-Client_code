import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./MemberPannel_Styles/Receipt.css";

const ReceiptList = () => {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("receipts", receipts);

  const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat("en-IN");
    return formatter.format(number);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  // useEffect(() => {
  //   const fetchReceipts = async () => {
  //     const seniorityId = sessionStorage.getItem("seniority_id");

  //     if (!seniorityId) {
  //       setError("No seniority ID found in session");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(
  //         "http://localhost:4000/defenceWebsiteRoutes/fetchReceipts",
  //         {
  //           params: { seniority_id: seniorityId },
  //         }
  //       );
  //       setReceipts(response.data.data.payments);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchReceipts();
  // }, []);

  useEffect(() => {
    const fetchReceipts = async () => {
      const seniorityId = sessionStorage.getItem("seniority_id");

      if (!seniorityId) {
        setError("No seniority ID found in session");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://adminpanel.defencehousingsociety.com/defenceWebsiteRoutes/fetchReceipts",
          {
            params: { seniority_id: seniorityId },
          }
        );
        console.log("response data", response.data);
        const receiptId = response.data.data?._id;
        const eachPaymentId = response.data.data.payments.map((payment) => ({
          ...payment,
          receiptId: receiptId,
        }));

        // Sort by date (descending: newest first)
        // eachPaymentId.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Sort by date (ascending: oldest first)
        eachPaymentId.sort((a, b) => new Date(a.date) - new Date(b.date));

        setReceipts(eachPaymentId);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  const handleViewReceipt = (receiptId, paymentId) => {
    const url = `https://adminpanel.defencehousingsociety.com/receipt/get-receipt-details/${receiptId}?paymentId=${paymentId}`;
    window.open(url, "_blank");
  };

  const formatPaymentType = (type, installmentNumber) => {
    if (type === "installments") {
      const installmentMapping = {
        firstInstallment: "First Installment",
        secondInstallment: "Second Installment",
        thirdInstallment: "Third Installment",
        // fourthInstallment: "Fourth Installment",
        // add more if needed
      };
      return installmentMapping[installmentNumber] || installmentNumber;
    }

    const mapping = {
      siteAdvance: "Site Advance",
      siteDownPayment: "Site Down Payment",
    };

    return mapping[type] || type;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="header">
        <i
          className="bi bi-arrow-left-circle rback-icon"
          onClick={() => navigate("/dashboard")}
          title="Back to Dashboard"
        ></i>
        <h1 className="title">Receipt Details</h1>
      </div>

      <div className="separator"></div>
      <div className="separator"></div>

      <div className="table-responsive">
        <table className="receipt-table">
          <thead>
            <tr>
              <th>Receipt Date</th>
              <th>Receipt No</th>
              <th>Payment Mode</th>
              <th>Payment Type</th>
              <th>Cheque/DD/Transaction ID</th>
              <th>Paid Amount</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt, index) => {
              let transactionDetails = "-";
              const mode = receipt.paymentMode?.toLowerCase();

              if (mode === "netbanking") {
                transactionDetails = receipt.transactionId || "-";
              } else if (mode === "cheque") {
                transactionDetails = receipt.chequeNumber || "-";
              } else if (mode === "dd") {
                transactionDetails = receipt.ddNumber || "-";
              }
              // for "cash" and anything else, it remains "-"
              return (
                <tr key={index}>
                  <td>{formatDate(receipt.date)}</td>
                  <td>{receipt.receiptNo}</td>
                  <td className="payment-mode">{receipt.paymentMode}</td>
                  {/* <td>{receipt.paymentType}</td> */}
                  {/* <td>
                    {receipt.paymentType === "installments"
                      ? `${receipt.installmentNumber}`
                      : receipt.paymentType}
                  </td> */}
                  <td>
                    {formatPaymentType(
                      receipt.paymentType,
                      receipt.installmentNumber
                    )}
                  </td>

                  <td>{transactionDetails}</td>
                  <td>₹{formatNumber(receipt.amount)} /-</td>
                  <td>
                    <button
                      // onClick={() => handleViewReceipt(receipt._id)}
                      onClick={() =>
                        handleViewReceipt(receipt.receiptId, receipt._id)
                      }
                      className="view-receipt-button"
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceiptList;
