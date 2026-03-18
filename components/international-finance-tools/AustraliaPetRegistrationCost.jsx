'use client';

import { useState, useMemo } from 'react';

export default function AustraliaPetRegistrationCost() {
  const [state, setState] = useState('NSW');
  const [petType, setPetType] = useState('dog');
  const [isDesexed, setIsDesexed] = useState(true);

  const costs = useMemo(() => {
    const rates = {
      NSW: { dog: isDesexed ? 65 : 85, cat: isDesexed ? 45 : 65 },
      VIC: { dog: isDesexed ? 77 : 120, cat: isDesexed ? 67 : 120 },
      QLD: { dog: isDesexed ? 50 : 80, cat: isDesexed ? 30 : 60 },
      WA: { dog: isDesexed ? 60 : 90, cat: isDesexed ? 40 : 70 },
      SA: { dog: isDesexed ? 60 : 100, cat: isDesexed ? 30 : 70 },
    };

    const rate = rates[state];
    const annualCost = rate[petType];
    const multiyearCost = annualCost * 3;

    return { annual: annualCost, threeyear: multiyearCost };
  }, [state, petType, isDesexed]);

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">State</label>
          <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-white">
            {['NSW', 'VIC', 'QLD', 'WA', 'SA'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Pet Type</label>
          <select value={petType} onChange={(e) => setPetType(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-white">
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isDesexed} onChange={(e) => setIsDesexed(e.target.checked)} />
            <span className="text-sm font-medium text-text-secondary">Desexed</span>
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-sm text-blue-700 mb-2">Annual Cost</div>
          <div className="text-4xl font-mono font-bold text-blue-900">${costs.annual}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="text-sm text-green-700 mb-2">3-Year Cost</div>
          <div className="text-4xl font-mono font-bold text-green-900">${costs.threeyear}</div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">📋 Pet Registration</h3>
        <p className="text-sm text-blue-800">Most Australian councils require annual pet registration for dogs and cats. Desexed pets typically have lower fees. Registration helps identify lost pets and maintain community records.</p>
      </div>
    </div>
  );
}
