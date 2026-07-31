// BookCar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaUser,
  FaCreditCard,
  FaCalendarAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaCarSide,
  FaSignOutAlt,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import "../../Styles/Dashboard.css";
import "../../Styles/BookCar.css";

const BookCar = () => {
  const navigate = useNavigate();
  const { carId } = useParams();

  const [step, setStep] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  const [data, setData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [carImage, setCarImage] = useState(null);
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (carId) {
      fetch(`http://localhost:5000/api/vehicle/${carId}`)
        .then((res) => res.json())
        .then((car) => {
          setCarDetails(car || null);
          if (car && car.image_url) {
            setCarImage(`http://localhost:5000/uploads/${car.image_url}`);
          } else {
            setCarImage(null);
          }
        })
        .catch(() => {
          setCarImage(null);
          setCarDetails(null);
        });
    }
  }, [carId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const next = () => {
    if (step < 4) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      pickup_location: data.pickupLocation,
      dropoff_location: data.dropoffLocation,
      pickup_date: data.pickupDate,
      return_date: data.dropoffDate,
      car_id: parseInt(carId),
    };

    try {
      const response = await fetch("http://localhost:5000/api/booking/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setStep(4);
      } else {
        alert("Booking failed: " + result.error);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const calcNights = () => {
    if (!data.pickupDate || !data.dropoffDate) return 0;
    const d1 = new Date(data.pickupDate);
    const d2 = new Date(data.dropoffDate);
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const dailyRate = carDetails?.price_per_day || carDetails?.price || 0;
  const nights = calcNights();
  const subtotal = dailyRate * nights;

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

  const steps = [
    { label: "Rental Details", icon: <FaMapMarkerAlt /> },
    { label: "Personal Info", icon: <FaUser /> },
    { label: "Payment", icon: <FaCreditCard /> },
  ];

  if (step === 4) {
    return (
      <div className="bookcar-page">
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

        <div className="confirm-wrap">
          <div className="confirm-card">
            <div className="confirmation-icon">
              <FaCheckCircle />
            </div>
            <h3>Booking Confirmed!</h3>
            <p className="confirmation-sub">
              A confirmation has been sent to <strong>{data.email}</strong>.
              We can't wait to get you on the road.
            </p>

            <div className="confirmation-details">
              <div className="confirmation-row">
                <span className="confirmation-icon-sm"><FaUser /></span>
                <div>
                  <span className="confirmation-label">Name</span>
                  <span className="confirmation-value">{data.fullName}</span>
                </div>
              </div>
              <div className="confirmation-row">
                <span className="confirmation-icon-sm"><FaEnvelope /></span>
                <div>
                  <span className="confirmation-label">Email</span>
                  <span className="confirmation-value">{data.email}</span>
                </div>
              </div>
              <div className="confirmation-row">
                <span className="confirmation-icon-sm"><FaPhoneAlt /></span>
                <div>
                  <span className="confirmation-label">Phone</span>
                  <span className="confirmation-value">{data.phone}</span>
                </div>
              </div>
              <div className="confirmation-row">
                <span className="confirmation-icon-sm"><FaMapMarkerAlt /></span>
                <div>
                  <span className="confirmation-label">Pickup Location</span>
                  <span className="confirmation-value">{data.pickupLocation}</span>
                </div>
              </div>
              <div className="confirmation-row">
                <span className="confirmation-icon-sm"><FaMapMarkerAlt /></span>
                <div>
                  <span className="confirmation-label">Dropoff Location</span>
                  <span className="confirmation-value">{data.dropoffLocation}</span>
                </div>
              </div>
              <div className="confirmation-row">
                <span className="confirmation-icon-sm"><FaCalendarAlt /></span>
                <div>
                  <span className="confirmation-label">Rental Dates</span>
                  <span className="confirmation-value">
                    {data.pickupDate} → {data.dropoffDate}
                  </span>
                </div>
              </div>
              {carId && (
                <div className="confirmation-row">
                  <span className="confirmation-icon-sm"><FaCarSide /></span>
                  <div>
                    <span className="confirmation-label">Car Selected</span>
                    <span className="confirmation-value">Car ID: {carId}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              className="done-button"
              onClick={() => navigate("/dashboard")}
              type="button"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bookcar-page">

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

      {/* PAGE HEADER STRIP */}
      <div className="bookcar-topbar">
        <button className="top-left-back" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <div className="bookcar-topbar-text">
          <span className="bookcar-eyebrow">
            <FaCarSide /> Secure Checkout
          </span>
          <h1>Complete Your Booking</h1>
        </div>
      </div>

      {/* STEP INDICATOR */}
      <div className="steps">
        {steps.map((s, i) => {
          const num = i + 1;
          const isActive = step >= num;
          const isCurrent = step === num;
          return (
            <div
              className={`step-item ${isActive ? "active" : ""} ${
                isCurrent ? "current" : ""
              }`}
              key={s.label}
            >
              <div className="step-circle-num">
                {step > num ? <FaCheckCircle /> : num}
              </div>
              <span className="step-label">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* MAIN LAYOUT */}
      <div className="bookcar-layout">

        {/* LEFT — FORM */}
        <div className="bookcar-form-panel">
          <form onSubmit={submit}>
            {step === 1 && (
              <div className="form-section">
                <h2 className="panel-title">Rental Details</h2>
                <p className="panel-subtitle">Where and when do you need the car?</p>

                <div className="input-row">
                  <div className="input-group">
                    <label>Pickup Location</label>
                    <input
                      type="text"
                      name="pickupLocation"
                      placeholder="e.g. Dubai Airport"
                      value={data.pickupLocation}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="input-group">
                    <label>Dropoff Location</label>
                    <input
                      type="text"
                      name="dropoffLocation"
                      placeholder="e.g. Downtown Dubai"
                      value={data.dropoffLocation}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Pickup Date</label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={data.pickupDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="input-group">
                    <label>Dropoff Date</label>
                    <input
                      type="date"
                      name="dropoffDate"
                      value={data.dropoffDate}
                      onChange={handleChange}
                      required
                      min={
                        data.pickupDate || new Date().toISOString().split("T")[0]
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-section">
                <h2 className="panel-title">Personal Information</h2>
                <p className="panel-subtitle">Tell us who's picking up the car.</p>

                <div className="input-group full">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your full name"
                    value={data.fullName}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={data.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+971 50 123 4567"
                      value={data.phone}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-section">
                <h2 className="panel-title">Payment</h2>
                <p className="panel-subtitle">Enter your card details to confirm.</p>

                <div className="input-group full">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={data.cardNumber}
                    onChange={handleChange}
                    maxLength={16}
                    required
                    pattern="\d{16}"
                    title="Enter 16 digit card number"
                    autoComplete="cc-number"
                  />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Expiry Date</label>
                    <input
                      type="month"
                      name="expiryDate"
                      value={data.expiryDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().slice(0, 7)}
                      autoComplete="cc-exp"
                    />
                  </div>
                  <div className="input-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      placeholder="•••"
                      value={data.cvv}
                      onChange={handleChange}
                      maxLength={3}
                      required
                      pattern="\d{3}"
                      title="Enter 3 digit CVV"
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>
                <div className="secure-note">
                  <FaLock /> Your payment information is encrypted and secure.
                </div>
              </div>
            )}

            <div className="buttons">
              {step > 1 && (
                <button type="button" className="back-btn-bottom" onClick={back}>
                  Back
                </button>
              )}
              {step < 3 && (
                <button type="button" className="next-btn" onClick={next}>
                  Continue
                </button>
              )}
              {step === 3 && (
                <button type="submit" className="confirm-btn">
                  Confirm Booking
                </button>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT — SUMMARY */}
        <aside className="bookcar-summary-panel">
          <div className="summary-card">
            {carImage ? (
              <div className="summary-car-image">
                <img src={carImage} alt="Selected Car" />
              </div>
            ) : (
              <div className="summary-car-placeholder">
                <FaCarSide />
              </div>
            )}

            <div className="summary-body">
              <h3 className="summary-title">Booking Summary</h3>

              <div className="summary-row">
                <span className="summary-icon"><FaMapMarkerAlt /></span>
                <div>
                  <span className="summary-label">Pickup</span>
                  <span className="summary-value">
                    {data.pickupLocation || "Not set yet"}
                  </span>
                </div>
              </div>
              <div className="summary-row">
                <span className="summary-icon"><FaMapMarkerAlt /></span>
                <div>
                  <span className="summary-label">Dropoff</span>
                  <span className="summary-value">
                    {data.dropoffLocation || "Not set yet"}
                  </span>
                </div>
              </div>
              <div className="summary-row">
                <span className="summary-icon"><FaCalendarAlt /></span>
                <div>
                  <span className="summary-label">Dates</span>
                  <span className="summary-value">
                    {data.pickupDate && data.dropoffDate
                      ? `${data.pickupDate} → ${data.dropoffDate}`
                      : "Not set yet"}
                  </span>
                </div>
              </div>

              <div className="summary-divider" />

              <div className="summary-price-row">
                <span>Daily rate</span>
                <span>{dailyRate ? `$${dailyRate}` : "—"}</span>
              </div>
              <div className="summary-price-row">
                <span>Nights</span>
                <span>{nights || "—"}</span>
              </div>
              <div className="summary-price-row total">
                <span>Estimated Total</span>
                <span>{subtotal ? `$${subtotal}` : "—"}</span>
              </div>

              <div className="summary-trust">
                <FaShieldAlt />
                <span>Free cancellation up to 24 hours before pickup</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookCar;