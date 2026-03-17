'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function ArtPricingCalculator() {
  const [width, setWidth] = useState('50');
  const [height, setHeight] = useState('70');
  const [unit, setUnit] = useState('cm');
  const [materialsCost, setMaterialsCost] = useState('45');
  const [hours, setHours] = useState('8');
  const [hourlyRate, setHourlyRate] = useState('30');
  const [markup, setMarkup] = useState('50');
  const [pricePerSqInch, setPricePerSqInch] = useState('15');

  const calculation = useMemo(() => {
    const parseNum = (v) => parseFloat(v) || 0;
    const w = parseNum(width);
    const h = parseNum(height);

    // Convert to inches if needed
    const wInches = unit === 'cm' ? w / 2.54 : w;
    const hInches = unit === 'cm' ? h / 2.54 : h;

    // Method 1: Cost-based
    const materials = parseNum(materialsCost);
    const labour = parseNum(hours) * parseNum(hourlyRate);
    const costBased = materials + labour;
    const markupAmount = costBased * (parseNum(markup) / 100);
    const costBasedPrice = costBased + markupAmount;

    // Method 2: Square inch
    const sqInches = wInches * hInches;
    const sqInchPrice = sqInches * parseNum(pricePerSqInch);

    return {
      width: w,
      height: h,
      widthInches: wInches.toFixed(1),
      heightInches: hInches.toFixed(1),
      sqInches: sqInches.toFixed(0),
      costBased: {
        materials: materials.toFixed(2),
        labour: labour.toFixed(2),
        subtotal: costBased.toFixed(2),
        markup: markupAmount.toFixed(2),
        price: costBasedPrice.toFixed(2),
      },
      sqInch: {
        price: sqInchPrice.toFixed(2),
      },
      difference: (costBasedPrice - sqInchPrice).toFixed(2),
    };
  }, [width, height, unit, materialsCost, hours, hourlyRate, markup, pricePerSqInch]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* Left Panel */}
      <div className="space-y-4">
        <Card>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Dimensions</h3>
          <div className="flex gap-2 mb-3">
            <Input
              label="Width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="50"
            />
            <Input
              label="Height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="70"
            />
          </div>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full px-3 py-2 text-[13px] rounded-[var(--radius-input)] border border-border bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
          >
            <option value="cm">Centimetres</option>
            <option value="inches">Inches</option>
          </select>
        </Card>

        <Card>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Method 1: Cost-Based</h3>
          <Input
            label="Materials (£)"
            type="number"
            value={materialsCost}
            onChange={(e) => setMaterialsCost(e.target.value)}
            step="0.01"
          />
          <Input
            label="Hours Spent"
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            step="0.5"
          />
          <Input
            label="Hourly Rate (£)"
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            step="1"
          />
          <Input
            label="Markup %"
            type="number"
            value={markup}
            onChange={(e) => setMarkup(e.target.value)}
            step="1"
          />
        </Card>

        <Card>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Method 2: Square Inch</h3>
          <Input
            label="Price per £/sq.inch"
            type="number"
            value={pricePerSqInch}
            onChange={(e) => setPricePerSqInch(e.target.value)}
            step="0.50"
          />
          <p className="text-[12px] text-text-muted mt-2">
            Typical range: £10-25/sq.inch depending on complexity and materials
          </p>
        </Card>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Comparison */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-accent-muted p-6 text-center">
            <p className="text-text-muted text-[12px] mb-1">Cost-Based</p>
            <p className="font-mono text-3xl font-semibold text-accent">
              £{calculation.costBased.price}
            </p>
            <p className="text-[12px] text-text-muted mt-2">
              {calculation.sqInches} sq.in
            </p>
          </Card>
          <Card className="bg-accent-muted p-6 text-center">
            <p className="text-text-muted text-[12px] mb-1">Square Inch Method</p>
            <p className="font-mono text-3xl font-semibold text-accent">
              £{calculation.sqInch.price}
            </p>
            <p className="text-[12px] text-text-muted mt-2">
              @ £{pricePerSqInch}/sq.in
            </p>
          </Card>
        </div>

        {/* Difference */}
        <Card>
          <div className="text-center py-4">
            <p className="text-[13px] text-text-muted mb-2">Price Difference</p>
            {Math.abs(parseFloat(calculation.difference)) < 0.01 ? (
              <p className="font-mono text-2xl font-semibold text-success">
                Methods agree
              </p>
            ) : (
              <>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  £{Math.abs(calculation.difference)}
                </p>
                <p className="text-[12px] text-text-secondary mt-1">
                  {parseFloat(calculation.difference) > 0
                    ? 'Cost-based is higher'
                    : 'Square inch is higher'}
                </p>
              </>
            )}
          </div>
        </Card>

        {/* Cost-Based Breakdown */}
        <Card>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Cost-Based Breakdown</h3>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-text-secondary">Materials</span>
              <span className="font-mono">£{calculation.costBased.materials}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Labour ({hours}h @ £{hourlyRate}/h)</span>
              <span className="font-mono">£{calculation.costBased.labour}</span>
            </div>
            <div className="border-t border-border my-2 pt-2 flex justify-between font-semibold">
              <span className="text-text-primary">Subtotal</span>
              <span className="font-mono">£{calculation.costBased.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Markup ({markup}%)</span>
              <span className="font-mono text-accent">£{calculation.costBased.markup}</span>
            </div>
          </div>
        </Card>

        {/* Dimensions Info */}
        <Card className="bg-surface/50 border border-border">
          <p className="text-[13px] text-text-secondary">
            <strong>{calculation.width}{unit === 'cm' ? 'cm' : '"'} × {calculation.height}{unit === 'cm' ? 'cm' : '"'}</strong>
            {' '}({calculation.widthInches}" × {calculation.heightInches}") = <strong>{calculation.sqInches}</strong> square inches
          </p>
        </Card>

        {/* Recommendation */}
        <Card className="bg-surface/50 border border-border">
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">Which Method?</h3>
          <p className="text-[13px] text-text-secondary">
            <strong>Cost-based:</strong> More accurate if you track time and materials closely.
            {' '}<strong>Square inch:</strong> Simpler for consistent pricing across different sizes.
            Use both and price competitively based on market rates.
          </p>
        </Card>
      </div>
    </div>
  );
}
