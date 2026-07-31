// EditVehicle.jsx
import React, { useState, useEffect } from "react";
import "../../Styles/EditVehicle.css";

const EditVehicle = ({ isOpen, onClose, vehicle, onUpdate }) => {
  const [vehicleData, setVehicleData] = useState({ ...vehicle });

  useEffect(() => {
    setVehicleData({ ...vehicle });
  }, [vehicle]);

  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/api/vehicle/${vehicle.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vehicleData),
        }
      );

      if (res.ok) {
        const updatedVehicle = await res.json();
        alert("Vehicle updated successfully");
        onUpdate(updatedVehicle);
        onClose();
      } else {
        alert("Failed to update vehicle");
      }
    } catch (err) {
      alert("Failed to update vehicle");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Edit Vehicle</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={vehicleData.name || ""}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            name="brand"
            value={vehicleData.brand || ""}
            onChange={handleChange}
            placeholder="Brand"
            required
          />
          <input
            name="price"
            type="number"
            value={vehicleData.price || ""}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            name="seats"
            type="number"
            value={vehicleData.seats || ""}
            onChange={handleChange}
            placeholder="Seats"
          />
          <input
            name="fuel"
            value={vehicleData.fuel || ""}
            onChange={handleChange}
            placeholder="Fuel Type"
          />
          <input
            name="transmission"
            value={vehicleData.transmission || ""}
            onChange={handleChange}
            placeholder="Transmission"
          />
          <input
            name="rating"
            type="number"
            step="0.1"
            value={vehicleData.rating || ""}
            onChange={handleChange}
            placeholder="Rating"
          />
          <textarea
            name="description"
            value={vehicleData.description || ""}
            onChange={handleChange}
            placeholder="Description"
          />
          <button type="submit" className="submit-btn">
            Update Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVehicle;
