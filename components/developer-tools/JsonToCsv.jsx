"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Button from "@/components/ui/Button";
import Toggle from "@/components/ui/Toggle";

const DELIMITERS = [
  { label: "Comma", value: "," },
  { label: "Tab", value: "\t" },
  { label: "Semicolon", value: ";" },
];

function flattenObject(obj, prefix = "") {
  const result = {};
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val, fullKey));
    } else {
      result[fullKey] = val;
    }
  }
  return result;
}

function escapeCSV(val, delimiter) {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.includes(delimiter) || str.includes('"') || str.includes("\n")) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function jsonToCsv(jsonStr, delimiter, includeHeaders) {
  const parsed = JSON.parse(jsonStr);

  if (!Array.isArray(parsed)) {
    throw new Error("JSON must be an array. Got " + typeof parsed);
  }

  if (parsed.length === 0) return { csv: "", rows: 0 };

  // Array of arrays
  if (Array.isArray(parsed[0])) {
    const lines = parsed.map((row) =>
      row.map((cell) => escapeCSV(cell, delimiter)).join(delimiter)
    );
    return { csv: lines.join("\n"), rows: parsed.length };
  }

  // Array of objects - flatten nested
  const flattened = parsed.map((item) =>
    typeof item === "object" && item !== null ? flattenObject(item) : { value: item }
  );

  const headers = [...new Set(flattened.flatMap((row) => Object.keys(row)))];
  const lines = [];

  if (includeHeaders) {
    lines.push(headers.map((h) => escapeCSV(h, delimiter)).join(delimiter));
  }

  for (const row of flattened) {
    lines.push(
      headers.map((h) => escapeCSV(row[h], delimiter)).join(delimiter)
    );
  }

  return { csv: lines.join("\n"), rows: flattened.length };
}

export default function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [delimiter, setDelimiter] = useState(",");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef(null);
  const prevUrlRef = useRef(null);

  const convert = useCallback((text, delim, headers) => {
    if (!text.trim()) {
      setOutput("");
      setError(null);
      setRowCount(0);
      return;
    }
    try {
      const { csv, rows } = jsonToCsv(text, delim, headers);
      setOutput(csv);
      setError(null);
      setRowCount(rows);
    } catch (e) {
      setOutput("");
      setRowCount(0);
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => convert(input, delimiter, includeHeaders), 300);
    return () => clearTimeout(debounceRef.current);
  }, [input, delimiter, includeHeaders, convert]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleDownload = () => {
    if (!output) return;
    if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    const blob = new Blob([output], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    prevUrlRef.current = url;
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
  };

  return (
    <div className="space-y-3">
      {/* Options row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1">
          {DELIMITERS.map((d) => (
            <button
              key={d.value}
              onClick={() => setDelimiter(d.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                delimiter === d.value
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <Toggle label="Include headers" checked={includeHeaders} onChange={setIncludeHeaders} />
        {rowCount > 0 && (
          <span className="text-xs font-mono text-text-muted ml-auto">{rowCount} rows</span>
        )}
      </div>

      {/* Two panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* JSON input */}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'[\n  { "name": "Alice", "age": 30 },\n  { "name": "Bob", "age": 25 }\n]'}
            spellCheck={false}
            className={`w-full h-64 md:h-80 font-mono text-sm p-3 rounded-xl border resize-none focus:outline-none focus:border-accent ${
              error ? "border-error/50 bg-error/5" : "border-border bg-surface"
            }`}
          />
          {error && (
            <p className="text-xs text-error mt-1">{error}</p>
          )}
        </div>

        {/* CSV output */}
        <div className="relative">
          <textarea
            value={output}
            readOnly
            placeholder="CSV output will appear here"
            className="w-full h-64 md:h-80 font-mono text-sm p-3 rounded-xl border border-border bg-surface resize-none focus:outline-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button size="sm" onClick={handleCopy} disabled={!output}>
          {copied ? "Copied!" : "Copy CSV"}
        </Button>
        <Button variant="secondary" size="sm" onClick={handleDownload} disabled={!output}>
          Download .csv
        </Button>
      </div>
    </div>
  );
}
