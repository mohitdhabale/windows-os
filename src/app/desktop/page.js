"use client";

import React, { useState } from "react";
import Taskbar from "@/components/taskbar";
import Calculator from "@/components/calculator";
import Notepad from "@/components/notepad";
import WindowWrapper from "@/components/WindowWrapper";
import { Calculator as CalcIcon, FileText } from "lucide-react";

const APP_COMPONENTS = {
  calculator: <Calculator />,
  notepad: <Notepad />
};

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [activeZIndex, setActiveZIndex] = useState(10); // Tracks the highest z-index

  // Open an app or restore it if already open
  const openApp = (appId) => {
    const existingWindow = windows.find((w) => w.id === appId);
    
    if (existingWindow) {
      // If open, restore it and bring to front
      focusWindow(appId);
      setWindows((prev) => prev.map((w) => w.id === appId ? { ...w, isMinimized: false } : w));
    } else {
      // If not open, create a new window object
      const newWindow = {
        id: appId,
        isMinimized: false,
        zIndex: activeZIndex + 1,
        pos: { x: Math.random() * 100 + 50, y: Math.random() * 100 + 50 }, // Random spawn position
      };
      setWindows([...windows, newWindow]);
      setActiveZIndex(activeZIndex + 1);
    }
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setWindows(windows.map((w) => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const focusWindow = (id) => {
    // Bring window to the front by giving it the highest z-index
    setActiveZIndex((prev) => prev + 1);
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, zIndex: activeZIndex + 1 } : w));
  };

  return (
    <div 
      className="w-full h-screen bg-cover bg-center relative overflow-hidden flex flex-col"
      style={{ backgroundImage: "url('/beautiful-road-view-with-amazing-nature-trees-and-fields-wallpaper-960x600_1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Desktop Icons */}
      <div className="relative z-10 flex-1 p-2 flex flex-col flex-wrap content-start gap-2 h-[calc(100vh-40px)]">
        
        {/* Calculator Desktop Icon */}
        <div onClick={() => openApp('calculator')} className="w-20 py-2 flex flex-col items-center gap-[6px] hover:bg-white/10 rounded-sm cursor-pointer border border-transparent hover:border-white/20 group">
          <div className="w-11 h-11 bg-[#005fb8] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl">
            <CalcIcon size={22} color="white" />
          </div>
          <span className="text-[11px] text-white font-medium drop-shadow-md">Calculator</span>
        </div>

        {/* Notepad Desktop Icon */}
        <div onClick={() => openApp('notepad')} className="w-20 py-2 flex flex-col items-center gap-[6px] hover:bg-white/10 rounded-sm cursor-pointer border border-transparent hover:border-white/20 group">
          <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl">
            <FileText size={24} className="text-[#4cc2ff]" />
          </div>
          <span className="text-[11px] text-white font-medium drop-shadow-md">Notepad</span>
        </div>

        {/* Render all active Windows via the Wrapper */}
        {windows.map((win) => (
          <WindowWrapper 
            key={win.id} 
            windowData={win} 
            onClose={closeWindow} 
            onMinimize={minimizeWindow} 
            onFocus={focusWindow}
          >
            {APP_COMPONENTS[win.id]}
          </WindowWrapper>
        ))}
      </div>

      {/* Pass window states down to the Taskbar */}
      <Taskbar windows={windows} openApp={openApp} minimizeWindow={minimizeWindow} />
    </div>
  );
};

export default Desktop;