'use client';

import { useState, useMemo } from 'react';

export default function PercentageIncreaseCalculator() {
  const [mode, setMode] = useState('forward'); // 'forward' or 'reverse'
  const [originalValue, setOriginalValue] = useState('');
  const [percentageValue, setPercentageValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const forwardResult = useMemo(() => {
    if (mode !== 'forward') return null;
    const original = parseFloat(originalValue);
    const percentage = parseFloat(percentageValue);

    if (!originalValue || !percentageValue) {
      return null;
    }

    const increaseAmount = original * (percentage / 100);
    const newValue = original + increaseAmount;

    return {
      newValue,
      increaseAmount,
    };
  }, [originalValue, percentageValue, mode]);

  const reverseResult = useMemo(() => {
    if (mode !== 'reverse') return null;
    const val1 = parseFloat(value1);
    const val2 = parseFloat(value2);

    if (!value1 || !value2 || val1 === 0) {
      return null;
    }

    const increaseAmount = val2 - val1;
    const percentageIncrease = (increaseAmount / val1) * 100;

    return {
      percentageIncrease,
      increaseAmount,
    };
  }, [value1, value2, mode]);

  const handleReset = () => {
    setOriginalValue('');
    setPercentageValue('');
    setValue1('');
    setValue2('');
  };

  return (
    <div className="space-y-3">
      {/* Mode Toggle */}
      <div className="flex gap-3 border-b border-border">
        <button
          onClick={() => setMode('forward')}
          className={`pb-3 px-1 font-medium text-sm transition ${
            mode === 'forward'
              ? 'text-bg-accent border-b-2 border-bg-accent'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Calculate Increase
        </button>
        <button
          onClick={() => setMode('reverse')}
          className={`pb-3 px-1 font-medium text-sm transition ${
            mode === 'reverse'
              ? 'text-bg-accent border-b-2 border-bg-accent'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Find Percentage Increase
        </button>
      </div>

      {/* Forward Mode Inputs */}
      {mode === 'forward' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="originalValue" className="block text-sm font-medium text-text-secondary mb-2">
              Original Value
            </label>
            <input
              id="originalValue"
              type="number"
              value={originalValue}
              onChange={(e) => setOriginalValue(e.target.value)}
              placeholder="Enter original value"
              className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-bg-accent"
            />
          </div>

          <div>
            <label htmlFor="percentageValue" className="block text-sm font-medium text-text-secondary mb-2">
              Percentage Increase (%)
            </label>
            <input
              id="percentageValue"
              type="number"
              value={percentageValue}
              onChange={(e) => setPercentageValue(e.target.value)}
              placeholder="Enter percentage"
              className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-bg-accent"
            />
          </div>
        </div>
      )}

      {/* Reverse Mode Inputs */}
      {mode === 'reverse' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="value1" className="block text-sm font-medium text-text-secondary mb-2">
              Starting Value
            </label>
            <input
              id="value1"
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="Enter starting value"
              className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-bg-accent"
            />
          </div>

          <div>
            <label htmlFor="value2" className="block text-sm font-medium text-text-secondary mb-2">
              Final Value
            </label>
            <input
              id="value2"
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="Enter final value"
              className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-bg-accent"
            />
          </div>
        </div>
      )}

      {/* Results */}
      {mode === 'forward' && forwardResult && (
        <div className="space-y-4">
          <div className="p-6 rounded-[var(--radius-card)] border border-green-200 bg-green-50">
            <div className="text-sm text-text-secondary mb-2">New Value</div>
            <div className="text-4xl font-bold font-mono-num text-green-600">
              {forwardResult.newValue.toFixed(4)}
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius-card)] border border-border bg-surface">
            <div className="text-sm text-text-secondary mb-1">Increase Amount</div>
            <div className="text-2xl font-bold font-mono-num text-text-primary">
              +{forwardResult.increaseAmount.toFixed(4)}
            </div>
          </div>
        </div>
      )}

      {mode === 'reverse' && reverseResult && (
        <div className="space-y-4">
          <div className="p-6 rounded-[var(--radius-card)] border border-green-200 bg-green-50">
            <div className="text-sm text-text-secondary mb-2">Percentage Increase</div>
            <div className="text-4xl font-bold font-mono-num text-green-600">
              +{reverseResult.percentageIncrease.toFixed(2)}%
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius-card)] border border-border bg-surface">
            <div className="text-sm text-text-secondary mb-1">Absolute Increase</div>
            <div className="text-2xl font-bold font-mono-num text-text-primary">
              +{reverseResult.increaseAmount.toFixed(4)}
            </div>
          </div>
        </div>
      )}

      {/* Formula */}
      <div className="p-4 rounded-[var(--radius-card)] border border-border bg-surface">
        <div className="text-sm font-medium text-text-secondary mb-2">Formula</div>
        {mode === 'forward' ? (
          <div className="font-mono-num text-text-primary text-sm">
            New Value = Original × (1 + % / 100)
          </div>
        ) : (
          <div className="font-mono-num text-text-primary text-sm">
            % Increase = ((Final − Start) / Start) × 100
          </div>
        )}
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
          <a href="/percent-change-calculator" className="text-bg-accent hover:underline text-sm">
            Percent Change
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
