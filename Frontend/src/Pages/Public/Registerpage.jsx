import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Registerpage.css";
import carImage from "../../assets/Images/RRegister.png";

const Registerpage = ({ onBack }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Registration successful! Please login.");
      navigate("/login");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="registerpage-container">
      <div className="register-image-wrapper">
        <img src={carImage} alt="Car" className="car-image" />
        <div className="quote-overlay">
          <h1 className="drive-title">
            Drive Your <span className="dreams-highlight">Dreams</span>
          </h1>
          <p>Create your account and start your journey</p>
        </div>
      </div>
      <div className="register-form-wrapper">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-title">Create Account</h2>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            required
            onChange={handleChange}
          />
          <button type="submit" className="register-btn">
            Register
          </button>
          <button type="button" onClick={onBack} className="back-btn">
            ← Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registerpage;
