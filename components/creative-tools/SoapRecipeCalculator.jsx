'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

const sapValues = {
  'coconut-oil': 0.186,
  'olive-oil': 0.134,
  'palm-oil': 0.141,
  'shea-butter': 0.128,
  'cocoa-butter': 0.137,
  'castor-oil': 0.129,
  'sweet-almond-oil': 0.136,
};

const sapLabels = {
  'coconut-oil': 'Coconut Oil',
  'olive-oil': 'Olive Oil',
  'palm-oil': 'Palm Oil',
  'shea-butter': 'Shea Butter',
  'cocoa-butter': 'Cocoa Butter',
  'castor-oil': 'Castor Oil',
  'sweet-almond-oil': 'Sweet Almond Oil',
};

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

export default function SoapRecipeCalculator() {
  const [oils, setOils] = useState({
    'coconut-oil': 200,
    'olive-oil': 300,
    'palm-oil': 200,
    'shea-butter': 100,
  });
  const [lyeType, setLyeType] = useState('naoh');
  const [superfat, setSuperfat] = useState('5');
  const [waterRatio, setWaterRatio] = useState('2');

  const lyeMolecularWeights = {
    naoh: 40.0, // Sodium Hydroxide (NaOH) for bar soap
    koh: 56.1,  // Potassium Hydroxide (KOH) for liquid soap
  };

  const calculation = useMemo(() => {
    const parseNum = (v) => parseFloat(v) || 0;

    // Total oil weight
    const totalOilWeight = Object.values(oils).reduce((sum, val) => sum + parseNum(val), 0);

    // Calculate lye needed
    let totalSapValue = 0;
    Object.entries(oils).forEach(([oil, weight]) => {
      const sap = sapValues[oil] || 0;
      totalSapValue += parseNum(weight) * sap;
    });

    // Apply superfat discount
    const superfatPercent = parseNum(superfat);
    const discountedSapValue = totalSapValue * ((100 - superfatPercent) / 100);

    // Convert SAP value to lye weight
    const lyeMolWeight = lyeMolecularWeights[lyeType];
    const lyeWeight = (discountedSapValue * lyeMolWeight) / 56.1; // 56.1 is standard SAP calculation constant

    // Water amount (lye to water ratio)
    const waterAmount = lyeWeight * parseNum(waterRatio);

    // Total batch weight (oils + lye + water)
    const totalBatchWeight = totalOilWeight + lyeWeight + waterAmount;

    return {
      oils: Object.entries(oils).reduce((acc, [oil, weight]) => ({
        ...acc,
        [oil]: parseNum(weight),
      }), {}),
      totalOilWeight: totalOilWeight.toFixed(1),
      lyeType: lyeType === 'naoh' ? 'NaOH' : 'KOH',
      lyeWeight: lyeWeight.toFixed(1),
      waterAmount: waterAmount.toFixed(1),
      totalBatchWeight: totalBatchWeight.toFixed(1),
      superfat: superfatPercent,
    };
  }, [oils, lyeType, superfat, waterRatio]);

  const updateOil = (oil, weight) => {
    setOils(prev => ({
      ...prev,
      [oil]: parseFloat(weight) || 0,
    }));
  };

  const addOil = () => {
    const oilKeys = Object.keys(oils);
    const allOils = Object.keys(sapValues);
    const unusedOil = allOils.find(o => !oilKeys.includes(o));
    if (unusedOil) {
      setOils(prev => ({
        ...prev,
        [unusedOil]: 100,
      }));
    }
  };

  const removeOil = (oil) => {
    setOils(prev => {
      const newOils = { ...prev };
      delete newOils[oil];
      return newOils;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Lye Type</h3>
          <select
            value={lyeType}
            onChange={(e) => setLyeType(e.target.value)}
            className={selectCls}
          >
            <option value="naoh">NaOH (Bar Soap)</option>
            <option value="koh">KOH (Liquid Soap)</option>
          </select>
        </div>

        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Recipe Settings</h3>
          <div className="mb-3">
            <label className="block text-[13px] font-medium text-text-secondary mb-2">
              Superfat: {parseFloat(superfat).toFixed(1)}%
            </label>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={superfat}
              onChange={(e) => setSuperfat(e.target.value)}
              className="w-full"
            />
            <p className="text-[11px] text-text-muted mt-1">Typical: 3-7%</p>
          </div>
          <div className="mb-3">
            <label htmlFor="waterRatio" className="block text-[13px] font-medium text-text-secondary mb-2">
              Water:Lye Ratio
            </label>
            <input
              id="waterRatio"
              type="number"
              value={waterRatio}
              onChange={(e) => setWaterRatio(e.target.value)}
              step="0.1"
              min="1"
              className={inputCls}
            />
          </div>
          <p className="text-[11px] text-text-muted mt-1">Default: 2.0</p>
        </div>

        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Oils & Butters</h3>
          <div className="space-y-2 mb-3">
            {Object.entries(oils).map(([oil, weight]) => (
              <div key={oil} className="flex gap-2 items-end">
                <div className="flex-1">
                  <label htmlFor={`oil-${oil}`} className="block text-[13px] font-medium text-text-secondary mb-2">
                    {sapLabels[oil]}
                  </label>
                  <input
                    id={`oil-${oil}`}
                    type="number"
                    value={weight}
                    onChange={(e) => updateOil(oil, e.target.value)}
                    step="10"
                    min="0"
                    className={inputCls}
                  />
                </div>
                <button
                  onClick={() => removeOil(oil)}
                  className="px-3 py-2 text-[12px] text-error hover:bg-error/10 rounded-[var(--radius-input)]"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {Object.keys(oils).length < Object.keys(sapValues).length && (
            <Button
              onClick={addOil}
              variant="secondary"
              className="w-full text-[12px]"
            >
              + Add Oil
            </Button>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Hero */}
        <div className="bg-accent-muted p-8 text-center rounded-[var(--radius-card)] border border-border">
          <p className="text-text-muted text-[12px] mb-4">Lye Required</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] text-text-muted mb-1">{calculation.lyeType}</p>
              <p className="font-mono text-3xl font-semibold text-accent">
                {calculation.lyeWeight}g
              </p>
            </div>
            <div>
              <p className="text-[11px] text-text-muted mb-1">Water</p>
              <p className="font-mono text-3xl font-semibold text-accent">
                {calculation.waterAmount}ml
              </p>
            </div>
          </div>
        </div>

        {/* Recipe Summary */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Batch Summary</h3>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Oils & Butters</span>
              <span className="font-mono">{calculation.totalOilWeight}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">{calculation.lyeType}</span>
              <span className="font-mono">{calculation.lyeWeight}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Water</span>
              <span className="font-mono">{calculation.waterAmount}ml</span>
            </div>
            <div className="border-t border-border my-2 pt-2 flex justify-between font-semibold">
              <span className="text-text-primary">Total Batch Weight</span>
              <span className="font-mono">{calculation.totalBatchWeight}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Superfat</span>
              <span className="font-mono">{calculation.superfat}%</span>
            </div>
          </div>
        </div>

        {/* Oil Breakdown */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Oil Breakdown</h3>
          <div className="space-y-2 text-[13px]">
            {Object.entries(calculation.oils).map(([oil, weight]) => (
              weight > 0 && (
                <div key={oil} className="flex justify-between">
                  <span className="text-text-secondary">{sapLabels[oil]}</span>
                  <span className="font-mono">
                    {weight.toFixed(0)}g ({((weight / calculation.totalOilWeight) * 100).toFixed(1)}%)
                  </span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Safety Warning */}
        <div className="bg-surface/50 border border-error/30 rounded-[var(--radius-card)] p-4">
          <h3 className="font-heading text-sm font-semibold text-error mb-2">Lye Safety</h3>
          <p className="text-[12px] text-text-secondary leading-relaxed">
            Lye is caustic and dangerous. Always wear gloves, eye protection, and work in a well-ventilated area. Never add water to lye; always add lye to water. Keep away from children and pets. For detailed instructions and safety protocols, consult experienced soaping resources.
          </p>
        </div>
      </div>
    </div>
  );
}
