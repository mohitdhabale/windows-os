"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronUp,
  Wifi,
  Volume2,
  Bell,
  BatteryFull,
} from "lucide-react";

const Taskbar = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Time (12-hour format like Windows)
      const formattedTime = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // Date (dd-mm-yyyy)
      const formattedDate = now.toLocaleDateString("en-GB").replace(/\//g, "-");

      setTime(formattedTime);
      setDate(formattedDate);
    };

    updateTime(); // run immediately

    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, []);


  return (
    <div className="fixed bottom-0 left-0 w-full h-10 bg-[#1c1c1c]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-4 z-[999999]">

      {/* Center Icons */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">

        {/* Windows */}
        <div className="w-10 h-10 hover:bg-white/10 rounded-md flex items-center justify-center transition">
          <img
            src="/bootLogo.png"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Search */}
        <div className="h-7 px-5 rounded-full bg-white/5 hover:bg-white/10 transition flex items-center gap-3">
          <Search className="w-3 h-full text-white" strokeWidth={2.3} />
          <span className="text-white text-[11px] font-normal">
            Search
          </span>
        </div>

        {/* Task View */}
        <div className="w-11 h-11 hover:bg-white/10 rounded-md flex items-center justify-center transition relative">
          <img
            src="/taskview.png"
            className="w-5 h-5 object-contain opacity-90"
          />
        </div>

        {/* File Explorer */}
        <div className="w-11 h-11 hover:bg-white/10 rounded-md flex items-center justify-center transition relative">
          <img
            src="/explorer.png"
            className="w-6 h-6 object-contain"
          />

          {/* Active indicator */}
          <div className="absolute bottom-1 w-1 h-1 rounded-full bg-white"></div>
        </div>

        {/* Chrome */}
        <div className="w-11 h-11 hover:bg-white/10 rounded-md flex items-center justify-center transition relative">
          <img
            src="/chrome.png"
            className="w-6 h-6 object-contain"
          />

          <div className="absolute bottom-1 w-1 h-1 rounded-full bg-white"></div>
        </div>

        {/* VS Code */}
        <div className="w-11 h-11 hover:bg-white/10 rounded-md flex items-center justify-center transition relative">
          <img
            src="/vscode.png"
            className="w-6 h-6 object-contain"
          />

          <div className="absolute bottom-1 w-1 h-1 rounded-full bg-white"></div>
        </div>

        {/* ChatGPT */}
        <div className="w-11 h-11 bg-white/5 hover:bg-white/10 rounded-md flex items-center justify-center transition relative border border-white/10">
          <img
            src="/chatgpt.png"
            className="w-6 h-6 object-contain"
          />

          <div className="absolute bottom-1 w-6 h-[3px] rounded-full bg-[#b7f3ff]"></div>
        </div>
      </div>

      {/* Right Section */}
      <div className="ml-auto flex items-center gap-4 text-white">

        <ChevronUp className="w-4 h-4 opacity-90" />

        <div className="text-[11px] leading-3 text-center">
          <p>ENG</p>
          <p className="mt-1">IN</p>
        </div>

        <Wifi className="w-4 h-4" />

        <Volume2 className="w-4 h-4" />

        <div className="flex items-center gap-1">
          <BatteryFull className="w-5 h-5" />
          <span className="text-[11px]">80%</span>
        </div>

        <div className="text-right leading-4">
          <p className="text-[11px]">{time}</p>
          <p className="text-[11px]">{date}</p>
        </div>

        <Bell className="w-4 h-4 text-[#b7f3ff]" />
      </div>
    </div>
  );
};

export default Taskbar;