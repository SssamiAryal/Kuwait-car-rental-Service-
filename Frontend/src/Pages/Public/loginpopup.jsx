import React from "react";
import "../../Styles/loginpopup.css";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Oops! You're not logged in.</h2>
        <p>Please log in to book your ride and explore car details.</p>
        <button className="login-btn" onClick={handleLoginRedirect}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
