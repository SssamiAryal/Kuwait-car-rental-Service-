import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/Dashboard.css";
import "../../Styles/PrivCars.css";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUserFriends,
  FaGasPump,
  FaCog,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import CarDetailsPopup from "./CarDetailsPopup";

const PrivCars = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [popupCar, setPopupCar] = useState(null);
  const [cars, setCars] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vehicle")
      .then((res) => setCars(res.data))
      .catch(() => {});
  }, []);

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

  const handleBook = (id) => {
    navigate(`/book/${id}`);
  };

  const handleViewDetails = (car) => {
    setPopupCar(car);
  };

  const closePopup = () => {
    setPopupCar(null);
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

  const brands = [...new Set(cars.map((car) => car.brand))].sort();

  const filteredCars = cars
    .filter((car) => (selectedBrand ? car.brand === selectedBrand : true))
    .filter((car) =>
      selectedTransmission ? car.transmission === selectedTransmission : true
    )
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="priv-cars-page">

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

      <div className="priv-cars-body">
      <aside className="priv-filters-section">
        <h3>Filters</h3>
        <div className="priv-filter-group">
          <p>Brand</p>
          {brands.map((brand) => (
            <label key={brand}>
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={selectedBrand === brand}
                onChange={() => setSelectedBrand(brand)}
              />
              {brand}
            </label>
          ))}
          <label>
            <input
              type="radio"
              name="brand"
              value=""
              checked={selectedBrand === ""}
              onChange={() => setSelectedBrand("")}
            />
            All
          </label>
        </div>

        <div className="priv-filter-group">
          <p>Transmission</p>
          {["Automatic", "Manual"].map((trans) => (
            <label key={trans}>
              <input
                type="radio"
                name="transmission"
                value={trans}
                checked={selectedTransmission === trans}
                onChange={() => setSelectedTransmission(trans)}
              />
              {trans}
            </label>
          ))}
          <label>
            <input
              type="radio"
              name="transmission"
              value=""
              checked={selectedTransmission === ""}
              onChange={() => setSelectedTransmission("")}
            />
            All
          </label>
        </div>
      </aside>

      <section className="priv-cars-container">
        <div className="priv-cars-header">
          <div>
            <h2>Browse Our Cars</h2>
            <p>Find the perfect vehicle for your journey.</p>
          </div>
          <select
            className="priv-sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {filteredCars.length === 0 && (
          <p style={{ padding: "20px", fontStyle: "italic" }}>
            No cars found matching your filters.
          </p>
        )}

        <div className="priv-car-cards">
          {filteredCars.map((car) => (
            <div className="priv-car-card" key={car.id || car._id}>
              <img
                src={`http://localhost:5000/uploads/${car.image_url}`}
                alt={car.name}
              />
              <div className="priv-car-price">${car.price}/day</div>
              <h3 className="priv-car-name">{car.name}</h3>
              <p className="priv-car-brand">{car.brand}</p>
              <div className="priv-car-info">
                <span>
                  <FaUserFriends /> {car.seats}
                </span>
                <span>
                  <FaGasPump /> {car.fuel}
                </span>
                <span>
                  <FaCog /> {car.transmission}
                </span>
              </div>
              <div className="priv-car-rating">⭐ {car.rating}</div>
              <div className="priv-car-actions">
                <button
                  className="priv-view-btn"
                  onClick={() => handleViewDetails(car)}
                >
                  View Details
                </button>
                <button
                  className="priv-book-btn"
                  onClick={() => handleBook(car.id || car._id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>

      {popupCar && <CarDetailsPopup car={popupCar} onClose={closePopup} />}
    </div>
  );
};

export default PrivCars;