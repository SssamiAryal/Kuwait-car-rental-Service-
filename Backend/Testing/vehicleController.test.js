const vehicleController = require("../controllers/vehicleController");
const Vehicle = require("../models/vehicleModel");

jest.mock("../models/vehicleModel");

describe("Vehicle Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addVehicle", () => {
    it("should add a new vehicle and return it", async () => {
      const req = {
        body: {
          name: "Toyota Camry",
          brand: "Toyota",
          price: 100,
          seats: 5,
          fuel: "Petrol",
          transmission: "Automatic",
          rating: 4.5,
          description: "Comfortable sedan",
        },
        file: { filename: "car.jpg" },
      };
      const res = mockResponse();

      Vehicle.create.mockResolvedValue({
        id: 1,
        ...req.body,
        image_url: "car.jpg",
      });

      await vehicleController.addVehicle(req, res);

      expect(Vehicle.create).toHaveBeenCalledWith({
        ...req.body,
        image_url: "car.jpg",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    });
  });

  describe("getAllVehicles", () => {
    it("should return list of vehicles", async () => {
      const req = {};
      const res = mockResponse();

      Vehicle.findAll.mockResolvedValue([{ id: 1, name: "Toyota Camry" }]);

      await vehicleController.getAllVehicles(req, res);

      expect(Vehicle.findAll).toHaveBeenCalledWith({ order: [["id", "DESC"]] });
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ id: 1 })])
      );
    });
  });

  describe("updateVehicle", () => {
    it("should update vehicle if found", async () => {
      const req = {
        params: { id: 1 },
        body: {
          name: "Updated Car",
          brand: "Updated Brand",
          price: 150,
          seats: 4,
          fuel: "Diesel",
          transmission: "Manual",
          rating: 4.7,
          description: "Updated desc",
        },
        file: { filename: "newcar.jpg" },
      };
      const res = mockResponse();

      const vehicleInstance = {
        update: jest.fn().mockResolvedValue(true),
      };

      Vehicle.findByPk.mockResolvedValue(vehicleInstance);

      await vehicleController.updateVehicle(req, res);

      expect(Vehicle.findByPk).toHaveBeenCalledWith(1);
      expect(vehicleInstance.update).toHaveBeenCalledWith({
        ...req.body,
        image_url: "newcar.jpg",
      });
      expect(res.json).toHaveBeenCalledWith(vehicleInstance);
    });

    it("should return 404 if vehicle not found", async () => {
      const req = { params: { id: 999 }, body: {}, file: null };
      const res = mockResponse();

      Vehicle.findByPk.mockResolvedValue(null);

      await vehicleController.updateVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Vehicle not found" });
    });

    it("should return 500 on error", async () => {
      const req = { params: { id: 1 }, body: {}, file: null };
      const res = mockResponse();

      Vehicle.findByPk.mockRejectedValue(new Error("DB error"));

      await vehicleController.updateVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to update vehicle",
      });
    });
  });

  describe("deleteVehicle", () => {
    it("should delete vehicle if found", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();

      const vehicleInstance = { destroy: jest.fn().mockResolvedValue(true) };

      Vehicle.findByPk.mockResolvedValue(vehicleInstance);

      await vehicleController.deleteVehicle(req, res);

      expect(Vehicle.findByPk).toHaveBeenCalledWith(1);
      expect(vehicleInstance.destroy).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: "Vehicle deleted successfully",
      });
    });

    it("should return 404 if vehicle not found", async () => {
      const req = { params: { id: 999 } };
      const res = mockResponse();

      Vehicle.findByPk.mockResolvedValue(null);

      await vehicleController.deleteVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Vehicle not found" });
    });

    it("should return 500 on error", async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();

      Vehicle.findByPk.mockRejectedValue(new Error("DB error"));

      await vehicleController.deleteVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to delete vehicle",
      });
    });
  });
});
