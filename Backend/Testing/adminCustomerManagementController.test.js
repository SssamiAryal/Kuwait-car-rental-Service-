const adminCustomerController = require("../controllers/adminCustomerController");
const User = require("../models/User");

jest.mock("../models/User", () => ({
  findAll: jest.fn(),
  destroy: jest.fn(),
}));

describe("Admin Customer Management Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe("getAllCustomers", () => {
    it("should return all customers with status 200", async () => {
      const req = {};
      const res = mockResponse();
      const fakeCustomers = [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ];

      User.findAll.mockResolvedValue(fakeCustomers);

      await adminCustomerController.getAllCustomers(req, res);

      expect(User.findAll).toHaveBeenCalledWith({
        order: [["createdAt", "DESC"]],
      });
      expect(res.json).toHaveBeenCalledWith(fakeCustomers);
    });

    it("should return 500 if there is an error", async () => {
      const req = {};
      const res = mockResponse();

      User.findAll.mockRejectedValue(new Error("DB error"));

      await adminCustomerController.getAllCustomers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch customers",
      });
    });
  });

  describe("deleteCustomer", () => {
    it("should delete a customer and return success message", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();

      User.destroy.mockResolvedValue(1); // 1 row deleted

      await adminCustomerController.deleteCustomer(req, res);

      expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.json).toHaveBeenCalledWith({
        message: "Customer deleted successfully",
      });
    });

    it("should return 404 if customer not found", async () => {
      const req = { params: { id: 999 } };
      const res = mockResponse();

      User.destroy.mockResolvedValue(0);

      await adminCustomerController.deleteCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Customer not found" });
    });

    it("should return 500 if there is an error", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();

      User.destroy.mockRejectedValue(new Error("DB error"));

      await adminCustomerController.deleteCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to delete customer",
      });
    });
  });
});
