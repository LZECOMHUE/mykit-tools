'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function MakeOrBuyCalculator() {
  const [itemType, setItemType] = useState('coffee');
  const [customItem, setCustomItem] = useState('');
  const [homemadeCost, setHomemadeCost] = useState(0.50);
  const [shopCost, setShopCost] = useState(3.00);
  const [makeTime, setMakeTime] = useState(5);
  const [timesPerWeek, setTimesPerWeek] = useState(5);

  const displayName = customItem || itemType;

  const results = useMemo(() => {
    // Annual calculations
    const weeksPerYear = 52;
    const timesPerYear = timesPerWeek * weeksPerYear;

    const homemadeTotalCost = homemadeCost * timesPerYear;
    const shopTotalCost = shopCost * timesPerYear;
    const weeklySavings = (shopCost - homemadeCost) * timesPerWeek;
    const annualSavings = weeklySavings * weeksPerYear;

    const totalTimePerYear = makeTime * timesPerYear;
    const hoursPerYear = totalTimePerYear / 60;

    // Effective hourly rate
    const effectiveHourlyRate = hoursPerYear > 0 ? annualSavings / hoursPerYear : 0;

    // Is it worth it?
    const worthIt = effectiveHourlyRate > 10; // If saving more than £10/hour

    return {
      weeklySavings,
      annualSavings,
      homemadeTotalCost,
      shopTotalCost,
      totalTimePerYear,
      hoursPerYear,
      effectiveHourlyRate,
      worthIt,
      timesPerYear,
      breakEvenMinutes: shopCost > homemadeCost ? (shopCost - homemadeCost) / (homemadeCost / makeTime) : 0,
    };
  }, [homemadeCost, shopCost, makeTime, timesPerWeek]);

  const itemTypes = [
    { value: 'coffee', label: 'Coffee' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'bread', label: 'Bread' },
    { value: 'cakes', label: 'Cakes' },
    { value: 'pasta', label: 'Pasta' },
    { value: 'smoothies', label: 'Smoothies' },
    { value: 'granola', label: 'Granola' },
    { value: 'custom', label: 'Something else' },
  ];

  const reset = () => {
    setItemType('coffee');
    setCustomItem('');
    setHomemadeCost(0.50);
    setShopCost(3.00);
    setMakeTime(5);
    setTimesPerWeek(5);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Item & Costs */}
        <Card>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            What are you making?
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Item type
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
                placeholder="e.g., Desserts"
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
              />
            )}

            <Input
              label="Cost to make per serving (£)"
              type="number"
              min={0}
              step={0.10}
              value={homemadeCost}
              onChange={(e) => setHomemadeCost(Number(e.target.value))}
              helper="Ingredients only"
            />

            <Input
              label="Shop price per serving (£)"
              type="number"
              min={0}
              step={0.10}
              value={shopCost}
              onChange={(e) => setShopCost(Number(e.target.value))}
              helper="What you'd buy it for"
            />
          </div>
        </Card>

        {/* Frequency */}
        <Card>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            How often?
          </h2>

          <div className="space-y-4">
            <Input
              label="Time to make (minutes)"
              type="number"
              min={1}
              step={1}
              value={makeTime}
              onChange={(e) => setMakeTime(Number(e.target.value))}
              helper="From start to finish"
            />

            <Input
              label="Times per week"
              type="number"
              min={0.1}
              step={0.1}
              value={timesPerWeek}
              onChange={(e) => setTimesPerWeek(Number(e.target.value))}
            />

            <div className="bg-surface p-4 rounded-lg">
              <p className="text-xs text-text-secondary mb-1">Per serving saved</p>
              <p className="font-mono text-2xl font-bold text-success">
                £{(shopCost - homemadeCost).toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Recommendation */}
      <Card className={`mb-4 text-center py-4 ${
        results.worthIt ? 'bg-success/5 border-success/30' : 'bg-warning/5 border-warning/30'
      }`}>
        <p className="text-text-secondary text-sm mb-2">Annual Decision</p>
        <p className={`font-heading text-4xl font-bold mb-4 ${
          results.worthIt ? 'text-success' : 'text-warning'
        }`}>
          {results.worthIt ? 'Worth Making' : 'Close Call'}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-lg p-3 border border-border">
            <p className="text-xs text-text-secondary mb-1">Annual savings</p>
            <p className="font-mono text-2xl font-bold text-success">
              £{results.annualSavings.toLocaleString('en-GB', {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>

          <div className="bg-white rounded-lg p-3 border border-border">
            <p className="text-xs text-text-secondary mb-1">Effective hourly rate</p>
            <p className={`font-mono text-2xl font-bold ${
              results.effectiveHourlyRate > 10 ? 'text-success' : 'text-warning'
            }`}>
              £{results.effectiveHourlyRate.toLocaleString('en-GB', {
                maximumFractionDigits: 2,
              })}/hr
            </p>
          </div>
        </div>

        {results.annualSavings > 0 && (
          <p className="text-xs text-text-secondary">
            You save £{results.weeklySavings.toLocaleString('en-GB', {
              maximumFractionDigits: 2,
            })}/week by making {displayName}
          </p>
        )}
      </Card>

      {/* Cost Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="border-error/30 bg-error/5">
          <h3 className="text-sm text-text-secondary font-medium mb-3">Making it</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Per serving</span>
              <span className="font-mono font-bold">
                £{homemadeCost.toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Per year</span>
              <span className="font-mono font-bold">
                £{results.homemadeTotalCost.toLocaleString('en-GB', {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Time per year</span>
              <span className="font-mono font-bold">
                {results.hoursPerYear.toLocaleString('en-GB', {
                  maximumFractionDigits: 0,
                })} hours
              </span>
            </div>
          </div>
        </Card>

        <Card className="border-accent/30 bg-accent/5">
          <h3 className="text-sm text-text-secondary font-medium mb-3">Buying it</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Per serving</span>
              <span className="font-mono font-bold">
                £{shopCost.toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Per year</span>
              <span className="font-mono font-bold">
                £{results.shopTotalCost.toLocaleString('en-GB', {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Time per year</span>
              <span className="font-mono font-bold">0 hours</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Insights */}
      <Card className="mb-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">Key Insights</h3>

        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-accent font-bold flex-shrink-0">✓</span>
            <div>
              <p className="text-sm text-text-primary font-medium">
                {results.timesPerYear.toLocaleString('en-GB', { maximumFractionDigits: 0 })} times per year
              </p>
              <p className="text-xs text-text-secondary">
                You make this {timesPerWeek} times per week
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-accent font-bold flex-shrink-0">✓</span>
            <div>
              <p className="text-sm text-text-primary font-medium">
                £{results.annualSavings.toLocaleString('en-GB', { maximumFractionDigits: 0 })} saved annually
              </p>
              <p className="text-xs text-text-secondary">
                That's £{(results.annualSavings / 12).toLocaleString('en-GB', {
                  maximumFractionDigits: 2,
                })}/month
              </p>
            </div>
          </div>

          {results.hoursPerYear > 0 && (
            <div className="flex gap-3">
              <span className="text-accent font-bold flex-shrink-0">✓</span>
              <div>
                <p className="text-sm text-text-primary font-medium">
                  £{results.effectiveHourlyRate.toLocaleString('en-GB', {
                    maximumFractionDigits: 2,
                  })}/hour
                </p>
                <p className="text-xs text-text-secondary">
                  Effective rate of return on your time
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Reset Button */}
      <Button onClick={reset} variant="secondary" className="w-full">
        Reset
      </Button>
    </div>
  );
}
