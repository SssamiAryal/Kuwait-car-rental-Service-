const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminCustomerController");

router.get("/customers", controller.getAllCustomers);
router.delete("/customers/:id", controller.deleteCustomer);

module.exports = router;
