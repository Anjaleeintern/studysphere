// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../utils/storage";

export default function ProtectedRoute({ children }) {
  // const { user } = useAuth();
  const user = getCurrentUser();
  if (!user) {
     return <Navigate to="/landing" replace />;
  }
  return children;
  // if (!user) return <Navigate to="/landing" replace />;
  // return children;
}
