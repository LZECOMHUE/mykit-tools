'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

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
  const [showDiff, setShowDiff] = useState(false);

  const diffResult = useMemo(() => {
    if (!showDiff || (!original && !modified)) return null;
    return lineDiff(original, modified);
  }, [original, modified, showDiff]);

  const stats = useMemo(() => {
    if (!diffResult) return { added: 0, removed: 0, unchanged: 0 };
    return {
      added: diffResult.filter((d) => d.type === 'added').length,
      removed: diffResult.filter((d) => d.type === 'removed').length,
      unchanged: diffResult.filter((d) => d.type === 'unchanged').length,
    };
  }, [diffResult]);

  const handleCompare = () => {
    setShowDiff(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Original Text
          </label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text here..."
            className="w-full h-48 p-4 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
          <p className="text-xs text-text-muted">
            Lines: <span className="font-mono-num">{original.split('\n').length}</span>
          </p>
        </div>

        {/* Modified */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Modified Text
          </label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text here..."
            className="w-full h-48 p-4 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
          <p className="text-xs text-text-muted">
            Lines: <span className="font-mono-num">{modified.split('\n').length}</span>
          </p>
        </div>
      </div>

      {/* Compare Button */}
      <div className="flex justify-center">
        <Button onClick={handleCompare}>Compare Texts</Button>
      </div>

      {/* Diff Result */}
      {showDiff && diffResult && (
        <div className="space-y-4">
          {/* Statistics */}
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-2">
            <p className="text-sm text-text-primary font-medium">Comparison Results</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-text-muted">Added</p>
                <p className="text-lg font-mono-num text-green-600">
                  {stats.added}
                </p>
              </div>
              <div>
                <p className="text-text-muted">Removed</p>
                <p className="text-lg font-mono-num text-red-600">
                  {stats.removed}
                </p>
              </div>
              <div>
                <p className="text-text-muted">Unchanged</p>
                <p className="text-lg font-mono-num text-text-secondary">
                  {stats.unchanged}
                </p>
              </div>
            </div>
          </div>

          {/* Diff View */}
          <div className="bg-surface border border-border rounded-[var(--radius-card)] overflow-hidden">
            <div className="divide-y divide-border">
              {diffResult.map((line, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 font-mono text-sm ${
                    line.type === 'added'
                      ? 'bg-green-50'
                      : line.type === 'removed'
                      ? 'bg-red-50'
                      : ''
                  }`}
                >
                  <span className="text-text-muted mr-2">
                    {line.type === 'added' ? '+' : line.type === 'removed' ? '−' : ' '}
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
        </div>
      )}
    </div>
  );
}
