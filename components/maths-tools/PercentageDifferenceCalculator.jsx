'use client';

import { useState, useMemo } from 'react';

export default function PercentageDifferenceCalculator() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const result = useMemo(() => {
    const val1 = parseFloat(value1);
    const val2 = parseFloat(value2);

    if (!value1 || !value2) {
      return null;
    }

    const absoluteDifference = Math.abs(val1 - val2);
    const average = (val1 + val2) / 2;
    const percentDifference = (absoluteDifference / average) * 100;

    return {
      percentDifference,
      absoluteDifference,
      average,
    };
  }, [value1, value2]);

  const handleReset = () => {
    setValue1('');
    setValue2('');
  };

  return (
    <div className="space-y-3">
      {/* Info Box */}
      <div className="p-4 rounded-[var(--radius-card)] border border-blue-200 bg-blue-50">
        <div className="text-sm text-blue-900">
          <strong>Percentage Difference vs. Percent Change:</strong> Percentage difference treats both values symmetrically (order doesn't matter). Percent change compares a new value to an original baseline.
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label htmlFor="value1" className="block text-sm font-medium text-text-secondary mb-2">
            Value 1
          </label>
          <input
            id="value1"
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Enter first value"
            className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-bg-accent"
          />
        </div>

        <div>
          <label htmlFor="value2" className="block text-sm font-medium text-text-secondary mb-2">
            Value 2
          </label>
          <input
            id="value2"
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter second value"
            className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-bg-accent"
          />
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          <div className="p-6 rounded-[var(--radius-card)] border border-blue-200 bg-blue-50">
            <div className="text-sm text-text-secondary mb-2">Percentage Difference</div>
            <div className="text-4xl font-bold font-mono-num text-blue-600">
              {result.percentDifference.toFixed(2)}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-[var(--radius-card)] border border-border bg-surface">
              <div className="text-sm text-text-secondary mb-1">Absolute Difference</div>
              <div className="text-lg font-bold font-mono-num text-text-primary">
                {result.absoluteDifference.toFixed(4)}
              </div>
            </div>

            <div className="p-4 rounded-[var(--radius-card)] border border-border bg-surface">
              <div className="text-sm text-text-secondary mb-1">Average of Values</div>
              <div className="text-lg font-bold font-mono-num text-text-primary">
                {result.average.toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formula */}
      <div className="p-4 rounded-[var(--radius-card)] border border-border bg-surface">
        <div className="text-sm font-medium text-text-secondary mb-2">Formula</div>
        <div className="font-mono-num text-text-primary text-sm">
          |V₁ − V₂| / ((V₁ + V₂) / 2) × 100
        </div>
      </div>

      {/* Example */}
      {result && (
        <div className="p-4 rounded-[var(--radius-card)] border border-border bg-surface">
          <div className="text-sm font-medium text-text-secondary mb-2">Your Calculation</div>
          <div className="font-mono-num text-text-primary text-sm space-y-1">
            <div>|{parseFloat(value1)} − {parseFloat(value2)}| / (({parseFloat(value1)} + {parseFloat(value2)}) / 2) × 100</div>
            <div className="text-text-secondary">=</div>
            <div>{result.absoluteDifference.toFixed(4)} / {result.average.toFixed(4)} × 100</div>
            <div className="text-text-secondary">=</div>
            <div className="text-blue-600 font-bold">{result.percentDifference.toFixed(2)}%</div>
          </div>
        </div>
      )}

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
          <a href="/percent-change-calculator" className="text-bg-accent hover:underline text-sm">
            Percent Change
          </a>
          <span className="text-text-muted">·</span>
          <a href="/percentage-increase-calculator" className="text-bg-accent hover:underline text-sm">
            Percentage Increase
          </a>
          <span className="text-text-muted">·</span>
          <a href="/percentage-decrease-calculator" className="text-bg-accent hover:underline text-sm">
            Percentage Decrease
          </a>
        </div>
      </div>
    </div>
  );
}
