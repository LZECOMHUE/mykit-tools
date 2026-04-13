'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

export default function WhitespaceCleaner() {
  const [text, setText] = useState('');
  const [trimTrailing, setTrimTrailing] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [trimLeading, setTrimLeading] = useState(true);
  const [normalizeLineEndings, setNormalizeLineEndings] = useState(true);
  const [copied, setCopied] = useState(false);

  const cleanedText = useMemo(() => {
    let result = text;

    if (normalizeLineEndings) {
      result = result.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    }

    let lines = result.split('\n');

    lines = lines.map((line) => {
      if (trimTrailing) line = line.replace(/\s+$/, '');
      if (trimLeading) line = line.replace(/^\s+/, '');
      if (collapseSpaces) line = line.replace(/\s{2,}/g, ' ');
      return line;
    });

    if (removeBlankLines) {
      lines = lines.filter((line) => line.trim().length > 0);
    }

    return lines.join('\n');
  }, [text, trimTrailing, removeBlankLines, collapseSpaces, trimLeading, normalizeLineEndings]);

  const handleCopy = async () => {
    if (!cleanedText) return;
    try {
      await navigator.clipboard.writeText(cleanedText).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const characterDifference = text.length - cleanedText.length;

  const options = [
    { state: trimLeading, setter: setTrimLeading, label: 'Trim leading' },
    { state: trimTrailing, setter: setTrimTrailing, label: 'Trim trailing' },
    { state: removeBlankLines, setter: setRemoveBlankLines, label: 'Remove blank lines' },
    { state: collapseSpaces, setter: setCollapseSpaces, label: 'Collapse spaces' },
    { state: normalizeLineEndings, setter: setNormalizeLineEndings, label: 'Normalize line endings' },
  ];

  return (
    <div className="space-y-4">
      {/* Options as compact checkboxes */}
      <div className="flex items-center gap-4 flex-wrap">
        {options.map(({ state, setter, label }) => (
          <label key={label} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={state}
              onChange={(e) => setter(e.target.checked)}
              className="w-4 h-4 rounded border-border accent-accent"
            />
            <span className="text-sm text-text-secondary">{label}</span>
          </label>
        ))}
      </div>

      {/* Side-by-side grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Original Text</label>
            {text.length > 0 && (
              <span className="text-xs text-text-muted font-mono">{text.length} chars</span>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Cleaned Text</label>
            <div className="flex items-center gap-2">
              {characterDifference > 0 && (
                <span className="text-xs text-success font-mono">-{characterDifference} chars</span>
              )}
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!cleanedText}>
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          <textarea
            value={cleanedText}
            readOnly
            placeholder="Cleaned text will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
