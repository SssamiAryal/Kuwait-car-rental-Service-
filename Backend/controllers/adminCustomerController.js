const User = require("../models/User");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.findAll({ order: [["createdAt", "DESC"]] });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
};
