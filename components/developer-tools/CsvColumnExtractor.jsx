"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";

function parseCSV(text) {
  if (!text.trim()) return { headers: [], rows: [] };

  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length === 0) return { headers: [], rows: [] };

  // Simple CSV parser that handles quoted fields
  const parseLine = (line) => {
    const fields = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        fields.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    fields.push(current);
    return fields;
  };

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);

  return { headers, rows };
}

function buildCSV(headers, rows, selectedIndices) {
  const indices = [...selectedIndices].sort((a, b) => a - b);
  if (indices.length === 0) return "";

  const escape = (val) => {
    const str = val || "";
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  };

  const headerLine = indices.map((i) => escape(headers[i])).join(",");
  const dataLines = rows.map((row) =>
    indices.map((i) => escape(row[i] || "")).join(",")
  );

  return [headerLine, ...dataLines].join("\n");
}

export default function CsvColumnExtractor() {
  const [input, setInput] = useState("");
  const [selectedCols, setSelectedCols] = useState(new Set());
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef(null);
  const [parsed, setParsed] = useState({ headers: [], rows: [] });

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const result = parseCSV(input);
      setParsed(result);
      // Auto-select all columns on first parse
      if (result.headers.length > 0) {
        setSelectedCols((prev) => {
          // Only auto-select if there were no previous selections or headers changed
          if (prev.size === 0 || ![...prev].every((i) => i < result.headers.length)) {
            return new Set(result.headers.map((_, i) => i));
          }
          return prev;
        });
      } else {
        setSelectedCols(new Set());
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [input]);

  const output = useMemo(() => {
    if (parsed.headers.length === 0 || selectedCols.size === 0) return "";
    return buildCSV(parsed.headers, parsed.rows, selectedCols);
  }, [parsed, selectedCols]);

  const toggleCol = (index) => {
    setSelectedCols((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedCols(new Set(parsed.headers.map((_, i) => i)));
  };

  const selectNone = () => {
    setSelectedCols(new Set());
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const outputLineCount = output ? output.split("\n").length : 0;

  return (
    <div className="space-y-3">
      {/* Column selector - only show when headers detected */}
      {parsed.headers.length > 0 && (
        <div className="flex items-start gap-2 flex-wrap">
          <span className="text-sm font-medium text-text-primary mt-1">Columns:</span>
          {parsed.headers.map((header, i) => (
            <button
              key={i}
              onClick={() => toggleCol(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCols.has(i)
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {header || `Column ${i + 1}`}
            </button>
          ))}
          <span className="text-border">|</span>
          <button
            onClick={selectAll}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover transition-all"
          >
            All
          </button>
          <button
            onClick={selectNone}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover transition-all"
          >
            None
          </button>
        </div>
      )}

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">CSV Input</label>
            {parsed.headers.length > 0 && (
              <span className="text-xs text-text-muted font-mono">
                {parsed.headers.length} cols, {parsed.rows.length} rows
              </span>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Paste CSV data here...\nname,email,age,city\nAlice,alice@example.com,30,London\nBob,bob@example.com,25,Paris"}
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Extracted Columns</label>
            <div className="flex items-center gap-2">
              {selectedCols.size > 0 && parsed.headers.length > 0 && (
                <span className="text-xs text-text-muted font-mono">
                  {selectedCols.size}/{parsed.headers.length} cols
                  {outputLineCount > 0 ? `, ${outputLineCount} lines` : ""}
                </span>
              )}
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Selected columns will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
