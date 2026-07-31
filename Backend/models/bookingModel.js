const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  pickup_location: { type: DataTypes.STRING, allowNull: false },
  dropoff_location: { type: DataTypes.STRING, allowNull: false },
  pickup_date: { type: DataTypes.DATEONLY, allowNull: false },
  return_date: { type: DataTypes.DATEONLY, allowNull: false },
  car_id: { type: DataTypes.INTEGER, allowNull: false },
  car_name: { type: DataTypes.STRING, allowNull: true },
});

module.exports = Booking;
