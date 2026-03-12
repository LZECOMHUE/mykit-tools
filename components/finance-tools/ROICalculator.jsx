'use client';

import { useState, useMemo } from 'react';

export default function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [timePeriodUnit, setTimePeriodUnit] = useState('years'); // 'years' or 'months'

  const fmt = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const results = useMemo(() => {
    const initial = parseFloat(initialInvestment) || 0;
    const final = parseFloat(finalValue) || 0;
    const gain = final - initial;
    const roi = initial > 0 ? (gain / initial) * 100 : 0;

    let annualizedROI = 0;
    const period = parseFloat(timePeriod);

    if (initial > 0 && period > 0) {
      let years = timePeriodUnit === 'years' ? period : period / 12;
      if (years > 0) {
        // Compound annual growth rate (CAGR)
        const cagr = Math.pow(final / initial, 1 / years) - 1;
        annualizedROI = cagr * 100;
      }
    }

    return {
      initialInvestment: initial,
      finalValue: final,
      gainLoss: gain,
      roi,
      annualizedROI,
      hasTimePeriod: timePeriod && period > 0,
    };
  }, [initialInvestment, finalValue, timePeriod, timePeriodUnit]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Input Section */}
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Initial Investment
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Final Value
          </label>
          <input
            type="number"
            value={finalValue}
            onChange={(e) => setFinalValue(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Time Period (Optional)
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              placeholder="0"
              className="flex-1 px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
            <select
              value={timePeriodUnit}
              onChange={(e) => setTimePeriodUnit(e.target.value)}
              className="px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
          <p className="text-text-muted text-xs mt-2">Enter time period to calculate annualized ROI (CAGR)</p>
        </div>
      </div>

      {/* Main Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Gain / Loss</p>
          <p className={`font-mono-num text-3xl font-bold ${results.gainLoss >= 0 ? 'text-accent' : 'text-error'}`}>
            {results.gainLoss >= 0 ? '+' : ''}{fmt(results.gainLoss)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">ROI</p>
          <p className={`font-mono-num text-3xl font-bold ${results.roi >= 0 ? 'text-accent' : 'text-error'}`}>
            {results.roi >= 0 ? '+' : ''}{results.roi.toFixed(2)}%
          </p>
        </div>

        {results.hasTimePeriod && (
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:col-span-2">
            <p className="text-text-secondary text-sm mb-1">Annualized ROI (CAGR)</p>
            <p className={`font-mono-num text-3xl font-bold ${results.annualizedROI >= 0 ? 'text-accent' : 'text-error'}`}>
              {results.annualizedROI >= 0 ? '+' : ''}{results.annualizedROI.toFixed(2)}% per year
            </p>
          </div>
        )}
      </div>

      {/* Detailed Summary */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h3 className="text-text-primary font-semibold mb-4">Summary</h3>

        <div className="space-y-3 font-mono-num text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">Initial Investment:</span>
            <span className="text-text-primary font-semibold">{fmt(results.initialInvestment)}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">Final Value:</span>
            <span className="text-text-primary font-semibold">{fmt(results.finalValue)}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-border bg-white bg-opacity-50 px-3 rounded-[var(--radius-input)]">
            <span className={`font-semibold ${results.gainLoss >= 0 ? 'text-accent' : 'text-error'}`}>
              Gain/Loss:
            </span>
            <span className={`font-bold ${results.gainLoss >= 0 ? 'text-accent' : 'text-error'}`}>
              {results.gainLoss >= 0 ? '+' : ''}{fmt(results.gainLoss)}
            </span>
          </div>

          <div className="flex justify-between py-2 bg-accent bg-opacity-10 px-3 rounded-[var(--radius-input)]">
            <span className="text-accent font-semibold">ROI:</span>
            <span className="text-accent font-bold text-lg">
              {results.roi >= 0 ? '+' : ''}{results.roi.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Formula Explanation */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <h3 className="text-text-primary font-semibold">How It Works</h3>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-text-secondary font-medium mb-2">Return on Investment (ROI)</p>
            <p className="text-text-muted mb-2">
              Measures the profit or loss generated from an investment relative to your initial investment.
            </p>
            <div className="bg-surface rounded-[var(--radius-input)] p-3 font-mono-num text-xs text-text-muted">
              ROI = (Final Value - Initial Investment) / Initial Investment × 100
            </div>
          </div>

          {results.hasTimePeriod && (
            <div>
              <p className="text-text-secondary font-medium mb-2">Annualized ROI (CAGR)</p>
              <p className="text-text-muted mb-2">
                Compound Annual Growth Rate shows average annual growth, accounting for the time period.
              </p>
              <div className="bg-surface rounded-[var(--radius-input)] p-3 font-mono-num text-xs text-text-muted">
                CAGR = (Final Value / Initial Investment)^(1 / Years) - 1
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
