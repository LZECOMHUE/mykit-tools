'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

const presets = {
  beginner: {
    name: 'Beginner',
    items: {
      phb: { name: "Player's Handbook", price: 30, selected: true },
      dice: { name: 'Dice Set', price: 8, selected: true },
      pencils: { name: 'Pencils & Paper', price: 5, selected: true },
      dmg: { name: 'Dungeon Master Guide', price: 30, selected: false },
      mm: { name: 'Monster Manual', price: 30, selected: false },
      pdice: { name: 'Premium Dice', price: 25, selected: false },
      mini: { name: 'Miniature', price: 5, selected: false },
      dmscreen: { name: 'DM Screen', price: 15, selected: false },
      mat: { name: 'Battle Mat', price: 25, selected: false },
      markers: { name: 'Wet Erase Markers', price: 8, selected: false },
      terrain: { name: 'Terrain & Tiles', price: 50, selected: false },
      ddb: { name: 'D&D Beyond Sub', price: 30, selected: false, recurring: true },
    },
    recurring: 0,
  },
  intermediate: {
    name: 'Intermediate',
    items: {
      phb: { name: "Player's Handbook", price: 30, selected: true },
      dmg: { name: 'Dungeon Master Guide', price: 30, selected: true },
      mm: { name: 'Monster Manual', price: 30, selected: true },
      dice: { name: 'Dice Set', price: 8, selected: true },
      pdice: { name: 'Premium Dice', price: 25, selected: true },
      mini: { name: 'Miniature', price: 5, selected: true },
      dmscreen: { name: 'DM Screen', price: 15, selected: true },
      mat: { name: 'Battle Mat', price: 25, selected: true },
      markers: { name: 'Wet Erase Markers', price: 8, selected: true },
      terrain: { name: 'Terrain & Tiles', price: 50, selected: false },
      pencils: { name: 'Pencils & Paper', price: 5, selected: false },
      ddb: { name: 'D&D Beyond Sub', price: 30, selected: false, recurring: true },
    },
    recurring: 0,
  },
  collector: {
    name: 'Collector',
    items: {
      phb: { name: "Player's Handbook", price: 30, selected: true },
      dmg: { name: 'Dungeon Master Guide', price: 30, selected: true },
      mm: { name: 'Monster Manual', price: 30, selected: true },
      xanathar: { name: "Xanathar's Guide", price: 30, selected: true },
      tashas: { name: "Tasha's Cauldron", price: 30, selected: true },
      pdice: { name: 'Premium Dice', price: 25, selected: true },
      mini: { name: 'Miniatures (5)', price: 25, selected: true },
      dmscreen: { name: 'DM Screen', price: 15, selected: true },
      mat: { name: 'Battle Mat', price: 25, selected: true },
      markers: { name: 'Wet Erase Markers', price: 8, selected: true },
      terrain: { name: 'Terrain & Tiles', price: 50, selected: true },
      dice: { name: 'Standard Dice Set', price: 8, selected: true },
      ddb: { name: 'D&D Beyond Sub', price: 30, selected: true, recurring: true },
    },
    recurring: 30,
  },
};

