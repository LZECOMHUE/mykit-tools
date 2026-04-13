"use client";

import { useState, useMemo, useRef, useEffect } from "react";

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

function delimiterLabel(d) {
  if (d === ",") return "comma";
  if (d === "\t") return "tab";
  if (d === ";") return "semicolon";
  if (d === "|") return "pipe";
  return `"${d}"`;
}

function parseCsvLine(line, delimiter) {
  const cells = [];
  let current = "";
  let inQuotes = false;
  let quoteError = false;
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
  if (inQuotes) quoteError = true;
  return { cells, quoteError };
}

function validateCsv(text) {
  if (!text.trim()) return null;

  const lines = text.split(/\r?\n/);
  const delimiter = detectDelimiter(text);
  const issues = [];
  const colCounts = [];
  let totalRows = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const rowNum = i + 1;

    if (line.trim() === "") {
      if (i < lines.length - 1) {
        issues.push({ row: rowNum, message: "Empty row" });
      }
      continue;
    }

    totalRows++;
    const { cells, quoteError } = parseCsvLine(line, delimiter);
    colCounts.push({ row: rowNum, count: cells.length });

    if (quoteError) {
      issues.push({ row: rowNum, message: "Unclosed quote" });
    }
  }

  // Check inconsistent column counts
  if (colCounts.length > 0) {
    const expected = colCounts[0].count;
    for (const { row, count } of colCounts) {
      if (count !== expected) {
        issues.push({
          row,
          message: `Expected ${expected} columns, found ${count}`,
        });
      }
    }
  }

  return {
    rows: totalRows,
    columns: colCounts.length > 0 ? colCounts[0].count : 0,
    delimiter,
    issues,
    isValid: issues.length === 0,
  };
}

export default function CsvValidator() {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebouncedInput(input), 200);
    return () => clearTimeout(timerRef.current);
  }, [input]);

  const result = useMemo(() => validateCsv(debouncedInput), [debouncedInput]);

  const borderClass = result
    ? result.isValid
      ? "border-green-500 focus:ring-green-500"
      : "border-red-400 focus:ring-red-400"
    : "border-border focus:ring-accent";

  return (
    <div className="space-y-3">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"Paste your CSV here to validate...\n\nname,age,city\nAlice,30,London\nBob,25,Paris"}
        className={`w-full h-72 p-3 font-mono text-sm rounded-lg bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 border-2 resize-none transition-colors ${borderClass}`}
      />

      {result && (
        <div className="space-y-2">
          {/* Summary bar */}
          <div
            className={`flex flex-wrap gap-3 items-center px-3 py-2 rounded-lg text-xs font-medium ${
              result.isValid
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            <span>{result.isValid ? "\u2713 Valid" : "\u2717 Invalid"}</span>
            <span className="text-text-secondary">
              <span className="font-mono">{result.rows}</span> rows
            </span>
            <span className="text-text-secondary">
              <span className="font-mono">{result.columns}</span> columns
            </span>
            <span className="text-text-secondary">
              {delimiterLabel(result.delimiter)}-delimited
            </span>
            {result.issues.length > 0 && (
              <span className="text-red-700">
                <span className="font-mono">{result.issues.length}</span> issue{result.issues.length !== 1 ? "s" : ""} found
              </span>
            )}
          </div>

          {/* Issues list */}
          {result.issues.length > 0 && (
            <div className="space-y-1">
              {result.issues.map((issue, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 px-3 py-1.5 text-xs bg-red-50 rounded text-red-700"
                >
                  <span className="font-mono font-medium shrink-0">
                    Row {issue.row}:
                  </span>
                  <span>{issue.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
