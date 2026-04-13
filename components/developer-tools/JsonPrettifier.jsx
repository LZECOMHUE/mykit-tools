"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

function countKeys(obj) {
  let count = 0;
  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => { count += countKeys(item); });
    } else {
      for (const key of Object.keys(obj)) {
        count++;
        count += countKeys(obj[key]);
      }
    }
  }
  return count;
}

function maxDepth(obj, depth = 0) {
  if (typeof obj !== "object" || obj === null) return depth;
  if (Array.isArray(obj)) {
    return obj.reduce((d, item) => Math.max(d, maxDepth(item, depth + 1)), depth);
  }
  return Object.values(obj).reduce((d, val) => Math.max(d, maxDepth(val, depth + 1)), depth);
}

export default function JsonPrettifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [indent, setIndent] = useState(2);
  const [stats, setStats] = useState(null);
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef(null);

  const INDENT_OPTIONS = [
    { label: "2 spaces", value: 2 },
    { label: "4 spaces", value: 4 },
    { label: "Tab", value: "tab" },
  ];

  const formatJson = useCallback((text, indentVal) => {
    if (!text.trim()) {
      setOutput("");
      setError(null);
      setStats(null);
      return;
    }
    try {
      const parsed = JSON.parse(text);
      const indentChar = indentVal === "tab" ? "\t" : indentVal;
      const formatted = JSON.stringify(parsed, null, indentChar);
      setOutput(formatted);
      setError(null);
      setStats({
        keys: countKeys(parsed),
        depth: maxDepth(parsed),
        length: formatted.length,
      });
    } catch (e) {
      setOutput("");
      setStats(null);
      // Try to extract line/column from error message
      const posMatch = e.message.match(/position\s+(\d+)/i);
      let line = null;
      let col = null;
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const upToPos = text.slice(0, pos);
        line = (upToPos.match(/\n/g) || []).length + 1;
        col = pos - upToPos.lastIndexOf("\n");
      }
      setError({
        message: e.message,
        line,
        col,
      });
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      formatJson(input, indent);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [input, indent, formatJson]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
    } catch {
      // ignore - error already shown
    }
  };

  return (
    <div className="space-y-4">
      {/* Indent pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-text-primary">Indent:</span>
        {INDENT_OPTIONS.map((opt) => (
          <button
            key={opt.label}
            onClick={() => setIndent(opt.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              indent === opt.value
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary hover:bg-surface-hover"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <label className="text-sm font-medium text-text-primary mb-1.5 block">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste or type JSON here...\n{"example": "value"}'
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
          {error && (
            <div className="mt-1.5 text-xs text-red-600">
              <span className="font-medium">Error:</span> {error.message}
              {error.line && (
                <span className="font-mono ml-1">(line {error.line}, col {error.col})</span>
              )}
            </div>
          )}
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Formatted Output</label>
            <div className="flex gap-1.5">
              <Button variant="ghost" size="sm" onClick={handleMinify} disabled={!input.trim()}>
                Minify
              </Button>
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <Card>
          <div className="flex flex-wrap gap-4 text-center">
            <div className="flex-1 min-w-[80px]">
              <p className="text-xs text-text-muted uppercase tracking-wide">Keys</p>
              <p className="font-mono text-lg text-text-primary">{stats.keys.toLocaleString()}</p>
            </div>
            <div className="flex-1 min-w-[80px]">
              <p className="text-xs text-text-muted uppercase tracking-wide">Max Depth</p>
              <p className="font-mono text-lg text-text-primary">{stats.depth}</p>
            </div>
            <div className="flex-1 min-w-[80px]">
              <p className="text-xs text-text-muted uppercase tracking-wide">Characters</p>
              <p className="font-mono text-lg text-text-primary">{stats.length.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
