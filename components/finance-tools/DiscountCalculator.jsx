'use client';

import { useState, useMemo } from 'react';

export default function DiscountCalculator() {
  const [mode, setMode] = useState('forward'); // 'forward' or 'reverse'
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [paidAmount, setPaidAmount] = useState('');

  const fmt = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const results = useMemo(() => {
    if (mode === 'forward') {
      const original = parseFloat(originalPrice) || 0;
      const discount = parseFloat(discountPercentage) || 0;
      const discountAmount = (original * discount) / 100;
      const finalPrice = original - discountAmount;

      return {
        originalPrice: original,
        discountAmount,
        finalPrice,
        discountPercentage: discount,
      };
    } else {
      const paid = parseFloat(paidAmount) || 0;
      const discount = parseFloat(discountPercentage) || 0;
      const original = paid / (1 - discount / 100);
      const discountAmount = original - paid;

      return {
        originalPrice: original,
        discountAmount,
        finalPrice: paid,
        discountPercentage: discount,
      };
    }
  }, [mode, originalPrice, discountPercentage, paidAmount]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-2 bg-surface border border-border rounded-[var(--radius-card)] p-2">
        <button
          onClick={() => setMode('forward')}
          className={`flex-1 px-4 py-2 rounded-[var(--radius-input)] font-medium transition-colors ${
            mode === 'forward'
              ? 'bg-accent text-white'
              : 'text-text-primary hover:bg-white'
          }`}
        >
          Calculate Final Price
        </button>
        <button
          onClick={() => setMode('reverse')}
          className={`flex-1 px-4 py-2 rounded-[var(--radius-input)] font-medium transition-colors ${
            mode === 'reverse'
              ? 'bg-accent text-white'
              : 'text-text-primary hover:bg-white'
          }`}
        >
          Find Original Price
        </button>
      </div>

      {/* Input Section */}
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        {mode === 'forward' ? (
          <>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Original Price
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Discount Percentage
              </label>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Amount Paid
              </label>
              <input
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Discount Percentage
              </label>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
          </>
        )}
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Original Price</p>
          <p className="font-mono-num text-3xl font-bold text-text-primary">
            {fmt(results.originalPrice)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Discount Amount</p>
          <p className="font-mono-num text-3xl font-bold text-accent">
            {fmt(results.discountAmount)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Final Price</p>
          <p className="font-mono-num text-3xl font-bold text-text-primary">
            {fmt(results.finalPrice)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">You Save</p>
          <p className="font-mono-num text-2xl font-bold text-accent">
            {results.discountPercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <p className="text-text-secondary text-sm mb-2">Summary</p>
        <div className="space-y-2 font-mono-num">
          <div className="flex justify-between">
            <span className="text-text-secondary">Original price:</span>
            <span className="text-text-primary font-semibold">{fmt(results.originalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Discount ({results.discountPercentage.toFixed(1)}%):</span>
            <span className="text-accent font-semibold">-{fmt(results.discountAmount)}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between">
            <span className="text-text-primary font-semibold">Final price:</span>
            <span className="text-text-primary font-bold text-lg">{fmt(results.finalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
