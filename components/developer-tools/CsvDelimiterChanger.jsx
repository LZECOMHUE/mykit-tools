"use client";

import { useState, useMemo, useCallback } from "react";
import Button from "@/components/ui/Button";

const FROM_DELIMITERS = [
  { label: "Auto-detect", value: "auto" },
  { label: "Comma", value: "," },
  { label: "Tab", value: "\t" },
  { label: "Semicolon", value: ";" },
  { label: "Pipe", value: "|" },
];

const TO_DELIMITERS = [
  { label: "Comma", value: "," },
  { label: "Tab", value: "\t" },
  { label: "Semicolon", value: ";" },
  { label: "Pipe", value: "|" },
  { label: "Custom", value: "custom" },
];

function detectDelimiter(text) {
  const firstLine = text.split(/\r?\n/)[0] || "";
  const counts = { ",": 0, "\t": 0, ";": 0, "|": 0 };
  let inQuotes = false;
  for (const ch of firstLine) {
    if (ch === '"') { inQuotes = !inQuotes; continue; }
    if (!inQuotes && ch in counts) counts[ch]++;
  }
  let best = ",";
  let max = 0;
  for (const [d, c] of Object.entries(counts)) {
    if (c > max) { max = c; best = d; }
  }
  return best;
}

function parseCsvLine(line, delimiter) {
  const cells = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        cells.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  cells.push(current);
  return cells;
}

function escapeCell(val, delimiter) {
  if (val.includes(delimiter) || val.includes('"') || val.includes("\n")) {
    return '"' + val.replace(/"/g, '""') + '"';
  }
  return val;
}

export default function CsvDelimiterChanger() {
  const [input, setInput] = useState("");
  const [fromDelimiter, setFromDelimiter] = useState("auto");
  const [toDelimiter, setToDelimiter] = useState("\t");
  const [customDelimiter, setCustomDelimiter] = useState("|");
  const [copied, setCopied] = useState(false);

  const effectiveToDelimiter = toDelimiter === "custom" ? customDelimiter : toDelimiter;

  const { output, rowCount, detectedDelimiter } = useMemo(() => {
    if (!input.trim()) return { output: "", rowCount: 0, detectedDelimiter: null };
    const lines = input.split(/\r?\n/);
    const actualFrom = fromDelimiter === "auto" ? detectDelimiter(input) : fromDelimiter;
    const nonEmpty = lines.filter((l) => l.trim() !== "");
    const converted = nonEmpty.map((line) => {
      const cells = parseCsvLine(line, actualFrom);
      return cells.map((c) => escapeCell(c, effectiveToDelimiter)).join(effectiveToDelimiter);
    });
    return {
      output: converted.join("\n"),
      rowCount: nonEmpty.length,
      detectedDelimiter: fromDelimiter === "auto" ? actualFrom : null,
    };
  }, [input, fromDelimiter, effectiveToDelimiter]);

  const delimiterLabel = (d) => {
    if (d === ",") return "comma";
    if (d === "\t") return "tab";
    if (d === ";") return "semicolon";
    if (d === "|") return "pipe";
    return d;
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-3">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-secondary">From:</span>
          <div className="flex flex-wrap gap-1">
            {FROM_DELIMITERS.map((d) => (
              <button
                key={d.value}
                onClick={() => setFromDelimiter(d.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  fromDelimiter === d.value
                    ? "bg-accent text-white"
                    : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-secondary">To:</span>
          <div className="flex flex-wrap gap-1">
            {TO_DELIMITERS.map((d) => (
              <button
                key={d.value}
                onClick={() => setToDelimiter(d.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  toDelimiter === d.value
                    ? "bg-accent text-white"
                    : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                {d.label}
              </button>
            ))}
            {toDelimiter === "custom" && (
              <input
                type="text"
                value={customDelimiter}
                onChange={(e) => setCustomDelimiter(e.target.value)}
                placeholder="e.g. |"
                className="w-16 px-2 py-1 text-xs border border-border rounded-full bg-white text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              />
            )}
          </div>
        </div>
      </div>

      {/* Two-panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-text-secondary">Input CSV</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"name,age,city\nAlice,30,London\nBob,25,Paris"}
            className="w-full h-64 p-3 font-mono text-sm border border-border rounded-lg bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-text-secondary">Output</span>
            {output && (
              <Button size="sm" variant="secondary" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Converted CSV will appear here..."
            className="w-full h-64 p-3 font-mono text-sm border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted resize-none"
          />
        </div>
      </div>

      {/* Stats */}
      {input.trim() && (
        <div className="flex flex-wrap gap-3 text-xs text-text-secondary">
          <span>
            <span className="font-mono">{rowCount}</span> rows
          </span>
          {detectedDelimiter && (
            <span>
              Detected: <span className="font-mono">{delimiterLabel(detectedDelimiter)}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
