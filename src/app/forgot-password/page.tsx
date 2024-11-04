"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgot-password", { email });
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      console.log("Error sending reset email", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-500 to-gray-900 text-white px-6">
      <div className="bg-gray-700 rounded-lg p-8 shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Forgot Password
        </h1>
        <hr className="border-gray-400 mb-6" />

        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-black"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleForgotPassword}
          className={`w-full p-2 rounded-lg font-semibold transition-colors ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={!email || loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}
