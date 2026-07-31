const express = require("express");
const request = require("supertest");
const router = require("../routes/vehicleRoutes");
const vehicleController = require("../controllers/vehicleController");
const upload = require("../middleware/upload");

jest.mock("../controllers/vehicleController");
jest.mock("../middleware/upload", () => ({
  single: jest.fn(() => (req, res, next) => next()),
}));

const app = express();
app.use(express.json());
app.use("/api/vehicles", router);

describe("Vehicle Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/vehicles calls addVehicle", async () => {
    vehicleController.addVehicle.mockImplementation((req, res) =>
      res.status(201).json({ id: 1, name: "Toyota Camry" })
    );

    const res = await request(app)
      .post("/api/vehicles")
      .field("name", "Toyota Camry")
      .field("brand", "Toyota")
      .field("price", 100)
      .field("seats", 5)
      .field("fuel", "Petrol")
      .field("transmission", "Automatic")
      .field("rating", 4.5)
      .field("description", "Comfortable sedan")
      .attach("image", Buffer.from("fake image"), "car.jpg");

    expect(vehicleController.addVehicle).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id", 1);
  });

  test("GET /api/vehicles calls getAllVehicles", async () => {
    vehicleController.getAllVehicles.mockImplementation((req, res) =>
      res.json([{ id: 1, name: "Toyota Camry" }])
    );

    const res = await request(app).get("/api/vehicles");

    expect(vehicleController.getAllVehicles).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 1 })])
    );
  });

  test("PUT /api/vehicles/:id calls updateVehicle", async () => {
    vehicleController.updateVehicle.mockImplementation((req, res) =>
      res.json({ id: 1, name: "Updated Car" })
    );

    const res = await request(app)
      .put("/api/vehicles/1")
      .field("name", "Updated Car")
      .attach("image", Buffer.from("fake image"), "newcar.jpg");

    expect(vehicleController.updateVehicle).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  test("DELETE /api/vehicles/:id calls deleteVehicle", async () => {
    vehicleController.deleteVehicle.mockImplementation((req, res) =>
      res.json({ message: "Vehicle deleted successfully" })
    );

    const res = await request(app).delete("/api/vehicles/1");

    expect(vehicleController.deleteVehicle).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Vehicle deleted successfully" });
  });
});
