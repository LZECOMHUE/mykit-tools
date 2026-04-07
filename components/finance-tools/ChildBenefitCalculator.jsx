'use client';

import { useState, useMemo } from 'react';

export default function ChildBenefitCalculator() {
  const [numChildren, setNumChildren] = useState(2);
  const [numOlderChildren, setNumOlderChildren] = useState(0);
  const [householdIncome, setHouseholdIncome] = useState(50000);

  const results = useMemo(() => {
    const firstChildWeekly = 24.50;
    const otherChildrenWeekly = 16.35;
    const weeksPerYear = 52;
    const incomeThreshold = 60000;
    const chargeRate = 0.01;

    let basicWeekly = (numOlderChildren + 1) * firstChildWeekly + (numChildren - numOlderChildren - 1) * otherChildrenWeekly;
    let basicAnnual = basicWeekly * weeksPerYear;

    let reduction = 0;
    if (householdIncome > incomeThreshold) {
      const excessIncome = householdIncome - incomeThreshold;
      reduction = excessIncome * chargeRate;
    }

    const netBenefit = Math.max(0, basicAnnual - reduction);
    const monthlyBenefit = netBenefit / 12;

    return {
      basicWeekly,
      basicAnnual,
      reduction,
      netBenefit,
      monthlyBenefit,
      affectedByCharge: householdIncome > incomeThreshold,
    };
  }, [numChildren, numOlderChildren, householdIncome]);

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Number of Children
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={numChildren}
            onChange={(e) => setNumChildren(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Household Income
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={householdIncome}
              onChange={(e) => setHouseholdIncome(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Child Benefit Payment
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Weekly</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.basicWeekly.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Annual</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.basicAnnual.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Monthly</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.monthlyBenefit.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {results.affectedByCharge && (
          <div className="bg-blue-50 border border-accent border-opacity-20 rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary mb-2">
              High Income Child Benefit Charge
            </p>
            <p className="text-sm text-text-secondary mb-2">
              Your household income exceeds £60,000. Tax charge applies.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-text-secondary">Before Charge:</p>
                <p className="font-mono font-bold text-text-primary">
                  £{results.basicAnnual.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div>
                <p className="text-text-secondary">Charge (1%):</p>
                <p className="font-mono font-bold text-accent">
                  -£{results.reduction.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="bg-surface rounded-[var(--radius-input)] p-4">
          <p className="text-sm font-medium text-text-primary mb-1">Payment Structure</p>
          <p className="text-sm text-text-secondary">
            First child: £24.50/week. Each additional child: £16.35/week. Paid every 4 weeks.
          </p>
        </div>
      </div>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        2026/27 rates. You must register to receive Child Benefit. Check entitlement conditions apply. See gov.uk for full details.
      </p>
    </div>
  );
}
