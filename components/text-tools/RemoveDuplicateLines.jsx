'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

export default function RemoveDuplicateLines() {
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [sortOutput, setSortOutput] = useState(false);
  const [keepFirst, setKeepFirst] = useState(true);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input) return { output: '', stats: { original: 0, duplicates: 0, unique: 0 } };

    let lines = input.split('\n');
    const originalCount = lines.length;

    if (trimWhitespace) {
      lines = lines.map((line) => line.trim());
    }

    const seen = new Set();
    const seenCaseInsensitive = new Set();
    let duplicateCount = 0;
    const deduplicated = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      const caseInsensitiveKey = line.toLowerCase();

      if (keepFirst) {
        if (!seen.has(key)) {
          seen.add(key);
          deduplicated.push(line);
        } else {
          duplicateCount++;
        }
      } else {
        if (seenCaseInsensitive.has(caseInsensitiveKey)) {
          duplicateCount++;
        } else {
          seenCaseInsensitive.add(caseInsensitiveKey);
          deduplicated.push(line);
        }
      }
    }

    let finalLines = deduplicated;
    if (sortOutput) {
      finalLines = [...deduplicated].sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );
    }

    while (finalLines.length > 0 && finalLines[finalLines.length - 1] === '') {
      finalLines.pop();
    }

    return {
      output: finalLines.join('\n'),
      stats: {
        original: originalCount,
        duplicates: duplicateCount,
        unique: deduplicated.length,
      },
    };
  }, [input, caseSensitive, trimWhitespace, sortOutput, keepFirst]);

  const handleCopy = async () => {
    if (!result.output) return;
    try {
      await navigator.clipboard.writeText(result.output).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const inputLineCount = input ? input.split('\n').length : 0;

  return (
    <div className="space-y-4">
      {/* Option toggles as compact row */}
      <div className="flex items-center gap-4 flex-wrap">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-accent"
          />
          <span className="text-sm text-text-secondary">Case sensitive</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimWhitespace}
            onChange={(e) => setTrimWhitespace(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-accent"
          />
          <span className="text-sm text-text-secondary">Trim whitespace</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sortOutput}
            onChange={(e) => setSortOutput(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-accent"
          />
          <span className="text-sm text-text-secondary">Sort output</span>
        </label>
        <span className="text-sm text-text-muted">Keep:</span>
        {[
          { value: true, label: 'First occurrence' },
          { value: false, label: 'Remove all dupes' },
        ].map((opt) => (
          <button
            key={String(opt.value)}
            onClick={() => setKeepFirst(opt.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              keepFirst === opt.value
                ? 'bg-accent text-white'
                : 'bg-surface text-text-secondary hover:bg-surface-hover'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Side-by-side grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Input</label>
            {inputLineCount > 0 && (
              <span className="text-xs text-text-muted font-mono">{inputLineCount} lines</span>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'Paste text here, one line per item...\napple\nbanana\napple\ncherry'}
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Deduplicated Output</label>
            <div className="flex items-center gap-2">
              {result.stats.unique > 0 && (
                <span className="text-xs text-text-muted font-mono">{result.stats.unique} lines</span>
              )}
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!result.output}>
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          <textarea
            value={result.output}
            readOnly
            placeholder="Deduplicated lines will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Inline stats */}
      {result.stats.original > 0 && result.stats.duplicates > 0 && (
        <p className="text-sm text-text-secondary text-center">
          <span className="font-mono">{result.stats.original}</span> lines &rarr;{' '}
          <span className="font-mono">{result.stats.unique}</span> unique
          <span className="text-text-muted ml-1">
            ({result.stats.duplicates} duplicate{result.stats.duplicates !== 1 ? 's' : ''} removed)
          </span>
        </p>
      )}
    </div>
  );
}
