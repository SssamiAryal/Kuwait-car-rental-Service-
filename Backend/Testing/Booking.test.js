const express = require("express");
const request = require("supertest");
const router = require("../routes/Booking");
const bookingController = require("../controllers/bookingController");

jest.mock("../controllers/bookingController");

const app = express();
app.use(express.json());
app.use("/api/booking", router);

describe("Booking Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/booking/book calls bookCar controller", async () => {
    bookingController.bookCar.mockImplementation((req, res) =>
      res.status(201).json({ success: true, data: { id: 1, car_id: 2 } })
    );

    const res = await request(app).post("/api/booking/book").send({
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      pickup_location: "Location A",
      dropoff_location: "Location B",
      pickup_date: "2025-08-01",
      return_date: "2025-08-05",
      car_id: 2,
    });

    expect(bookingController.bookCar).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.car_id).toBe(2);
  });
});
