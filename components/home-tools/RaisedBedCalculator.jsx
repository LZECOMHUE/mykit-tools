'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

export default function RaisedBedCalculator() {
  const [length, setLength] = useState('2');
  const [width, setWidth] = useState('1');
  const [depth, setDepth] = useState('30');
  const [shape, setShape] = useState('rectangle');
  const [soilMix, setSoilMix] = useState('60/40');
  const [bagSize, setBagSize] = useState('50');
  const [costPerBag, setCostPerBag] = useState('4');

  const mixes = {
    '100': { compost: 100, topsoil: 0, perlite: 0 },
    '60/40': { compost: 60, topsoil: 40, perlite: 0 },
    '50/30/20': { compost: 50, topsoil: 30, perlite: 20 },
  };

  const results = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = (parseFloat(depth) || 0) / 100;

    if (l <= 0 || w <= 0 || d <= 0) return null;

    let volumeM3;
    if (shape === 'rectangle') {
      volumeM3 = l * w * d;
    } else {
      // L-shape as 2 rectangles
      volumeM3 = l * w * d * 1.5;
    }

    const volumeLitres = volumeM3 * 1000;
    const bagSizeNum = parseFloat(bagSize) || 0;
    const bagsNeeded = Math.ceil(volumeLitres / bagSizeNum);
    const costPerBagNum = parseFloat(costPerBag) || 0;
    const totalCost = bagsNeeded * costPerBagNum;

    const mix = mixes[soilMix] || { compost: 50, topsoil: 30, perlite: 20 };
    const compostLitres = (volumeLitres * mix.compost) / 100;
    const topsoilLitres = (volumeLitres * mix.topsoil) / 100;
    const perliteLitres = (volumeLitres * mix.perlite) / 100;

    return {
      volumeM3: volumeM3.toFixed(3),
      volumeLitres: Math.round(volumeLitres),
      bagsNeeded,
      totalCost: totalCost.toFixed(2),
      compostLitres: Math.round(compostLitres),
      topsoilLitres: Math.round(topsoilLitres),
      perliteLitres: Math.round(perliteLitres),
    };
  }, [length, width, depth, shape, soilMix, bagSize, costPerBag]);

  const fmt = (n) => '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
        {/* Left Panel */}
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Length (m)</label>
            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} min="0.1" step="0.1" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Width (m)</label>
            <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} min="0.1" step="0.1" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Depth (cm)</label>
            <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} min="10" step="5" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Shape</label>
            <select value={shape} onChange={(e) => setShape(e.target.value)} className={selectCls}>
              <option value="rectangle">Rectangle</option>
              <option value="l-shape">L-Shape</option>
            </select>
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Soil Mix</label>
            <select value={soilMix} onChange={(e) => setSoilMix(e.target.value)} className={selectCls}>
              <option value="100">100% Compost</option>
              <option value="60/40">60% Compost, 40% Topsoil</option>
              <option value="50/30/20">50% Compost, 30% Topsoil, 20% Perlite</option>
            </select>
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Bag Size (litres)</label>
            <select value={bagSize} onChange={(e) => setBagSize(e.target.value)} className={selectCls}>
              <option value="40">40L</option>
              <option value="50">50L</option>
              <option value="100">100L</option>
            </select>
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Cost per Bag</label>
            <div className="flex gap-2 items-center">
              <span className="text-text-secondary text-[13px]">£</span>
              <input type="number" value={costPerBag} onChange={(e) => setCostPerBag(e.target.value)} min="0" step="0.50" className={inputCls} />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        {results && (
          <div className="bg-accent-muted border border-border rounded-lg space-y-5">
            <div>
              <h3 className="text-text-secondary text-[13px] font-medium mb-2">Total Soil Cost</h3>
              <p className="font-mono text-5xl font-bold text-accent">{fmt(results.totalCost)}</p>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Volume Needed</span>
                <span className="font-mono font-semibold text-text-primary">{results.volumeLitres}L</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Bags to Buy</span>
                <span className="font-mono font-semibold text-text-primary">{results.bagsNeeded} x {bagSize}L</span>
              </div>

              <hr className="border-border" />

              <div className="space-y-2 text-sm">
                <p className="font-medium text-text-primary">Soil Mix Breakdown</p>
                {results.compostLitres > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Compost</span>
                    <span className="font-mono">{results.compostLitres}L</span>
                  </div>
                )}
                {results.topsoilLitres > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Topsoil</span>
                    <span className="font-mono">{results.topsoilLitres}L</span>
                  </div>
                )}
                {results.perliteLitres > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Perlite</span>
                    <span className="font-mono">{results.perliteLitres}L</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-1">Pro Tip</p>
              <p>Mix perlite in for better drainage. Add more compost for heavy feeders like tomatoes.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
