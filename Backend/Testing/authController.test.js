const authController = require("../controllers/authController");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../models/User");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Auth Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "pass123",
        },
      };
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedPass");
      User.create.mockResolvedValue({
        id: 1,
        ...req.body,
        password: "hashedPass",
      });

      await authController.register(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith("pass123", 10);
      expect(User.create).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        password: "hashedPass",
      });
      expect(res.json).toHaveBeenCalledWith({ message: "User registered" });
    });

    it("should return 400 if email already exists", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "pass123",
        },
      };
      const res = mockResponse();

      User.findOne.mockResolvedValue({ id: 1, email: "test@example.com" });

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email already in use",
      });
    });

    it("should return 500 on server error", async () => {
      const req = {
        body: { name: "Test", email: "test@example.com", password: "pass" },
      };
      const res = mockResponse();

      User.findOne.mockRejectedValue(new Error("DB error"));

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
    });
  });

  describe("login", () => {
    it("should login user and return token", async () => {
      const req = { body: { email: "test@example.com", password: "pass123" } };
      const res = mockResponse();
      const user = {
        id: 1,
        email: "test@example.com",
        password: "hashedPass",
        name: "Test User",
      };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token123");

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith("pass123", "hashedPass");
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 1, email: "test@example.com" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      expect(res.json).toHaveBeenCalledWith({
        token: "token123",
        user: { id: 1, name: "Test User", email: "test@example.com" },
      });
    });

    it("should return 400 for invalid email", async () => {
      const req = { body: { email: "wrong@example.com", password: "pass" } };
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it("should return 400 for wrong password", async () => {
      const req = {
        body: { email: "test@example.com", password: "wrongpass" },
      };
      const res = mockResponse();
      const user = { password: "hashedPass" };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it("should return 500 on server error", async () => {
      const req = { body: { email: "test@example.com", password: "pass" } };
      const res = mockResponse();

      User.findOne.mockRejectedValue(new Error("DB error"));

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
    });
  });
});
