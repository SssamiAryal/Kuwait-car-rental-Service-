import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaCalendarCheck,
  FaCar,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Styles/BookingManagement.css";

function BookingManagement() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch(() => setBookings([]));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setBookings(bookings.filter((b) => b.id !== id)));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/adminlogin");
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>NovaDrive</h2>

        <ul>
          <li onClick={() => navigate("/admindashboard")}>
            <FaUsers /> Dashboard
          </li>

          <li onClick={() => navigate("/admin/vehiclemanagement")}>
            <FaCar /> Vehicles
          </li>

          <li
            className="active"
            onClick={() => navigate("/admin/bookings")}
          >
            <FaCalendarCheck /> Bookings
          </li>

          <li onClick={() => navigate("/admin/customers")}>
            <FaUsers /> Customers
          </li>

          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      <main className="dashboard">
        <div className="booking-wrapper">
          <div className="booking-header">
            <h2>Booking Management</h2>
          </div>

          <table className="booking-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Pickup Location</th>
                <th>Dropoff Location</th>
                <th>Pickup Date</th>
                <th>Return Date</th>
                <th>Car ID</th>
                <th>Car Name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No bookings available
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>{b.phone}</td>
                    <td>{b.pickup_location}</td>
                    <td>{b.dropoff_location}</td>
                    <td>{b.pickup_date}</td>
                    <td>{b.return_date}</td>
                    <td>{b.car_id}</td>
                    <td>{b.car_name}</td>
                    <td className="actions">
                      <FaTrash
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleDelete(b.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default BookingManagement;