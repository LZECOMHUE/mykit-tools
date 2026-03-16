'use client';
import { useState, useMemo } from 'react';

const CONVERSIONS = {
  'degrees': 1,
  'radians': Math.PI / 180,
  'gradians': 100 / 90,
  'turns': 1 / 360,
  'arcmin': 60,
  'arcsec': 3600,
};

export default function AngleConverter() {
  const [inputValue, setInputValue] = useState('90');
  const [inputUnit, setInputUnit] = useState('degrees');

  const conversions = useMemo(() => {
    const input = parseFloat(inputValue) || 0;
    const baseValue = input / CONVERSIONS[inputUnit];

    const results = {};
    Object.keys(CONVERSIONS).forEach((unit) => {
      const converted = baseValue * CONVERSIONS[unit];
      results[unit] = converted < 1000 ? converted.toFixed(4) : converted.toFixed(2);
    });

    return results;
  }, [inputValue, inputUnit]);

  const degreeValue = useMemo(() => {
    const input = parseFloat(inputValue) || 0;
    return (input / CONVERSIONS[inputUnit]) % 360;
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
          <label className="block text-sm font-medium text-text-primary">Enter Angle</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="90"
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

        {/* Angle Indicator */}
        <div className="p-6 bg-white border border-border rounded-lg flex flex-col items-center">
          <p className="text-xs text-text-secondary mb-4">Visual Angle</p>
          <div className="relative w-40 h-40 rounded-full border-4 border-accent bg-blue-50 flex items-center justify-center">
            {/* Circle base */}
            <svg className="absolute w-full h-full" viewBox="0 0 100 100">
              {/* Cardinal directions */}
              <text x="50" y="8" textAnchor="middle" className="text-xs fill-text-secondary">
                0deg
              </text>
              <text x="92" y="54" textAnchor="start" className="text-xs fill-text-secondary">
                90deg
              </text>
              <text x="50" y="98" textAnchor="middle" className="text-xs fill-text-secondary">
                180deg
              </text>
              <text x="8" y="54" textAnchor="end" className="text-xs fill-text-secondary">
                270deg
              </text>

              {/* Angle arc */}
              <line
                x1="50"
                y1="50"
                x2={50 + 35 * Math.cos((degreeValue - 90) * Math.PI / 180)}
                y2={50 + 35 * Math.sin((degreeValue - 90) * Math.PI / 180)}
                stroke="#2563eb"
                strokeWidth="2"
              />
            </svg>
            <span className="font-mono font-bold text-accent text-lg relative z-10">
              {degreeValue.toFixed(1)}deg
            </span>
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
                  <p className="flex-1 font-mono font-bold text-text-primary text-sm">
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

        {/* Common Angles */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary uppercase">Common Angles</p>
          <div className="p-4 bg-white border border-border rounded-lg space-y-2">
            {[
              { name: 'Right angle', degrees: 90 },
              { name: 'Straight line', degrees: 180 },
              { name: 'Full circle', degrees: 360 },
              { name: 'Full turn', degrees: 360 },
              { name: 'Half turn', degrees: 180 },
              { name: 'Quarter turn', degrees: 90 },
            ].map((angle, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b border-border last:border-0">
                <p className="text-sm text-text-secondary">{angle.name}</p>
                <div className="flex gap-4 text-xs">
                  <p className="font-mono font-medium text-text-primary min-w-16 text-right">
                    {angle.degrees}deg
                  </p>
                  <p className="font-mono font-medium text-text-secondary min-w-20 text-right">
                    {(angle.degrees * Math.PI / 180).toFixed(4)} rad
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900 mb-2 font-medium">Angle Units</p>
          <ul className="text-xs text-blue-900 space-y-1">
            <li>Degrees: 360 per full circle (most common)</li>
            <li>Radians: ~6.28 per full circle (mathematics, physics)</li>
            <li>Gradians: 400 per full circle (surveying, some engineering)</li>
            <li>Turns: 1 = full rotation</li>
            <li>Arcmin/Arcsec: for precise angles (astronomy, surveying)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
