'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

const CROPS = {
  carrots: { spacing: 5, rowSpacing: 30, germinationRate: 75 },
  lettuce: { spacing: 25, rowSpacing: 30, germinationRate: 85 },
  tomatoes: { spacing: 45, rowSpacing: 60, germinationRate: 80 },
  beans: { spacing: 15, rowSpacing: 45, germinationRate: 85 },
  peas: { spacing: 8, rowSpacing: 40, germinationRate: 75 },
  courgettes: { spacing: 90, rowSpacing: 90, germinationRate: 80 },
  potatoes: { spacing: 30, rowSpacing: 75, germinationRate: 90 },
  onions: { spacing: 10, rowSpacing: 30, germinationRate: 70 },
  beetroot: { spacing: 10, rowSpacing: 30, germinationRate: 75 },
  radishes: { spacing: 3, rowSpacing: 20, germinationRate: 85 },
  spinach: { spacing: 10, rowSpacing: 25, germinationRate: 75 },
  kale: { spacing: 45, rowSpacing: 50, germinationRate: 80 },
  leeks: { spacing: 20, rowSpacing: 40, germinationRate: 70 },
  parsnips: { spacing: 15, rowSpacing: 30, germinationRate: 60 },
  turnips: { spacing: 20, rowSpacing: 30, germinationRate: 75 },
};

export default function SeedSpacingCalculator() {
  const [bedLength, setBedLength] = useState('2');
  const [bedWidth, setBedWidth] = useState('1');
  const [cropType, setCropType] = useState('tomatoes');
  const [germRate, setGermRate] = useState('');

  const results = useMemo(() => {
    const crop = CROPS[cropType];
    const length = parseFloat(bedLength) || 0;
    const width = parseFloat(bedWidth) || 0;

    if (length <= 0 || width <= 0 || !crop) return null;

    const actualGermRate = parseFloat(germRate) || crop.germinationRate;
    const spacing = crop.spacing;
    const rowSpacing = crop.rowSpacing;

    const rowsPerBed = Math.floor((width * 100) / rowSpacing);
    const plantsPerRow = Math.floor((length * 100) / spacing);
    const totalPlants = rowsPerBed * plantsPerRow;

    // Calculate seed packets (assuming ~50 seeds per packet for most crops)
    const seedsPerPacket = 50;
    const seedsNeeded = Math.ceil((totalPlants * 100) / actualGermRate);
    const packetsNeeded = Math.ceil(seedsNeeded / seedsPerPacket);

    return {
      rowsPerBed,
      plantsPerRow,
      totalPlants,
      spacing,
      rowSpacing,
      germRate: actualGermRate,
      packetsNeeded,
      seedsNeeded,
    };
  }, [bedLength, bedWidth, cropType, germRate]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
        {/* Left Panel */}
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Bed Length (m)</label>
            <input type="number" value={bedLength} onChange={(e) => setBedLength(e.target.value)} min="0.1" step="0.1" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Bed Width (m)</label>
            <input type="number" value={bedWidth} onChange={(e) => setBedWidth(e.target.value)} min="0.1" step="0.1" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Crop Type</label>
            <select value={cropType} onChange={(e) => setCropType(e.target.value)} className={selectCls}>
              {Object.keys(CROPS).sort().map(crop => (
                <option key={crop} value={crop}>{crop.charAt(0).toUpperCase() + crop.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Germination Rate (%)</label>
            <input
              type="number"
              value={germRate}
              onChange={(e) => setGermRate(e.target.value)}
              min="50"
              max="100"
              step="5"
              placeholder={CROPS[cropType]?.germinationRate || '75'}
              className={inputCls}
            />
            {germRate === '' && <p className="text-text-muted text-[11px] mt-1">Using {CROPS[cropType]?.germinationRate || 75}% default</p>}
          </div>
        </div>

        {/* Right Panel */}
        {results && (
          <div className="bg-accent-muted border border-border rounded-lg space-y-5">
            <div>
              <h3 className="text-text-secondary text-[13px] font-medium mb-2">Total Plants Needed</h3>
              <p className="font-mono text-5xl font-bold text-accent">{results.totalPlants}</p>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Rows in Bed</span>
                <span className="font-mono font-semibold text-text-primary">{results.rowsPerBed}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Plants per Row</span>
                <span className="font-mono font-semibold text-text-primary">{results.plantsPerRow}</span>
              </div>

              <hr className="border-border" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Plant Spacing</span>
                  <span className="font-mono">{results.spacing} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Row Spacing</span>
                  <span className="font-mono">{results.rowSpacing} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Germination Rate</span>
                  <span className="font-mono">{results.germRate}%</span>
                </div>
              </div>

              <hr className="border-border" />

              <div className="space-y-2 text-sm bg-green-50 rounded p-3 border border-green-100">
                <p className="font-medium text-text-primary">Seeds to Buy</p>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Seed Packets</span>
                  <span className="font-mono font-bold">{results.packetsNeeded}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">Total seeds</span>
                  <span className="font-mono text-text-muted">{results.seedsNeeded}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-1">Spacing Guide</p>
              <p>Space seeds {results.spacing}cm apart in rows {results.rowSpacing}cm apart. Account for germination failure by buying extra packets.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
