import React, { useState, useEffect } from "react";
import "../../Styles/Dashboard.css";
import "../../Styles/PrivAbout.css";
import { useNavigate, Link } from "react-router-dom";
import {
  FaCarAlt,
  FaSmile,
  FaPhoneAlt,
  FaSignOutAlt,
  FaUser,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

const PrivAbout = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

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
    <div className="priv-about-page">

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
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="about-eyebrow">Est. 2019 · United Arab Emirates</span>
          <h1>
            Built for the road,<br />trusted at every mile.
          </h1>
          <p>
            NovaDrive was founded on a simple principle: renting a car should
            be straightforward. Today we keep hundreds of vehicles moving
            across the UAE, supported by a team that's genuinely reachable.
          </p>
        </div>
        <div className="road-divider" aria-hidden="true"></div>
      </section>

      {/* STATS STRIP */}
      <section className="about-stats">
        <div className="about-stat">
          <strong>500+</strong>
          <span>Vehicles in fleet</span>
        </div>
        <div className="about-stat">
          <strong>12K+</strong>
          <span>Customers served</span>
        </div>
        <div className="about-stat">
          <strong>15+</strong>
          <span>Cities covered</span>
        </div>
        <div className="about-stat">
          <strong>4.9★</strong>
          <span>Average rating</span>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <div className="about-mission-grid">
          <div className="about-mission-text">
            <span className="about-label">Our mission</span>
            <h2>Renting a car should feel like the easy part of the trip.</h2>
            <p>
              Whether it's a business trip through Dubai, a family holiday, or
              a weekend away, we take care of the details so you can focus on
              the drive. Transparent pricing, verified availability, and a
              support team that responds — that's the whole promise.
            </p>
          </div>
          <div className="about-mission-badge">
            <FaShieldAlt size={28} />
            <p>Every rental includes full insurance and 24/7 roadside cover.</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-services">
        <span className="about-label center">Why choose us</span>
        <h2 className="about-section-title">What sets NovaDrive apart</h2>
        <div className="service-boxes">
          <div className="service-box">
            <div className="service-icon"><FaCarAlt size={26} /></div>
            <h3>Wide fleet</h3>
            <p>From efficient city runabouts to premium SUVs — there's a car for every trip.</p>
          </div>
          <div className="service-box">
            <div className="service-icon"><FaSmile size={26} /></div>
            <h3>Happy customers</h3>
            <p>Over 10,000 renters and counting, with a 4.9★ average across the fleet.</p>
          </div>
          <div className="service-box">
            <div className="service-icon"><FaPhoneAlt size={26} /></div>
            <h3>24/7 support</h3>
            <p>Real people on call around the clock, not a ticket queue.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="about-testimonials">
        <span className="about-label center">Testimonials</span>
        <h2 className="about-section-title">What our clients say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <FaQuoteLeft className="quote-icon" />
            <div className="testimonial-stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>
              The car was spotless and pickup took minutes, not hours. Easily
              the smoothest rental experience I've had in the region.
            </p>
            <div className="testimonial-person">
              <h4>Sophie Bennett</h4>
              <span>London, United Kingdom</span>
            </div>
          </div>
          <div className="testimonial-card">
            <FaQuoteLeft className="quote-icon" />
            <div className="testimonial-stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>
              Transparent pricing and a support team that actually answers.
              We've booked through NovaDrive for every UAE trip since.
            </p>
            <div className="testimonial-person">
              <h4>Marco Rossi</h4>
              <span>Milan, Italy</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Ready to ride?</h2>
        <p>Find your perfect car and start your journey today.</p>
        <button className="explore-btn" onClick={() => navigate("/dashboard/cars")}>
          Explore Cars
        </button>
      </section>

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

export default PrivAbout;