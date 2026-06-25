import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const authService = require("../../../services/authServices");

const {
  register,
  login,
  logout,
  getProfile,
  getMe,
} = require("../../../controllers/authControllers");

describe("Auth Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      user: {},
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      cookie: vi.fn(),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("register", () => {
    it("should register a user", async () => {
      const result = {
        token: "jwt-token",
        user: {
          _id: "1",
          name: "John",
          email: "john@example.com",
        },
      };

      req.body = {
        name: "John",
        email: "john@example.com",
        password: "password123",
      };

      vi.spyOn(authService, "registerUser")
        .mockResolvedValue(result);

      await register(req, res);

      expect(authService.registerUser)
        .toHaveBeenCalledWith(req.body);

      expect(res.cookie)
        .toHaveBeenCalled();

      expect(res.status)
        .toHaveBeenCalledWith(201);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          message: "User registered successfully",
          user: result.user,
        });
    });

    it("should return 400 when registration fails", async () => {
      vi.spyOn(authService, "registerUser")
        .mockRejectedValue(
          new Error("Email already exists")
        );

      await register(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(400);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: false,
          message: "Email already exists",
        });
    });
  });

  describe("login", () => {
    it("should login user successfully", async () => {
      const result = {
        token: "jwt-token",
        user: {
          _id: "1",
          email: "john@example.com",
        },
      };

      req.body = {
        email: "john@example.com",
        password: "password123",
      };

      vi.spyOn(authService, "loginUser")
        .mockResolvedValue(result);

      await login(req, res);

      expect(authService.loginUser)
        .toHaveBeenCalledWith(
          "john@example.com",
          "password123"
        );

      expect(res.cookie)
        .toHaveBeenCalled();

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          message: "Login successful",
          user: result.user,
        });
    });

    it("should return 401 when login fails", async () => {
      req.body = {
        email: "john@example.com",
        password: "wrong-password",
      };

      vi.spyOn(authService, "loginUser")
        .mockRejectedValue(
          new Error("Invalid credentials")
        );

      await login(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(401);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: false,
          message: "Invalid credentials",
        });
    });
  });

  describe("logout", () => {
    it("should logout user successfully", async () => {
      await logout(req, res);

      expect(res.cookie)
        .toHaveBeenCalled();

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          message: "Logged out successfully",
        });
    });
  });

  describe("getProfile", () => {
    it("should return user profile", async () => {
      const user = {
        _id: "1",
        name: "John",
      };

      req.user = {
        _id: "1",
      };

      vi.spyOn(authService, "getProfile")
        .mockResolvedValue(user);

      await getProfile(req, res);

      expect(authService.getProfile)
        .toHaveBeenCalledWith("1");

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          user,
        });
    });

    it("should return 404 if profile not found", async () => {
      req.user = {
        _id: "1",
      };

      vi.spyOn(authService, "getProfile")
        .mockRejectedValue(
          new Error("User not found")
        );

      await getProfile(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(404);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: false,
          message: "User not found",
        });
    });
  });

  describe("getMe", () => {
    it("should return current authenticated user", async () => {
      req.user = {
        _id: "1",
        name: "John",
        email: "john@example.com",
      };

      await getMe(req, res);

      expect(res.status)
        .toHaveBeenCalledWith(200);

      expect(res.json)
        .toHaveBeenCalledWith({
          success: true,
          user: req.user,
        });
    });
  });
});