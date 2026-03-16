'use client';

import { useState } from 'react';

export default function KitchenUnitConverter() {
  const [amount, setAmount] = useState(1);
  const [fromUnit, setFromUnit] = useState('tbsp');
  const [toUnit, setToUnit] = useState('tsp');

  const conversions = {
    tbsp: { tsp: 3, cup: 0.0625, ml: 15 },
    tsp: { tbsp: 0.333, cup: 0.0208, ml: 5 },
    cup: { tbsp: 16, tsp: 48, ml: 240 },
    ml: { tbsp: 0.067, tsp: 0.2, cup: 0.00417 },
  };

  const presets = [
    { from: 'cup', to: 'tbsp', label: '1 cup to tbsp' },
    { from: 'cup', to: 'tsp', label: '1 cup to tsp' },
    { from: 'cup', to: 'ml', label: '1 cup to ml' },
    { from: 'tbsp', to: 'tsp', label: '1 tbsp to tsp' },
    { from: 'tbsp', to: 'ml', label: '1 tbsp to ml' },
  ];

  const convert = (val, from, to) => {
    if (from === to) return val;
    return val * conversions[from][to];
  };

  const result = convert(amount, fromUnit, toUnit);

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Amount
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            From
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="cup">Cup</option>
            <option value="tbsp">Tablespoon</option>
            <option value="tsp">Teaspoon</option>
            <option value="ml">Millilitre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            To
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="cup">Cup</option>
            <option value="tbsp">Tablespoon</option>
            <option value="tsp">Teaspoon</option>
            <option value="ml">Millilitre</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-6">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-sm text-text-secondary mb-1">From</p>
            <p className="text-3xl font-mono font-bold text-text-primary">
              {amount}
            </p>
            <p className="text-sm text-text-secondary mt-1 capitalize">
              {fromUnit === 'tbsp' ? 'tbsp' : fromUnit === 'tsp' ? 'tsp' : fromUnit}
            </p>
          </div>

          <div className="text-2xl text-accent">=</div>

          <div className="text-center">
            <p className="text-sm text-text-secondary mb-1">To</p>
            <p className="text-3xl font-mono font-bold text-accent">
              {result.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-text-secondary mt-1 capitalize">
              {toUnit === 'tbsp' ? 'tbsp' : toUnit === 'tsp' ? 'tsp' : toUnit}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Quick Conversions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setAmount(1);
                setFromUnit(preset.from);
                setToUnit(preset.to);
              }}
              className="px-3 py-2 bg-surface border border-border rounded-[var(--radius-input)] font-medium text-sm text-text-primary hover:bg-blue-100 transition"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
