'use client';

import { useState, useMemo } from 'react';

export default function USMinimumWageMap() {
  const [sortBy, setSortBy] = useState('state');
  const [showTipped, setShowTipped] = useState(false);

  const stateData = [
    { state: 'Alabama', abbr: 'AL', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
    { state: 'Alaska', abbr: 'AK', federalWage: 7.25, stateWage: 11.73, tipped: 11.73, override: true },
    { state: 'Arizona', abbr: 'AZ', federalWage: 7.25, stateWage: 16.5, tipped: 16.5, override: true },
    { state: 'Arkansas', abbr: 'AR', federalWage: 7.25, stateWage: 11.0, tipped: 11.0, override: true },
    { state: 'California', abbr: 'CA', federalWage: 7.25, stateWage: 16.5, tipped: 16.5, override: true },
    { state: 'Colorado', abbr: 'CO', federalWage: 7.25, stateWage: 14.42, tipped: 11.54, override: true },
    { state: 'Connecticut', abbr: 'CT', federalWage: 7.25, stateWage: 15.69, tipped: 10.0, override: true },
    { state: 'Delaware', abbr: 'DE', federalWage: 7.25, stateWage: 13.75, tipped: 2.23, override: true },
    { state: 'Florida', abbr: 'FL', federalWage: 7.25, stateWage: 13.0, tipped: 13.0, override: true },
    { state: 'Georgia', abbr: 'GA', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
    { state: 'Hawaii', abbr: 'HI', federalWage: 7.25, stateWage: 14.0, tipped: 14.0, override: true },
    { state: 'Idaho', abbr: 'ID', federalWage: 7.25, stateWage: 12.3, tipped: 12.3, override: true },
    { state: 'Illinois', abbr: 'IL', federalWage: 7.25, stateWage: 14.0, tipped: 8.4, override: true },
    { state: 'Indiana', abbr: 'IN', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
    { state: 'Iowa', abbr: 'IA', federalWage: 7.25, stateWage: 11.0, tipped: 8.8, override: true },
    { state: 'Kansas', abbr: 'KS', federalWage: 7.25, stateWage: 14.3, tipped: 14.3, override: true },
    { state: 'Kentucky', abbr: 'KY', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
    { state: 'Louisiana', abbr: 'LA', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
    { state: 'Maine', abbr: 'ME', federalWage: 7.25, stateWage: 14.15, tipped: 14.15, override: true },
    { state: 'Maryland', abbr: 'MD', federalWage: 7.25, stateWage: 15.73, tipped: 3.63, override: true },
    { state: 'Massachusetts', abbr: 'MA', federalWage: 7.25, stateWage: 15.0, tipped: 6.75, override: true },
    { state: 'Michigan', abbr: 'MI', federalWage: 7.25, stateWage: 10.33, tipped: 3.93, override: true },
    { state: 'Minnesota', abbr: 'MN', federalWage: 7.25, stateWage: 12.85, tipped: 12.85, override: true },
    { state: 'Mississippi', abbr: 'MS', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
    { state: 'Missouri', abbr: 'MO', federalWage: 7.25, stateWage: 14.3, tipped: 14.3, override: true },
    { state: 'Montana', abbr: 'MT', federalWage: 7.25, stateWage: 12.3, tipped: 12.3, override: true },
    { state: 'Nebraska', abbr: 'NE', federalWage: 7.25, stateWage: 14.0, tipped: 12.0, override: true },
    { state: 'Nevada', abbr: 'NV', federalWage: 7.25, stateWage: 12.0, tipped: 12.0, override: true },
    { state: 'New Hampshire', abbr: 'NH', federalWage: 7.25, stateWage: 7.25, tipped: 3.27, override: false },
    { state: 'New Jersey', abbr: 'NJ', federalWage: 7.25, stateWage: 15.13, tipped: 5.13, override: true },
    { state: 'New Mexico', abbr: 'NM', federalWage: 7.25, stateWage: 12.0, tipped: 12.0, override: true },
    { state: 'New York', abbr: 'NY', federalWage: 7.25, stateWage: 15.13, tipped: 7.85, override: true },
    { state: 'North Carolina', abbr: 'NC', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
    { state: 'North Dakota', abbr: 'ND', federalWage: 7.25, stateWage: 12.3, tipped: 12.3, override: true },
    { state: 'Ohio', abbr: 'OH', federalWage: 7.25, stateWage: 12.56, tipped: 10.45, override: true },
    { state: 'Oklahoma', abbr: 'OK', federalWage: 7.25, stateWage: 7.65, tipped: 2.13, override: true },
    { state: 'Oregon', abbr: 'OR', federalWage: 7.25, stateWage: 15.45, tipped: 15.45, override: true },
    { state: 'Pennsylvania', abbr: 'PA', federalWage: 7.25, stateWage: 7.25, tipped: 2.83, override: false },
    { state: 'Rhode Island', abbr: 'RI', federalWage: 7.25, stateWage: 15.0, tipped: 6.0, override: true },
    { state: 'South Carolina', abbr: 'SC', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
    { state: 'South Dakota', abbr: 'SD', federalWage: 7.25, stateWage: 14.5, tipped: 12.35, override: true },
    { state: 'Tennessee', abbr: 'TN', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
    { state: 'Texas', abbr: 'TX', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
    { state: 'Utah', abbr: 'UT', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
    { state: 'Vermont', abbr: 'VT', federalWage: 7.25, stateWage: 15.67, tipped: 15.67, override: true },
    { state: 'Virginia', abbr: 'VA', federalWage: 7.25, stateWage: 12.0, tipped: 12.0, override: true },
    { state: 'Washington', abbr: 'WA', federalWage: 7.25, stateWage: 16.28, tipped: 16.28, override: true },
    { state: 'West Virginia', abbr: 'WV', federalWage: 7.25, stateWage: 8.75, tipped: 8.75, override: true },
    { state: 'Wisconsin', abbr: 'WI', federalWage: 7.25, stateWage: 7.25, tipped: 2.33, override: false },
    { state: 'Wyoming', abbr: 'WY', federalWage: 7.25, stateWage: 7.25, tipped: 2.13, override: false },
  ];

  const sorted = useMemo(() => {
    let data = [...stateData];

    if (sortBy === 'wage-high') {
      data.sort((a, b) => b.stateWage - a.stateWage);
    } else if (sortBy === 'wage-low') {
      data.sort((a, b) => a.stateWage - b.stateWage);
    } else {
      data.sort((a, b) => a.state.localeCompare(b.state));
    }

    return data;
  }, [sortBy]);

  const getWageColor = (wage) => {
    if (wage >= 15) return 'bg-green-100 text-green-900';
    if (wage >= 12) return 'bg-blue-100 text-blue-900';
    if (wage >= 10) return 'bg-yellow-100 text-yellow-900';
    return 'bg-orange-100 text-orange-900';
  };

  const highestWage = Math.max(...stateData.map((s) => s.stateWage));
  const lowestWage = Math.min(...stateData.map((s) => s.stateWage));
  const avgWage = (stateData.reduce((sum, s) => sum + s.stateWage, 0) / stateData.length).toFixed(2);
  const aboveMinimum = stateData.filter((s) => s.stateWage > 7.25).length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
        <h1 className="text-3xl font-heading font-bold text-blue-900 mb-2">US Minimum Wage Map</h1>
        <p className="text-blue-800">State vs Federal minimum wage comparison</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-600 font-medium mb-1">Federal Minimum</p>
          <p className="font-mono text-2xl font-bold text-blue-700">$7.25</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-xs text-green-600 font-medium mb-1">Highest State</p>
          <p className="font-mono text-2xl font-bold text-green-700">${highestWage}</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-xs text-orange-600 font-medium mb-1">Lowest State</p>
          <p className="font-mono text-2xl font-bold text-orange-700">${lowestWage}</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-xs text-purple-600 font-medium mb-1">Average State</p>
          <p className="font-mono text-2xl font-bold text-purple-700">${avgWage}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Sort By</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSortBy('state')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                sortBy === 'state'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-border text-text-primary hover:border-blue-500'
              }`}
            >
              State (A-Z)
            </button>
            <button
              onClick={() => setSortBy('wage-high')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                sortBy === 'wage-high'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-border text-text-primary hover:border-blue-500'
              }`}
            >
              Highest Wage
            </button>
            <button
              onClick={() => setSortBy('wage-low')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                sortBy === 'wage-low'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-border text-text-primary hover:border-blue-500'
              }`}
            >
              Lowest Wage
            </button>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showTipped}
              onChange={(e) => setShowTipped(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-text-secondary">Show Tipped Minimum Wage</span>
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">State</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">State Minimum</th>
                {showTipped && <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Tipped Minimum</th>}
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">vs Federal</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((data) => {
                const wageColor = getWageColor(data.stateWage);
                const difference = (data.stateWage - 7.25).toFixed(2);
                const isHigher = data.stateWage > 7.25;

                return (
                  <tr key={data.abbr} className="border-b border-border hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-text-primary">{data.state}</div>
                      <div className="text-xs text-text-muted">{data.abbr}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-lg text-sm font-mono font-semibold ${wageColor}`}>
                        ${data.stateWage.toFixed(2)}
                      </span>
                    </td>
                    {showTipped && (
                      <td className="px-4 py-3">
                        <div className="font-mono text-sm text-text-secondary">${data.tipped.toFixed(2)}</div>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <div className={`text-sm font-mono font-semibold ${isHigher ? 'text-green-600' : 'text-orange-600'}`}>
                        {isHigher ? '+' : ''} ${difference}
                      </div>
                      <div className="text-xs text-text-muted">
                        {data.override ? 'State sets rate' : 'Uses federal'}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-300" />
          <span className="text-sm text-text-secondary">$15+</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300" />
          <span className="text-sm text-text-secondary">$12-14.99</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300" />
          <span className="text-sm text-text-secondary">$10-11.99</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-orange-100 border border-orange-300" />
          <span className="text-sm text-text-secondary">$7.25-9.99</span>
        </div>
      </div>

      {/* Key Facts */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg space-y-3">
        <h3 className="text-text-primary font-semibold">Key Facts</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>• <strong>Federal minimum:</strong> $7.25/hour (since 2009)</li>
          <li>• <strong>{aboveMinimum} states</strong> have set minimum wage above federal level</li>
          <li>• <strong>Tipped minimum:</strong> Most states allow lower minimum wage for tipped employees (federal: $2.13)</li>
          <li>• <strong>Full state rate for tips:</strong> Some states require full minimum wage even for tipped workers</li>
          <li>• <strong>When minimum wage applies:</strong> Non-exempt employees working in the state must receive at least that state's minimum</li>
          <li>• <strong>Annual updates:</strong> Some states index to inflation and adjust yearly (e.g., CA, WA, NY)</li>
        </ul>
      </div>

      {/* Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg space-y-3">
        <h3 className="text-text-primary font-semibold">Important Notes</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>• Data current as of March 2026. Check state labor departments for latest updates</li>
          <li>• City/county minimums may be higher than state (e.g., San Francisco, Seattle)</li>
          <li>• Some states index to inflation and adjust annually</li>
          <li>• Tipped employees: employer must ensure total compensation (wages + tips) meets minimum wage</li>
          <li>• Some industries have different minimum wage rates (e.g., agriculture)</li>
          <li>• Always check with your state's Department of Labor for the most current information</li>
        </ul>
      </div>

      {/* States at Federal Minimum */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-text-primary font-semibold mb-3">States at Federal Minimum ($7.25)</h3>
        <p className="text-sm text-text-secondary">
          {stateData
            .filter((s) => s.stateWage === 7.25)
            .map((s) => s.abbr)
            .join(', ')}
        </p>
      </div>
    </div>
  );
}
