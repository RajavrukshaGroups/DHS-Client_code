import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./MemberPannel_Styles/MyProject.css";

const MyProject = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("users data", userData);

  const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat("en-IN");
    return formatter.format(number);
  };

  useEffect(() => {
    const fetchData = async () => {
      const seniorityId = sessionStorage.getItem("seniority_id");
      if (!seniorityId) {
        setError("No seniority ID found in session");
        setLoading(false);
        return;
      }

      try {
        // https://memberpanel.defencehousingsociety.com/fetchUserData
        // const response = await axios.get(
        //   "https://memberpanel.defencehousingsociety.com/fetchUserData",
        //   {
        const response = await axios.get(
          "https://adminpanel.defencehousingsociety.com/defenceWebsiteRoutes/fetchUserData",
          // "http://localhost:4000/defenceWebsiteRoutes/fetchUserData",
          {
            params: { seniority_id: seniorityId },
          }
        );
        setUserData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="header">
        <i
          className="bi bi-arrow-left-circle back-icon"
          onClick={() => navigate("/dashboard")}
          title="Back to Dashboard"
        ></i>
        <h1 className="ptitle">My Project</h1>
      </div>
      <div className="separator"></div>
      <div className="separator"></div>
      <div className="table-responsive">
        <table className="project-table">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Project Name</th>
              <th>Seniority Id</th>
              <th>Plot Size</th>
              <th>Sq Ft Price </th>
              <th>Project Amount</th>
              <th>Project Paid Amount</th>
            </tr>
          </thead>
          {/* <tbody>
            {userData.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td className="project-name">
                  {user.propertyDetails?.projectName}
                </td>
                <td>{user.SeniorityID}</td>
                <td>
                  {user.propertyDetails?.length}X{user.propertyDetails?.breadth}
                </td>
                <td>{formatNumber(user.propertyDetails?.pricePerSqft)}/-</td>
                <td>{formatNumber(user.propertyDetails?.propertyCost)}/-</td>
                <td>{formatNumber(user.propertyDetails?.paidAmount)}/-</td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
            {userData.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td> {/* Sequential Sl. No */}
                <td className="project-name">
                  {user.propertyDetails?.projectName}
                </td>
                <td>{user.SeniorityID}</td>
                <td>
                  {user.propertyDetails?.length}X{user.propertyDetails?.breadth}
                </td>
                <td>₹{formatNumber(user.propertyDetails?.pricePerSqft)}/-</td>
                <td>₹{formatNumber(user.propertyDetails?.propertyCost)}/-</td>
                <td>₹{formatNumber(user.propertyDetails?.paidAmount)}/-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProject;
