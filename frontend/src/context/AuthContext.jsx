import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await getCurrentUser();

      if (data.success) {
        setUser(data.user);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

const login = async (email, password) => {
  try {
    const res = await loginUser({ email, password }); 

    setUser(res.data.user);
    localStorage.setItem("auth_user", JSON.stringify(res.data.user));

    return {
      success: true,
      user: res.data.user,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "invalid Credintials",
    };
  }
};
const signup = async (name, email, password) => {
  try {
    const res = await registerUser({ name, email, password }); // ✅ FIXED

    setUser(res.data.user);
    localStorage.setItem("auth_user", JSON.stringify(res.data.user));

    return {
      success: true,
      user: res.data.user,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Signup failed",
    };
  }
};
const logout = async () => {
  try {
    await logoutUser(); // calls backend
  } catch (err) {
    console.log("Logout error:", err);
  } finally {
    setUser(null);
    localStorage.removeItem("auth_user");
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);