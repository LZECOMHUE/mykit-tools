'use client';

import { useState, useMemo } from 'react';

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER',
  'ON', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'BETWEEN', 'IS', 'NULL',
  'GROUP', 'BY', 'HAVING', 'ORDER', 'ASC', 'DESC', 'LIMIT', 'OFFSET',
  'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE',
  'TABLE', 'ALTER', 'DROP', 'ADD', 'CONSTRAINT', 'PRIMARY', 'KEY',
  'FOREIGN', 'UNIQUE', 'CHECK', 'DEFAULT', 'UNION', 'CASE', 'WHEN',
  'THEN', 'ELSE', 'END', 'AS', 'DISTINCT', 'ALL'
];

function formatSQL(sql, uppercase = true, indentSize = 2) {
  let formatted = sql.trim();

  // Replace multiple spaces with single space
  formatted = formatted.replace(/\s+/g, ' ');

  // Add line breaks before keywords
  SQL_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    formatted = formatted.replace(regex, `\n${keyword}`);
  });

  // Add line breaks after commas in SELECT
  formatted = formatted.replace(/,(\S)/g, ',\n$1');

  // Split into lines
  let lines = formatted.split('\n').filter(line => line.trim());

  // Track indentation level
  let indent = 0;
  let result = [];

  lines.forEach(line => {
    let trimmed = line.trim();

    // Decrease indent for certain keywords
    if (/^(FROM|WHERE|GROUP|HAVING|ORDER|UNION|EXCEPT|INTERSECT)/i.test(trimmed)) {
      indent = Math.max(0, indent - 1);
    }

    // Convert to uppercase if requested
    if (uppercase) {
      trimmed = trimmed.replace(/\b(SELECT|FROM|WHERE|JOIN|ON|AND|OR|GROUP|BY|HAVING|ORDER|LIMIT|INSERT|UPDATE|DELETE|CREATE|TABLE|AS|LEFT|RIGHT|INNER|OUTER|IN|NOT|LIKE|BETWEEN|IS|NULL|VALUES|SET|DISTINCT|UNION|CASE|WHEN|THEN|ELSE|END|PRIMARY|KEY|FOREIGN|UNIQUE|CHECK|DEFAULT|ADD|ALTER|DROP|CONSTRAINT)\b/gi, match => match.toUpperCase());
    }

    // Apply indentation
    const spaces = ' '.repeat(indent * indentSize);
    result.push(spaces + trimmed);

    // Increase indent for certain keywords
    if (/^(SELECT|WHERE|FROM|GROUP|ORDER|JOIN|LEFT|RIGHT|INNER)/i.test(trimmed)) {
      indent += 1;
    }
  });

  return result.join('\n');
}

export default function SQLFormatter() {
  const [input, setInput] = useState('');
  const [uppercase, setUppercase] = useState(true);
  const [indentSize, setIndentSize] = useState(2);
  const [output, setOutput] = useState('');
  const [isProcessed, setIsProcessed] = useState(false);

  useMemo(() => {
    if (!input.trim()) {
      setOutput('');
      setIsProcessed(false);
      return;
    }

    const formatted = formatSQL(input, uppercase, indentSize);
    setOutput(formatted);
    setIsProcessed(true);
  }, [input, uppercase, indentSize]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output).catch(() => {});
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Options Row */}
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="w-4 h-4 rounded accent-accent"
          />
          <span className="text-text-secondary text-sm font-medium">
            Uppercase Keywords
          </span>
        </label>
        <div className="flex items-center gap-2">
          <label className="text-text-secondary text-sm font-medium">Indent</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(parseInt(e.target.value))}
            className="rounded-[var(--radius-input)] border border-border bg-white px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
          </select>
        </div>
      </div>

      {/* Side-by-side layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input */}
        <div className="flex flex-col">
          <label className="text-text-secondary text-xs font-medium mb-1 uppercase">Input SQL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your SQL code here..."
            className="flex-1 min-h-[280px] rounded-[var(--radius-input)] border border-border bg-white p-3 font-mono text-[12px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <label className="text-text-secondary text-xs font-medium uppercase">Formatted</label>
            {output && (
              <button
                onClick={handleCopy}
                className="text-xs text-accent hover:text-accent-hover font-medium"
              >
                Copy
              </button>
            )}
          </div>
          <div className="flex-1 min-h-[280px] rounded-[var(--radius-input)] border border-border bg-surface p-3 overflow-y-auto">
            <pre className="font-mono text-[11px] text-text-primary whitespace-pre-wrap break-words">
              {output || '' }
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
