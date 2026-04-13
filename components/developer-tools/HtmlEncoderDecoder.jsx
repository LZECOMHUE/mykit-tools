'use client';

import { useState, useMemo, useCallback } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const encode = (str) =>
  str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);

const decode = (str) => {
  if (typeof document === 'undefined') return str;
  const el = document.createElement('textarea');
  el.innerHTML = str;
  return el.value;
};

export default function HtmlEncoderDecoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return '';
    try {
      return mode === 'encode' ? encode(input) : decode(input);
    } catch {
      return 'Error processing input';
    }
  }, [input, mode]);

  const handleSwap = useCallback(() => {
    setInput(output);
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'));
  }, [output]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  }, [output]);

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex items-center gap-2">
        {['encode', 'decode'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
              mode === m
                ? 'bg-accent text-white'
                : 'bg-surface text-text-secondary border border-border'
            }`}
          >
            {m}
          </button>
        ))}
        <button
          onClick={handleSwap}
          disabled={!output}
          className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary border border-border hover:bg-surface-hover transition-colors disabled:opacity-40"
          title="Move output to input"
        >
          Swap
        </button>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <Card>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-text-primary">
              {mode === 'encode' ? 'Plain Text' : 'HTML Entities'}
            </label>
            <span className="text-xs font-mono text-text-muted">
              {input.length} chars
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Type or paste text to encode...'
                : 'Paste HTML entities to decode...'
            }
            rows={10}
            className="w-full bg-white border border-border rounded-[var(--radius-input)] px-3 py-2 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y"
          />
        </Card>

        {/* Output */}
        <Card>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-text-primary">
              {mode === 'encode' ? 'HTML Entities' : 'Plain Text'}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-text-muted">
                {output.length} chars
              </span>
              {output && (
                <Button size="sm" onClick={handleCopy}>
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              )}
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            rows={10}
            className="w-full bg-surface border border-border rounded-[var(--radius-input)] px-3 py-2 text-sm font-mono text-text-primary resize-y"
          />
        </Card>
      </div>

      {/* Quick reference */}
      <Card>
        <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">
          Common HTML Entities
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
          {[
            ['&', '&amp;'],
            ['<', '&lt;'],
            ['>', '&gt;'],
            ['"', '&quot;'],
            ["'", '&#39;'],
          ].map(([char, entity]) => (
            <div
              key={char}
              className="flex items-center justify-between bg-surface rounded px-2 py-1.5"
            >
              <span className="font-mono text-text-primary">{char}</span>
              <span className="font-mono text-text-muted">{entity}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
