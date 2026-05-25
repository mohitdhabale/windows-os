"use client";

import React from "react";
import { Search, ChevronUp, Wifi, Volume2, Bell, BatteryFull, Calculator as CalcIcon, FileText } from "lucide-react";

// The Taskbar now accepts props from the Desktop Window Manager
const Taskbar = ({ windows = [], openApp, minimizeWindow }) => {
  
  // Helper function: Checks if an app is open, minimized, or active
  const getAppStatus = (appId) => {
    const win = windows.find(w => w.id === appId);
    if (!win) return { isOpen: false, isMinimized: false };
    return { isOpen: true, isMinimized: win.isMinimized, isActive: !win.isMinimized };
  };

  // Handle clicking a taskbar icon
  const handleTaskbarClick = (appId) => {
    const status = getAppStatus(appId);
    if (!status.isOpen) {
      openApp(appId);
    } else if (status.isActive) {
      minimizeWindow(appId);
    } else {
      openApp(appId); // Restores and focuses it
    }
  };

  const calcStatus = getAppStatus('calculator');
  const notepadStatus = getAppStatus('notepad');

  return (
    <div className="fixed bottom-0 left-0 w-full h-10 bg-[#1c1c1c]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-4 z-[9999]">

      {/* Center Icons */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">

        <div className="w-10 h-10 hover:bg-white/10 rounded-md flex items-center justify-center transition">
          <img src="/bootLogo.png" className="w-full h-full object-cover" />
        </div>

        {/* --- Interactive Taskbar Apps --- */}
        
        {/* Calculator Taskbar Icon */}
        <div 
          onClick={() => handleTaskbarClick('calculator')}
          className={`w-11 h-11 rounded-md flex items-center justify-center transition relative cursor-pointer ${calcStatus.isActive ? "bg-white/10" : "hover:bg-white/10"}`}
        >
          <div className="w-6 h-6 bg-[#005fb8] rounded flex items-center justify-center shadow-sm">
            <CalcIcon size={14} color="white" />
          </div>
          {/* Bottom active indicator line */}
          {calcStatus.isOpen && (
            <div className={`absolute bottom-1 h-[3px] rounded-full bg-[#b7f3ff] transition-all ${calcStatus.isActive ? "w-4" : "w-1"}`}></div>
          )}
        </div>

        {/* Notepad Taskbar Icon */}
        <div 
          onClick={() => handleTaskbarClick('notepad')}
          className={`w-11 h-11 rounded-md flex items-center justify-center transition relative cursor-pointer ${notepadStatus.isActive ? "bg-white/10" : "hover:bg-white/10"}`}
        >
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center shadow-sm">
            <FileText size={16} className="text-[#4cc2ff]" />
          </div>
          {/* Bottom active indicator line */}
          {notepadStatus.isOpen && (
            <div className={`absolute bottom-1 h-[3px] rounded-full bg-[#b7f3ff] transition-all ${notepadStatus.isActive ? "w-4" : "w-1"}`}></div>
          )}
        </div>

      </div>

      {/* Right Section Metrics */}
      <div className="ml-auto flex items-center gap-4 text-white">
        <ChevronUp className="w-4 h-4 opacity-90" />
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <BatteryFull className="w-5 h-5" />
        <div className="text-right leading-4">
          <p className="text-[11px]">02:21 AM</p>
          <p className="text-[11px]">26-05-2026</p>
        </div>
        <Bell className="w-4 h-4 text-[#b7f3ff]" />
      </div>
    </div>
  );
};

export default Taskbar;