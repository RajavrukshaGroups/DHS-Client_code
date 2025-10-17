import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemberPannel_Styles/ResetPassword.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { EyeIcon, EyeOffIcon } from 'react-feather';
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [seniorityId, setSeniorityId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    // Retrieve the seniority ID from session storage
    const storedSeniorityId = sessionStorage.getItem("seniority_id");
    if (storedSeniorityId) {
      setSeniorityId(storedSeniorityId);
    }
  }, []);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return false;
    }
    if (password.length < 3) {
      setError("Password must be at least 3 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      const fromData = {
        seniorityId,
        password,
      };

      try {
        const response = await axios.post(
          "https://adminpanel.defencehousingsociety.com/member/resetpassword",
          // "http://localhost:4000/member/resetpassword",
          fromData
        );
        // const response = await axios.post(
        //   "http://localhost:4000/member/resetpassword",
        //   fromData
        // );
        toast.success("Password changed successfully");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error submitting form", error);
        toast.error("Error submitting form");
      }
    }
  };

  return (
    <div className="rscontainer">
      <i
        className="bi bi-arrow-left-circle back-icon1"
        onClick={() => navigate("/dashboard")}
        title="Back to Dashboard"
      ></i>

      <div className="formWrapper">
        <h2 className="title">Reset Password</h2>
        {error && <div className="error">{error}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="seniorityId" className="label">
              Seniority ID
            </label>
            <input
              type="text"
              id="seniorityId"
              className="input"
              value={seniorityId}
              readOnly
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password" className="label">
              New Password
            </label>
            <div className="input-with-icon">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input"
                placeholder="*************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group password-group">
            <label htmlFor="confirmPassword" className="label">
              Confirm New Password
            </label>
            <div className="input-with-icon">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="input"
                placeholder="*************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
