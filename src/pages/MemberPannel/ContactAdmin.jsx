import React, { useState, useEffect } from "react";
import "./MemberPannel_Styles/ContactAdmin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContactAdmin = () => {
  const navigate = useNavigate();
  const [seniorityId, setSeniorityId] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    const storedSeniorityId = sessionStorage.getItem("seniority_id");
    if (storedSeniorityId) {
      setSeniorityId(storedSeniorityId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");
    setResponseStatus(null);

    try {
      // const response = await axios.post(`http://localhost:5000/contactadmin`, {
      const response = await axios.post(
        `http://localhost:4000/defenceWebsiteRoutes/dashboard-contact-admin`,
        {
          seniorityId,
          subject,
          message,
        }
      );

      setResponseMessage("Message sent successfully");
      setSubject("");
      setMessage("");
    } catch (error) {
      setResponseMessage("Failed to send message");
      console.error("Error sending message", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-admin">
      <i
        className="bi bi-arrow-left-circle back-icon1"
        onClick={() => navigate("/dashboard")}
        title="Back to Dashboard"
      ></i>
      <h2>Contact Admin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Seniority ID:</label>
          <input type="text" value={seniorityId} readOnly required />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>{" "}
      </form>
      {/* {responseMessage && <p>{responseMessage}</p>} */}
      {responseMessage && (
        <div className={`response-message ${responseStatus}`}>
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default ContactAdmin;
