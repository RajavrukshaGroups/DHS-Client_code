import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MemberPannel_Styles/dashboard.css";
import toast from "react-hot-toast";
const Dashboard = () => {
  // const [name, setName] = useState('');
  // const [sid, setId] = useState('');
  // const [img, setImg] = useState('');
  const [userId, setUserid] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberData, setMemberdata] = useState([]);
  const navigate = useNavigate();

  console.log("members data", memberData);

  useEffect(() => {
    const fetchData = async () => {
      const seniorityId = sessionStorage.getItem("seniority_id");
      console.log(
        seniorityId,
        "seniority id which is added to the session storage"
      );
      console.log(seniorityId, "this is the data");
      if (!seniorityId) {
        setError("No seniority ID found in session");
        alert("Please login");
        navigate("/memberlogin");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://memberpanel.defencehousingsociety.com/defenceWebsiteRoutes/dashboard/${seniorityId}`
        );
        console.log("Member Data:", response.data.data);
        if (response) {
          setMemberdata(response.data.data);
        }
        const userData = response.data.data;
        console.log("userdata", userData);
      } catch (error) {
        setError(error.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);
  const handleViewConfirmation = async (userId) => {
    try {
      const res = await axios.get(
        `https://memberpanel.defencehousingsociety.com/receipt/view-confirmation/${userId}`
      );

      // if (!res.data || res.data.error || !res.data.confirmationLetterExists) {
      //   toast.error("Site confirmation letter not found.");
      //   return;
      // }

      // If letter exists, open it
      const url = `https://memberpanel.defencehousingsociety.com/receipt/view-confirmation/${userId}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching site confirmation:", error);
      toast.error("site confirmation letter is not available yet.");
    }
  };

  // const handleViewShareCert = (userId) => {
  //   window.location.href = `http://adminpanel.defencehousingsociety.com/viewonlysharecer?user_pk=${userId}`;
  //   // window.location.href = `http://localhost:4000/viewonlysharecer?user_pk=${userId}`;
  // };

  const handleShareCertificate = (receiptId) => {
    // const url = `http://localhost:3000/receipt/get-share-certificate/${receiptId}`;
    const url = `https://memberpanel.defencehousingsociety.com/receipt/get-share-certificate/${receiptId}`;
    window.open(url, "_blank");
  };

  if (loading) return <p>Loading...</p>;
  const handleResetPasswordClick = () => {
    navigate("/reset-password");
  };

  if (loading) return;
  const handleContactAdminClick = () => {
    navigate("/ContactAdmin");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <div className="dashboard-left-content">
          <h2 className="dashboard-heading">Quick Information</h2>
          <ul>
            <li className="dashboard-item">
              <a href="/my-project">My Project</a>
            </li>
            {/* <li className="dashboard-item"><a href="/project-paid-amount">Project Paid Amount</a></li> */}
            <li className="dashboard-item">
              <a href="/project-paid-amount">View Receipts</a>
            </li>
            <li className="dashboard-item">
              <a href="/transferproject">Number of Transferred Project</a>
            </li>
            <li className="dashboard-item">
              <a
                style={{ color: "#24457b", cursor: "pointer" }}
                onClick={() => handleViewConfirmation(memberData._id)}
              >
                View Site Confirmation
              </a>
            </li>
            <li className="dashboard-item">
              <a href="/extra-charges-amount">Extra Charges Amount</a>
            </li>
            {/* <li className="dashboard-item"><a href="/view-receipt">View Receipt</a></li> */}
            <li className="dashboard-item">
              <a
                style={{ color: "#24457b", cursor: "pointer" }}
                onClick={() => handleShareCertificate(memberData?.receiptId)}
              >
                View Share Certificate
              </a>
            </li>
            <li className="dashboard-item">
              <a href="/view-project-status">View Project Status</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="dashboard-right">
        {memberData && (
          <div className="user-card">
            {memberData.MemberPhoto ? (
              <img
                src={memberData.MemberPhoto}
                alt="User Photo"
                className="user-photo"
              />
            ) : (
              <p>No photo available</p>
            )}

            <p>
              <strong>Name:</strong> {memberData.name}
            </p>
            <p>
              <strong>Seniority ID:</strong> {memberData.SeniorityID}
            </p>

            <button className="user-button" onClick={handleResetPasswordClick}>
              Reset Password
            </button>
            <button className="user-button" onClick={handleContactAdminClick}>
              Contact Admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
