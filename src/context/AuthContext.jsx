// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // load user on app start
    const raw = localStorage.getItem("learnvault_current_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // login by email+password (returns true if success)
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("learnvault_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return false;
    localStorage.setItem("learnvault_current_user", JSON.stringify(found));
    setUser(found);
    // ensure that user has a data key
    const key = found.email + "_data";
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify({ categories: [] }));
    }
    return true;
  };

  // signup returns true if account created
  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("learnvault_users") || "[]");
    if (users.some((u) => u.email === email)) return false;
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("learnvault_users", JSON.stringify(users));
    localStorage.setItem("learnvault_current_user", JSON.stringify(newUser));
    // create user data storage
    const key = email + "_data";
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify({ categories: [] }));
    }
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("learnvault_current_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
