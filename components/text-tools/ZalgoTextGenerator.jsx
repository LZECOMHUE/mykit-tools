"use client";

import { useState, useMemo, useCallback } from "react";
import Button from "@/components/ui/Button";

// Combining diacritical marks
const MARKS_ABOVE = [];
const MARKS_BELOW = [];
const MARKS_MID = [];

// U+0300-U+0315 above
for (let i = 0x0300; i <= 0x0315; i++) MARKS_ABOVE.push(String.fromCharCode(i));
// U+0316-U+0333 below
for (let i = 0x0316; i <= 0x0333; i++) MARKS_BELOW.push(String.fromCharCode(i));
// U+0334-U+0338 overlay/middle
for (let i = 0x0334; i <= 0x0338; i++) MARKS_MID.push(String.fromCharCode(i));
// More above marks U+0340-U+034E
for (let i = 0x0340; i <= 0x034e; i++) MARKS_ABOVE.push(String.fromCharCode(i));
// More below marks U+0350-U+0362
for (let i = 0x0350; i <= 0x0362; i++) MARKS_BELOW.push(String.fromCharCode(i));

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function zalgoify(text, intensity, direction) {
  let result = "";
  const count = Math.max(1, Math.round(intensity * 1.5));

  for (const char of text) {
    result += char;
    if (char === " " || char === "\n") continue;

    const above = direction === "down" ? 0 : count;
    const below = direction === "up" ? 0 : count;
    const mid = direction === "extreme" ? Math.ceil(count / 2) : (intensity > 5 ? 1 : 0);

    for (let i = 0; i < above; i++) result += randomPick(MARKS_ABOVE);
    for (let i = 0; i < mid; i++) result += randomPick(MARKS_MID);
    for (let i = 0; i < below; i++) result += randomPick(MARKS_BELOW);
  }
  return result;
}

const DIRECTIONS = [
  { label: "Up", value: "up" },
  { label: "Down", value: "down" },
  { label: "Both", value: "both" },
  { label: "Extreme", value: "extreme" },
];

export default function ZalgoTextGenerator() {
  const [input, setInput] = useState("Hello World");
  const [intensity, setIntensity] = useState(5);
  const [direction, setDirection] = useState("both");
  const [copied, setCopied] = useState(false);
  const [seed, setSeed] = useState(0);

  const output = useMemo(
    () => zalgoify(input, intensity, direction),
    // seed forces re-randomization
    [input, intensity, direction, seed]
  );

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
        onChange={(e) => { setInput(e.target.value); setSeed((s) => s + 1); }}
        placeholder="Type text to zalgo-ify..."
        className="w-full px-4 py-3 text-base border border-border rounded-lg bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-48">
          <span className="text-xs font-medium text-text-secondary shrink-0">Intensity:</span>
          <input
            type="range"
            min={1}
            max={10}
            value={intensity}
            onChange={(e) => { setIntensity(Number(e.target.value)); setSeed((s) => s + 1); }}
            className="flex-1 accent-[var(--accent)]"
          />
          <span className="font-mono text-xs text-text-secondary w-5 text-right">{intensity}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-secondary">Direction:</span>
          <div className="flex gap-1">
            {DIRECTIONS.map((d) => (
              <button
                key={d.value}
                onClick={() => { setDirection(d.value); setSeed((s) => s + 1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  direction === d.value
                    ? "bg-accent text-white"
                    : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Output - the hero */}
      <div className="relative min-h-32 bg-surface border border-border rounded-lg flex items-center justify-center overflow-hidden">
        {input ? (
          <p className="text-2xl md:text-3xl text-text-primary text-center break-all leading-relaxed select-all">
            {output}
          </p>
        ) : (
          <p className="text-text-muted text-sm">Type something above...</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={() => setSeed((s) => s + 1)}>
          Regenerate
        </Button>
        {input && (
          <Button size="sm" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </Button>
        )}
      </div>
    </div>
  );
}
