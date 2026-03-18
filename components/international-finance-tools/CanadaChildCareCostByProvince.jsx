'use client';

import { useState, useMemo } from 'react';

const childcareCosts = {
  ON: {
    province: 'Ontario',
    infant: 1800,
    toddler: 1600,
    preschool: 1400,
    hasSubsidy: true,
    subsidyInfo: 'Means-tested subsidy available. $10/day program in some regions.',
  },
  QC: {
    province: 'Quebec',
    infant: 900,
    toddler: 850,
    preschool: 800,
    hasSubsidy: true,
    subsidyInfo: '$8.50/day government-subsidized childcare',
  },
  BC: {
    province: 'British Columbia',
    infant: 2100,
    toddler: 1900,
    preschool: 1700,
    hasSubsidy: true,
    subsidyInfo: 'Childcare subsidy available based on income',
  },
  AB: {
    province: 'Alberta',
    infant: 2000,
    toddler: 1800,
    preschool: 1600,
    hasSubsidy: false,
    subsidyInfo: 'Limited subsidies. Some employers offer childcare benefits.',
  },
  MB: {
    province: 'Manitoba',
    infant: 1200,
    toddler: 1000,
    preschool: 900,
    hasSubsidy: true,
    subsidyInfo: 'Income-tested childcare subsidy program',
  },
  SK: {
    province: 'Saskatchewan',
    infant: 1100,
    toddler: 950,
    preschool: 850,
    hasSubsidy: true,
    subsidyInfo: 'Childcare subsidy available for qualifying families',
  },
};

export default function CanadaChildCareCostByProvince() {
  const [province, setProvince] = useState('ON');
  const [childAge, setChildAge] = useState('toddler');
  const [monthsPerYear, setMonthsPerYear] = useState('12');
  const [numChildren, setNumChildren] = useState('1');

  const costs = useMemo(() => {
    const data = childcareCosts[province];
    const monthlyRate = data[childAge];
    const months = parseFloat(monthsPerYear) || 12;
    const children = parseFloat(numChildren) || 1;

    const annualCost = monthlyRate * months * children;
    const monthlyTotalCost = monthlyRate * children;

    return {
      monthlyRate,
      monthlyTotal: monthlyTotalCost,
      annualCost,
      months,
      children,
      province: data.province,
      hasSubsidy: data.hasSubsidy,
      subsidyInfo: data.subsidyInfo,
    };
  }, [province, childAge, monthsPerYear, numChildren]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Province
          </label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            {Object.entries(childcareCosts).map(([key, { province }]) => (
              <option key={key} value={key}>
                {province}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Child Age Group
          </label>
          <select
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            <option value="infant">Infant (0-2 years)</option>
            <option value="toddler">Toddler (2-4 years)</option>
            <option value="preschool">Preschool (4-5 years)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Months Per Year
          </label>
          <input
            type="number"
            value={monthsPerYear}
            onChange={(e) => setMonthsPerYear(e.target.value)}
            min="1"
            max="12"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Number of Children
          </label>
          <input
            type="number"
            value={numChildren}
            onChange={(e) => setNumChildren(e.target.value)}
            min="1"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Monthly Cost */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-blue-700 mb-2">Monthly Cost</div>
            <div className="text-4xl font-mono font-bold text-blue-900">
              {formatCurrency(costs.monthlyTotal)}
            </div>
            <div className="text-sm text-blue-700 mt-2">
              {costs.children > 1 && `${costs.children} children - `}
              {costs.monthlyRate > 0 && `${formatCurrency(costs.monthlyRate)}/child`}
            </div>
          </div>

          <div>
            <div className="text-sm text-blue-700 mb-2">Annual Cost</div>
            <div className="text-4xl font-mono font-bold text-blue-900">
              {formatCurrency(costs.annualCost)}
            </div>
            <div className="text-sm text-blue-700 mt-2">
              For {costs.months} months, {costs.children} {costs.children === 1 ? 'child' : 'children'}
            </div>
          </div>
        </div>
      </div>

      {/* Subsidy Information */}
      {costs.hasSubsidy && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-2">
            ✓ Subsidy Available
          </h3>
          <p className="text-sm text-green-800">{costs.subsidyInfo}</p>
          <p className="text-xs text-green-700 mt-3">
            Contact your provincial government or local childcare office for eligibility and application
          </p>
        </div>
      )}

      {!costs.hasSubsidy && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 mb-2">
            ⚠️ Limited Government Support
          </h3>
          <p className="text-sm text-yellow-800">{costs.subsidyInfo}</p>
        </div>
      )}

      {/* Cost Comparison */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Cost by Age Group ({costs.province})
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Infant (0-2 years)', key: 'infant' },
            { label: 'Toddler (2-4 years)', key: 'toddler' },
            { label: 'Preschool (4-5 years)', key: 'preschool' },
          ].map((ageGroup) => {
            const data = childcareCosts[province];
            const monthlyCost = data[ageGroup.key];
            const annualCost = monthlyCost * 12;
            return (
              <div
                key={ageGroup.key}
                className={`flex justify-between items-center p-3 rounded border ${
                  childAge === ageGroup.key
                    ? 'bg-accent/10 border-accent'
                    : 'bg-surface border-border'
                }`}
              >
                <span className="font-medium text-text-primary">
                  {ageGroup.label}
                </span>
                <div className="text-right">
                  <div className="font-mono font-bold text-text-primary">
                    {formatCurrency(monthlyCost)}
                  </div>
                  <div className="text-xs text-text-muted">
                    {formatCurrency(annualCost)}/year
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Provincial Comparison */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Toddler Childcare Cost Comparison (Monthly)
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {Object.entries(childcareCosts)
            .sort((a, b) => a[1].toddler - b[1].toddler)
            .map(([key, data]) => (
              <div
                key={key}
                className={`flex justify-between items-center p-3 rounded border ${
                  province === key
                    ? 'bg-accent/10 border-accent'
                    : 'bg-surface border-border'
                }`}
              >
                <span className="text-text-secondary">{data.province}</span>
                <span className="font-mono font-bold text-text-primary">
                  {formatCurrency(data.toddler)}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Childcare Types */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">
          Types of Childcare
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {[
            {
              type: 'Licensed Daycare',
              description: 'Commercial childcare centers (usually most expensive)',
            },
            {
              type: 'Family Daycare',
              description: 'In-home care by licensed provider (often mid-range)',
            },
            {
              type: 'Home-Based',
              description: 'Care by unlicensed individual (varies widely)',
            },
            {
              type: 'Nanny',
              description: 'Private in-home care (often most expensive)',
            },
          ].map((option) => (
            <div key={option.type} className="bg-white rounded p-3 border border-border">
              <div className="font-medium text-text-primary mb-1">
                {option.type}
              </div>
              <div className="text-xs text-text-secondary">
                {option.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">💡 Childcare Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Ask about before/after school programs to reduce costs</li>
          <li>• Some employers offer childcare subsidies or benefits</li>
          <li>• Tax deductions available for childcare expenses (check CRA)</li>
          <li>• Explore government childcare subsidy programs in your province</li>
          <li>• Some regions offer reduced rates for lower-income families</li>
        </ul>
      </div>
    </div>
  );
}
