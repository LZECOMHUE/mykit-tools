'use client';
import { useState, useMemo } from 'react';

const CONVERSIONS = {
  'J': 1,
  'cal': 0.239006,
  'kcal': 0.000239006,
  'kWh': 2.77778e-7,
  'BTU': 0.000947817,
  'eV': 6.242e18,
};

const REFERENCE_ENERGIES = [
  { value: 4184, unit: 'J', label: 'Energy in 1 food calorie (kcal)' },
  { value: 8.4e6, unit: 'J', label: 'Energy in 1 kWh' },
  { value: 1055, unit: 'J', label: 'Energy in 1 BTU' },
  { value: 7.5e6, unit: 'J', label: 'Daily diet (2000 kcal)' },
  { value: 2.26e6, unit: 'J', label: 'Energy to boil 1L of water' },
  { value: 3.6e6, unit: 'J', label: 'Kinetic energy of 1-tonne car at 100 km/h' },
  { value: 4.184e9, unit: 'J', label: 'Energy in 1 ton of TNT' },
];

export default function EnergyConverter() {
  const [inputValue, setInputValue] = useState('4184');
  const [inputUnit, setInputUnit] = useState('J');

  const conversions = useMemo(() => {
    const input = parseFloat(inputValue) || 0;
    const baseValue = input / CONVERSIONS[inputUnit];

    const results = {};
    Object.keys(CONVERSIONS).forEach((unit) => {
      const converted = baseValue * CONVERSIONS[unit];
      if (converted < 0.001 && converted !== 0) {
        results[unit] = converted.toExponential(2);
      } else if (converted > 1000000) {
        results[unit] = converted.toExponential(2);
      } else {
        results[unit] = converted.toFixed(3);
      }
    });

    return results;
  }, [inputValue, inputUnit]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.toString());
  };

  const units = Object.keys(CONVERSIONS);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-lg border border-border">
      <div className="space-y-6">
        {/* Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">Enter Energy</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="4184"
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

        {/* All Conversions Grid */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary uppercase">All Conversions</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {units.map((unit) => (
              <div key={unit} className="p-3 bg-white border border-border rounded-lg">
                <p className="text-xs text-text-secondary mb-1">{unit}</p>
                <div className="flex items-center gap-2">
                  <p className="flex-1 font-mono text-sm font-bold text-text-primary break-all">
                    {conversions[unit]}
                  </p>
                  <button
                    onClick={() => copyToClipboard(`${conversions[unit]} ${unit}`)}
                    className="p-1 text-accent hover:text-blue-600 transition-colors flex-shrink-0"
                  >
                    <span className="text-xs">📋</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reference Energies */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary uppercase">Common Energy References</p>
          <div className="p-4 bg-white border border-border rounded-lg space-y-3">
            {REFERENCE_ENERGIES.map((ref, idx) => (
              <div key={idx} className="py-2 border-b border-border last:border-0">
                <p className="text-xs text-text-secondary mb-1">{ref.label}</p>
                <p className="font-mono font-medium text-text-primary">
                  {ref.value.toExponential(2)} J
                  {ref.unit !== 'J' && ` = ${(ref.value * CONVERSIONS[ref.unit]).toFixed(2)} ${ref.unit}`}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900 mb-2 font-medium">Energy Units</p>
          <ul className="text-xs text-blue-900 space-y-1">
            <li>J (joule): SI unit of energy</li>
            <li>cal/kcal: calories (food energy, 1 food calorie = 1 kcal)</li>
            <li>kWh: kilowatt-hour (electricity billing)</li>
            <li>BTU: British Thermal Unit (heating/cooling)</li>
            <li>eV: electron volt (particle physics)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
