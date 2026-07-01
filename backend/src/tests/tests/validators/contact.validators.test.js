import { describe, it, expect } from "vitest";

const { validateContactInput } = require("../../../validators/contact.validator");

describe("Contact Validators", () => {
  it("accepts a valid contact message", () => {
    expect(() =>
      validateContactInput({
        from_name: "Jane Doe",
        email: "jane@example.com",
        message: "Hello from the test suite",
      })
    ).not.toThrow();
  });

  it("throws when the sender name is missing", () => {
    expect(() =>
      validateContactInput({
        email: "jane@example.com",
        message: "Hello from the test suite",
      })
    ).toThrow("Sender name is required and cannot be empty");
  });

  it("throws when the email format is invalid", () => {
    expect(() =>
      validateContactInput({
        from_name: "Jane Doe",
        email: "not-an-email",
        message: "Hello from the test suite",
      })
    ).toThrow("Please provide a valid email address");
  });

  it("throws when the message is empty", () => {
    expect(() =>
      validateContactInput({
        from_name: "Jane Doe",
        email: "jane@example.com",
        message: "   ",
      })
    ).toThrow("Message is required and cannot be empty");
  });
});
