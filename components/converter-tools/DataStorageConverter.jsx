'use client';
import { useState, useMemo } from 'react';

export default function DataStorageConverter() {
  const [inputValue, setInputValue] = useState('1');
  const [inputUnit, setInputUnit] = useState('GB');
  const [standard, setStandard] = useState('binary');

  const conversions = useMemo(() => {
    const units = {
      binary: {
        B: 1,
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
        TB: 1024 * 1024 * 1024 * 1024,
        PB: 1024 * 1024 * 1024 * 1024 * 1024,
      },
      decimal: {
        B: 1,
        KB: 1000,
        MB: 1000 * 1000,
        GB: 1000 * 1000 * 1000,
        TB: 1000 * 1000 * 1000 * 1000,
        PB: 1000 * 1000 * 1000 * 1000 * 1000,
      },
    };

    const selectedUnits = units[standard];
    const bytes = (parseFloat(inputValue) || 0) * selectedUnits[inputUnit];

    const results = {};
    Object.keys(selectedUnits).forEach((unit) => {
      const value = bytes / selectedUnits[unit];
      results[unit] = value < 1000 ? value.toFixed(2) : value.toFixed(1);
    });

    return results;
  }, [inputValue, inputUnit, standard]);

  const getReadableUnit = useMemo(() => {
    const bytes = (parseFloat(inputValue) || 0) * (standard === 'binary' ? 1024 : 1000) ** ['B', 'KB', 'MB', 'GB', 'TB', 'PB'].indexOf(inputUnit);
    const units = standard === 'binary' ? ['B', 'KB', 'MB', 'GB', 'TB', 'PB'] : ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const divisor = standard === 'binary' ? 1024 : 1000;

    if (bytes === 0) return '0 B';

    let unitIndex = 0;
    let value = bytes;
    while (value >= divisor && unitIndex < units.length - 1) {
      value /= divisor;
      unitIndex++;
    }

    return `${value.toFixed(2)} ${units[unitIndex]}`;
  }, [inputValue, inputUnit, standard]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const unitOptions = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-lg border border-border">
      <div className="space-y-6">
        {/* Standard Selection */}
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase mb-2">Standard</p>
          <div className="flex gap-2">
            <button
              onClick={() => setStandard('binary')}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                standard === 'binary'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:border-accent'
              }`}
            >
              Binary (1024)
            </button>
            <button
              onClick={() => setStandard('decimal')}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                standard === 'decimal'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:border-accent'
              }`}
            >
              Decimal (1000)
            </button>
          </div>
          <p className="text-xs text-text-muted mt-2">
            Binary: Used by operating systems. Decimal: Used by manufacturers (advertised sizes).
          </p>
        </div>

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
              className="px-4 py-3 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white min-w-32"
            >
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Most Readable Unit */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-900 mb-1">Most Readable Unit</p>
          <div className="flex items-center gap-2">
            <p className="flex-1 font-mono text-2xl font-bold text-amber-900">{getReadableUnit}</p>
            <button
              onClick={() => copyToClipboard(getReadableUnit)}
              className="px-3 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors text-xs font-medium"
            >
              Copy
            </button>
          </div>
        </div>

        {/* All Conversions Grid */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary uppercase">All Conversions</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {unitOptions.map((unit) => (
              <div key={unit} className="p-3 bg-white border border-border rounded-lg">
                <p className="text-xs text-text-secondary mb-1">{unit}</p>
                <div className="flex items-center gap-2 min-h-10">
                  <p className="flex-1 font-mono font-bold text-text-primary">
                    {conversions[unit]}
                  </p>
                  <button
                    onClick={() => copyToClipboard(`${conversions[unit]} ${unit}`)}
                    className="p-1 text-accent hover:text-blue-600 transition-colors"
                    title="Copy"
                  >
                    <span className="text-xs">📋</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs font-medium text-blue-900 mb-2">Quick Reference</p>
          <ul className="text-xs text-blue-900 space-y-1">
            <li>1 byte = 8 bits</li>
            <li>Binary (1024): Used by computers and operating systems</li>
            <li>Decimal (1000): Used by hard drive and cloud storage manufacturers</li>
            <li>1 TB binary ≈ 931 GB decimal (why your drive shows less space)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
