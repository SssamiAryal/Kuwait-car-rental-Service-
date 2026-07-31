import React, { useState } from "react";
import "../../Styles/cars.css";
import { FaUserFriends, FaGasPump, FaCog, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginPopup from "./loginpopup";

import teslaimage from "../../assets/images/Tesla.png";
import bmw from "../../assets/images/Bmw.png";
import toyota from "../../assets/images/Toyota.png";
import mercedes from "../../assets/images/Mercedes.png";
import honda from "../../assets/images/Honda.png";
import porche from "../../assets/images/Porche.png";
import audi from "../../assets/images/Audi.png";
import mustang from "../../assets/images/mustang.png";
import jeep from "../../assets/images/Jeep.png";
import chevrolet from "../../assets/images/Chevrolet.png";
import nissan from "../../assets/images/Nissan.png";
import volkswagon from "../../assets/images/Volkswagon.png";

const Cars = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const cars = [
    {
      _id: "1",
      name: "Tesla Model 3",
      brand: "Tesla",
      price: 100,
      seats: 5,
      fuel: "Electric",
      transmission: "Automatic",
      rating: 4.9,
      image: teslaimage,
    },
    {
      _id: "2",
      name: "BMW 5 Series",
      brand: "BMW",
      price: 120,
      seats: 5,
      fuel: "Petrol",
      transmission: "Automatic",
      rating: 4.8,
      image: bmw,
    },
    {
      _id: "3",
      name: "Toyota Corolla",
      brand: "Toyota",
      price: 70,
      seats: 5,
      fuel: "Petrol",
      transmission: "Manual",
      rating: 4.5,
      image: toyota,
    },
    {
      _id: "4",
      name: "Mercedes-Benz C-Class",
      brand: "Mercedes",
      price: 150,
      seats: 5,
      fuel: "Diesel",
      transmission: "Automatic",
      rating: 4.9,
      image: mercedes,
    },
    {
      _id: "5",
      name: "Honda Civic",
      brand: "Honda",
      price: 85,
      seats: 5,
      fuel: "Petrol",
      transmission: "Manual",
      rating: 4.6,
      image: honda,
    },
    {
      _id: "6",
      name: "Porsche 911",
      brand: "Porsche",
      price: 300,
      seats: 2,
      fuel: "Petrol",
      transmission: "Automatic",
      rating: 5.0,
      image: porche,
    },
    {
      _id: "7",
      name: "Audi A6",
      brand: "Audi",
      price: 130,
      seats: 5,
      fuel: "Petrol",
      transmission: "Automatic",
      rating: 4.7,
      image: audi,
    },
    {
      _id: "8",
      name: "Ford Mustang",
      brand: "Ford",
      price: 160,
      seats: 4,
      fuel: "Petrol",
      transmission: "Manual",
      rating: 4.8,
      image: mustang,
    },
    {
      _id: "9",
      name: "Jeep Wrangler",
      brand: "Jeep",
      price: 140,
      seats: 5,
      fuel: "Petrol",
      transmission: "Manual",
      rating: 4.6,
      image: jeep,
    },
    {
      _id: "10",
      name: "Chevrolet Camaro",
      brand: "Chevrolet",
      price: 155,
      seats: 4,
      fuel: "Petrol",
      transmission: "Automatic",
      rating: 4.7,
      image: chevrolet,
    },
    {
      _id: "11",
      name: "Nissan Altima",
      brand: "Nissan",
      price: 75,
      seats: 5,
      fuel: "Petrol",
      transmission: "Automatic",
      rating: 4.4,
      image: nissan,
    },
    {
      _id: "12",
      name: "Volkswagen Golf",
      brand: "Volkswagen",
      price: 80,
      seats: 5,
      fuel: "Diesel",
      transmission: "Manual",
      rating: 4.5,
      image: volkswagon,
    },
  ];

  const handleBook = () => {
    setShowLoginPopup(true);
  };

  const handleViewDetails = () => {
    setShowLoginPopup(true);
  };

  const onLoginClick = () => {
    setShowLoginPopup(false);
    // optionally navigate to login here
  };

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
    <div className="cars-page">
      {/* Home button like your original */}
      <Link to="/" className="floating-home-btn">
        <FaHome size={24} />
      </Link>

      <aside className="filters-section">
        <h3>Filters</h3>
        <div className="filter-group">
          <p>Brand</p>
          {[
            "Tesla",
            "BMW",
            "Mercedes",
            "Toyota",
            "Honda",
            "Porsche",
            "Audi",
            "Ford",
            "Jeep",
            "Chevrolet",
            "Nissan",
            "Volkswagen",
          ].map((brand) => (
            <label key={brand}>
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={selectedBrand === brand}
                onChange={() => setSelectedBrand(brand)}
              />{" "}
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
            />{" "}
            All
          </label>
        </div>

        <div className="filter-group">
          <p>Transmission</p>
          {["Automatic", "Manual"].map((trans) => (
            <label key={trans}>
              <input
                type="radio"
                name="transmission"
                value={trans}
                checked={selectedTransmission === trans}
                onChange={() => setSelectedTransmission(trans)}
              />{" "}
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
            />{" "}
            All
          </label>
        </div>
      </aside>

      <section className="cars-section">
        <div className="cars-header">
          <div>
            <h2>Browse Our Cars</h2>
            <p>Find the perfect vehicle for your journey.</p>
          </div>
          <select
            className="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <div className="car-grid">
          {filteredCars.length === 0 && (
            <p style={{ padding: "20px", fontStyle: "italic" }}>
              No cars found matching your filters.
            </p>
          )}
          {filteredCars.map((car) => (
            <div className="car-card" key={car._id}>
              <img src={car.image} alt={car.name} />
              <div className="car-price">${car.price}/day</div>
              <h3 className="car-name">{car.name}</h3>
              <p className="car-brand">{car.brand}</p>
              <div className="car-info">
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
              <div className="car-rating">⭐ {car.rating}</div>
              <div className="car-actions">
                <button className="view-btn" onClick={handleViewDetails}>
                  View Details
                </button>
                <button className="book-btn" onClick={handleBook}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onLoginClick={onLoginClick}
        />
      )}
    </div>
  );
};

export default Cars;
