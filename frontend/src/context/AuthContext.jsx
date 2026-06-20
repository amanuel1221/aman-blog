import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const mockUser = {
  id: "user_amanuel_123",
  name: "Amanuel Amare",
  email: "amanuel@test.com"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("auth_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (email, password) => {
    const loggedUser = mockUser; // later backend replaces this
    setUser(loggedUser);
    localStorage.setItem("auth_user", JSON.stringify(loggedUser));
  };

  const signup = (name, email, password) => {
    const newUser = { ...mockUser, name, email };
    setUser(newUser);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);