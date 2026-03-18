'use client';

import { useState, useMemo } from 'react';

const fplThresholds = {
  2025: {
    individual: 15000,
    family2: 20385,
    family3: 25710,
    family4: 31200,
  },
};

const plans = {
  bronze: {
    label: 'Bronze',
    coverage: '60%',
    color: 'from-orange-400 to-orange-500',
    deductible: 'High',
  },
  silver: {
    label: 'Silver',
    coverage: '70%',
    color: 'from-gray-400 to-gray-500',
    deductible: 'Medium',
  },
  gold: {
    label: 'Gold',
    coverage: '80%',
    color: 'from-yellow-400 to-yellow-500',
    deductible: 'Low',
  },
  platinum: {
    label: 'Platinum',
    coverage: '90%',
    color: 'from-blue-400 to-blue-500',
    deductible: 'Very Low',
  },
};

export default function USHealthInsuranceCostEstimator() {
  const [age, setAge] = useState('35');
  const [income, setIncome] = useState('50000');
  const [familySize, setFamilySize] = useState('1');
  const [state, setState] = useState('CA');

  const estimates = useMemo(() => {
    const a = parseFloat(age) || 35;
    const i = parseFloat(income) || 50000;
    const fSize = parseFloat(familySize) || 1;

    const fpl = fplThresholds[2025]['individual'];
    const fplPercent = (i / fpl) * 100;

    // Base premium (varies by age and location)
    const ageMultiplier = 1 + (a - 21) * 0.02;
    const basePremium = 300 * ageMultiplier * fSize;

    // Subsidy calculation (simplified)
    let subsidyPercent = 0;
    if (fplPercent <= 150) subsidyPercent = 0.95;
    else if (fplPercent <= 200) subsidyPercent = 0.9;
    else if (fplPercent <= 250) subsidyPercent = 0.85;
    else if (fplPercent <= 300) subsidyPercent = 0.8;
    else if (fplPercent <= 400) subsidyPercent = 0.7;

    const monthlySubsidy = (basePremium * subsidyPercent) / 12;

    return {
      fplPercent: fplPercent.toFixed(1),
      monthlyPremium: Math.round(basePremium / 12),
      monthlySubsidy: Math.round(monthlySubsidy),
      monthlyOutOfPocket: Math.round(basePremium / 12 - monthlySubsidy),
      annualPremium: Math.round(basePremium),
      annualSubsidy: Math.round(monthlySubsidy * 12),
      annualOutOfPocket: Math.round((basePremium / 12 - monthlySubsidy) * 12),
    };
  }, [age, income, familySize, state]);

  const planEstimates = useMemo(() => {
    const baseMonthly = estimates.monthlyOutOfPocket;
    return {
      bronze: {
        monthly: Math.round(baseMonthly * 0.8),
        deductible: 7500,
        maxOut: 10000,
      },
      silver: {
        monthly: Math.round(baseMonthly * 1.0),
        deductible: 5000,
        maxOut: 8000,
      },
      gold: {
        monthly: Math.round(baseMonthly * 1.25),
        deductible: 2500,
        maxOut: 5000,
      },
      platinum: {
        monthly: Math.round(baseMonthly * 1.5),
        deductible: 500,
        maxOut: 2000,
      },
    };
  }, [estimates.monthlyOutOfPocket]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      {/* Input Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="18"
            max="100"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Annual Household Income
          </label>
          <div className="flex gap-2">
            <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">
              $
            </span>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Family Size
          </label>
          <select
            value={familySize}
            onChange={(e) => setFamilySize(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
              <option key={size} value={size}>
                {size} {size === 1 ? 'Person' : 'People'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            State
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            {['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Subsidy Summary */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Federal Subsidy Estimate
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-text-secondary mb-1">
              Federal Poverty Level
            </div>
            <div className="text-3xl font-mono font-bold text-accent">
              {estimates.fplPercent}%
            </div>
            <div className="text-xs text-text-muted mt-1">
              (Eligible for subsidies if under 400%)
            </div>
          </div>
          <div>
            <div className="text-sm text-text-secondary mb-1">Monthly Subsidy</div>
            <div className="text-3xl font-mono font-bold text-green-600">
              {formatCurrency(estimates.monthlySubsidy)}
            </div>
            <div className="text-xs text-text-muted mt-1">
              {formatCurrency(estimates.annualSubsidy)} / year
            </div>
          </div>
        </div>
      </div>

      {/* Out of Pocket Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-4 text-lg">
          Monthly Cost (After Subsidy)
        </h3>
        <div className="text-5xl font-mono font-bold text-blue-900">
          {formatCurrency(estimates.monthlyOutOfPocket)}
        </div>
        <div className="text-sm text-blue-700 mt-2">
          {formatCurrency(estimates.annualOutOfPocket)} per year
        </div>
      </div>

      {/* Plan Comparison */}
      <div>
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Plan Options (2025)
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(planEstimates).map(([key, plan]) => (
            <div
              key={key}
              className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div className={`bg-gradient-to-r ${plans[key].color} text-white p-4`}>
                <div className="font-semibold text-lg">{plans[key].label}</div>
                <div className="text-sm opacity-90">{plans[key].coverage} coverage</div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-xs text-text-muted">Monthly Premium</div>
                  <div className="font-mono font-bold text-lg text-accent">
                    {formatCurrency(plan.monthly)}
                  </div>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="text-xs text-text-muted mb-1">Deductible</div>
                  <div className="font-mono font-bold text-accent">
                    {formatCurrency(plan.deductible)}
                  </div>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="text-xs text-text-muted mb-1">Max Out-of-Pocket</div>
                  <div className="font-mono font-bold text-accent">
                    {formatCurrency(plan.maxOut)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Information */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">💡 Insurance Information</h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• Open Enrollment is typically October - December each year</li>
          <li>• You may qualify for subsidies if your income is 100-400% of FPL</li>
          <li>• Subsidies are advanced tax credits - you pay less each month</li>
          <li>• Silver plans qualify for cost-sharing reductions (lower deductibles)</li>
          <li>• These are 2025 estimates - actual rates may vary by location and age</li>
        </ul>
      </div>
    </div>
  );
}
