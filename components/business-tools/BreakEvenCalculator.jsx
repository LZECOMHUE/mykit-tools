'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState('5000');
  const [variableCost, setVariableCost] = useState('15');
  const [sellingPrice, setSellingPrice] = useState('50');

  const results = useMemo(() => {
    const fixed = parseFloat(fixedCosts) || 0;
    const variable = parseFloat(variableCost) || 0;
    const price = parseFloat(sellingPrice) || 0;

    if (price <= variable) {
      return null;
    }

    const contribution = price - variable;
    const breakEvenUnits = Math.ceil(fixed / contribution);
    const breakEvenRevenue = breakEvenUnits * price;
    const marginOfSafety = ((price - variable) / price) * 100;

    return {
      breakEvenUnits,
      breakEvenRevenue,
      marginOfSafety,
      contributionMargin: contribution,
    };
  }, [fixedCosts, variableCost, sellingPrice]);

  const handleReset = () => {
    setFixedCosts('5000');
    setVariableCost('15');
    setSellingPrice('50');
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-text-primary">
          Enter Your Costs
        </h2>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Fixed Costs (annual, e.g. rent, salaries)
          </label>
          <Input
            type="number"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(e.target.value)}
            placeholder="5000"
            min="0"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Variable Cost Per Unit
          </label>
          <Input
            type="number"
            value={variableCost}
            onChange={(e) => setVariableCost(e.target.value)}
            placeholder="15"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Selling Price Per Unit
          </label>
          <Input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="50"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Break-Even Progress Bar */}
          <Card>
            <h3 className="font-heading text-sm font-semibold text-text-secondary mb-4">
              Progress to Break-Even
            </h3>
            <div className="space-y-2">
              <div className="w-full bg-border rounded-full h-8 overflow-hidden">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-300 flex items-center justify-center"
                  style={{ width: '100%' }}
                >
                  <span className="text-white text-xs font-bold">100%</span>
                </div>
              </div>
              <p className="text-text-muted text-xs">
                {results.breakEvenUnits.toLocaleString()} units needed
              </p>
            </div>
          </Card>

          {/* Key Metrics */}
          <Card className="bg-accent-muted border-2 border-accent">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-accent text-xs mb-1">Break-Even Units</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  {results.breakEvenUnits.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-accent text-xs mb-1">Break-Even Revenue</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  £{results.breakEvenRevenue.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </Card>

          {/* Additional Metrics */}
          <Card>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-text-muted text-xs mb-1">Contribution Margin</p>
                <p className="font-mono text-lg font-bold text-text-primary">
                  £{results.contributionMargin.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Contribution Ratio</p>
                <p className="font-mono text-lg font-bold text-text-primary">
                  {results.marginOfSafety.toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-secondary hover:bg-surface transition-colors text-sm font-medium"
          >
            Reset
          </button>
        </div>
      )}

      {results === null && (
        <div className="bg-red-50 border border-red-200 rounded-[var(--radius-card)] p-4">
          <p className="text-red-600 text-sm">
            Selling price must be higher than variable cost per unit.
          </p>
        </div>
      )}
    </div>
  );
}
