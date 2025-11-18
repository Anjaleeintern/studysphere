// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = () => {
    if (!form.name || !form.email || !form.password) return alert("All fields required");
    const ok = signup(form.name.trim(), form.email.trim(), form.password);
    if (!ok) return alert("Email already registered");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 p-6">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Create Account</h2>

        <input
          className="w-full mb-3 p-3 border rounded"
          placeholder="Full name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full mb-3 p-3 border rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full mb-3 p-3 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={submit} className="w-full bg-blue-600 text-white py-3 rounded-xl">
          Sign Up
        </button>
      </div>
    </div>
  );
}
