"use client";
import React, { useState } from "react";
import { X, Minus, Square } from "lucide-react";

const Calculator = ({ onClose, onMinimize }) => {
  const [display, setDisplay] = useState("");

  const handleClick = (val) => {
    if (val === "=") {
      try {
        // Evaluate the mathematical expression safely
        // Note: For a production app, use a custom math parser, but eval is okay for this mock
        setDisplay(eval(display).toString());
      } catch (err) {
        setDisplay("Error");
      }
    } else if (val === "C") {
      setDisplay("");
    } else {
      setDisplay((prev) => (prev === "Error" ? val : prev + val));
    }
  };

  const buttons = [
    "C", "(", ")", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  return (
    <div className="absolute top-20 left-20 w-80 bg-[#f3f3f3] dark:bg-[#202020] rounded-xl shadow-2xl border border-white/20 overflow-hidden flex flex-col z-40 backdrop-blur-3xl">
      
      {/* Title Bar */}
      <div className="h-9 flex items-center justify-between pl-3 pr-1 bg-white/50 dark:bg-black/50 text-sm select-none border-b border-white/10">
        <span className="text-black dark:text-white flex items-center gap-2 text-xs font-medium">
           Calculator
        </span>
        <div className="flex items-center text-black dark:text-white">
          <button onClick={onMinimize} className="hover:bg-black/10 dark:hover:bg-white/10 w-10 h-8 flex items-center justify-center transition"><Minus size={16} strokeWidth={1.5} /></button>
          <button className="hover:bg-black/10 dark:hover:bg-white/10 w-10 h-8 flex items-center justify-center transition"><Square size={13} strokeWidth={1.5} /></button>
          <button onClick={onClose} className="hover:bg-red-500 hover:text-white w-10 h-8 flex items-center justify-center transition"><X size={16} strokeWidth={1.5} /></button>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="h-20 bg-white/50 dark:bg-[#2b2b2b]/50 rounded-lg text-right text-4xl p-3 flex items-end justify-end overflow-hidden text-black dark:text-white font-light tracking-wider">
          {display || "0"}
        </div>
        
        <div className="grid grid-cols-4 gap-2 mt-2">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => handleClick(btn)}
              className={`p-3 rounded-md text-lg transition shadow-sm ${
                btn === "=" ? "col-span-2 bg-[#005fb8] text-white hover:bg-[#005fb8]/90" :
                btn === "C" ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" :
                "bg-white dark:bg-[#333333] text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 border border-white/20 dark:border-white/5"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;