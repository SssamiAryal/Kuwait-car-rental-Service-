import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaCar,
  FaCalendarCheck,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Styles/VehicleManagement.css";
import AddVehicle from "./AddVehicle";
import EditVehicle from "./EditVehicle";

function VehicleManagement() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isEditVehicleOpen, setIsEditVehicleOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/vehicle");
        const data = await res.json();
        setVehicles(data);
      } catch (err) {}
    };

    fetchVehicles();
  }, []);

  const handleAddVehicle = (newVehicle) => {
    setVehicles((prev) => [...prev, newVehicle]);
  };

  const handleUpdateVehicle = (updatedVehicle) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
    );
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?"))
      return;

    try {
      const res = await fetch(`http://localhost:5000/api/vehicle/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setVehicles((prev) => prev.filter((v) => v.id !== id));
        alert("Vehicle deleted successfully");
      } else {
        alert("Failed to delete vehicle");
      }
    } catch {
      alert("Failed to delete vehicle");
    }
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

          <li
            className="active"
            onClick={() => navigate("/admin/vehiclemanagement")}
          >
            <FaCar /> Vehicles
          </li>

          <li onClick={() => navigate("/admin/bookings")}>
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
        <div className="vehicle-wrapper">
          <div className="vehicle-header">
            <h2>Vehicle Fleet Management</h2>

            <button
              className="add-button"
              onClick={() => setIsAddVehicleOpen(true)}
            >
              <FaPlus /> Add Vehicle
            </button>
          </div>

          <table className="vehicle-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Seats</th>
                <th>Fuel</th>
                <th>Transmission</th>
                <th>Rating</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No vehicles added yet.
                  </td>
                </tr>
              ) : (
                vehicles.map((v) => (
                  <tr key={v.id}>
                    <td>{v.name}</td>
                    <td>{v.brand}</td>
                    <td>{v.price}</td>
                    <td>{v.seats}</td>
                    <td>{v.fuel}</td>
                    <td>{v.transmission}</td>
                    <td>{v.rating}</td>
                    <td>{v.description}</td>

                    <td className="actions">
                      <FaEye />

                      <FaEdit
                        onClick={() => {
                          setSelectedVehicle(v);
                          setIsEditVehicleOpen(true);
                        }}
                      />

                      <FaTrash
                        onClick={() => handleDeleteVehicle(v.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {isAddVehicleOpen && (
            <AddVehicle
              isOpen={isAddVehicleOpen}
              onClose={() => setIsAddVehicleOpen(false)}
              onAdd={(vehicle) => {
                handleAddVehicle(vehicle);
                setIsAddVehicleOpen(false);
              }}
            />
          )}

          {isEditVehicleOpen && selectedVehicle && (
            <EditVehicle
              isOpen={isEditVehicleOpen}
              vehicle={selectedVehicle}
              onClose={() => setIsEditVehicleOpen(false)}
              onUpdate={(updated) => {
                handleUpdateVehicle(updated);
                setIsEditVehicleOpen(false);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default VehicleManagement;