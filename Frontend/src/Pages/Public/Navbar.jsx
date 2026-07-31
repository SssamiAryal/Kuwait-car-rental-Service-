import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Landingpage.css"; // Assuming your navbar styles are here

function Navbar() {
  const navigate = useNavigate();

  return (
    <header>
      <h1>GadiSawari</h1>
      <nav>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <button className="nav-login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
