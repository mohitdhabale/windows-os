"use client";

import Taskbar from "@/components/taskbar";
import Calculator from "@/components/calculator";
import React, { useState } from "react";
import { Calculator as CalcIcon, FileText } from "lucide-react";
import Notepad from "@/components/notepad";

const Desktop = () => {
    // State to manage windows
    const [isCalcOpen, setIsCalcOpen] = useState(false);
    const [isCalcMinimized, setIsCalcMinimized] = useState(false);

    // Window Controls
    const openCalculator = () => {
        setIsCalcOpen(true);
        setIsCalcMinimized(false);
    };

    const closeCalculator = () => setIsCalcOpen(false);
    const minimizeCalculator = () => setIsCalcMinimized(true);


    // --- State for Notepad ---
    const [isNotepadOpen, setIsNotepadOpen] = useState(false);
    const [isNotepadMinimized, setIsNotepadMinimized] = useState(false);

    const openNotepad = () => {
        setIsNotepadOpen(true);
        setIsNotepadMinimized(false);
    };
    const closeNotepad = () => setIsNotepadOpen(false);
    const minimizeNotepad = () => setIsNotepadMinimized(true);

    return (
        <div
            className="w-full h-screen bg-cover bg-center relative overflow-hidden flex flex-col"
            style={{ backgroundImage: "url('/beautiful-road-view-with-amazing-nature-trees-and-fields-wallpaper-960x600_1.jpg')" }}
        >
            {/* Main Desktop Area */}
            <div className="flex-1 p-2 relative">

                {/* Desktop Widgets / Icons Container */}
                <div className="flex flex-col gap-2">

                    {/* Calculator Desktop Icon (Double Click to open, mimicking Windows) */}
                    <div
                        onDoubleClick={openCalculator}
                        className="w-20 py-2 flex flex-col items-center justify-center gap-1 hover:bg-white/10 rounded-sm cursor-pointer transition border border-transparent hover:border-white/20 text-white"
                    >
                        <div className="w-12 h-12 bg-[#005fb8] rounded-xl flex items-center justify-center shadow-lg">
                            <CalcIcon size={26} color="white" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs text-center drop-shadow-md text-white font-medium" style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.8)" }}>
                            Calculator
                        </span>
                    </div>

                    <div
                        onDoubleClick={openNotepad}
                        className="w-20 py-2 flex flex-col items-center justify-center gap-[6px] hover:bg-white/10 rounded-sm cursor-pointer border border-transparent hover:border-white/20 transition-all group"
                    >
                        <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                            <FileText size={24} className="text-[#4cc2ff]" strokeWidth={1.5} />
                        </div>
                        <span className="text-[11px] text-white font-medium" style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.8)" }}>
                            Notepad
                        </span>
                    </div>

                </div>

                {/* Render the Calculator Window if it's open and not minimized */}
                {isCalcOpen && !isCalcMinimized && (
                    <Calculator
                        onClose={closeCalculator}
                        onMinimize={minimizeCalculator}
                    />
                )}

                {isNotepadOpen && !isNotepadMinimized && (
                    <Notepad onClose={closeNotepad} onMinimize={minimizeNotepad} />
                )}
            </div>

            <Taskbar />
        </div>
    );
};

export default Desktop;