import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Loginpage.css";
import carImage from "../../assets/Images/Loginpagecar.png";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === "admin@admin.com" && form.password === "admin123") {
      localStorage.setItem("admin", true);
      navigate("/admindashboard");
    } else {
      alert("Invalid admin credentials");
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
          <h2 className="login-title">Welcome, Admin</h2>
          <p className="login-subtitle">Please log in to manage the system</p>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="admin@admin.com"
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
            Log In as Admin
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="back-btn"
          >
            ← Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
