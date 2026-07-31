import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaCar,
  FaCalendarCheck,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Styles/CustomerManagement.css";

function CustomerManagement() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch(() => setCustomers([]));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/admin/customers/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setCustomers(customers.filter((c) => c.id !== id)));
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

          <li onClick={() => navigate("/admin/bookings")}>
            <FaCalendarCheck /> Bookings
          </li>

          <li
            className="active"
            onClick={() => navigate("/admin/customers")}
          >
            <FaUsers /> Customers
          </li>

          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      <main className="dashboard">
        <div className="customer-management">
          <h2>Customer Management</h2>

          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                    No customers available
                  </td>
                </tr>
              ) : (
                customers.map((cust, index) => (
                  <tr key={cust.id}>
                    <td>{index + 1}</td>
                    <td>{cust.name}</td>
                    <td>{cust.email}</td>
                    <td className="actions">
                      <FaTrash
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleDelete(cust.id)}
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

export default CustomerManagement;