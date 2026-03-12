'use client';

import { useState, useMemo } from 'react';

// Conversion factors to base units (ml for volume, grams for weight)
const VOLUME_CONVERSIONS = {
  ml: 1,
  l: 1000,
  cup: 236.588,
  tbsp: 14.787,
  tsp: 4.929,
  'fl oz': 29.574,
  'US pt': 473.176,
  'UK pt': 568.261,
  quart: 946.353,
  'US gal': 3785.41,
  'UK gal': 4546.09,
};

const WEIGHT_CONVERSIONS = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
};

const TEMPERATURE_CONVERSIONS = {
  c: 'celsius',
  f: 'fahrenheit',
  gm: 'gas-mark',
  fan: 'fan-oven',
};

// Ingredient density mapping (volume to weight)
const INGREDIENT_DENSITIES = {
  'all-purpose flour': { density: 125 / 236.588, label: 'All-purpose Flour' },
  'bread flour': { density: 130 / 236.588, label: 'Bread Flour' },
  'sugar (granulated)': { density: 200 / 236.588, label: 'Sugar (Granulated)' },
  'sugar (brown)': { density: 220 / 236.588, label: 'Sugar (Brown, Packed)' },
  'sugar (powdered)': { density: 120 / 236.588, label: 'Sugar (Powdered/Icing)' },
  butter: { density: 227 / 236.588, label: 'Butter' },
  milk: { density: 245 / 236.588, label: 'Milk' },
  water: { density: 237 / 236.588, label: 'Water' },
  honey: { density: 340 / 236.588, label: 'Honey' },
  'cocoa powder': { density: 85 / 236.588, label: 'Cocoa Powder' },
  'rice (uncooked)': { density: 185 / 236.588, label: 'Rice (Uncooked)' },
  oats: { density: 90 / 236.588, label: 'Oats' },
  'oil (vegetable)': { density: 218 / 236.588, label: 'Oil (Vegetable)' },
  'cream cheese': { density: 232 / 236.588, label: 'Cream Cheese' },
  'sour cream': { density: 230 / 236.588, label: 'Sour Cream' },
};

const QUICK_REFERENCE = [
  { from: '1 cup', to: '237ml = 16 tbsp' },
  { from: '1 tbsp', to: '15ml = 3 tsp' },
  { from: '1 tsp', to: '5ml' },
  { from: '1 fl oz', to: '30ml' },
  { from: '1 US pint', to: '473ml' },
  { from: '1 UK pint', to: '568ml' },
  { from: '1 stick butter', to: '113g = ½ cup = 8 tbsp' },
];

const GAS_MARK_TEMPS = [
  { gas: 1, celsius: 140, fahrenheit: 275 },
  { gas: 2, celsius: 150, fahrenheit: 300 },
  { gas: 3, celsius: 160, fahrenheit: 325 },
  { gas: 4, celsius: 180, fahrenheit: 350 },
  { gas: 5, celsius: 190, fahrenheit: 375 },
  { gas: 6, celsius: 200, fahrenheit: 400 },
  { gas: 7, celsius: 220, fahrenheit: 425 },
  { gas: 8, celsius: 230, fahrenheit: 450 },
  { gas: 9, celsius: 240, fahrenheit: 475 },
];

