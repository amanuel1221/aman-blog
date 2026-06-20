import React, { useState,useCallback } from "react";
import { useAuth } from "../context/AuthContext";

const AuthForm = ({ initialMode = "login" }) => {
  const { login, signup } = useAuth();
  
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (mode === "login") {
        login(email, password);
      } else {
        signup(name, email, password);
      }
    },
    [mode, email, password, name, login, signup]
  );
    const switchToSignup = useCallback(() => setMode("signup"), []);
  const switchToLogin = useCallback(() => setMode("login"), []);

  return (
    <main className="max-w-md w-full mx-auto mt-24 p-8 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/50" data-testid="auth-form"
     aria-labelledby="auth-title">
      
      <header className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-neutral-900 text-white font-black text-xl mb-4 shadow-sm" data-testid="auth-form-logo"
        aria-hidden="true">
          A
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900" data-testid="auth-form-title" id="auth-title">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm text-neutral-500 mt-1.5" data-testid="auth-form-description">
          {mode === "login" 
            ? "Enter your details to access your account and continue exploring our blog." 
            : "Join our community to explore and share knowledge in the world of software development."}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5" data-testid="auth-form-form"
      noValidate
      aria-label="Authentication form">
        
        {mode === "signup" && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500" data-testid="auth-form-name-label" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Alex Johnson"
              className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
                data-testid="auth-form-name-input"
                autoComplete="name"
                id="name"
                name="name"
                
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500" data-testid="auth-form-email-label" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-testid="auth-form-email-input"
            autoComplete="email"
            id="email"
            name="email"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500" data-testid="auth-form-password-label" htmlFor="password">
              Password
            </label>
            {mode === "login" && (
              <a href="#forgot" className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors" aria-label="Forgot password link">
                Forgot password?
              </a>
            )}
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            data-testid="auth-form-password-input"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            id="password"
            name="password"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3.5 px-4 rounded-xl font-medium text-sm shadow-sm transition-all duration-150 hover:shadow active:scale-[0.99] mt-2"
          data-testid="auth-form-submit-button"
        >
          {mode === "login" ? "Sign in to account" : "Get started free"}
        </button>
      </form>

      <footer className="mt-8 pt-6 border-t border-neutral-100 text-center text-sm text-neutral-500" data-testid="auth-form-footer">
        {mode === "login" ? (
          <>
            New to our blog?{" "}
            <button 
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
              onClick={() => setMode("login")} 
              className="font-semibold text-neutral-950 hover:underline underline-offset-4 transition-all"
              data-testid="auth-form-login-button"
            >
              Sign in instead
            </button>
          </>
        )}
      </footer>

    </main>
  );
};

export default AuthForm;