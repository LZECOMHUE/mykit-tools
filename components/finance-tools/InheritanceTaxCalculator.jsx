'use client';

import { useState, useMemo } from 'react';

export default function InheritanceTaxCalculator() {
  const [estateValue, setEstateValue] = useState(500000);
  const [giftsInSevenYears, setGiftsInSevenYears] = useState(10000);
  const [maritalStatus, setMaritalStatus] = useState('single');

  const results = useMemo(() => {
    const nilRateBand = 325000;
    const residenceNilRateBand = 175000;
    const ihtRate = 0.4;

    let totalAllowance = nilRateBand;
    if (maritalStatus === 'married' || maritalStatus === 'civil') {
      totalAllowance = nilRateBand * 2;
    }

    const grossEstate = estateValue + giftsInSevenYears;
    const taxableEstate = Math.max(0, grossEstate - totalAllowance);
    const ihtDue = taxableEstate * ihtRate;

    return {
      nilRateBand: totalAllowance,
      grossEstate,
      taxableEstate,
      ihtDue,
      netEstate: estateValue - ihtDue,
      effectiveRate: grossEstate > 0 ? ((ihtDue / grossEstate) * 100).toFixed(2) : 0,
    };
  }, [estateValue, giftsInSevenYears, maritalStatus]);

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Estate Value
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={estateValue}
              onChange={(e) => setEstateValue(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Gifts in Last 7 Years
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={giftsInSevenYears}
              onChange={(e) => setGiftsInSevenYears(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Marital Status
          </label>
          <select
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="single">Single</option>
            <option value="married">Married/Civil Partnership</option>
          </select>
          <p className="text-xs text-text-muted mt-1">
            Married couples can transfer unused allowance to surviving spouse
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Inheritance Tax Calculation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Nil Rate Band</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.nilRateBand.toLocaleString('en-GB')}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Gross Estate</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.grossEstate.toLocaleString('en-GB')}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Taxable Estate</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.taxableEstate.toLocaleString('en-GB')}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4 border border-accent border-opacity-30">
            <p className="text-sm text-text-secondary mb-1">IHT Due at 40%</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.ihtDue.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-accent border-opacity-20 rounded-[var(--radius-input)] p-3">
          <p className="text-sm text-text-primary">
            <span className="font-mono font-bold">Net to Beneficiaries:</span>
            <span className="ml-2">£{results.netEstate.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-surface rounded-[var(--radius-input)] p-4">
          <p className="text-sm font-medium text-text-primary mb-1">How It Works</p>
          <p className="text-sm text-text-secondary">
            The first £{results.nilRateBand.toLocaleString('en-GB')} is free from tax. Above that, 40% IHT applies. Gifts made more than 7 years ago don't count.
          </p>
        </div>
      </div>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        Not legal or tax advice. IHT rules are complex. Consult a solicitor or tax advisor for your situation.
      </p>
    </div>
  );
}
