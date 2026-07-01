import React, { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext();

// Mock admin (later replaced by backend JWT)
const mockAdmin = {
  id: "admin_001",
  name: "Amanuel Amare",
  email: "admin@amanblog.dev",
  role: "admin",
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("admin_user");

    if (saved) {
      setAdmin(JSON.parse(saved));
    }

    setLoading(false);
  }, []);

  // LOGIN
  const loginAdmin = (email, password) => {
    // Later: replace with backend API
    const loggedAdmin = mockAdmin;

    setAdmin(loggedAdmin);
    localStorage.setItem("admin_user", JSON.stringify(loggedAdmin));
  };

  // LOGOUT
  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("admin_user");
  };

  // CHECK ADMIN ROLE
  const isAdmin = admin?.role === "admin";

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loginAdmin,
        logoutAdmin,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

// Hook
export const useAdminAuth = () => useContext(AdminAuthContext);