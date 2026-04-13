"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";

export default function StringToBinary() {
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState("text-to-binary");
  const [separator, setSeparator] = useState("space");
  const [copied, setCopied] = useState(false);

  const separators = [
    { label: "Space", value: "space" },
    { label: "None", value: "none" },
    { label: "Newline", value: "newline" },
  ];

  const sepChar = separator === "space" ? " " : separator === "newline" ? "\n" : "";

  const result = useMemo(() => {
    if (!input) return { output: "", bytes: 0, error: null };

    if (direction === "text-to-binary") {
      const encoder = new TextEncoder();
      const encoded = encoder.encode(input);
      const bytes = Array.from(encoded).map((b) => b.toString(2).padStart(8, "0"));
      return {
        output: bytes.join(sepChar),
        bytes: bytes.length,
        error: null,
      };
    } else {
      try {
        const cleaned = input.replace(/[^01]/g, " ").trim();
        const chunks = cleaned.split(/\s+/).filter(Boolean);

        if (chunks.length === 0) return { output: "", bytes: 0, error: null };

        // If no spaces, try splitting into 8-bit chunks
        let binaryChunks = chunks;
        if (chunks.length === 1 && chunks[0].length > 8) {
          const raw = chunks[0];
          binaryChunks = [];
          for (let i = 0; i < raw.length; i += 8) {
            binaryChunks.push(raw.slice(i, i + 8));
          }
        }

        const invalidChunk = binaryChunks.find(
          (c) => c.length !== 8 || !/^[01]+$/.test(c)
        );
        if (invalidChunk) {
          return {
            output: "",
            bytes: 0,
            error: `Invalid binary byte: "${invalidChunk}" - each byte must be exactly 8 bits`,
          };
        }

        const decoder = new TextDecoder();
        const byteArray = new Uint8Array(binaryChunks.map((b) => parseInt(b, 2)));
        const text = decoder.decode(byteArray);

        return { output: text, bytes: binaryChunks.length, error: null };
      } catch {
        return { output: "", bytes: 0, error: "Invalid binary input" };
      }
    }
  }, [input, direction, sepChar]);

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
            { label: "Text \u2192 Binary", value: "text-to-binary" },
            { label: "Binary \u2192 Text", value: "binary-to-text" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setDirection(opt.value);
                setInput("");
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                direction === opt.value
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {direction === "text-to-binary" && (
          <div className="flex items-center gap-1.5">
            <span className="text-text-secondary">Separator</span>
            {separators.map((s) => (
              <button
                key={s.value}
                onClick={() => setSeparator(s.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  separator === s.value
                    ? "bg-accent text-white"
                    : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-text-muted mb-1.5 font-mono">
            {direction === "text-to-binary" ? "Text" : "Binary"}
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              direction === "text-to-binary"
                ? "Type text to convert..."
                : "Paste binary (e.g. 01001000 01101001)..."
            }
            rows={14}
            className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-white text-sm text-text-primary placeholder:text-text-muted outline-none resize-y focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-text-muted font-mono">
              {result.bytes > 0
                ? `${result.bytes} byte${result.bytes !== 1 ? "s" : ""}`
                : direction === "text-to-binary" ? "Binary" : "Text"}
            </span>
            {result.output && (
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
          <textarea
            value={result.error || result.output}
            readOnly
            rows={14}
            placeholder={
              direction === "text-to-binary"
                ? "Binary output appears here..."
                : "Decoded text appears here..."
            }
            className={`w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-surface text-sm placeholder:text-text-muted outline-none resize-y font-mono ${
              result.error ? "text-error" : "text-text-primary"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
