'use client';

import { useState, useMemo } from 'react';

export default function StampDutyCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(300000);
  const [buyerType, setBuyerType] = useState('first-time-buyer');

  const results = useMemo(() => {
    let totalDuty = 0;
    const breakdown = [];
    let cumulativePrice = 0;

    // UK SDLT bands (April 2025)
    const bands =
      buyerType === 'first-time-buyer'
        ? [
            { upper: 425000, rate: 0, label: 'Up to £425,000' },
            { upper: 625000, rate: 0.05, label: '£425,001 to £625,000' },
          ]
        : buyerType === 'home-mover'
        ? [
            { upper: 250000, rate: 0, label: 'Up to £250,000' },
            { upper: 925000, rate: 0.05, label: '£250,001 to £925,000' },
            { upper: 1500000, rate: 0.1, label: '£925,001 to £1,500,000' },
            { upper: Infinity, rate: 0.12, label: 'Above £1,500,000' },
          ]
        : buyerType === 'additional-property'
        ? [
            { upper: 250000, rate: 0.03, label: 'Up to £250,000' },
            { upper: 925000, rate: 0.08, label: '£250,001 to £925,000' },
            { upper: 1500000, rate: 0.13, label: '£925,001 to £1,500,000' },
            { upper: Infinity, rate: 0.15, label: 'Above £1,500,000' },
          ]
        : [
            // Non-UK resident
            { upper: 250000, rate: 0.02, label: 'Up to £250,000' },
            { upper: 925000, rate: 0.07, label: '£250,001 to £925,000' },
            { upper: 1500000, rate: 0.12, label: '£925,001 to £1,500,000' },
            { upper: Infinity, rate: 0.14, label: 'Above £1,500,000' },
          ];

    // Calculate duty by band
    let previousUpper = 0;
    for (const band of bands) {
      const bandStart = previousUpper;
      const bandEnd = Math.min(band.upper, propertyPrice);

      if (bandEnd > bandStart) {
        const bandAmount = bandEnd - bandStart;
        const dutyInBand = bandAmount * band.rate;
        totalDuty += dutyInBand;

        breakdown.push({
          label: band.label,
          amount: bandAmount,
          rate: band.rate * 100,
          duty: dutyInBand,
        });

        previousUpper = band.upper;
      }

      if (propertyPrice <= band.upper) break;
    }

    const effectiveRate = propertyPrice > 0 ? (totalDuty / propertyPrice) * 100 : 0;

    return {
      totalDuty,
      effectiveRate,
      breakdown,
    };
  }, [propertyPrice, buyerType]);

  const formatCurrency = (value) => {
    return '£' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const buyerTypeDescriptions = {
    'first-time-buyer': 'First-time buyer (up to £625k only)',
    'home-mover': 'Home mover (standard rates)',
    'additional-property': 'Additional property (+3% surcharge)',
    'non-uk-resident': 'Non-UK resident (+2% surcharge)',
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">UK Stamp Duty Calculator</h2>

      {/* Inputs */}
      <div className="space-y-4 mb-8">
        {/* Property Price */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Property Price (£)
          </label>
          <input
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="10000"
          />
          <p className="text-xs text-text-muted mt-1">Purchase price of the property</p>
        </div>

        {/* Buyer Type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Buyer Type
          </label>
          <select
            value={buyerType}
            onChange={(e) => setBuyerType(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
          >
            <option value="first-time-buyer">First-time Buyer</option>
            <option value="home-mover">Home Mover</option>
            <option value="additional-property">Additional Property</option>
            <option value="non-uk-resident">Non-UK Resident</option>
          </select>
          <p className="text-xs text-text-muted mt-1">{buyerTypeDescriptions[buyerType]}</p>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border space-y-4">
        <div>
          <p className="text-text-secondary text-sm mb-1">Total Stamp Duty</p>
          <p className="text-3xl font-bold text-accent font-mono-num">
            {formatCurrency(results.totalDuty)}
          </p>
        </div>

        <div>
          <p className="text-text-secondary text-sm mb-1">Effective Tax Rate</p>
          <p className="text-xl font-bold text-text-primary font-mono-num">
            {results.effectiveRate.toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-text-secondary text-sm mb-1">Property Price + Stamp Duty</p>
          <p className="text-lg font-bold text-text-primary font-mono-num">
            {formatCurrency(propertyPrice + results.totalDuty)}
          </p>
        </div>
      </div>

      {/* Breakdown by Band */}
      <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border">
        <h3 className="text-lg font-bold text-text-primary mb-4">Breakdown by Tax Band</h3>
        <div className="space-y-3">
          {results.breakdown.map((band, idx) => (
            <div key={idx} className="border-b border-border pb-3 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <span className="text-text-primary font-medium">{band.label}</span>
                <span className="text-text-primary font-bold font-mono-num">
                  {formatCurrency(band.duty)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-text-muted">
                <span>{formatCurrency(band.amount)} @ {band.rate}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Information */}
      <div className="space-y-4">
        <div className="bg-white rounded-[var(--radius-card)] p-4 border border-border text-sm text-text-muted">
          <p className="font-semibold text-text-primary mb-2">Rates Current As Of:</p>
          <p>April 2025 (UK Stamp Duty Land Tax)</p>
        </div>

        <div className="bg-white rounded-[var(--radius-card)] p-4 border border-border text-xs text-text-muted space-y-2">
          <p className="font-semibold text-text-primary">Key Information:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>First-time buyers get relief on properties up to £425k (0%), then 5% between £425k-£625k</li>
            <li>Additional property purchases incur a 3% surcharge on all bands</li>
            <li>Non-UK residents incur a 2% surcharge on all bands</li>
            <li>Stamp duty is paid by the property buyer at completion</li>
            <li>Rates changed in April 2025 — check with HMRC for the latest rates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
