'use client';

import { useState, useMemo } from 'react';

export default function CanadaParentalLeaveSplitter() {
  const [combinedIncome, setCombinedIncome] = useState('120000');
  const [splitPercent, setSplitPercent] = useState('50');
  const [leaveType, setLeaveType] = useState('standard');

  const calculations = useMemo(() => {
    const income = parseFloat(combinedIncome) || 120000;
    const split = parseFloat(splitPercent) || 50;

    const parent1Income = income * (split / 100);
    const parent2Income = income * ((100 - split) / 100);

    const standardWeeks = 35;
    const extendedWeeks = 61;
    const weeks = leaveType === 'standard' ? standardWeeks : extendedWeeks;
    const months = (weeks / 4.33).toFixed(1);

    // EI replacement rate: 55% of insurable earnings (max ~$640/week in 2025)
    const maxWeekly = 640;
    const parent1Weekly = Math.min((parent1Income / 52) * 0.55, maxWeekly);
    const parent2Weekly = Math.min((parent2Income / 52) * 0.55, maxWeekly);

    const parent1Total = parent1Weekly * weeks;
    const parent2Total = parent2Weekly * weeks;

    return {
      parent1Income: parent1Income.toFixed(0),
      parent2Income: parent2Income.toFixed(0),
      weeks,
      months,
      parent1Weekly: parent1Weekly.toFixed(2),
      parent2Weekly: parent2Weekly.toFixed(2),
      parent1Total: parent1Total.toFixed(2),
      parent2Total: parent2Total.toFixed(2),
      leaveType,
      isExtended: leaveType === 'extended',
    };
  }, [combinedIncome, splitPercent, leaveType]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Combined Annual Income
          </label>
          <div className="flex gap-2">
            <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">
              $
            </span>
            <input
              type="number"
              value={combinedIncome}
              onChange={(e) => setCombinedIncome(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Parent 1 Share
          </label>
          <div className="flex gap-2">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={splitPercent}
              onChange={(e) => setSplitPercent(e.target.value)}
              className="flex-1"
            />
            <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted w-16 text-center">
              {splitPercent}%
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            {[25, 50, 75].map((pct) => (
              <button
                key={pct}
                onClick={() => setSplitPercent(pct.toString())}
                className="flex-1 px-2 py-1 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20"
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Leave Duration
          </label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            <option value="standard">Standard (35 weeks)</option>
            <option value="extended">Extended (61 weeks)</option>
          </select>
          <div className="text-xs text-text-muted mt-2">
            {calculations.months} months
          </div>
        </div>
      </div>

      {/* Split Summary */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-700 mb-2">Parent 1</div>
          <div className="text-3xl font-mono font-bold text-blue-900">
            {splitPercent}%
          </div>
          <div className="text-sm text-blue-700 mt-2">
            Annual: {formatCurrency(calculations.parent1Income)}
          </div>
          <div className="text-sm text-blue-700">
            Weekly EI: {formatCurrency(calculations.parent1Weekly)}
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg">
          <div className="text-sm text-purple-700 mb-2">Parent 2</div>
          <div className="text-3xl font-mono font-bold text-purple-900">
            {100 - parseInt(splitPercent)}%
          </div>
          <div className="text-sm text-purple-700 mt-2">
            Annual: {formatCurrency(calculations.parent2Income)}
          </div>
          <div className="text-sm text-purple-700">
            Weekly EI: {formatCurrency(calculations.parent2Weekly)}
          </div>
        </div>
      </div>

      {/* Total Benefits */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
          <div className="text-sm text-green-700 mb-2">Parent 1 Total Benefits</div>
          <div className="text-4xl font-mono font-bold text-green-900">
            {formatCurrency(calculations.parent1Total)}
          </div>
          <div className="text-sm text-green-700 mt-2">
            Over {calculations.weeks} weeks
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
          <div className="text-sm text-green-700 mb-2">Parent 2 Total Benefits</div>
          <div className="text-4xl font-mono font-bold text-green-900">
            {formatCurrency(calculations.parent2Total)}
          </div>
          <div className="text-sm text-green-700 mt-2">
            Over {calculations.weeks} weeks
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">👶 Parental Leave in Canada</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <strong>Standard:</strong> 35 weeks of EI parental benefits (can take up to
            63 weeks total leave at 55% pay)
          </p>
          <p>
            <strong>Extended:</strong> 61 weeks of EI benefits (can take up to 63 weeks
            leave at 33% pay)
          </p>
          <p>
            <strong>Eligibility:</strong> Must have 600 insurable hours in past 52 weeks
          </p>
          <p>
            <strong>Job Protection:</strong> Employer must hold your job for leave period
          </p>
          <p>
            <strong>"Use it or Lose it" (Quebec):</strong> Some Quebec benefits must be
            split between both parents
          </p>
        </div>
      </div>

      {/* Scenarios */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Common Scenarios
        </h3>
        <div className="space-y-3">
          {[
            {
              scenario: 'One parent takes all leave',
              split: 100,
              description: 'Parent 1 takes full benefit, Parent 2 works',
            },
            {
              scenario: 'Equal split',
              split: 50,
              description: 'Both parents share leave equally',
            },
            {
              scenario: 'Sequential',
              split: 100,
              description: 'Parent 1 takes standard, Parent 2 takes extended',
            },
            {
              scenario: 'One takes more',
              split: 70,
              description: 'One parent takes longer leave, other shorter',
            },
          ].map((scenario, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (scenario.split !== 100 || idx === 0) {
                  setSplitPercent(scenario.split.toString());
                }
              }}
              className={`w-full text-left p-3 rounded border transition ${
                parseInt(splitPercent) === scenario.split && idx !== 2
                  ? 'bg-accent/10 border-accent'
                  : 'bg-surface border-border hover:border-accent'
              }`}
            >
              <div className="font-medium text-text-primary">
                {scenario.scenario}
              </div>
              <div className="text-xs text-text-secondary mt-1">
                {scenario.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Benefits */}
      <div className="bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-3">
          Additional Support Programs
        </h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>
            <strong>Canada Child Benefit:</strong> Monthly tax-free payment for
            families with children
          </li>
          <li>
            <strong>Spousal Caregiving:</strong> Additional 8 weeks off work if caring
            for spouse
          </li>
          <li>
            <strong>Registered Education Savings Plan (RESP):</strong> Government grants
            for child education
          </li>
          <li>
            <strong>Child Care Expense Deduction:</strong> Tax deduction for childcare
            costs
          </li>
        </ul>
      </div>
    </div>
  );
}
