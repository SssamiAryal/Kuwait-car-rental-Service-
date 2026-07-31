const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const BookingMock = dbMock.define("Booking", {
  name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  pickup_location: "Location A",
  dropoff_location: "Location B",
  pickup_date: "2025-07-30",
  return_date: "2025-08-05",
  car_id: 1,
  car_name: "Toyota Camry",
});

describe("Booking Model", () => {
  it("should create a booking with all required fields", async () => {
    const booking = await BookingMock.create({
      name: "Alice",
      email: "alice@example.com",
      phone: "0987654321",
      pickup_location: "Loc 1",
      dropoff_location: "Loc 2",
      pickup_date: "2025-08-01",
      return_date: "2025-08-10",
      car_id: 2,
      car_name: "Honda Civic",
    });

    expect(booking.name).toBe("Alice");
    expect(booking.email).toBe("alice@example.com");
    expect(booking.car_name).toBe("Honda Civic");
  });

  it("should throw error if required fields are missing", async () => {});
});
