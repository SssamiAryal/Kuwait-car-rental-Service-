const express = require("express");
const router = express.Router();
const {
  addVehicle,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), addVehicle);
router.get("/", getAllVehicles);
router.put("/:id", upload.single("image"), updateVehicle);
router.delete("/:id", deleteVehicle);

module.exports = router;
