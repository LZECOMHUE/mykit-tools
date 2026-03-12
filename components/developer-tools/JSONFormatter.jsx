'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [tabSize, setTabSize] = useState(2);
  const [error, setError] = useState(null);

  const { formatted, minified, stats, isValid } = useMemo(() => {
    try {
      if (!input.trim()) {
        return { formatted: '', minified: '', stats: { keys: 0, depth: 0, bytes: 0 }, isValid: false };
      }

      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, tabSize);
      const minified = JSON.stringify(parsed);

      // Calculate stats
      const countKeys = (obj) => {
        if (typeof obj !== 'object' || obj === null) return 0;
        return Object.keys(obj).length + Object.values(obj).reduce((acc, v) => acc + countKeys(v), 0);
      };

      const getDepth = (obj) => {
        if (typeof obj !== 'object' || obj === null) return 0;
        return 1 + Math.max(...Object.values(obj).map(getDepth), 0);
      };

      const stats = {
        keys: countKeys(parsed),
        depth: getDepth(parsed),
        bytes: new Blob([minified]).size,
      };

      setError(null);
      return { formatted, minified, stats, isValid: true };
    } catch (err) {
      const lineNumber = err.message.match(/position (\d+)/) ? err.message.match(/position (\d+)/)[1] : 'unknown';
      setError(`Invalid JSON: ${err.message}`);
      return { formatted: '', minified: '', stats: { keys: 0, depth: 0, bytes: 0 }, isValid: false };
    }
  }, [input, tabSize]);

  const handleCopyFormatted = () => {
    navigator.clipboard.writeText(formatted);
  };

  const handleCopyMinified = () => {
    navigator.clipboard.writeText(minified);
  };

  return (
    <div className="w-full space-y-6">
      {/* Input Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          JSON Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="w-full h-48 p-4 rounded-[--radius-input] border border-border bg-surface text-text-primary font-mono-num text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
        />
      </div>

      {/* Tab Size & Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label htmlFor="tab-size" className="text-sm text-text-secondary">
            Tab Size:
          </label>
          <select
            id="tab-size"
            value={tabSize}
            onChange={(e) => setTabSize(Number(e.target.value))}
            className="px-3 py-2 rounded-[--radius-input] border border-border bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCopyFormatted}
            disabled={!isValid}
            variant="secondary"
            size="sm"
          >
            Copy Formatted
          </Button>
          <Button
            onClick={handleCopyMinified}
            disabled={!isValid}
            variant="secondary"
            size="sm"
          >
            Copy Minified
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-[--radius-card] bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      {isValid && (
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-[--radius-card] bg-surface border border-border">
            <div className="text-xs text-text-muted mb-1">Keys</div>
            <div className="text-xl font-mono-num font-semibold text-text-primary">
              {stats.keys}
            </div>
          </div>
          <div className="p-3 rounded-[--radius-card] bg-surface border border-border">
            <div className="text-xs text-text-muted mb-1">Depth</div>
            <div className="text-xl font-mono-num font-semibold text-text-primary">
              {stats.depth}
            </div>
          </div>
          <div className="p-3 rounded-[--radius-card] bg-surface border border-border">
            <div className="text-xs text-text-muted mb-1">Size</div>
            <div className="text-xl font-mono-num font-semibold text-text-primary">
              {stats.bytes} B
            </div>
          </div>
        </div>
      )}

      {/* Output Section */}
      {isValid && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Formatted Output
          </label>
          <div className="p-4 rounded-[--radius-input] border border-border bg-surface min-h-48 max-h-96 overflow-auto">
            <pre className="font-mono-num text-sm text-text-primary whitespace-pre-wrap break-words">
              {formatted}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
