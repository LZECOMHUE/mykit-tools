'use client';

import { useState, useMemo } from 'react';

export default function AustraliaWaterUsageCalculator() {
  const [householdSize, setHouseholdSize] = useState('4');
  const [showerMin, setShowerMin] = useState('20');
  const [toiletFlushes, setToiletFlushes] = useState('20');
  const [laundryLoads, setLaundryLoads] = useState('8');
  const [hasGarden, setHasGarden] = useState(true);
  const [hasPool, setHasPool] = useState(false);

  const usage = useMemo(() => {
    const household = parseFloat(householdSize) || 4;
    const showers = (parseFloat(showerMin) || 20) * 9; // 9L/min
    const toilets = (parseFloat(toiletFlushes) || 20) * 6; // 6L/flush
    const laundry = (parseFloat(laundryLoads) || 8) * 150; // 150L/load
    
    const dailyInternal = showers + toilets + laundry;
    let dailyTotal = dailyInternal;

    if (hasGarden) dailyTotal += 80; // 80L outdoor
    if (hasPool) dailyTotal += 200; // 200L pool

    const quarterUsage = dailyTotal * 91; // 91 days per quarter
    const annualUsage = dailyTotal * 365;

    return {
      daily: dailyTotal.toFixed(0),
      quarterly: quarterUsage.toFixed(0),
      annual: annualUsage.toFixed(0),
      perCapita: (dailyTotal / household).toFixed(1),
    };
  }, [householdSize, showerMin, toiletFlushes, laundryLoads, hasGarden, hasPool]);

  const avgUsage = (Math.round(parseFloat(usage.daily) / 1000) * 1000).toFixed(0);

  return (
    <div className="bg-surface rounded-lg space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Household Size</label>
          <input type="number" value={householdSize} onChange={(e) => setHouseholdSize(e.target.value)} min="1" className="w-full px-4 py-2 border border-border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Daily Shower Time (min)</label>
          <input type="number" value={showerMin} onChange={(e) => setShowerMin(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Toilet Flushes/Day</label>
          <input type="number" value={toiletFlushes} onChange={(e) => setToiletFlushes(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={hasGarden} onChange={(e) => setHasGarden(e.target.checked)} />
            <span className="text-sm font-medium text-text-secondary">Garden Watering (~80L/day)</span>
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={hasPool} onChange={(e) => setHasPool(e.target.checked)} />
            <span className="text-sm font-medium text-text-secondary">Swimming Pool (~200L/day)</span>
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-700 mb-2">Daily Usage</div>
          <div className="text-3xl font-mono font-bold text-blue-900">{usage.daily}L</div>
          <div className="text-xs text-blue-700 mt-2">Per capita: {usage.perCapita}L</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg">
          <div className="text-sm text-purple-700 mb-2">Quarterly</div>
          <div className="text-3xl font-mono font-bold text-purple-900">{usage.quarterly}L</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm text-green-700 mb-2">Annual</div>
          <div className="text-3xl font-mono font-bold text-green-900">{usage.annual}L</div>
        </div>
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">💧 Water Saving Tips</h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• Shorter showers save 50L+ per day</li>
          <li>• Fix dripping taps (9000L/year per tap)</li>
          <li>• Install flow restrictors (cheaper water bills)</li>
          <li>• Water garden early morning/evening (less evaporation)</li>
          <li>• Check for leaks in toilet cisterns regularly</li>
        </ul>
      </div>
    </div>
  );
}
