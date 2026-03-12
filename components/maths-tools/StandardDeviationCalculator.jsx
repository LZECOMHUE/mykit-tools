'use client';

import { useState, useMemo } from 'react';

const parseNumbers = (input) => {
  const regex = /[,\s\n]+/;
  return input
    .split(regex)
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));
};

const calculateStats = (numbers) => {
  if (numbers.length === 0) return null;

  const n = numbers.length;
  const sum = numbers.reduce((a, b) => a + b, 0);
  const mean = sum / n;

  const sorted = [...numbers].sort((a, b) => a - b);
  let median;
  if (n % 2 === 0) {
    median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  } else {
    median = sorted[Math.floor(n / 2)];
  }

  const counts = {};
  numbers.forEach((num) => {
    counts[num] = (counts[num] || 0) + 1;
  });
  const mode = Object.keys(counts).length === n ? null : Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));

  const range = Math.max(...numbers) - Math.min(...numbers);

  const populationVariance = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / n;
  const sampleVariance = n > 1 ? numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / (n - 1) : 0;

  const populationStdDev = Math.sqrt(populationVariance);
  const sampleStdDev = Math.sqrt(sampleVariance);

  return {
    count: n,
    mean: mean.toFixed(4),
    median: median.toFixed(4),
    mode: mode !== null ? parseFloat(mode).toFixed(4) : 'N/A',
    range: range.toFixed(4),
    populationVariance: populationVariance.toFixed(4),
    sampleVariance: sampleVariance.toFixed(4),
    populationStdDev: populationStdDev.toFixed(4),
    sampleStdDev: sampleStdDev.toFixed(4),
    min: Math.min(...numbers).toFixed(4),
    max: Math.max(...numbers).toFixed(4),
    sum: sum.toFixed(4),
    rawMean: mean,
    rawPopStdDev: populationStdDev,
    rawSampleStdDev: sampleStdDev
  };
};

export default function StandardDeviationCalculator() {
  const [input, setInput] = useState('');
  const [usePopulation, setUsePopulation] = useState(true);

  const stats = useMemo(() => {
    const numbers = parseNumbers(input);
    return calculateStats(numbers);
  }, [input]);

  const handleReset = () => {
    setInput('');
  };

  const distribution = useMemo(() => {
    if (!stats) return null;

    const mean = stats.rawMean;
    const stdDev = usePopulation ? stats.rawPopStdDev : stats.rawSampleStdDev;

    return {
      mean1Minus: (mean - stdDev).toFixed(2),
      mean1Plus: (mean + stdDev).toFixed(2),
      mean2Minus: (mean - 2 * stdDev).toFixed(2),
      mean2Plus: (mean + 2 * stdDev).toFixed(2),
      mean3Minus: (mean - 3 * stdDev).toFixed(2),
      mean3Plus: (mean + 3 * stdDev).toFixed(2),
    };
  }, [stats, usePopulation]);

  return (
    <div className="w-full bg-surface border border-border rounded-[var(--radius-card)] p-6">
      {/* Standard Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Type
        </label>
        <div className="flex gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={usePopulation}
              onChange={() => setUsePopulation(true)}
              className="w-4 h-4"
            />
            <span className="text-text-primary">Population</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={!usePopulation}
              onChange={() => setUsePopulation(false)}
              className="w-4 h-4"
            />
            <span className="text-text-primary">Sample</span>
          </label>
        </div>
      </div>

      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Enter Numbers
          <span className="text-text-muted text-xs ml-1">(comma or newline separated)</span>
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 10, 20, 30, 40, 50&#10;or paste from spreadsheet"
          rows="5"
          className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent font-mono-num text-sm"
        />
      </div>

      {stats && (
        <>
          {/* Summary Stats */}
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6">
            <p className="text-text-secondary text-sm font-medium mb-4">Summary Statistics</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-text-muted text-xs">Count</p>
                <p className="text-lg font-bold text-accent font-mono-num">
                  {stats.count}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Sum</p>
                <p className="text-lg font-bold text-accent font-mono-num">
                  {stats.sum}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Range</p>
                <p className="text-lg font-bold text-accent font-mono-num">
                  {stats.range}
                </p>
              </div>
            </div>
          </div>

          {/* Central Tendency */}
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6">
            <p className="text-text-secondary text-sm font-medium mb-4">Central Tendency</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Mean:</span>
                <span className="text-accent font-bold font-mono-num">{stats.mean}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Median:</span>
                <span className="text-accent font-bold font-mono-num">{stats.median}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Mode:</span>
                <span className="text-accent font-bold font-mono-num">{stats.mode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Min:</span>
                <span className="text-accent font-bold font-mono-num">{stats.min}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Max:</span>
                <span className="text-accent font-bold font-mono-num">{stats.max}</span>
              </div>
            </div>
          </div>

          {/* Dispersion */}
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6">
            <p className="text-text-secondary text-sm font-medium mb-4">Dispersion</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-text-secondary text-sm">Population Variance:</span>
                  <span className="text-accent font-bold font-mono-num">
                    {stats.populationVariance}
                  </span>
                </div>
                <p className="text-text-muted text-xs">Σ(x - μ)² / n</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-text-secondary text-sm">Sample Variance:</span>
                  <span className="text-accent font-bold font-mono-num">
                    {stats.sampleVariance}
                  </span>
                </div>
                <p className="text-text-muted text-xs">Σ(x - x̄)² / (n - 1)</p>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-text-secondary text-sm font-medium">
                    {usePopulation ? 'Population' : 'Sample'} Std Dev:
                  </span>
                  <span className="text-lg text-accent font-bold font-mono-num">
                    {usePopulation ? stats.populationStdDev : stats.sampleStdDev}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Distribution Visualization */}
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6">
            <p className="text-text-secondary text-sm font-medium mb-4">Distribution (Standard Deviations)</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>μ ± 1σ</span>
                  <span className="font-mono-num">{distribution.mean1Minus} to {distribution.mean1Plus}</span>
                </div>
                <div className="h-2 bg-accent/30 rounded-full"></div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>μ ± 2σ</span>
                  <span className="font-mono-num">{distribution.mean2Minus} to {distribution.mean2Plus}</span>
                </div>
                <div className="h-2 bg-accent/20 rounded-full"></div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>μ ± 3σ</span>
                  <span className="font-mono-num">{distribution.mean3Minus} to {distribution.mean3Plus}</span>
                </div>
                <div className="h-2 bg-accent/10 rounded-full"></div>
              </div>
            </div>
            <p className="text-text-muted text-xs mt-4 italic">
              In a normal distribution: ≈68% within 1σ, ≈95% within 2σ, ≈99.7% within 3σ
            </p>
          </div>

          {/* Data Points */}
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6">
            <p className="text-text-secondary text-sm font-medium mb-3">Data Points</p>
            <div className="max-h-48 overflow-y-auto">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {parseNumbers(input).map((num, idx) => (
                  <div
                    key={idx}
                    className="bg-accent/10 border border-accent/20 rounded-[var(--radius-input)] p-2 text-center"
                  >
                    <p className="font-mono-num text-text-primary font-semibold text-sm">
                      {num}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {!stats && (
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6 text-center">
          <p className="text-text-muted">Enter numbers to calculate statistics</p>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full py-2 px-4 bg-white border border-border text-text-primary rounded-[var(--radius-input)] font-medium hover:bg-gray-50 transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
