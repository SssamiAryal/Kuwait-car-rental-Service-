import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Loginpage.css";
import carImage from "../../assets/Images/Loginpagecar.png";

const Loginpage = ({ onBack, onRegisterClick, onForgetClick }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="loginpage-container">
      <div className="login-image-wrapper">
        <img src={carImage} alt="Car" className="car-image" />
        <div className="quote-overlay">
          <h1 className="drive-title">
            Drive Your <span className="dreams-highlight">Dreams</span>
          </h1>
          <p>Reliable Cars. Exceptional Service.</p>
        </div>
      </div>
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Welcome to NovaDrive</h2>
          <p className="login-subtitle">
            Please log in to continue your journey
          </p>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            required
            onChange={handleChange}
          />
          <button type="submit" className="login-btn">
            Sign In
          </button>
          <p className="signup-text">
            Don't have an account?{" "}
            <span
              className="register-link"
              onClick={onRegisterClick}
            >
              Register
            </span>
          </p>
          <p className="forgot-password-wrapper">
            <span
              className="forgot-password-link"
              onClick={onForgetClick}
            >
              Forgot Password?
            </span>
          </p>
          <button type="button" onClick={onBack} className="back-btn">
            ← Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;