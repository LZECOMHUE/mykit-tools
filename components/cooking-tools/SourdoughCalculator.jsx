'use client';

import { useState } from 'react';

export default function SourdoughCalculator() {
  const [targetWeight, setTargetWeight] = useState(1000);
  const [hydration, setHydration] = useState(75);
  const [starterPercent, setStarterPercent] = useState(20);
  const [roomTemp, setRoomTemp] = useState(20);

  const flourWeight = targetWeight / (1 + hydration / 100 + starterPercent / 100);
  const waterWeight = flourWeight * (hydration / 100);
  const starterWeight = flourWeight * (starterPercent / 100);
  const saltWeight = flourWeight * 0.02;

  const fermentationHours = roomTemp < 18 ? 18 : roomTemp < 22 ? 12 : roomTemp < 25 ? 8 : 6;

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Target Dough Weight (g)
          </label>
          <input
            type="number"
            min="500"
            max="5000"
            step="100"
            value={targetWeight}
            onChange={(e) => setTargetWeight(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Hydration (%)
          </label>
          <input
            type="number"
            min="60"
            max="90"
            step="1"
            value={hydration}
            onChange={(e) => setHydration(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Starter (% of flour)
          </label>
          <input
            type="number"
            min="5"
            max="40"
            step="1"
            value={starterPercent}
            onChange={(e) => setStarterPercent(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Room Temperature (°C)
          </label>
          <input
            type="number"
            min="15"
            max="30"
            step="1"
            value={roomTemp}
            onChange={(e) => setRoomTemp(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Recipe
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Flour</span>
            <span className="font-mono font-bold text-accent">
              {flourWeight.toLocaleString('en-GB', { maximumFractionDigits: 0 })}g
            </span>
          </div>

          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Water ({hydration}%)</span>
            <span className="font-mono font-bold text-accent">
              {waterWeight.toLocaleString('en-GB', { maximumFractionDigits: 0 })}g
            </span>
          </div>

          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Starter ({starterPercent}%)</span>
            <span className="font-mono font-bold text-accent">
              {starterWeight.toLocaleString('en-GB', { maximumFractionDigits: 0 })}g
            </span>
          </div>

          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3 border-2 border-accent border-opacity-20">
            <span className="text-text-primary font-medium">Salt (2%)</span>
            <span className="font-mono font-bold text-accent">
              {saltWeight.toLocaleString('en-GB', { maximumFractionDigits: 1 })}g
            </span>
          </div>
        </div>

        <p className="text-sm text-text-secondary bg-blue-50 rounded-[var(--radius-input)] p-3">
          Total: {targetWeight}g dough
        </p>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Fermentation Time
        </h3>

        <div className="bg-surface rounded-[var(--radius-input)] p-4">
          <p className="text-sm text-text-secondary mb-1">At {roomTemp}°C</p>
          <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
            {fermentationHours} hours
          </p>
          <p className="text-sm text-text-secondary mt-2">
            Bulk fermentation until dough has increased by 30-50% and shows signs of strength
          </p>
        </div>
      </div>
    </div>
  );
}
