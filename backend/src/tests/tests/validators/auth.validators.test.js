import { describe, it, expect } from "vitest";
import { validateLoginInput,validateRegisterInput } from "../../../validators/auth.validator";

describe("Auth Validators", () => {
  describe("validateRegisterInput", () => {
    const validData = {
      name: "Amanuel Amare",
      email: "amanuel@example.com",
      password: "StrongPass123!",
    };

    it("accepts valid registration data", () => {
      expect(() =>
        validateRegisterInput(validData)
      ).not.toThrow();
    });

    it("throws when name is missing", () => {
      expect(() =>
        validateRegisterInput({
          email: validData.email,
          password: validData.password,
        })
      ).toThrow(
        "Name, email, and password are required"
      );
    });

    it("throws when email is missing", () => {
      expect(() =>
        validateRegisterInput({
          name: validData.name,
          password: validData.password,
        })
      ).toThrow(
        "Name, email, and password are required"
      );
    });

    it("throws when password is missing", () => {
      expect(() =>
        validateRegisterInput({
          name: validData.name,
          email: validData.email,
        })
      ).toThrow(
        "Name, email, and password are required"
      );
    });

    it("throws when name is less than 2 characters", () => {
      expect(() =>
        validateRegisterInput({
          ...validData,
          name: "A",
        })
      ).toThrow(
        "Name must be between 2 and 50 characters"
      );
    });

    it("throws when name exceeds 50 characters", () => {
      expect(() =>
        validateRegisterInput({
          ...validData,
          name: "A".repeat(51),
        })
      ).toThrow(
        "Name must be between 2 and 50 characters"
      );
    });

    it("throws when email format is invalid", () => {
      expect(() =>
        validateRegisterInput({
          ...validData,
          email: "invalid-email",
        })
      ).toThrow(
        "Please provide a valid email address"
      );
    });

    it("throws when password has no uppercase letter", () => {
      expect(() =>
        validateRegisterInput({
          ...validData,
          password: "strongpass123!",
        })
      ).toThrow(
        "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character"
      );
    });

    it("throws when password has no lowercase letter", () => {
      expect(() =>
        validateRegisterInput({
          ...validData,
          password: "STRONGPASS123!",
        })
      ).toThrow();
    });

    it("throws when password has no number", () => {
      expect(() =>
        validateRegisterInput({
          ...validData,
          password: "StrongPassword!",
        })
      ).toThrow();
    });

    it("throws when password has no special character", () => {
      expect(() =>
        validateRegisterInput({
          ...validData,
          password: "StrongPass123",
        })
      ).toThrow();
    });

    it("throws when password is shorter than 8 characters", () => {
      expect(() =>
        validateRegisterInput({
          ...validData,
          password: "Aa1!",
        })
      ).toThrow();
    });
  });

  describe("validateLoginInput", () => {
    const validEmail = "amanuel@example.com";
    const validPassword = "StrongPass123!";

    it("accepts valid login credentials", () => {
      expect(() =>
        validateLoginInput(
          validEmail,
          validPassword
        )
      ).not.toThrow();
    });

    it("throws when email is missing", () => {
      expect(() =>
        validateLoginInput(
          "",
          validPassword
        )
      ).toThrow(
        "Email and password are required"
      );
    });

    it("throws when password is missing", () => {
      expect(() =>
        validateLoginInput(
          validEmail,
          ""
        )
      ).toThrow(
        "Email and password are required"
      );
    });

    it("throws when email format is invalid", () => {
      expect(() =>
        validateLoginInput(
          "invalid-email",
          validPassword
        )
      ).toThrow(
        "Please provide a valid email address"
      );
    });
  });
});