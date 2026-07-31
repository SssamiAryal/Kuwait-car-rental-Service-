require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/Booking");
const vehicleRoutes = require("./routes/vehicleRoutes");
const adminBookingManagementRoutes = require("./routes/adminBookingManagementRoutes");
const adminCustomerRoutes = require("./routes/adminCustomerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/admin", adminBookingManagementRoutes);
app.use("/api/admin", adminCustomerRoutes);

app.get("/", (req, res) => {
  res.send("Car Rental Backend Running");
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });