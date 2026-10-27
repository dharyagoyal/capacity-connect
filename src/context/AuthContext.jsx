import React, { createContext, useContext, useState, useEffect } from "react";
import { mockUsers } from "../data/mockData";

const AuthContext = createContext(null);

const STORAGE_KEY = "capacity_connect_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse stored user from localStorage", e);
    }
    // Default logged-in user for effortless review: trainee
    return mockUsers.trainee;
  });

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch (e) {
        console.error("Failed to save user to localStorage", e);
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (role = "trainee", customInfo = {}) => {
    const baseUser = mockUsers[role] || mockUsers.trainee;
    const newUser = {
      ...baseUser,
      ...customInfo,
      role,
      lastLogin: new Date().toISOString(),
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const switchRole = () => {
    if (!user || user.role === "trainee") {
      setUser(mockUsers.trainer);
      return "trainer";
    } else {
      setUser(mockUsers.trainee);
      return "trainee";
    }
  };

  const value = {
    user,
    role: user?.role || "trainee",
    isAuthenticated: !!user,
    login,
    logout,
    switchRole,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
