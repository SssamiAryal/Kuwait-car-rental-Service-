const Vehicle = require("../models/vehicleModel");

const addVehicle = async (req, res) => {
  const { name, brand, price, seats, fuel, transmission, rating, description } =
    req.body;
  const image_url = req.file ? req.file.filename : null;
  const vehicle = await Vehicle.create({
    name,
    brand,
    price,
    seats,
    fuel,
    transmission,
    rating,
    image_url,
    description,
  });
  res.status(201).json(vehicle);
};

const getAllVehicles = async (req, res) => {
  const vehicles = await Vehicle.findAll({ order: [["id", "DESC"]] });
  res.json(vehicles);
};

const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { name, brand, price, seats, fuel, transmission, rating, description } =
    req.body;
  const image_url = req.file ? req.file.filename : null;

  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await vehicle.update({
      name,
      brand,
      price,
      seats,
      fuel,
      transmission,
      rating,
      description,
      ...(image_url && { image_url }),
    });

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Failed to update vehicle" });
  }
};

const deleteVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await vehicle.destroy();
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete vehicle" });
  }
};

module.exports = {
  addVehicle,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
};
