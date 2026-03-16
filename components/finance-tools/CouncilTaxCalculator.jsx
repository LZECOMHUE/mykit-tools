'use client';

import { useState } from 'react';

export default function CouncilTaxCalculator() {
  const [band, setBand] = useState('D');
  const [singleOccupancy, setSingleOccupancy] = useState(false);

  const bandRanges = {
    A: { range: 'Up to £40,000', baseAmount: 800 },
    B: { range: '£40,001 to £52,000', baseAmount: 933 },
    C: { range: '£52,001 to £68,000', baseAmount: 1067 },
    D: { range: '£68,001 to £88,000', baseAmount: 1200 },
    E: { range: '£88,001 to £120,000', baseAmount: 1467 },
    F: { range: '£120,001 to £160,000', baseAmount: 1733 },
    G: { range: '£160,001 to £320,000', baseAmount: 2000 },
    H: { range: 'Over £320,000', baseAmount: 2400 },
  };

  const currentBand = bandRanges[band];
  const discount = singleOccupancy ? 0.25 : 0;
  const discountedAmount = currentBand.baseAmount * (1 - discount);
  const monthlyAmount = discountedAmount / 12;

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Property Band
          </label>
          <select
            value={band}
            onChange={(e) => setBand(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            {Object.entries(bandRanges).map(([key, value]) => (
              <option key={key} value={key}>
                Band {key} {value.range}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={singleOccupancy}
              onChange={(e) => setSingleOccupancy(e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
            <span className="ml-2 text-sm font-medium text-text-primary">
              Single Occupancy Discount (25%)
            </span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Council Tax Amount
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Annual (Band {band})</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{discountedAmount.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Monthly</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{monthlyAmount.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Base Rate (Band D)</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{bandRanges.D.baseAmount.toLocaleString('en-GB')}
            </p>
          </div>
        </div>

        {singleOccupancy && (
          <div className="bg-blue-50 border border-accent border-opacity-20 rounded-[var(--radius-input)] p-3">
            <p className="text-sm text-text-primary">
              <span className="font-medium">25% Single Occupancy Discount Applied</span>
              <br />
              <span className="text-text-secondary">You save £{(currentBand.baseAmount * 0.25).toLocaleString('en-GB', { maximumFractionDigits: 0 })} per year</span>
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          All Bands (Band D as Baseline)
        </h3>
        <div className="space-y-2">
          {Object.entries(bandRanges).map(([key, value]) => (
            <div key={key} className={`flex justify-between items-center p-3 rounded-[var(--radius-input)] ${band === key ? 'bg-blue-100 border border-accent border-opacity-30' : 'bg-surface border border-border'}`}>
              <div>
                <span className="font-mono font-bold text-text-primary">Band {key}</span>
                <span className="text-sm text-text-secondary ml-2">{value.range}</span>
              </div>
              <span className="font-mono text-text-primary">£{value.baseAmount.toLocaleString('en-GB')}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        Amounts are typical for England 2025/26. Actual amounts vary by council. Check your local council for exact figures.
      </p>
    </div>
  );
}
