'use client';

import { useState, useMemo } from 'react';

// Conversion factors to feet
const UNIT_TO_FEET = {
  feet: 1,
  inches: 1 / 12,
  cm: 1 / 30.48,
  metres: 3.28084,
  yards: 3,
};

// Conversion factors from cubic feet
const CUBIC_FEET_CONVERSIONS = {
  'cubic feet': 1,
  'cubic metres': 0.0283168,
  'cubic yards': 0.037037,
  'cubic inches': 1728,
  litres: 28.3168,
  'US gallons': 7.48052,
};

// Common presets with dimensions in feet
const PRESETS = [
  { name: 'Shipping container (20ft)', length: 20, width: 8.5, height: 8.5 },
  { name: 'Storage unit (10×10)', length: 10, width: 10, height: 8 },
  { name: 'Moving box (medium)', length: 1.5, width: 1.2, height: 1.2 },
  { name: 'Refrigerator', length: 2.3, width: 2.5, height: 5.5 },
];

export default function CubicFeetCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [inputUnit, setInputUnit] = useState('feet');

  // Calculate cubic feet
  const cubicFeet = useMemo(() => {
    if (!length || !width || !height) return null;

    const lengthInFeet = parseFloat(length) * UNIT_TO_FEET[inputUnit];
    const widthInFeet = parseFloat(width) * UNIT_TO_FEET[inputUnit];
    const heightInFeet = parseFloat(height) * UNIT_TO_FEET[inputUnit];

    if (lengthInFeet <= 0 || widthInFeet <= 0 || heightInFeet <= 0) return null;

    return lengthInFeet * widthInFeet * heightInFeet;
  }, [length, width, height, inputUnit]);

  // Calculate conversions
  const conversions = useMemo(() => {
    if (!cubicFeet) return {};

    const result = {};
    Object.entries(CUBIC_FEET_CONVERSIONS).forEach(([unit, factor]) => {
      result[unit] = cubicFeet * factor;
    });
    return result;
  }, [cubicFeet]);

  // Apply preset
  const applyPreset = (preset) => {
    setLength(preset.length.toString());
    setWidth(preset.width.toString());
    setHeight(preset.height.toString());
    setInputUnit('feet');
  };

  // Reset calculator
  const handleReset = () => {
    setLength('');
    setWidth('');
    setHeight('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      {/* Input Section */}
      <div
        className="rounded-xl border bg-white p-6"
        style={{
          borderColor: 'var(--border)',
          borderRadius: '12px',
        }}
      >
        {/* Unit Selector */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Unit of Measurement
          </label>
          <select
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border text-base"
            style={{
              borderColor: 'var(--border)',
              borderRadius: '8px',
              backgroundColor: 'white',
              color: 'var(--text-primary)',
            }}
          >
            <option value="feet">Feet</option>
            <option value="inches">Inches</option>
            <option value="cm">Centimetres</option>
            <option value="metres">Metres</option>
            <option value="yards">Yards</option>
          </select>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Length */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Length ({inputUnit})
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Enter length"
              min="0"
              step="0.01"
              className="w-full px-4 py-2 rounded-lg border text-base focus:outline-none focus:ring-2 focus:ring-offset-0"
              style={{
                borderColor: 'var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = 'var(--accent)')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'var(--border)')
              }
            />
          </div>

          {/* Width */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Width ({inputUnit})
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Enter width"
              min="0"
              step="0.01"
              className="w-full px-4 py-2 rounded-lg border text-base focus:outline-none focus:ring-2"
              style={{
                borderColor: 'var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = 'var(--accent)')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'var(--border)')
              }
            />
          </div>

          {/* Height */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Height ({inputUnit})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height"
              min="0"
              step="0.01"
              className="w-full px-4 py-2 rounded-lg border text-base focus:outline-none focus:ring-2"
              style={{
                borderColor: 'var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = 'var(--accent)')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'var(--border)')
              }
            />
          </div>
        </div>

        {/* Formula Display */}
        <div
          className="p-4 rounded-lg mb-6 border"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            borderRadius: '8px',
          }}
        >
          <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>
            Formula
          </p>
          <p className="font-mono text-base" style={{ color: 'var(--text-primary)' }}>
            Volume = Length × Width × Height
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 rounded-lg border font-medium text-base transition-colors"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
              backgroundColor: 'white',
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = 'var(--surface)')
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = 'white')
            }
          >
            Clear
          </button>
        </div>
      </div>

      {/* Results Section */}
      {cubicFeet !== null && (
        <div
          className="rounded-xl border bg-white p-6"
          style={{
            borderColor: 'var(--border)',
            borderRadius: '12px',
          }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Volume Results
          </h2>

          {/* Primary Result */}
          <div
            className="p-4 rounded-lg mb-6 border-2"
            style={{
              backgroundColor: 'var(--accent)',
              borderColor: 'var(--accent)',
              color: 'white',
              borderRadius: '8px',
            }}
          >
            <p className="text-sm font-medium opacity-90 mb-2">Cubic Feet</p>
            <p
              className="text-4xl font-bold"
              style={{ fontFamily: 'var(--font-mono-num), monospace' }}
            >
              {cubicFeet.toFixed(2)}
            </p>
          </div>

          {/* Conversion Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(conversions).map(([unit, value]) => (
              <div
                key={unit}
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  borderRadius: '8px',
                }}
              >
                <p
                  className="text-xs font-medium uppercase tracking-wide mb-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {unit}
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono-num), monospace',
                  }}
                >
                  {value.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Presets Section */}
      <div
        className="rounded-xl border bg-white p-6"
        style={{
          borderColor: 'var(--border)',
          borderRadius: '12px',
        }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Common Presets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="p-3 rounded-lg border text-left text-sm font-medium transition-all"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'white',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <p className="font-medium">{preset.name}</p>
              <p style={{ color: 'var(--text-secondary)' }} className="text-xs mt-1">
                {preset.length} × {preset.width} × {preset.height} ft
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div
        className="rounded-xl border p-6"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--surface)',
          borderRadius: '12px',
        }}
      >
        <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          About Cubic Feet
        </h3>
        <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
          Cubic feet is a unit of volume measurement equal to a cube that is 1 foot on each side.
          It's commonly used in shipping, storage, and construction. This calculator converts your
          dimensions to cubic feet and provides equivalent measurements in other volume units for
          international reference.
        </p>
      </div>
    </div>
  );
}
