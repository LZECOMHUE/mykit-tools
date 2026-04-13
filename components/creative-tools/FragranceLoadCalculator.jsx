'use client';

import { useState, useMemo } from 'react';

const waxMaxLoads = {
  soy: { min: 8, max: 12, suggested: 10 },
  paraffin: { min: 6, max: 10, suggested: 8 },
  beeswax: { min: 4, max: 6, suggested: 5 },
  coconut: { min: 8, max: 10, suggested: 9 },
};

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";
const cardCls = "bg-white border border-border rounded-[var(--radius-card)] p-4";

export default function FragranceLoadCalculator() {
  const [waxType, setWaxType] = useState('soy');
  const [waxWeight, setWaxWeight] = useState('500');
  const [fragrancePercent, setFragrancePercent] = useState('10');

  const limits = waxMaxLoads[waxType];

  const calculation = useMemo(() => {
    const weight = parseFloat(waxWeight) || 0;
    const percent = parseFloat(fragrancePercent) || 0;

    const fragranceGrams = (weight * percent) / 100;
    const minGrams = (weight * limits.min) / 100;
    const maxGrams = (weight * limits.max) / 100;
    const suggestedGrams = (weight * limits.suggested) / 100;

    const isWithinLimit = fragranceGrams <= maxGrams;
    const isAboveMin = fragranceGrams >= minGrams;

    return {
      grams: fragranceGrams.toFixed(1),
      minGrams: minGrams.toFixed(1),
      maxGrams: maxGrams.toFixed(1),
      suggestedGrams: suggestedGrams.toFixed(1),
      isWithinLimit,
      isAboveMin,
      status: !isAboveMin ? 'below' : !isWithinLimit ? 'above' : 'optimal',
    };
  }, [waxWeight, fragrancePercent, waxType]);

  return (
    <div className="max-w-2xl space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Wax</h3>
          <div className="mb-3">
            <label className="block text-[13px] font-medium text-text-secondary mb-2">
              Wax Type
            </label>
            <select
              value={waxType}
              onChange={(e) => setWaxType(e.target.value)}
              className={selectCls}
            >
              <option value="soy">Soy</option>
              <option value="paraffin">Paraffin</option>
              <option value="beeswax">Beeswax</option>
              <option value="coconut">Coconut</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-2">
              Wax Weight (g)
            </label>
            <input
              type="number"
              value={waxWeight}
              onChange={(e) => setWaxWeight(e.target.value)}
              step="50"
              min="10"
              className={inputCls}
            />
          </div>
        </div>

        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Fragrance Load</h3>
          <div className="mb-3">
            <label className="block text-[13px] font-medium text-text-secondary mb-2">
              Percentage: {parseFloat(fragrancePercent).toFixed(1)}%
            </label>
            <input
              type="range"
              min={limits.min - 2}
              max={limits.max + 2}
              step="0.5"
              value={fragrancePercent}
              onChange={(e) => setFragrancePercent(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Result */}
      <div className={`bg-accent-muted text-center rounded-[var(--radius-card)] ${
        calculation.status === 'above' ? 'ring-2 ring-error' : calculation.status === 'below' ? 'ring-2 ring-warning' : ''
      }`}>
        <p className="text-text-muted text-[12px] mb-2">Fragrance Oil Required</p>
        <p className="font-mono text-4xl font-semibold text-accent mb-3">
          {calculation.grams}g
        </p>
        {calculation.status === 'optimal' && (
          <p className="text-[12px] text-accent font-medium">Within safe limits</p>
        )}
        {calculation.status === 'below' && (
          <p className="text-[12px] text-warning font-medium">Below recommended minimum</p>
        )}
        {calculation.status === 'above' && (
          <p className="text-[12px] text-error font-medium">Exceeds safe maximum</p>
        )}
      </div>

      {/* Guidelines */}
      <div className={cardCls}>
        <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Safe Range for {waxType.charAt(0).toUpperCase() + waxType.slice(1)} Wax</h3>
        <div className="space-y-3 text-[13px]">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-text-secondary">Minimum Load</span>
              <span className="font-mono">{limits.min}% ({calculation.minGrams}g)</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div
                className="h-2 rounded-full bg-warning"
                style={{ width: `${limits.min}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-text-secondary">Suggested Load</span>
              <span className="font-mono font-semibold text-accent">{limits.suggested}% ({calculation.suggestedGrams}g)</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div
                className="h-2 rounded-full bg-success"
                style={{ width: `${limits.suggested}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-text-secondary">Maximum Safe Load</span>
              <span className="font-mono">{limits.max}% ({calculation.maxGrams}g)</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div
                className="h-2 rounded-full bg-error"
                style={{ width: `${limits.max}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Limits Matter */}
      <div className="bg-surface/50 border border-border rounded-[var(--radius-card)] p-4">
        <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">Why These Limits?</h3>
        <p className="text-[13px] text-text-secondary leading-relaxed">
          Too little fragrance = weak scent. Too much can prevent proper curing, cause cracking, affect burn quality, or make the wax unstable. Each wax type holds fragrance differently. Follow these guidelines for best results, especially in candles and melts where scent throw matters.
        </p>
      </div>

      {/* Quick Reference */}
      <div className="bg-surface/50 border border-border rounded-[var(--radius-card)] p-4">
        <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Quick Reference</h3>
        <div className="grid grid-cols-2 gap-3 text-[12px]">
          <div>
            <p className="text-text-muted">Soy</p>
            <p className="font-mono font-semibold text-text-primary">8-12%</p>
          </div>
          <div>
            <p className="text-text-muted">Paraffin</p>
            <p className="font-mono font-semibold text-text-primary">6-10%</p>
          </div>
          <div>
            <p className="text-text-muted">Beeswax</p>
            <p className="font-mono font-semibold text-text-primary">4-6%</p>
          </div>
          <div>
            <p className="text-text-muted">Coconut</p>
            <p className="font-mono font-semibold text-text-primary">8-10%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
