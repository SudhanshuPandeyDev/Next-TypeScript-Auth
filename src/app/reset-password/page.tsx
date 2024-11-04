"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

    try {
      const response = await axios.post("/api/users/reset-password", {
        email,
        newPassword,
      });
      toast.success(response.data.message || "Password reset successful!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-500 to-gray-900 text-white px-6">
      <div className="bg-gray-700 rounded-lg p-8 shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Reset Password
        </h1>
        <hr className="border-gray-400 mb-6" />

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Enter your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-black"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-black"
            />
          </div>
        </div>

        <button
          onClick={handleResetPassword}
          className={`mt-6 w-full p-2 rounded-lg font-semibold transition-colors ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={!email || !newPassword || loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
