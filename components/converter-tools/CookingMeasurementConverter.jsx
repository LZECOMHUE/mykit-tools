'use client';
import { useState, useMemo } from 'react';

const CONVERSIONS = {
  volumetric: {
    'tsp': 1,
    'tbsp': 3,
    'fl oz': 6,
    'cup': 48,
    'ml': 4.92892,
    'l': 236.588,
  },
  weight: {
    'g': 1,
    'oz': 28.3495,
    'lb': 453.592,
  },
};

const INGREDIENT_DENSITY = {
  flour: { cup: 120, tbsp: 8, tsp: 2.6 },
  sugar: { cup: 200, tbsp: 12.5, tsp: 4.2 },
  butter: { cup: 226, tbsp: 14, tsp: 4.7 },
  milk: { cup: 240, tbsp: 15, tsp: 5 },
  water: { cup: 240, tbsp: 15, tsp: 5 },
  honey: { cup: 340, tbsp: 21, tsp: 7 },
  oil: { cup: 218, tbsp: 13.6, tsp: 4.5 },
};

export default function CookingMeasurementConverter() {
  const [inputValue, setInputValue] = useState('1');
  const [inputUnit, setInputUnit] = useState('cup');
  const [ingredient, setIngredient] = useState('flour');
  const [measurementType, setMeasurementType] = useState('volume');

  const volumeUnits = ['tsp', 'tbsp', 'fl oz', 'cup', 'ml', 'l'];
  const weightUnits = ['g', 'oz', 'lb'];
  const units = measurementType === 'volume' ? volumeUnits : weightUnits;

  const conversions = useMemo(() => {
    const input = parseFloat(inputValue) || 0;
    const conversionTable = measurementType === 'volume' ? CONVERSIONS.volumetric : CONVERSIONS.weight;
    const baseUnit = measurementType === 'volume' ? 'tsp' : 'g';
    const baseValue = input * conversionTable[inputUnit];

    const results = {};
    Object.keys(conversionTable).forEach((unit) => {
      const converted = baseValue / conversionTable[unit];
      results[unit] = converted < 100 ? converted.toFixed(2) : converted.toFixed(1);
    });

    return results;
  }, [inputValue, inputUnit, measurementType]);

  const ingredientWeight = useMemo(() => {
    if (measurementType !== 'volume') return null;

    const cup = INGREDIENT_DENSITY[ingredient]?.cup || 240;
    const input = parseFloat(inputValue) || 0;
    const cupFraction = input / (inputUnit === 'cup' ? 1 : (CONVERSIONS.volumetric[inputUnit] / CONVERSIONS.volumetric['cup']));
    const grams = cupFraction * cup;

    return {
      grams: grams.toFixed(1),
      oz: (grams / 28.3495).toFixed(1),
      lb: (grams / 453.592).toFixed(2),
    };
  }, [inputValue, inputUnit, ingredient, measurementType]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.toString().catch(() => {}));
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-surface rounded-lg border border-border">
      <div className="space-y-4">
        {/* Measurement Type */}
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase mb-2">Measurement Type</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMeasurementType('volume');
                setInputUnit('cup');
              }}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                measurementType === 'volume'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:border-accent'
              }`}
            >
              Volume
            </button>
            <button
              onClick={() => {
                setMeasurementType('weight');
                setInputUnit('g');
              }}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                measurementType === 'weight'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:border-accent'
              }`}
            >
              Weight
            </button>
          </div>
        </div>

        {/* Ingredient Select (Volume Only) */}
        {measurementType === 'volume' && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Ingredient (for weight conversion)
            </label>
            <select
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 text-text-primary bg-white"
            >
              {Object.keys(INGREDIENT_DENSITY).map((ing) => (
                <option key={ing} value={ing}>
                  {ing.charAt(0).toUpperCase() + ing.slice(1)}
                </option>
              ))}
            </select>
            <p className="text-xs text-text-muted mt-1">Density varies by ingredient. Select for accurate weight.</p>
          </div>
        )}

        {/* Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">Enter Value</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="1"
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
            />
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white min-w-28"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ingredient Weight Info */}
        {ingredientWeight && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-900 font-medium mb-2">
              {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)} Weight
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-white rounded border border-blue-200">
                <p className="text-xs text-blue-900 mb-1">Grams</p>
                <p className="font-mono font-bold text-blue-900">{ingredientWeight.grams}g</p>
              </div>
              <div className="p-2 bg-white rounded border border-blue-200">
                <p className="text-xs text-blue-900 mb-1">Ounces</p>
                <p className="font-mono font-bold text-blue-900">{ingredientWeight.oz}oz</p>
              </div>
              <div className="p-2 bg-white rounded border border-blue-200">
                <p className="text-xs text-blue-900 mb-1">Pounds</p>
                <p className="font-mono font-bold text-blue-900">{ingredientWeight.lb}lb</p>
              </div>
            </div>
          </div>
        )}

        {/* Conversions Grid */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary uppercase">All Conversions</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {units.map((unit) => (
              <div key={unit} className="p-3 bg-white border border-border rounded-lg">
                <p className="text-xs text-text-secondary mb-1">{unit}</p>
                <div className="flex items-center gap-2">
                  <p className="flex-1 font-mono font-bold text-text-primary">
                    {conversions[unit]}
                  </p>
                  <button
                    onClick={() => copyToClipboard(`${conversions[unit]} ${unit}`)}
                    className="p-1 text-accent hover:text-blue-600 transition-colors"
                  >
                    <span className="text-xs">📋</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Conversions */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs font-medium text-green-900 mb-2">Common Kitchen Conversions</p>
          <ul className="text-xs text-green-900 space-y-1 font-mono">
            <li>3 tsp = 1 tbsp</li>
            <li>16 tbsp = 1 cup (237 ml)</li>
            <li>1 cup = 8 fl oz</li>
            <li>1 tbsp = 15 ml</li>
            <li>1 tsp = 5 ml</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
