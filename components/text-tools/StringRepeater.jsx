'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

const SEPARATORS = [
  { value: 'newline', label: 'Newline' },
  { value: 'space', label: 'Space' },
  { value: 'comma', label: 'Comma' },
  { value: 'tab', label: 'Tab' },
  { value: 'custom', label: 'Custom' },
];

const SEPARATOR_CHARS = {
  newline: '\n',
  space: ' ',
  comma: ',',
  tab: '\t',
};

export default function StringRepeater() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(3);
  const [separatorType, setSeparatorType] = useState('newline');
  const [customSeparator, setCustomSeparator] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!text || count < 1) return '';
    const separator = separatorType === 'custom' ? customSeparator : SEPARATOR_CHARS[separatorType];
    return Array(count).fill(text).join(separator);
  }, [text, count, separatorType, customSeparator]);

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
      {/* Config row */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-text-primary">Repeat</span>
        <input
          type="number"
          min="1"
          max="1000"
          value={count}
          onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 px-2 py-1.5 text-sm font-mono border border-border rounded-[var(--radius-input)] bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <span className="text-sm text-text-secondary">times, separated by:</span>
        {SEPARATORS.map((sep) => (
          <button
            key={sep.value}
            onClick={() => setSeparatorType(sep.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              separatorType === sep.value
                ? 'bg-accent text-white'
                : 'bg-surface text-text-secondary hover:bg-surface-hover'
            }`}
          >
            {sep.label}
          </button>
        ))}
        {separatorType === 'custom' && (
          <input
            type="text"
            value={customSeparator}
            onChange={(e) => setCustomSeparator(e.target.value)}
            placeholder="separator..."
            className="w-28 px-2 py-1.5 text-sm border border-border rounded-[var(--radius-input)] bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        )}
      </div>

      {/* Side-by-side grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">Text to Repeat</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to repeat..."
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
            placeholder="Repeated text will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
