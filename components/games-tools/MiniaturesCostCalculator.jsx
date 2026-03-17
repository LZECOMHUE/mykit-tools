'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

export default function MiniaturesCostCalculator() {
  const [models, setModels] = useState([{ id: 1, name: 'Starter Set', modelsInBox: 10, boxPrice: 45 }]);
  const [paints, setPaints] = useState({ pots: 20, costPerPot: 3.50 });
  const [brushes, setBrushes] = useState({ count: 5, costEach: 5 });
  const [primers, setPrimers] = useState({ cans: 2, costEach: 8 });
  const [baseMaterialsCost, setBaseMaterialsCost] = useState(25);
  const [toolsCost, setToolsCost] = useState(40);
  const [hoursPerModel, setHoursPerModel] = useState(3);

  const calculations = useMemo(() => {
    const totalModels = models.reduce((sum, m) => sum + m.modelsInBox, 0);
    const modelsCost = models.reduce((sum, m) => sum + m.boxPrice, 0);

    const paintsCost = paints.pots * paints.costPerPot;
    const brushesCost = brushes.count * brushes.costEach;
    const primersCost = primers.cans * primers.costEach;

    const suppliesCost = paintsCost + brushesCost + primersCost + baseMaterialsCost + toolsCost;
    const totalCost = modelsCost + suppliesCost;
    const totalHours = totalModels * hoursPerModel;
    const costPerModel = totalModels > 0 ? (totalCost / totalModels).toFixed(2) : 0;

    return {
      totalModels,
      modelsCost: modelsCost.toFixed(2),
      paintsCost: paintsCost.toFixed(2),
      brushesCost: brushesCost.toFixed(2),
      primersCost: primersCost.toFixed(2),
      suppliesCost: suppliesCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
      totalHours,
      costPerModel,
    };
  }, [models, paints, brushes, primers, baseMaterialsCost, toolsCost, hoursPerModel]);

  const addModel = () => {
    setModels([...models, { id: Date.now(), name: '', modelsInBox: 0, boxPrice: 0 }]);
  };

  const updateModel = (id, field, value) => {
    setModels(models.map(m => m.id === id ? { ...m, [field]: field === 'name' ? value : parseFloat(value) || 0 } : m));
  };

  const removeModel = (id) => {
    setModels(models.filter(m => m.id !== id));
  };

  const modelsCostNum = parseFloat(calculations.modelsCost);
  const suppliesCostNum = parseFloat(calculations.suppliesCost);
  const supplyPercent = calculations.totalCost > 0 ? ((suppliesCostNum / parseFloat(calculations.totalCost)) * 100).toFixed(0) : 0;
  const modelsPercent = 100 - supplyPercent;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        {/* Models Section */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Model Kits</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {models.map(model => (
              <div key={model.id} className="space-y-1 pb-2 border-b border-border last:border-b-0">
                <input
                  type="text"
                  placeholder="Kit name"
                  value={model.name}
                  onChange={(e) => updateModel(model.id, 'name', e.target.value)}
                  className={inputCls}
                />
                <div className="grid grid-cols-2 gap-1">
                  <div>
                    <label className="text-[11px] text-text-muted">Models</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={model.modelsInBox || ''}
                      onChange={(e) => updateModel(model.id, 'modelsInBox', e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-text-muted">Price £</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={model.boxPrice || ''}
                      onChange={(e) => updateModel(model.id, 'boxPrice', e.target.value)}
                      className={inputCls}
                      step="0.01"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeModel(model.id)}
                  className="w-full text-[12px] text-error hover:text-error/80 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addModel}
            className="w-full text-[13px] font-medium py-2 rounded-[8px] border border-accent text-accent hover:bg-accent-muted"
          >
            + Add Kit
          </button>
        </div>

        {/* Paints */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Paints</h3>
          <div>
            <label className="text-[11px] text-text-muted">Number of Pots</label>
            <input
              type="number"
              value={paints.pots}
              onChange={(e) => setPaints({ ...paints, pots: parseFloat(e.target.value) || 0 })}
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-[11px] text-text-muted">Cost per Pot £</label>
            <input
              type="number"
              value={paints.costPerPot}
              onChange={(e) => setPaints({ ...paints, costPerPot: parseFloat(e.target.value) || 0 })}
              className={inputCls}
              step="0.01"
            />
          </div>
        </div>

        {/* Brushes */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Brushes</h3>
          <div>
            <label className="text-[11px] text-text-muted">Count</label>
            <input
              type="number"
              value={brushes.count}
              onChange={(e) => setBrushes({ ...brushes, count: parseFloat(e.target.value) || 0 })}
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-[11px] text-text-muted">Cost Each £</label>
            <input
              type="number"
              value={brushes.costEach}
              onChange={(e) => setBrushes({ ...brushes, costEach: parseFloat(e.target.value) || 0 })}
              className={inputCls}
              step="0.01"
            />
          </div>
        </div>

        {/* Primers */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Primers</h3>
          <div>
            <label className="text-[11px] text-text-muted">Cans</label>
            <input
              type="number"
              value={primers.cans}
              onChange={(e) => setPrimers({ ...primers, cans: parseFloat(e.target.value) || 0 })}
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-[11px] text-text-muted">Cost Each £</label>
            <input
              type="number"
              value={primers.costEach}
              onChange={(e) => setPrimers({ ...primers, costEach: parseFloat(e.target.value) || 0 })}
              className={inputCls}
              step="0.01"
            />
          </div>
        </div>

        {/* Base Materials & Tools */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Materials & Tools</h3>
          <div>
            <label className="text-[11px] text-text-muted">Basing Materials £</label>
            <input
              type="number"
              value={baseMaterialsCost}
              onChange={(e) => setBaseMaterialsCost(parseFloat(e.target.value) || 0)}
              className={inputCls}
              step="0.01"
            />
          </div>
          <div>
            <label className="text-[11px] text-text-muted">Tools (one-time) £</label>
            <input
              type="number"
              value={toolsCost}
              onChange={(e) => setToolsCost(parseFloat(e.target.value) || 0)}
              className={inputCls}
              step="0.01"
            />
          </div>
        </div>

        {/* Hours per Model */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <label className="text-[11px] text-text-muted">Hours to Paint per Model</label>
          <input
            type="number"
            value={hoursPerModel}
            onChange={(e) => setHoursPerModel(parseFloat(e.target.value) || 0)}
            className={inputCls}
            step="0.5"
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Hero */}
        <div className="bg-accent-muted rounded-[12px] p-6 space-y-2">
          <div className="text-[13px] text-text-secondary">Total Army Cost</div>
          <div className="font-heading font-bold text-[32px] text-text-primary">
            £{calculations.totalCost}
          </div>
          <div className="text-[13px] text-text-secondary space-y-1 pt-2 border-t border-border/40">
            <div>Models and Supplies: £{calculations.totalCost}</div>
            <div>Total Models: {calculations.totalModels}</div>
            <div>Total Painting Time: {calculations.totalHours} hours</div>
            <div>Cost per Model: £{calculations.costPerModel}</div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Cost Breakdown</h3>

          {/* Models vs Supplies Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Models</span>
              <span className="font-mono text-text-primary">£{calculations.modelsCost} ({modelsPercent}%)</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden flex">
              <div className="bg-accent" style={{ width: `${modelsPercent}%` }}></div>
              <div className="bg-warning" style={{ width: `${supplyPercent}%` }}></div>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Supplies</span>
              <span className="font-mono text-text-primary">£{calculations.suppliesCost} ({supplyPercent}%)</span>
            </div>
          </div>

          {/* Supplies Detail */}
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Paints</span>
              <span className="font-mono text-text-primary">£{calculations.paintsCost}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Brushes</span>
              <span className="font-mono text-text-primary">£{calculations.brushesCost}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Primers</span>
              <span className="font-mono text-text-primary">£{calculations.primersCost}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Base Materials</span>
              <span className="font-mono text-text-primary">£{baseMaterialsCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Tools</span>
              <span className="font-mono text-text-primary">£{toolsCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Summary</h3>
          <table className="w-full text-[13px]">
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-2 text-text-secondary">Total Models</td>
                <td className="py-2 text-right font-mono text-text-primary">{calculations.totalModels}</td>
              </tr>
              <tr>
                <td className="py-2 text-text-secondary">Models Cost</td>
                <td className="py-2 text-right font-mono text-text-primary">£{calculations.modelsCost}</td>
              </tr>
              <tr>
                <td className="py-2 text-text-secondary">Supplies Cost</td>
                <td className="py-2 text-right font-mono text-text-primary">£{calculations.suppliesCost}</td>
              </tr>
              <tr className="border-t-2 border-accent/30">
                <td className="py-2 text-text-primary font-medium">Total Cost</td>
                <td className="py-2 text-right font-mono font-bold text-text-primary text-[14px]">£{calculations.totalCost}</td>
              </tr>
              <tr>
                <td className="py-2 text-text-secondary">Cost per Model</td>
                <td className="py-2 text-right font-mono text-text-primary">£{calculations.costPerModel}</td>
              </tr>
              <tr>
                <td className="py-2 text-text-secondary">Total Paint Hours</td>
                <td className="py-2 text-right font-mono text-text-primary">{calculations.totalHours}h</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
