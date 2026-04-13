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

function countArrays(obj) {
  let count = 0;
  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      count++;
      obj.forEach((item) => { count += countArrays(item); });
    } else {
      Object.values(obj).forEach((val) => { count += countArrays(val); });
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

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null); // { valid, error, stats }
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef(null);

  const validate = useCallback((text) => {
    if (!text.trim()) {
      setResult(null);
      return;
    }
    try {
      const parsed = JSON.parse(text);
      const formatted = JSON.stringify(parsed, null, 2);
      setResult({
        valid: true,
        formatted,
        stats: {
          keys: countKeys(parsed),
          arrays: countArrays(parsed),
          depth: maxDepth(parsed),
          size: new Blob([text]).size,
          type: Array.isArray(parsed) ? "Array" : typeof parsed === "object" && parsed !== null ? "Object" : typeof parsed,
        },
      });
    } catch (e) {
      const posMatch = e.message.match(/position\s+(\d+)/i);
      let line = null;
      let col = null;
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const upToPos = text.slice(0, pos);
        line = (upToPos.match(/\n/g) || []).length + 1;
        col = pos - upToPos.lastIndexOf("\n");
      }
      setResult({
        valid: false,
        error: {
          message: e.message,
          line,
          col,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      validate(input);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [input, validate]);

  const handleFormat = () => {
    if (result?.valid && result.formatted) {
      setInput(result.formatted);
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  const handleCopy = async () => {
    if (!result?.formatted) return;
    try {
      await navigator.clipboard.writeText(result.formatted).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleFormat}
          disabled={!result?.valid}
        >
          Format
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          disabled={!result?.valid}
        >
          {copied ? "Copied!" : "Copy Formatted"}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleClear} disabled={!input}>
          Clear
        </Button>
      </div>

      {/* Textarea */}
      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste JSON to validate...\n{"example": [1, 2, 3]}'
          className={`w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border rounded-[var(--radius-input)] resize-none focus:outline-none focus:ring-1 ${
            result === null
              ? "border-border focus:border-accent focus:ring-accent"
              : result.valid
              ? "border-green-300 focus:border-green-400 focus:ring-green-400"
              : "border-red-300 focus:border-red-400 focus:ring-red-400"
          }`}
          spellCheck={false}
        />
      </div>

      {/* Valid state */}
      {result?.valid && (
        <>
          <Card className="border-green-200 bg-green-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold shrink-0">
                &#10003;
              </div>
              <div>
                <p className="font-medium text-text-primary">Valid JSON</p>
                <p className="text-xs text-text-secondary mt-0.5">
                  Root type: <span className="font-mono">{result.stats.type}</span>
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide">Keys</p>
                <p className="font-mono text-lg text-text-primary">{result.stats.keys.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide">Arrays</p>
                <p className="font-mono text-lg text-text-primary">{result.stats.arrays}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide">Max Depth</p>
                <p className="font-mono text-lg text-text-primary">{result.stats.depth}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide">Size</p>
                <p className="font-mono text-lg text-text-primary">{formatBytes(result.stats.size)}</p>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Invalid state */}
      {result && !result.valid && (
        <Card className="border-red-200 bg-red-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xl font-bold shrink-0">
              &#10007;
            </div>
            <div>
              <p className="font-medium text-text-primary">Invalid JSON</p>
              <p className="text-sm text-red-700 mt-1 font-mono">{result.error.message}</p>
              {result.error.line && (
                <p className="text-xs text-text-secondary mt-1">
                  At line <span className="font-mono">{result.error.line}</span>, column <span className="font-mono">{result.error.col}</span>
                </p>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
