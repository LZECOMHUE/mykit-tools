'use client';
import { useState, useMemo } from 'react';

const CONVERSIONS = {
  'mph': 1,
  'km/h': 1.60934,
  'knots': 0.868976,
  'm/s': 0.44704,
  'Mach': 0.000748,
};

const REFERENCE_SPEEDS = [
  { value: 1.4, label: 'Walking speed' },
  { value: 6, label: 'Running pace' },
  { value: 20, label: 'Cycling' },
  { value: 50, label: 'Car (city)' },
  { value: 70, label: 'Motorway' },
  { value: 100, label: 'Train (express)' },
  { value: 300, label: 'Aeroplane' },
  { value: 767, label: 'Speed of sound' },
];

export default function SpeedConverter() {
  const [inputValue, setInputValue] = useState('70');
  const [inputUnit, setInputUnit] = useState('mph');

  const conversions = useMemo(() => {
    const input = parseFloat(inputValue) || 0;
    const baseValue = input / CONVERSIONS[inputUnit];

    const results = {};
    Object.keys(CONVERSIONS).forEach((unit) => {
      const converted = baseValue * CONVERSIONS[unit];
      results[unit] = converted.toFixed(2);
    });

    return results;
  }, [inputValue, inputUnit]);

  const nearestReference = useMemo(() => {
    const input = parseFloat(inputValue) || 0;
    const baseValue = input / CONVERSIONS[inputUnit];
    const mph = baseValue * CONVERSIONS['mph'];

    let nearest = REFERENCE_SPEEDS[0];
    let minDiff = Math.abs(mph - nearest.value);

    REFERENCE_SPEEDS.forEach((ref) => {
      const diff = Math.abs(mph - ref.value);
      if (diff < minDiff) {
        minDiff = diff;
        nearest = ref;
      }
    });

    return nearest;
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
          <label className="block text-sm font-medium text-text-primary">Enter Speed</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="70"
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

        {/* Nearest Reference */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-900 font-medium mb-2">Closest Reference Speed</p>
          <p className="font-mono text-lg font-bold text-amber-900">
            {nearestReference.value} {inputUnit} = {nearestReference.label}
          </p>
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

        {/* Reference Speeds */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary uppercase">Common Speeds</p>
          <div className="p-4 bg-white border border-border rounded-lg overflow-x-auto">
            <div className="space-y-2">
              {REFERENCE_SPEEDS.map((ref, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <p className="text-sm text-text-secondary">{ref.label}</p>
                  <div className="flex gap-3">
                    <p className="font-mono font-medium text-text-primary min-w-16 text-right">
                      {ref.value} mph
                    </p>
                    <p className="font-mono font-medium text-text-secondary min-w-20 text-right">
                      {(ref.value * 1.60934).toFixed(1)} km/h
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900">
            mph: miles per hour (US/UK). km/h: kilometres per hour (metric). knots: used in aviation and maritime. m/s: metres per second (physics/science). Mach: speed of sound (aviation).
          </p>
        </div>
      </div>
    </div>
  );
}
