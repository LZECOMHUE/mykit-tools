'use client';

import { useState, useMemo } from 'react';

const EV_PRESETS = {
  'Tesla Model 3': 75,
  'Tesla Model Y': 82,
  'Tesla Model S': 100,
  'Tesla Model X': 100,
  'Nissan Leaf': 62,
  'Chevrolet Bolt': 66,
  'Hyundai Ioniq 5': 58,
  'Kia EV6': 58,
  'VW ID.4': 82,
  'Audi e-tron': 95,
  'BMW i4': 81,
  'Jaguar i-PACE': 90,
  'Custom': 60
};

const CHARGER_TYPES = {
  'home-3kw': { power: 3, name: '3kW Home Charger' },
  'home-7kw': { power: 7, name: '7kW Home Charger' },
  'workplace-22kw': { power: 22, name: '22kW Workplace Charger' },
  'rapid-50kw': { power: 50, name: '50kW Rapid Charger' },
  'ultrarapid-150kw': { power: 150, name: '150kW Ultra-Rapid Charger' },
};

export default function EVChargingTimeCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState('75');
  const [currentCharge, setCurrentCharge] = useState('20');
  const [targetCharge, setTargetCharge] = useState('80');
  const [chargerType, setChargerType] = useState('home-7kw');
  const [costPerKwh, setCostPerKwh] = useState('0.28');

  const result = useMemo(() => {
    const capacity = parseFloat(batteryCapacity) || 0;
    const current = parseFloat(currentCharge) || 0;
    const target = parseFloat(targetCharge) || 0;
    const power = CHARGER_TYPES[chargerType]?.power || 7;
    const cost = parseFloat(costPerKwh) || 0;

    if (capacity <= 0 || current < 0 || target <= current || target > 100) return null;

    const percentageNeeded = target - current;
    const kwhNeeded = (capacity / 100) * percentageNeeded;

    // Calculate charging time (in hours)
    // Note: Charging rate slows down as battery fills, so use ~80% of max power as average
    const avgPower = power * 0.8;
    const chargingTimeHours = kwhNeeded / avgPower;

    const hours = Math.floor(chargingTimeHours);
    const minutes = Math.round((chargingTimeHours - hours) * 60);

    const totalCost = kwhNeeded * cost;

    return {
      kwhNeeded: kwhNeeded.toFixed(2),
      chargingTime: `${hours}h ${minutes}m`,
      totalCost: totalCost.toFixed(2),
      avgPower: avgPower.toFixed(1)
    };
  }, [batteryCapacity, currentCharge, targetCharge, chargerType, costPerKwh]);

  return (
    <div className="w-full space-y-6">
      {/* Configuration */}
      <div className="space-y-4">
        {/* Battery Capacity */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Battery Capacity (kWh)
          </label>
          <div className="flex gap-2 mt-2">
            <select
              value={batteryCapacity}
              onChange={(e) => {
                const val = e.target.value;
                if (val !== 'custom') setBatteryCapacity(val);
              }}
              className="flex-1 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="custom">Custom</option>
              {Object.entries(EV_PRESETS).map(([car, capacity]) => (
                <option key={car} value={capacity}>{car}</option>
              ))}
            </select>
          </div>
          <input
            type="number"
            value={batteryCapacity}
            onChange={(e) => setBatteryCapacity(e.target.value)}
            min="0"
            step="5"
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Current Charge */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Current Charge (%)
          </label>
          <input
            type="range"
            value={currentCharge}
            onChange={(e) => setCurrentCharge(e.target.value)}
            min="0"
            max="100"
            className="w-full mt-2"
          />
          <p className="text-text-primary font-mono text-center mt-1">
            {currentCharge}%
          </p>
        </div>

        {/* Target Charge */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Target Charge (%)
          </label>
          <input
            type="range"
            value={targetCharge}
            onChange={(e) => setTargetCharge(e.target.value)}
            min="0"
            max="100"
            className="w-full mt-2"
          />
          <p className="text-text-primary font-mono text-center mt-1">
            {targetCharge}%
          </p>
        </div>

        {/* Charger Type */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Charger Type
          </label>
          <select
            value={chargerType}
            onChange={(e) => setChargerType(e.target.value)}
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {Object.entries(CHARGER_TYPES).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        {/* Cost per kWh */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Cost per kWh (GBP)
          </label>
          <input
            type="number"
            value={costPerKwh}
            onChange={(e) => setCostPerKwh(e.target.value)}
            min="0"
            step="0.01"
            placeholder="0.28"
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="text-text-secondary text-[11px] mt-1">
            UK average: 0.28 GBP per kWh
          </p>
        </div>
      </div>

      {/* Results */}
      {result && (
        <>
          <div className="rounded-[var(--radius-card)] bg-accent bg-opacity-10 border border-accent p-4">
            <p className="text-text-secondary text-sm font-medium mb-2">
              Charging Time
            </p>
            <p className="text-4xl font-bold font-mono text-accent">
              {result.chargingTime}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Energy Needed
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                {result.kwhNeeded} kWh
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Avg Power
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                {result.avgPower} kW
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Est. Cost
              </p>
              <p className="font-mono text-text-primary text-lg mt-1">
                £{result.totalCost}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Note */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
        <p className="text-text-secondary text-[11px]">
          Note: Charging speed slows as the battery approaches full capacity. These estimates assume ~80% of maximum power. Actual times vary based on battery condition and ambient temperature.
        </p>
      </div>
    </div>
  );
}
