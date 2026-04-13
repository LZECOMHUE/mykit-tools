"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Button from "@/components/ui/Button";
import Toggle from "@/components/ui/Toggle";

function detectDelimiter(firstLine) {
  const counts = { ",": 0, "\t": 0, ";": 0 };
  for (const ch of firstLine) {
    if (ch in counts) counts[ch]++;
  }
  if (counts["\t"] > counts[","] && counts["\t"] > counts[";"]) return "\t";
  if (counts[";"] > counts[","]) return ";";
  return ",";
}

function parseCSVLine(line, delimiter) {
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

function csvToJson(csvStr, firstRowHeaders, format) {
  const lines = csvStr.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length === 0) return { json: "", rows: 0, cols: 0 };

  const delimiter = detectDelimiter(lines[0]);
  const parsed = lines.map((line) => parseCSVLine(line, delimiter));

  let result;
  let cols = 0;

  if (firstRowHeaders && parsed.length > 1) {
    const headers = parsed[0];
    cols = headers.length;
    result = parsed.slice(1).map((row) => {
      const obj = {};
      headers.forEach((h, i) => {
        const val = row[i] !== undefined ? row[i] : "";
        // Auto-convert numbers
        const num = Number(val);
        obj[h] = val !== "" && !isNaN(num) && isFinite(num) ? num : val;
      });
      return obj;
    });
  } else {
    cols = parsed.length > 0 ? parsed[0].length : 0;
    result = parsed.map((row) =>
      row.map((val) => {
        const num = Number(val);
        return val !== "" && !isNaN(num) && isFinite(num) ? num : val;
      })
    );
  }

  const indent = format === "pretty" ? 2 : undefined;
  return {
    json: JSON.stringify(result, null, indent),
    rows: firstRowHeaders ? parsed.length - 1 : parsed.length,
    cols,
  };
}

export default function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [firstRowHeaders, setFirstRowHeaders] = useState(true);
  const [format, setFormat] = useState("pretty");
  const [rowCount, setRowCount] = useState(0);
  const [colCount, setColCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef(null);

  const convert = useCallback((text, headers, fmt) => {
    if (!text.trim()) {
      setOutput("");
      setError(null);
      setRowCount(0);
      setColCount(0);
      return;
    }
    try {
      const { json, rows, cols } = csvToJson(text, headers, fmt);
      setOutput(json);
      setError(null);
      setRowCount(rows);
      setColCount(cols);
    } catch (e) {
      setOutput("");
      setRowCount(0);
      setColCount(0);
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => convert(input, firstRowHeaders, format), 300);
    return () => clearTimeout(debounceRef.current);
  }, [input, firstRowHeaders, format, convert]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="space-y-3">
      {/* Options row */}
      <div className="flex flex-wrap items-center gap-3">
        <Toggle label="First row is headers" checked={firstRowHeaders} onChange={setFirstRowHeaders} />
        <div className="flex gap-1">
          {[
            { label: "Pretty", value: "pretty" },
            { label: "Compact", value: "compact" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFormat(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                format === f.value
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {rowCount > 0 && (
          <span className="text-xs font-mono text-text-muted ml-auto">
            {rowCount} rows, {colCount} cols
          </span>
        )}
      </div>

      {/* Two panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* CSV input */}
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"name,age,city\nAlice,30,London\nBob,25,Paris"}
            spellCheck={false}
            className={`w-full h-64 md:h-80 font-mono text-sm p-3 rounded-xl border resize-none focus:outline-none focus:border-accent ${
              error ? "border-error/50 bg-error/5" : "border-border bg-surface"
            }`}
          />
          {error && <p className="text-xs text-error mt-1">{error}</p>}
        </div>

        {/* JSON output */}
        <div>
          <textarea
            value={output}
            readOnly
            placeholder="JSON output will appear here"
            className="w-full h-64 md:h-80 font-mono text-sm p-3 rounded-xl border border-border bg-surface resize-none focus:outline-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button size="sm" onClick={handleCopy} disabled={!output}>
          {copied ? "Copied!" : "Copy JSON"}
        </Button>
      </div>
    </div>
  );
}
