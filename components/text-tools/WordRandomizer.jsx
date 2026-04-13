"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";

function fisherYatesShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SEPARATORS = [
  { label: "Space", value: " " },
  { label: "Newline", value: "\n" },
  { label: "Comma", value: ", " },
];

export default function WordRandomizer() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState(" ");
  const [preserveLines, setPreserveLines] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const wordCount = useMemo(() => {
    if (!input.trim()) return 0;
    return input.trim().split(/\s+/).length;
  }, [input]);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    // shuffleSeed forces re-compute
    void shuffleSeed;

    if (preserveLines) {
      const lines = input.split("\n");
      return lines
        .map((line) => {
          const words = line.split(/\s+/).filter(Boolean);
          return fisherYatesShuffle(words).join(separator === "\n" ? " " : separator);
        })
        .join("\n");
    } else {
      const words = input.split(/\s+/).filter(Boolean);
      return fisherYatesShuffle(words).join(separator);
    }
  }, [input, separator, preserveLines, shuffleSeed]);

  const outputWordCount = output ? output.split(/\s+/).filter(Boolean).length : 0;

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
      {/* Controls row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-text-primary">Separator:</span>
        {SEPARATORS.map((s) => (
          <button
            key={s.label}
            onClick={() => setSeparator(s.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              separator === s.value
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary hover:bg-surface-hover"
            }`}
          >
            {s.label}
          </button>
        ))}
        <span className="mx-1 text-border">|</span>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={preserveLines}
            onChange={(e) => setPreserveLines(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-accent"
          />
          <span className="text-sm text-text-secondary">Preserve line breaks</span>
        </label>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Input</label>
            {wordCount > 0 && (
              <span className="text-xs text-text-muted font-mono">{wordCount} words</span>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShuffleSeed((s) => s + 1);
            }}
            placeholder={"Type or paste your text here...\nWords will be shuffled automatically"}
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Shuffled Output</label>
            <div className="flex items-center gap-2">
              {outputWordCount > 0 && (
                <span className="text-xs text-text-muted font-mono">{outputWordCount} words</span>
              )}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShuffleSeed((s) => s + 1)}
                disabled={!input.trim()}
              >
                Reshuffle
              </Button>
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output.trim()}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Shuffled words will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
