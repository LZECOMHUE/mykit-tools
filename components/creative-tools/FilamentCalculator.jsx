'use client';

import { useState, useMemo } from 'react';

export default function FilamentCalculator() {
  const [spoolSize, setSpoolSize] = useState(1000);
  const [currentWeight, setCurrentWeight] = useState(500);
  const [filamentType, setFilamentType] = useState('PLA');
  const [diameterMm, setDiameterMm] = useState(1.75);
  const [averageGramsPerPrint, setAverageGramsPerPrint] = useState(50);
  const [usePercentage, setUsePercentage] = useState(false);

  const filamentDensities = {
    PLA: 1.24,
    ABS: 1.04,
    PETG: 1.27,
    TPU: 1.21,
    Nylon: 1.14,
    ASA: 1.07,
    Resin: 1.2,
  };

  const density = filamentDensities[filamentType] || 1.24;

  const calculations = useMemo(() => {
    const weightRemaining = usePercentage ? (spoolSize * currentWeight) / 100 : currentWeight;
    const perimeterMm = Math.PI * diameterMm;
    const volumeCm3 = (weightRemaining / density);
    const lengthMm = (volumeCm3 * 1000) / ((Math.PI * (diameterMm / 2) ** 2));
    const lengthMetres = lengthMm / 1000;
    const printsLeft = averageGramsPerPrint > 0 ? Math.floor(weightRemaining / averageGramsPerPrint) : 0;

    return {
      weightRemaining: Math.max(0, weightRemaining),
      lengthMetres: Math.max(0, lengthMetres),
      printsLeft,
      percentageUsed: usePercentage ? currentWeight : (currentWeight / spoolSize) * 100,
      percentageRemaining: usePercentage ? 100 - currentWeight : ((spoolSize - currentWeight) / spoolSize) * 100,
    };
  }, [spoolSize, currentWeight, filamentType, diameterMm, averageGramsPerPrint, usePercentage, density]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-text-primary mb-1">Spool Size (grams)</label>
          <select
            value={spoolSize}
            onChange={(e) => setSpoolSize(parseInt(e.target.value))}
            className="w-full px-2 py-1 text-[13px] border border-border rounded-[var(--radius-input)] bg-white"
          >
            <option value={250}>250g</option>
            <option value={500}>500g</option>
            <option value={1000}>1kg</option>
            <option value={2000}>2kg</option>
          </select>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-text-primary mb-2">Measure by</label>
          <div className="flex gap-2">
            <button
              onClick={() => setUsePercentage(false)}
              className={`flex-1 px-3 py-1 text-[13px] rounded-[var(--radius-input)] border font-medium ${
                !usePercentage
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-text-primary border-border'
              }`}
            >
              Weight (g)
            </button>
            <button
              onClick={() => setUsePercentage(true)}
              className={`flex-1 px-3 py-1 text-[13px] rounded-[var(--radius-input)] border font-medium ${
                usePercentage
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-text-primary border-border'
              }`}
            >
              % Left
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-text-primary mb-1">
            {usePercentage ? 'Percentage Remaining (%)' : 'Current Weight (grams)'}
          </label>
          {usePercentage ? (
            <>
              <input
                type="range"
                min="0"
                max="100"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(parseInt(e.target.value))}
                className="w-full mb-2"
              />
              <input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-2 py-1 text-[13px] border border-border rounded-[var(--radius-input)]"
              />
            </>
          ) : (
            <input
              type="number"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(Math.min(spoolSize, Math.max(0, parseFloat(e.target.value) || 0)))}
              className="w-full px-2 py-1 text-[13px] border border-border rounded-[var(--radius-input)]"
            />
          )}
        </div>

        <div>
          <label className="block text-[13px] font-medium text-text-primary mb-1">Filament Type</label>
          <select
            value={filamentType}
            onChange={(e) => setFilamentType(e.target.value)}
            className="w-full px-2 py-1 text-[13px] border border-border rounded-[var(--radius-input)] bg-white"
          >
            {Object.keys(filamentDensities).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-text-primary mb-1">Diameter (mm)</label>
          <select
            value={diameterMm}
            onChange={(e) => setDiameterMm(parseFloat(e.target.value))}
            className="w-full px-2 py-1 text-[13px] border border-border rounded-[var(--radius-input)] bg-white"
          >
            <option value={1.75}>1.75mm</option>
            <option value={2.85}>2.85mm</option>
          </select>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-text-primary mb-1">Avg. Grams per Print</label>
          <input
            type="number"
            value={averageGramsPerPrint}
            onChange={(e) => setAverageGramsPerPrint(parseFloat(e.target.value) || 0)}
            className="w-full px-2 py-1 text-[13px] border border-border rounded-[var(--radius-input)]"
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Hero Banner */}
        <div className="bg-accent-muted border border-border rounded-[var(--radius-card)]">
          <p className="text-text-muted text-[13px] mb-2">Filament Remaining</p>
          <div className="space-y-3">
            <div>
              <p className="font-mono text-3xl font-bold text-text-primary">
                {calculations.weightRemaining.toFixed(0)}g
              </p>
              <p className="text-[13px] text-text-secondary">
                {calculations.percentageRemaining.toFixed(1)}% of spool
              </p>
            </div>
            <div className="border-t border-border pt-3">
              <p className="font-mono text-2xl font-bold text-text-primary">
                {calculations.lengthMetres.toFixed(0)}m
              </p>
              <p className="text-[13px] text-text-secondary">Approximate length</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between mb-2">
            <p className="text-[13px] font-medium text-text-primary">Spool Status</p>
            <p className="text-[13px] font-mono text-text-secondary">
              {calculations.percentageRemaining.toFixed(1)}%
            </p>
          </div>
          <div className="w-full h-6 bg-surface rounded-[var(--radius-input)] overflow-hidden border border-border">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${calculations.percentageRemaining}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface rounded-[var(--radius-card)] p-3 border border-border">
            <p className="text-[13px] text-text-secondary mb-1">Used</p>
            <p className="font-mono text-lg font-bold text-text-primary">
              {calculations.percentageUsed.toFixed(1)}%
            </p>
          </div>
          <div className="bg-surface rounded-[var(--radius-card)] p-3 border border-border">
            <p className="text-[13px] text-text-secondary mb-1">Weight Used</p>
            <p className="font-mono text-lg font-bold text-text-primary">
              {(spoolSize - calculations.weightRemaining).toFixed(0)}g
            </p>
          </div>
          <div className="bg-surface rounded-[var(--radius-card)] p-3 border border-border">
            <p className="text-[13px] text-text-secondary mb-1">Length per gram</p>
            <p className="font-mono text-lg font-bold text-text-primary">
              {(calculations.lengthMetres / Math.max(1, calculations.weightRemaining)).toFixed(2)}m
            </p>
          </div>
          <div className="bg-surface rounded-[var(--radius-card)] p-3 border border-border">
            <p className="text-[13px] text-text-secondary mb-1">Prints Left</p>
            <p className="font-mono text-lg font-bold text-text-primary">
              {calculations.printsLeft}
            </p>
          </div>
        </div>

        {/* Material Info */}
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-[13px] font-medium text-text-primary mb-2">{filamentType} Properties</p>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-text-secondary">Density:</span>
              <span className="font-mono text-text-primary">{density} g/cm³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Diameter:</span>
              <span className="font-mono text-text-primary">{diameterMm}mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
