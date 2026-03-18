'use client';

import { useState, useMemo } from 'react';
import { getFederalTax, getStateTax, STATE_TAX_RATES } from '@/data/us-tax-rates';

export default function USStateComparison() {
  const [annualIncome, setAnnualIncome] = useState('100000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [selectedStates, setSelectedStates] = useState(['CA', 'TX', 'FL']);

  const fmt = (n) => '$' + parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (n) => parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtPercent = (n) => (parseFloat(n || 0) * 100).toFixed(2) + '%';

  const allStates = Object.entries(STATE_TAX_RATES)
    .map(([code, data]) => ({ code, ...data }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const calculations = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    if (income <= 0) return null;

    const federalTax = getFederalTax(income, filingStatus);

    const stateComparisons = selectedStates.map((stateCode) => {
      const stateTax = getStateTax(income, stateCode);
      const totalTax = federalTax + stateTax;
      const takeHome = income - totalTax;
      const effectiveRate = (totalTax / income) * 100;
      const stateInfo = STATE_TAX_RATES[stateCode];

      return {
        code: stateCode,
        name: stateInfo.name,
        federalTax: federalTax.toFixed(2),
        stateTax: stateTax.toFixed(2),
        totalTax: totalTax.toFixed(2),
        takeHome: takeHome.toFixed(2),
        effectiveRate: effectiveRate.toFixed(2),
      };
    });

    // Find best and worst states
    const bestState = stateComparisons.reduce((prev, current) =>
      parseFloat(current.totalTax) < parseFloat(prev.totalTax) ? current : prev
    );
    const worstState = stateComparisons.reduce((prev, current) =>
      parseFloat(current.totalTax) > parseFloat(prev.totalTax) ? current : prev
    );

    const taxDifference = parseFloat(worstState.totalTax) - parseFloat(bestState.totalTax);

    return {
      income,
      federalTax: federalTax.toFixed(2),
      stateComparisons,
      bestState,
      worstState,
      taxDifference: taxDifference.toFixed(2),
    };
  }, [annualIncome, filingStatus, selectedStates]);

  const toggleState = (code) => {
    if (selectedStates.includes(code)) {
      if (selectedStates.length > 1) {
        setSelectedStates(selectedStates.filter((c) => c !== code));
      }
    } else {
      if (selectedStates.length < 5) {
        setSelectedStates([...selectedStates, code]);
      }
    }
  };

  if (!calculations) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <p className="text-text-secondary">Enter your income to compare states</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-blue-900 mb-1">Disclaimer</p>
        <p>This is a simplified comparison. Actual tax liability depends on deductions, credits, and other factors. Consult a tax professional.</p>
      </div>

      {/* Inputs */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-text-primary">US State Tax Comparison</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Annual Income ($)</label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            >
              <option value="single">Single</option>
              <option value="married_filing_jointly">Married Filing Jointly</option>
              <option value="married_filing_separately">Married Filing Separately</option>
              <option value="head_of_household">Head of Household</option>
            </select>
          </div>
        </div>

        {/* State Selection */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Select States to Compare ({selectedStates.length}/5)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-2 bg-white rounded-lg border border-border">
            {allStates.map((state) => (
              <button
                key={state.code}
                onClick={() => toggleState(state.code)}
                disabled={!selectedStates.includes(state.code) && selectedStates.length >= 5}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStates.includes(state.code)
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {state.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Best/Worst Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <p className="text-green-600 text-sm font-medium mb-1">Best State (Lowest Tax)</p>
          <p className="text-2xl font-bold text-green-700 mb-2">{calculations.bestState.name}</p>
          <p className="text-green-600 text-sm">
            Take home: <span className="font-mono font-semibold">{fmt(calculations.bestState.takeHome)}</span>
          </p>
          <p className="text-green-600 text-sm">
            Total tax: <span className="font-mono font-semibold">{fmt(calculations.bestState.totalTax)}</span> (
            {calculations.bestState.effectiveRate}%)
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 text-sm font-medium mb-1">Highest Tax State</p>
          <p className="text-2xl font-bold text-red-700 mb-2">{calculations.worstState.name}</p>
          <p className="text-red-600 text-sm">
            Take home: <span className="font-mono font-semibold">{fmt(calculations.worstState.takeHome)}</span>
          </p>
          <p className="text-red-600 text-sm">
            Total tax: <span className="font-mono font-semibold">{fmt(calculations.worstState.totalTax)}</span> (
            {calculations.worstState.effectiveRate}%)
          </p>
        </div>
      </div>

      {/* Tax Difference */}
      <div className="bg-accent-muted border border-accent rounded-lg p-6">
        <p className="text-accent text-sm font-medium mb-1">Tax Difference Between Best & Worst</p>
        <p className="text-3xl font-bold text-accent mb-2">{fmt(calculations.taxDifference)}</p>
        <p className="text-accent text-sm">
          By choosing {calculations.bestState.name}, you save{' '}
          <span className="font-mono font-semibold">{fmt(calculations.taxDifference)}</span> per year compared to{' '}
          {calculations.worstState.name}
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Detailed Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left py-3 px-3 text-text-secondary font-medium">State</th>
                <th className="text-right py-3 px-3 text-text-secondary font-medium">Federal Tax</th>
                <th className="text-right py-3 px-3 text-text-secondary font-medium">State Tax</th>
                <th className="text-right py-3 px-3 text-text-secondary font-medium">Total Tax</th>
                <th className="text-right py-3 px-3 text-text-secondary font-medium">Take Home</th>
                <th className="text-right py-3 px-3 text-text-secondary font-medium">Effective Rate</th>
              </tr>
            </thead>
            <tbody>
              {calculations.stateComparisons
                .sort((a, b) => parseFloat(a.totalTax) - parseFloat(b.totalTax))
                .map((state) => {
                  const isBest = state.code === calculations.bestState.code;
                  const isWorst = state.code === calculations.worstState.code;

                  return (
                    <tr
                      key={state.code}
                      className={`border-b border-border hover:bg-white ${isBest ? 'bg-green-50' : isWorst ? 'bg-red-50' : ''}`}
                    >
                      <td className="py-3 px-3 text-text-secondary font-semibold">
                        {state.name} ({state.code})
                        {isBest && <span className="ml-2 text-green-600 font-bold">✓ Best</span>}
                        {isWorst && <span className="ml-2 text-red-600 font-bold">✗ Highest</span>}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-text-primary">{fmt(state.federalTax)}</td>
                      <td className="py-3 px-3 text-right font-mono text-text-primary">{fmt(state.stateTax)}</td>
                      <td className="py-3 px-3 text-right font-mono font-semibold text-text-primary">{fmt(state.totalTax)}</td>
                      <td className="py-3 px-3 text-right font-mono font-semibold text-accent">{fmt(state.takeHome)}</td>
                      <td className="py-3 px-3 text-right font-mono text-text-primary">{state.effectiveRate}%</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* State Tax Type Breakdown */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">State Tax Information</h3>
        <div className="space-y-3">
          {calculations.stateComparisons.map((state) => {
            const stateData = STATE_TAX_RATES[state.code];
            const taxType =
              stateData.rate === 0
                ? 'No income tax'
                : stateData.type === 'flat'
                  ? `Flat ${(stateData.rate * 100).toFixed(2)}%`
                  : `Progressive (top rate: ${(stateData.rate * 100).toFixed(2)}%)`;

            return (
              <div key={state.code} className="border-b border-border pb-3 last:border-b-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-text-primary">{state.name}</span>
                  <span className="text-text-muted text-xs">{taxType}</span>
                </div>
                <p className="text-text-secondary text-sm">{stateData.note || ''}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* No Income Tax States */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">States with No Income Tax</h3>
        <p className="text-text-secondary text-sm mb-3">
          These 9 states don't tax regular wages or salaries:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {allStates
            .filter((s) => s.rate === 0)
            .map((state) => (
              <div key={state.code} className="bg-white rounded-lg p-2 text-center">
                <p className="font-semibold text-text-primary">{state.name}</p>
                <p className="text-text-muted text-xs">{state.code}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Tax Planning Tips</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>✓ State tax is only one factor in relocation - consider cost of living, job market, weather</li>
          <li>✓ Some states have no income tax but higher sales tax or property tax</li>
          <li>✓ Federal taxes are the same regardless of state</li>
          <li>✓ If you're remote, check if your state taxes based on where you work vs. where you live</li>
          <li>✓ Retirement income (Social Security, pensions) may be taxed differently by state</li>
          <li>✓ New Hampshire has no income tax on wages but taxes interest and dividends</li>
          <li>✓ Consult a tax professional before making relocation decisions</li>
        </ul>
      </div>

      {/* Quick Income Buttons */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-text-primary font-semibold mb-4">Quick Income Amounts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[50000, 75000, 100000, 150000, 200000, 250000, 300000, 500000].map((income) => (
            <button
              key={income}
              onClick={() => setAnnualIncome(income.toString())}
              className="px-3 py-2 rounded-lg bg-white border border-border text-text-primary hover:bg-accent hover:text-white hover:border-accent font-medium transition-colors text-sm"
            >
              {fmt(income)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
