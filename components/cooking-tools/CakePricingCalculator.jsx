'use client';

import { useState, useMemo } from 'react';

const inputCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono';
const selectCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer';
const labelCls = 'text-[13px] font-medium text-text-secondary';

export default function CakePricingCalculator() {
  const [size, setSize] = useState('8');
  const [layers, setLayers] = useState('2');
  const [sponge, setSponge] = useState('vanilla');
  const [filling, setFilling] = useState('buttercream');
  const [covering, setCovering] = useState('buttercream');
  const [complexity, setComplexity] = useState('moderate');
  const [decoratingHours, setDecoratingHours] = useState('2');
  const [ingredientCost, setIngredientCost] = useState('8.00');
  const [deliveryDistance, setDeliveryDistance] = useState('5');
  const [mileageRate, setMileageRate] = useState('0.45');

  const calculations = useMemo(() => {
    const ing = parseFloat(ingredientCost) || 0;
    const hours = parseFloat(decoratingHours) || 0;
    const distance = parseFloat(deliveryDistance) || 0;
    const mileage = parseFloat(mileageRate) || 0.45;

    const labourRate = 25;
    const overhead = 0.1;

    const labour = hours * labourRate;
    const delivery = distance > 0 ? distance * 2 * mileage : 0;
    const totalCost = ing + labour + delivery;
    const overheadCost = totalCost * overhead;
    const costWithOverhead = totalCost + overheadCost;
    const markup = costWithOverhead * 0.5;
    const sellingPrice = costWithOverhead + markup;

    return {
      ingredientCost: ing,
      labour,
      delivery,
      overhead: overheadCost,
      totalCost: costWithOverhead,
      markup,
      sellingPrice,
    };
  }, [ingredientCost, decoratingHours, deliveryDistance, mileageRate]);

  const marketRates = {
    '6': { simple: '£30-45', moderate: '£45-65', elaborate: '£65-100', sculpted: '£100+' },
    '8': { simple: '£40-60', moderate: '£60-90', elaborate: '£90-140', sculpted: '£140+' },
    '10': { simple: '£60-90', moderate: '£90-130', elaborate: '£130-180', sculpted: '£180+' },
    '12': { simple: '£80-120', moderate: '£120-170', elaborate: '£170-250', sculpted: '£250+' },
    tiered: { simple: '£150-250', moderate: '£250-400', elaborate: '£400-600', sculpted: '£600+' },
  };

  const sizeKey = size === 'tiered' ? 'tiered' : size;
  const marketRate = marketRates[sizeKey]?.[complexity] || '—';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel - Controls */}
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelCls}>Cake Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className={selectCls}>
            <option value="6">6-inch round</option>
            <option value="8">8-inch round</option>
            <option value="10">10-inch round</option>
            <option value="12">12-inch round</option>
            <option value="tiered">Tiered (multi-layer)</option>
          </select>
        </div>

        {size === 'tiered' && (
          <div>
            <label className={labelCls}>Number of Layers</label>
            <input
              type="number"
              min="2"
              max="6"
              value={layers}
              onChange={(e) => setLayers(e.target.value)}
              className={inputCls}
            />
          </div>
        )}

        <div>
          <label className={labelCls}>Sponge Type</label>
          <select value={sponge} onChange={(e) => setSponge(e.target.value)} className={selectCls}>
            <option value="vanilla">Vanilla</option>
            <option value="chocolate">Chocolate</option>
            <option value="lemon">Lemon</option>
            <option value="carrot">Carrot cake</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Filling Type</label>
          <select value={filling} onChange={(e) => setFilling(e.target.value)} className={selectCls}>
            <option value="buttercream">Buttercream</option>
            <option value="ganache">Chocolate ganache</option>
            <option value="jam">Jam + cream</option>
            <option value="curd">Lemon/passion fruit curd</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Covering</label>
          <select value={covering} onChange={(e) => setCovering(e.target.value)} className={selectCls}>
            <option value="buttercream">Buttercream</option>
            <option value="fondant">Fondant</option>
            <option value="naked">Naked (crumb-coated)</option>
            <option value="choux">Choux buns tower</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Complexity</label>
          <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className={selectCls}>
            <option value="simple">Simple (plain frosted)</option>
            <option value="moderate">Moderate (piped borders, flowers)</option>
            <option value="elaborate">Elaborate (tiered, figurines, sculpting)</option>
            <option value="sculpted">Sculpted (3D character, detailed work)</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Decorating Hours</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={decoratingHours}
            onChange={(e) => setDecoratingHours(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Ingredient Cost (£)</label>
          <input
            type="number"
            min="0"
            step="0.50"
            value={ingredientCost}
            onChange={(e) => setIngredientCost(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Delivery Distance (miles)</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={deliveryDistance}
            onChange={(e) => setDeliveryDistance(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Mileage Rate (£/mile)</label>
          <input
            type="number"
            min="0"
            step="0.05"
            value={mileageRate}
            onChange={(e) => setMileageRate(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="flex flex-col gap-4">
        {/* Hero Banner */}
        <div className="p-4 rounded-[var(--radius-card)] bg-accent-muted border border-border">
          <p className="text-text-muted text-[12px] uppercase tracking-wide mb-2">Suggested Selling Price</p>
          <p className="font-heading text-4xl font-bold text-accent mb-2">
            £{calculations.sellingPrice.toFixed(2)}
          </p>
          <p className="text-[13px] text-text-secondary">
            Market rate: {marketRate}
          </p>
        </div>

        {/* Cost Breakdown Table */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="bg-surface border-b border-border px-4 py-3">
            <p className="font-medium text-[13px] text-text-primary">Cost Breakdown</p>
          </div>
          <div className="divide-y divide-border">
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Ingredients</span>
              <span className="font-mono text-text-primary">£{calculations.ingredientCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Labour ({decoratingHours}h @ £25/h)</span>
              <span className="font-mono text-text-primary">£{calculations.labour.toFixed(2)}</span>
            </div>
            {calculations.delivery > 0 && (
              <div className="flex justify-between px-4 py-2 text-[13px]">
                <span className="text-text-secondary">Delivery</span>
                <span className="font-mono text-text-primary">£{calculations.delivery.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Overhead (10%)</span>
              <span className="font-mono text-text-primary">£{calculations.overhead.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-3 text-[13px] bg-surface font-medium border-t border-border">
              <span className="text-text-primary">Total Cost</span>
              <span className="font-mono text-text-primary">£{calculations.totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Markup (50%)</span>
              <span className="font-mono text-accent">£{calculations.markup.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-3 text-[13px] bg-surface font-medium">
              <span className="text-text-primary">Selling Price</span>
              <span className="font-mono text-accent">£{calculations.sellingPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Profit Margin */}
        <div className="p-4 rounded-[var(--radius-card)] bg-surface border border-border">
          <p className="text-[13px] text-text-secondary mb-2">Profit Margin</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-accent"
                style={{ width: `${Math.min(100, (calculations.markup / calculations.totalCost) * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[13px] font-medium text-accent">
              {((calculations.markup / calculations.totalCost) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
