'use client';

import { useState, useMemo, useCallback } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const ONES = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen',
];
const TENS = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
];
const SCALES = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'];

function convertChunk(n) {
  if (n === 0) return '';
  let str = '';
  if (n >= 100) {
    str += ONES[Math.floor(n / 100)] + ' hundred';
    n %= 100;
    if (n > 0) str += ' ';
  }
  if (n >= 20) {
    str += TENS[Math.floor(n / 10)];
    if (n % 10 > 0) str += '-' + ONES[n % 10];
  } else if (n > 0) {
    str += ONES[n];
  }
  return str;
}

function numberToWords(num, useAnd = true) {
  if (num === 0) return 'zero';

  let isNegative = false;
  if (num < 0) {
    isNegative = true;
    num = Math.abs(num);
  }

  // Split integer and decimal
  const parts = String(num).split('.');
  let intPart = parseInt(parts[0], 10);
  const decPart = parts.length > 1 ? parts[1] : null;

  if (isNaN(intPart)) return '';

  // Convert integer portion
  let words = '';
  if (intPart === 0) {
    words = 'zero';
  } else {
    const chunks = [];
    while (intPart > 0) {
      chunks.push(intPart % 1000);
      intPart = Math.floor(intPart / 1000);
    }

    const chunkWords = [];
    for (let i = chunks.length - 1; i >= 0; i--) {
      if (chunks[i] === 0) continue;
      let cw = convertChunk(chunks[i]);
      if (SCALES[i]) cw += ' ' + SCALES[i];
      chunkWords.push(cw);
    }

    // Insert "and" for UK English before the last chunk if it's under 100
    if (useAnd && chunkWords.length > 1) {
      const lastChunkValue = chunks[0];
      if (lastChunkValue > 0 && lastChunkValue < 100) {
        const last = chunkWords.pop();
        chunkWords.push('and ' + last);
      }
    } else if (useAnd && chunkWords.length === 1 && chunks.length > 1) {
      // Single word result but had a hundreds component - "and" within chunk
      // Already handled by convertChunk if value < 100
    }

    words = chunkWords.join(useAnd ? ', ' : ', ');

    // UK: also insert "and" after hundred within any chunk
    if (useAnd) {
      words = words.replace(/hundred (?!and)(\w)/g, 'hundred and $1');
    }
  }

  // Handle decimal
  if (decPart) {
    const decDigits = decPart
      .split('')
      .map((d) => {
        const n = parseInt(d, 10);
        return ONES[n] || 'zero';
      })
      .join(' ');
    words += ' point ' + decDigits;
  }

  if (isNegative) words = 'minus ' + words;

  return words;
}

const QUICK_EXAMPLES = [
  { label: '42', value: '42' },
  { label: '100', value: '100' },
  { label: '1,000', value: '1000' },
  { label: '1,234', value: '1234' },
  { label: '1,000,000', value: '1000000' },
  { label: '3.14', value: '3.14' },
  { label: '-7', value: '-7' },
];

export default function NumberToWords() {
  const [input, setInput] = useState('');
  const [dialect, setDialect] = useState('uk');
  const [copied, setCopied] = useState(false);

  const words = useMemo(() => {
    const cleaned = input.replace(/,/g, '').trim();
    if (!cleaned || isNaN(Number(cleaned))) return '';
    const num = Number(cleaned);
    if (!isFinite(num)) return 'Number too large';
    return numberToWords(num, dialect === 'uk');
  }, [input, dialect]);

  const handleCopy = useCallback(() => {
    if (!words) return;
    navigator.clipboard.writeText(words).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  }, [words]);

  return (
    <div className="space-y-4">
      {/* Dialect toggle */}
      <div className="flex items-center gap-2">
        {[
          { key: 'uk', label: 'UK English' },
          { key: 'us', label: 'US English' },
        ].map((d) => (
          <button
            key={d.key}
            onClick={() => setDialect(d.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              dialect === d.key
                ? 'bg-accent text-white'
                : 'bg-surface text-text-secondary border border-border'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <Card>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Enter a number
        </label>
        <input
          type="text"
          inputMode="decimal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 1234.56"
          className="w-full bg-white border border-border rounded-[var(--radius-input)] px-3 py-2 text-lg font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
        />
        {/* Quick examples */}
        <div className="flex flex-wrap gap-2 mt-2">
          {QUICK_EXAMPLES.map((ex) => (
            <button
              key={ex.value}
              onClick={() => setInput(ex.value)}
              className="px-2.5 py-1 rounded-full text-xs font-mono bg-surface text-text-secondary border border-border hover:bg-surface-hover transition-colors"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Result */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading text-sm font-semibold text-text-primary">
            In words
          </h3>
          {words && (
            <Button size="sm" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          )}
        </div>
        {words ? (
          <p className="text-xl text-text-primary leading-relaxed capitalize">
            {words}
          </p>
        ) : (
          <p className="text-sm text-text-muted py-2">
            {input && input.replace(/,/g, '').trim()
              ? 'Not a valid number'
              : 'Type a number above to see it in words'}
          </p>
        )}
        {dialect === 'uk' && words && (
          <p className="text-xs text-text-muted mt-2">
            UK English uses "and" after hundred - e.g. "one hundred and twenty-three"
          </p>
        )}
        {dialect === 'us' && words && (
          <p className="text-xs text-text-muted mt-2">
            US English omits "and" - e.g. "one hundred twenty-three"
          </p>
        )}
      </Card>
    </div>
  );
}
