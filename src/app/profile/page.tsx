"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      <hr className="w-full border-gray-500 mb-4" />
      <p className="text-lg">Welcome to your profile!</p>

      <div className="bg-gray-500 p-4 rounded-md shadow-md mt-6">
        <h2 className="text-xl mb-2">User ID:</h2>
        <h2 className="p-1 rounded bg-green-500 text-lg">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`} className="hover:underline">
              {data}
            </Link>
          )}
        </h2>
      </div>

      <hr className="w-full border-gray-500 my-4" />
      <div className="flex flex-col gap-4">
        <button
          onClick={logout}
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
