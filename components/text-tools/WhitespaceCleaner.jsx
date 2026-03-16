'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';

export default function WhitespaceCleaner() {
  const [text, setText] = useState('');
  const [trimTrailing, setTrimTrailing] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [trimLeading, setTrimLeading] = useState(true);
  const [normalizeLineEndings, setNormalizeLineEndings] = useState(true);

  const cleanedText = useMemo(() => {
    let result = text;

    // Normalize line endings first
    if (normalizeLineEndings) {
      result = result.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    }

    // Process line by line
    let lines = result.split('\n');

    lines = lines.map((line) => {
      // Trim trailing spaces
      if (trimTrailing) {
        line = line.replace(/\s+$/, '');
      }

      // Trim leading spaces
      if (trimLeading) {
        line = line.replace(/^\s+/, '');
      }

      // Collapse multiple spaces
      if (collapseSpaces) {
        line = line.replace(/\s{2,}/g, ' ');
      }

      return line;
    });

    // Remove blank lines
    if (removeBlankLines) {
      lines = lines.filter((line) => line.trim().length > 0);
    }

    return lines.join('\n');
  }, [text, trimTrailing, removeBlankLines, collapseSpaces, trimLeading, normalizeLineEndings]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanedText);
  };

  const characterDifference = text.length - cleanedText.length;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Original Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text here..."
          className="w-full min-h-[150px] px-4 py-3 border border-border rounded-[var(--radius-input)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-10 resize-vertical"
        />
        <p className="text-xs text-text-muted mt-2">
          <span className="font-mono">{text.length}</span> characters
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text-secondary">Clean Options</h3>
        <Toggle
          label="Trim Trailing Whitespace"
          checked={trimTrailing}
          onChange={setTrimTrailing}
        />
        <Toggle
          label="Trim Leading Whitespace"
          checked={trimLeading}
          onChange={setTrimLeading}
        />
        <Toggle
          label="Remove Blank Lines"
          checked={removeBlankLines}
          onChange={setRemoveBlankLines}
        />
        <Toggle
          label="Collapse Multiple Spaces"
          checked={collapseSpaces}
          onChange={setCollapseSpaces}
        />
        <Toggle
          label="Normalize Line Endings"
          checked={normalizeLineEndings}
          onChange={setNormalizeLineEndings}
        />
      </div>

      {text && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-text-muted text-sm">Character reduction</p>
              <p className="font-mono text-lg font-semibold text-text-primary">
                {characterDifference} characters removed
              </p>
            </div>
            <div className="text-right">
              <p className="text-text-muted text-sm">Cleaned text size</p>
              <p className="font-mono text-lg font-semibold text-text-primary">
                {cleanedText.length} characters
              </p>
            </div>
          </div>
        </div>
      )}

      {text && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-3">
          <p className="text-sm font-medium text-text-secondary">Cleaned Text:</p>
          <textarea
            value={cleanedText}
            readOnly
            className="w-full min-h-[150px] px-4 py-3 font-mono text-sm text-text-primary bg-white border border-border rounded-[var(--radius-input)] resize-vertical"
          />
          <Button onClick={handleCopy} className="w-full">
            Copy Cleaned Text
          </Button>
        </div>
      )}

      {!text && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 text-center">
          <p className="text-text-muted">Paste text to clean whitespace</p>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>Remove unnecessary whitespace and clean up text formatting.</p>
      </div>
    </div>
  );
}
