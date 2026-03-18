'use client';

import { useState, useMemo } from 'react';

export default function USCostOfLivingComparison() {
  const [city1, setCity1] = useState('NYC');
  const [city2, setCity2] = useState('LA');

  // Cost of living indices (NYC = 100)
  const cityIndices = {
    NYC: { name: 'New York City', index: 100, housing: 100, food: 105, transport: 95, healthcare: 102, utilities: 98 },
    LA: { name: 'Los Angeles', index: 95, housing: 120, food: 100, transport: 90, healthcare: 100, utilities: 100 },
    CHI: { name: 'Chicago', index: 75, housing: 70, food: 85, transport: 75, healthcare: 85, utilities: 85 },
    HOU: { name: 'Houston', index: 70, housing: 65, food: 80, transport: 70, healthcare: 80, utilities: 80 },
    MIA: { name: 'Miami', index: 85, housing: 110, food: 95, transport: 85, healthcare: 90, utilities: 105 },
    SFO: { name: 'San Francisco', index: 110, housing: 140, food: 110, transport: 100, healthcare: 105, utilities: 110 },
    BOS: { name: 'Boston', index: 88, housing: 110, food: 105, transport: 90, healthcare: 95, utilities: 100 },
    DEN: { name: 'Denver', index: 78, housing: 85, food: 90, transport: 80, healthcare: 85, utilities: 90 },
    AUS: { name: 'Austin', index: 75, housing: 80, food: 85, transport: 75, healthcare: 80, utilities: 85 },
    SEA: { name: 'Seattle', index: 92, housing: 120, food: 100, transport: 90, healthcare: 95, utilities: 95 },
    PHX: { name: 'Phoenix', index: 72, housing: 75, food: 80, transport: 70, healthcare: 75, utilities: 85 },
    DAL: { name: 'Dallas', index: 70, housing: 70, food: 80, transport: 70, healthcare: 75, utilities: 80 },
    ATL: { name: 'Atlanta', index: 73, housing: 75, food: 85, transport: 75, healthcare: 80, utilities: 85 },
    MIN: { name: 'Minneapolis', index: 74, housing: 75, food: 85, transport: 75, healthcare: 85, utilities: 85 },
    DET: { name: 'Detroit', index: 68, housing: 65, food: 80, transport: 70, healthcare: 80, utilities: 85 },
  };

  const results = useMemo(() => {
    const c1 = cityIndices[city1];
    const c2 = cityIndices[city2];

    const monthlyExpenses = 4000; // Standard monthly expenses

    const c1MonthlyExpense = (monthlyExpenses * c1.index) / 100;
    const c2MonthlyExpense = (monthlyExpenses * c2.index) / 100;
    const difference = c2MonthlyExpense - c1MonthlyExpense;

    return {
      city1: c1,
      city2: c2,
      c1MonthlyExpense: Math.round(c1MonthlyExpense),
      c2MonthlyExpense: Math.round(c2MonthlyExpense),
      difference: Math.round(difference),
      annualDifference: Math.round(difference * 12),
      cheaper: difference < 0 ? city1 : city2,
      percentDifference: ((Math.abs(difference) / c1MonthlyExpense) * 100).toFixed(1),
    };
  }, [city1, city2]);

  const cities = Object.keys(cityIndices).sort((a, b) =>
    cityIndices[a].name.localeCompare(cityIndices[b].name)
  );

  return (
    <div className="space-y-6 p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Compare Cities</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              City 1
            </label>
            <select
              value={city1}
              onChange={(e) => setCity1(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {cityIndices[c].name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              City 2
            </label>
            <select
              value={city2}
              onChange={(e) => setCity2(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {cityIndices[c].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Cost Comparison</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Overall Index:</span>
              <span className="flex gap-4">
                <span className="font-mono font-semibold text-text-primary">
                  {results.city1.index}
                </span>
                <span className="text-text-muted">vs</span>
                <span className="font-mono font-semibold text-text-primary">
                  {results.city2.index}
                </span>
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-sm text-text-secondary mb-2">Estimated Monthly Cost (Base $4,000):</p>
              <div className="flex justify-between">
                <span className="text-text-secondary">{results.city1.name}:</span>
                <span className="font-mono font-semibold text-text-primary">
                  ${results.c1MonthlyExpense.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{results.city2.name}:</span>
                <span className="font-mono font-semibold text-text-primary">
                  ${results.c2MonthlyExpense.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3 bg-accent/10 -mx-4 px-4 py-3 rounded">
              <div className="mb-2">
                <p className="text-sm text-text-secondary">
                  {results.cheaper === city1 ? results.city1.name : results.city2.name} is cheaper
                </p>
                <p className="font-mono text-lg font-bold text-accent">
                  ${Math.abs(results.difference).toLocaleString()}/month
                </p>
                <p className="text-sm text-text-secondary">
                  ({results.percentDifference}% difference)
                </p>
              </div>
              <div className="text-sm">
                <p className="text-text-secondary">Annual Savings:</p>
                <p className="font-mono font-bold text-accent">
                  ${Math.abs(results.annualDifference).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-surface p-4 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4">Category Breakdown (Index)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-text-primary mb-3">{results.city1.name}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Housing:</span>
                <span className="font-mono font-semibold">{results.city1.housing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Food:</span>
                <span className="font-mono font-semibold">{results.city1.food}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Transport:</span>
                <span className="font-mono font-semibold">{results.city1.transport}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Healthcare:</span>
                <span className="font-mono font-semibold">{results.city1.healthcare}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Utilities:</span>
                <span className="font-mono font-semibold">{results.city1.utilities}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-3">{results.city2.name}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Housing:</span>
                <span className="font-mono font-semibold">{results.city2.housing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Food:</span>
                <span className="font-mono font-semibold">{results.city2.food}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Transport:</span>
                <span className="font-mono font-semibold">{results.city2.transport}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Healthcare:</span>
                <span className="font-mono font-semibold">{results.city2.healthcare}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Utilities:</span>
                <span className="font-mono font-semibold">{results.city2.utilities}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Note:</p>
        <p>
          This comparison uses simplified indices. Actual costs vary by neighborhood, lifestyle,
          and specific circumstances. Housing is typically the largest expense component.
        </p>
      </div>
    </div>
  );
}
