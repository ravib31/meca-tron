/* eslint-disable react/no-unescaped-entities */
"use client";

import { setUser } from "@/redux/auth/auth-actions";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AdminLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  const inputStyle =
  "p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/login", { email, password });

      if (response.status === 200) {
        const { session } = response.data;
        dispatch(setUser(session.userId));
        router.push("/admin/products");
      }
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.errorMsg || "An error occurred"
      );
    }
  };

  return (
    <div className="flex animate-flip-down duration-1000 flex-col justify-center items-center h-screen bg-gradient-to-b from-red-200 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center text-red-700 mb-6">
          Welcome to Mecatron
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className={inputStyle}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className={inputStyle}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-600 text-white p-3 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
