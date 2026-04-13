"use client";

import { useState, useMemo, useCallback } from "react";
import Button from "@/components/ui/Button";

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

function transposeCsv(text) {
  if (!text.trim()) return { output: "", inRows: 0, inCols: 0, outRows: 0, outCols: 0 };
  const delimiter = detectDelimiter(text);
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
  const grid = lines.map((l) => parseCsvLine(l, delimiter));

  const inRows = grid.length;
  const inCols = Math.max(0, ...grid.map((r) => r.length));

  // Pad rows to same length
  const padded = grid.map((r) => {
    while (r.length < inCols) r.push("");
    return r;
  });

  // Transpose
  const transposed = [];
  for (let c = 0; c < inCols; c++) {
    const row = [];
    for (let r = 0; r < inRows; r++) {
      row.push(padded[r][c]);
    }
    transposed.push(row);
  }

  const output = transposed
    .map((row) => row.map((cell) => escapeCell(cell, delimiter)).join(delimiter))
    .join("\n");

  return {
    output,
    inRows,
    inCols,
    outRows: transposed.length,
    outCols: transposed.length > 0 ? transposed[0].length : 0,
  };
}

export default function CsvTranspose() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const { output, inRows, inCols, outRows, outCols } = useMemo(
    () => transposeCsv(input),
    [input]
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-3">
      {/* Dimensions */}
      {input.trim() && (
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span>
            Input: <span className="font-mono">{inRows}</span> rows x{" "}
            <span className="font-mono">{inCols}</span> cols
          </span>
          <span className="text-text-muted">{"->"}</span>
          <span>
            Output: <span className="font-mono">{outRows}</span> rows x{" "}
            <span className="font-mono">{outCols}</span> cols
          </span>
        </div>
      )}

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
            <span className="text-xs font-medium text-text-secondary">Transposed</span>
            {output && (
              <Button size="sm" variant="secondary" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Transposed CSV will appear here..."
            className="w-full h-64 p-3 font-mono text-sm border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted resize-none"
          />
        </div>
      </div>
    </div>
  );
}
