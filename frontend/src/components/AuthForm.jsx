import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AuthForm = ({ initialMode = "login" }) => {
  const { login, signup, error } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState(initialMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateSignup = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (name.trim().length < 2 || name.trim().length > 50) {
      newErrors.name = "Name must be between 2 and 50 characters.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-+=])[A-Za-z\d@$!%*?&.#^()_\-+=]{8,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Minimum 8 characters with uppercase, lowercase, number and special character.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }
    
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid =
      mode === "login"
        ? validateLogin()
        : validateSignup();

    if (!isValid) return;

    setSubmitting(true);

    let result;

    if (mode === "login") {
      result = await login(email, password);
    } else {
      result = await signup(name, email, password);
    }

    setSubmitting(false);

    if (!result.success) {
      toast.error(error || "invalid credentials");
      return;
    }

    toast.success(
      mode === "login"
        ? "Login successful!"
        : "Account created successfully!"
    );

    if (result.user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };


return (
  
  <div
    className="max-w-md w-full mx-auto mt-24 p-8 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/50"
    data-testid="auth-form"
  >
    <div className="mb-8 text-center">
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-neutral-900 text-white font-black text-xl mb-4 shadow-sm"
        data-testid="auth-form-logo"
      >
        A
      </div>

      <h2
        className="text-2xl font-bold tracking-tight text-neutral-900"
        data-testid="auth-form-title"
      >
        {mode === "login"
          ? "Welcome back"
          : "Create your account"}
      </h2>

      <p
        className="text-sm text-neutral-500 mt-1.5"
        data-testid="auth-form-description"
      >
        {mode === "login"
          ? "Enter your details to access your account and continue exploring our blog."
          : "Join our community to explore and share knowledge in the world of software development."}
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-testid="auth-form-form"
    >
      {mode === "signup" && (
        <div className="space-y-1.5">
          <label
            className="text-xs font-semibold uppercase tracking-wider text-neutral-500"
            data-testid="auth-form-name-label"
          >
            Full Name
          </label>

          <input
            type="text"
            placeholder="Alex Johnson"
            className={`w-full px-4 py-3 bg-neutral-50/50 border rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all text-sm ${errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-neutral-200 focus:border-neutral-900 focus:ring-neutral-900"
              }`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);

              if (errors.name) {
                setErrors((prev) => ({
                  ...prev,
                  name: "",
                }));
              }
            }}
            required
            data-testid="auth-form-name-input"
          />

          {errors.name && (
            <p className="text-xs text-red-500 mt-1">
              {errors.name}
            </p>
          )}
        </div>
      )}
      <div className="space-y-1.5">
        <label
          className="text-xs font-semibold uppercase tracking-wider text-neutral-500"
          data-testid="auth-form-email-label"
        >
          Email Address
        </label>

        <input
          type="email"
          placeholder="you@example.com"
          className={`w-full px-4 py-3 bg-neutral-50/50 border rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all text-sm ${errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-neutral-200 focus:border-neutral-900 focus:ring-neutral-900"
            }`}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);

            if (errors.email) {
              setErrors((prev) => ({
                ...prev,
                email: "",
              }));
            }
          }}
          required
          data-testid="auth-form-email-input"
        />

        {errors.email && (
          <p className="text-xs text-red-500 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label
            className="text-xs font-semibold uppercase tracking-wider text-neutral-500"
            data-testid="auth-form-password-label"
          >
            Password
          </label>

          {mode === "login" && (
            <a
              href="#forgot"
              className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors"
            >
              Forgot password?
            </a>
          )}
        </div>

        <input
          type="password"
          placeholder="••••••••"
          className={`w-full px-4 py-3 bg-neutral-50/50 border rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all text-sm ${errors.password
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-neutral-200 focus:border-neutral-900 focus:ring-neutral-900"
            }`}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);

            if (errors.password) {
              setErrors((prev) => ({
                ...prev,
                password: "",
              }));
            }
          }}
          required
          data-testid="auth-form-password-input"
        />

        {errors.password && (
          <p className="text-xs text-red-500 mt-1">
            {errors.password}
          </p>
        )}
      </div>
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm transition-all duration-150 mt-2 ${submitting
            ? "bg-neutral-500 cursor-not-allowed text-white"
            : "bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm hover:shadow active:scale-[0.99]"
          }`}
        data-testid="auth-form-submit-button"
      >
        {submitting
          ? mode === "login"
            ? "Signing in..."
            : "Creating account..."
          : mode === "login"
            ? "Sign In"
            : "Create Account"}
      </button>
    </form>

    <div
      className="mt-8 pt-6 border-t border-neutral-100 text-center text-sm text-neutral-500"
      data-testid="auth-form-footer"
    >
      {mode === "login" ? (
        <>
          New to our blog?{" "}
          <button
            type="button"
            onClick={() => setMode("signup")}
            className="font-semibold text-neutral-950 hover:underline underline-offset-4 transition-all"
            data-testid="auth-form-signup-button"
          >
            Create an account
          </button>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setMode("login")}
            className="font-semibold text-neutral-950 hover:underline underline-offset-4 transition-all"
            data-testid="auth-form-login-button"
          >
            Sign in instead
          </button>
        </>
      )}
    </div>
  </div>
  
);
};

export default AuthForm;