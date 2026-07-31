const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminBookingManagementController");

router.get("/bookings", controller.getAllBookings);
router.delete("/bookings/:id", controller.deleteBooking);

module.exports = router;
