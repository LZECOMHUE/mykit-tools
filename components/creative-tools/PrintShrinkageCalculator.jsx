'use client';

import { useState, useMemo } from 'react';

export default function PrintShrinkageCalculator() {
  const [filamentType, setFilamentType] = useState('PLA');
  const [desiredX, setDesiredX] = useState(100);
  const [desiredY, setDesiredY] = useState(100);
  const [desiredZ, setDesiredZ] = useState(100);
  const [customShrinkagePercent, setCustomShrinkagePercent] = useState(0.3);

  const shrinkageRates = {
    PLA: { min: 0.3, max: 0.5, typical: 0.4 },
    ABS: { min: 0.7, max: 0.8, typical: 0.75 },
    PETG: { min: 0.3, max: 0.6, typical: 0.45 },
    TPU: { min: 0.5, max: 1.0, typical: 0.75 },
    Nylon: { min: 1.5, max: 2.0, typical: 1.75 },
    ASA: { min: 0.6, max: 0.8, typical: 0.7 },
    Resin: { min: 1.0, max: 2.5, typical: 1.5 },
  };

  const currentShrinkage = filamentType === 'custom'
    ? customShrinkagePercent
    : shrinkageRates[filamentType].typical;

  const calculations = useMemo(() => {
    const shrinkageMultiplier = 1 + (currentShrinkage / 100);

    return {
      printX: desiredX * shrinkageMultiplier,
      printY: desiredY * shrinkageMultiplier,
      printZ: desiredZ * shrinkageMultiplier,
      shrinkageX: desiredX * shrinkageMultiplier - desiredX,
      shrinkageY: desiredY * shrinkageMultiplier - desiredY,
      shrinkageZ: desiredZ * shrinkageMultiplier - desiredZ,
    };
  }, [desiredX, desiredY, desiredZ, currentShrinkage]);

  const handleDimensionChange = (dimension, value) => {
    const numValue = Math.max(0, parseFloat(value) || 0);
    switch (dimension) {
      case 'x':
        setDesiredX(numValue);
        break;
      case 'y':
        setDesiredY(numValue);
        break;
      case 'z':
        setDesiredZ(numValue);
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-text-primary mb-1">Filament Type</label>
          <select
            value={filamentType}
            onChange={(e) => setFilamentType(e.target.value)}
            className="w-full px-2 py-1 text-[13px] border border-border rounded-[var(--radius-input)] bg-white"
          >
            {Object.keys(shrinkageRates).map((type) => (
              <option key={type} value={type}>
                {type} ({shrinkageRates[type].typical}%)
              </option>
            ))}
            <option value="custom">Custom</option>
          </select>
        </div>

        {filamentType === 'custom' && (
          <div>
            <label className="block text-[13px] font-medium text-text-primary mb-1">Shrinkage Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={customShrinkagePercent}
              onChange={(e) => setCustomShrinkagePercent(parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1 text-[13px] border border-border rounded-[var(--radius-input)]"
            />
          </div>
        )}

        {filamentType !== 'custom' && (
          <div className="bg-surface border border-border rounded-[var(--radius-input)] p-2 text-[13px]">
            <p className="text-text-secondary mb-2">Expected Range</p>
            <div className="space-y-1 text-text-primary font-mono">
              <div>Min: {shrinkageRates[filamentType].min}%</div>
              <div>Typical: {shrinkageRates[filamentType].typical}%</div>
              <div>Max: {shrinkageRates[filamentType].max}%</div>
            </div>
          </div>
        )}

        <div className="border-t border-border pt-4">
          <p className="text-[13px] font-medium text-text-primary mb-3">Desired Final Dimensions (mm)</p>

          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-1">X (Width)</label>
            <input
              type="number"
              step="0.1"
              value={desiredX}
              onChange={(e) => handleDimensionChange('x', e.target.value)}
              className="w-full px-2 py-1 text-[13px] border border-border rounded-[var(--radius-input)]"
            />
          </div>

          <div className="mt-3">
            <label className="block text-[13px] font-medium text-text-secondary mb-1">Y (Depth)</label>
            <input
              type="number"
              step="0.1"
              value={desiredY}
              onChange={(e) => handleDimensionChange('y', e.target.value)}
              className="w-full px-2 py-1 text-[13px] border border-border rounded-[var(--radius-input)]"
            />
          </div>

          <div className="mt-3">
            <label className="block text-[13px] font-medium text-text-secondary mb-1">Z (Height)</label>
            <input
              type="number"
              step="0.1"
              value={desiredZ}
              onChange={(e) => handleDimensionChange('z', e.target.value)}
              className="w-full px-2 py-1 text-[13px] border border-border rounded-[var(--radius-input)]"
            />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Hero Banner */}
        <div className="bg-accent-muted border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-text-muted text-[13px] mb-3">Print These Dimensions</p>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-text-secondary text-[13px]">X: </span>
              <span className="font-mono text-3xl font-bold text-text-primary">
                {calculations.printX.toFixed(2)}
              </span>
              <span className="text-text-muted text-[13px]">mm</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-text-secondary text-[13px]">Y: </span>
              <span className="font-mono text-3xl font-bold text-text-primary">
                {calculations.printY.toFixed(2)}
              </span>
              <span className="text-text-muted text-[13px]">mm</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-text-secondary text-[13px]">Z: </span>
              <span className="font-mono text-3xl font-bold text-text-primary">
                {calculations.printZ.toFixed(2)}
              </span>
              <span className="text-text-muted text-[13px]">mm</span>
            </div>
          </div>
        </div>

        {/* Shrinkage Info */}
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-[13px] font-medium text-text-primary mb-3">
            {filamentType} Shrinkage: {currentShrinkage}%
          </p>

          {/* Visual Shrinkage Bar */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[13px] text-text-secondary">X Dimension</span>
                <span className="text-[13px] font-mono text-text-primary">
                  {calculations.shrinkageX.toFixed(2)}mm shrinkage
                </span>
              </div>
              <div className="w-full h-6 bg-white rounded-[var(--radius-input)] border border-border overflow-hidden flex">
                <div
                  className="bg-red-500"
                  style={{
                    width: `${(calculations.shrinkageX / calculations.printX) * 100}%`,
                  }}
                  title="Expected shrinkage"
                />
                <div className="flex-1 bg-green-500" title="Final size" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[13px] text-text-secondary">Y Dimension</span>
                <span className="text-[13px] font-mono text-text-primary">
                  {calculations.shrinkageY.toFixed(2)}mm shrinkage
                </span>
              </div>
              <div className="w-full h-6 bg-white rounded-[var(--radius-input)] border border-border overflow-hidden flex">
                <div
                  className="bg-red-500"
                  style={{
                    width: `${(calculations.shrinkageY / calculations.printY) * 100}%`,
                  }}
                  title="Expected shrinkage"
                />
                <div className="flex-1 bg-green-500" title="Final size" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[13px] text-text-secondary">Z Dimension</span>
                <span className="text-[13px] font-mono text-text-primary">
                  {calculations.shrinkageZ.toFixed(2)}mm shrinkage
                </span>
              </div>
              <div className="w-full h-6 bg-white rounded-[var(--radius-input)] border border-border overflow-hidden flex">
                <div
                  className="bg-red-500"
                  style={{
                    width: `${(calculations.shrinkageZ / calculations.printZ) * 100}%`,
                  }}
                  title="Expected shrinkage"
                />
                <div className="flex-1 bg-green-500" title="Final size" />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-text-primary">Dimension</th>
                <th className="text-right px-4 py-2 font-medium text-text-primary">Print at</th>
                <th className="text-right px-4 py-2 font-medium text-text-primary">Final Size</th>
                <th className="text-right px-4 py-2 font-medium text-text-primary">Shrinkage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2 text-text-secondary">X</td>
                <td className="text-right px-4 py-2 font-mono text-text-primary">
                  {calculations.printX.toFixed(2)}mm
                </td>
                <td className="text-right px-4 py-2 font-mono text-text-primary">
                  {desiredX.toFixed(2)}mm
                </td>
                <td className="text-right px-4 py-2 font-mono text-amber-600">
                  {calculations.shrinkageX.toFixed(2)}mm
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-text-secondary">Y</td>
                <td className="text-right px-4 py-2 font-mono text-text-primary">
                  {calculations.printY.toFixed(2)}mm
                </td>
                <td className="text-right px-4 py-2 font-mono text-text-primary">
                  {desiredY.toFixed(2)}mm
                </td>
                <td className="text-right px-4 py-2 font-mono text-amber-600">
                  {calculations.shrinkageY.toFixed(2)}mm
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-text-secondary">Z</td>
                <td className="text-right px-4 py-2 font-mono text-text-primary">
                  {calculations.printZ.toFixed(2)}mm
                </td>
                <td className="text-right px-4 py-2 font-mono text-text-primary">
                  {desiredZ.toFixed(2)}mm
                </td>
                <td className="text-right px-4 py-2 font-mono text-amber-600">
                  {calculations.shrinkageZ.toFixed(2)}mm
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
          <p className="text-[13px] font-medium text-blue-900 mb-2">Important Notes</p>
          <ul className="space-y-1 text-[13px] text-blue-800">
            <li className="flex gap-2">
              <span>•</span>
              <span>Shrinkage varies by print orientation, cooling speed, and printer calibration</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>These are typical values; actual shrinkage may vary slightly</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Print test pieces to verify shrinkage on your specific printer</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Annealing (post-processing heat) can further reduce or stabilize dimensions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
