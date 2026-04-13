'use client';

import { useState } from 'react';

export default function BakingConversionCalculator() {
  const [ingredient, setIngredient] = useState('flour');
  const [inputAmount, setInputAmount] = useState(1);
  const [inputUnit, setInputUnit] = useState('cups');

  const ingredients = {
    flour: { cup: 120, tbsp: 7.5, oz: 4.25, g: 120 },
    sugar: { cup: 200, tbsp: 12.5, oz: 7, g: 200 },
    butter: { cup: 227, tbsp: 14.2, oz: 8, g: 227 },
    cocoa: { cup: 86, tbsp: 5.4, oz: 3, g: 86 },
    oats: { cup: 80, tbsp: 5, oz: 2.8, g: 80 },
    'baking powder': { tsp: 5, tbsp: 15, g: 5 },
    'baking soda': { tsp: 5, tbsp: 15, g: 5 },
    honey: { cup: 340, tbsp: 21.3, oz: 12, g: 340 },
    'milk': { cup: 240, tbsp: 15, oz: 8.5, g: 240 },
  };

  const ingData = ingredients[ingredient];
  const conversionFactors = {
    cups: { tbsp: 16, oz: ingData?.oz ? ingData.oz : 8, g: ingData?.g ? ingData.g : 120 },
    tbsp: { cups: 0.0625, oz: ingData?.oz ? ingData.oz / 16 : 0.5, g: ingData?.g ? ingData.g / 16 : 7.5 },
    oz: { cups: 1 / (ingData?.oz || 8), tbsp: 2, g: 28.35 },
    g: { cups: 1 / (ingData?.g || 120), tbsp: 1 / (ingData?.g || 120) * 16, oz: 1 / 28.35 },
    tsp: { tbsp: 0.333, g: 5 },
  };

  const getConversions = () => {
    const result = {};
    if (inputUnit === 'cups') {
      result.tbsp = inputAmount * 16;
      result.oz = inputAmount * (ingData?.oz || 8);
      result.g = inputAmount * (ingData?.g || 120);
    } else if (inputUnit === 'tbsp') {
      result.cups = inputAmount / 16;
      result.oz = inputAmount / 16 * (ingData?.oz || 8);
      result.g = inputAmount / 16 * (ingData?.g || 120);
    } else if (inputUnit === 'oz') {
      result.cups = inputAmount / (ingData?.oz || 8);
      result.tbsp = (inputAmount / (ingData?.oz || 8)) * 16;
      result.g = inputAmount * 28.35;
    } else if (inputUnit === 'g') {
      result.cups = inputAmount / (ingData?.g || 120);
      result.tbsp = (inputAmount / (ingData?.g || 120)) * 16;
      result.oz = inputAmount / 28.35;
    } else if (inputUnit === 'tsp') {
      result.tbsp = inputAmount / 3;
      result.g = inputAmount * 5;
    }
    return result;
  };

  const conversions = getConversions();

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Ingredient
          </label>
          <select
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            {Object.keys(ingredients).map((ing) => (
              <option key={ing} value={ing}>
                {ing.charAt(0).toUpperCase() + ing.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Amount
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={inputAmount}
            onChange={(e) => setInputAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Unit
          </label>
          <select
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="cups">Cups</option>
            <option value="tbsp">Tablespoons</option>
            <option value="tsp">Teaspoons</option>
            <option value="oz">Ounces</option>
            <option value="g">Grams</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Conversions
        </h3>

        <div className="space-y-2">
          {Object.entries(conversions).map(([unit, value]) => (
            <div key={unit} className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
              <span className="text-text-primary capitalize">{unit === 'tbsp' ? 'Tablespoons' : unit === 'oz' ? 'Ounces' : unit}</span>
              <span className="font-mono font-bold text-accent">
                {value.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm text-text-secondary bg-blue-50 rounded-[var(--radius-input)] p-3 mt-3">
          Conversions are weight-based and vary by ingredient density. For best results, use a kitchen scale.
        </p>
      </div>
    </div>
  );
}
