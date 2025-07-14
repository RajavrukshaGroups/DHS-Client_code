import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../pages/styles/Popup.css";
import { FaUser } from "react-icons/fa";
import { BsTelephoneForward } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiMessage2Line } from "react-icons/ri";
import { Filter } from "bad-words";
import toast from "react-hot-toast";

function PopupButton() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [subject, setSubject] = useState("");
  const [show, setShow] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const filter = new Filter();

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("formSubmitted");
    if (hasSubmitted !== "true") {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      filter.isProfane(name) ||
      filter.isProfane(subject) ||
      filter.isProfane(location) ||
      filter.isProfane(email)
    ) {
      // alert("Your input contains inappropriate language.");
      toast.error("Your input contains inappropriate language.");
      setName("");
      setEmail("");
      setPhone("");
      setLocation("");
      setSubject("");
      return;
    }
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      location.trim() === "" ||
      subject.trim() === ""
    ) {
      // return alert("please fill all the fields");
      return toast.error("please fill all the fields");
    }
    if (phone !== null && phone.toString().length !== 10) {
      // return alert("Phone number must have exactly 10 digits");
      return toast.error("Phone number must have exactly 10 digits");
    }
    const data = { name, email, phone, location, subject };
    try {
    
      const response = await axios.post(
        "https://adminpanel.defencehousingsociety.com/defenceWebsiteRoutes/contactus",
        data
      );
      if (response.status === 200) {
        setFeedbackMessage(response.data.message);
        // alert(response.data.message);
        toast.success("Form Submitted Successfully");
        localStorage.setItem("formSubmitted", "true");
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        // alert("Something went wrong, please try again.");
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      // Handle 500 or other errors
      if (error.response && error.response.status === 500) {
        // alert("Failed to send details. Please try again later.");
        toast.error("Failed to send details. Please try again later.");
      } else {
        // alert("An error occurred: " + error.message);
        toast.error("an error occured");
      }
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header
          style={{
            paddingLeft: "20px",
            color: "white",
            background: "linear-gradient(105deg, #6e99e6, #093c94)",
          }}
        >
          <Modal.Title style={{ fontSize: "24px", margin: "auto" }}>
            Book your site visit today
          </Modal.Title>
          <button
            type="button"
            className="custom-close-btn"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <div style={{ padding: "16px" }}>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <div className="input-icon-wrapper">
                  <FaUser className="input-icon" />
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: "35px" }}
                  />
                  <FaUser className="input-icon" />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhone">
                <div className="input-icon-wrapper">
                  <BsTelephoneForward className="input-icon" />
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: "35px" }}
                  />
                  <BsTelephoneForward className="input-icon" />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <div className="input-icon-wrapper">
                  <MdEmail className="input-icon" />
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: "35px" }}
                  />
                  <MdEmail className="input-icon" />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLocation">
                <div className="input-icon-wrapper">
                  <HiOutlineLocationMarker className="input-icon" />
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: "35px" }}
                  />
                  <HiOutlineLocationMarker className="input-icon" />
                </div>
              </Form.Group>
              <Form.Group controlId="formLocation">
                <div className="input-icon-wrapper">
                  <RiMessage2Line className="input-icon" />
                  <Form.Control
                    as="textarea"
                    placeholder="Message"
                    rows={2}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="input-field"
                  />
                  <RiMessage2Line className="input-icon" />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
        </div>
        {feedbackMessage && (
          <div style={{ textAlign: "center", color: "green" }}>
            {feedbackMessage}
          </div>
        )}
        <Button
          style={{
            background: "#24457b",
            color: "white",
            border: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal>
    </>
  );
}

export default PopupButton;
