"use client";
import React, { useState, useRef } from "react";

export default function WindowWrapper({ windowData, onFocus, onClose, onMinimize, children }) {
  const { id, isMinimized, zIndex, pos } = windowData;
  const [position, setPosition] = useState(pos);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Handle Dragging
  const handlePointerDown = (e) => {
    onFocus(id); // Bring to front when clicked anywhere on the window
    
    // Only start dragging if the user clicked inside a div with the class "drag-handle"
    if (e.target.closest('.drag-handle')) {
      isDragging.current = true;
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
      e.target.setPointerCapture(e.pointerId); // Keep tracking even if mouse moves fast
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };

  const handlePointerUp = (e) => {
    if (isDragging.current) {
      isDragging.current = false;
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: zIndex,
        display: isMinimized ? 'none' : 'block' // Hide if minimized, but keep state active
      }}
      className="shadow-2xl rounded-xl"
    >
      {/* Inject the control functions into the child app */}
      {React.cloneElement(children, { onClose: () => onClose(id), onMinimize: () => onMinimize(id) })}
    </div>
  );
}