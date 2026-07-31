const express = require("express");
const request = require("supertest");
const router = require("../routes/adminBookingManagementRoutes");
const controller = require("../controllers/adminBookingManagementController");

jest.mock("../controllers/adminBookingManagementController");

const app = express();
app.use(express.json());
app.use("/api/admin", router);

describe("adminBookingManagementRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/admin/bookings calls getAllBookings controller", async () => {
    controller.getAllBookings.mockImplementation((req, res) =>
      res.status(200).json({ success: true, data: [] })
    );

    const res = await request(app).get("/api/admin/bookings");

    expect(controller.getAllBookings).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, data: [] });
  });

  test("DELETE /api/admin/bookings/:id calls deleteBooking controller", async () => {
    controller.deleteBooking.mockImplementation((req, res) =>
      res.status(200).json({ success: true, message: "Deleted" })
    );

    const res = await request(app).delete("/api/admin/bookings/1");

    expect(controller.deleteBooking).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, message: "Deleted" });
  });
});
