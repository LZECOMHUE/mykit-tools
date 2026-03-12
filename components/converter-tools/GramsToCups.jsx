'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

const INGREDIENTS = {
  'all-purpose-flour': { name: 'All-purpose flour', density: 125 },
  'bread-flour': { name: 'Bread flour', density: 130 },
  'cake-flour': { name: 'Cake flour', density: 114 },
  'granulated-sugar': { name: 'Granulated sugar', density: 200 },
  'brown-sugar-packed': { name: 'Brown sugar (packed)', density: 220 },
  'powdered-sugar': { name: 'Powdered sugar', density: 120 },
  'butter': { name: 'Butter', density: 227 },
  'milk': { name: 'Milk', density: 244 },
  'water': { name: 'Water', density: 236 },
  'honey': { name: 'Honey', density: 340 },
  'oats-rolled': { name: 'Oats (rolled)', density: 90 },
  'rice-uncooked': { name: 'Rice (uncooked)', density: 185 },
  'cocoa-powder': { name: 'Cocoa powder', density: 86 },
  'cream-cheese': { name: 'Cream cheese', density: 232 },
  'peanut-butter': { name: 'Peanut butter', density: 258 },
};

const COMMON_GRAMS = [50, 100, 150, 200, 250, 300, 500];

function toFraction(decimal) {
  if (decimal < 0.0625) return '0';
  const whole = Math.floor(decimal);
  const remainder = decimal - whole;
  const fractions = [
    [1/8, '⅛'], [1/4, '¼'], [1/3, '⅓'], [3/8, '⅜'], [1/2, '½'],
    [5/8, '⅝'], [2/3, '⅔'], [3/4, '¾'], [7/8, '⅞'], [1, '']
  ];
  let closest = fractions[0];
  let minDiff = Math.abs(remainder - fractions[0][0]);
  for (const f of fractions) {
    const diff = Math.abs(remainder - f[0]);
    if (diff < minDiff) { minDiff = diff; closest = f; }
  }
  if (closest[0] === 1) return `${whole + 1}`;
  if (remainder < 0.0625) return `${whole}`;
  return whole > 0 ? `${whole} ${closest[1]}` : closest[1];
}

export default function GramsToCups() {
  const [grams, setGrams] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('all-purpose-flour');

  const currentIngredient = INGREDIENTS[selectedIngredient];

  const cupsDecimal = useMemo(() => {
    const g = parseFloat(grams);
    if (isNaN(g) || g < 0) return null;
    return g / currentIngredient.density;
  }, [grams, currentIngredient.density]);

  const cupsFraction = useMemo(() => {
    if (cupsDecimal === null) return null;
    return toFraction(cupsDecimal);
  }, [cupsDecimal]);

  const quickRefTable = useMemo(() => {
    return COMMON_GRAMS.map((g) => ({
      grams: g,
      cupsDecimal: g / currentIngredient.density,
      cupsFraction: toFraction(g / currentIngredient.density),
    }));
  }, [currentIngredient.density]);

  const handleReset = () => {
    setGrams('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {/* Converter Card */}
      <div className="rounded-lg border border-border bg-surface p-6 md:p-8">
        <div className="space-y-3">
          {/* Ingredient Selector */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Ingredient
            </label>
            <select
              value={selectedIngredient}
              onChange={(e) => setSelectedIngredient(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              {Object.entries(INGREDIENTS).map(([key, { name }]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Input */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Grams
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              placeholder="Enter amount in grams"
              className="w-full px-4 py-3 border border-border rounded-lg bg-white text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Output */}
          {cupsDecimal !== null && (
            <div className="bg-accent bg-opacity-5 rounded-lg p-4 md:p-6 border border-accent border-opacity-20">
              <p className="text-text-muted text-sm font-medium mb-1">Result</p>
              <div className="flex items-baseline gap-3">
                <div className="font-mono-num text-4xl font-semibold text-text-primary">
                  {cupsFraction}
                </div>
                <span className="text-lg text-text-secondary">cups</span>
              </div>
              <p className="text-xs text-text-muted mt-2 font-mono-num">
                ≈ {cupsDecimal.toFixed(3)} cups
              </p>
            </div>
          )}

          {/* Formula */}
          <div className="bg-surface border border-border rounded-lg p-4 text-sm text-text-secondary space-y-1">
            <p className="font-medium text-text-primary">Formula</p>
            <p className="font-mono-num">
              cups = grams ÷ {currentIngredient.density}g
            </p>
            <p className="text-xs text-text-muted">
              ({currentIngredient.name}: {currentIngredient.density}g per cup)
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-3 border border-border rounded-lg font-medium text-text-primary hover:bg-surface-hover transition-colors"
            >
              Clear
            </button>
            <Link
              href="/cups-to-grams"
              className="flex-1 px-4 py-3 rounded-lg font-medium bg-accent text-white hover:bg-accent-hover transition-colors text-center"
            >
              Reverse (Cups to Grams)
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Reference Table */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-3">
            Quick Reference — {currentIngredient.name}
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-3 text-left font-semibold text-text-primary">Grams</th>
                  <th className="px-4 py-3 text-right font-semibold text-text-primary">Cups</th>
                  <th className="px-4 py-3 text-right font-semibold text-text-primary">Decimal</th>
                </tr>
              </thead>
              <tbody>
                {quickRefTable.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-surface-hover transition-colors"
                  >
                    <td className="px-4 py-3 text-text-primary font-mono-num">
                      {row.grams}g
                    </td>
                    <td className="px-4 py-3 text-right text-text-primary font-mono-num">
                      {row.cupsFraction}
                    </td>
                    <td className="px-4 py-3 text-right text-text-secondary font-mono-num text-xs">
                      {row.cupsDecimal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-text-muted">
          Note: Cup measurements vary by ingredient density. Always use a kitchen scale for precise baking results.
        </p>
      </div>
    </div>
  );
}
