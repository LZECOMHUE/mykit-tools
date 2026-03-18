'use client';

import { useState, useMemo } from 'react';

const hsaLimits2025 = {
  individual: 4300,
  family: 8550,
};

const taxBrackets2025 = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
};

const getTaxRate = (income, filingStatus) => {
  const brackets = taxBrackets2025[filingStatus];
  for (const bracket of brackets) {
    if (income >= bracket.min && income < bracket.max) {
      return bracket.rate;
    }
  }
  return 0.37;
};

export default function USHSACalculator() {
  const [coverage, setCoverage] = useState('individual');
  const [contribution, setContribution] = useState('3000');
  const [income, setIncome] = useState('75000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [yearsGrowing, setYearsGrowing] = useState('20');
  const [annualReturn, setAnnualReturn] = useState('7');

  const results = useMemo(() => {
    const contrib = parseFloat(contribution) || 0;
    const years = parseFloat(yearsGrowing) || 0;
    const rate = parseFloat(annualReturn) || 7;
    const inc = parseFloat(income) || 0;

    const limit = hsaLimits2025[coverage];
    const taxRate = getTaxRate(inc, filingStatus);
    const taxSavings = contrib * taxRate;

    // Compound interest formula: A = P(1 + r)^n
    let balance = 0;
    for (let year = 0; year < years; year++) {
      balance = (balance + contrib) * (1 + rate / 100);
    }

    return {
      limit,
      contribution: Math.min(contrib, limit),
      taxSavings: Math.round(taxSavings),
      taxRate: (taxRate * 100).toFixed(1),
      withinLimit: contrib <= limit,
      projectedBalance: Math.round(balance),
      projectedEarnings: Math.round(balance - contrib * years),
    };
  }, [coverage, contribution, income, filingStatus, yearsGrowing, annualReturn]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      {/* Configuration */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Coverage Type
          </label>
          <select
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            <option value="individual">Individual</option>
            <option value="family">Family</option>
          </select>
          <div className="text-xs text-accent font-mono mt-1">
            2025 Limit: {formatCurrency(results.limit)}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Annual Contribution
          </label>
          <div className="flex gap-2">
            <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">
              $
            </span>
            <input
              type="number"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              min="0"
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
          {!results.withinLimit && (
            <div className="text-xs text-red-600 mt-1">
              Exceeds {coverage} limit of {formatCurrency(results.limit)}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Annual Income
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
            Filing Status
          </label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Years Growing
          </label>
          <input
            type="number"
            value={yearsGrowing}
            onChange={(e) => setYearsGrowing(e.target.value)}
            min="0"
            max="50"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Annual Investment Return
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              step="0.5"
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
            <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">
              %
            </span>
          </div>
        </div>
      </div>

      {/* Tax Savings */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-900 mb-4 text-lg">
          Annual Tax Savings
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-green-700 mb-1">Your Tax Bracket</div>
            <div className="text-3xl font-bold text-green-900">
              {results.taxRate}%
            </div>
          </div>
          <div>
            <div className="text-sm text-green-700 mb-1">Contribution</div>
            <div className="text-2xl font-mono font-bold text-green-900">
              {formatCurrency(results.contribution)}
            </div>
          </div>
          <div>
            <div className="text-sm text-green-700 mb-1">Tax Savings</div>
            <div className="text-3xl font-mono font-bold text-green-900">
              {formatCurrency(results.taxSavings)}
            </div>
          </div>
        </div>
      </div>

      {/* Long-Term Growth */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Projected Balance (After {yearsGrowing} Years)
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded p-4">
            <div className="text-sm text-blue-700 mb-1">Total Contributed</div>
            <div className="text-2xl font-mono font-bold text-blue-900">
              {formatCurrency(results.contribution * parseFloat(yearsGrowing))}
            </div>
          </div>
          <div className="bg-purple-50 rounded p-4">
            <div className="text-sm text-purple-700 mb-1">Investment Earnings</div>
            <div className="text-2xl font-mono font-bold text-purple-900">
              {formatCurrency(results.projectedEarnings)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded p-4 border-2 border-accent">
            <div className="text-sm text-accent mb-1 font-medium">Projected Balance</div>
            <div className="text-3xl font-mono font-bold text-accent">
              {formatCurrency(results.projectedBalance)}
            </div>
          </div>
        </div>
      </div>

      {/* HSA Features */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">🏥 HSA Benefits</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="flex gap-2">
            <span className="text-accent font-bold">✓</span>
            <span className="text-text-secondary">Tax-deductible contributions</span>
          </div>
          <div className="flex gap-2">
            <span className="text-accent font-bold">✓</span>
            <span className="text-text-secondary">Tax-free withdrawals for medical expenses</span>
          </div>
          <div className="flex gap-2">
            <span className="text-accent font-bold">✓</span>
            <span className="text-text-secondary">No "use it or lose it" rule</span>
          </div>
          <div className="flex gap-2">
            <span className="text-accent font-bold">✓</span>
            <span className="text-text-secondary">Funds accumulate year to year</span>
          </div>
          <div className="flex gap-2">
            <span className="text-accent font-bold">✓</span>
            <span className="text-text-secondary">Can invest funds for growth</span>
          </div>
          <div className="flex gap-2">
            <span className="text-accent font-bold">✓</span>
            <span className="text-text-secondary">After age 65, works like traditional IRA</span>
          </div>
        </div>
      </div>

      {/* Qualifying Expenses */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">Qualifying Medical Expenses</h3>
        <div className="text-sm text-text-secondary space-y-1">
          <p>✓ Doctor visits and prescriptions</p>
          <p>✓ Deductibles, copays, and coinsurance</p>
          <p>✓ Dental and vision care</p>
          <p>✓ Medical equipment and supplies</p>
          <p>✓ Mental health services</p>
          <p>✓ Some over-the-counter medications (with prescription)</p>
          <p>✗ Insurance premiums (with limited exceptions)</p>
          <p>✗ Non-medical expenses</p>
        </div>
      </div>
    </div>
  );
}
