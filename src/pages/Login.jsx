// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (!email || !password) return alert("All fields are required");
    const ok = login(email.trim(), password);
    if (!ok) return alert("Invalid email or password");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 p-6">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Sign In</h2>

        <input
          className="w-full mb-3 p-3 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-3 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Login
        </button>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
