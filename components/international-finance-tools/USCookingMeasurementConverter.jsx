'use client';

import { useState, useMemo } from 'react';

const conversions = {
  cups: {
    ml: 236.588,
    tbsp: 16,
    fl_oz: 8,
    sticks: 0.5, // 1 stick = 2 cups
    grams: 236.588, // varies by ingredient, using water as default
  },
  tbsp: {
    ml: 14.7868,
    cups: 0.0625,
    fl_oz: 0.5,
    sticks: 0.03125,
    grams: 14.7868,
  },
  fl_oz: {
    ml: 29.5735,
    cups: 0.125,
    tbsp: 2,
    sticks: 0.0625,
    grams: 29.5735,
  },
  sticks: {
    grams: 113.4, // standard butter stick
    cups: 2,
    tbsp: 32,
    ml: 226.8,
    fl_oz: 8,
  },
  grams: {
    sticks: 0.008818,
    cups: 0.00422,
    tbsp: 0.0676,
    ml: 1,
    fl_oz: 0.0338,
  },
  ml: {
    grams: 1,
    cups: 0.00423,
    tbsp: 0.0676,
    fl_oz: 0.0338,
    sticks: 0.0044,
  },
};

const unitLabels = {
  cups: 'Cups',
  tbsp: 'Tablespoons',
  fl_oz: 'Fluid Ounces',
  sticks: 'Sticks of Butter',
  grams: 'Grams',
  ml: 'Millilitres',
};

export default function USCookingMeasurementConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('cups');
  const [toUnit, setToUnit] = useState('ml');

  const result = useMemo(() => {
    if (!value || isNaN(value)) return null;
    const numValue = parseFloat(value);
    if (fromUnit === toUnit) return numValue;
    const conversionFactor = conversions[fromUnit][toUnit];
    return numValue * conversionFactor;
  }, [value, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const commonValues = {
    cups: [0.25, 0.5, 1, 2],
    tbsp: [1, 2, 4, 8],
    fl_oz: [1, 2, 4, 8],
    sticks: [0.5, 1, 2, 4],
    grams: [50, 100, 200, 500],
    ml: [50, 100, 250, 500],
  };

  return (
    <div className="bg-surface rounded-lg p-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* From Unit */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            From
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:border-accent mb-4"
          >
            {Object.entries(unitLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
          {commonValues[fromUnit] && (
            <div className="mt-3 flex flex-wrap gap-2">
              {commonValues[fromUnit].map((v) => (
                <button
                  key={v}
                  onClick={() => setValue(v.toString())}
                  className="px-3 py-1 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20"
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex items-end justify-center md:justify-start mb-4">
          <button
            onClick={handleSwap}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 font-medium"
          >
            ⇄ Swap
          </button>
        </div>

        {/* To Unit */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            To
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white text-text-primary focus:outline-none focus:border-accent mb-4"
          >
            {Object.entries(unitLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {result !== null && (
            <div className="bg-white border border-border rounded-lg p-4">
              <div className="text-sm text-text-secondary">Result</div>
              <div className="text-3xl font-mono font-bold text-accent">
                {result.toFixed(2)}
              </div>
              <div className="text-sm text-text-muted mt-1">
                {unitLabels[toUnit]}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="font-semibold text-text-primary mb-4">
          Quick Reference - US Cooking Conversions
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded border border-border">
            <div className="text-text-secondary">1 Cup</div>
            <div className="font-mono font-bold text-text-primary">
              = 236.6 ml
            </div>
            <div className="font-mono font-bold text-text-primary">
              = 16 tbsp
            </div>
          </div>
          <div className="bg-white p-3 rounded border border-border">
            <div className="text-text-secondary">1 Stick Butter</div>
            <div className="font-mono font-bold text-text-primary">
              = 113g
            </div>
            <div className="font-mono font-bold text-text-primary">
              = 8 fl oz
            </div>
          </div>
          <div className="bg-white p-3 rounded border border-border">
            <div className="text-text-secondary">1 Tablespoon</div>
            <div className="font-mono font-bold text-text-primary">
              = 14.8 ml
            </div>
            <div className="font-mono font-bold text-text-primary">
              = 3 tsp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
