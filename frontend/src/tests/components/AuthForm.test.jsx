import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AuthForm from "../../components/AuthForm";

const mockLogin = vi.fn();
const mockSignup = vi.fn();

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    signup: mockSignup,
  }),
}));

describe("AuthForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login mode by default", () => {
    render(<AuthForm />);

    expect(screen.getByTestId("auth-form")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-title")).toHaveTextContent(
      "Welcome back"
    );
    expect(screen.getByTestId("auth-form-email-input")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-password-input")).toBeInTheDocument();
    expect(
      screen.getByTestId("auth-form-submit-button")
    ).toHaveTextContent("Sign in to account");
  });

  it("renders signup mode when initialMode is signup", () => {
    render(<AuthForm initialMode="signup" />);

    expect(screen.getByTestId("auth-form-title")).toHaveTextContent(
      "Create your account"
    );

    expect(screen.getByTestId("auth-form-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-email-input")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-password-input")).toBeInTheDocument();

    expect(
      screen.getByTestId("auth-form-submit-button")
    ).toHaveTextContent("Get started free");
  });

  it("updates email and password inputs in login mode", () => {
    render(<AuthForm />);

    const emailInput = screen.getByTestId("auth-form-email-input");
    const passwordInput = screen.getByTestId("auth-form-password-input");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("updates all inputs in signup mode", () => {
    render(<AuthForm initialMode="signup" />);

    const nameInput = screen.getByTestId("auth-form-name-input");
    const emailInput = screen.getByTestId("auth-form-email-input");
    const passwordInput = screen.getByTestId("auth-form-password-input");

    fireEvent.change(nameInput, {
      target: { value: "John Doe" },
    });

    fireEvent.change(emailInput, {
      target: { value: "john@example.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("calls login when login form is submitted", () => {
    render(<AuthForm />);

    fireEvent.change(screen.getByTestId("auth-form-email-input"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByTestId("auth-form-password-input"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByTestId("auth-form-form"));

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith(
      "test@example.com",
      "password123"
    );
  });

  it("calls signup when signup form is submitted", () => {
    render(<AuthForm initialMode="signup" />);

    fireEvent.change(screen.getByTestId("auth-form-name-input"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByTestId("auth-form-email-input"), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByTestId("auth-form-password-input"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByTestId("auth-form-form"));

    expect(mockSignup).toHaveBeenCalledTimes(1);
    expect(mockSignup).toHaveBeenCalledWith(
      "John Doe",
      "john@example.com",
      "password123"
    );
  });

  it("switches from login mode to signup mode", () => {
    render(<AuthForm />);

    fireEvent.click(screen.getByTestId("auth-form-signup-button"));

    expect(screen.getByTestId("auth-form-title")).toHaveTextContent(
      "Create your account"
    );

    expect(screen.getByTestId("auth-form-name-input")).toBeInTheDocument();

    expect(
      screen.getByTestId("auth-form-submit-button")
    ).toHaveTextContent("Get started free");
  });

  it("switches from signup mode to login mode", () => {
    render(<AuthForm initialMode="signup" />);

    fireEvent.click(screen.getByTestId("auth-form-login-button"));

    expect(screen.getByTestId("auth-form-title")).toHaveTextContent(
      "Welcome back"
    );

    expect(
      screen.queryByTestId("auth-form-name-input")
    ).not.toBeInTheDocument();

    expect(
      screen.getByTestId("auth-form-submit-button")
    ).toHaveTextContent("Sign in to account");
  });

  it("renders forgot password link in login mode", () => {
    render(<AuthForm />);

    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
  });

  it("does not render forgot password link in signup mode", () => {
    render(<AuthForm initialMode="signup" />);

    expect(
      screen.queryByText("Forgot password?")
    ).not.toBeInTheDocument();
  });
});