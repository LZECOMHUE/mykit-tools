'use client';

import { useState, useMemo } from 'react';

const inputCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono';
const selectCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer';
const labelCls = 'text-[13px] font-medium text-text-secondary';

export default function PhotoPrintCostCalculator() {
  const [size, setSize] = useState('8x10');
  const [printType, setPrintType] = useState('standard');
  const [frame, setFrame] = useState('none');
  const [markup, setMarkup] = useState('80');

  const printCosts = {
    '6x4': { standard: 1.50, canvas: 8.00, metal: 12.00, acrylic: 10.00, fineArt: 5.00 },
    '7x5': { standard: 2.00, canvas: 10.00, metal: 14.00, acrylic: 12.00, fineArt: 6.00 },
    '8x10': { standard: 3.50, canvas: 18.00, metal: 22.00, acrylic: 20.00, fineArt: 12.00 },
    'A4': { standard: 4.00, canvas: 20.00, metal: 25.00, acrylic: 22.00, fineArt: 14.00 },
    'A3': { standard: 6.00, canvas: 28.00, metal: 35.00, acrylic: 32.00, fineArt: 20.00 },
    '12x12': { standard: 5.00, canvas: 25.00, metal: 30.00, acrylic: 28.00, fineArt: 16.00 },
    '16x20': { standard: 10.00, canvas: 45.00, metal: 55.00, acrylic: 50.00, fineArt: 30.00 },
    '20x30': { standard: 15.00, canvas: 65.00, metal: 80.00, acrylic: 75.00, fineArt: 45.00 },
  };

  const frameCosts = {
    none: 0,
    basic: 25.00,
    premium: 60.00,
  };

  const dpiGuide = {
    '6x4': 300,
    '7x5': 300,
    '8x10': 300,
    'A4': 300,
    'A3': 240,
    '12x12': 240,
    '16x20': 240,
    '20x30': 200,
  };

  const calculations = useMemo(() => {
    const printKey = printType === 'fineArt' ? 'fineArt' : printType === 'metal' ? 'metal' : printType === 'acrylic' ? 'acrylic' : printType === 'canvas' ? 'canvas' : 'standard';
    const printCost = printCosts[size]?.[printKey] || 5.00;
    const frameCost = frameCosts[frame] || 0;
    const totalCost = printCost + frameCost;
    const markupPercentage = parseFloat(markup) || 80;
    const sellingPrice = totalCost * (1 + markupPercentage / 100);
    const profit = sellingPrice - totalCost;

    return {
      printCost,
      frameCost,
      totalCost,
      sellingPrice,
      profit,
      profitPercentage: markupPercentage,
      requiredDPI: dpiGuide[size] || 300,
    };
  }, [size, printType, frame, markup]);

  const sizes = ['6x4', '7x5', '8x10', 'A4', 'A3', '12x12', '16x20', '20x30'];
  const printTypes = [
    { value: 'standard', label: 'Standard (glossy/matte)' },
    { value: 'canvas', label: 'Canvas' },
    { value: 'metal', label: 'Metal' },
    { value: 'acrylic', label: 'Acrylic' },
    { value: 'fineArt', label: 'Fine art paper' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel - Controls */}
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelCls}>Print Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className={selectCls}>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s} inches
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Print Type</label>
          <select value={printType} onChange={(e) => setPrintType(e.target.value)} className={selectCls}>
            {printTypes.map((pt) => (
              <option key={pt.value} value={pt.value}>
                {pt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Frame Option</label>
          <select value={frame} onChange={(e) => setFrame(e.target.value)} className={selectCls}>
            <option value="none">No frame</option>
            <option value="basic">Basic frame (£25)</option>
            <option value="premium">Premium frame (£60)</option>
          </select>
        </div>

        <hr className="border-border" />

        <div>
          <label className={labelCls}>Markup (%)</label>
          <input
            type="number"
            min="0"
            step="5"
            value={markup}
            onChange={(e) => setMarkup(e.target.value)}
            className={inputCls}
          />
          <p className="text-[11px] text-text-muted mt-1">Typical: 50-150%</p>
        </div>

        <hr className="border-border" />

        <div className="p-3 rounded-[var(--radius-card)] bg-surface border border-border">
          <p className="text-[12px] font-medium text-text-secondary mb-2">Resolution Check</p>
          <p className="text-[13px] font-mono text-text-primary">
            Needs \u2265 {calculations.requiredDPI} DPI
          </p>
          <p className="text-[11px] text-text-muted mt-2">
            Your image should be at least {Math.round(parseInt(size.split('x')[0]) * calculations.requiredDPI)} x {Math.round(parseInt(size.split('x')[1]) * calculations.requiredDPI)} pixels for print quality.
          </p>
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="flex flex-col gap-4">
        {/* Hero Banner */}
        <div className="p-4 rounded-[var(--radius-card)] bg-accent-muted border border-border">
          <p className="text-text-muted text-[12px] uppercase tracking-wide mb-2">Selling Price</p>
          <p className="font-heading text-4xl font-bold text-accent mb-2">
            £{calculations.sellingPrice.toFixed(2)}
          </p>
          <p className="text-[13px] text-text-secondary">
            Profit: £{calculations.profit.toFixed(2)} ({calculations.profitPercentage}% markup)
          </p>
        </div>

        {/* Cost Breakdown */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="bg-surface border-b border-border px-4 py-3">
            <p className="font-medium text-[13px] text-text-primary">Cost Breakdown</p>
          </div>
          <div className="divide-y divide-border">
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Print cost ({printType})</span>
              <span className="font-mono text-text-primary">£{calculations.printCost.toFixed(2)}</span>
            </div>
            {calculations.frameCost > 0 && (
              <div className="flex justify-between px-4 py-2 text-[13px]">
                <span className="text-text-secondary">Frame cost</span>
                <span className="font-mono text-text-primary">£{calculations.frameCost.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between px-4 py-3 text-[13px] bg-surface font-medium border-t border-border">
              <span className="text-text-primary">Total Cost</span>
              <span className="font-mono text-text-primary">£{calculations.totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Markup ({markup}%)</span>
              <span className="font-mono text-accent">£{calculations.profit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-3 text-[13px] bg-surface font-medium">
              <span className="text-text-primary">Selling Price</span>
              <span className="font-mono text-accent">£{calculations.sellingPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Print Type Comparison */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="bg-surface border-b border-border px-4 py-3">
            <p className="font-medium text-[13px] text-text-primary">Print Type Costs ({size})</p>
          </div>
          <div className="divide-y divide-border">
            {printTypes.map((pt) => {
              const ptKey = pt.value === 'fineArt' ? 'fineArt' : pt.value === 'metal' ? 'metal' : pt.value === 'acrylic' ? 'acrylic' : pt.value === 'canvas' ? 'canvas' : 'standard';
              const cost = printCosts[size]?.[ptKey] || 0;
              const salePrice = (cost + frameCosts[frame]) * (1 + parseFloat(markup) / 100);
              const isSelected = printType === pt.value;
              return (
                <div key={pt.value} className={`px-4 py-3 ${isSelected ? 'bg-accent-muted border-l-4 border-accent' : ''}`}>
                  <div className="flex justify-between mb-1">
                    <span className={`text-[13px] ${isSelected ? 'font-medium text-accent' : 'text-text-primary'}`}>
                      {pt.label}
                    </span>
                    <span className={`font-mono text-[13px] ${isSelected ? 'font-medium text-accent' : 'text-text-primary'}`}>
                      £{cost.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[12px] text-text-muted">
                    Sell at: £{salePrice.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Margin Visualization */}
        <div className="p-4 rounded-[var(--radius-card)] bg-surface border border-border">
          <p className="text-[13px] text-text-secondary mb-3">Profit Breakdown</p>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[12px] text-text-secondary">Cost</span>
                <span className="text-[12px] font-mono text-text-primary">{((calculations.totalCost / calculations.sellingPrice) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 rounded-full bg-border overflow-hidden">
                <div className="h-full bg-text-muted" style={{ width: `${(calculations.totalCost / calculations.sellingPrice) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[12px] text-text-secondary">Profit</span>
                <span className="text-[12px] font-mono text-accent">{((calculations.profit / calculations.sellingPrice) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 rounded-full bg-border overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${(calculations.profit / calculations.sellingPrice) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
