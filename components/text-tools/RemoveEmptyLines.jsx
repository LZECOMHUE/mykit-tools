"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import Toggle from "@/components/ui/Toggle";

export default function RemoveEmptyLines() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("remove-all");
  const [trimWhitespaceLines, setTrimWhitespaceLines] = useState(true);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input) return { output: "", removed: 0 };

    let lines = input.split("\n");
    const originalCount = lines.length;

    if (trimWhitespaceLines) {
      lines = lines.map((line) => (line.trim() === "" ? "" : line));
    }

    let filtered;
    if (mode === "remove-all") {
      filtered = lines.filter((line) => line !== "");
    } else {
      filtered = [];
      let lastWasEmpty = false;
      for (const line of lines) {
        if (line === "") {
          if (!lastWasEmpty) {
            filtered.push(line);
          }
          lastWasEmpty = true;
        } else {
          filtered.push(line);
          lastWasEmpty = false;
        }
      }
    }

    return {
      output: filtered.join("\n"),
      removed: originalCount - filtered.length,
    };
  }, [input, mode, trimWhitespaceLines]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-1.5">
          {[
            { label: "Remove all empty lines", value: "remove-all" },
            { label: "Collapse to single", value: "collapse" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                mode === opt.value
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <Toggle
          label="Trim whitespace-only lines"
          checked={trimWhitespaceLines}
          onChange={setTrimWhitespaceLines}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text with empty lines..."
          rows={14}
          className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-white text-sm text-text-primary placeholder:text-text-muted outline-none resize-y focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono"
        />
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-text-muted font-mono">
              {input && result.removed > 0
                ? `Removed ${result.removed} empty line${result.removed !== 1 ? "s" : ""}`
                : ""}
            </span>
            {result.output && (
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
          <textarea
            value={result.output}
            readOnly
            rows={14}
            placeholder="Cleaned output appears here..."
            className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-surface text-sm text-text-primary placeholder:text-text-muted outline-none resize-y font-mono"
          />
        </div>
      </div>
    </div>
  );
}
