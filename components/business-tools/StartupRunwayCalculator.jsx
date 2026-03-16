'use client';

import { useState } from 'react';

export default function StartupRunwayCalculator() {
  const [currentCash, setCurrentCash] = useState(50000);
  const [monthlyBurnRate, setMonthlyBurnRate] = useState(8000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(2000);

  const netBurnRate = monthlyBurnRate - monthlyRevenue;
  const runway = netBurnRate > 0 ? Math.floor(currentCash / netBurnRate) : 999;
  const runwayMonths = runway % 12;
  const runwayYears = Math.floor(runway / 12);
  const monthlyExpenses = monthlyBurnRate - monthlyRevenue;
  const breakEvenRevenue = monthlyBurnRate;
  const revenueNeeded = Math.max(0, monthlyBurnRate - monthlyRevenue);

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Current Cash
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={currentCash}
              onChange={(e) => setCurrentCash(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Monthly Burn Rate
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={monthlyBurnRate}
              onChange={(e) => setMonthlyBurnRate(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Monthly Revenue
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Runway Analysis
        </h3>

        <div className={`rounded-[var(--radius-input)] p-4 border-2 ${
          runway <= 3 ? 'border-error bg-red-50' : runway <= 6 ? 'border-warning bg-orange-50' : 'border-success bg-green-50'
        }`}>
          <p className="text-sm text-text-secondary mb-1">Months of Runway</p>
          <p className="text-3xl md:text-4xl font-mono font-bold text-text-primary">
            {runway >= 999 ? '∞' : `${runwayYears}y ${runwayMonths}m`}
          </p>
          {runway < 999 && (
            <p className="text-xs text-text-secondary mt-2">
              At current burn rate, cash will run out in {runway} months
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Monthly Burn</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{monthlyBurnRate.toLocaleString('en-GB')}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Monthly Revenue</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{monthlyRevenue.toLocaleString('en-GB')}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Net Burn</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{netBurnRate.toLocaleString('en-GB')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Break-Even Target
        </h3>

        <div className="bg-surface rounded-[var(--radius-input)] p-4">
          <p className="text-sm text-text-secondary mb-1">Revenue Needed to Break Even</p>
          <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
            £{breakEvenRevenue.toLocaleString('en-GB')}
          </p>
          <p className="text-xs text-text-secondary mt-2">
            Additional revenue: £{revenueNeeded.toLocaleString('en-GB')}
          </p>
        </div>
      </div>
    </div>
  );
}
