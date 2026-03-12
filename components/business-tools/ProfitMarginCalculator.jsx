'use client';

import { useState, useMemo } from 'react';

export default function ProfitMarginCalculator() {
  const [mode, setMode] = useState('margin'); // 'margin' or 'cost'
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [desiredMargin, setDesiredMargin] = useState('');

  const fmt = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const results = useMemo(() => {
    const cost = parseFloat(costPrice) || 0;
    const selling = parseFloat(sellingPrice) || 0;
    const margin = parseFloat(desiredMargin) || 0;

    if (mode === 'margin' && cost > 0 && selling > 0) {
      const profit = selling - cost;
      const profitMargin = (profit / selling) * 100;
      const markup = (profit / cost) * 100;
      const breakEven = cost;

      return {
        profit: profit.toFixed(2),
        profitMargin: profitMargin.toFixed(2),
        markup: markup.toFixed(2),
        breakEven: breakEven.toFixed(2),
        sellingPrice: selling.toFixed(2),
        costPrice: cost.toFixed(2),
      };
    }

    if (mode === 'cost' && cost > 0 && margin > 0) {
      const requiredSelling = cost / (1 - margin / 100);
      const profit = requiredSelling - cost;
      const markup = (profit / cost) * 100;

      return {
        profit: profit.toFixed(2),
        profitMargin: margin.toFixed(2),
        markup: markup.toFixed(2),
        breakEven: cost.toFixed(2),
        sellingPrice: requiredSelling.toFixed(2),
        costPrice: cost.toFixed(2),
      };
    }

    return null;
  }, [mode, costPrice, sellingPrice, desiredMargin]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Mode Selection */}
      <div className="flex gap-2 bg-surface border border-border rounded-[var(--radius-card)] p-1">
        <button
          onClick={() => setMode('margin')}
          className={`flex-1 px-4 py-3 rounded-[var(--radius-card)] font-medium transition-colors ${
            mode === 'margin'
              ? 'bg-accent text-white'
              : 'text-text-primary hover:bg-white'
          }`}
        >
          Know Prices
        </button>
        <button
          onClick={() => setMode('cost')}
          className={`flex-1 px-4 py-3 rounded-[var(--radius-card)] font-medium transition-colors ${
            mode === 'cost'
              ? 'bg-accent text-white'
              : 'text-text-primary hover:bg-white'
          }`}
        >
          Know Margin Target
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Cost Price</label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
          <p className="text-xs text-text-muted mt-1">What you paid for the item</p>
        </div>

        {mode === 'margin' ? (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Selling Price</label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
            <p className="text-xs text-text-muted mt-1">What you're selling it for</p>
          </div>
        ) : (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Desired Profit Margin %</label>
            <input
              type="number"
              value={desiredMargin}
              onChange={(e) => setDesiredMargin(e.target.value)}
              placeholder="0.00"
              min="0"
              max="100"
              step="0.1"
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
            <p className="text-xs text-text-muted mt-1">Target profit margin percentage</p>
          </div>
        )}
      </div>

      {/* Results */}
      {results && (
        <>
          {/* Key Metrics */}
          <div className="bg-accent-muted border-2 border-accent rounded-[var(--radius-card)] p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-text-secondary text-xs mb-1">Profit</p>
                <p className="font-mono-num text-2xl font-bold text-accent">{fmt(parseFloat(results.profit))}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Profit Margin</p>
                <p className="font-mono-num text-2xl font-bold text-accent">{results.profitMargin}%</p>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-secondary text-xs mb-1">Cost Price</p>
              <p className="font-mono-num text-xl font-bold text-text-primary">{fmt(parseFloat(results.costPrice))}</p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-secondary text-xs mb-1">Selling Price</p>
              <p className="font-mono-num text-xl font-bold text-text-primary">{fmt(parseFloat(results.sellingPrice))}</p>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-text-secondary text-xs mb-1">Break-Even</p>
              <p className="font-mono-num text-xl font-bold text-text-primary">{fmt(parseFloat(results.breakEven))}</p>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-3">
            <h4 className="text-text-primary font-semibold">Detailed Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 px-3 border-b border-border">
                <span className="text-text-secondary">Markup %</span>
                <span className="font-mono-num font-bold text-text-primary">{results.markup}%</span>
              </div>
              <div className="flex justify-between py-2 px-3">
                <span className="text-text-secondary text-sm">
                  <em>Markup = profit ÷ cost × 100</em>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="bg-info/10 border border-info rounded-[var(--radius-card)] p-4 text-sm space-y-2">
            <p className="font-medium text-text-primary">📊 Key Ratios:</p>
            <div className="space-y-1 text-text-secondary">
              <p>
                <strong>Gross Margin:</strong> {results.profitMargin}% (% of revenue that's profit)
              </p>
              <p>
                <strong>Markup:</strong> {results.markup}% (% increase on cost)
              </p>
              <p className="text-xs mt-2">
                Profit margin and markup are different: markup is usually higher than margin.
              </p>
            </div>
          </div>
        </>
      )}

      {!results && (costPrice || sellingPrice || desiredMargin) && (
        <div className="bg-warning/10 border border-warning rounded-[var(--radius-card)] p-4 text-text-secondary text-sm">
          Enter both required fields to calculate
        </div>
      )}
    </div>
  );
}
