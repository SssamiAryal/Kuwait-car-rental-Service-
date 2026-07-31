import React from "react";
import "../../Styles/Landingpage.css";
import landingBg from "../../assets/images/randomcar.png";
import { useNavigate } from "react-router-dom";

function Landingpage() {
  const navigate = useNavigate();

  const LogoSVG = ({ size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#1e90ff" />
      <path d="M7 27L11 16H29L33 27H7Z" fill="white" fillOpacity="0.12" />
      <path d="M9 27L13 17H27L31 27" stroke="white" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
      <circle cx="14" cy="28.5" r="3" fill="white" />
      <circle cx="26" cy="28.5" r="3" fill="white" />
      <path d="M13 20.5H22" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 23.5H33" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );

  return (
    <div className="nd-simple-root" style={{ backgroundImage: `url(${landingBg})` }}>
      <div className="nd-simple-overlay">

        {/* HEADER */}
        <header className="nd-simple-header">
          <div className="nd-simple-brand" onClick={() => navigate("/")}>
            <LogoSVG size={34} />
            <span className="nd-simple-brand-name">NovaDrive</span>
          </div>
        </header>

        {/* HERO CONTENT */}
        <main className="nd-simple-hero">
          <span className="nd-simple-eyebrow">Premium Car Rentals</span>
          <h1>Your Journey Starts Here</h1>
          <p>Book premium, reliable rental cars in minutes — anytime, anywhere.</p>

          <button
            className="nd-simple-btn"
            onClick={() => navigate("/login")}
          >
            Start Your Journey
          </button>
        </main>

        {/* FOOTER */}
        <footer className="nd-simple-footer">
          <span>© 2025 NovaDrive. All rights reserved.</span>
        </footer>

      </div>
    </div>
  );
}

export default Landingpage;