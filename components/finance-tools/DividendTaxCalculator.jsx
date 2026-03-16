'use client';

import { useState, useMemo } from 'react';

export default function DividendTaxCalculator() {
  const [totalDividends, setTotalDividends] = useState(5000);
  const [otherIncome, setOtherIncome] = useState(35000);

  const results = useMemo(() => {
    const allowance = 1000;
    const basicRateLimit = 50270;
    const higherRateLimit = 125140;

    let taxableIncome = otherIncome;
    let taxableDividends = Math.max(0, totalDividends - allowance);
    let tax = 0;
    let breakdown = [];

    // Basic rate dividends (8.75%)
    const basicRateDividends = Math.min(
      taxableDividends,
      Math.max(0, basicRateLimit - taxableIncome)
    );
    const basicRateTax = basicRateDividends * 0.0875;
    tax += basicRateTax;
    breakdown.push({
      band: 'Basic Rate',
      rate: 8.75,
      amount: basicRateDividends,
      tax: basicRateTax,
    });

    taxableIncome += basicRateDividends;
    taxableDividends -= basicRateDividends;

    // Higher rate dividends (33.75%)
    const higherRateDividends = Math.min(
      taxableDividends,
      Math.max(0, higherRateLimit - taxableIncome)
    );
    const higherRateTax = higherRateDividends * 0.3375;
    tax += higherRateTax;
    breakdown.push({
      band: 'Higher Rate',
      rate: 33.75,
      amount: higherRateDividends,
      tax: higherRateTax,
    });

    taxableIncome += higherRateDividends;
    taxableDividends -= higherRateDividends;

    // Additional rate dividends (39.35%)
    const additionalRateTax = taxableDividends * 0.3935;
    tax += additionalRateTax;
    breakdown.push({
      band: 'Additional Rate',
      rate: 39.35,
      amount: taxableDividends,
      tax: additionalRateTax,
    });

    return {
      allowance,
      taxableDividends: totalDividends - allowance,
      totalTax: tax,
      netDividends: totalDividends - tax,
      effectiveRate: ((tax / totalDividends) * 100).toFixed(2),
      breakdown: breakdown.filter((b) => b.amount > 0),
    };
  }, [totalDividends, otherIncome]);

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Total Dividends
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={totalDividends}
              onChange={(e) => setTotalDividends(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Other Income (Salary, etc.)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={otherIncome}
              onChange={(e) => setOtherIncome(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
          <p className="text-xs text-text-muted mt-1">
            Used to determine which tax band applies to dividends
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Tax Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Tax-Free Allowance</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.allowance.toLocaleString('en-GB')}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Tax Due</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.totalTax.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Net Dividends</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.netDividends.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Tax Breakdown by Band
        </h3>
        <div className="space-y-3">
          {results.breakdown.map((item) => (
            <div key={item.band} className="border border-border rounded-[var(--radius-input)] p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-text-primary">{item.band} ({item.rate}%)</span>
                <span className="font-mono font-bold text-accent">£{item.tax.toLocaleString('en-GB', { maximumFractionDigits: 2 })}</span>
              </div>
              <p className="text-sm text-text-secondary">
                Dividends: £{item.amount.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        Rates for 2025/26 tax year. This is for reference only, not financial advice. Consult a tax specialist for your situation.
      </p>
    </div>
  );
}
