import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Styles/Contact.css";

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      <button className="floating-home-btn" onClick={() => navigate("/")}>
        <FaHome size={20} />
      </button>

      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Let us know how we can help you today.</p>
      </section>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </label>
          <label>
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject (optional)"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your message here..."
            />
          </label>
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h2>Reach Us</h2>
          <p>
            <FaPhoneAlt /> +977 9876543210
          </p>
          <p>
            <FaEnvelope /> support@novadrive.com
          </p>
          <p>
            <FaMapMarkerAlt /> Kuwait City
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
