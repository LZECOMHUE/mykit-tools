"use client";
import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";

const MODES = [
  { value: "characters", label: "Characters" },
  { value: "words", label: "Words" },
  { value: "lines", label: "Lines" },
];

export default function TextReverser() {
  const [input, setInput] = useState("Hello World");
  const [reverseMode, setReverseMode] = useState("characters");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    switch (reverseMode) {
      case "characters":
        return input.split("").reverse().join("");
      case "words":
        return input.split(/\s+/).reverse().join(" ");
      case "lines":
        return input.split("\n").reverse().join("\n");
      default:
        return input;
    }
  }, [input, reverseMode]);

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
      {/* Mode pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-text-primary">Reverse by:</span>
        {MODES.map((mode) => (
          <button
            key={mode.value}
            onClick={() => setReverseMode(mode.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              reverseMode === mode.value
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary hover:bg-surface-hover"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Side-by-side grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to reverse"
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Reversed Output</label>
            <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Reversed text will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
