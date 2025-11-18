// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/home" className="text-2xl font-bold text-blue-600">
        📚 StudySphere
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <span className="font-semibold text-gray-700">👋 {user.name}</span>
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
              Login
            </Link>
            <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-semibold">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
