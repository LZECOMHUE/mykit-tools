'use client';

import { useState, useMemo } from 'react';

export default function InflationCalculator() {
  const [mode, setMode] = useState('historical');
  const [amount, setAmount] = useState(1000);
  const [inflationRate, setInflationRate] = useState(3);
  const [yearValue, setYearValue] = useState(2020);
  const [futureYears, setFutureYears] = useState(10);

  const currentYear = new Date().getFullYear();

  const results = useMemo(() => {
    const rate = inflationRate / 100;

    if (mode === 'historical') {
      // Calculate what £X in yearValue would be worth today
      const yearsAgo = currentYear - yearValue;
      const equivalentValue = amount * Math.pow(1 + rate, yearsAgo);
      const totalInflation = ((equivalentValue - amount) / amount) * 100;
      const purchasingPowerChange = ((amount - equivalentValue) / equivalentValue) * 100;

      // Year-by-year breakdown
      const yearlyBreakdown = [];
      for (let i = 0; i <= yearsAgo; i++) {
        const year = yearValue + i;
        const value = amount * Math.pow(1 + rate, i);
        yearlyBreakdown.push({
          year,
          value,
        });
      }

      return {
        equivalentValue,
        totalInflation,
        purchasingPowerChange,
        yearlyBreakdown,
        description: `£${amount.toFixed(2)} in ${yearValue} is equivalent to £${equivalentValue.toFixed(2)} today (${currentYear})`,
      };
    } else {
      // Calculate what £X today would be worth in futureYears
      const futureValue = amount * Math.pow(1 + rate, futureYears);
      const totalInflation = ((futureValue - amount) / amount) * 100;
      const purchasingPowerChange = ((amount - futureValue) / futureValue) * 100;

      // Year-by-year breakdown
      const yearlyBreakdown = [];
      for (let i = 0; i <= futureYears; i++) {
        const year = currentYear + i;
        const value = amount * Math.pow(1 + rate, i);
        yearlyBreakdown.push({
          year,
          value,
        });
      }

      return {
        equivalentValue: futureValue,
        totalInflation,
        purchasingPowerChange,
        yearlyBreakdown,
        description: `£${amount.toFixed(2)} today will be equivalent to £${futureValue.toFixed(2)} in ${currentYear + futureYears}`,
      };
    }
  }, [mode, amount, inflationRate, yearValue, futureYears, currentYear]);

  const formatCurrency = (value) => {
    return '£' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Inflation Calculator</h2>

      {/* Mode Toggle */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-text-primary mb-3">Calculator Mode</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="historical"
              checked={mode === 'historical'}
              onChange={(e) => setMode(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-text-primary">What was it worth then?</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="future"
              checked={mode === 'future'}
              onChange={(e) => setMode(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-text-primary">What will it be worth?</span>
          </label>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-8">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Amount (£)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="100"
          />
          <p className="text-xs text-text-muted mt-1">
            {mode === 'historical' ? 'Amount in the past year' : 'Amount today'}
          </p>
        </div>

        {/* Inflation Rate */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Average Annual Inflation Rate (%)
          </label>
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="0.1"
          />
          <p className="text-xs text-text-muted mt-1">
            UK CPI average is around 2-3% historically. Current target is 2%.
          </p>
        </div>

        {/* Historical or Future Year */}
        {mode === 'historical' ? (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Year
            </label>
            <input
              type="number"
              value={yearValue}
              onChange={(e) => setYearValue(parseInt(e.target.value) || currentYear)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
              min="1900"
              max={currentYear}
              step="1"
            />
            <p className="text-xs text-text-muted mt-1">
              What year was the amount worth £{amount.toFixed(0)}?
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Years in the Future
            </label>
            <input
              type="number"
              value={futureYears}
              onChange={(e) => setFutureYears(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
              min="0"
              step="1"
            />
            <p className="text-xs text-text-muted mt-1">
              How many years from now?
            </p>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border space-y-4">
        <div>
          <p className="text-text-secondary text-sm mb-1">
            {mode === 'historical' ? 'Equivalent Value Today' : 'Equivalent Value in Future'}
          </p>
          <p className="text-3xl font-bold text-accent font-mono-num">
            {formatCurrency(results.equivalentValue)}
          </p>
          <p className="text-sm text-text-muted mt-2">{results.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-text-secondary text-sm mb-1">Total Inflation Effect</p>
            <p className="text-xl font-bold text-text-primary font-mono-num">
              {results.totalInflation > 0 ? '+' : ''}{results.totalInflation.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Purchasing Power Change</p>
            <p className="text-xl font-bold text-text-primary font-mono-num">
              {results.purchasingPowerChange > 0 ? '+' : ''}{results.purchasingPowerChange.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Year-by-Year Breakdown */}
      <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
        <h3 className="text-lg font-bold text-text-primary mb-4">Year-by-Year Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="text-left px-3 py-2 text-text-primary font-semibold">Year</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              {results.yearlyBreakdown.map((row, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-surface">
                  <td className="px-3 py-2 text-text-primary">{row.year}</td>
                  <td className="text-right px-3 py-2 text-text-primary font-mono-num">
                    {formatCurrency(row.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information */}
      <div className="mt-6 bg-white rounded-[var(--radius-card)] p-4 border border-border text-xs text-text-muted">
        <p className="font-semibold text-text-primary mb-2">How This Works:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Uses the compound inflation formula: Future Value = Present Value × (1 + inflation rate)^years</li>
          <li>Inflation rate should be the average annual rate for the period</li>
          <li>UK inflation varies year-to-year — use average rates for best estimates</li>
          <li>This is a simplified calculation that doesn't account for varying inflation across years</li>
        </ul>
      </div>
    </div>
  );
}
