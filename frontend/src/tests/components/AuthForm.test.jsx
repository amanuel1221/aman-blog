import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AuthForm from "../../components/AuthForm";

const mockLogin = vi.fn();
const mockSignup = vi.fn();

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    signup: mockSignup,
    error: null,
    user: null,
    logout: vi.fn(),
  }),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const renderAuthForm = (props) =>
  render(
    <MemoryRouter>
      <AuthForm {...props} />
    </MemoryRouter>
  );

describe("AuthForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLogin.mockResolvedValue({ success: true, user: { role: "user" } });
    mockSignup.mockResolvedValue({ success: true, user: { role: "user" } });
  });

  it("renders login mode by default", () => {
    renderAuthForm();

    expect(screen.getByTestId("auth-form")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-title")).toHaveTextContent(
      "Welcome back"
    );
    expect(screen.getByTestId("auth-form-email-input")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-submit-button")).toHaveTextContent(
      "Sign In"
    );
  });

  it("renders signup mode when initialMode is signup", () => {
    renderAuthForm({ initialMode: "signup" });

    expect(screen.getByTestId("auth-form-title")).toHaveTextContent(
      "Create your account"
    );

    expect(screen.getByTestId("auth-form-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-email-input")).toBeInTheDocument();
    expect(screen.getByTestId("auth-form-password-input")).toBeInTheDocument();

    expect(screen.getByTestId("auth-form-submit-button")).toHaveTextContent(
      "Create Account"
    );
  });

  it("updates email and password inputs in login mode", () => {
    renderAuthForm();

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
    renderAuthForm({ initialMode: "signup" });

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

  it("calls login when login form is submitted", async () => {
    renderAuthForm();

    fireEvent.change(screen.getByTestId("auth-form-email-input"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByTestId("auth-form-password-input"), {
      target: { value: "Password123!" },
    });

    fireEvent.submit(screen.getByTestId("auth-form-form"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
    });

    expect(mockLogin).toHaveBeenCalledWith(
      "test@example.com",
      "Password123!"
    );
  });

  it("calls signup when signup form is submitted", async () => {
    renderAuthForm({ initialMode: "signup" });

    fireEvent.change(screen.getByTestId("auth-form-name-input"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByTestId("auth-form-email-input"), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByTestId("auth-form-password-input"), {
      target: { value: "Password123!" },
    });

    fireEvent.submit(screen.getByTestId("auth-form-form"));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledTimes(1);
    });

    expect(mockSignup).toHaveBeenCalledWith(
      "John Doe",
      "john@example.com",
      "Password123!"
    );
  });

  it("switches from login mode to signup mode", () => {
    renderAuthForm();

    fireEvent.click(screen.getByTestId("auth-form-signup-button"));

    expect(screen.getByTestId("auth-form-title")).toHaveTextContent(
      "Create your account"
    );

    expect(screen.getByTestId("auth-form-name-input")).toBeInTheDocument();

    expect(screen.getByTestId("auth-form-submit-button")).toHaveTextContent(
      "Create Account"
    );
  });

  it("switches from signup mode to login mode", () => {
    renderAuthForm({ initialMode: "signup" });

    fireEvent.click(screen.getByTestId("auth-form-login-button"));

    expect(screen.getByTestId("auth-form-title")).toHaveTextContent(
      "Welcome back"
    );

    expect(
      screen.queryByTestId("auth-form-name-input")
    ).not.toBeInTheDocument();

    expect(screen.getByTestId("auth-form-submit-button")).toHaveTextContent(
      "Sign In"
    );
  });

  it("renders forgot password link in login mode", () => {
    renderAuthForm();

    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
  });

  it("does not render forgot password link in signup mode", () => {
    renderAuthForm({ initialMode: "signup" });

    expect(screen.queryByText("Forgot password?")).not.toBeInTheDocument();
  });
});