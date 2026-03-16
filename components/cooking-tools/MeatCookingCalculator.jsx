'use client';

import { useState } from 'react';

export default function MeatCookingCalculator() {
  const [meatType, setMeatType] = useState('chicken');
  const [cut, setCut] = useState('breast');
  const [weightKg, setWeightKg] = useState(1.5);

  const meatData = {
    chicken: {
      breast: { minTemp: 75, minsPerKg: 15, restMinutes: 10 },
      thighs: { minTemp: 75, minsPerKg: 20, restMinutes: 10 },
      whole: { minTemp: 75, minsPerKg: 20, restMinutes: 20 },
    },
    beef: {
      rare: { minTemp: 63, minsPerKg: 20, restMinutes: 20 },
      medium: { minTemp: 71, minsPerKg: 25, restMinutes: 20 },
      welldone: { minTemp: 77, minsPerKg: 30, restMinutes: 20 },
    },
    pork: {
      chops: { minTemp: 63, minsPerKg: 18, restMinutes: 15 },
      roast: { minTemp: 63, minsPerKg: 25, restMinutes: 20 },
    },
    lamb: {
      rare: { minTemp: 63, minsPerKg: 18, restMinutes: 20 },
      medium: { minTemp: 71, minsPerKg: 22, restMinutes: 20 },
      welldone: { minTemp: 77, minsPerKg: 25, restMinutes: 20 },
    },
    turkey: {
      breast: { minTemp: 75, minsPerKg: 18, restMinutes: 15 },
      whole: { minTemp: 75, minsPerKg: 15, restMinutes: 20 },
    },
  };

  const meatInfo = meatData[meatType];
  const cuts = Object.keys(meatInfo);
  const validCut = cuts.includes(cut) ? cut : cuts[0];
  const cooking = meatInfo[validCut];

  const cookingTimeMinutes = Math.ceil(weightKg * cooking.minsPerKg);
  const totalTimeMinutes = cookingTimeMinutes + cooking.restMinutes;

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Meat Type
          </label>
          <select
            value={meatType}
            onChange={(e) => {
              setMeatType(e.target.value);
              setCut(Object.keys(meatData[e.target.value])[0]);
            }}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="chicken">Chicken</option>
            <option value="beef">Beef</option>
            <option value="pork">Pork</option>
            <option value="lamb">Lamb</option>
            <option value="turkey">Turkey</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Cut / Level
          </label>
          <select
            value={validCut}
            onChange={(e) => setCut(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            {cuts.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Cooking Guide
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Cooking Time</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              {cookingTimeMinutes} mins
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Rest Time</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              {cooking.restMinutes} mins
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Total Time</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              {totalTimeMinutes} mins
            </p>
          </div>
        </div>

        <div className="bg-blue-100 border border-accent border-opacity-20 rounded-[var(--radius-input)] p-4">
          <p className="font-medium text-text-primary mb-2">Internal Temperature (Doneness)</p>
          <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
            {cooking.minTemp}°C
          </p>
          <p className="text-sm text-text-secondary mt-2">
            Use a meat thermometer in the thickest part, away from bone
          </p>
        </div>

        <div className="bg-surface rounded-[var(--radius-input)] p-3">
          <p className="text-sm font-medium text-text-primary mb-1">Resting is Important</p>
          <p className="text-sm text-text-secondary">
            Always let meat rest after cooking. This redistributes juices and keeps it moist.
          </p>
        </div>
      </div>
    </div>
  );
}
