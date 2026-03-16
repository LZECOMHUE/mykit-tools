'use client';
import { useState, useMemo } from 'react';

const PRESETS = [
  { name: 'Binary', base: 2 },
  { name: 'Octal', base: 8 },
  { name: 'Decimal', base: 10 },
  { name: 'Hexadecimal', base: 16 },
];

export default function NumberBaseConverter() {
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [inputValue, setInputValue] = useState('255');

  const result = useMemo(() => {
    if (!inputValue.trim()) return '';

    try {
      const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, fromBase);
      const upperInput = inputValue.toUpperCase();

      for (const char of upperInput) {
        if (!validChars.includes(char)) {
          return 'Invalid character for base ' + fromBase;
        }
      }

      const decimal = parseInt(inputValue, fromBase);
      if (isNaN(decimal)) return 'Invalid input';

      return decimal.toString(toBase).toUpperCase();
    } catch {
      return 'Conversion error';
    }
  }, [inputValue, fromBase, toBase]);

  const handlePresetFrom = (base) => {
    setFromBase(base);
  };

  const handlePresetTo = (base) => {
    setToBase(base);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-lg border border-border">
      <div className="space-y-6">
        {/* Preset Buttons */}
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase mb-3">Quick Presets</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.base}
                onClick={() => handlePresetFrom(preset.base)}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  fromBase === preset.base
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:border-accent'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            From Base: {fromBase}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              placeholder="Enter number"
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
            />
          </div>
          <p className="text-xs text-text-muted mt-2">
            Valid characters: 0-{(fromBase - 1).toString(fromBase).toUpperCase()}
            {fromBase > 10 && `, A-${String.fromCharCode(64 + fromBase - 10)}`}
          </p>
        </div>

        {/* Base Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white border border-border rounded-lg">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">From Base</label>
            <input
              type="number"
              min="2"
              max="36"
              value={fromBase}
              onChange={(e) => setFromBase(Math.max(2, Math.min(36, parseInt(e.target.value) || 10)))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-2">To Base</label>
            <input
              type="number"
              min="2"
              max="36"
              value={toBase}
              onChange={(e) => setToBase(Math.max(2, Math.min(36, parseInt(e.target.value) || 10)))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
            />
          </div>
        </div>

        {/* Result */}
        <div className="p-4 bg-white border border-border rounded-lg">
          <p className="text-xs text-text-secondary mb-2">Result in Base {toBase}</p>
          <div className="flex items-center gap-2">
            <p className="flex-1 font-mono text-2xl font-bold text-text-primary">
              {typeof result === 'string' && result.includes('error') ? (
                <span className="text-red-500">{result}</span>
              ) : (
                result || '--'
              )}
            </p>
            {result && !result.includes('error') && (
              <button
                onClick={() => copyToClipboard(result)}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Copy
              </button>
            )}
          </div>
        </div>

        {/* Preset Target Buttons */}
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase mb-3">Convert To</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.base}
                onClick={() => handlePresetTo(preset.base)}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  toBase === preset.base
                    ? 'bg-amber-500 text-white'
                    : 'bg-white border border-border text-text-primary hover:border-amber-500'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
