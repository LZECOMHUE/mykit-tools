'use client';

import { useState, useMemo } from 'react';

const budgetAllocation = {
  venue: 0.40,
  catering: 0.25,
  photography: 0.1,
  flowers: 0.05,
  music: 0.05,
  attire: 0.03,
  stationery: 0.02,
  other: 0.1,
};

const budgetLabels = {
  venue: 'Venue',
  catering: 'Catering & Bar',
  photography: 'Photography & Videography',
  flowers: 'Flowers & Decorations',
  music: 'Music & Entertainment',
  attire: 'Wedding Attire',
  stationery: 'Invitations & Stationery',
  other: 'Other & Contingency',
};

export default function WeddingBudgetCalculator() {
  const [totalBudget, setTotalBudget] = useState('15000');
  const [customAllocation, setCustomAllocation] = useState({
    venue: 0.4,
    catering: 0.25,
    photography: 0.1,
    flowers: 0.05,
    music: 0.05,
    attire: 0.03,
    stationery: 0.02,
    other: 0.1,
  });

  const fmt = (n) => '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const total = parseFloat(totalBudget) || 0;

  const allocations = useMemo(() => {
    const result = {};
    let sum = 0;
    for (const [key, percent] of Object.entries(customAllocation)) {
      const amount = total * percent;
      result[key] = amount;
      sum += percent;
    }
    return result;
  }, [total, customAllocation]);

  const handleAllocationChange = (key, value) => {
    const percent = parseFloat(value) / 100;
    setCustomAllocation((prev) => ({
      ...prev,
      [key]: percent,
    }));
  };

  const handleResetAllocation = () => {
    setCustomAllocation(budgetAllocation);
  };

  const totalPercent = Object.values(customAllocation).reduce((a, b) => a + b, 0);

  const categories = Object.keys(budgetAllocation);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Budget Input */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Wedding Budget Calculator</h2>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Total Wedding Budget
          </label>
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {[5000, 10000, 15000, 20000, 30000, 50000].map((budget) => (
            <button
              key={budget}
              onClick={() => setTotalBudget(budget.toString())}
              className="px-3 py-2 rounded-lg bg-white border border-border text-text-primary hover:bg-accent hover:text-white hover:border-accent font-medium transition-colors"
            >
              {fmt(budget)}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Allocation */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-text-primary">Allocate Budget</h3>
          <button
            onClick={handleResetAllocation}
            className="text-sm text-accent hover:underline font-medium"
          >
            Reset to Defaults
          </button>
        </div>

        <div className="space-y-4">
          {categories.map((category) => {
            const percent = (customAllocation[category] * 100).toFixed(1);
            const amount = allocations[category];

            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-text-secondary font-medium">
                    {budgetLabels[category]}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={percent}
                      onChange={(e) => handleAllocationChange(category, e.target.value)}
                      className="w-16 px-2 py-1 border border-border rounded text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                      step="0.1"
                    />
                    <span className="w-12 text-right text-text-secondary">%</span>
                    <span className="w-20 text-right font-mono-num font-semibold text-text-primary">
                      {fmt(amount)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${
                      category === 'venue'
                        ? 'bg-blue-500'
                        : category === 'catering'
                          ? 'bg-green-500'
                          : category === 'photography'
                            ? 'bg-purple-500'
                            : category === 'flowers'
                              ? 'bg-pink-500'
                              : category === 'music'
                                ? 'bg-orange-500'
                                : category === 'attire'
                                  ? 'bg-red-500'
                                  : category === 'stationery'
                                    ? 'bg-yellow-500'
                                    : 'bg-gray-500'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {totalPercent !== 1 && (
          <div className="bg-warning bg-opacity-10 border border-warning rounded p-3 text-warning text-sm">
            Total allocation: {(totalPercent * 100).toFixed(1)}% (should be 100%)
          </div>
        )}
      </div>

      {/* Budget Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category}
            className={`rounded-lg p-4 border-2 ${
              category === 'venue'
                ? 'bg-blue-50 border-blue-200'
                : category === 'catering'
                  ? 'bg-green-50 border-green-200'
                  : category === 'photography'
                    ? 'bg-purple-50 border-purple-200'
                    : category === 'flowers'
                      ? 'bg-pink-50 border-pink-200'
                      : category === 'music'
                        ? 'bg-orange-50 border-orange-200'
                        : category === 'attire'
                          ? 'bg-red-50 border-red-200'
                          : category === 'stationery'
                            ? 'bg-yellow-50 border-yellow-200'
                            : 'bg-gray-50 border-gray-200'
            }`}
          >
            <p className="text-text-secondary text-sm mb-1">{budgetLabels[category]}</p>
            <p className="font-mono-num font-bold text-2xl text-text-primary">
              {fmt(allocations[category])}
            </p>
            <p className="text-text-muted text-xs mt-1">
              {(customAllocation[category] * 100).toFixed(1)}% of budget
            </p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Budget Summary</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <span className="text-text-secondary">{budgetLabels[category]}</span>
              <div className="text-right">
                <p className="font-mono-num font-semibold text-text-primary">
                  {fmt(allocations[category])}
                </p>
                <p className="text-text-muted text-xs">
                  {(customAllocation[category] * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center py-2 border-t-2 border-accent mt-2">
            <span className="text-text-primary font-bold">Total Budget</span>
            <span className="font-mono-num font-bold text-2xl text-accent">
              {fmt(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Industry Averages */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
        <h3 className="text-text-primary font-semibold">Industry Standard Allocations</h3>
        <p className="text-text-secondary text-sm mb-4">
          These percentages are based on industry standards for wedding budgets:
        </p>
        <div className="space-y-2">
          {Object.entries(budgetAllocation).map(([category, percent]) => (
            <div key={category} className="flex justify-between items-center">
              <span className="text-text-secondary">{budgetLabels[category]}</span>
              <span className="font-semibold text-text-primary">{(percent * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Budget Tips</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>✓ Venue often costs the most (40%) — book early for better rates</li>
          <li>✓ Catering & bar is typically 25% — consider guest count and dietary needs</li>
          <li>✓ Photography captures memories — allocate 10% for quality</li>
          <li>✓ Keep 10% contingency for unexpected expenses</li>
          <li>✓ Get quotes from multiple vendors before finalising budget</li>
          <li>✓ Track all expenses as you go — use a spreadsheet or app</li>
        </ul>
      </div>
    </div>
  );
}
