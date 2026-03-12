"use client";

import { useState, useRef, useEffect } from "react";

export default function Tooltip({ children, content, className = "" }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState("above");
  const triggerRef = useRef(null);

  useEffect(() => {
    if (show && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // If tooltip would go off the top of the screen, show below instead
      if (rect.top < 120) setPosition("below");
      else setPosition("above");
    }
  }, [show]);

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={0}
    >
      {children}
      {show && (
        <div
          className={`absolute z-50 px-3 py-2 text-[12px] leading-relaxed text-white bg-text-primary rounded-lg shadow-lg pointer-events-none w-56 ${
            position === "above"
              ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
              : "top-full left-1/2 -translate-x-1/2 mt-2"
          }`}
        >
          {content}
          <div
            className={`absolute left-1/2 -translate-x-1/2 border-[5px] border-transparent ${
              position === "above"
                ? "top-full -mt-px border-t-text-primary"
                : "bottom-full -mb-px border-b-text-primary"
            }`}
          />
        </div>
      )}
    </div>
  );
}
