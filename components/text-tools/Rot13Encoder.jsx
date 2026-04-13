"use client";

import { useState, useMemo, useCallback } from "react";
import Button from "@/components/ui/Button";

function rot13(text) {
  return text.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
  });
}

function rot5(text) {
  return text.replace(/[0-9]/g, (ch) => {
    return String.fromCharCode(((ch.charCodeAt(0) - 48 + 5) % 10) + 48);
  });
}

function rot47(text) {
  return text.replace(/[!-~]/g, (ch) => {
    return String.fromCharCode(((ch.charCodeAt(0) - 33 + 47) % 94) + 33);
  });
}

const MODES = [
  { label: "ROT13", value: "rot13", desc: "Letters only" },
  { label: "ROT5", value: "rot5", desc: "Digits only" },
  { label: "ROT13+5", value: "rot13+5", desc: "Letters + digits" },
  { label: "ROT47", value: "rot47", desc: "All printable ASCII" },
];

export default function Rot13Encoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("rot13");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    switch (mode) {
      case "rot13":
        return rot13(input);
      case "rot5":
        return rot5(input);
      case "rot13+5":
        return rot5(rot13(input));
      case "rot47":
        return rot47(input);
      default:
        return input;
    }
  }, [input, mode]);

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
            title={m.desc}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Two-panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-text-secondary">Input</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text to encode..."
            className="w-full h-56 p-3 font-mono text-sm border border-border rounded-lg bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-text-secondary">
              {mode.toUpperCase()} Output
            </span>
            {output && (
              <Button size="sm" variant="secondary" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Encoded output will appear here..."
            className="w-full h-56 p-3 font-mono text-sm border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted resize-none"
          />
        </div>
      </div>

      {/* Fun fact */}
      <p className="text-xs text-text-muted italic">
        ROT13 is its own inverse - encoding and decoding use the same operation. It was famously used on Usenet to hide spoilers and punchlines.
      </p>
    </div>
  );
}
