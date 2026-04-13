'use client';

import { useState } from 'react';

export default function PricingCalculator() {
  const [costPerUnit, setCostPerUnit] = useState(10);
  const [pricingMode, setPricingMode] = useState('margin');
  const [marginPercent, setMarginPercent] = useState(30);
  const [markupPercent, setMarkupPercent] = useState(50);

  const sellingPrice = pricingMode === 'margin'
    ? costPerUnit / (1 - marginPercent / 100)
    : costPerUnit * (1 + markupPercent / 100);

  const profit = sellingPrice - costPerUnit;
  const profitMargin = ((profit / sellingPrice) * 100).toFixed(1);
  const profitMarkup = ((profit / costPerUnit) * 100).toFixed(1);

  const bulkTiers = [
    { qty: 1, discount: 0 },
    { qty: 10, discount: 5 },
    { qty: 50, discount: 10 },
    { qty: 100, discount: 15 },
    { qty: 500, discount: 20 },
  ];

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Cost Per Unit
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={costPerUnit}
              onChange={(e) => setCostPerUnit(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Pricing Method
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setPricingMode('margin')}
              className={`flex-1 px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition ${
                pricingMode === 'margin'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Margin
            </button>
            <button
              onClick={() => setPricingMode('markup')}
              className={`flex-1 px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition ${
                pricingMode === 'markup'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Markup
            </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            {pricingMode === 'margin' ? 'Desired Margin (%)' : 'Desired Markup (%)'}
          </label>
          <input
            type="number"
            value={pricingMode === 'margin' ? marginPercent : markupPercent}
            onChange={(e) => {
              if (pricingMode === 'margin') {
                setMarginPercent(Number(e.target.value));
              } else {
                setMarkupPercent(Number(e.target.value));
              }
            }}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Pricing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Cost</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{costPerUnit.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Selling Price</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{sellingPrice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Profit Per Unit</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{profit.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Margin %</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              {profitMargin}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Bulk Pricing
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-primary">Quantity</th>
                <th className="text-right py-2 px-2 font-medium text-text-primary">Discount</th>
                <th className="text-right py-2 px-2 font-medium text-text-primary">Unit Price</th>
                <th className="text-right py-2 px-2 font-medium text-text-primary">Total</th>
              </tr>
            </thead>
            <tbody>
              {bulkTiers.map((tier) => {
                const discountedPrice = sellingPrice * (1 - tier.discount / 100);
                const total = discountedPrice * tier.qty;
                return (
                  <tr key={tier.qty} className="border-b border-border hover:bg-surface">
                    <td className="py-2 px-2 text-text-primary">{tier.qty}</td>
                    <td className="text-right py-2 px-2 text-accent">-{tier.discount}%</td>
                    <td className="text-right py-2 px-2 font-mono text-text-primary">
                      £{discountedPrice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="text-right py-2 px-2 font-mono font-bold text-text-primary">
                      £{total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
