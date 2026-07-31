const express = require("express");
const request = require("supertest");
const router = require("../routes/authRoutes");
const authController = require("../controllers/authController");

jest.mock("../controllers/authController");

const app = express();
app.use(express.json());
app.use("/api/auth", router);

describe("authRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/auth/register calls register controller", async () => {
    authController.register.mockImplementation((req, res) =>
      res.status(201).json({ message: "User registered" })
    );

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(authController.register).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ message: "User registered" });
  });

  test("POST /api/auth/login calls login controller", async () => {
    authController.login.mockImplementation((req, res) =>
      res.status(200).json({
        token: "fakeToken",
        user: { id: 1, email: "test@example.com" },
      })
    );

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(authController.login).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("test@example.com");
  });
});
