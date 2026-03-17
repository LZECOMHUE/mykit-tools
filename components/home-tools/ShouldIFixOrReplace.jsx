'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ShouldIFixOrReplace() {
  const [itemType, setItemType] = useState('boiler');
  const [itemAge, setItemAge] = useState(10);
  const [repairCost, setRepairCost] = useState(500);
  const [replacementCost, setReplacementCost] = useState(3000);
  const [repairLifespan, setRepairLifespan] = useState(2);
  const [newItemLifespan, setNewItemLifespan] = useState(15);
  const [customItem, setCustomItem] = useState('');

  const displayName = customItem || itemType;

  const results = useMemo(() => {
    // Cost per year of remaining life
    const costPerYearRepaired = repairLifespan > 0 ? repairCost / repairLifespan : 0;
    const costPerYearNew = newItemLifespan > 0 ? replacementCost / newItemLifespan : 0;

    // Total cost for same lifespan
    const yearsToCompare = Math.max(repairLifespan, newItemLifespan);
    const totalRepairCost = repairCost + (Math.max(0, yearsToCompare - repairLifespan) * costPerYearRepaired);
    const totalNewCost = replacementCost;

    // Break even analysis
    const breakeven = costPerYearRepaired > 0 ? repairLifespan + (replacementCost - repairCost) / costPerYearRepaired : newItemLifespan;

    return {
      costPerYearRepaired,
      costPerYearNew,
      totalRepairCost,
      totalNewCost,
      breakeven,
      recommendation: costPerYearNew < costPerYearRepaired ? 'Replace' : 'Repair',
      savings: Math.abs(costPerYearRepaired - costPerYearNew),
    };
  }, [repairCost, replacementCost, repairLifespan, newItemLifespan]);

  const itemTypes = [
    { value: 'boiler', label: 'Boiler' },
    { value: 'car', label: 'Car' },
    { value: 'fridge', label: 'Fridge' },
    { value: 'washing-machine', label: 'Washing Machine' },
    { value: 'dishwasher', label: 'Dishwasher' },
    { value: 'oven', label: 'Oven' },
    { value: 'roof', label: 'Roof' },
    { value: 'windows', label: 'Windows' },
    { value: 'custom', label: 'Something else' },
  ];

  const reset = () => {
    setItemType('boiler');
    setItemAge(10);
    setRepairCost(500);
    setReplacementCost(3000);
    setRepairLifespan(2);
    setNewItemLifespan(15);
    setCustomItem('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Item & Costs */}
        <Card>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            About the Item
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                What needs fixing?
              </label>
              <Select
                options={itemTypes}
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
              />
            </div>

            {itemType === 'custom' && (
              <Input
                label="What is it?"
                placeholder="e.g., Air conditioner"
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
              />
            )}

            <Input
              label="Item age (years)"
              type="number"
              min={0}
              step={1}
              value={itemAge}
              onChange={(e) => setItemAge(Number(e.target.value))}
            />

            <Input
              label="Repair cost (£)"
              type="number"
              min={0}
              step={10}
              value={repairCost}
              onChange={(e) => setRepairCost(Number(e.target.value))}
            />

            <Input
              label="Replacement cost (£)"
              type="number"
              min={0}
              step={100}
              value={replacementCost}
              onChange={(e) => setReplacementCost(Number(e.target.value))}
            />
          </div>
        </Card>

        {/* Lifespans */}
        <Card>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            Expected Lifespan
          </h2>

          <div className="space-y-4">
            <Input
              label="Years a repair will last"
              type="number"
              min={1}
              step={1}
              value={repairLifespan}
              onChange={(e) => setRepairLifespan(Number(e.target.value))}
              helper="How long until it breaks again?"
            />

            <Input
              label="Years a new item will last"
              type="number"
              min={1}
              step={1}
              value={newItemLifespan}
              onChange={(e) => setNewItemLifespan(Number(e.target.value))}
              helper="Typical lifespan of new model"
            />

            <div className="bg-surface p-4 rounded-lg">
              <p className="text-xs text-text-secondary mb-1">Cost per year (repair)</p>
              <p className="font-mono text-xl font-bold text-text-primary">
                £{results.costPerYearRepaired.toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}/year
              </p>
            </div>

            <div className="bg-surface p-4 rounded-lg">
              <p className="text-xs text-text-secondary mb-1">Cost per year (new)</p>
              <p className="font-mono text-xl font-bold text-text-primary">
                £{results.costPerYearNew.toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}/year
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendation */}
      <Card className={`mb-6 text-center py-8 ${
        results.recommendation === 'Replace'
          ? 'bg-success/5 border-success/30'
          : 'bg-accent/5 border-accent/30'
      }`}>
        <p className="text-text-secondary text-sm mb-2">Recommendation</p>
        <p className={`font-heading text-4xl font-bold mb-3 ${
          results.recommendation === 'Replace' ? 'text-success' : 'text-accent'
        }`}>
          {results.recommendation}
        </p>

        <p className="text-text-primary font-medium">
          The {results.recommendation === 'Replace' ? 'new' : 'repaired'} {displayName} is better value
        </p>

        <div className="mt-4 text-sm text-text-secondary">
          <p>You save £{results.savings.toLocaleString('en-GB', { maximumFractionDigits: 2 })}/year</p>
        </div>
      </Card>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <h3 className="text-sm text-text-secondary font-medium mb-3">If you repair it</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Repair cost</span>
              <span className="font-mono font-bold">
                £{repairCost.toLocaleString('en-GB')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Works for</span>
              <span className="font-mono font-bold">
                {repairLifespan} {repairLifespan === 1 ? 'year' : 'years'}
              </span>
            </div>
            <div className="pt-2 border-t border-border flex justify-between">
              <span className="text-text-secondary text-sm font-medium">Cost per year</span>
              <span className="font-mono font-bold text-text-primary">
                £{results.costPerYearRepaired.toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm text-text-secondary font-medium mb-3">If you replace it</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Replacement cost</span>
              <span className="font-mono font-bold">
                £{replacementCost.toLocaleString('en-GB')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Works for</span>
              <span className="font-mono font-bold">
                {newItemLifespan} {newItemLifespan === 1 ? 'year' : 'years'}
              </span>
            </div>
            <div className="pt-2 border-t border-border flex justify-between">
              <span className="text-text-secondary text-sm font-medium">Cost per year</span>
              <span className="font-mono font-bold text-text-primary">
                £{results.costPerYearNew.toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Other Factors */}
      <Card className="mb-6 bg-info/5 border-info/20">
        <h3 className="text-sm font-medium text-text-primary mb-2">Other factors to consider</h3>
        <ul className="text-xs text-text-secondary space-y-1">
          <li>✓ Energy efficiency of new models</li>
          <li>✓ Risk of further breakdowns if very old</li>
          <li>✓ Warranty on new items</li>
          <li>✓ Environmental impact of replacement</li>
          <li>✓ Inconvenience during repair or replacement</li>
        </ul>
      </Card>

      {/* Reset Button */}
      <Button onClick={reset} variant="secondary" className="w-full">
        Reset
      </Button>
    </div>
  );
}
