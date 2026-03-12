'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';

export default function RemoveDuplicateLines() {
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [sortOutput, setSortOutput] = useState(false);
  const [keepFirst, setKeepFirst] = useState(true);

  const result = useMemo(() => {
    if (!input) return { output: '', stats: { original: 0, duplicates: 0, unique: 0 } };

    let lines = input.split('\n');
    const originalCount = lines.length;

    // Trim whitespace if enabled
    if (trimWhitespace) {
      lines = lines.map((line) => line.trim());
    }

    // Track duplicates
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
        // Remove all duplicates
        if (caseSensitive) {
          if (seenCaseInsensitive.has(caseInsensitiveKey)) {
            duplicateCount++;
          } else {
            seenCaseInsensitive.add(caseInsensitiveKey);
            deduplicated.push(line);
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
    }

    // Sort if enabled
    let finalLines = deduplicated;
    if (sortOutput) {
      finalLines = [...deduplicated].sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        return aLower.localeCompare(bLower);
      });
    }

    // Remove empty lines at end
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

  const handleCopy = () => {
    if (result.output) {
      navigator.clipboard.writeText(result.output);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Input Text (one item per line)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text here, one line per item..."
          className="w-full h-48 p-4 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
        />
      </div>

      {/* Options Section */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-4">
        <p className="text-sm font-medium text-text-primary">Options</p>

        {/* Case Sensitivity */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-text-primary">
            Case Sensitive Comparison
          </label>
          <Toggle
            checked={caseSensitive}
            onChange={setCaseSensitive}
          />
        </div>

        {/* Trim Whitespace */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-text-primary">
            Trim Whitespace
          </label>
          <Toggle
            checked={trimWhitespace}
            onChange={setTrimWhitespace}
          />
        </div>

        {/* Sort Output */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-text-primary">
            Sort Output Alphabetically
          </label>
          <Toggle
            checked={sortOutput}
            onChange={setSortOutput}
          />
        </div>

        {/* Keep First or Remove All */}
        <div className="space-y-2">
          <label className="text-sm text-text-primary">
            Duplicate Handling
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="keep-first"
                name="duplicates"
                checked={keepFirst}
                onChange={() => setKeepFirst(true)}
                className="w-4 h-4 accent-accent"
              />
              <label htmlFor="keep-first" className="text-sm text-text-primary">
                Keep first occurrence
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="remove-all"
                name="duplicates"
                checked={!keepFirst}
                onChange={() => setKeepFirst(false)}
                className="w-4 h-4 accent-accent"
              />
              <label htmlFor="remove-all" className="text-sm text-text-primary">
                Remove all duplicates
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      {result.output && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-2">
          <p className="text-sm font-medium text-text-primary mb-3">Statistics</p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-text-muted">Original Lines</p>
              <p className="text-lg font-mono-num text-text-primary">
                {result.stats.original}
              </p>
            </div>
            <div>
              <p className="text-text-muted">Duplicates Found</p>
              <p className="text-lg font-mono-num text-text-primary">
                {result.stats.duplicates}
              </p>
            </div>
            <div>
              <p className="text-text-muted">Unique Lines</p>
              <p className="text-lg font-mono-num text-text-primary">
                {result.stats.unique}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Output Section */}
      {result.output && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Output
          </label>
          <textarea
            value={result.output}
            readOnly
            className="w-full h-48 p-4 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
          <div className="flex justify-end">
            <Button onClick={handleCopy} className="text-sm">
              Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
