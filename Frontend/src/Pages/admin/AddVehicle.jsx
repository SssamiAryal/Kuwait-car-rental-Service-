import React, { useState } from "react";
import "../../Styles/AddVehicle.css";

const AddVehicle = ({ isOpen, onClose, onAdd }) => {
  const [vehicleData, setVehicleData] = useState({
    name: "",
    brand: "",
    price: "",
    seats: "",
    fuel: "",
    transmission: "",
    rating: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(vehicleData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch("http://localhost:5000/api/vehicle", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newVehicle = await res.json();
        onAdd(newVehicle);
        alert("Vehicle added successfully");
        setVehicleData({
          name: "",
          brand: "",
          price: "",
          seats: "",
          fuel: "",
          transmission: "",
          rating: "",
          description: "",
        });
        setImageFile(null);
        onClose();
      } else {
        alert("Failed to add vehicle");
      }
    } catch (err) {
      alert("Failed to add vehicle");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Add New Vehicle</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            name="name"
            value={vehicleData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            name="brand"
            value={vehicleData.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
          />
          <input
            name="price"
            type="number"
            value={vehicleData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            name="seats"
            type="number"
            value={vehicleData.seats}
            onChange={handleChange}
            placeholder="Seats"
          />
          <input
            name="fuel"
            value={vehicleData.fuel}
            onChange={handleChange}
            placeholder="Fuel Type"
          />
          <input
            name="transmission"
            value={vehicleData.transmission}
            onChange={handleChange}
            placeholder="Transmission"
          />
          <input
            name="rating"
            type="number"
            step="0.1"
            value={vehicleData.rating}
            onChange={handleChange}
            placeholder="Rating"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          <textarea
            name="description"
            value={vehicleData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <button type="submit" className="submit-btn">
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
