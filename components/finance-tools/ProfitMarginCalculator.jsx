'use client';

import { useState, useMemo } from 'react';

export default function ProfitMarginCalculator() {
  const [revenue, setRevenue] = useState('');
  const [cost, setCost] = useState('');

  const fmt = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const results = useMemo(() => {
    const rev = parseFloat(revenue) || 0;
    const cst = parseFloat(cost) || 0;
    const grossProfit = rev - cst;
    const profitMargin = rev > 0 ? (grossProfit / rev) * 100 : 0;
    const markup = cst > 0 ? (grossProfit / cst) * 100 : 0;

    return {
      revenue: rev,
      cost: cst,
      grossProfit,
      profitMargin,
      markup,
    };
  }, [revenue, cost]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Input Section */}
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Revenue / Selling Price
          </label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Cost of Goods Sold
          </label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>
      </div>

      {/* Main Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Gross Profit</p>
          <p className="font-mono-num text-3xl font-bold text-accent">
            {fmt(results.grossProfit)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Profit Margin</p>
          <p className="font-mono-num text-3xl font-bold text-text-primary">
            {results.profitMargin.toFixed(2)}%
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Markup</p>
          <p className="font-mono-num text-3xl font-bold text-text-primary">
            {results.markup.toFixed(2)}%
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Cost as % of Revenue</p>
          <p className="font-mono-num text-3xl font-bold text-text-primary">
            {((results.cost / results.revenue) * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h3 className="text-text-primary font-semibold mb-4">Detailed Breakdown</h3>

        <div className="space-y-3 font-mono-num text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">Revenue:</span>
            <span className="text-text-primary font-semibold">{fmt(results.revenue)}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">Cost of Goods Sold:</span>
            <span className="text-text-primary font-semibold">{fmt(results.cost)}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-border bg-white bg-opacity-50 px-3 rounded-[var(--radius-input)]">
            <span className="text-text-primary font-semibold">Gross Profit:</span>
            <span className="text-accent font-bold">{fmt(results.grossProfit)}</span>
          </div>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <h3 className="text-text-primary font-semibold">Understanding Margin vs Markup</h3>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-text-secondary font-medium mb-2">Profit Margin</p>
            <p className="text-text-muted mb-2">
              Profit divided by revenue. Shows what percentage of each pound of revenue is profit.
            </p>
            <div className="bg-surface rounded-[var(--radius-input)] p-3 font-mono-num text-xs text-text-muted">
              Margin = (Profit ÷ Revenue) × 100
            </div>
          </div>

          <div>
            <p className="text-text-secondary font-medium mb-2">Markup</p>
            <p className="text-text-muted mb-2">
              Profit divided by cost. Shows how much you've added to your cost to reach the selling price.
            </p>
            <div className="bg-surface rounded-[var(--radius-input)] p-3 font-mono-num text-xs text-text-muted">
              Markup = (Profit ÷ Cost) × 100
            </div>
          </div>

          <div className="bg-accent bg-opacity-10 rounded-[var(--radius-input)] p-3">
            <p className="text-text-primary text-xs font-semibold mb-1">Key Difference</p>
            <p className="text-text-secondary text-xs">
              Markup is always higher than margin because profit is divided by a smaller number (cost vs revenue). A 50% markup ≠ 50% margin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
