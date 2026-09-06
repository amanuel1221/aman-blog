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

  const handleGoogleSignIn = () => {
  window.location.href = `${
    import.meta.env.VITE_API_URL
  }/auth/google`;
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
<div className="space-y-4">
  <button
    type="button"
    onClick={handleGoogleSignIn}
    className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-neutral-200 bg-white text-neutral-900 font-medium text-sm transition-all duration-150 hover:bg-neutral-50 hover:border-neutral-300 active:scale-[0.99]"
  >
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.78-.07-1.54-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.28v2.52A9.75 9.75 0 0 0 12 21.75Z"
      />
      <path
        fill="#FBBC05"
        d="M6.53 13.86a5.86 5.86 0 0 1 0-3.72V7.62H3.28a9.75 9.75 0 0 0 0 8.76l3.25-2.52Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.11c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.2 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.72 5.37l3.25 2.52C7.3 7.83 9.46 6.11 12 6.11Z"
      />
    </svg>

    Continue with Google
  </button>

  <div className="flex items-center gap-4">
    <div className="h-px flex-1 bg-neutral-200" />

    <span className="text-xs text-neutral-400">
      OR
    </span>

    <div className="h-px flex-1 bg-neutral-200" />
  </div>
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