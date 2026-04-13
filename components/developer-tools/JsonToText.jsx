"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";

const EXTRACT_MODES = [
  { label: "Values only", value: "values" },
  { label: "Keys and values", value: "keys-values" },
  { label: "Paths and values", value: "paths-values" },
];

function extractValues(obj, mode, path = "") {
  const lines = [];

  if (obj === null || obj === undefined) return lines;

  if (typeof obj === "string") {
    if (mode === "values") {
      lines.push(obj);
    } else if (mode === "keys-values") {
      const key = path.split(".").pop() || "";
      lines.push(key ? `${key}: ${obj}` : obj);
    } else {
      lines.push(path ? `${path}: ${obj}` : obj);
    }
    return lines;
  }

  if (typeof obj === "number" || typeof obj === "boolean") {
    const str = String(obj);
    if (mode === "values") {
      lines.push(str);
    } else if (mode === "keys-values") {
      const key = path.split(".").pop() || "";
      lines.push(key ? `${key}: ${str}` : str);
    } else {
      lines.push(path ? `${path}: ${str}` : str);
    }
    return lines;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      const newPath = path ? `${path}[${i}]` : `[${i}]`;
      lines.push(...extractValues(item, mode, newPath));
    });
    return lines;
  }

  if (typeof obj === "object") {
    for (const [key, value] of Object.entries(obj)) {
      const newPath = path ? `${path}.${key}` : key;
      lines.push(...extractValues(value, mode, newPath));
    }
  }

  return lines;
}

export default function JsonToText() {
  const [input, setInput] = useState("");
  const [extractMode, setExtractMode] = useState("values");
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef(null);
  const [parsedObj, setParsedObj] = useState(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!input.trim()) {
        setParsedObj(null);
        setError(null);
        return;
      }
      try {
        const parsed = JSON.parse(input);
        setParsedObj(parsed);
        setError(null);
      } catch (e) {
        setParsedObj(null);
        setError(e.message);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [input]);

  const output = useMemo(() => {
    if (parsedObj === null) return "";
    const lines = extractValues(parsedObj, extractMode);
    return lines.join("\n");
  }, [parsedObj, extractMode]);

  const lineCount = output ? output.split("\n").length : 0;

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-3">
      {/* Mode pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-text-primary">Extract:</span>
        {EXTRACT_MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => setExtractMode(m.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              extractMode === m.value
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary hover:bg-surface-hover"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">JSON Input</label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'Paste JSON here...\n{\n  "name": "Alice",\n  "items": ["one", "two"]\n}'}
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
          {error && (
            <p className="mt-1.5 text-xs text-red-600">
              <span className="font-medium">Invalid JSON:</span> {error}
            </p>
          )}
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Plain Text Output</label>
            <div className="flex items-center gap-2">
              {lineCount > 0 && (
                <span className="text-xs text-text-muted font-mono">{lineCount} lines</span>
              )}
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Extracted text will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
