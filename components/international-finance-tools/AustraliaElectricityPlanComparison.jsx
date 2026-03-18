'use client';

import { useState, useMemo } from 'react';

export default function AustraliaElectricityPlanComparison() {
  const [kwhQuarter, setKwhQuarter] = useState('1200');
  const [state, setState] = useState('NSW');

  const estimates = useMemo(() => {
    const usage = parseFloat(kwhQuarter) || 1200;
    const annualUsage = usage * 4;

    // Rough estimate rates (vary by retailer)
    const flatRate = annualUsage * 0.28; // $0.28/kWh average
    const timeOfUseOffPeak = (annualUsage * 0.4 * 0.22) + (annualUsage * 0.6 * 0.35); // Mix of off-peak/peak
    const discountPlan = flatRate * 0.85; // 15% discount for bundle/contract

    return {
      annualUsage: annualUsage.toFixed(0),
      flatRate: flatRate.toFixed(0),
      timeOfUse: timeOfUseOffPeak.toFixed(0),
      discountPlan: discountPlan.toFixed(0),
    };
  }, [kwhQuarter]);

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Quarterly Usage (kWh)</label>
          <input type="number" value={kwhQuarter} onChange={(e) => setKwhQuarter(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">State</label>
          <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-white">
            <option>NSW</option>
            <option>VIC</option>
            <option>QLD</option>
            <option>WA</option>
            <option>SA</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-700 mb-2">Flat Rate</div>
          <div className="text-2xl font-mono font-bold text-blue-900">${estimates.flatRate}</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-sm text-purple-700 mb-2">Time-of-Use</div>
          <div className="text-2xl font-mono font-bold text-purple-900">${estimates.timeOfUse}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm text-green-700 mb-2">Discount Plan</div>
          <div className="text-2xl font-mono font-bold text-green-900">${estimates.discountPlan}</div>
        </div>
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">💡 Electricity Saving Tips</h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• Use LED bulbs (75% less energy than incandescent)</li>
          <li>• Run appliances on off-peak times (cheaper rates)</li>
          <li>• Use reverse cycle air-con efficiently</li>
          <li>• Install solar panels (20-40% savings potential)</li>
          <li>• Unplug devices in standby mode</li>
        </ul>
      </div>
    </div>
  );
}
