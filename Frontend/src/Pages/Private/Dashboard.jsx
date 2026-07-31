import React, { useState, useEffect } from "react";
import "../../Styles/Dashboard.css";
import heroImage from "../../assets/images/whitejeep.jpg";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

function Dashboard() {
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
    <div className="db-root">

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
      <section className="hero-split">
        <div className="hero-left">
          <p className="hero-tagline">Kuwait's #1 Premium Car Rental</p>
          <h1 className="hero-heading">
            Drive Smarter.<br />
            Travel <span className="hero-highlight">Better.</span>
          </h1>
          <p className="hero-desc">
            Premium vehicles across kuwait with transparent pricing,
            instant booking, and 24/7 support — wherever the road takes you.
          </p>
          <div className="hero-perks">
            <span><FaCheckCircle className="perk-icon" /> No hidden fees</span>
            <span><FaCheckCircle className="perk-icon" /> Free cancellation</span>
            <span><FaCheckCircle className="perk-icon" /> 24/7 roadside help</span>
          </div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/dashboard/cars")}>
              Browse Cars <FaArrowRight />
            </button>
            <button className="btn-outline">Learn More</button>
          </div>
          <div className="hero-numbers">
            <div className="hero-stat">
              <strong>500+</strong>
              <span>Vehicles</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>12K+</strong>
              <span>Customers</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>4.9★</strong>
              <span>Rating</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>15+</strong>
              <span>Cities</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-wrap">
            <img src={heroImage} alt="Premium car" className="hero-car-img" />
            <div className="hero-pill hero-pill-top">
              <span className="pill-dot" />
              Available Now
            </div>
            <div className="hero-pill hero-pill-bottom">
              ★ 4.9 · 2,400+ reviews
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE */}
      <section className="service">
        <h2>Choose your service</h2>
        <div className="card">
          <h3>🚗 Rent a Car</h3>
          <p>Find and book a car for your trip across Kuwait City.</p>
          <button onClick={() => navigate("/dashboard/cars")}>Explore Cars</button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Why Choose NovaDrive?</h2>
        <p>
          We provide exceptional car rental services with unmatched quality,
          convenience, and customer satisfaction across Dubai.
        </p>
        <div className="feature-grid">
          <div className="feature-box">
            <div className="icon">🚘</div>
            <h4>Premium Fleet</h4>
            <p>Choose from our extensive collection of luxury and economy cars.</p>
          </div>
          <div className="feature-box">
            <div className="icon">🛡️</div>
            <h4>Full Insurance</h4>
            <p>Enjoy complete coverage and roadside assistance with every rental.</p>
          </div>
          <div className="feature-box">
            <div className="icon">⏰</div>
            <h4>24/7 Support</h4>
            <p>Always-on customer support and emergency help when you need it.</p>
          </div>
          <div className="feature-box">
            <div className="icon">📍</div>
            <h4>Multiple Locations</h4>
            <p>Convenient pickup and drop-off across Dubai, Abu Dhabi, and Sharjah.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Renting a car with NovaDrive is simple. Just follow these steps and hit the road.
        </p>
        <div className="steps-container">
          <div className="step-box">
            <div className="step-circle">1</div>
            <h3>Choose Your Car</h3>
            <p>Browse our wide selection of vehicles and pick the best fit for your journey.</p>
          </div>
          <div className="step-box">
            <div className="step-circle">2</div>
            <h3>Book & Pay</h3>
            <p>Select your dates, confirm your booking, and pay securely online.</p>
          </div>
          <div className="step-box">
            <div className="step-circle">3</div>
            <h3>Enjoy the Ride</h3>
            <p>Pick up your car and enjoy a premium, hassle-free driving experience.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>"NovaDrive made my Dubai business trip effortless. The car was spotless and the booking took under 3 minutes. Will absolutely use again."</p>
            <div className="customer-info">
              <h4>Élise Fontaine</h4>
              <span>Paris, France</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>"Rented a BMW for a weekend getaway and it exceeded every expectation. Professional staff, perfect condition. Best rental experience I've had."</p>
            <div className="customer-info">
              <h4>Lukas Bauer</h4>
              <span>Munich, Germany</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p>"I travel frequently across the UAE for work and NovaDrive is the most consistent rental service I've found. Fleet is always modern and clean."</p>
            <div className="customer-info">
              <h4>Yuki Tanaka</h4>
              <span>Tokyo, Japan</span>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <h2 className="section-title">Stay Updated</h2>
        <p>Subscribe for exclusive NovaDrive offers, new arrivals, and UAE driving tips.</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <div className="db-footer-logo-row">
              <LogoSVG size={26} />
              <h3>NovaDrive</h3>
            </div>
            <p>Your trusted partner for reliable and premium car rentals across Kuwait City.</p>
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
            <p><FaMapMarkerAlt /> Kuwait City</p>
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
}

export default Dashboard;