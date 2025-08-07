import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MemberPannel_Styles/ProjectStatus.css";

const ProjectStatus = () => {
  const navigate = useNavigate();
  const [transferData, setTransferData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("transfer data", transferData);
  //ssss
  useEffect(() => {
    const fetchTransferData = async () => {
      const seniorityId = sessionStorage.getItem("seniority_id");

      if (!seniorityId) {
        setError("No seniority ID found in session");
        setLoading(false);
        return;
      }

      try {
        // https://memberpanel.defencehousingsociety.com/projectstatus
        // const response = await axios.get('https://memberpanel.defencehousingsociety.com/projectstatus/projectstatus', {
        //   params: { seniority_id: seniorityId }
        // });
        const response = await axios.get(
          "https://adminpanel.defencehousingsociety.com/defenceWebsiteRoutes/projectstatus",
          // "http://localhost:4000/defenceWebsiteRoutes/projectstatus",
          {
            params: { seniority_id: seniorityId },
          }
        );
        setTransferData(response.data);
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

  return (
    <div className="container">
      <div className="header">
        <i
          className="bi bi-arrow-left-circle psback-icon"
          onClick={() => navigate("/dashboard")}
        ></i>
        <h1 className="pstitle">Project Status History</h1>
      </div>
      <div className="psseparator"></div>
      <div className="psseparator"></div>
      <div className="table-responsive">
        <table className="extra-table">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Project Name</th>
              <th>Short Code</th>
              <th>Description</th>
              <th>Updated Date</th>
              {/* <th>Transfer Date</th> */}
              {/* <th>Reason</th> */}
            </tr>
          </thead>
          <tbody>
            {transferData.length > 0 ? (
              transferData.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td className="word-capitalize">{data.projectName}</td>
                  <td className="word-uppercase">{data.shortCode}</td>
                  <td>{data.description}</td>
                  <td>{formatDate(data.updatedAt)}</td>
                  {/* <td>{data.paid_date}</td> */}
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

export default ProjectStatus;
