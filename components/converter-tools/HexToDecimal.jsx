"use client";

import { useState, useMemo } from "react";

export default function HexToDecimal() {
  const [value, setValue] = useState("");

  const result = useMemo(() => {
    if (!value.trim()) return null;
    try {
      const num = parseInt(value.trim(), 16);
      if (isNaN(num)) return null;
      return num;
    } catch {
      return null;
    }
  }, [value]);

  return (
    <div className="space-y-3">
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-5">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <div>
            <label className="block text-[13px] font-medium text-text-primary mb-1">Hexadecimal</label>
            <div className="relative">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter hex value"
                className="w-full px-3 py-2.5 text-sm rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-text-muted font-medium">hex</span>
            </div>
          </div>

          <div className="flex items-center justify-center pb-1">
            <span className="text-text-muted text-lg">=</span>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-text-primary mb-1">Decimal</label>
            <div className="relative">
              <div className="w-full px-3 py-2.5 text-sm rounded-[var(--radius-input)] border border-border bg-surface text-text-primary font-mono min-h-[42px] flex items-center">
                {result !== null ? result.toLocaleString() : <span className="text-text-muted">—</span>}
              </div>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-text-muted font-medium">dec</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          {result !== null && (
            <button
              onClick={() => navigator.clipboard.writeText(result.toString())}
              className="text-[12px] text-accent hover:text-accent-hover transition-colors cursor-pointer"
            >
              Copy result
            </button>
          )}
          <a href="/decimal-to-hex" className="text-[12px] text-accent hover:text-accent-hover transition-colors ml-auto">
            ↔ Convert Decimal to Hex
          </a>
        </div>
      </div>

      <div className="bg-surface rounded-[var(--radius-card)] px-4 py-3">
        <p className="text-[12px] text-text-muted mb-1">How it works</p>
        <p className="text-sm text-text-primary">Hexadecimal (base 16) uses digits 0-9 and letters A-F. Each hex digit represents a value from 0 to 15. This converter transforms any hexadecimal value to its decimal (base 10) equivalent.</p>
      </div>

      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-2">Common Hex to Decimal</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1">
          {[
            { hex: "A", dec: 10 },
            { hex: "F", dec: 15 },
            { hex: "10", dec: 16 },
            { hex: "FF", dec: 255 },
            { hex: "100", dec: 256 },
            { hex: "FFF", dec: 4095 },
          ].map((row) => (
            <div key={row.hex} className="flex justify-between text-[13px] py-1 border-b border-border/50">
              <span className="text-text-secondary font-mono">{row.hex}</span>
              <span className="text-text-primary font-mono">{row.dec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
