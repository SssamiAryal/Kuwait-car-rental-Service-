const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vehicle = sequelize.define("Vehicle", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  brand: DataTypes.STRING,
  price: DataTypes.FLOAT,
  seats: DataTypes.INTEGER,
  fuel: DataTypes.STRING,
  transmission: DataTypes.STRING,
  rating: DataTypes.FLOAT,
  image_url: DataTypes.STRING,
  description: DataTypes.TEXT,
});

module.exports = Vehicle;
