"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  // Axios error (error.response.data)
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data || "An error occurred.");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-900 text-gray-300">
      <div className="bg-gray-700 text-gray-100 rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-400">
          Verify Your Email
        </h1>

        <div className="mb-4 text-center">
          <h2 className="text-lg bg-gray-700 text-gray-200 p-4 rounded-md overflow-x-auto">
            {token ? `Token: ${token}` : "No token found"}
          </h2>
        </div>

        {verified && (
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-green-400">
              Email Verified Successfully!
            </h2>
            <p className="mt-2">You can now log in to your account.</p>
            <Link href="/login">
              <span className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Go to Login
              </span>
            </Link>
          </div>
        )}

        {error && (
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-red-500">
              Verification Failed
            </h2>
            <p className="mt-2">Please try again or contact support.</p>
          </div>
        )}
      </div>
    </div>
  );
}
