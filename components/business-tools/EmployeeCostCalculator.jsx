'use client';

import { useState, useMemo } from 'react';

export default function EmployeeCostCalculator() {
  const [baseSalary, setBaseSalary] = useState(30000);
  const [pensionPercent, setPensionPercent] = useState(5);
  const [benefitsEstimate, setBenefitsEstimate] = useState(2000);

  const results = useMemo(() => {
    const employerNIThreshold = 9100;
    const employerNIRate = 0.138;

    const pension = baseSalary * (pensionPercent / 100);
    const taxableForNI = Math.max(0, baseSalary - employerNIThreshold);
    const employerNI = taxableForNI * employerNIRate;
    const totalAnnualCost = baseSalary + pension + employerNI + benefitsEstimate;
    const monthlyCost = totalAnnualCost / 12;

    return {
      pension,
      employerNI,
      benefitsEstimate,
      totalAnnualCost,
      monthlyCost,
      costPercentageAboveSalary: (((employerNI + pension) / baseSalary) * 100).toFixed(1),
    };
  }, [baseSalary, pensionPercent, benefitsEstimate]);

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Base Salary
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={baseSalary}
              onChange={(e) => setBaseSalary(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Pension Contribution (%)
          </label>
          <input
            type="number"
            min="0"
            max="20"
            step="0.5"
            value={pensionPercent}
            onChange={(e) => setPensionPercent(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Annual Benefits & Allowances
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={benefitsEstimate}
              onChange={(e) => setBenefitsEstimate(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
          <p className="text-xs text-text-muted mt-1">e.g., phone, car allowance, bonuses</p>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Total Cost to Employer
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Annual Cost</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.totalAnnualCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Monthly Cost</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.monthlyCost.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Cost Breakdown
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Salary</span>
            <span className="font-mono font-bold text-text-primary">
              £{baseSalary.toLocaleString('en-GB')}
            </span>
          </div>

          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Employer NI (13.8%)</span>
            <span className="font-mono font-bold text-text-primary">
              £{results.employerNI.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </span>
          </div>

          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Pension ({pensionPercent}%)</span>
            <span className="font-mono font-bold text-text-primary">
              £{results.pension.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </span>
          </div>

          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Benefits & Allowances</span>
            <span className="font-mono font-bold text-text-primary">
              £{benefitsEstimate.toLocaleString('en-GB')}
            </span>
          </div>
        </div>

        <p className="text-sm text-text-secondary bg-blue-50 rounded-[var(--radius-input)] p-3 mt-3">
          Employer costs are {results.costPercentageAboveSalary}% higher than base salary due to NI and pension
        </p>
      </div>
    </div>
  );
}
