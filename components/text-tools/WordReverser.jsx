"use client";

import { useState, useMemo, useCallback } from "react";
import Button from "@/components/ui/Button";

const MODES = [
  { label: "Reverse words", value: "words" },
  { label: "Reverse letters", value: "letters" },
  { label: "Reverse all", value: "all" },
];

export default function WordReverser() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("words");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    switch (mode) {
      case "words":
        return input
          .split(/\n/)
          .map((line) => line.split(/\s+/).reverse().join(" "))
          .join("\n");
      case "letters":
        return input.replace(/\S+/g, (w) => w.split("").reverse().join(""));
      case "all":
        return input.split("").reverse().join("");
      default:
        return input;
    }
  }, [input, mode]);

  const wordCount = useMemo(() => {
    if (!input.trim()) return 0;
    return input.trim().split(/\s+/).length;
  }, [input]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-3">
      {/* Mode pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-text-secondary">Mode:</span>
        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              mode === m.value
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary hover:bg-surface-hover"
            }`}
          >
            {m.label}
          </button>
        ))}
        {input.trim() && (
          <span className="text-xs text-text-muted ml-auto">
            <span className="font-mono">{wordCount}</span> word{wordCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Two-panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="mb-1">
            <span className="text-xs font-medium text-text-secondary">Input</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text to reverse..."
            className="w-full h-56 p-3 text-sm border border-border rounded-lg bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-text-secondary">Reversed</span>
            {output && (
              <Button size="sm" variant="secondary" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Reversed text will appear here..."
            className="w-full h-56 p-3 text-sm border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted resize-none"
          />
        </div>
      </div>
    </div>
  );
}
