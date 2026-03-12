'use client';

import { useState, useMemo } from 'react';

export default function MarkupCalculator() {
  const [mode, setMode] = useState('fromMarkup'); // 'fromMarkup' or 'fromPrice'
  const [costPrice, setCostPrice] = useState('');
  const [markupPercentage, setMarkupPercentage] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  const fmt = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const results = useMemo(() => {
    if (mode === 'fromMarkup') {
      const cost = parseFloat(costPrice) || 0;
      const markup = parseFloat(markupPercentage) || 0;
      const selling = cost * (1 + markup / 100);
      const profit = selling - cost;
      const profitMargin = (profit / selling) * 100;

      return {
        costPrice: cost,
        sellingPrice: selling,
        markupPercentage: markup,
        profitAmount: profit,
        profitMargin: profitMargin,
      };
    } else {
      const cost = parseFloat(costPrice) || 0;
      const selling = parseFloat(sellingPrice) || 0;
      const profit = selling - cost;
      const markup = cost > 0 ? (profit / cost) * 100 : 0;
      const profitMargin = selling > 0 ? (profit / selling) * 100 : 0;

      return {
        costPrice: cost,
        sellingPrice: selling,
        markupPercentage: markup,
        profitAmount: profit,
        profitMargin: profitMargin,
      };
    }
  }, [mode, costPrice, markupPercentage, sellingPrice]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-2 bg-surface border border-border rounded-[var(--radius-card)] p-2">
        <button
          onClick={() => setMode('fromMarkup')}
          className={`flex-1 px-4 py-2 rounded-[var(--radius-input)] font-medium transition-colors text-sm ${
            mode === 'fromMarkup'
              ? 'bg-accent text-white'
              : 'text-text-primary hover:bg-white'
          }`}
        >
          Cost + Markup
        </button>
        <button
          onClick={() => setMode('fromPrice')}
          className={`flex-1 px-4 py-2 rounded-[var(--radius-input)] font-medium transition-colors text-sm ${
            mode === 'fromPrice'
              ? 'bg-accent text-white'
              : 'text-text-primary hover:bg-white'
          }`}
        >
          Cost + Selling Price
        </button>
      </div>

      {/* Input Section */}
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Cost Price
          </label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        {mode === 'fromMarkup' ? (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Markup Percentage
            </label>
            <input
              type="number"
              value={markupPercentage}
              onChange={(e) => setMarkupPercentage(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        ) : (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Selling Price
            </label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Selling Price</p>
          <p className="font-mono-num text-3xl font-bold text-accent">
            {fmt(results.sellingPrice)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Markup</p>
          <p className="font-mono-num text-3xl font-bold text-text-primary">
            {results.markupPercentage.toFixed(2)}%
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Profit Amount</p>
          <p className="font-mono-num text-3xl font-bold text-text-primary">
            {fmt(results.profitAmount)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Profit Margin</p>
          <p className="font-mono-num text-3xl font-bold text-accent">
            {results.profitMargin.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Detailed Summary */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <h3 className="text-text-primary font-semibold">Breakdown</h3>

        <div className="space-y-2 font-mono-num text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Cost Price:</span>
            <span className="text-text-primary font-semibold">{fmt(results.costPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Selling Price:</span>
            <span className="text-text-primary font-semibold">{fmt(results.sellingPrice)}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between">
            <span className="text-text-secondary">Profit:</span>
            <span className="text-accent font-semibold">{fmt(results.profitAmount)}</span>
          </div>
        </div>

        <div className="bg-white rounded-[var(--radius-input)] p-4 space-y-2 text-sm">
          <p className="text-text-secondary">
            <span className="font-semibold text-text-primary">Markup</span> is the profit on your cost price:
          </p>
          <p className="font-mono-num text-text-muted">({fmt(results.profitAmount)} ÷ {fmt(results.costPrice)}) × 100 = {results.markupPercentage.toFixed(2)}%</p>

          <p className="text-text-secondary mt-3">
            <span className="font-semibold text-text-primary">Profit Margin</span> is the profit on your selling price:
          </p>
          <p className="font-mono-num text-text-muted">({fmt(results.profitAmount)} ÷ {fmt(results.sellingPrice)}) × 100 = {results.profitMargin.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}
