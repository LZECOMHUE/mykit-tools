"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";

export default function LinePrefixSuffix() {
  const [input, setInput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input) return { output: "", lineCount: 0 };
    const lines = input.split("\n");
    const transformed = lines.map((line) => `${prefix}${line}${suffix}`);
    return { output: transformed.join("\n"), lineCount: lines.length };
  }, [input, prefix, suffix]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5">
          <label className="text-sm text-text-secondary">Prefix</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder='e.g. "- " or "<li>"'
            className="w-40 px-2.5 py-1.5 rounded-[var(--radius-input)] border border-border bg-white text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <label className="text-sm text-text-secondary">Suffix</label>
          <input
            type="text"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            placeholder='e.g. ";" or "</li>"'
            className="w-40 px-2.5 py-1.5 rounded-[var(--radius-input)] border border-border bg-white text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here..."
          rows={14}
          className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-white text-sm text-text-primary placeholder:text-text-muted outline-none resize-y focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono"
        />
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
            placeholder="Prefixed/suffixed output appears here..."
            className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-surface text-sm text-text-primary placeholder:text-text-muted outline-none resize-y font-mono"
          />
        </div>
      </div>
    </div>
  );
}
