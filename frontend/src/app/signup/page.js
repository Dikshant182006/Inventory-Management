"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true
        }
      );

      console.log(response.data)
      router.push('/login')

    } catch(error) {
      console.log("Error: ", error);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2">
          Inventory Management System
        </h1>

        <h2 className="text-xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSignup}>
          {/* Name */}
          <label className="block text-sm font-medium mb-2">Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <label className="block text-sm font-medium mb-2">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label className="block text-sm font-medium mb-2">Password</label>

          <input
            type="password"
            placeholder="Create password"
            className="w-full border border-gray-300 p-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
