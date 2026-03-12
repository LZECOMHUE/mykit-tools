'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

export default function StringRepeater() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(1);
  const [separatorType, setSeparatorType] = useState('newline');
  const [customSeparator, setCustomSeparator] = useState('');

  const separators = {
    newline: '\n',
    space: ' ',
    comma: ',',
    tab: '\t',
    custom: customSeparator,
  };

  const output = useMemo(() => {
    if (!text || count < 1) return '';
    const separator = separators[separatorType];
    return Array(count).fill(text).join(separator);
  }, [text, count, separatorType, customSeparator, separators]);

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Text to Repeat
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the text you want to repeat..."
          className="w-full h-24 p-4 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
        />
      </div>

      {/* Configuration Section */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-4">
        {/* Number of Repetitions */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Number of Repetitions
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="1000"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="flex-1 h-2 bg-border rounded-full appearance-none cursor-pointer accent-accent"
            />
            <input
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
            />
          </div>
          <p className="text-xs text-text-muted">
            Max: <span className="font-mono-num">1000</span> repetitions
          </p>
        </div>

        {/* Separator Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Separator
          </label>
          <Select
            value={separatorType}
            onChange={(e) => setSeparatorType(e.target.value)}
            className="w-full"
          >
            <option value="newline">Newline</option>
            <option value="space">Space</option>
            <option value="comma">Comma</option>
            <option value="tab">Tab</option>
            <option value="custom">Custom</option>
          </Select>
        </div>

        {/* Custom Separator */}
        {separatorType === 'custom' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              Custom Separator
            </label>
            <input
              type="text"
              value={customSeparator}
              onChange={(e) => setCustomSeparator(e.target.value)}
              placeholder="Enter custom separator..."
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Output Section */}
      {output && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Output
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-48 p-4 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">
              Total length: <span className="font-mono-num">{output.length}</span> characters
            </p>
            <Button onClick={handleCopy} className="text-sm">
              Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