export default function DndCostCalculator() {
  const [mode, setMode] = useState('beginner');
  const [items, setItems] = useState(presets[mode].items);
  const [sessionsPerYear, setSessionsPerYear] = useState(20);

  const loadPreset = (presetKey) => {
    setMode(presetKey);
    setItems(presets[presetKey].items);
  };

  const toggleItem = (itemKey) => {
    setItems(prev => ({
      ...prev,
      [itemKey]: { ...prev[itemKey], selected: !prev[itemKey].selected },
    }));
  };

  const updatePrice = (itemKey, newPrice) => {
    setItems(prev => ({
      ...prev,
      [itemKey]: { ...prev[itemKey], price: parseFloat(newPrice) || 0 },
    }));
  };

  const calculations = useMemo(() => {
    let oneTimeCost = 0;
    let recurringCost = 0;

    Object.entries(items).forEach(([key, item]) => {
      if (item.selected) {
        if (item.recurring) {
          recurringCost += item.price;
        } else {
          oneTimeCost += item.price;
        }
      }
    });

    const totalAnnual = oneTimeCost + recurringCost;
    const costPerSession = sessionsPerYear > 0 ? (totalAnnual / sessionsPerYear).toFixed(2) : 0;

    return {
      oneTimeCost: oneTimeCost.toFixed(2),
      recurringCost: recurringCost.toFixed(2),
      totalAnnual: totalAnnual.toFixed(2),
      costPerSession,
    };
  }, [items, sessionsPerYear]);

  const selectedItems = Object.entries(items).filter(([, item]) => item.selected);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        {/* Presets */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Presets</h3>
          <div className="space-y-2">
            {Object.entries(presets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                className={`w-full px-3 py-2 text-[13px] font-medium rounded-[8px] transition ${
                  mode === key
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:border-accent'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Items</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {Object.entries(items).map(([key, item]) => (
              <div key={key} className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleItem(key)}
                  className="mt-1.5 w-4 h-4 rounded border-border cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-text-primary font-medium">
                    {item.name}
                    {item.recurring && <span className="text-[10px] text-text-muted ml-1">(annual)</span>}
                  </div>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updatePrice(key, e.target.value)}
                    className={`${inputCls} text-[12px]`}
                    step="0.01"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sessions per Year */}
        <div className="bg-surface rounded-[12px] border border-border p-3 space-y-2">
          <label className="text-[11px] text-text-muted">Sessions per Year</label>
          <input
            type="number"
            value={sessionsPerYear}
            onChange={(e) => setSessionsPerYear(parseFloat(e.target.value) || 0)}
            className={inputCls}
          />
          <p className="text-[11px] text-text-muted">For cost per session calculation</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Hero */}
        <div className="bg-accent-muted rounded-[12px] p-6 space-y-2">
          <div className="text-[13px] text-text-secondary">First Year Cost</div>
          <div className="font-heading font-bold text-[32px] text-text-primary">
            £{calculations.totalAnnual}
          </div>
          <div className="text-[13px] text-text-secondary space-y-1 pt-2 border-t border-border/40">
            <div>One-Time: £{calculations.oneTimeCost}</div>
            <div>Annual Subscriptions: £{calculations.recurringCost}</div>
            <div>Cost per Session: £{calculations.costPerSession}</div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">Cost Breakdown</h3>

          <div className="space-y-2 divide-y divide-border">
            <div className="flex justify-between text-[13px] pb-2">
              <span className="text-text-secondary">One-Time Purchases</span>
              <span className="font-mono text-text-primary">£{calculations.oneTimeCost}</span>
            </div>
            <div className="flex justify-between text-[13px] py-2">
              <span className="text-text-secondary">Annual Subscriptions</span>
              <span className="font-mono text-text-primary">£{calculations.recurringCost}</span>
            </div>
            <div className="flex justify-between text-[13px] pt-2 font-bold">
              <span className="text-text-primary">Total (Year 1)</span>
              <span className="font-mono text-text-primary text-[14px]">£{calculations.totalAnnual}</span>
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-border">
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Sessions per Year</span>
              <span className="font-mono text-text-primary">{sessionsPerYear}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Cost per Session</span>
              <span className="font-mono text-text-primary">£{calculations.costPerSession}</span>
            </div>
          </div>
        </div>

        {/* Selected Items */}
        <div className="bg-surface rounded-[12px] border border-border p-4 space-y-3">
          <h3 className="font-heading font-bold text-[14px] text-text-primary">
            Selected Items ({selectedItems.length})
          </h3>
          <table className="w-full text-[13px]">
            <tbody className="divide-y divide-border">
              {selectedItems.map(([key, item]) => (
                <tr key={key}>
                  <td className="py-2 text-text-secondary">
                    {item.name}
                    {item.recurring && <span className="text-[10px] text-text-muted ml-1">/yr</span>}
                  </td>
                  <td className="py-2 text-right font-mono text-text-primary">£{item.price.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-accent/30">
                <td className="py-2 text-text-primary font-bold">Total</td>
                <td className="py-2 text-right font-mono font-bold text-text-primary">£{calculations.totalAnnual}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
