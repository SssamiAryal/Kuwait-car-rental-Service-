// CarDetailsPopup.jsx
import React from "react";
import "../../Styles/CarDetailsPopup.css";

function CarDetailsPopup({ car, onClose }) {
  if (!car) return null;

  return (
    <div className="cardetail-overlay" onClick={onClose}>
      <div className="cardetail-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <img
          src={`http://localhost:5000/uploads/${car.image_url}`}
          alt={car.name}
          className="cardetail-image"
        />
        <h2>{car.name}</h2>
        <p>{car.description}</p>
      </div>
    </div>
  );
}

export default CarDetailsPopup;
