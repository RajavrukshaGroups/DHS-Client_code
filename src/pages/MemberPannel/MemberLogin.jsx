import React, { useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./MemberPannel_Styles/MemberLogin.css";
import { toast } from "react-toastify";


const MemberLogin = () => {
  const [seniorityId, setSeniorityId] = useState("");
  const [password, setPassword] = useState("");
  //  const [email, setEmail] = useState(""); // or pass via props/context
  const navigate = useNavigate();

 const handleReset = async (seniorityId) => {
  try {
    const response = await axios.post(
      "https://adminpanel.defencehousingsociety.com/defenceWebsiteRoutes/forgot-password",
      { seniority_id: seniorityId }
    );

    if (response.data.success) {
      toast.success("OTP sent to your email");
      sessionStorage.setItem("seniority_id", seniorityId);
      navigate("/forgotPassword"); // 👉 go to OTP page
    } else {
      toast.error(response.data.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    toast.error(
      error.response?.data?.message || "Something went wrong. Try again."
    );
  }
};


  const handleSubmit = async (event) => {
  event.preventDefault();
try {
  const response = await axios.post(
    "https://adminpanel.defencehousingsociety.com/defenceWebsiteRoutes/memberLogin",
    {
      seniority_id: seniorityId,
      password: password,
    }
  );
  if (response.data.success) {
    sessionStorage.setItem("seniority_id", response.data.seniority_id);
    navigate("/dashboard");
    toast.success(response.data.message)
    // Toast.success(response.data.message)
  } else {
    toast.error(response.data.message); 
  }
} catch (error) {
  console.error("Login error:", error);
  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error("An error occurred. Please try again.");
  }
}
};


  return (
    <Container fluid className="memberlogin">
      <div className="banner-member">
        <div className="banner-content-member">
          <h1 style={{ color: "white" }}>Member Login</h1>
        </div>
      </div>
      <div className="tabs-content">
        <div className="tab active-tab" id="tab-1">
          <div className="inner-box-member">
            <form
              action="verify-member-login" // Modify the action URL if needed
              encType="multipart/form-data"
              method="post"
              className="default-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label>Seniority ID*</label>
                <input
                  type="text"
                  name="seniority_id"
                  required
                  value={seniorityId}
                  onChange={(e) => setSeniorityId(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password*</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            
              <div className="form-group message-btn">
                <button type="submit" className="theme-btn btn-one">
                  Login
                </button>
              </div>
            
            </form>
    <div className="form-group">
  
<div className="form-group forgot-password-container">
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      handleReset(seniorityId);
    }}
    className="forgot-password-link"
  >
    Forgot Password?
  </a>
</div>

</div>
             
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MemberLogin;
