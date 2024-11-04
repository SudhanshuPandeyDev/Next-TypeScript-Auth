"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login function
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-500 to-gray-900 text-white px-6">
      <div className="bg-gray-700 rounded-lg p-8 shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className="border-gray-400 mb-6" />

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-black"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-black"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button
          onClick={onLogin}
          className={`mt-6 w-full p-2 rounded-lg font-semibold transition-colors ${
            buttonDisabled
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center">
          <Link
            href="/signup"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Don't have an account? Sign up
          </Link>

          <br />
          <Link
            href="/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
