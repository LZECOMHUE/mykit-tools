'use client';

import { useState, useMemo } from 'react';

const inputCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono';
const selectCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer';
const labelCls = 'text-[13px] font-medium text-text-secondary';

export default function RecipeCostCalculator() {
  const [servings, setServings] = useState('24');
  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Flour', quantity: 200, unit: 'g', costPerPack: 1.20, packSize: 1000 },
    { id: 2, name: 'Butter', quantity: 100, unit: 'g', costPerPack: 2.50, packSize: 250 },
    { id: 3, name: 'Sugar', quantity: 150, unit: 'g', costPerPack: 0.80, packSize: 1000 },
    { id: 4, name: 'Eggs', quantity: 2, unit: 'each', costPerPack: 2.40, packSize: 6 },
  ]);

  const units = ['g', 'kg', 'ml', 'L', 'tsp', 'tbsp', 'each', 'oz', 'lb', 'cup'];

  const calculations = useMemo(() => {
    let totalRecipeCost = 0;
    const ingredientBreakdown = ingredients.map((ing) => {
      let cost = 0;
      if (['g', 'kg', 'ml', 'L', 'oz', 'lb'].includes(ing.unit)) {
        let quantityInPackUnits = ing.quantity;
        if (ing.unit === 'kg') quantityInPackUnits = ing.quantity * 1000;
        if (ing.unit === 'L') quantityInPackUnits = ing.quantity * 1000;
        if (ing.unit === 'oz') quantityInPackUnits = ing.quantity * 28.35;
        if (ing.unit === 'lb') quantityInPackUnits = ing.quantity * 453.59;

        cost = (quantityInPackUnits / ing.packSize) * ing.costPerPack;
      } else {
        cost = (ing.quantity / ing.packSize) * ing.costPerPack;
      }
      totalRecipeCost += cost;
      return { ...ing, cost };
    });

    const costPerServing = totalRecipeCost / parseInt(servings);

    return {
      ingredients: ingredientBreakdown,
      totalCost: totalRecipeCost,
      costPerServing,
    };
  }, [ingredients, servings]);

  const addIngredient = () => {
    const newId = Math.max(...ingredients.map((i) => i.id), 0) + 1;
    setIngredients([
      ...ingredients,
      { id: newId, name: '', quantity: 100, unit: 'g', costPerPack: 2.00, packSize: 500 },
    ]);
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((i) => i.id !== id));
  };

  const updateIngredient = (id, field, value) => {
    setIngredients(
      ingredients.map((i) => (i.id === id ? { ...i, [field]: field === 'quantity' || field === 'packSize' || field === 'costPerPack' ? parseFloat(value) : value } : i))
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel - Controls */}
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelCls}>Number of Servings</label>
          <input
            type="number"
            min="1"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className={inputCls}
          />
        </div>

        <hr className="border-border" />

        <div className="text-[12px] font-medium text-text-secondary uppercase mb-2">Ingredients</div>
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
          {ingredients.map((ing) => (
            <div key={ing.id} className="border border-border rounded-[var(--radius-card)] p-3 bg-surface">
              <input
                type="text"
                placeholder="Ingredient name"
                value={ing.name}
                onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                className={inputCls + ' mb-2'}
              />

              <div className="flex gap-2 mb-2">
                <div className="flex-1">
                  <label className={labelCls + ' text-[11px]'}>Qty</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={ing.quantity}
                    onChange={(e) => updateIngredient(ing.id, 'quantity', e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div className="flex-1">
                  <label className={labelCls + ' text-[11px]'}>Unit</label>
                  <select
                    value={ing.unit}
                    onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
                    className={selectCls}
                  >
                    {units.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mb-2">
                <div className="flex-1">
                  <label className={labelCls + ' text-[11px]'}>Pack Cost (£)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.10"
                    value={ing.costPerPack}
                    onChange={(e) => updateIngredient(ing.id, 'costPerPack', e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div className="flex-1">
                  <label className={labelCls + ' text-[11px]'}>Pack Size</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={ing.packSize}
                    onChange={(e) => updateIngredient(ing.id, 'packSize', e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <button
                onClick={() => removeIngredient(ing.id)}
                className="w-full text-[12px] text-text-muted hover:text-error px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addIngredient}
          className="w-full px-3 py-2 text-[13px] rounded-[var(--radius-input)] bg-accent text-white hover:opacity-90 font-medium"
        >
          Add Ingredient
        </button>
      </div>

      {/* Right Panel - Results */}
      <div className="flex flex-col gap-4">
        {/* Hero Banner */}
        <div className="p-6 rounded-[var(--radius-card)] bg-accent-muted border border-border">
          <p className="text-text-muted text-[12px] uppercase tracking-wide mb-2">Cost Per Serving</p>
          <p className="font-heading text-4xl font-bold text-accent mb-2">
            £{calculations.costPerServing.toFixed(2)}
          </p>
          <p className="text-[13px] text-text-secondary">
            Total recipe: £{calculations.totalCost.toFixed(2)} for {servings} servings
          </p>
        </div>

        {/* Ingredient Breakdown Table */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="bg-surface border-b border-border px-4 py-3">
            <p className="font-medium text-[13px] text-text-primary">Ingredient Costs</p>
          </div>
          <div className="divide-y divide-border max-h-80 overflow-y-auto">
            {calculations.ingredients.map((ing) => (
              <div key={ing.id} className="px-4 py-3">
                <div className="flex justify-between mb-1">
                  <span className="text-[13px] text-text-primary font-medium">{ing.name || '(unnamed)'}</span>
                  <span className="text-[13px] font-mono text-accent">£{ing.cost.toFixed(2)}</span>
                </div>
                <p className="text-[12px] text-text-muted">
                  {ing.quantity} {ing.unit} from £{ing.costPerPack.toFixed(2)}/{ing.packSize} pack
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="bg-surface border-b border-border px-4 py-3">
            <p className="font-medium text-[13px] text-text-primary">Recipe Summary</p>
          </div>
          <div className="divide-y divide-border">
            <div className="flex justify-between px-4 py-3 text-[13px]">
              <span className="text-text-secondary">Total ingredients cost</span>
              <span className="font-mono text-text-primary">£{calculations.totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-3 text-[13px]">
              <span className="text-text-secondary">Number of servings</span>
              <span className="font-mono text-text-primary">{servings}</span>
            </div>
            <div className="flex justify-between px-4 py-3 text-[13px] bg-surface font-medium">
              <span className="text-text-primary">Cost per serving</span>
              <span className="font-mono text-accent">£{calculations.costPerServing.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Cost Visualization */}
        <div className="p-4 rounded-[var(--radius-card)] bg-surface border border-border">
          <p className="text-[12px] text-text-muted mb-3">Top 3 most expensive ingredients</p>
          <div className="flex flex-col gap-2">
            {calculations.ingredients
              .sort((a, b) => b.cost - a.cost)
              .slice(0, 3)
              .map((ing, idx) => (
                <div key={ing.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[12px] text-text-primary">{ing.name}</span>
                    <span className="text-[12px] font-mono text-text-secondary">{((ing.cost / calculations.totalCost) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${(ing.cost / calculations.totalCost) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
