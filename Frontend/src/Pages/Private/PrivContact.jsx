import React, { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUser,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "../../Styles/Dashboard.css";
import "../../Styles/PrivContact.css";

const PrivContact = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const LogoSVG = ({ size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#2563eb" />
      <path d="M7 27L11 16H29L33 27H7Z" fill="white" fillOpacity="0.1" />
      <path d="M9 27L13 17H27L31 27" stroke="white" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
      <circle cx="14" cy="28.5" r="2.8" fill="white" />
      <circle cx="26" cy="28.5" r="2.8" fill="white" />
      <path d="M13 20.5H22" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 24H33" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  );

  return (
    <div className="contact-page">

      {/* NAVBAR */}
      <header className="db-navbar">
        <div className="db-brand" onClick={() => navigate("/dashboard")}>
          <LogoSVG size={32} />
          <span className="db-brand-name">NovaDrive</span>
        </div>
        <nav className="db-nav">
          <div className="db-nav-links">
            <Link to="/dashboard">Home</Link>
            <Link to="/dashboard/cars">Cars</Link>
            <Link to="/dashboard/about">About</Link>
            <Link to="/dashboard/contact">Contact</Link>
          </div>
          <div className="db-profile-section">
            <div className="db-profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
              <div className="db-profile-circle">
                {user.name && user.name.trim() !== "" ? (
                  user.name.trim().charAt(0).toUpperCase()
                ) : (
                  <FaUser style={{ fontSize: "16px" }} />
                )}
              </div>
              <span>{user.name ? user.name.split(" ")[0] : "Account"}</span>
              <span className="db-chevron">⌄</span>
            </div>
            {showDropdown && (
              <div className="db-dropdown">
                <p className="db-dropdown-email">{user.email}</p>
                <button className="db-logout-btn" onClick={handleLogout}>
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <span className="contact-eyebrow">Get in touch</span>
          <h1>We're here to help</h1>
          <p>
            Questions about a booking, a fleet vehicle, or anything else —
            send us a message and we'll get back to you within one business day.
          </p>
        </div>
        <div className="road-divider" aria-hidden="true"></div>
      </section>

      {/* CONTACT */}
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a message</h2>

          {submitted && (
            <div className="form-success">
              <FaCheckCircle />
              Message sent — we'll get back to you soon.
            </div>
          )}

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
          <h2>Reach us directly</h2>
          <p className="contact-info-sub">
            Prefer to talk it through? Our team is available every day of the week.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <div className="contact-info-icon"><FaPhoneAlt /></div>
              <div>
                <span className="contact-info-label">Phone</span>
                <span className="contact-info-value">+971 50 123 4567</span>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon"><FaEnvelope /></div>
              <div>
                <span className="contact-info-label">Email</span>
                <span className="contact-info-value">support@novadrive.com</span>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon"><FaMapMarkerAlt /></div>
              <div>
                <span className="contact-info-label">Location</span>
                <span className="contact-info-value">Dubai, United Arab Emirates</span>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon"><FaClock /></div>
              <div>
                <span className="contact-info-label">Working hours</span>
                <span className="contact-info-value">Mon – Fri: 8 AM – 8 PM</span>
              </div>
            </div>
          </div>

          <div className="contact-social">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <div className="db-footer-logo-row">
              <LogoSVG size={26} />
              <h3>NovaDrive</h3>
            </div>
            <p>Your trusted partner for reliable and premium car rentals across the UAE.</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p><FaPhoneAlt /> +971 50 123 4567</p>
            <p><FaEnvelope /> info@novadrive.com</p>
            <p><FaMapMarkerAlt /> Dubai, UAE</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/dashboard">Home</Link>
            <Link to="/dashboard/cars">Cars</Link>
            <Link to="/dashboard/about">About</Link>
            <Link to="/dashboard/contact">Contact</Link>
          </div>
          <div className="footer-section">
            <h4>Working Hours</h4>
            <p>Mon – Fri: 8:00 AM – 8:00 PM</p>
            <p>Sat: 9:00 AM – 6:00 PM</p>
            <p>Sun: 10:00 AM – 4:00 PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 NovaDrive. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PrivContact;