const express = require("express");
const router = express.Router();
const { bookCar } = require("../controllers/bookingController");

router.post("/book", bookCar);

module.exports = router;
