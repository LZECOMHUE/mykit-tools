"use client";

import { useState, useMemo, useCallback } from "react";
import Button from "@/components/ui/Button";

const SEPARATORS = [
  { label: "Newline", value: "\n" },
  { label: "Space", value: " " },
  { label: "Comma", value: ", " },
  { label: "Custom", value: "custom" },
];

export default function TextRepeater() {
  const [input, setInput] = useState("");
  const [count, setCount] = useState(3);
  const [separator, setSeparator] = useState("\n");
  const [customSeparator, setCustomSeparator] = useState(" | ");
  const [copied, setCopied] = useState(false);

  const effectiveSeparator = separator === "custom" ? customSeparator : separator;

  const output = useMemo(() => {
    if (!input || count < 1) return "";
    const clamped = Math.min(count, 1000);
    return Array(clamped).fill(input).join(effectiveSeparator);
  }, [input, count, effectiveSeparator]);

  const charCount = output.length;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-3">
      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to repeat..."
        className="w-full px-4 py-3 text-base border border-border rounded-lg bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-secondary">Repeat:</span>
          <input
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(1000, Number(e.target.value) || 1)))}
            className="w-20 px-2 py-1.5 text-sm font-mono border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:ring-1 focus:ring-accent text-center"
          />
          <span className="text-xs text-text-muted">times</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-secondary">Separator:</span>
          <div className="flex flex-wrap gap-1">
            {SEPARATORS.map((s) => (
              <button
                key={s.value}
                onClick={() => setSeparator(s.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  separator === s.value
                    ? "bg-accent text-white"
                    : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                {s.label}
              </button>
            ))}
            {separator === "custom" && (
              <input
                type="text"
                value={customSeparator}
                onChange={(e) => setCustomSeparator(e.target.value)}
                placeholder="e.g. |"
                className="w-20 px-2 py-1 text-xs border border-border rounded-full bg-white text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              />
            )}
          </div>
        </div>
      </div>

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-text-secondary">
            {output ? (
              <>
                <span className="font-mono">{charCount.toLocaleString()}</span> characters
              </>
            ) : (
              "Output"
            )}
          </span>
          {output && (
            <Button size="sm" variant="secondary" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          )}
        </div>
        <textarea
          value={output}
          readOnly
          placeholder="Repeated text will appear here..."
          className="w-full h-48 p-3 text-sm font-mono border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted resize-none"
        />
      </div>
    </div>
  );
}
