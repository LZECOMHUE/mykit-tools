"use client";

import { useState, useEffect, useRef } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function JsonMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!input.trim()) {
        setOutput("");
        setError(null);
        return;
      }
      try {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed));
        setError(null);
      } catch (e) {
        setOutput("");
        setError(e.message);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [input]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const inputLen = input.trim().length;
  const outputLen = output.length;
  const reduction = inputLen > 0 && outputLen > 0 ? Math.round((1 - outputLen / inputLen) * 100) : null;

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <label className="text-sm font-medium text-text-primary mb-1.5 block">Input JSON</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste formatted JSON here...\n{\n  "example": "value"\n}'
          className="w-full h-48 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
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
          <label className="text-sm font-medium text-text-primary">Minified Output</label>
          <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output}>
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <textarea
          value={output}
          readOnly
          placeholder="Minified JSON will appear here..."
          className="w-full h-28 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
          spellCheck={false}
        />
      </div>

      {/* Size comparison */}
      {output && (
        <Card>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Original</p>
              <p className="font-mono text-base text-text-primary">{inputLen.toLocaleString()}</p>
              <p className="text-xs text-text-muted mt-0.5">chars</p>
            </div>
            <div className="flex items-center justify-center">
              {reduction !== null && reduction > 0 ? (
                <span className="text-green-600 font-medium text-sm font-mono">-{reduction}%</span>
              ) : (
                <span className="text-text-muted text-lg">&rarr;</span>
              )}
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Minified</p>
              <p className="font-mono text-base text-text-primary">{outputLen.toLocaleString()}</p>
              <p className="text-xs text-text-muted mt-0.5">chars</p>
            </div>
          </div>
        </Card>
      )}

    </div>
  );
}
