'use client';

import { useState, useMemo } from 'react';

const inputCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono';
const selectCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer';
const labelCls = 'text-[13px] font-medium text-text-secondary';

export default function BakeSaleCalculator() {
  const [attendees, setAttendees] = useState('50');
  const [itemsPerPerson, setItemsPerPerson] = useState('2');
  const [varietyCount, setVarietyCount] = useState('3');
  const [items, setItems] = useState([
    { id: 1, name: 'Chocolate brownies', batchYield: 24, ingredientCost: 4.50 },
    { id: 2, name: 'Lemon muffins', batchYield: 12, ingredientCost: 3.20 },
    { id: 3, name: 'Sugar cookies', batchYield: 36, ingredientCost: 2.80 },
  ]);

  const calculations = useMemo(() => {
    const total = parseInt(attendees) * parseInt(itemsPerPerson);
    const itemsNeeded = Math.ceil(total / parseInt(varietyCount));

    let totalIngredientCost = 0;
    const batchInfo = items.map((item) => {
      const batches = Math.ceil(itemsNeeded / item.batchYield);
      const cost = batches * item.ingredientCost;
      totalIngredientCost += cost;
      return { ...item, batches, cost };
    });

    const markupMultiplier = 4;
    const pricingOptions = [3, 4, 5].map((multiplier) => ({
      multiplier,
      pricePerItem: (totalIngredientCost / total / multiplier).toFixed(2),
      revenue: (total * (totalIngredientCost / total / multiplier)).toFixed(2),
      profit: (total * (totalIngredientCost / total / multiplier) - totalIngredientCost).toFixed(2),
    }));

    return {
      totalItemsNeeded: total,
      itemsPerVariety: itemsNeeded,
      totalIngredientCost,
      batchInfo,
      pricingOptions,
    };
  }, [attendees, itemsPerPerson, varietyCount, items]);

  const addItem = () => {
    const newId = Math.max(...items.map((i) => i.id), 0) + 1;
    setItems([...items, { id: newId, name: '', batchYield: 12, ingredientCost: 5 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel - Controls */}
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelCls}>Number of Attendees</label>
          <input
            type="number"
            min="1"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Items Per Person</label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.5"
            value={itemsPerPerson}
            onChange={(e) => setItemsPerPerson(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Variety Count</label>
          <input
            type="number"
            min="1"
            value={varietyCount}
            onChange={(e) => setVarietyCount(e.target.value)}
            className={inputCls}
          />
        </div>

        <hr className="border-border" />

        <div className="text-[12px] font-medium text-text-secondary uppercase mb-2">Items</div>
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="border border-border rounded-[var(--radius-card)] p-3 bg-surface">
              <input
                type="text"
                placeholder="Item name"
                value={item.name}
                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                className={inputCls + ' mb-2'}
              />
              <div className="flex gap-2 mb-2">
                <div className="flex-1">
                  <label className={labelCls + ' text-[11px]'}>Batch Yield</label>
                  <input
                    type="number"
                    min="1"
                    value={item.batchYield}
                    onChange={(e) => updateItem(item.id, 'batchYield', parseInt(e.target.value))}
                    className={inputCls}
                  />
                </div>
                <div className="flex-1">
                  <label className={labelCls + ' text-[11px]'}>Cost (£)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.10"
                    value={item.ingredientCost}
                    onChange={(e) => updateItem(item.id, 'ingredientCost', parseFloat(e.target.value))}
                    className={inputCls}
                  />
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="w-full text-[12px] text-text-muted hover:text-error px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="w-full px-3 py-2 text-[13px] rounded-[var(--radius-input)] bg-accent text-white hover:opacity-90 font-medium"
        >
          Add Item Type
        </button>
      </div>

      {/* Right Panel - Results */}
      <div className="flex flex-col gap-4">
        {/* Hero Banner */}
        <div className="p-6 rounded-[var(--radius-card)] bg-accent-muted border border-border">
          <p className="text-text-muted text-[12px] uppercase tracking-wide mb-2">Total Items Needed</p>
          <p className="font-heading text-4xl font-bold text-accent mb-4">
            {calculations.totalItemsNeeded}
          </p>
          <div className="grid grid-cols-2 gap-4 text-[13px]">
            <div>
              <p className="text-text-muted text-[11px] mb-1">Per variety</p>
              <p className="font-mono font-medium text-text-primary">{calculations.itemsPerVariety}</p>
            </div>
            <div>
              <p className="text-text-muted text-[11px] mb-1">Total cost</p>
              <p className="font-mono font-medium text-text-primary">£{calculations.totalIngredientCost.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Batch Requirements */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="bg-surface border-b border-border px-4 py-3">
            <p className="font-medium text-[13px] text-text-primary">Batches to Make</p>
          </div>
          <div className="divide-y divide-border">
            {calculations.batchInfo.map((item) => (
              <div key={item.id} className="px-4 py-3">
                <div className="flex justify-between mb-1">
                  <span className="text-[13px] text-text-primary font-medium">{item.name || '(unnamed)'}</span>
                  <span className="text-[13px] font-mono text-accent">{item.batches} batches</span>
                </div>
                <p className="text-[12px] text-text-muted">
                  £{item.ingredientCost.toFixed(2)} per batch = £{item.cost.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Options */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="bg-surface border-b border-border px-4 py-3">
            <p className="font-medium text-[13px] text-text-primary">Pricing Options</p>
          </div>
          <div className="divide-y divide-border">
            {calculations.pricingOptions.map((option, idx) => (
              <div key={idx} className="px-4 py-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[13px] text-text-secondary">
                    {option.multiplier}x markup ({option.multiplier === 3 ? 'budget-friendly' : option.multiplier === 4 ? 'standard' : 'premium'})
                  </span>
                  <span className="font-mono text-[13px] font-medium text-text-primary">£{option.pricePerItem} each</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] text-text-muted mb-0.5">Revenue</p>
                    <p className="font-mono text-[13px] font-medium text-text-primary">£{option.revenue}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-text-muted mb-0.5">Profit</p>
                    <p className="font-mono text-[13px] font-medium text-accent">£{option.profit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Per Item Summary */}
        <div className="p-4 rounded-[var(--radius-card)] bg-surface border border-border">
          <p className="text-[12px] text-text-muted mb-3">Cost breakdown per item</p>
          <div className="text-[13px] font-mono">
            <div className="flex justify-between mb-2">
              <span className="text-text-secondary">Total cost to make</span>
              <span className="text-text-primary">£{calculations.totalIngredientCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Divided across items</span>
              <span className="text-text-primary">{calculations.totalItemsNeeded}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-border flex justify-between font-medium">
              <span className="text-text-primary">Cost per item</span>
              <span className="text-accent">£{(calculations.totalIngredientCost / calculations.totalItemsNeeded).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
