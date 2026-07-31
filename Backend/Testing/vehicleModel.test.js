const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const VehicleMock = dbMock.define("Vehicle", {
  id: 1,
  name: "Toyota Camry",
  brand: "Toyota",
  price: 25000.5,
  seats: 5,
  fuel: "Petrol",
  transmission: "Automatic",
  rating: 4.7,
  image_url: "car.jpg",
  description: "A comfortable mid-size sedan",
});

describe("Vehicle Model", () => {
  it("should create a vehicle with all properties", async () => {
    const vehicle = await VehicleMock.create({
      name: "Honda Civic",
      brand: "Honda",
      price: 22000,
      seats: 5,
      fuel: "Petrol",
      transmission: "Manual",
      rating: 4.5,
      image_url: "civic.jpg",
      description: "Reliable compact car",
    });

    expect(vehicle.name).toBe("Honda Civic");
    expect(vehicle.brand).toBe("Honda");
    expect(vehicle.price).toBe(22000);
    expect(vehicle.seats).toBe(5);
    expect(vehicle.fuel).toBe("Petrol");
    expect(vehicle.transmission).toBe("Manual");
    expect(vehicle.rating).toBe(4.5);
    expect(vehicle.image_url).toBe("civic.jpg");
    expect(vehicle.description).toBe("Reliable compact car");
  });
});
