'use client';

import { useState, useMemo } from 'react';

export default function ScientificNotationConverter() {
  const [inputMode, setInputMode] = useState('standard');
  const [standardInput, setStandardInput] = useState(12500);
  const [mantissa, setMantissa] = useState(1.25);
  const [exponent, setExponent] = useState(4);

  const result = useMemo(() => {
    if (inputMode === 'standard') {
      const num = parseFloat(standardInput);
      if (isNaN(num) || num === 0) return null;

      const isNegative = num < 0;
      const absNum = Math.abs(num);
      const exponentValue = Math.floor(Math.log10(absNum));
      const mantissaValue = isNegative ? -(absNum / Math.pow(10, exponentValue)) : absNum / Math.pow(10, exponentValue);

      return {
        standard: num,
        mantissa: mantissaValue.toFixed(10),
        exponent: exponentValue,
        scientific: `${mantissaValue.toFixed(2)} × 10^${exponentValue}`,
      };
    } else {
      const m = parseFloat(mantissa);
      const e = parseInt(exponent) || 0;
      if (isNaN(m)) return null;

      const standard = m * Math.pow(10, e);

      return {
        standard: standard,
        mantissa: m.toFixed(10),
        exponent: e,
        scientific: `${m.toFixed(2)} × 10^${e}`,
      };
    }
  }, [inputMode, standardInput, mantissa, exponent]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setInputMode('standard')}
          className={`flex-1 px-4 py-2 font-medium rounded-[var(--radius-input)] transition ${
            inputMode === 'standard'
              ? 'bg-accent text-white'
              : 'bg-white border border-border text-text-primary hover:bg-surface'
          }`}
        >
          From Standard
        </button>
        <button
          onClick={() => setInputMode('scientific')}
          className={`flex-1 px-4 py-2 font-medium rounded-[var(--radius-input)] transition ${
            inputMode === 'scientific'
              ? 'bg-accent text-white'
              : 'bg-white border border-border text-text-primary hover:bg-surface'
          }`}
        >
          From Scientific
        </button>
      </div>

      {inputMode === 'standard' ? (
        <div>
          <label className="block text-text-primary font-medium mb-2">Standard Notation</label>
          <input
            type="number"
            value={standardInput}
            onChange={(e) => setStandardInput(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="e.g., 12500"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">Mantissa</label>
              <input
                type="number"
                value={mantissa}
                onChange={(e) => setMantissa(e.target.value)}
                step="0.01"
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., 1.25"
              />
            </div>
            <div>
              <label className="block text-text-primary font-medium mb-2">Exponent</label>
              <input
                type="number"
                value={exponent}
                onChange={(e) => setExponent(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., 4"
              />
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="bg-surface p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm mb-2">Scientific Notation</p>
            <p className="text-2xl font-mono font-semibold text-text-primary">
              {result.scientific}
            </p>
          </div>

          <div className="bg-surface p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm mb-2">Standard Notation</p>
            <p className="text-2xl font-mono font-semibold text-text-primary break-words">
              {result.standard}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface p-4 rounded-[var(--radius-card)]">
              <p className="text-text-secondary text-sm mb-2">Mantissa (a)</p>
              <p className="text-lg font-mono font-semibold text-text-primary">
                {result.mantissa}
              </p>
              <p className="text-text-muted text-xs mt-1">where 1 ≤ a &lt; 10</p>
            </div>

            <div className="bg-surface p-4 rounded-[var(--radius-card)]">
              <p className="text-text-secondary text-sm mb-2">Exponent (n)</p>
              <p className="text-lg font-mono font-semibold text-text-primary">
                {result.exponent}
              </p>
              <p className="text-text-muted text-xs mt-1">power of 10</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm font-medium mb-2">Formula</p>
            <p className="text-text-secondary text-xs font-mono">
              Standard = Mantissa × 10^Exponent
            </p>
            <p className="text-text-secondary text-xs font-mono mt-2">
              {result.standard} = {parseFloat(result.mantissa).toFixed(2)} × 10^{result.exponent}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
