'use client';

import { useState, useMemo } from 'react';

export default function PensionCalculator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(67);
  const [currentPot, setCurrentPot] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [employerMatch, setEmployerMatch] = useState(3);
  const [growthRate, setGrowthRate] = useState(5);

  const results = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const annualContribution = monthlyContribution * 12;
    const totalAnnualContribution = annualContribution + (annualContribution * employerMatch / 100);
    const monthlyGrowthRate = growthRate / 100 / 12;

    let pot = currentPot;
    let totalContributions = 0;

    for (let i = 0; i < yearsToRetirement * 12; i++) {
      pot = pot * (1 + monthlyGrowthRate) + (totalAnnualContribution / 12);
      totalContributions += totalAnnualContribution / 12;
    }

    return {
      projectedPot: pot,
      growthAmount: pot - currentPot - totalContributions,
      totalContributions: totalContributions,
      yearsToRetirement: yearsToRetirement,
    };
  }, [currentAge, retirementAge, currentPot, monthlyContribution, employerMatch, growthRate]);

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Current Age
          </label>
          <input
            type="number"
            min="18"
            max="67"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Retirement Age
          </label>
          <input
            type="number"
            min="currentAge"
            max="100"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Current Pot
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={currentPot}
              onChange={(e) => setCurrentPot(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Monthly Contribution
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Employer Match (%)
          </label>
          <input
            type="number"
            min="0"
            max="20"
            step="0.5"
            value={employerMatch}
            onChange={(e) => setEmployerMatch(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Expected Growth Rate (%)
          </label>
          <input
            type="number"
            min="0"
            max="15"
            step="0.5"
            value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Projected Retirement Pot
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">At Age {retirementAge}</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.projectedPot.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Total Contributions</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.totalContributions.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Growth</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.growthAmount.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          In {results.yearsToRetirement} years, with monthly contributions of £{monthlyContribution.toLocaleString('en-GB')} plus {employerMatch}% employer match at {growthRate}% annual growth.
        </p>
      </div>
    </div>
  );
}
