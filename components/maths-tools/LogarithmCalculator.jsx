'use client';

import { useState, useMemo } from 'react';

export default function LogarithmCalculator() {
  const [number, setNumber] = useState(100);
  const [customBase, setCustomBase] = useState(10);
  const [baseType, setBaseType] = useState('custom');

  const presets = {
    '10': { name: 'log10 (common)', base: 10 },
    'e': { name: 'ln (natural)', base: Math.E },
    '2': { name: 'log2 (binary)', base: 2 },
    'custom': { name: 'Custom base', base: customBase },
  };

  const result = useMemo(() => {
    const num = parseFloat(number);
    const base = baseType === 'custom' ? parseFloat(customBase) : presets[baseType].base;

    if (num <= 0 || base <= 0 || base === 1) {
      return null;
    }

    const logValue = Math.log(num) / Math.log(base);
    const antilog = Math.pow(base, logValue);

    return {
      logarithm: logValue,
      antilog: antilog,
      baseName: baseType === 'custom' ? `log${base.toFixed(2)}` : presets[baseType].name,
      base: base,
      number: num,
    };
  }, [number, baseType, customBase]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-text-primary font-medium mb-2">Number</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Enter a positive number"
          />
        </div>

        <div>
          <label className="block text-text-primary font-medium mb-2">Base</label>
          <select
            value={baseType}
            onChange={(e) => setBaseType(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            {Object.entries(presets).map(([key, val]) => (
              <option key={key} value={key}>
                {val.name}
              </option>
            ))}
          </select>
        </div>

        {baseType === 'custom' && (
          <div>
            <label className="block text-text-primary font-medium mb-2">Custom Base</label>
            <input
              type="number"
              value={customBase}
              onChange={(e) => setCustomBase(e.target.value)}
              step="0.01"
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Enter base (must be > 0, ≠ 1)"
            />
          </div>
        )}
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface p-4 rounded-[var(--radius-card)]">
              <p className="text-text-secondary text-sm mb-2">Logarithm</p>
              <p className="text-2xl font-mono font-semibold text-text-primary">
                {result.logarithm.toFixed(6)}
              </p>
              <p className="text-text-muted text-xs mt-1">
                {result.baseName}({result.number}) = {result.logarithm.toFixed(6)}
              </p>
            </div>

            <div className="bg-surface p-4 rounded-[var(--radius-card)]">
              <p className="text-text-secondary text-sm mb-2">Antilogarithm (Inverse)</p>
              <p className="text-2xl font-mono font-semibold text-text-primary">
                {result.antilog.toFixed(6)}
              </p>
              <p className="text-text-muted text-xs mt-1">
                {result.base.toFixed(2)}^{result.logarithm.toFixed(6)}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)] space-y-3">
            <p className="text-text-secondary font-medium text-sm">Common Log Values</p>
            <div className="space-y-1 text-text-secondary text-xs font-mono">
              <p>log10({result.number}) = {(Math.log(result.number) / Math.log(10)).toFixed(6)}</p>
              <p>ln({result.number}) = {Math.log(result.number).toFixed(6)}</p>
              <p>log2({result.number}) = {(Math.log(result.number) / Math.log(2)).toFixed(6)}</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm font-medium mb-2">Change of Base Formula</p>
            <p className="text-text-secondary text-xs font-mono">
              log_b(x) = ln(x) / ln(b) = log10(x) / log10(b)
            </p>
            <p className="text-text-secondary text-xs font-mono mt-2">
              log_{result.base.toFixed(2)}({result.number}) = ln({result.number}) / ln({result.base.toFixed(2)})
            </p>
          </div>
        </>
      )}
    </div>
  );
}
