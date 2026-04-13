"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const SORT_MODES = [
  { label: "A-Z", value: "az" },
  { label: "Z-A", value: "za" },
  { label: "Numeric \u2191", value: "num-asc" },
  { label: "Numeric \u2193", value: "num-desc" },
  { label: "Short first", value: "len-asc" },
  { label: "Long first", value: "len-desc" },
  { label: "Random", value: "random" },
];

function extractNumber(line) {
  const match = line.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

export default function SortLines() {
  const [input, setInput] = useState("");
  const [sortMode, setSortMode] = useState("az");
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [randomSeed, setRandomSeed] = useState(0);

  const output = useMemo(() => {
    let lines = input.split("\n");

    if (removeEmpty) {
      lines = lines.filter((l) => l.trim() !== "");
    }

    if (removeDuplicates) {
      if (caseInsensitive) {
        const seen = new Set();
        lines = lines.filter((l) => {
          const lower = l.toLowerCase();
          if (seen.has(lower)) return false;
          seen.add(lower);
          return true;
        });
      } else {
        lines = [...new Set(lines)];
      }
    }

    switch (sortMode) {
      case "az":
        lines.sort((a, b) =>
          caseInsensitive
            ? a.toLowerCase().localeCompare(b.toLowerCase())
            : a.localeCompare(b)
        );
        break;
      case "za":
        lines.sort((a, b) =>
          caseInsensitive
            ? b.toLowerCase().localeCompare(a.toLowerCase())
            : b.localeCompare(a)
        );
        break;
      case "num-asc":
        lines.sort((a, b) => extractNumber(a) - extractNumber(b));
        break;
      case "num-desc":
        lines.sort((a, b) => extractNumber(b) - extractNumber(a));
        break;
      case "len-asc":
        lines.sort((a, b) => a.length - b.length);
        break;
      case "len-desc":
        lines.sort((a, b) => b.length - a.length);
        break;
      case "random":
        // Fisher-Yates shuffle - randomSeed forces re-compute
        void randomSeed;
        for (let i = lines.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        break;
    }

    return lines.join("\n");
  }, [input, sortMode, removeDuplicates, removeEmpty, caseInsensitive, randomSeed]);

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

      {/* Option toggles */}
      <div className="flex items-center gap-4 flex-wrap">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeDuplicates}
            onChange={(e) => setRemoveDuplicates(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-accent"
          />
          <span className="text-sm text-text-secondary">Remove duplicates</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-accent"
          />
          <span className="text-sm text-text-secondary">Remove empty lines</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseInsensitive}
            onChange={(e) => setCaseInsensitive(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-accent"
          />
          <span className="text-sm text-text-secondary">Case insensitive</span>
        </label>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            placeholder={"Enter text with one item per line...\nApple\nBanana\nCherry"}
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

      {/* Stats */}
      {inputLineCount > 0 && inputLineCount !== outputLineCount && (
        <Card>
          <p className="text-sm text-text-secondary text-center">
            <span className="font-mono">{inputLineCount}</span> input lines &rarr; <span className="font-mono">{outputLineCount}</span> output lines
            {inputLineCount > outputLineCount && (
              <span className="text-text-muted ml-1">
                ({inputLineCount - outputLineCount} removed)
              </span>
            )}
          </p>
        </Card>
      )}
    </div>
  );
}
