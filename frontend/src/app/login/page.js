"use client";

import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try{
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      }, {
        withCredentials: true
      }
    );
  
    console.log(response.data);
    } catch(error) {
      console.log(error);      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black p-8 rounded-lg shadow-md w-96">

        <h1 className="text-2xl font-bold text-center mb-6">
          Inventory Management System
        </h1>

        <h2 className="text-xl font-semibold mb-4">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          <label className="block mb-2 text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />


          <label className="block mb-2 text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border p-2 rounded mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Login
          </button>

        </form>

         <p className="text-sm text-center mt-5">
          Does not have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}
