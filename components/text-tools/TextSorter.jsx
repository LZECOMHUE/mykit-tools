"use client";
import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";

const SORT_MODES = [
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" },
  { value: "length-short", label: "Shortest first" },
  { value: "length-long", label: "Longest first" },
  { value: "random", label: "Random" },
];

export default function TextSorter() {
  const [input, setInput] = useState("zebra\napple\nmonkey\nbanana");
  const [sortMode, setSortMode] = useState("az");
  const [randomSeed, setRandomSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const lines = input.split("\n").filter((line) => line.trim() !== "");

    let sorted;
    switch (sortMode) {
      case "az":
        sorted = [...lines].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        break;
      case "za":
        sorted = [...lines].sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
        break;
      case "length-short":
        sorted = [...lines].sort((a, b) => a.length - b.length);
        break;
      case "length-long":
        sorted = [...lines].sort((a, b) => b.length - a.length);
        break;
      case "random":
        void randomSeed;
        sorted = [...lines];
        for (let i = sorted.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
        }
        break;
      default:
        sorted = lines;
    }

    return sorted.join("\n");
  }, [input, sortMode, randomSeed]);

  const inputLineCount = input ? input.split("\n").filter((l) => l.trim()).length : 0;
  const outputLineCount = output ? output.split("\n").filter((l) => l.trim()).length : 0;

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-4">
      {/* Sort mode pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-text-primary">Sort:</span>
        {SORT_MODES.map((mode) => (
          <button
            key={mode.value}
            onClick={() => {
              setSortMode(mode.value);
              if (mode.value === "random") setRandomSeed((s) => s + 1);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              sortMode === mode.value
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary hover:bg-surface-hover"
            }`}
          >
            {mode.label}
          </button>
        ))}
        {sortMode === "random" && (
          <button
            onClick={() => setRandomSeed((s) => s + 1)}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover transition-all"
          >
            Reshuffle
          </button>
        )}
      </div>

      {/* Side-by-side grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Input</label>
            {inputLineCount > 0 && (
              <span className="text-xs text-text-muted font-mono">{inputLineCount} lines</span>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Enter items to sort, one per line\nApple\nBanana\nCherry"}
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Sorted Output</label>
            <div className="flex items-center gap-2">
              {outputLineCount > 0 && (
                <span className="text-xs text-text-muted font-mono">{outputLineCount} lines</span>
              )}
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output.trim()}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Sorted lines will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
