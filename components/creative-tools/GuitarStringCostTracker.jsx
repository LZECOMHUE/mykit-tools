'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

export default function GuitarStringCostTracker() {
  const [guitars, setGuitars] = useState('3');
  const [setCost, setSetCost] = useState('8.50');
  const [changeFrequency, setChangeFrequency] = useState('4');

  const results = useMemo(() => {
    const g = parseFloat(guitars) || 0;
    const sc = parseFloat(setCost) || 0;
    const freq = parseFloat(changeFrequency) || 0;

    if (g <= 0 || sc <= 0 || freq <= 0) return null;

    const setsPerYear = 52 / freq;
    const annualCost = (g * setsPerYear * sc).toFixed(2);
    const monthlyCost = (parseFloat(annualCost) / 12).toFixed(2);

    return {
      setsPerYear: setsPerYear.toFixed(1),
      annualCost,
      monthlyCost,
    };
  }, [guitars, setCost, changeFrequency]);

  const fmt = (n) => '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
        {/* Left Panel */}
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Number of Guitars</label>
            <input type="number" value={guitars} onChange={(e) => setGuitars(e.target.value)} min="1" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Cost per String Set</label>
            <div className="flex gap-2 items-center">
              <span className="text-text-secondary text-[13px]">£</span>
              <input type="number" value={setCost} onChange={(e) => setSetCost(e.target.value)} min="0" step="0.50" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Change Frequency</label>
            <select value={changeFrequency} onChange={(e) => setChangeFrequency(e.target.value)} className={selectCls}>
              <option value="2">Every 2 weeks</option>
              <option value="4">Every 4 weeks</option>
              <option value="6">Every 6 weeks</option>
              <option value="8">Every 8 weeks</option>
              <option value="12">Every 12 weeks</option>
            </select>
          </div>
        </div>

        {/* Right Panel */}
        {results && (
          <div className="bg-accent-muted border border-border rounded-lg space-y-5">
            <div>
              <h3 className="text-text-secondary text-[13px] font-medium mb-2">Annual String Cost</h3>
              <p className="font-mono text-5xl font-bold text-accent">{fmt(results.annualCost)}</p>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Monthly Cost</span>
                <span className="font-mono text-lg font-semibold text-text-primary">{fmt(results.monthlyCost)}</span>
              </div>

              <hr className="border-border" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Sets per Year</span>
                  <span className="font-mono">{results.setsPerYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Cost per Set</span>
                  <span className="font-mono">{fmt(setCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Guitars</span>
                  <span className="font-mono">{guitars}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-1">Quick Fact</p>
              <p>You spend {fmt(results.annualCost)}/year on guitar strings across {guitars} guitars. That's roughly {fmt((parseFloat(results.annualCost) / guitars).toFixed(2))} per guitar per year.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
