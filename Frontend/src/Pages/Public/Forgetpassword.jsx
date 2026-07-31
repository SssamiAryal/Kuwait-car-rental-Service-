import React from "react";
import "../../Styles/Forgetpassword.css";
import carImage from "../../assets/Images/forget.png";

const Forgetpassword = ({ onBack }) => {
  return (
    <div className="forgetpage-container">
      <div className="forget-image-wrapper">
        <img src={carImage} alt="Car" className="car-image" />
        <div className="quote-overlay">
          <h1 className="drive-title">
            Drive Your <span className="dreams-highlight">Dreams</span>
          </h1>
          <p>Reset your password and get back on the road</p>
        </div>
      </div>
      <div className="forget-form-wrapper">
        <form className="forget-form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="forget-title">Forgot Password</h2>
          <p className="forget-subtitle">
            Enter your email address to receive a password reset link
          </p>

          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Email" required />

          <button type="submit" className="forget-btn">
            Send Reset Link
          </button>

          <button type="button" onClick={onBack} className="back-btn">
            ← Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgetpassword;
