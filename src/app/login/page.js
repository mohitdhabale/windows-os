"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [password, setPassword] = useState("");

  const router = useRouter()

  return (
    <div
      className="w-full h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage:
          "url('/beautiful-road-view-with-amazing-nature-trees-and-fields-wallpaper-960x600_1.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Main container */}
      <div className="relative z-10 flex flex-col items-center text-white">

        {/* User Avatar */}
        <div className="mb-4 p-8 rounded-full backdrop-blur-md fles justify-center items-center">

          <img
            src="/user.png"
            className="w-30 h-30 rounded-full object-cover  shadow-lg"
          />
        </div>

        {/* Username */}
        <h2 className="text-2xl font-semibold mb-6 tracking-wide">
          User
        </h2>

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-64 px-4 py-1 rounded-md bg-white/20 backdrop-blur-md 
                     text-white placeholder-white/70 outline-none 
                     border border-white/30 focus:border-white/60"
        />

        {/* Sign in button */}
        <button
          className="mt-4 w-30 py-2 rounded-md bg-white/20 
                     hover:bg-white/30 transition"

          onClick={() => {
            if (password == "123") {
              router.push("/desktop")
            }
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;