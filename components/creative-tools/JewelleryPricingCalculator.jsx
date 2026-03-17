'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";
const cardCls = "bg-white border border-border rounded-[var(--radius-card)] p-4";

export default function JewelleryPricingCalculator() {
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Beads', qty: 20, cost: 0.50 },
    { id: 2, name: 'Wire', qty: 1, cost: 2.00 },
    { id: 3, name: 'Clasp', qty: 1, cost: 1.50 },
  ]);
  const [timeMins, setTimeMins] = useState('45');
  const [hourlyRate, setHourlyRate] = useState('20');
  const [packaging, setPackaging] = useState('0.75');
  const [marketplace, setMarketplace] = useState('etsy');
  const [customFee, setCustomFee] = useState('');
  const [postage, setPostage] = useState('3.50');
  const [markup, setMarkup] = useState('40');
  const [nextId, setNextId] = useState(4);

  const calculation = useMemo(() => {
    const parseNum = (v) => parseFloat(v) || 0;

    // Materials cost
    const materialsCost = materials.reduce((sum, m) => {
      return sum + (parseNum(m.qty) * parseNum(m.cost));
    }, 0);

    // Labour
    const labourHours = parseNum(timeMins) / 60;
    const labourCost = labourHours * parseNum(hourlyRate);

    // Fees
    let feesPercent = 12.5; // Etsy default
    if (marketplace === 'ebay') feesPercent = 12.9;
    if (marketplace === 'folksy') feesPercent = 6.5;
    if (marketplace === 'custom') feesPercent = parseNum(customFee) || 0;

    // Subtotal before fees
    const subtotal = materialsCost + labourCost + parseNum(packaging) + parseNum(postage);

    // Fee amount (calculated on subtotal + intended profit)
    // This is approximate - actual fees depend on selling price
    const estimatedFees = (subtotal * feesPercent) / 100;

    // Total cost
    const totalCost = subtotal + estimatedFees;

    // Minimum selling price (cost + small margin)
    const minPrice = totalCost * 1.1;

    // Suggested price with markup
    const markupAmount = totalCost * (parseNum(markup) / 100);
    const suggestedPrice = totalCost + markupAmount;

    // Profit at suggested price
    const profit = suggestedPrice - totalCost;
    const profitMargin = (profit / suggestedPrice) * 100;

    return {
      materialsCost: materialsCost.toFixed(2),
      labourCost: labourCost.toFixed(2),
      packaging: parseNum(packaging).toFixed(2),
      postage: parseNum(postage).toFixed(2),
      feesPercent: feesPercent.toFixed(1),
      estimatedFees: estimatedFees.toFixed(2),
      totalCost: totalCost.toFixed(2),
      minPrice: minPrice.toFixed(2),
      suggestedPrice: suggestedPrice.toFixed(2),
      profit: profit.toFixed(2),
      profitMargin: profitMargin.toFixed(1),
    };
  }, [materials, timeMins, hourlyRate, packaging, marketplace, customFee, postage, markup]);

  const addMaterial = () => {
    setMaterials([...materials, { id: nextId, name: '', qty: 1, cost: 0 }]);
    setNextId(nextId + 1);
  };

  const removeMaterial = (id) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const updateMaterial = (id, field, value) => {
    setMaterials(materials.map(m =>
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Materials</h3>
          <div className="space-y-2 mb-3">
            {materials.map((material) => (
              <div key={material.id} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={material.name}
                    onChange={(e) => updateMaterial(material.id, 'name', e.target.value)}
                    placeholder="Material name"
                    className="flex-1 px-3 py-2 text-[13px] rounded-[var(--radius-input)] border border-border bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
                  />
                  <button
                    onClick={() => removeMaterial(material.id)}
                    className="px-2 py-2 text-[12px] text-error hover:bg-error/10 rounded-[var(--radius-input)]"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={material.qty}
                    onChange={(e) => updateMaterial(material.id, 'qty', e.target.value)}
                    placeholder="Qty"
                    min="1"
                    className="px-3 py-2 text-[13px] rounded-[var(--radius-input)] border border-border bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
                  />
                  <input
                    type="number"
                    value={material.cost}
                    onChange={(e) => updateMaterial(material.id, 'cost', e.target.value)}
                    placeholder="Cost each"
                    step="0.01"
                    className="px-3 py-2 text-[13px] rounded-[var(--radius-input)] border border-border bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addMaterial}
            className="w-full px-3 py-2 text-[12px] font-medium rounded-[var(--radius-input)] border border-border bg-white text-text-primary hover:bg-surface-hover transition-colors"
          >
            + Add Material
          </button>
        </div>

        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Labour & Costs</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-[12px] font-medium text-text-secondary mb-1">Time to Make (mins)</label>
              <input
                type="number"
                value={timeMins}
                onChange={(e) => setTimeMins(e.target.value)}
                step="5"
                min="5"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-text-secondary mb-1">Hourly Rate (£)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                step="1"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-text-secondary mb-1">Packaging Cost (£)</label>
              <input
                type="number"
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                step="0.01"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-text-secondary mb-1">Postage Cost (£)</label>
              <input
                type="number"
                value={postage}
                onChange={(e) => setPostage(e.target.value)}
                step="0.01"
                className={inputCls}
              />
            </div>
          </div>
        </div>

        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Marketplace Fees</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-[12px] font-medium text-text-secondary mb-1">Marketplace</label>
              <select
                value={marketplace}
                onChange={(e) => setMarketplace(e.target.value)}
                className={selectCls}
              >
                <option value="etsy">Etsy (12.5%)</option>
                <option value="ebay">eBay (12.9%)</option>
                <option value="folksy">Folksy (6.5%)</option>
                <option value="own">Own Website (0%)</option>
                <option value="custom">Custom %</option>
              </select>
            </div>
            {marketplace === 'custom' && (
              <div>
                <label className="block text-[12px] font-medium text-text-secondary mb-1">Fee %</label>
                <input
                  type="number"
                  value={customFee}
                  onChange={(e) => setCustomFee(e.target.value)}
                  step="0.1"
                  className={inputCls}
                />
              </div>
            )}
          </div>
        </div>

        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Markup</h3>
          <div>
            <label className="block text-[12px] font-medium text-text-secondary mb-1">Markup %</label>
            <input
              type="number"
              value={markup}
              onChange={(e) => setMarkup(e.target.value)}
              step="5"
              className={inputCls}
            />
          </div>
          <p className="text-[11px] text-text-muted mt-2">Typical: 40-100%</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Hero */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-8 text-center bg-accent-muted">
          <p className="text-text-muted text-[12px] mb-2">Suggested Selling Price</p>
          <p className="font-mono text-4xl font-semibold text-accent mb-1">
            £{calculation.suggestedPrice}
          </p>
          <p className="text-text-muted text-[12px]">
            {calculation.profitMargin}% profit margin
          </p>
        </div>

        {/* Cost Breakdown */}
        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Cost Breakdown</h3>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-text-secondary">Materials</span>
              <span className="font-mono">£{calculation.materialsCost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Labour ({timeMins} mins)</span>
              <span className="font-mono">£{calculation.labourCost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Packaging</span>
              <span className="font-mono">£{calculation.packaging}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Postage</span>
              <span className="font-mono">£{calculation.postage}</span>
            </div>
            <div className="border-t border-border my-2 pt-2 flex justify-between">
              <span className="text-text-secondary">Marketplace Fees ({calculation.feesPercent}%)</span>
              <span className="font-mono">£{calculation.estimatedFees}</span>
            </div>
            <div className="border-t border-border my-2 pt-2 flex justify-between font-semibold">
              <span className="text-text-primary">Total Cost</span>
              <span className="font-mono">£{calculation.totalCost}</span>
            </div>
          </div>
        </div>

        {/* Pricing Options */}
        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Pricing Options</h3>
          <div className="space-y-3 text-[13px]">
            <div className="bg-surface/50 p-3 rounded-[var(--radius-input)]">
              <p className="text-text-secondary mb-1">Absolute Minimum</p>
              <p className="font-mono text-lg font-semibold text-text-primary">
                £{calculation.minPrice}
              </p>
              <p className="text-[11px] text-text-muted mt-1">Covers costs only</p>
            </div>
            <div className="bg-accent-muted/50 p-3 rounded-[var(--radius-input)]">
              <p className="text-text-secondary mb-1">Suggested ({markup}% markup)</p>
              <p className="font-mono text-lg font-semibold text-accent">
                £{calculation.suggestedPrice}
              </p>
              <p className="text-[11px] text-text-muted mt-1">Profit: £{calculation.profit}</p>
            </div>
          </div>
        </div>

        {/* Profit Summary */}
        <div className="bg-white border border-success/30 rounded-[var(--radius-card)] p-4 bg-success/10">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">Profit at £{calculation.suggestedPrice}</h3>
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <div>
              <p className="text-text-muted mb-1">Profit per Item</p>
              <p className="font-mono font-semibold text-success text-lg">£{calculation.profit}</p>
            </div>
            <div>
              <p className="text-text-muted mb-1">Profit Margin</p>
              <p className="font-mono font-semibold text-success text-lg">{calculation.profitMargin}%</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 bg-surface/50">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">Pricing Tips</h3>
          <ul className="text-[12px] text-text-secondary space-y-1 list-disc list-inside">
            <li>Check competitor prices for validation</li>
            <li>Fees shown are estimates only</li>
            <li>Consider time to photograph and list</li>
            <li>Popular items can support higher markups</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
