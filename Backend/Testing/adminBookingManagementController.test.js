const adminBookingController = require("../controllers/adminBookingManagementController");
const Booking = require("../models/bookingModel");

jest.mock("../models/bookingModel", () => ({
  findAll: jest.fn(),
  destroy: jest.fn(),
}));

describe("Admin Booking Management Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe("getAllBookings", () => {
    it("should return all bookings with status 200", async () => {
      const req = {};
      const res = mockResponse();
      const fakeBookings = [
        { id: 1, userId: 1 },
        { id: 2, userId: 2 },
      ];

      Booking.findAll.mockResolvedValue(fakeBookings);

      await adminBookingController.getAllBookings(req, res);

      expect(Booking.findAll).toHaveBeenCalledWith({
        order: [["createdAt", "DESC"]],
      });
      expect(res.json).toHaveBeenCalledWith(fakeBookings);
    });

    it("should return 500 if there is an error", async () => {
      const req = {};
      const res = mockResponse();

      Booking.findAll.mockRejectedValue(new Error("DB error"));

      await adminBookingController.getAllBookings(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch bookings",
      });
    });
  });

  describe("deleteBooking", () => {
    it("should delete a booking and return success message", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();

      Booking.destroy.mockResolvedValue(1); // 1 row deleted

      await adminBookingController.deleteBooking(req, res);

      expect(Booking.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.json).toHaveBeenCalledWith({
        message: "Booking deleted successfully",
      });
    });

    it("should return 404 if booking not found", async () => {
      const req = { params: { id: 999 } };
      const res = mockResponse();

      Booking.destroy.mockResolvedValue(0);

      await adminBookingController.deleteBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Booking not found" });
    });

    it("should return 500 if there is an error", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();

      Booking.destroy.mockRejectedValue(new Error("DB error"));

      await adminBookingController.deleteBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to delete booking",
      });
    });
  });
});
