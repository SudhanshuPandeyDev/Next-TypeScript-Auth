"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Signup function
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Enable signup button if all fields are filled
  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-500 to-gray-900 text-white px-6">
      <div className="bg-gray-700 rounded-lg p-8 shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">
          {loading ? "Processing..." : "Sign Up"}
        </h1>
        <hr className="border-gray-400 mb-6" />

        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-black"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
            />
          </div>

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
              placeholder="Email"
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
              placeholder="Password"
            />
          </div>
        </div>

        <button
          onClick={onSignup}
          className={`mt-6 w-full p-2 rounded-lg font-semibold transition-colors ${
            buttonDisabled
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
