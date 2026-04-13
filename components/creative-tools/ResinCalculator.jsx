'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

export default function ResinCalculator() {
  const [mould, setMould] = useState('cylinder');
  const [diameterMm, setDiameterMm] = useState('50');
  const [heightMm, setHeightMm] = useState('80');
  const [widthMm, setWidthMm] = useState('40');
  const [depthMm, setDepthMm] = useState('40');
  const [mixRatio, setMixRatio] = useState('1:1');
  const [resinCostPerLitre, setResinCostPerLitre] = useState('25.00');
  const [numPieces, setNumPieces] = useState('1');

  const calculation = useMemo(() => {
    const parseNum = (v) => parseFloat(v) || 0;

    let volume = 0; // in cubic mm

    if (mould === 'cylinder') {
      const d = parseNum(diameterMm);
      const h = parseNum(heightMm);
      volume = Math.PI * Math.pow(d / 2, 2) * h;
    } else if (mould === 'cube') {
      const w = parseNum(widthMm);
      const d = parseNum(depthMm);
      const h = parseNum(heightMm);
      volume = w * d * h;
    } else if (mould === 'sphere') {
      const d = parseNum(diameterMm);
      volume = (4 / 3) * Math.PI * Math.pow(d / 2, 3);
    } else if (mould === 'dome') {
      const d = parseNum(diameterMm);
      const h = parseNum(heightMm);
      volume = (Math.PI / 3) * Math.pow(d / 2, 2) * h;
    }

    // Convert to ml
    const volumeMl = volume / 1000;
    const volumeLitres = volumeMl / 1000;

    // Parse ratio
    const [ratioA, ratioB] = mixRatio.split(':').map(v => parseFloat(v) || 1);
    const totalRatioParts = ratioA + ratioB;
    const partAPercent = ratioA / totalRatioParts;
    const partBPercent = ratioB / totalRatioParts;

    const partAMl = volumeMl * partAPercent;
    const partBMl = volumeMl * partBPercent;

    // Cost per piece
    const costPerLitre = parseNum(resinCostPerLitre);
    const costPerPiece = volumeLitres * costPerLitre;
    const batchCost = costPerPiece * parseNum(numPieces);

    return {
      volume: volumeMl.toFixed(0),
      volumeLitres: volumeLitres.toFixed(3),
      partA: partAMl.toFixed(1),
      partB: partBMl.toFixed(1),
      costPerPiece: costPerPiece.toFixed(2),
      batchCost: batchCost.toFixed(2),
      totalMixRatio: mixRatio,
    };
  }, [mould, diameterMm, heightMm, widthMm, depthMm, mixRatio, resinCostPerLitre, numPieces]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Mould Shape</h3>
          <select
            value={mould}
            onChange={(e) => setMould(e.target.value)}
            className={selectCls}
          >
            <option value="cylinder">Cylinder</option>
            <option value="cube">Cube / Rectangle</option>
            <option value="sphere">Sphere</option>
            <option value="dome">Dome</option>
            <option value="custom">Custom Volume</option>
          </select>
        </div>

        {mould === 'cylinder' && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Dimensions</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="diameter-cylinder" className="block text-[13px] font-medium text-text-secondary mb-1">
                  Diameter (mm)
                </label>
                <input
                  id="diameter-cylinder"
                  type="number"
                  value={diameterMm}
                  onChange={(e) => setDiameterMm(e.target.value)}
                  step="5"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="height-cylinder" className="block text-[13px] font-medium text-text-secondary mb-1">
                  Height (mm)
                </label>
                <input
                  id="height-cylinder"
                  type="number"
                  value={heightMm}
                  onChange={(e) => setHeightMm(e.target.value)}
                  step="5"
                  className={inputCls}
                />
              </div>
            </div>
          </div>
        )}

        {mould === 'cube' && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Dimensions</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="width-cube" className="block text-[13px] font-medium text-text-secondary mb-1">
                  Width (mm)
                </label>
                <input
                  id="width-cube"
                  type="number"
                  value={widthMm}
                  onChange={(e) => setWidthMm(e.target.value)}
                  step="5"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="depth-cube" className="block text-[13px] font-medium text-text-secondary mb-1">
                  Depth (mm)
                </label>
                <input
                  id="depth-cube"
                  type="number"
                  value={depthMm}
                  onChange={(e) => setDepthMm(e.target.value)}
                  step="5"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="height-cube" className="block text-[13px] font-medium text-text-secondary mb-1">
                  Height (mm)
                </label>
                <input
                  id="height-cube"
                  type="number"
                  value={heightMm}
                  onChange={(e) => setHeightMm(e.target.value)}
                  step="5"
                  className={inputCls}
                />
              </div>
            </div>
          </div>
        )}

        {(mould === 'sphere' || mould === 'dome') && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Dimensions</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="diameter-sphere" className="block text-[13px] font-medium text-text-secondary mb-1">
                  Diameter (mm)
                </label>
                <input
                  id="diameter-sphere"
                  type="number"
                  value={diameterMm}
                  onChange={(e) => setDiameterMm(e.target.value)}
                  step="5"
                  className={inputCls}
                />
              </div>
              {mould === 'dome' && (
                <div>
                  <label htmlFor="height-dome" className="block text-[13px] font-medium text-text-secondary mb-1">
                    Height (mm)
                  </label>
                  <input
                    id="height-dome"
                    type="number"
                    value={heightMm}
                    onChange={(e) => setHeightMm(e.target.value)}
                    step="5"
                    className={inputCls}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {mould === 'custom' && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
            <label htmlFor="volume-custom" className="block text-[13px] font-medium text-text-secondary mb-1">
              Volume (ml)
            </label>
            <input
              id="volume-custom"
              type="number"
              value={diameterMm}
              onChange={(e) => setDiameterMm(e.target.value)}
              placeholder="100"
              className={inputCls}
            />
          </div>
        )}

        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Mix Ratio</h3>
          <select
            value={mixRatio}
            onChange={(e) => setMixRatio(e.target.value)}
            className={selectCls}
          >
            <option value="1:1">1:1 (50% : 50%)</option>
            <option value="2:1">2:1 (67% : 33%)</option>
            <option value="3:1">3:1 (75% : 25%)</option>
            <option value="1:2">1:2 (33% : 67%)</option>
          </select>
        </div>

        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Cost</h3>
          <div className="space-y-3">
            <div>
              <label htmlFor="resin-cost" className="block text-[13px] font-medium text-text-secondary mb-1">
                Resin Cost per Litre ({'\u00a3'})
              </label>
              <input
                id="resin-cost"
                type="number"
                value={resinCostPerLitre}
                onChange={(e) => setResinCostPerLitre(e.target.value)}
                step="0.50"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="num-pieces" className="block text-[13px] font-medium text-text-secondary mb-1">
                Number of Pieces
              </label>
              <input
                id="num-pieces"
                type="number"
                value={numPieces}
                onChange={(e) => setNumPieces(e.target.value)}
                step="1"
                min="1"
                className={inputCls}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Hero */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 bg-accent-muted text-center">
          <p className="text-text-muted text-[12px] mb-2">Total Resin Volume</p>
          <p className="font-mono text-4xl font-semibold text-accent mb-1">
            {calculation.volume}ml
          </p>
          <p className="text-text-muted text-[12px]">
            {calculation.volumeLitres}L
          </p>
        </div>

        {/* Mix Ratio Breakdown */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Mix Ratio: {calculation.totalMixRatio}</h3>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-text-secondary">Part A</span>
              <span className="font-mono">{calculation.partA}ml</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Part B</span>
              <span className="font-mono">{calculation.partB}ml</span>
            </div>
            <div className="border-t border-border my-2 pt-2 flex justify-between font-semibold">
              <span className="text-text-primary">Total</span>
              <span className="font-mono">{calculation.volume}ml</span>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Cost per Piece</h3>
          <div className="text-center py-4">
            <p className="text-text-muted text-[12px] mb-2">Based on {'\u00a3'}{resinCostPerLitre}/L</p>
            <p className="font-mono text-3xl font-semibold text-accent">
              {'\u00a3'}{calculation.costPerPiece}
            </p>
          </div>
        </div>

        {/* Batch Cost */}
        {parseFloat(numPieces) > 1 && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 bg-surface/50 border border-border">
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Batch ({numPieces} pieces)</h3>
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Resin Cost</span>
              <span className="font-mono text-lg font-semibold text-accent">{'\u00a3'}{calculation.batchCost}</span>
            </div>
          </div>
        )}

        {/* Resin Tips */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 bg-surface/50 border border-border">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">Resin Tips</h3>
          <ul className="text-[12px] text-text-secondary space-y-1 list-disc list-inside">
            <li>Always measure resin by weight for accuracy</li>
            <li>Mix ratio varies by brand - check instructions</li>
            <li>Account for air bubbles and waste (~10% extra)</li>
            <li>Allow for cure time before demoulding</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
