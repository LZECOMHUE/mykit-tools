'use client';

import { useState } from 'react';

export default function PizzaDoughCalculator() {
  const [numPizzas, setNumPizzas] = useState(2);
  const [pizzaSize, setPizzaSize] = useState('12');
  const [thickness, setThickness] = useState('regular');

  const sizeGrams = { '10': 200, '12': 280, '14': 380 };
  const thicknessMultiplier = { thin: 0.8, regular: 1, thick: 1.3 };

  const doughPerPizza = sizeGrams[pizzaSize] * thicknessMultiplier[thickness];
  const totalFlour = numPizzas * doughPerPizza * 0.65;
  const totalWater = numPizzas * doughPerPizza * 0.30;
  const totalSalt = (totalFlour * 0.02);
  const totalYeast = (totalFlour * 0.002);
  const totalOliveOil = (totalFlour * 0.05);

  const hydration = ((totalWater / totalFlour) * 100).toFixed(1);

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Number of Pizzas
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={numPizzas}
            onChange={(e) => setNumPizzas(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Pizza Size
          </label>
          <select
            value={pizzaSize}
            onChange={(e) => setPizzaSize(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="10">10 inches</option>
            <option value="12">12 inches</option>
            <option value="14">14 inches</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Thickness
          </label>
          <select
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="thin">Thin Crust</option>
            <option value="regular">Regular</option>
            <option value="thick">Thick Crust</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Ingredients
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Flour (Type 00)</span>
            <span className="font-mono font-bold text-accent">
              {totalFlour.toLocaleString('en-GB', { maximumFractionDigits: 0 })}g
            </span>
          </div>

          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Water</span>
            <span className="font-mono font-bold text-accent">
              {totalWater.toLocaleString('en-GB', { maximumFractionDigits: 0 })}g
            </span>
          </div>

          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Salt</span>
            <span className="font-mono font-bold text-accent">
              {totalSalt.toLocaleString('en-GB', { maximumFractionDigits: 1 })}g
            </span>
          </div>

          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Instant Yeast</span>
            <span className="font-mono font-bold text-accent">
              {totalYeast.toLocaleString('en-GB', { maximumFractionDigits: 1 })}g
            </span>
          </div>

          <div className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
            <span className="text-text-primary">Extra Virgin Olive Oil</span>
            <span className="font-mono font-bold text-accent">
              {totalOliveOil.toLocaleString('en-GB', { maximumFractionDigits: 1 })}g
            </span>
          </div>
        </div>

        <p className="text-sm text-text-secondary bg-blue-50 rounded-[var(--radius-input)] p-3">
          Hydration: {hydration}% (water as % of flour)
        </p>
      </div>
    </div>
  );
}
