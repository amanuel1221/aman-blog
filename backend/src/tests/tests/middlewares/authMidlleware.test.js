import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Types } from "mongoose";


vi.mock("mongoose", async () => {
  const actual = await vi.importActual("mongoose");
  return {
    ...actual,
    model: vi.fn().mockImplementation((name, schema) => {
      const mockModel = vi.fn();
      mockModel.findById = vi.fn();
      mockModel.findOne = vi.fn();
      mockModel.create = vi.fn();
      mockModel.findByIdAndUpdate = vi.fn();
      mockModel.findByIdAndDelete = vi.fn();
      mockModel.save = vi.fn();
      return mockModel;
    }),
  };
});

vi.mock("jsonwebtoken", () => ({
  verify: vi.fn(),
  default: {
    verify: vi.fn(),
  },
}));


vi.mock("../../../models/User.js", () => {
  return {
    findById: vi.fn(),
  };
});


import jwt from "jsonwebtoken";
import * as User from "../../../models/User.js";
import { protect, adminOnly } from "../../../middlewares/authMiddlewares.js";

describe("Auth Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      cookies: {},
      user: null,
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();

    vi.clearAllMocks();

    process.env.JWT_SECRET = "test_secret";

    jwt.verify = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });


  describe("protect middleware", () => {
    it("should return 401 if no token is provided", async () => {

      req.cookies.token = undefined;

      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Not authorized. Please login.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 if token is empty string", async () => {

      req.cookies.token = "";


      await protect(req, res, next);


      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Not authorized. Please login.",
      });
      expect(next).not.toHaveBeenCalled();

    });



    it("should handle missing JWT_SECRET environment variable", async () => {

      delete process.env.JWT_SECRET;
      req.cookies.token = "validToken";

      jwt.verify.mockImplementation(() => {
        throw new Error("secret or public key must be provided");
      });


      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid or expired token.",
      });
      expect(next).not.toHaveBeenCalled();

      process.env.JWT_SECRET = "test_secret";
    });
  });


  describe("adminOnly middleware", () => {
    it("should return 401 if no user in request", () => {

      req.user = undefined;
      adminOnly(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Not authenticated.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 if user is null", () => {

      req.user = null;

      adminOnly(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Not authenticated.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 403 if user is not admin", () => {

      req.user = {
        _id: new Types.ObjectId().toString(),
        name: "Regular User",
        role: "user",
      };


      adminOnly(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Admin access required.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 403 if user has no role property", () => {

      req.user = {
        _id: new Types.ObjectId().toString(),
        name: "User Without Role",
      };

      adminOnly(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Admin access required.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 403 if user role is not exactly 'admin'", () => {

      req.user = {
        _id: new Types.ObjectId().toString(),
        name: "Super User",
        role: "superadmin",
      };


      adminOnly(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Admin access required.",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next if user is admin", () => {

      req.user = {
        _id: new Types.ObjectId().toString(),
        name: "Admin User",
        role: "admin",
      };

      adminOnly(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should handle admin user with additional properties", () => {

      req.user = {
        _id: new Types.ObjectId().toString(),
        name: "Super Admin",
        email: "admin@example.com",
        role: "admin",
        createdAt: new Date(),
      };
      adminOnly(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should handle user object with role as admin (case sensitive)", () => {

      req.user = {
        _id: new Types.ObjectId().toString(),
        name: "Admin User",
        role: "Admin",
      };

      adminOnly(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Admin access required.",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

});