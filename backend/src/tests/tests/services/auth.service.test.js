import { describe, it, expect, vi, afterEach } from "vitest";

const User = require("../../../models/User");
const bcrypt = require("bcryptjs");

const {
  registerUser,
  loginUser,
} = require("../../../services/authServices");

describe("Auth Service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("registerUser", () => {
    it("should register user successfully", async () => {
      vi.spyOn(User, "findOne").mockResolvedValue(null);

      vi.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");

      vi.spyOn(bcrypt, "hash").mockResolvedValue(
        "hashedPassword"
      );

      vi.spyOn(User, "create").mockResolvedValue({
        _id: "123",
        name: "John",
        email: "john@example.com",
        role: "user",
      });

      const result = await registerUser({
        name: "John",
        email: "john@example.com",
        password: "Password123!"
      });

      expect(User.findOne).toHaveBeenCalledWith({
        email: "john@example.com",
      });

      expect(User.create).toHaveBeenCalled();

      expect(result.user.name).toBe("John");
      expect(result.user.email).toBe(
        "john@example.com"
      );

      expect(result.token).toBeDefined();
    });

    it("should throw if user already exists", async () => {
      vi.spyOn(User, "findOne").mockResolvedValue({
        _id: "123",
      });

      await expect(
        registerUser({
          name: "John",
          email: "john@example.com",
          password: "Password123!"
        })
      ).rejects.toThrow("User already exists");
    });
  });

  describe("loginUser", () => {
    it("should login successfully", async () => {
      const selectMock = vi.fn().mockResolvedValue({
        _id: "123",
        name: "John",
        email: "john@example.com",
        password: "hashedPassword",
        role: "user",
      });

      vi.spyOn(User, "findOne").mockReturnValue({
        select: selectMock,
      });

      vi.spyOn(bcrypt, "compare").mockResolvedValue(
        true
      );

      const result = await loginUser(
        "john@example.com",
        "password123"
      );

      expect(result.user.email).toBe(
        "john@example.com"
      );

      expect(result.token).toBeDefined();
    });

    it("should throw if user not found", async () => {
      const selectMock = vi.fn().mockResolvedValue(
        null
      );

      vi.spyOn(User, "findOne").mockReturnValue({
        select: selectMock,
      });

      await expect(
        loginUser(
          "john@example.com",
          "password123"
        )
      ).rejects.toThrow("Invalid credentials");
    });

    it("should throw if password is incorrect", async () => {
      const selectMock = vi.fn().mockResolvedValue({
        _id: "123",
        password: "hashedPassword",
      });

      vi.spyOn(User, "findOne").mockReturnValue({
        select: selectMock,
      });

      vi.spyOn(bcrypt, "compare").mockResolvedValue(
        false
      );

      await expect(
        loginUser(
          "john@example.com",
          "wrongPassword"
        )
      ).rejects.toThrow("Invalid credentials");
    });
  });
});