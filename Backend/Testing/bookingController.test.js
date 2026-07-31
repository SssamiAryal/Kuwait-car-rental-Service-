const bookingController = require("../controllers/bookingController");
const Booking = require("../models/bookingModel");
const Vehicle = require("../models/vehicleModel");

jest.mock("../models/bookingModel");
jest.mock("../models/vehicleModel");

describe("Booking Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("bookCar", () => {
    it("should create a new booking when car exists", async () => {
      const req = {
        body: {
          name: "John Doe",
          email: "john@example.com",
          phone: "1234567890",
          pickup_location: "Location A",
          dropoff_location: "Location B",
          pickup_date: "2025-08-01",
          return_date: "2025-08-05",
          car_id: 1,
        },
      };
      const res = mockResponse();

      // Mock Vehicle.findByPk to return a car object
      Vehicle.findByPk.mockResolvedValue({ id: 1, name: "Toyota Corolla" });

      // Mock Booking.create to return booking data
      Booking.create.mockResolvedValue({
        id: 1,
        ...req.body,
        car_name: "Toyota Corolla",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await bookingController.bookCar(req, res);

      expect(Vehicle.findByPk).toHaveBeenCalledWith(1);
      expect(Booking.create).toHaveBeenCalledWith(
        expect.objectContaining({
          car_name: "Toyota Corolla",
          car_id: 1,
          email: "john@example.com",
        })
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.any(Object),
        })
      );
    });

    it("should return 404 if car not found", async () => {
      const req = {
        body: {
          car_id: 999,
        },
      };
      const res = mockResponse();

      Vehicle.findByPk.mockResolvedValue(null);

      await bookingController.bookCar(req, res);

      expect(Vehicle.findByPk).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Car not found",
      });
    });

    it("should return 500 on server error", async () => {
      const req = {
        body: {
          car_id: 1,
        },
      };
      const res = mockResponse();

      Vehicle.findByPk.mockRejectedValue(new Error("DB error"));

      await bookingController.bookCar(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: expect.any(String),
        })
      );
    });
  });
});
