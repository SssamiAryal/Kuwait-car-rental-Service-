import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Landingpage from "./Pages/Public/Landingpage";
import Loginpage from "./Pages/Public/Loginpage";
import Registerpage from "./Pages/Public/Registerpage";
import Forgetpassword from "./Pages/Public/Forgetpassword";
import Cars from "./Pages/Public/Cars";
import About from "./Pages/Public/About";
import Contact from "./Pages/Public/Contact";

import Dashboard from "./Pages/Private/Dashboard";
import PrivCars from "./Pages/Private/PrivCars";
import PrivAbout from "./Pages/Private/PrivAbout";
import PrivContact from "./Pages/Private/PrivContact";
import BookCar from "./Pages/Private/BookCar";

import AdminLogin from "./Pages/admin/Adminlogin";
import AdminDashboard from "./Pages/admin/Admindashboard";
import VehicleManagement from "./Pages/admin/Vehiclemanagement";
import BookingManagement from "./Pages/admin/Bookingmanagement";
import Customermanagement from "./Pages/admin/Customermanagement";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const LoginWrapper = () => (
    <Loginpage
      onLogin={() => {
        setIsLoggedIn(true);
        navigate("/dashboard");
      }}
      onBack={() => navigate("/")}
      onRegisterClick={() => navigate("/register")}
      onForgetClick={() => navigate("/forgetpassword")}
    />
  );

  const RegisterWrapper = () => (
    <Registerpage onBack={() => navigate("/login")} />
  );

  const ForgetWrapper = () => (
    <Forgetpassword onBack={() => navigate("/login")} />
  );

  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/cars" element={<Cars isLoggedIn={isLoggedIn} />} />
      <Route path="/login" element={<LoginWrapper />} />
      <Route path="/register" element={<RegisterWrapper />} />
      <Route path="/forgetpassword" element={<ForgetWrapper />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/admin/vehiclemanagement" element={<VehicleManagement />} />
      <Route path="/admin/bookings" element={<BookingManagement />} />
      <Route path="/admin/customers" element={<Customermanagement />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/cars"
        element={
          <PrivateRoute>
            <PrivCars />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/about"
        element={
          <PrivateRoute>
            <PrivAbout />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/contact"
        element={
          <PrivateRoute>
            <PrivContact />
          </PrivateRoute>
        }
      />
      <Route
        path="/book/:carId"
        element={
          <PrivateRoute>
            <BookCar />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
