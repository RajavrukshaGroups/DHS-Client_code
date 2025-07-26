import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./tapContact.css";
import { toast } from "react-toastify";

const ContactForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    // subject is now handled in the submission
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = {};

    if (!phonePattern.test(formData.phone)) {
      errors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!emailPattern.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsSubmitting(true);

    try {
      // Create the complete payload including source
      const payload = {
        ...formData,
        subject: "Google Ads Lead", // Explicitly set subject
        source: "google_ads", // Explicitly set source
        location: "Google Ads Campaign", // Add location if needed
      };

      console.log("Sending payload:", payload); // Debug log

      const response = await fetch(
        // "http://localhost:4000/defenceWebsiteRoutes/contactus",
        " https://adminpanel.defencehousingsociety.com/defenceWebsiteRoutes/contactus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully;", result);
      toast.success("Thank you for contacting us!");
      onFormSubmit(); // Close modal and remove blur
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="compact-form">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          isInvalid={!!formErrors.email}
        />
        {formErrors.email && (
          <Form.Text className="text-danger">{formErrors.email}</Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          isInvalid={!!formErrors.phone}
        />
        {formErrors.phone && (
          <Form.Text className="text-danger">{formErrors.phone}</Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="w-100 mt-2"
        size="sm"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
};

export default ContactForm;
