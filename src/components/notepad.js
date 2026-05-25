"use client";

import React, { useState, useRef } from "react";
import { X, Minus, Square, FileText, Settings, Plus } from "lucide-react";

const Notepad = ({ onClose, onMinimize }) => {
    const [text, setText] = useState("");
    const [isMaximized, setIsMaximized] = useState(false);
    const textareaRef = useRef(null);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    // Get current line and column (basic implementation)
    const getCursorPos = () => {
        if (!textareaRef.current) return { ln: 1, col: 1 };
        const val = textareaRef.current.value;
        const selectionStart = textareaRef.current.selectionStart;
        const lines = val.substring(0, selectionStart).split("\n");
        return {
            ln: lines.length,
            col: lines[lines.length - 1].length + 1,
        };
    };

    const cursorPos = getCursorPos();

    return (
<div className={`transition-all duration-200 bg-[#f3f3f3]/90 dark:bg-[#202020]/90 backdrop-blur-2xl border border-white/30 dark:border-white/10 flex flex-col overflow-hidden
        ${isMaximized ? "w-[100vw] h-[calc(100vh-40px)] rounded-none" : "w-[700px] h-[500px] rounded-xl"}`}>

            {/* Title Bar & Tabs */}
<div className="drag-handle h-10 flex justify-between items-center bg-[#e5e5e5]/50 dark:bg-[#1a1a1a]/50 select-none">
                {/* Tabs Area */}
                <div className="flex h-full items-end pl-2 pt-2 gap-1 flex-1">
                    {/* Active Tab */}
                    <div className="h-full min-w-[180px] bg-[#f3f3f3] dark:bg-[#202020] rounded-t-lg flex items-center justify-between px-3 border border-b-0 border-white/30 dark:border-white/10 shadow-sm">
                        <div className="flex items-center gap-2 text-xs text-black dark:text-white">
                            <FileText size={14} className="text-[#4cc2ff]" strokeWidth={2} />
                            <span>Untitled.txt</span>
                        </div>
                        <button className="hover:bg-black/10 dark:hover:bg-white/10 p-1 rounded-md transition-colors">
                            <X size={12} strokeWidth={2} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* New Tab Button */}
                    <button className="h-full px-3 mb-1 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors text-black dark:text-white">
                        <Plus size={16} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Right side controls */}
                <div className="flex h-full text-black dark:text-white items-start">
                    <button className="h-8 w-10 flex justify-center items-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors mx-1 rounded-b-md">
                        <Settings size={14} strokeWidth={1.5} />
                    </button>
                    <button onClick={onMinimize} className="h-8 w-12 flex justify-center items-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        <Minus size={14} strokeWidth={1.5} />
                    </button>
                    <button onClick={toggleMaximize} className="h-8 w-12 flex justify-center items-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        {/* If maximized, show a different icon (restore), else show square */}
                        {isMaximized ? (
                            <div className="relative w-[12px] h-[12px]">
                                <Square size={10} className="absolute top-0 right-0" strokeWidth={1.5} />
                                <Square size={10} className="absolute bottom-0 left-0 bg-[#f3f3f3] dark:bg-[#202020]" strokeWidth={1.5} />
                            </div>
                        ) : (
                            <Square size={12} strokeWidth={1.5} />
                        )}
                    </button>
                    <button onClick={onClose} className="h-8 w-12 flex justify-center items-center hover:bg-[#e81123] hover:text-white transition-colors rounded-tr-xl">
                        <X size={14} strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            {/* Menu Bar */}
            <div className="h-8 flex items-center px-2 border-b border-black/5 dark:border-white/5 bg-[#f3f3f3] dark:bg-[#202020] select-none text-[13px] text-black dark:text-white">
                {["File", "Edit", "View"].map((item) => (
                    <button key={item} className="px-3 py-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors">
                        {item}
                    </button>
                ))}
            </div>

            {/* Text Area */}
            <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onClick={() => setText(text)} // trigger re-render for cursor pos
                onKeyUp={() => setText(text)}
                spellCheck="false"
                className="flex-1 w-full bg-transparent resize-none outline-none p-4 text-[15px] text-black dark:text-white font-sans leading-relaxed"
                style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
                placeholder="Type here..."
            />

            {/* Status Bar */}
            <div className="h-6 bg-[#f3f3f3] dark:bg-[#202020] border-t border-black/5 dark:border-white/5 flex items-center justify-end px-4 text-[11px] text-gray-600 dark:text-gray-400 select-none">
                <div className="flex gap-6">
                    <span>Ln {cursorPos.ln}, Col {cursorPos.col}</span>
                    <span>100%</span>
                    <span>Windows (CRLF)</span>
                    <span>UTF-8</span>
                </div>
            </div>

        </div>
    );
};

export default Notepad;