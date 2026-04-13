"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function SumCalculator() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const numbers = useMemo(() => {
    if (!input.trim()) return [];
    const matches = input.match(/-?\d+\.?\d*/g);
    if (!matches) return [];
    return matches.map(Number).filter((n) => !isNaN(n));
  }, [input]);

  const stats = useMemo(() => {
    if (numbers.length === 0) {
      return { sum: 0, avg: 0, min: 0, max: 0, count: 0 };
    }
    const sum = numbers.reduce((a, b) => a + b, 0);
    return {
      sum,
      avg: sum / numbers.length,
      min: Math.min(...numbers),
      max: Math.max(...numbers),
      count: numbers.length,
    };
  }, [numbers]);

  const sorted = useMemo(() => [...numbers].sort((a, b) => a - b), [numbers]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(stats.sum).catch(() => {}));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const formatNum = (n) => {
    if (Number.isInteger(n)) return n.toLocaleString();
    return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const statCards = [
    { label: "Sum", value: stats.sum },
    { label: "Average", value: stats.avg },
    { label: "Min", value: stats.min },
    { label: "Max", value: stats.max },
    { label: "Count", value: stats.count },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-text-muted block mb-1">
          Input Numbers
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste numbers here - one per line, comma-separated, or mixed in with text"
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-y font-mono text-sm"
        />
        <p className="text-xs text-text-muted mt-1">
          Numbers are automatically extracted from any text - percentages, currencies, and non-numeric text are ignored.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {statCards.map((s) => (
          <Card key={s.label} className="text-center">
            <p className="text-xs text-text-muted uppercase tracking-wide mb-1">
              {s.label}
            </p>
            <p className="font-mono text-lg text-text-primary font-medium">
              {formatNum(s.value)}
            </p>
          </Card>
        ))}
      </div>

      {/* Copy sum button */}
      <div className="flex gap-2">
        <Button onClick={handleCopy} disabled={numbers.length === 0}>
          {copied ? "Copied!" : "Copy Sum"}
        </Button>
        {input && (
          <Button variant="ghost" onClick={() => setInput("")}>
            Clear
          </Button>
        )}
      </div>

      {/* Extracted numbers */}
      {numbers.length > 0 && (
        <Card>
          <p className="text-sm font-medium text-text-primary mb-2">
            Extracted Numbers (sorted)
          </p>
          <div className="flex flex-wrap gap-2">
            {sorted.map((n, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-surface rounded-full text-xs font-mono text-text-secondary"
              >
                {formatNum(n)}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
