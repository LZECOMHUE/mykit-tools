'use client';

import { useState, useMemo } from 'react';

const inputCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono';
const selectCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer';
const labelCls = 'text-[13px] font-medium text-text-secondary';

export default function PhotographyPricingCalculator() {
  const [shootType, setShootType] = useState('wedding');
  const [shootingHours, setShootingHours] = useState('8');
  const [editingHours, setEditingHours] = useState('');
  const [cameraCost, setCameraCost] = useState('1500');
  const [expectedShoots, setExpectedShoots] = useState('200');
  const [lensCost, setLensCost] = useState('800');
  const [travelDistance, setTravelDistance] = useState('0');
  const [mileageRate, setMileageRate] = useState('0.45');
  const [secondShooter, setSecondShooter] = useState('no');
  const [secondShooterRate, setSecondShooterRate] = useState('25');
  const [deliverables, setDeliverables] = useState('1');

  const editingMultipliers = {
    portrait: 1.5,
    event: 2,
    wedding: 3,
    product: 2.5,
    pet: 1.5,
    newborn: 2,
  };

  const defaultEditingHours = parseFloat(shootingHours) * editingMultipliers[shootType];

  const calculations = useMemo(() => {
    const shooting = parseFloat(shootingHours) || 0;
    const editing = parseFloat(editingHours) || defaultEditingHours;
    const camera = parseFloat(cameraCost) || 0;
    const shoots = parseFloat(expectedShoots) || 1;
    const lens = parseFloat(lensCost) || 0;
    const distance = parseFloat(travelDistance) || 0;
    const mileage = parseFloat(mileageRate) || 0.45;
    const secondRate = parseFloat(secondShooterRate) || 25;
    const delivCount = parseFloat(deliverables) || 1;

    const hourlyRate = 50;
    const shootingCost = shooting * hourlyRate;
    const editingCost = editing * hourlyRate;
    const cameraDepreciation = camera / shoots;
    const lensDepreciation = lens / shoots;
    const travelCost = distance > 0 ? distance * 2 * mileage : 0;
    const secondShooterCost = secondShooter === 'yes' ? shooting * secondRate : 0;
    const deliverableCost = delivCount * 20;

    const totalCost = shootingCost + editingCost + cameraDepreciation + lensDepreciation + travelCost + secondShooterCost + deliverableCost;

    const markupPercentage = 1.5;
    const suggestedPrice = totalCost * (1 + markupPercentage);

    return {
      shootingCost,
      editingCost,
      cameraDepreciation,
      lensDepreciation,
      travelCost,
      secondShooterCost,
      deliverableCost,
      totalCost,
      suggestedPrice,
      profitMargin: suggestedPrice - totalCost,
      profitPercentage: ((suggestedPrice - totalCost) / totalCost) * 100,
    };
  }, [shootingHours, editingHours, cameraCost, expectedShoots, lensCost, travelDistance, mileageRate, secondShooter, secondShooterRate, deliverables, shootType]);

  const marketRates = {
    portrait: '£150-300 per session',
    event: '£400-800 per day',
    wedding: '£800-2500+ per day',
    product: '£300-800 per shoot',
    pet: '£150-400 per session',
    newborn: '£300-600 per session',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel - Controls */}
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelCls}>Shoot Type</label>
          <select value={shootType} onChange={(e) => setShootType(e.target.value)} className={selectCls}>
            <option value="portrait">Portrait session</option>
            <option value="event">Event coverage</option>
            <option value="wedding">Wedding</option>
            <option value="product">Product photography</option>
            <option value="pet">Pet photography</option>
            <option value="newborn">Newborn session</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Shooting Hours</label>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={shootingHours}
            onChange={(e) => setShootingHours(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Editing Hours</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={editingHours}
            onChange={(e) => setEditingHours(e.target.value)}
            className={inputCls}
            placeholder={defaultEditingHours.toFixed(1)}
          />
          <p className="text-[11px] text-text-muted mt-1">
            Recommended: {defaultEditingHours.toFixed(1)}h ({editingMultipliers[shootType]}x shooting hours)
          </p>
        </div>

        <hr className="border-border" />

        <div>
          <label className={labelCls}>Camera Body Cost (£)</label>
          <input
            type="number"
            min="0"
            value={cameraCost}
            onChange={(e) => setCameraCost(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Expected Shoots Before Replacement</label>
          <input
            type="number"
            min="1"
            value={expectedShoots}
            onChange={(e) => setExpectedShoots(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Lens Cost (£)</label>
          <input
            type="number"
            min="0"
            value={lensCost}
            onChange={(e) => setLensCost(e.target.value)}
            className={inputCls}
          />
        </div>

        <hr className="border-border" />

        <div>
          <label className={labelCls}>Travel Distance (miles)</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={travelDistance}
            onChange={(e) => setTravelDistance(e.target.value)}
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

        <div>
          <label className={labelCls}>Second Shooter</label>
          <select value={secondShooter} onChange={(e) => setSecondShooter(e.target.value)} className={selectCls}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {secondShooter === 'yes' && (
          <div>
            <label className={labelCls}>Second Shooter Rate (£/hour)</label>
            <input
              type="number"
              min="0"
              value={secondShooterRate}
              onChange={(e) => setSecondShooterRate(e.target.value)}
              className={inputCls}
            />
          </div>
        )}

        <div>
          <label className={labelCls}>Number of Deliverables</label>
          <input
            type="number"
            min="1"
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="flex flex-col gap-4">
        {/* Hero Banner */}
        <div className="p-4 rounded-[var(--radius-card)] bg-accent-muted border border-border">
          <p className="text-text-muted text-[12px] uppercase tracking-wide mb-2">Suggested Minimum Price</p>
          <p className="font-heading text-4xl font-bold text-accent mb-2">
            £{calculations.suggestedPrice.toFixed(2)}
          </p>
          <p className="text-[13px] text-text-secondary">
            Market rate: {marketRates[shootType]}
          </p>
        </div>

        {/* Cost Breakdown Table */}
        <div className="border border-border rounded-[var(--radius-card)] overflow-hidden">
          <div className="bg-surface border-b border-border px-4 py-3">
            <p className="font-medium text-[13px] text-text-primary">Cost Breakdown</p>
          </div>
          <div className="divide-y divide-border">
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Shooting ({shootingHours}h @ £50/h)</span>
              <span className="font-mono text-text-primary">£{calculations.shootingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Editing ({(editingHours || defaultEditingHours).toFixed(1)}h @ £50/h)</span>
              <span className="font-mono text-text-primary">£{calculations.editingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Camera depreciation</span>
              <span className="font-mono text-text-primary">£{calculations.cameraDepreciation.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Lens depreciation</span>
              <span className="font-mono text-text-primary">£{calculations.lensDepreciation.toFixed(2)}</span>
            </div>
            {calculations.travelCost > 0 && (
              <div className="flex justify-between px-4 py-2 text-[13px]">
                <span className="text-text-secondary">Travel</span>
                <span className="font-mono text-text-primary">£{calculations.travelCost.toFixed(2)}</span>
              </div>
            )}
            {calculations.secondShooterCost > 0 && (
              <div className="flex justify-between px-4 py-2 text-[13px]">
                <span className="text-text-secondary">Second shooter</span>
                <span className="font-mono text-text-primary">£{calculations.secondShooterCost.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Deliverables ({deliverables})</span>
              <span className="font-mono text-text-primary">£{calculations.deliverableCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-3 text-[13px] bg-surface font-medium border-t border-border">
              <span className="text-text-primary">Total Cost</span>
              <span className="font-mono text-text-primary">£{calculations.totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-2 text-[13px]">
              <span className="text-text-secondary">Markup (150%)</span>
              <span className="font-mono text-accent">£{calculations.profitMargin.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-4 py-3 text-[13px] bg-surface font-medium">
              <span className="text-text-primary">Selling Price</span>
              <span className="font-mono text-accent">£{calculations.suggestedPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Profit Margin Bar */}
        <div className="p-4 rounded-[var(--radius-card)] bg-surface border border-border">
          <p className="text-[13px] text-text-secondary mb-2">Profit Margin</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-accent"
                style={{ width: `${Math.min(100, calculations.profitPercentage)}%` }}
              />
            </div>
            <span className="font-mono text-[13px] font-medium text-accent">
              {calculations.profitPercentage.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Price Per Deliverable */}
        <div className="p-4 rounded-[var(--radius-card)] bg-surface border border-border">
          <p className="text-[12px] text-text-muted mb-3">Price breakdown</p>
          <div className="text-[13px] font-mono">
            <div className="flex justify-between mb-2">
              <span className="text-text-secondary">Per hour of shooting</span>
              <span className="text-text-primary">£{(calculations.suggestedPrice / parseFloat(shootingHours)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Per deliverable</span>
              <span className="text-text-primary">£{(calculations.suggestedPrice / parseFloat(deliverables)).toFixed(2)}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-border flex justify-between font-medium">
              <span className="text-text-primary">Cost per deliverable</span>
              <span className="text-accent">£{(calculations.totalCost / parseFloat(deliverables)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
