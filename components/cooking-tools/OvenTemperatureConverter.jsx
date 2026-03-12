'use client';

import { useState, useMemo } from 'react';

// Reference table for common cooking temperatures
const REFERENCE_TEMPS = [
  { name: 'Very cool', celsius: 110, fahrenheit: 225, gasMark: '¼' },
  { name: 'Cool', celsius: 140, fahrenheit: 275, gasMark: '1' },
  { name: 'Moderate', celsius: 160, fahrenheit: 325, gasMark: '3' },
  { name: 'Moderately hot', celsius: 190, fahrenheit: 375, gasMark: '5' },
  { name: 'Hot', celsius: 200, fahrenheit: 400, gasMark: '6' },
  { name: 'Very hot', celsius: 220, fahrenheit: 425, gasMark: '7' },
  { name: 'Extremely hot', celsius: 240, fahrenheit: 475, gasMark: '9' },
];

// Function to convert Celsius to Fahrenheit
const celsiusToFahrenheit = (c) => (c * 9) / 5 + 32;

// Function to convert Fahrenheit to Celsius
const fahrenheitToCelsius = (f) => ((f - 32) * 5) / 9;

// Function to convert Celsius to Gas Mark (approximate)
const celsiusToGasMark = (c) => {
  const gasMark = (c - 121) / 14;
  return Math.round(gasMark * 2) / 2; // Round to nearest 0.5
};

// Function to convert Gas Mark to Celsius (reverse lookup)
const gasMarkToCelsius = (g) => g * 14 + 121;

// Function to get Gas Mark display string with fractions
const formatGasMark = (value) => {
  if (value % 1 === 0) {
    return `${Math.round(value)}`;
  } else if (value % 1 === 0.5) {
    return `${Math.floor(value)}½`;
  }
  return `${Math.round(value)}`;
};

export default function OvenTemperatureConverter() {
  const [inputValue, setInputValue] = useState('180');
  const [inputUnit, setInputUnit] = useState('celsius');

  // Calculate conversions based on input
  const conversions = useMemo(() => {
    const value = parseFloat(inputValue) || 0;

    let celsius, fahrenheit, gasMark, fanOven;

    if (inputUnit === 'celsius') {
      celsius = value;
    } else if (inputUnit === 'fahrenheit') {
      celsius = fahrenheitToCelsius(value);
    } else if (inputUnit === 'gasmark') {
      celsius = gasMarkToCelsius(value);
    } else if (inputUnit === 'fan') {
      celsius = value + 20; // Fan oven is 20°C lower
    }

    fahrenheit = celsiusToFahrenheit(celsius);
    gasMark = celsiusToGasMark(celsius);
    fanOven = celsius - 20;

    return {
      celsius: Math.round(celsius),
      fahrenheit: Math.round(fahrenheit),
      gasMark,
      fanOven: Math.round(fanOven),
    };
  }, [inputValue, inputUnit]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUnitChange = (e) => {
    setInputUnit(e.target.value);
  };

  return (
    <div className="space-y-3">
      {/* Input Section */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Temperature
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter temperature"
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary font-mono-num focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Unit
              </label>
              <select
                value={inputUnit}
                onChange={handleUnitChange}
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="gasmark">Gas Mark</option>
                <option value="fan">Fan Oven (°C)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Celsius Card */}
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <div className="text-text-secondary text-sm font-medium mb-1">Celsius</div>
          <div className="font-mono-num text-3xl font-bold text-text-primary">
            {conversions.celsius}
          </div>
          <div className="text-text-muted text-xs mt-2">°C</div>
        </div>

        {/* Fahrenheit Card */}
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <div className="text-text-secondary text-sm font-medium mb-1">Fahrenheit</div>
          <div className="font-mono-num text-3xl font-bold text-text-primary">
            {conversions.fahrenheit}
          </div>
          <div className="text-text-muted text-xs mt-2">°F</div>
        </div>

        {/* Gas Mark Card */}
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <div className="text-text-secondary text-sm font-medium mb-1">Gas Mark</div>
          <div className="font-mono-num text-3xl font-bold text-text-primary">
            {formatGasMark(conversions.gasMark)}
          </div>
          <div className="text-text-muted text-xs mt-2">Mark</div>
        </div>

        {/* Fan Oven Card */}
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <div className="text-text-secondary text-sm font-medium mb-1">Fan Oven</div>
          <div className="font-mono-num text-3xl font-bold text-text-primary">
            {conversions.fanOven}
          </div>
          <div className="text-text-muted text-xs mt-2">°C</div>
        </div>
      </div>

      {/* Reference Table */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="text-text-primary font-bold text-lg mb-4">Common Cooking Temperatures</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-text-secondary font-medium py-3 px-2">
                  Temperature Level
                </th>
                <th className="text-left text-text-secondary font-medium py-3 px-2">
                  Celsius
                </th>
                <th className="text-left text-text-secondary font-medium py-3 px-2">
                  Fahrenheit
                </th>
                <th className="text-left text-text-secondary font-medium py-3 px-2">
                  Gas Mark
                </th>
              </tr>
            </thead>
            <tbody>
              {REFERENCE_TEMPS.map((temp, index) => (
                <tr
                  key={index}
                  className="border-b border-border hover:bg-white transition-colors"
                >
                  <td className="py-3 px-2 text-text-primary">{temp.name}</td>
                  <td className="py-3 px-2 font-mono-num text-text-primary">
                    {temp.celsius}°C
                  </td>
                  <td className="py-3 px-2 font-mono-num text-text-primary">
                    {temp.fahrenheit}°F
                  </td>
                  <td className="py-3 px-2 font-mono-num text-text-primary">
                    {temp.gasMark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
        <p className="text-text-secondary text-sm leading-relaxed">
          <span className="font-medium text-text-primary">Note:</span> Fan ovens are typically 20°C
          cooler than conventional ovens, so recipes may cook faster. Gas marks are calculated
          using the approximate formula and may vary slightly between different ovens.
        </p>
      </div>
    </div>
  );
}
