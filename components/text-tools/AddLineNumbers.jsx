"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";

export default function AddLineNumbers() {
  const [input, setInput] = useState("");
  const [startFrom, setStartFrom] = useState(1);
  const [separator, setSeparator] = useState(". ");
  const [padNumbers, setPadNumbers] = useState(true);
  const [copied, setCopied] = useState(false);

  const separatorOptions = [
    { label: ". ", value: ". " },
    { label: ": ", value: ": " },
    { label: ") ", value: ") " },
    { label: "Tab", value: "\t" },
  ];

  const result = useMemo(() => {
    if (!input) return { output: "", lineCount: 0 };
    const lines = input.split("\n");
    const maxNum = startFrom + lines.length - 1;
    const maxWidth = String(maxNum).length;

    const numbered = lines.map((line, i) => {
      const num = startFrom + i;
      const numStr = padNumbers ? String(num).padStart(maxWidth, " ") : String(num);
      return `${numStr}${separator}${line}`;
    });

    return { output: numbered.join("\n"), lineCount: lines.length };
  }, [input, startFrom, separator, padNumbers]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-text-secondary">Start from</span>
          {[1, 0].map((n) => (
            <button
              key={n}
              onClick={() => setStartFrom(n)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                startFrom === n
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-text-secondary">Separator</span>
          {separatorOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSeparator(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                separator === opt.value
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setPadNumbers(!padNumbers)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            padNumbers
              ? "bg-accent text-white"
              : "bg-surface text-text-secondary hover:bg-surface-hover"
          }`}
        >
          Pad numbers
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            rows={14}
            className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-white text-sm text-text-primary placeholder:text-text-muted outline-none resize-y focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-text-muted font-mono">
              {result.lineCount > 0 ? `${result.lineCount} lines` : ""}
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
            placeholder="Numbered output appears here..."
            className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-surface text-sm text-text-primary placeholder:text-text-muted outline-none resize-y font-mono"
          />
        </div>
      </div>
    </div>
  );
}
