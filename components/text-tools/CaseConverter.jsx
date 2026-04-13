'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

const MODES = [
  { key: 'uppercase', label: 'UPPERCASE' },
  { key: 'lowercase', label: 'lowercase' },
  { key: 'titlecase', label: 'Title Case' },
  { key: 'sentencecase', label: 'Sentence case' },
  { key: 'camelcase', label: 'camelCase' },
  { key: 'pascalcase', label: 'PascalCase' },
  { key: 'snakecase', label: 'snake_case' },
  { key: 'kebabcase', label: 'kebab-case' },
  { key: 'constantcase', label: 'CONSTANT_CASE' },
  { key: 'dotcase', label: 'dot.case' },
];

const conversions = {
  uppercase: (str) => str.toUpperCase(),
  lowercase: (str) => str.toLowerCase(),
  titlecase: (str) => str.replace(/\b\w/g, (c) => c.toUpperCase()),
  sentencecase: (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),
  camelcase: (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, ''),
  pascalcase: (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, ''),
  snakecase: (str) => str.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, ''),
  kebabcase: (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
  constantcase: (str) => str.toUpperCase().replace(/\s+/g, '_').replace(/[^\w_]/g, ''),
  dotcase: (str) => str.toLowerCase().replace(/\s+/g, '.').replace(/[^\w.]/g, ''),
};

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [activeMode, setActiveMode] = useState('uppercase');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return '';
    return conversions[activeMode](input);
  }, [input, activeMode]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-4">
      {/* Mode pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-text-primary">Convert to:</span>
        {MODES.map((mode) => (
          <button
            key={mode.key}
            onClick={() => setActiveMode(mode.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeMode === mode.key
                ? 'bg-accent text-white'
                : 'bg-surface text-text-secondary hover:bg-surface-hover'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Side-by-side grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Input</label>
            {input.length > 0 && (
              <span className="text-xs text-text-muted font-mono">{input.length} chars</span>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Output</label>
            <div className="flex items-center gap-2">
              {output.length > 0 && (
                <span className="text-xs text-text-muted font-mono">{output.length} chars</span>
              )}
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output}>
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Converted text will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
