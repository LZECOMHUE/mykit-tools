'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';

const councilTaxRates = {
  A: { name: 'Band A', rate: 1200 },
  B: { name: 'Band B', rate: 1400 },
  C: { name: 'Band C', rate: 1600 },
  D: { name: 'Band D', rate: 1800 },
  E: { name: 'Band E', rate: 2100 },
  F: { name: 'Band F', rate: 2400 },
  G: { name: 'Band G', rate: 2800 },
  H: { name: 'Band H', rate: 3600 },
};

const councils = [
  'Birmingham',
  'Leeds',
  'Manchester',
  'Bristol',
  'Coventry',
  'Leicester',
  'Edinburgh',
  'Glasgow',
  'Liverpool',
  'Newcastle',
  'Nottingham',
  'Reading',
  'Sheffield',
  'Southampton',
  'Stoke-on-Trent',
  'Sunderland',
  'Swansea',
  'Wakefield',
  'Wolverhampton',
  'York',
];

export default function UKCouncilTaxCalculator() {
  const [band, setBand] = useState('D');
  const [council, setCouncil] = useState('Birmingham');
  const [singlePerson, setSinglePerson] = useState(false);
  const [calculated, setCalculated] = useState(null);

  const handleCalculate = () => {
    let annual = councilTaxRates[band].rate;

    if (singlePerson) {
      annual = annual * 0.75;
    }

    const monthly = annual / 12;

    setCalculated({
      band,
      council,
      annual: annual.toFixed(2),
      monthly: monthly.toFixed(2),
      singlePersonDiscount: singlePerson,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Council Tax Band
          </label>
          <Select value={band} onChange={(e) => setBand(e.target.value)} className="w-full">
            {Object.entries(councilTaxRates).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </Select>
          <p className="text-text-muted text-xs mt-2">
            Properties valued up to £40,000 (A), £52,000 (B), £68,000 (C), £88,000 (D), £120,000 (E), £160,000 (F), £320,000 (G), over £320,000 (H)
          </p>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Council Area
          </label>
          <Select value={council} onChange={(e) => setCouncil(e.target.value)} className="w-full">
            {councils.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          <p className="text-text-muted text-xs mt-2">
            Rates vary by council. This shows approximate 2025/26 England average band D rate of £1,800. Your council may differ.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="single"
            checked={singlePerson}
            onChange={() => setSinglePerson(!singlePerson)}
          />
          <label htmlFor="single" className="text-text-primary cursor-pointer">
            Single person living alone (25% discount)
          </label>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-accent text-white font-medium py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors"
        >
          Calculate Council Tax
        </button>
      </div>

      {calculated && (
        <div className="space-y-4">
          <div className="bg-accent text-white border border-accent rounded-[var(--radius-card)] p-6 space-y-3">
            <div>
              <p className="text-sm opacity-90">Council Tax Payment</p>
              <p className="font-mono text-4xl font-bold">£{calculated.monthly}</p>
              <p className="text-sm opacity-75 mt-1">per month</p>
            </div>

            <div className="border-t border-white border-opacity-20 pt-4">
              <p className="font-mono text-2xl font-bold">£{calculated.annual}</p>
              <p className="text-sm opacity-90">per year</p>
            </div>

            {calculated.singlePersonDiscount && (
              <div className="bg-white bg-opacity-10 rounded-lg p-3 border border-white border-opacity-20">
                <p className="text-sm">Single person discount applied: 25% reduction</p>
              </div>
            )}
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-3">
            <h3 className="font-heading text-base font-bold text-text-primary">Your Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-border rounded-lg p-3">
                <p className="text-text-muted text-xs">Band</p>
                <p className="font-mono font-bold text-accent text-lg">{calculated.band}</p>
              </div>
              <div className="bg-white border border-border rounded-lg p-3">
                <p className="text-text-muted text-xs">Council</p>
                <p className="font-mono font-bold text-accent text-lg">{calculated.council}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-sm">
              Note: This is an approximate calculation based on 2025/26 rates. Actual amounts vary by council. Contact your local council for an exact quote.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
