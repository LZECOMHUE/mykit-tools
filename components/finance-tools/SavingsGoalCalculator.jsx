'use client';

import { useState, useMemo } from 'react';

export default function SavingsGoalCalculator() {
  const [targetAmount, setTargetAmount] = useState('5000');
  const [timeframeMonths, setTimeframeMonths] = useState(12);
  const [currentSavings, setCurrentSavings] = useState('0');
  const [interestRate, setInterestRate] = useState('0');

  const fmt = (n) =>
    '£' +
    n.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const results = useMemo(() => {
    const target = parseFloat(targetAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const months = Math.max(1, parseInt(timeframeMonths) || 1);
    const monthlyRate = (parseFloat(interestRate) || 0) / 100 / 12;

    const remaining = target - current;
    const stillNeeded = Math.max(0, remaining);

    let perMonth = stillNeeded / months;
    let perWeek = perMonth / 4.33;
    let perFortnight = perMonth * 2;

    const breakdown = [];
    let balance = current;

    for (let i = 1; i <= months; i++) {
      balance = balance + perMonth;
      if (monthlyRate > 0) {
        balance = balance * (1 + monthlyRate);
      }
      breakdown.push({
        month: i,
        deposit: perMonth,
        interest:
          monthlyRate > 0 ? balance - (balance / (1 + monthlyRate)) : 0,
        total: balance,
      });
    }

    const monthsToGoal = current >= target ? 0 : months;
    const daysPerMonth = 30.44;

    return {
      stillNeeded,
      perMonth: Math.max(0, perMonth),
      perWeek: Math.max(0, perWeek),
      perFortnight: Math.max(0, perFortnight),
      monthsToGoal,
      breakdown,
      finalBalance: balance,
      isReachable: current + stillNeeded <= target,
    };
  }, [targetAmount, timeframeMonths, currentSavings, interestRate]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Input Section */}
      <div className="space-y-4 bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Savings Goal Amount
          </label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Current Savings
          </label>
          <input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Timeframe (months)
          </label>
          <div className="flex gap-2 mb-3">
            {[3, 6, 12, 24, 36].map((m) => (
              <button
                key={m}
                onClick={() => setTimeframeMonths(m)}
                className={`px-3 py-2 rounded-[8px] font-medium transition-colors text-sm ${
                  parseInt(timeframeMonths) === m
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {m}mo
              </button>
            ))}
          </div>
          <input
            type="number"
            value={timeframeMonths}
            onChange={(e) => setTimeframeMonths(e.target.value)}
            placeholder="12"
            min="1"
            className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Expected Interest Rate (% per year)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="0"
            step="0.1"
            className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Still Need</p>
          <p className="font-mono text-3xl font-bold text-accent">
            {fmt(results.stillNeeded)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Save Per Month</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {fmt(results.perMonth)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Save Per Week</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {fmt(results.perWeek)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Save Per Fortnight</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {fmt(results.perFortnight)}
          </p>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <div className="mb-4">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-text-secondary text-sm font-medium">
              Progress to Goal
            </span>
            <span className="text-text-primary font-semibold">
              {parseFloat(currentSavings) >= parseFloat(targetAmount)
                ? '100'
                : (
                    ((parseFloat(currentSavings) || 0) /
                      (parseFloat(targetAmount) || 1)) *
                    100
                  ).toFixed(1)}
              %
            </span>
          </div>
          <div className="w-full bg-white border border-border rounded-[8px] h-3 overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-300"
              style={{
                width: `${Math.min(
                  100,
                  ((parseFloat(currentSavings) || 0) /
                    (parseFloat(targetAmount) || 1)) *
                    100
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Current:</span>
            <span className="text-text-primary font-mono font-semibold">
              {fmt(parseFloat(currentSavings) || 0)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Goal:</span>
            <span className="text-text-primary font-mono font-semibold">
              {fmt(parseFloat(targetAmount) || 0)}
            </span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-border">
            <span className="text-text-secondary">To Save:</span>
            <span className="text-accent font-mono font-semibold">
              {fmt(results.stillNeeded)}
            </span>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <h3 className="text-text-primary font-semibold mb-4">
          Monthly Savings Plan
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-text-secondary font-medium py-2">
                  Month
                </th>
                <th className="text-right text-text-secondary font-medium py-2">
                  Deposit
                </th>
                <th className="text-right text-text-secondary font-medium py-2">
                  Interest
                </th>
                <th className="text-right text-text-secondary font-medium py-2">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {results.breakdown.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border hover:bg-white transition-colors last:border-b-0"
                >
                  <td className="text-text-secondary py-2">{row.month}</td>
                  <td className="text-right text-text-primary font-mono py-2">
                    {fmt(row.deposit)}
                  </td>
                  <td className="text-right text-text-primary font-mono py-2">
                    {fmt(row.interest)}
                  </td>
                  <td className="text-right text-text-primary font-mono font-semibold py-2">
                    {fmt(row.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex justify-between">
          <span className="text-text-secondary font-medium">
            Final Balance:
          </span>
          <span className="text-accent font-mono font-semibold text-lg">
            {fmt(results.finalBalance)}
          </span>
        </div>
      </div>

      {/* Key Insight */}
      {results.stillNeeded <= 0 && (
        <div className="bg-accent bg-opacity-10 border border-accent rounded-[12px] p-4">
          <p className="text-accent font-medium text-sm">
            Congratulations! You have already reached your savings goal. Your goal is
            achievable ahead of schedule.
          </p>
        </div>
      )}
    </div>
  );
}
