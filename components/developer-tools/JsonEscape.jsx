"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";

const MODES = [
  { label: "Escape", value: "escape" },
  { label: "Unescape", value: "unescape" },
];

function escapeJsonString(str) {
  return JSON.stringify(str);
}

function unescapeJsonString(str) {
  const trimmed = str.trim();
  // If wrapped in quotes, parse as JSON string
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    try {
      return JSON.parse(trimmed.startsWith("'")
        ? '"' + trimmed.slice(1, -1) + '"'
        : trimmed);
    } catch {
      // Fall through to manual unescape
    }
  }
  // Try wrapping in quotes and parsing
  try {
    return JSON.parse('"' + trimmed + '"');
  } catch {
    // Manual unescape of common sequences
    return trimmed
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
}

export default function JsonEscape() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("escape");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    try {
      if (mode === "escape") {
        return escapeJsonString(input);
      } else {
        return unescapeJsonString(input);
      }
    } catch {
      return "Error processing input";
    }
  }, [input, mode]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const handleSwap = () => {
    setInput(output);
    setMode(mode === "escape" ? "unescape" : "escape");
  };

  return (
    <div className="space-y-3">
      {/* Mode pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-text-primary">Mode:</span>
        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              mode === m.value
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary hover:bg-surface-hover"
            }`}
          >
            {m.label}
          </button>
        ))}
        {input && output && (
          <button
            onClick={handleSwap}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover transition-all"
          >
            Swap
          </button>
        )}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">
              {mode === "escape" ? "Raw String" : "Escaped String"}
            </label>
            {input && (
              <span className="text-xs text-text-muted font-mono">{input.length} chars</span>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "escape"
                ? 'Paste a raw string here...\nLine breaks, "quotes", and special chars will be escaped'
                : 'Paste an escaped string here...\n"Hello\\nWorld\\t\\"quoted\\""'
            }
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">
              {mode === "escape" ? "Escaped Output" : "Unescaped Output"}
            </label>
            <div className="flex items-center gap-2">
              {output && (
                <span className="text-xs text-text-muted font-mono">{output.length} chars</span>
              )}
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={
              mode === "escape"
                ? "Escaped JSON string will appear here..."
                : "Unescaped string will appear here..."
            }
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
