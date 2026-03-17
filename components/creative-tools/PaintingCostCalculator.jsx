'use client';

import { useState, useMemo } from 'react';

const inputCls = 'w-full px-3 py-2 border border-border rounded-[8px] text-[13px] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';
const selectCls = 'w-full px-3 py-2 border border-border rounded-[8px] text-[13px] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent bg-white cursor-pointer';
const cardCls = 'bg-white border border-border rounded-[var(--radius-card)] p-4';

const canvasSizePresets = {
  'a4': { width: 21, height: 29.7, label: 'A4 (21x29.7cm)' },
  'a3': { width: 29.7, height: 42, label: 'A3 (29.7x42cm)' },
  '60x80': { width: 60, height: 80, label: '60x80cm' },
  '80x100': { width: 80, height: 100, label: '80x100cm' },
  'custom': { width: null, height: null, label: 'Custom' },
};

const paintCosts = {
  acrylic: 8.50,
  oil: 15.00,
  watercolour: 12.00,
};

export default function PaintingCostCalculator() {
  const [canvasPreset, setCanvasPreset] = useState('a3');
  const [customWidth, setCustomWidth] = useState('60');
  const [customHeight, setCustomHeight] = useState('80');
  const [canvasCost, setCanvasCost] = useState('25');
  const [paintType, setPaintType] = useState('acrylic');
  const [paintCost, setPaintCost] = useState('60');
  const [brushWear, setBrushWear] = useState('15');
  const [varnishCost, setVarnishCost] = useState('8');
  const [framingCost, setFramingCost] = useState('40');
  const [hours, setHours] = useState('10');
  const [hourlyRate, setHourlyRate] = useState('25');
  const [markup, setMarkup] = useState('50');

  const preset = canvasSizePresets[canvasPreset];
  const width = canvasPreset === 'custom' ? parseFloat(customWidth) || 0 : preset.width;
  const height = canvasPreset === 'custom' ? parseFloat(customHeight) || 0 : preset.height;

  const calculation = useMemo(() => {
    const parseNum = (v) => parseFloat(v) || 0;

    const materials = parseNum(canvasCost) + parseNum(paintCost) + parseNum(brushWear) + parseNum(varnishCost) + parseNum(framingCost);
    const labour = parseNum(hours) * parseNum(hourlyRate);
    const totalCost = materials + labour;
    const markupAmount = totalCost * (parseNum(markup) / 100);
    const sellingPrice = totalCost + markupAmount;

    return {
      materials: materials.toFixed(2),
      labour: labour.toFixed(2),
      totalCost: totalCost.toFixed(2),
      markupAmount: markupAmount.toFixed(2),
      sellingPrice: sellingPrice.toFixed(2),
      margin: ((markupAmount / sellingPrice) * 100).toFixed(1),
    };
  }, [canvasCost, paintCost, brushWear, varnishCost, framingCost, hours, hourlyRate, markup]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel - Inputs */}
      <div className="space-y-4">
        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Canvas Size</h3>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Size Preset</label>
            <select
              className={selectCls}
              value={canvasPreset}
              onChange={(e) => setCanvasPreset(e.target.value)}
            >
              {Object.entries(canvasSizePresets).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>

          {canvasPreset === 'custom' && (
            <>
              <div className="mt-3">
                <label className="text-[13px] text-text-secondary mb-1 block">Width (cm)</label>
                <input
                  className={inputCls}
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  placeholder="60"
                />
              </div>
              <div className="mt-3">
                <label className="text-[13px] text-text-secondary mb-1 block">Height (cm)</label>
                <input
                  className={inputCls}
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  placeholder="80"
                />
              </div>
            </>
          )}
        </div>

        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Materials</h3>
          <div className="mt-3">
            <label className="text-[13px] text-text-secondary mb-1 block">Canvas Cost ({'\u00a3'})</label>
            <input
              className={inputCls}
              type="number"
              value={canvasCost}
              onChange={(e) => setCanvasCost(e.target.value)}
              step="0.01"
            />
          </div>
          <div className="mt-3">
            <label className="text-[13px] text-text-secondary mb-1 block">Paint Type</label>
            <select
              className={selectCls}
              value={paintType}
              onChange={(e) => setPaintType(e.target.value)}
            >
              <option value="acrylic">Acrylic</option>
              <option value="oil">Oil</option>
              <option value="watercolour">Watercolour</option>
            </select>
          </div>
          <div className="mt-3">
            <label className="text-[13px] text-text-secondary mb-1 block">Paint Cost ({'\u00a3'})</label>
            <input
              className={inputCls}
              type="number"
              value={paintCost}
              onChange={(e) => setPaintCost(e.target.value)}
              step="0.01"
            />
          </div>
          <div className="mt-3">
            <label className="text-[13px] text-text-secondary mb-1 block">Brush Wear ({'\u00a3'})</label>
            <input
              className={inputCls}
              type="number"
              value={brushWear}
              onChange={(e) => setBrushWear(e.target.value)}
              step="0.01"
            />
          </div>
          <div className="mt-3">
            <label className="text-[13px] text-text-secondary mb-1 block">Varnish ({'\u00a3'})</label>
            <input
              className={inputCls}
              type="number"
              value={varnishCost}
              onChange={(e) => setVarnishCost(e.target.value)}
              step="0.01"
            />
          </div>
          <div className="mt-3">
            <label className="text-[13px] text-text-secondary mb-1 block">Framing ({'\u00a3'})</label>
            <input
              className={inputCls}
              type="number"
              value={framingCost}
              onChange={(e) => setFramingCost(e.target.value)}
              step="0.01"
            />
          </div>
        </div>

        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Labour & Markup</h3>
          <div className="mt-3">
            <label className="text-[13px] text-text-secondary mb-1 block">Hours Spent</label>
            <input
              className={inputCls}
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              step="0.5"
            />
          </div>
          <div className="mt-3">
            <label className="text-[13px] text-text-secondary mb-1 block">Hourly Rate ({'\u00a3'})</label>
            <input
              className={inputCls}
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              step="1"
            />
          </div>
          <div className="mt-3">
            <label className="text-[13px] text-text-secondary mb-1 block">Markup %</label>
            <input
              className={inputCls}
              type="number"
              value={markup}
              onChange={(e) => setMarkup(e.target.value)}
              step="1"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="space-y-4">
        {/* Hero Card */}
        <div className="bg-accent-muted p-8 text-center rounded-[var(--radius-card)]">
          <p className="text-text-muted text-[13px] mb-2">Suggested Selling Price</p>
          <p className="font-mono text-4xl font-semibold text-accent mb-1">
            {'\u00a3'}{calculation.sellingPrice}
          </p>
          <p className="text-text-muted text-[13px]">
            {calculation.margin}% margin
          </p>
        </div>

        {/* Breakdown Table */}
        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Cost Breakdown</h3>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-text-secondary">Canvas</span>
              <span className="font-mono">{'\u00a3'}{parseFloat(canvasCost).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Paint & Materials</span>
              <span className="font-mono">{'\u00a3'}{(parseFloat(paintCost) + parseFloat(brushWear) + parseFloat(varnishCost)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Framing</span>
              <span className="font-mono">{'\u00a3'}{parseFloat(framingCost).toFixed(2)}</span>
            </div>
            <div className="border-t border-border my-2 pt-2 flex justify-between font-semibold">
              <span className="text-text-primary">Total Materials</span>
              <span className="font-mono">{'\u00a3'}{calculation.materials}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Labour ({hours}h @ {'\u00a3'}{hourlyRate}/h)</span>
              <span className="font-mono">{'\u00a3'}{calculation.labour}</span>
            </div>
            <div className="border-t border-border my-2 pt-2 flex justify-between font-semibold">
              <span className="text-text-primary">Total Cost</span>
              <span className="font-mono">{'\u00a3'}{calculation.totalCost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Markup ({markup}%)</span>
              <span className="font-mono text-accent">{'\u00a3'}{calculation.markupAmount}</span>
            </div>
          </div>
        </div>

        {/* Canvas Info */}
        {width > 0 && height > 0 && (
          <div className={cardCls}>
            <p className="text-[13px] text-text-secondary">
              Canvas size: {width}cm × {height}cm ({(width * height).toFixed(0)}cm²)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
