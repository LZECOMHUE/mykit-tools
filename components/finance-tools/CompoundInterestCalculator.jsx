'use client';

import { useState, useMemo } from 'react';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [annualRate, setAnnualRate] = useState(5);
  const [compoundFrequency, setCompoundFrequency] = useState('annually');
  const [years, setYears] = useState(10);
  const [monthlyContribution, setMonthlyContribution] = useState(0);

  const compoundFrequencyValues = {
    daily: 365,
    monthly: 12,
    quarterly: 4,
    annually: 1,
  };

  const results = useMemo(() => {
    const r = annualRate / 100;
    const n = compoundFrequencyValues[compoundFrequency];
    const t = years;

    // Compound interest formula: A = P(1 + r/n)^(nt)
    let finalAmount = principal * Math.pow(1 + r / n, n * t);

    // Add monthly contributions if any
    if (monthlyContribution > 0) {
      // Future value of annuity formula: FV = PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
      // But for monthly contributions with quarterly/annual compounding, we approximate by adding year by year
      let tempAmount = principal;
      for (let year = 0; year < t; year++) {
        for (let month = 0; month < 12; month++) {
          tempAmount += monthlyContribution;
          tempAmount *= Math.pow(1 + r / n, 1 / 12); // Apply interest monthly
        }
      }
      finalAmount = tempAmount;
    }

    const totalContributions = principal + monthlyContribution * 12 * t;
    const totalInterest = finalAmount - totalContributions;

    // Year-by-year breakdown
    const yearlyBreakdown = [];
    let amount = principal;
    for (let year = 1; year <= t; year++) {
      for (let month = 0; month < 12; month++) {
        amount += monthlyContribution;
        amount *= Math.pow(1 + r / n, 1 / 12);
      }
      yearlyBreakdown.push({
        year,
        amount: amount,
        interestEarned: amount - totalContributions,
      });
    }

    return {
      finalAmount,
      totalInterest,
      totalContributions,
      yearlyBreakdown,
    };
  }, [principal, annualRate, compoundFrequency, years, monthlyContribution]);

  const formatCurrency = (value) => {
    return '£' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Compound Interest Calculator</h2>

      {/* Inputs */}
      <div className="space-y-4 mb-8">
        {/* Principal Amount */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Principal Amount (£)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="100"
          />
          <p className="text-xs text-text-muted mt-1">Starting amount to invest</p>
        </div>

        {/* Annual Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="0.1"
          />
          <p className="text-xs text-text-muted mt-1">Annual percentage rate</p>
        </div>

        {/* Compound Frequency */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Compound Frequency
          </label>
          <select
            value={compoundFrequency}
            onChange={(e) => setCompoundFrequency(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
          <p className="text-xs text-text-muted mt-1">How often interest is compounded</p>
        </div>

        {/* Time Period */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Time Period (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="1"
          />
          <p className="text-xs text-text-muted mt-1">Investment duration</p>
        </div>

        {/* Monthly Contribution */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Monthly Contribution (£) <span className="text-text-muted">Optional</span>
          </label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="10"
          />
          <p className="text-xs text-text-muted mt-1">Additional monthly savings</p>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border space-y-4">
        <div>
          <p className="text-text-secondary text-sm mb-1">Final Amount</p>
          <p className="text-3xl font-bold text-accent font-mono-num">
            {formatCurrency(results.finalAmount)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-text-secondary text-sm mb-1">Total Interest Earned</p>
            <p className="text-xl font-bold text-text-primary font-mono-num">
              {formatCurrency(results.totalInterest)}
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Total Contributions</p>
            <p className="text-xl font-bold text-text-primary font-mono-num">
              {formatCurrency(results.totalContributions)}
            </p>
          </div>
        </div>
      </div>

      {/* Formula */}
      <div className="bg-white rounded-[var(--radius-card)] p-4 mb-8 border border-border">
        <p className="text-sm text-text-secondary mb-2">Formula Used:</p>
        <p className="font-mono-num text-text-primary">A = P(1 + r/n)^(nt)</p>
        <p className="text-xs text-text-muted mt-2">Where: A = Final amount, P = Principal, r = Rate, n = Compounds per year, t = Time in years</p>
      </div>

      {/* Year-by-Year Breakdown */}
      <div>
        <h3 className="text-lg font-bold text-text-primary mb-4">Year-by-Year Growth</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="text-left px-3 py-2 text-text-primary font-semibold">Year</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Amount</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Interest Earned</th>
              </tr>
            </thead>
            <tbody>
              {results.yearlyBreakdown.map((row, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-surface">
                  <td className="px-3 py-2 text-text-primary">{row.year}</td>
                  <td className="text-right px-3 py-2 text-text-primary font-mono-num">
                    {formatCurrency(row.amount)}
                  </td>
                  <td className="text-right px-3 py-2 text-text-primary font-mono-num">
                    {formatCurrency(row.interestEarned)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
