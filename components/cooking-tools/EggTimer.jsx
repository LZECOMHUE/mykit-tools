'use client';

import { useState } from 'react';

export default function EggTimer() {
  const [eggSize, setEggSize] = useState('medium');
  const [startingTemp, setStartingTemp] = useState('fridge');
  const [result, setResult] = useState('medium');

  const eggTimings = {
    small: { fridge: { soft: 5, medium: 6, hard: 8 }, room: { soft: 4, medium: 5, hard: 7 } },
    medium: { fridge: { soft: 6, medium: 7, hard: 9 }, room: { soft: 5, medium: 6, hard: 8 } },
    large: { fridge: { soft: 7, medium: 8, hard: 10 }, room: { soft: 6, medium: 7, hard: 9 } },
    xlarge: { fridge: { soft: 8, medium: 9, hard: 11 }, room: { soft: 7, medium: 8, hard: 10 } },
  };

  const timing = eggTimings[eggSize][startingTemp][result];
  const restTime = 2;

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Egg Size
          </label>
          <select
            value={eggSize}
            onChange={(e) => setEggSize(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xlarge">Extra Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Starting Temperature
          </label>
          <select
            value={startingTemp}
            onChange={(e) => setStartingTemp(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="fridge">Fridge (4°C)</option>
            <option value="room">Room Temperature (20°C)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Desired Result
          </label>
          <select
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="soft">Soft Boiled (Runny Yolk)</option>
            <option value="medium">Medium Boiled (Jammy Yolk)</option>
            <option value="hard">Hard Boiled (Solid Yolk)</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Boiling Time
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Boiling Time</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              {timing} mins
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Ice Bath Time</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              {restTime} mins
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Total Time</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              {timing + restTime} mins
            </p>
          </div>
        </div>

        <div className="bg-blue-100 border border-accent border-opacity-20 rounded-[var(--radius-input)] p-4">
          <p className="font-medium text-text-primary mb-2">Steps</p>
          <ol className="text-sm text-text-secondary space-y-1 list-decimal list-inside">
            <li>Bring water to rolling boil</li>
            <li>Gently place egg in water</li>
            <li>Boil for {timing} minutes</li>
            <li>Transfer to ice bath immediately</li>
            <li>Rest for {restTime} minutes</li>
            <li>Peel and serve</li>
          </ol>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-surface rounded-[var(--radius-input)] p-4">
          <p className="text-sm font-medium text-text-primary mb-1">Soft Boiled</p>
          <p className="text-sm text-text-secondary">Runny, jammy yolk. Good for dipping soldiers or toast.</p>
        </div>

        <div className="bg-surface rounded-[var(--radius-input)] p-4">
          <p className="text-sm font-medium text-text-primary mb-1">Medium Boiled</p>
          <p className="text-sm text-text-secondary">Creamy, jammy yolk with set whites. Perfect for salads.</p>
        </div>

        <div className="bg-surface rounded-[var(--radius-input)] p-4">
          <p className="text-sm font-medium text-text-primary mb-1">Hard Boiled</p>
          <p className="text-sm text-text-secondary">Fully set yolk. Great for packed lunches and devilled eggs.</p>
        </div>
      </div>
    </div>
  );
}
