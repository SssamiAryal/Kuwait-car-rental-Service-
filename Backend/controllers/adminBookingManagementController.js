const Booking = require("../models/bookingModel");

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [["createdAt", "DESC"]] });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Booking.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Booking deleted successfully" });
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
};
