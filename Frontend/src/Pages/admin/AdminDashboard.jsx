import React, { useState } from "react";
import { FaCar, FaCalendarCheck, FaUsers, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Styles/AdminDashboard.css";

function AdminDashboard() {
  const [vehicles, setVehicles] = useState(247);
  const [bookings, setBookings] = useState(156);
  const [customers, setCustomers] = useState(1842);
  const [revenue, setRevenue] = useState(127430);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/adminlogin");
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>NovaDrive</h2>
        <ul>
          <li className="active" onClick={() => navigate("/admindashboard")}>
            Dashboard
          </li>
          <li onClick={() => navigate("/admin/vehiclemanagement")}>Vehicles</li>
          <li onClick={() => navigate("/admin/bookings")}>Bookings</li>
          <li onClick={() => navigate("/admin/customers")}>Customers</li>
          <li onClick={handleLogout} className="logout">
            Logout
          </li>
        </ul>
      </aside>

      <main className="dashboard">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="user-profile">
            <span className="avatar">Admin User</span>
          </div>
        </header>

        <section className="stats">
          <div className="stat-box">
            <h3>Total Vehicles</h3>
            <p>{vehicles}</p>
            <FaCar className="stat-icon" />
            <span className="stat-growth">+12 from last month</span>
          </div>
          <div className="stat-box">
            <h3>Active Bookings</h3>
            <p>{bookings}</p>
            <FaCalendarCheck className="stat-icon" />
            <span className="stat-growth">+8 from last month</span>
          </div>
          <div className="stat-box">
            <h3>Total Customers</h3>
            <p>{customers.toLocaleString()}</p>
            <FaUsers className="stat-icon" />
            <span className="stat-growth">+134 from last month</span>
          </div>
          <div className="stat-box">
            <h3>Monthly Revenue</h3>
            <p>${revenue.toLocaleString()}</p>
            <FaDollarSign className="stat-icon" />
            <span className="stat-growth green">+15.3% from last month</span>
          </div>
        </section>

        <section className="charts">
          <div className="revenue-trend">
            <h4>Revenue Trend</h4>
            <div className="chart-placeholder">Jan Feb Mar Apr May Jun</div>
          </div>
          <div className="fleet-utilization">
            <h4>Fleet Utilization</h4>
            <ul>
              <li>
                <span className="dot rented"></span>Rented 68%
              </li>
              <li>
                <span className="dot available"></span>Available 25%
              </li>
              <li>
                <span className="dot maintenance"></span>Maintenance 7%
              </li>
            </ul>
          </div>
        </section>

        <section className="bottom-section">
          <div className="recent-bookings">
            <h4>Recent Bookings</h4>
            <ul>
              <li>
                <strong>John Smith</strong> - BMW 320i{" "}
                <span className="status active">2025-01-15</span>
              </li>
              <li>
                <strong>Sarah Johnson</strong> - Toyota Camry{" "}
                <span className="status completed">2025-01-14</span>
              </li>
              <li>
                <strong>Mike Brown</strong> - Mercedes C-Class{" "}
                <span className="status pending">2025-01-13</span>
              </li>
              <li>
                <strong>Lisa Davis</strong> - Honda Civic{" "}
                <span className="status completed">2025-01-12</span>
              </li>
            </ul>
          </div>
          <div className="maintenance-alerts">
            <h4>Maintenance Alerts</h4>
            <ul>
              <li>
                <strong>BMW 320i - ABC123</strong>{" "}
                <span className="level medium">Oil Change Due</span>
              </li>
              <li>
                <strong>Toyota Camry - XYZ789</strong>{" "}
                <span className="level high">Tire Replacement</span>
              </li>
              <li>
                <strong>Honda Civic - DEF456</strong>{" "}
                <span className="level low">Brake Inspection</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