export default function RecipeUnitConverter() {
  const [category, setCategory] = useState('volume');
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('cup');
  const [toUnit, setToUnit] = useState('ml');
  const [useIngredientMode, setUseIngredientMode] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState('butter');
  const [copied, setCopied] = useState(false);

  // Get units for current category
  const getUnitsForCategory = () => {
    if (category === 'volume') {
      return Object.keys(VOLUME_CONVERSIONS);
    }
    if (category === 'weight') {
      return Object.keys(WEIGHT_CONVERSIONS);
    }
    return ['c', 'f', 'gm', 'fan'];
  };

  const units = getUnitsForCategory();

  // Reset units when category changes
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    const newUnits = newCategory === 'volume'
      ? Object.keys(VOLUME_CONVERSIONS)
      : newCategory === 'weight'
      ? Object.keys(WEIGHT_CONVERSIONS)
      : ['c', 'f', 'gm', 'fan'];
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1] || newUnits[0]);
  };

  // Convert temperature
  const convertTemperature = (val, from, to) => {
    let celsius = from === 'c' ? val : null;

    if (from === 'f' && celsius === null) {
      celsius = (val - 32) * (5 / 9);
    } else if (from === 'gm' && celsius === null) {
      const gasData = GAS_MARK_TEMPS.find((g) => g.gas === val);
      celsius = gasData ? gasData.celsius : null;
    } else if (from === 'fan' && celsius === null) {
      celsius = val + 20;
    }

    if (celsius === null) return '';

    if (to === 'c') return celsius.toFixed(0);
    if (to === 'f') return ((celsius * 9) / 5 + 32).toFixed(0);
    if (to === 'gm') {
      const closest = GAS_MARK_TEMPS.reduce((prev, curr) =>
        Math.abs(curr.celsius - celsius) < Math.abs(prev.celsius - celsius)
          ? curr
          : prev
      );
      return `GM${closest.gas}`;
    }
    if (to === 'fan') return (celsius - 20).toFixed(0);
    return '';
  };

  // Main conversion logic
  const result = useMemo(() => {
    if (!value || isNaN(value)) return '';

    const numValue = parseFloat(value);

    if (category === 'temperature') {
      return convertTemperature(numValue, fromUnit, toUnit);
    }

    if (category === 'volume') {
      const baseValue = numValue * VOLUME_CONVERSIONS[fromUnit];
      const converted = baseValue / VOLUME_CONVERSIONS[toUnit];
      return converted.toFixed(3).replace(/\.?0+$/, '');
    }

    if (category === 'weight') {
      const baseValue = numValue * WEIGHT_CONVERSIONS[fromUnit];
      const converted = baseValue / WEIGHT_CONVERSIONS[toUnit];
      return converted.toFixed(3).replace(/\.?0+$/, '');
    }

    return '';
  }, [value, fromUnit, toUnit, category]);

  // Ingredient-aware conversion
  const ingredientResult = useMemo(() => {
    if (!useIngredientMode || !value || isNaN(value) || !selectedIngredient) {
      return '';
    }

    const numValue = parseFloat(value);
    const ingredient = INGREDIENT_DENSITIES[selectedIngredient];
    if (!ingredient) return '';

    // Volume to weight
    if (category === 'volume' && toUnit && WEIGHT_CONVERSIONS[toUnit]) {
      const volumeInMl = numValue * VOLUME_CONVERSIONS[fromUnit];
      const weightInGrams = volumeInMl * ingredient.density;
      const converted = weightInGrams / WEIGHT_CONVERSIONS[toUnit];
      return converted.toFixed(1);
    }

    // Weight to volume
    if (category === 'weight' && toUnit && VOLUME_CONVERSIONS[toUnit]) {
      const weightInGrams = numValue * WEIGHT_CONVERSIONS[fromUnit];
      const volumeInMl = weightInGrams / ingredient.density;
      const converted = volumeInMl / VOLUME_CONVERSIONS[toUnit];
      return converted.toFixed(2).replace(/\.?0+$/, '');
    }

    return '';
  }, [value, fromUnit, toUnit, useIngredientMode, selectedIngredient, category]);

  // Check if ingredient mode applies
  const canUseIngredientMode =
    (category === 'volume' && toUnit && WEIGHT_CONVERSIONS[toUnit]) ||
    (category === 'weight' && toUnit && VOLUME_CONVERSIONS[toUnit]);

  // Swap units
  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  // Copy result
  const handleCopy = () => {
    const textToCopy = useIngredientMode && ingredientResult
      ? `${ingredientResult} ${toUnit}`
      : `${result} ${toUnit}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDisplayResult = () => {
    if (useIngredientMode && ingredientResult) {
      return ingredientResult;
    }
    return result;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-border">
        {['volume', 'weight', 'temperature'].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-3 font-medium transition-colors ${
              category === cat
                ? 'border-b-2 border-accent text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex gap-3 items-end">
          {/* Value Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              step="0.01"
            />
          </div>

          {/* From Unit */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-2">
              From
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className="p-2 border border-border rounded-[var(--radius-input)] hover:bg-surface-hover transition-colors text-text-primary font-medium"
            title="Swap units"
          >
            ↔
          </button>

          {/* To Unit */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-2">
              To
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Display */}
        {value && (
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-text-secondary text-sm">Result:</p>
              <div className="flex items-baseline gap-2">
                <div className="font-mono-num text-4xl font-bold text-text-primary">
                  {getDisplayResult()}
                </div>
                <span className="text-xl text-text-secondary">{toUnit}</span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="w-full px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:opacity-90 transition-opacity"
            >
              {copied ? '✓ Copied!' : 'Copy Result'}
            </button>
          </div>
        )}
      </div>

      {/* Ingredient Mode Toggle */}
      {canUseIngredientMode && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="ingredient-mode"
              checked={useIngredientMode}
              onChange={(e) => setUseIngredientMode(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor="ingredient-mode"
              className="text-sm font-medium text-text-primary cursor-pointer"
            >
              Ingredient-aware mode (uses ingredient density)
            </label>
          </div>

          {useIngredientMode && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Select ingredient:
              </label>
              <select
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent cursor-pointer"
              >
                {Object.entries(INGREDIENT_DENSITIES).map(([key, data]) => (
                  <option key={key} value={key}>
                    {data.label}
                  </option>
                ))}
              </select>

              {ingredientResult && (
                <p className="mt-3 text-sm text-text-secondary">
                  <span className="font-medium text-text-primary">
                    {value} {fromUnit} of {INGREDIENT_DENSITIES[selectedIngredient].label}
                  </span>
                  {' '} ≈ {' '}
                  <span className="font-mono-num font-bold text-text-primary">
                    {ingredientResult} {toUnit}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Quick Reference Table */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">
          Quick Reference
        </h3>
        <div className="space-y-2">
          {QUICK_REFERENCE.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center pb-2 border-b border-border last:border-0">
              <span className="text-text-secondary">{item.from}</span>
              <span className="font-mono-num font-medium text-text-primary">
                {item.to}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
