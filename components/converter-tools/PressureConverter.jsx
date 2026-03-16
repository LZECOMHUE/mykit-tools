'use client';
import { useState, useMemo } from 'react';

const CONVERSIONS = {
  'PSI': 1,
  'bar': 0.0689476,
  'atm': 0.0680460,
  'Pa': 6894.76,
  'kPa': 6.89476,
  'mmHg': 51.7149,
};

const REFERENCE_PRESSURES = [
  { value: 0, label: 'Vacuum' },
  { value: 14.7, label: 'Atmospheric (sea level)' },
  { value: 30, label: 'Tyre pressure (car)' },
  { value: 32, label: 'Tyre pressure (bicycle)' },
  { value: 50, label: 'Compressed air system' },
  { value: 120, label: 'Blood pressure (systolic, high)' },
];

export default function PressureConverter() {
  const [inputValue, setInputValue] = useState('14.7');
  const [inputUnit, setInputUnit] = useState('PSI');

  const conversions = useMemo(() => {
    const input = parseFloat(inputValue) || 0;
    const baseValue = input / CONVERSIONS[inputUnit];

    const results = {};
    Object.keys(CONVERSIONS).forEach((unit) => {
      const converted = baseValue * CONVERSIONS[unit];
      results[unit] = converted < 1000 ? converted.toFixed(2) : converted.toFixed(1);
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
          <label className="block text-sm font-medium text-text-primary">Enter Pressure</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="14.7"
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
            />
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white min-w-32"
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

        {/* Reference Pressures */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary uppercase">Common Pressures</p>
          <div className="p-4 bg-white border border-border rounded-lg space-y-2">
            {REFERENCE_PRESSURES.map((ref, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <p className="text-sm text-text-secondary">{ref.label}</p>
                <div className="flex gap-3">
                  <p className="font-mono font-medium text-text-primary min-w-20 text-right">
                    {ref.value} PSI
                  </p>
                  <p className="font-mono font-medium text-text-secondary min-w-16 text-right">
                    {(ref.value / 14.504).toFixed(2)} bar
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pressure Gauge Visual */}
        <div className="p-4 bg-white border border-border rounded-lg">
          <p className="text-xs text-text-secondary mb-3">Pressure Gauge</p>
          <div className="relative h-8 bg-gradient-to-r from-green-400 via-yellow-300 to-red-400 rounded-full border-2 border-text-secondary overflow-hidden">
            <div
              className="absolute h-full w-1 bg-black rounded-full transition-all"
              style={{
                left: `${Math.min(100, Math.max(0, (parseFloat(inputValue) || 0) / 50 * 100))}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-muted mt-2">
            <span>Low</span>
            <span>Normal</span>
            <span>High</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900 mb-2 font-medium">Pressure Units</p>
          <ul className="text-xs text-blue-900 space-y-1">
            <li>PSI: pounds per square inch (common in US/UK)</li>
            <li>bar: SI unit, used in engineering and automotive</li>
            <li>atm: atmospheric pressure at sea level (reference standard)</li>
            <li>Pa/kPa: pascals, SI scientific unit</li>
            <li>mmHg: millimetres of mercury (medical, barometers)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
