'use client';

import { useState, useMemo } from 'react';

function lineDiff(original, modified) {
  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');

  const diff = [];
  let originalIndex = 0;
  let modifiedIndex = 0;

  while (originalIndex < originalLines.length || modifiedIndex < modifiedLines.length) {
    const origLine = originalIndex < originalLines.length ? originalLines[originalIndex] : null;
    const modLine = modifiedIndex < modifiedLines.length ? modifiedLines[modifiedIndex] : null;

    if (origLine === modLine && origLine !== null) {
      diff.push({ type: 'unchanged', content: origLine });
      originalIndex++;
      modifiedIndex++;
    } else if (origLine !== null && (modLine === null || !modifiedLines.includes(origLine))) {
      diff.push({ type: 'removed', content: origLine });
      originalIndex++;
    } else if (modLine !== null) {
      diff.push({ type: 'added', content: modLine });
      modifiedIndex++;
    }
  }

  return diff;
}

export default function TextDiff() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');

  const diffResult = useMemo(() => {
    if (!original && !modified) return null;
    return lineDiff(original, modified);
  }, [original, modified]);

  const stats = useMemo(() => {
    if (!diffResult) return { added: 0, removed: 0, unchanged: 0 };
    return {
      added: diffResult.filter((d) => d.type === 'added').length,
      removed: diffResult.filter((d) => d.type === 'removed').length,
      unchanged: diffResult.filter((d) => d.type === 'unchanged').length,
    };
  }, [diffResult]);

  return (
    <div className="space-y-4">
      {/* Two input panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Original */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Original Text</label>
            <span className="text-xs text-text-muted font-mono">{original.split('\n').length} lines</span>
          </div>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text here..."
            className="w-full h-48 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Modified */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Modified Text</label>
            <span className="text-xs text-text-muted font-mono">{modified.split('\n').length} lines</span>
          </div>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text here..."
            className="w-full h-48 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Stats inline row */}
      {diffResult && (
        <div className="flex items-center gap-4 text-sm">
          <span className="text-text-muted">Diff:</span>
          <span className="font-mono text-green-600">+{stats.added} added</span>
          <span className="font-mono text-red-600">-{stats.removed} removed</span>
          <span className="font-mono text-text-secondary">{stats.unchanged} unchanged</span>
        </div>
      )}

      {/* Diff view */}
      {diffResult && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="divide-y divide-border">
            {diffResult.map((line, idx) => (
              <div
                key={idx}
                className={`px-4 py-1.5 font-mono text-sm ${
                  line.type === 'added'
                    ? 'bg-green-50'
                    : line.type === 'removed'
                    ? 'bg-red-50'
                    : ''
                }`}
              >
                <span className="text-text-muted mr-2 select-none">
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                </span>
                <span
                  className={
                    line.type === 'added'
                      ? 'text-green-700'
                      : line.type === 'removed'
                      ? 'text-red-700'
                      : 'text-text-primary'
                  }
                >
                  {line.content || '\u00A0'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
