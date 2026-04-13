"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";

export default function RemoveExtraSpaces() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("collapse");
  const [copied, setCopied] = useState(false);

  const modes = [
    { label: "Collapse spaces", value: "collapse" },
    { label: "Remove all spaces", value: "remove-all" },
    { label: "Trim lines", value: "trim" },
  ];

  const result = useMemo(() => {
    if (!input) return { output: "", removed: 0 };

    let output;
    let removed = 0;

    if (mode === "collapse") {
      const lines = input.split("\n");
      const processed = lines.map((line) => {
        const collapsed = line.replace(/ {2,}/g, " ");
        return collapsed;
      });
      output = processed.join("\n");
      const originalSpaces = (input.match(/ /g) || []).length;
      const newSpaces = (output.match(/ /g) || []).length;
      removed = originalSpaces - newSpaces;
    } else if (mode === "remove-all") {
      output = input.replace(/ /g, "");
      removed = (input.match(/ /g) || []).length;
    } else {
      const lines = input.split("\n");
      const processed = lines.map((line) => line.replace(/^[ \t]+|[ \t]+$/g, ""));
      output = processed.join("\n");
      const originalLen = input.length;
      const newLen = output.length;
      removed = originalLen - newLen;
    }

    return { output, removed };
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1.5">
        {modes.map((m) => (
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text with extra spaces..."
          rows={14}
          className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-white text-sm text-text-primary placeholder:text-text-muted outline-none resize-y focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono"
        />
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-text-muted font-mono">
              {input && result.removed > 0
                ? `Removed ${result.removed} extra space${result.removed !== 1 ? "s" : ""}`
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
