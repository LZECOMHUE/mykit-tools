'use client';

import { useState, useMemo } from 'react';

export default function PercentChangeCalculator() {
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');

  const result = useMemo(() => {
    const old = parseFloat(oldValue);
    const newVal = parseFloat(newValue);

    if (!oldValue || !newValue || old === 0) {
      return null;
    }

    const absoluteChange = newVal - old;
    const percentChange = (absoluteChange / Math.abs(old)) * 100;

    return {
      percentChange,
      absoluteChange,
      isIncrease: percentChange > 0,
    };
  }, [oldValue, newValue]);

  const handleReset = () => {
    setOldValue('');
    setNewValue('');
  };

  return (
    <div className="space-y-3">
      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label htmlFor="oldValue" className="block text-sm font-medium text-text-secondary mb-2">
            Original Value
          </label>
          <input
            id="oldValue"
            type="number"
            value={oldValue}
            onChange={(e) => setOldValue(e.target.value)}
            placeholder="Enter original value"
            className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-bg-accent"
          />
        </div>

        <div>
          <label htmlFor="newValue" className="block text-sm font-medium text-text-secondary mb-2">
            New Value
          </label>
          <input
            id="newValue"
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter new value"
            className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-bg-accent"
          />
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          <div className={`p-6 rounded-[var(--radius-card)] border ${result.isIncrease ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="text-sm text-text-secondary mb-2">Percentage Change</div>
            <div className={`text-4xl font-bold font-mono-num ${result.isIncrease ? 'text-green-600' : 'text-red-600'}`}>
              {result.isIncrease ? '+' : ''}{result.percentChange.toFixed(2)}%
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius-card)] border border-border bg-surface">
            <div className="text-sm text-text-secondary mb-1">Absolute Change</div>
            <div className={`text-2xl font-bold font-mono-num ${result.isIncrease ? 'text-green-600' : 'text-red-600'}`}>
              {result.isIncrease ? '+' : ''}{result.absoluteChange.toFixed(4)}
            </div>
          </div>
        </div>
      )}

      {/* Formula */}
      <div className="p-4 rounded-[var(--radius-card)] border border-border bg-surface">
        <div className="text-sm font-medium text-text-secondary mb-2">Formula</div>
        <div className="font-mono-num text-text-primary text-sm">
          ((New − Old) / |Old|) × 100
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-white text-text-primary font-medium hover:bg-surface transition"
      >
        Reset
      </button>

      {/* Related Tools */}
      <div className="pt-6 border-t border-border">
        <div className="text-sm text-text-secondary mb-3">Related Calculators</div>
        <div className="flex flex-wrap gap-2">
          <a href="/percentage-increase-calculator" className="text-bg-accent hover:underline text-sm">
            Percentage Increase
          </a>
          <span className="text-text-muted">·</span>
          <a href="/percentage-decrease-calculator" className="text-bg-accent hover:underline text-sm">
            Percentage Decrease
          </a>
          <span className="text-text-muted">·</span>
          <a href="/percentage-difference-calculator" className="text-bg-accent hover:underline text-sm">
            Percentage Difference
          </a>
        </div>
      </div>
    </div>
  );
}
