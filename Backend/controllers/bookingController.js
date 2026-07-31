const Booking = require("../models/bookingModel");
const Vehicle = require("../models/vehicleModel");

exports.bookCar = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      pickup_location,
      dropoff_location,
      pickup_date,
      return_date,
      car_id,
    } = req.body;

    const bookedCar = await Vehicle.findByPk(car_id);

    if (!bookedCar) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    const newBooking = await Booking.create({
      name,
      email,
      phone,
      pickup_location,
      dropoff_location,
      pickup_date,
      return_date,
      car_id,
      car_name: bookedCar.name, // Save car name here
    });

    res.status(201).json({
      success: true,
      data: newBooking,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
