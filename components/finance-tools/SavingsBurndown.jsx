'use client';

import { useState, useMemo } from 'react';

export default function SavingsBurndown() {
  const [savings, setSavings] = useState(50000);
  const [monthlySpending, setMonthlySpending] = useState(2500);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [inflationRate, setInflationRate] = useState(3);
  const [interestRate, setInterestRate] = useState(4);

  const simulation = useMemo(() => {
    const monthlyInflation = (1 + inflationRate / 100) ** (1 / 12) - 1;
    const monthlyInterestRate = interestRate / 100 / 12;

    let balance = savings;
    let currentMonthlySpending = monthlySpending;
    const balances = [balance];
    const months = [];
    let monthCount = 0;
    const maxMonths = 1200; // 100 years

    while (balance > 0 && monthCount < maxMonths) {
      monthCount++;

      // Add interest
      balance += balance * monthlyInterestRate;

      // Adjust spending for inflation
      currentMonthlySpending *= 1 + monthlyInflation;

      // Net spending (spending - income)
      const netSpending = Math.max(0, currentMonthlySpending - monthlyIncome);
      balance -= netSpending;

      balances.push(Math.max(0, balance));
      months.push(monthCount);
    }

    // Calculate key metrics
    const finalMonth = monthCount;
    const years = Math.floor(finalMonth / 12);
    const remainingMonths = finalMonth % 12;

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + finalMonth);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const endDateStr = `${monthNames[endDate.getMonth()]} ${endDate.getFullYear()}`;

    // Calculate total spent and interest earned
    let totalSpent = 0;
    let currentBalance = savings;
    let totalSpending = monthlySpending;

    for (let i = 0; i < finalMonth; i++) {
      const interest = currentBalance * monthlyInterestRate;
      totalSpending *= 1 + monthlyInflation;
      const netSpending = Math.max(0, totalSpending - monthlyIncome);
      totalSpent += netSpending;
      currentBalance = balances[i + 1];
    }

    const totalInterest = totalSpent - (savings - Math.max(0, balances[finalMonth]));

    // Find milestones
    const emergencyFund = monthlySpending * 3;
    const milestones = [];

    const thresholds = [
      { percent: 75, label: '75% of savings' },
      { percent: 50, label: '50% of savings' },
      { percent: 25, label: '25% of savings' },
      { amount: emergencyFund, label: '3-month emergency fund' },
      { amount: 0, label: 'Savings depleted' }
    ];

    for (const threshold of thresholds) {
      let targetBalance;
      let targetLabel;

      if (threshold.percent) {
        targetBalance = savings * (threshold.percent / 100);
        targetLabel = threshold.label;
      } else {
        targetBalance = threshold.amount;
        targetLabel = threshold.label;
      }

      for (let i = 0; i < balances.length; i++) {
        if (balances[i] <= targetBalance) {
          const monthNum = i;
          const y = Math.floor(monthNum / 12);
          const m = monthNum % 12;

          const milestoneDate = new Date(startDate);
          milestoneDate.setMonth(milestoneDate.getMonth() + monthNum);

          milestones.push({
            label: targetLabel,
            month: monthNum,
            date: `${monthNames[milestoneDate.getMonth()]} ${milestoneDate.getFullYear()}`,
            balance: balances[i],
            yearsMonths: `${y}y ${m}m`
          });

          break;
        }
      }
    }

    return {
      balances,
      months,
      finalMonth,
      years,
      remainingMonths,
      endDateStr,
      totalSpent: Math.round(totalSpent),
      totalInterest: Math.round(totalInterest),
      milestones,
      incomeCoversSpending: monthlyIncome >= monthlySpending
    };
  }, [savings, monthlySpending, monthlyIncome, inflationRate, interestRate]);

  const formatCurrency = (value) => {
    return '£' + Math.round(value).toLocaleString('en-GB', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  // Prepare chart data (sample every nth bar if > 24 months)
  const chartData = useMemo(() => {
    if (simulation.balances.length <= 24) {
      return simulation.balances.map((b, i) => ({ balance: b, month: i }));
    }
    const step = Math.ceil(simulation.balances.length / 24);
    return simulation.balances
      .map((b, i) => ({ balance: b, month: i }))
      .filter((_, i) => i % step === 0);
  }, [simulation.balances]);

  const maxBalance = Math.max(...chartData.map(d => d.balance), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 items-start">
      {/* LEFT PANEL: Inputs */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-4 sticky top-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-text-secondary">
            Total savings
          </label>
          <input
            type="number"
            value={savings}
            onChange={(e) => setSavings(Number(e.target.value) || 0)}
            placeholder="e.g. 50000"
            className="w-full px-3 py-2 text-sm border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-text-secondary">
            Monthly spending
          </label>
          <input
            type="number"
            value={monthlySpending}
            onChange={(e) => setMonthlySpending(Number(e.target.value) || 0)}
            placeholder="e.g. 2500"
            className="w-full px-3 py-2 text-sm border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-text-secondary">
            Monthly income (optional)
          </label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
            placeholder="e.g. 0"
            className="w-full px-3 py-2 text-sm border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <p className="text-xs text-text-muted">Part-time work, rental income, etc.</p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-text-secondary">
            Inflation rate (%)
          </label>
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
            step="0.1"
            placeholder="3"
            className="w-full px-3 py-2 text-sm border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <p className="text-xs text-text-muted">UK average is around 2-3%</p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-text-secondary">
            Savings interest rate (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
            step="0.1"
            placeholder="4"
            className="w-full px-3 py-2 text-sm border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <p className="text-xs text-text-muted">Current easy-access savings ~4%</p>
        </div>
      </div>

      {/* RIGHT PANEL: Results */}
      <div className="space-y-3">
        {/* Hero Card */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-6">
          {simulation.incomeCoversSpending ? (
            <div>
              <p className="text-sm text-text-secondary mb-2">Savings trajectory</p>
              <p className="text-3xl font-bold text-green-600">
                Your income covers your spending
              </p>
              <p className="text-sm text-text-secondary mt-3">
                With your current setup, you're spending less than you earn. Your savings will grow over time.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-text-secondary mb-2">Time until savings run out</p>
              <div className="text-4xl font-bold text-text-primary font-mono-num">
                {simulation.years}
                <span className="text-2xl ml-2 font-normal text-text-secondary">
                  years
                </span>
              </div>
              <div className="text-2xl text-text-secondary font-mono-num mt-1">
                {simulation.remainingMonths}
                <span className="text-base ml-2 font-normal">
                  months
                </span>
              </div>
              <p className="text-sm text-text-secondary mt-4">
                Estimated run-out date:{' '}
                <span className="font-semibold text-text-primary">{simulation.endDateStr}</span>
              </p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {!simulation.incomeCoversSpending && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-xs text-text-secondary mb-2">Run-out date</p>
              <p className="text-lg font-semibold text-text-primary">
                {simulation.endDateStr}
              </p>
            </div>
            <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-xs text-text-secondary mb-2">Total spent</p>
              <p className="text-lg font-semibold text-text-primary font-mono-num">
                {formatCurrency(simulation.totalSpent)}
              </p>
            </div>
            <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
              <p className="text-xs text-text-secondary mb-2">Interest earned</p>
              <p className="text-lg font-semibold text-green-600 font-mono-num">
                {formatCurrency(simulation.totalInterest)}
              </p>
            </div>
          </div>
        )}

        {/* Chart */}
        {!simulation.incomeCoversSpending && simulation.balances.length > 1 && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-6">
            <p className="text-sm font-medium text-text-primary mb-4">Savings balance over time</p>
            <div className="flex items-end gap-1 h-48">
              {chartData.map((data, idx) => {
                const heightPercent = (data.balance / maxBalance) * 100;
                let barColor = 'bg-accent'; // Green-ish
                if (data.balance < maxBalance * 0.25) {
                  barColor = 'bg-red-400';
                } else if (data.balance < maxBalance * 0.5) {
                  barColor = 'bg-amber-400';
                }

                return (
                  <div
                    key={idx}
                    className={`flex-1 min-h-1 ${barColor} rounded-t-sm transition-all duration-200 hover:opacity-80`}
                    style={{ height: `${heightPercent}%` }}
                    title={`Month ${data.month}: ${formatCurrency(data.balance)}`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-4 text-xs text-text-muted">
              <span>Now</span>
              <span className="text-center">Savings balance projection</span>
              <span>{simulation.endDateStr}</span>
            </div>
            <div className="flex gap-4 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-sm" />
                <span className="text-text-secondary">Above 50%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-400 rounded-sm" />
                <span className="text-text-secondary">25-50%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-sm" />
                <span className="text-text-secondary">Below 25%</span>
              </div>
            </div>
          </div>
        )}

        {/* Milestones */}
        {!simulation.incomeCoversSpending && simulation.milestones.length > 0 && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-6">
            <p className="text-sm font-medium text-text-primary mb-4">Key milestones</p>
            <div className="space-y-3">
              {simulation.milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {milestone.label}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {milestone.date}
                    </p>
                  </div>
                  <p className="font-mono-num text-sm font-semibold text-text-primary">
                    {formatCurrency(milestone.balance)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
