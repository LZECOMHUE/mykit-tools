'use client';

import { useState, useMemo } from 'react';

const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '—';
  return num.toFixed(2).replace(/\.?0+$/, '');
};

const formatPercent = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '—';
  return num.toFixed(2).replace(/\.?0+$/, '') + '%';
};

export default function PercentageCalculator() {
  // Card 1: What is X% of Y?
  const [card1X, setCard1X] = useState('');
  const [card1Y, setCard1Y] = useState('');

  // Card 2: X is what % of Y?
  const [card2X, setCard2X] = useState('');
  const [card2Y, setCard2Y] = useState('');

  // Card 3: Percentage change
  const [card3From, setCard3From] = useState('');
  const [card3To, setCard3To] = useState('');

  // Card 4: Increase/decrease by %
  const [card4Value, setCard4Value] = useState('');
  const [card4Pct, setCard4Pct] = useState('');

  // Card 1: What is X% of Y?
  const result1 = useMemo(() => {
    const x = parseFloat(card1X);
    const y = parseFloat(card1Y);
    if (isNaN(x) || isNaN(y)) return null;
    return (x / 100) * y;
  }, [card1X, card1Y]);

  // Card 2: X is what % of Y?
  const result2 = useMemo(() => {
    const x = parseFloat(card2X);
    const y = parseFloat(card2Y);
    if (isNaN(x) || isNaN(y) || y === 0) return null;
    return (x / y) * 100;
  }, [card2X, card2Y]);

  // Card 3: Percentage change
  const result3 = useMemo(() => {
    const from = parseFloat(card3From);
    const to = parseFloat(card3To);
    if (isNaN(from) || isNaN(to) || from === 0) return null;
    return ((to - from) / from) * 100;
  }, [card3From, card3To]);

  // Card 4: Increase/decrease by %
  const result4 = useMemo(() => {
    const value = parseFloat(card4Value);
    const pct = parseFloat(card4Pct);
    if (isNaN(value) || isNaN(pct)) return null;
    return {
      increased: value * (1 + pct / 100),
      decreased: value * (1 - pct / 100),
    };
  }, [card4Value, card4Pct]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Card 1: What is X% of Y? */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          What is X% of Y?
        </h3>
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
          <span>What is</span>
          <input
            type="number"
            step="any"
            value={card1X}
            onChange={(e) => setCard1X(e.target.value)}
            placeholder="0"
            className="w-24 px-2 py-1 text-sm font-mono-num border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          />
          <span>% of</span>
          <input
            type="number"
            step="any"
            value={card1Y}
            onChange={(e) => setCard1Y(e.target.value)}
            placeholder="0"
            className="w-24 px-2 py-1 text-sm font-mono-num border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          />
          <span>?</span>
        </div>
        <div className="bg-surface rounded-[var(--radius-input)] px-3 py-2">
          <div className="font-mono-num text-accent font-semibold">
            = {formatNumber(result1)}
          </div>
        </div>
        <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
          <span className="font-medium text-text-secondary">Example:</span> What is 15% of 200? → 30. Useful for calculating tips, discounts, or tax amounts.
        </p>
      </div>

      {/* Card 2: X is what % of Y? */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          X is what % of Y?
        </h3>
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
          <input
            type="number"
            step="any"
            value={card2X}
            onChange={(e) => setCard2X(e.target.value)}
            placeholder="0"
            className="w-24 px-2 py-1 text-sm font-mono-num border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          />
          <span>is what % of</span>
          <input
            type="number"
            step="any"
            value={card2Y}
            onChange={(e) => setCard2Y(e.target.value)}
            placeholder="0"
            className="w-24 px-2 py-1 text-sm font-mono-num border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          />
          <span>?</span>
        </div>
        <div className="bg-surface rounded-[var(--radius-input)] px-3 py-2">
          <div className="font-mono-num text-accent font-semibold">
            = {formatPercent(result2)}
          </div>
        </div>
        <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
          <span className="font-medium text-text-secondary">Example:</span> 30 is what % of 200? → 15%. Handy for working out exam scores, savings rates, or conversion rates.
        </p>
      </div>

      {/* Card 3: Percentage change */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          Percentage change
        </h3>
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
          <span>From</span>
          <input
            type="number"
            step="any"
            value={card3From}
            onChange={(e) => setCard3From(e.target.value)}
            placeholder="0"
            className="w-24 px-2 py-1 text-sm font-mono-num border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          />
          <span>to</span>
          <input
            type="number"
            step="any"
            value={card3To}
            onChange={(e) => setCard3To(e.target.value)}
            placeholder="0"
            className="w-24 px-2 py-1 text-sm font-mono-num border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          />
        </div>
        <div className="bg-surface rounded-[var(--radius-input)] px-3 py-2">
          <div
            className={`font-mono-num font-semibold ${
              result3 === null
                ? 'text-accent'
                : result3 >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
            }`}
          >
            = {result3 === null ? '—' : `${result3 >= 0 ? '+' : ''}${formatPercent(result3)}`}
          </div>
        </div>
        <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
          <span className="font-medium text-text-secondary">Example:</span> From 80 to 100 → +25%. Great for comparing prices, salaries, or tracking progress over time.
        </p>
      </div>

      {/* Card 4: Increase/decrease by % */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          Increase/decrease by %
        </h3>
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
          <input
            type="number"
            step="any"
            value={card4Value}
            onChange={(e) => setCard4Value(e.target.value)}
            placeholder="0"
            className="w-24 px-2 py-1 text-sm font-mono-num border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          />
          <span>±</span>
          <input
            type="number"
            step="any"
            value={card4Pct}
            onChange={(e) => setCard4Pct(e.target.value)}
            placeholder="0"
            className="w-24 px-2 py-1 text-sm font-mono-num border border-border rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          />
          <span>%</span>
        </div>
        <div className="space-y-2">
          <div className="bg-surface rounded-[var(--radius-input)] px-3 py-2">
            <div className="text-xs text-text-secondary mb-1">Increased:</div>
            <div className="font-mono-num text-accent font-semibold">
              {formatNumber(result4?.increased)}
            </div>
          </div>
          <div className="bg-surface rounded-[var(--radius-input)] px-3 py-2">
            <div className="text-xs text-text-secondary mb-1">Decreased:</div>
            <div className="font-mono-num text-accent font-semibold">
              {formatNumber(result4?.decreased)}
            </div>
          </div>
        </div>
        <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
          <span className="font-medium text-text-secondary">Example:</span> 200 ± 15% → 230 or 170. Useful for adding VAT, applying discounts, or calculating pay rises.
        </p>
      </div>
    </div>
  );
}
