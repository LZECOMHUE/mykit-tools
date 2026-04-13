'use client';

import { useState, useMemo } from 'react';

const ENTITIES = {
  '&': 'amp',
  '<': 'lt',
  '>': 'gt',
  '"': 'quot',
  "'": '#x27',
  ' ': 'nbsp'
};

const ENTITIES_REVERSE = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  '#x27': "'",
  '#39': "'",
  'apos': "'",
  nbsp: ' '
};

function encodeHTML(text) {
  return text.replace(/[&<>"']/g, char => `&${ENTITIES[char]};`);
}

function decodeHTML(text) {
  let result = text;

  // Named entities
  Object.entries(ENTITIES_REVERSE).forEach(([entity, char]) => {
    result = result.replace(new RegExp(`&${entity};`, 'g'), char);
  });

  // Numeric entities (&#123;)
  result = result.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(parseInt(dec, 10)));

  // Hex entities (&#x7B;)
  result = result.replace(/&#x([0-9a-f]+);/gi, (match, hex) => String.fromCharCode(parseInt(hex, 16)));

  return result;
}

export default function HTMLEntityEncoder() {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [showReference, setShowReference] = useState(false);

  const output = useMemo(() => {
    if (!input) return '';
    return mode === 'encode' ? encodeHTML(input) : decodeHTML(input);
  }, [input, mode]);

  const handleSwapModes = () => {
    const currentOutput = output;
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(currentOutput);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output).catch(() => {});
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Mode Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('encode')}
          className={`flex-1 rounded-[var(--radius-card)] px-4 py-2 text-sm font-medium transition-colors ${
            mode === 'encode'
              ? 'bg-accent text-white'
              : 'bg-white border border-border text-text-primary hover:bg-surface'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`flex-1 rounded-[var(--radius-card)] px-4 py-2 text-sm font-medium transition-colors ${
            mode === 'decode'
              ? 'bg-accent text-white'
              : 'bg-white border border-border text-text-primary hover:bg-surface'
          }`}
        >
          Decode
        </button>
      </div>

      {/* Input */}
      <div>
        <label className="text-text-secondary text-sm font-medium">
          {mode === 'encode' ? 'Text to Encode' : 'Entities to Decode'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Paste text with special characters...' : 'Paste HTML entities...'}
          className="w-full mt-2 min-h-[150px] rounded-[var(--radius-input)] border border-border bg-white p-3 font-mono text-[12px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </div>

      {/* Swap Button */}
      <div className="flex gap-2">
        <button
          onClick={handleSwapModes}
          disabled={!output}
          className="flex-1 rounded-[var(--radius-card)] bg-white border border-border text-text-primary px-4 py-2 text-sm font-medium hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Swap
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
          <div className="bg-white rounded-[var(--radius-input)] border border-border p-3 max-h-[200px] overflow-y-auto">
            <p className="font-mono text-[12px] text-text-primary break-all whitespace-pre-wrap">
              {output}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="w-full mt-3 rounded-[var(--radius-card)] bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Copy
          </button>
        </div>
      )}

      {/* Common Entities Reference */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
        <button
          onClick={() => setShowReference(!showReference)}
          className="text-text-secondary text-sm font-medium flex items-center gap-1 hover:text-text-primary"
        >
          {showReference ? '▾' : '▸'} Common HTML Entities
        </button>
        {showReference && (
          <div className="grid grid-cols-2 gap-2 text-[13px] mt-3">
            <div className="font-mono text-text-primary">&amp; = &</div>
            <div className="font-mono text-text-primary">&lt; = &lt;</div>
            <div className="font-mono text-text-primary">&gt; = &gt;</div>
            <div className="font-mono text-text-primary">&quot; = "</div>
            <div className="font-mono text-text-primary">&#x27; = '</div>
            <div className="font-mono text-text-primary">&nbsp; = space</div>
          </div>
        )}
      </div>
    </div>
  );
}
