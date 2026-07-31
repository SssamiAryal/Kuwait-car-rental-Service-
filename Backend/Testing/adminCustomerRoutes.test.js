const express = require("express");
const request = require("supertest");
const router = require("../routes/adminCustomerRoutes");
const controller = require("../controllers/adminCustomerController");

jest.mock("../controllers/adminCustomerController");

const app = express();
app.use(express.json());
app.use("/api/admin", router);

describe("adminCustomerRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/admin/customers calls getAllCustomers controller", async () => {
    controller.getAllCustomers.mockImplementation((req, res) =>
      res.status(200).json({ success: true, data: [] })
    );

    const res = await request(app).get("/api/admin/customers");

    expect(controller.getAllCustomers).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, data: [] });
  });

  test("DELETE /api/admin/customers/:id calls deleteCustomer controller", async () => {
    controller.deleteCustomer.mockImplementation((req, res) =>
      res.status(200).json({ success: true, message: "Deleted" })
    );

    const res = await request(app).delete("/api/admin/customers/1");

    expect(controller.deleteCustomer).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, message: "Deleted" });
  });
});
