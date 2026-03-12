'use client';

import { useState, useMemo } from 'react';

export default function PayRiseCalculator() {
  const [mode, setMode] = useState('newSalary'); // 'newSalary' or 'percentage'
  const [currentSalary, setCurrentSalary] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [increasePercentage, setIncreasePercentage] = useState('');
  const [inflationRate, setInflationRate] = useState('');

  const fmt = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const results = useMemo(() => {
    const current = parseFloat(currentSalary) || 0;
    let newSalaryValue = 0;
    let percentage = 0;

    if (mode === 'newSalary') {
      newSalaryValue = parseFloat(newSalary) || 0;
      percentage = current > 0 ? ((newSalaryValue - current) / current) * 100 : 0;
    } else {
      percentage = parseFloat(increasePercentage) || 0;
      newSalaryValue = current * (1 + percentage / 100);
    }

    const increase = newSalaryValue - current;
    const monthlyDifference = increase / 12;
    const weeklyDifference = increase / 52;

    let realTermsComparison = null;
    if (inflationRate) {
      const inflation = parseFloat(inflationRate) || 0;
      const realIncrease = percentage - inflation;
      realTermsComparison = {
        nominalIncrease: percentage,
        inflationRate: inflation,
        realIncrease: realIncrease,
        isGain: realIncrease > 0,
      };
    }

    return {
      currentSalary: current,
      newSalary: newSalaryValue,
      increaseAmount: increase,
      increasePercentage: percentage,
      monthlyDifference,
      weeklyDifference,
      realTermsComparison,
    };
  }, [mode, currentSalary, newSalary, increasePercentage, inflationRate]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-2 bg-surface border border-border rounded-[var(--radius-card)] p-2">
        <button
          onClick={() => setMode('newSalary')}
          className={`flex-1 px-4 py-2 rounded-[var(--radius-input)] font-medium transition-colors text-sm ${
            mode === 'newSalary'
              ? 'bg-accent text-white'
              : 'text-text-primary hover:bg-white'
          }`}
        >
          New Salary
        </button>
        <button
          onClick={() => setMode('percentage')}
          className={`flex-1 px-4 py-2 rounded-[var(--radius-input)] font-medium transition-colors text-sm ${
            mode === 'percentage'
              ? 'bg-accent text-white'
              : 'text-text-primary hover:bg-white'
          }`}
        >
          Percentage Increase
        </button>
      </div>

      {/* Input Section */}
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Current Salary (Annual)
          </label>
          <input
            type="number"
            value={currentSalary}
            onChange={(e) => setCurrentSalary(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        {mode === 'newSalary' ? (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              New Salary (Annual)
            </label>
            <input
              type="number"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        ) : (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Percentage Increase
            </label>
            <input
              type="number"
              value={increasePercentage}
              onChange={(e) => setIncreasePercentage(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        )}

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Annual Inflation Rate (Optional)
          </label>
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
          <p className="text-text-muted text-xs mt-2">Leave blank to skip real-terms calculation</p>
        </div>
      </div>

      {/* Main Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Annual Increase</p>
          <p className={`font-mono-num text-3xl font-bold ${results.increaseAmount >= 0 ? 'text-accent' : 'text-error'}`}>
            {results.increaseAmount >= 0 ? '+' : ''}{fmt(results.increaseAmount)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Percentage Increase</p>
          <p className={`font-mono-num text-3xl font-bold ${results.increasePercentage >= 0 ? 'text-accent' : 'text-error'}`}>
            {results.increasePercentage >= 0 ? '+' : ''}{results.increasePercentage.toFixed(2)}%
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Monthly Extra</p>
          <p className={`font-mono-num text-3xl font-bold ${results.monthlyDifference >= 0 ? 'text-accent' : 'text-error'}`}>
            {results.monthlyDifference >= 0 ? '+' : ''}{fmt(results.monthlyDifference)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-secondary text-sm mb-1">Weekly Extra</p>
          <p className={`font-mono-num text-3xl font-bold ${results.weeklyDifference >= 0 ? 'text-accent' : 'text-error'}`}>
            {results.weeklyDifference >= 0 ? '+' : ''}{fmt(results.weeklyDifference)}
          </p>
        </div>
      </div>

      {/* Detailed Summary */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h3 className="text-text-primary font-semibold mb-4">Salary Breakdown</h3>

        <div className="space-y-3 font-mono-num text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">Current Annual Salary:</span>
            <span className="text-text-primary font-semibold">{fmt(results.currentSalary)}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary">New Annual Salary:</span>
            <span className="text-text-primary font-semibold">{fmt(results.newSalary)}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-border bg-white bg-opacity-50 px-3 rounded-[var(--radius-input)]">
            <span className={`font-semibold ${results.increaseAmount >= 0 ? 'text-accent' : 'text-error'}`}>
              Annual Increase:
            </span>
            <span className={`font-bold ${results.increaseAmount >= 0 ? 'text-accent' : 'text-error'}`}>
              {results.increaseAmount >= 0 ? '+' : ''}{fmt(results.increaseAmount)}
            </span>
          </div>

          <div className="pt-2 space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Monthly increase:</span>
              <span className={`font-semibold ${results.monthlyDifference >= 0 ? 'text-accent' : 'text-error'}`}>
                {results.monthlyDifference >= 0 ? '+' : ''}{fmt(results.monthlyDifference)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Weekly increase:</span>
              <span className={`font-semibold ${results.weeklyDifference >= 0 ? 'text-accent' : 'text-error'}`}>
                {results.weeklyDifference >= 0 ? '+' : ''}{fmt(results.weeklyDifference)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Daily increase (÷ 260 days):</span>
              <span className={`font-semibold ${(results.increaseAmount / 260) >= 0 ? 'text-accent' : 'text-error'}`}>
                {(results.increaseAmount / 260) >= 0 ? '+' : ''}{fmt(results.increaseAmount / 260)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Real Terms Comparison */}
      {results.realTermsComparison && (
        <div className={`rounded-[var(--radius-card)] p-6 border ${
          results.realTermsComparison.isGain
            ? 'bg-accent bg-opacity-5 border-accent'
            : 'bg-error bg-opacity-5 border-error'
        }`}>
          <h3 className="text-text-primary font-semibold mb-4">Real Terms Comparison</h3>

          <div className="space-y-3 font-mono-num text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Nominal increase:</span>
              <span className="text-text-primary font-semibold">
                {results.realTermsComparison.nominalIncrease.toFixed(2)}%
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-secondary">Inflation rate:</span>
              <span className="text-text-primary font-semibold">
                {results.realTermsComparison.inflationRate.toFixed(2)}%
              </span>
            </div>

            <div className={`flex justify-between py-2 px-3 rounded-[var(--radius-input)] ${
              results.realTermsComparison.isGain ? 'bg-accent bg-opacity-10' : 'bg-error bg-opacity-10'
            }`}>
              <span className={`font-semibold ${results.realTermsComparison.isGain ? 'text-accent' : 'text-error'}`}>
                Real increase:
              </span>
              <span className={`font-bold ${results.realTermsComparison.isGain ? 'text-accent' : 'text-error'}`}>
                {results.realTermsComparison.realIncrease >= 0 ? '+' : ''}{results.realTermsComparison.realIncrease.toFixed(2)}%
              </span>
            </div>

            <p className="text-text-muted text-xs mt-3">
              {results.realTermsComparison.isGain
                ? `Your raise exceeds inflation — your purchasing power is increasing by ${results.realTermsComparison.realIncrease.toFixed(2)}%.`
                : `Inflation outpaces your raise — your purchasing power is decreasing by ${Math.abs(results.realTermsComparison.realIncrease).toFixed(2)}%.`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
