'use client';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const DEFAULT_BUDGET_PERCENTAGES = {
  venue: 30,
  catering: 35,
  drinks: 10,
  entertainment: 5,
  flowers: 5,
  photography: 8,
  stationery: 2,
  other: 5,
};

const CATEGORY_DESCRIPTIONS = {
  venue: 'Venue hire, tables, chairs, linens',
  catering: 'Food, staff, service',
  drinks: 'Alcoholic and non-alcoholic beverages',
  entertainment: 'Music, DJ, entertainment, dancing',
  flowers: 'Bridal bouquet, arrangements, decorations',
  photography: 'Photographer, videographer, albums',
  stationery: 'Invitations, place cards, signage',
  other: 'Miscellaneous (decor, favours, etc.)',
};

export default function WeddingCostPerHeadCalculator() {
  const [totalBudget, setTotalBudget] = useState(10000);
  const [guestCount, setGuestCount] = useState(100);
  const [percentages, setPercentages] = useState(DEFAULT_BUDGET_PERCENTAGES);
  const [customGuestCounts, setCustomGuestCounts] = useState([50, 75, 100, 125, 150]);

  const budgetBreakdown = Object.entries(percentages).reduce((acc, [category, percent]) => {
    acc[category] = (totalBudget * percent) / 100;
    return acc;
  }, {});

  const costPerHead = totalBudget / guestCount;

  const categoryBreakdown = Object.entries(budgetBreakdown).map(([category, amount]) => ({
    category,
    amount,
    costPerHead: amount / guestCount,
    percentage: percentages[category],
  }));

  const handlePercentageChange = (category, newPercent) => {
    const currentTotal = Object.values(percentages).reduce((a, b) => a + b, 0);
    const difference = newPercent - percentages[category];

    setPercentages({
      ...percentages,
      [category]: newPercent,
      other: Math.max(0, percentages.other - difference),
    });
  };

  const calculateGuestCountScenarios = (newGuestCount) => {
    return (totalBudget / newGuestCount).toFixed(2);
  };

  const handleRemoveGuests = () => {
    if (guestCount > 10) {
      const newCount = guestCount - 10;
      setGuestCount(newCount);
    }
  };

  const handleAddGuests = () => {
    setGuestCount(guestCount + 10);
  };

  return (
    <div className="space-y-6">
      {/* Main Inputs */}
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Total Wedding Budget
            </label>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">£</span>
              <Input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Math.max(0, parseInt(e.target.value) || 0))}
                min="0"
                step="1000"
                placeholder="Enter budget"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Number of Guests
            </label>
            <Input
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="10000"
              placeholder="Enter guest count"
            />
          </div>

          <div className="bg-blue-100 rounded-[var(--radius-input)] p-4">
            <p className="text-text-secondary text-sm mb-2">Cost Per Guest</p>
            <p className="font-mono text-3xl font-semibold text-accent">
              £{costPerHead.toFixed(2)}
            </p>
            <p className="text-text-muted text-xs mt-1">
              Total budget divided by {guestCount} guests
            </p>
          </div>
        </div>
      </Card>

      {/* Budget Breakdown by Category */}
      <Card>
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
          Budget Breakdown
        </h3>

        <div className="space-y-3">
          {categoryBreakdown
            .sort((a, b) => b.amount - a.amount)
            .map((item) => (
              <div
                key={item.category}
                className="bg-surface rounded-[var(--radius-input)] p-4 border border-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-text-primary capitalize">
                      {item.category}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      {CATEGORY_DESCRIPTIONS[item.category]}
                    </p>
                  </div>
                </div>

                {/* Slider for percentage adjustment */}
                <div className="mb-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={item.percentage}
                    onChange={(e) =>
                      handlePercentageChange(item.category, parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-border rounded-full cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-xs text-text-muted mt-1">
                    <span>0%</span>
                    <span className="font-mono font-medium text-text-primary">
                      {item.percentage}%
                    </span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Cost breakdown */}
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-white rounded p-2 border border-border">
                    <p className="text-text-muted text-xs mb-1">Total</p>
                    <p className="font-mono font-semibold text-text-primary">
                      £{item.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white rounded p-2 border border-border">
                    <p className="text-text-muted text-xs mb-1">Per Guest</p>
                    <p className="font-mono font-semibold text-text-primary">
                      £{item.costPerHead.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white rounded p-2 border border-border">
                    <p className="text-text-muted text-xs mb-1">% of Budget</p>
                    <p className="font-mono font-semibold text-text-primary">
                      {item.percentage}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="font-medium text-text-primary">Total</span>
            <span className="font-mono text-lg font-semibold text-accent">
              £{totalBudget.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-1 text-sm">
            <span className="text-text-secondary">Allocated</span>
            <span className="font-mono text-text-primary">
              {Object.values(percentages).reduce((a, b) => a + b, 0)}%
            </span>
          </div>
        </div>
      </Card>

      {/* What If Scenarios */}
      <Card className="bg-amber-50 border-amber-100">
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
          What If Scenarios
        </h3>

        <p className="text-sm text-text-secondary mb-4">
          See how adding or removing guests affects your cost per head
        </p>

        <div className="space-y-2 mb-6">
          {[50, 75, 100, 125, 150, 175, 200].map((count) => {
            const costPerPersonAtThisCount = calculateGuestCountScenarios(count);
            const isCurrentCount = count === guestCount;
            const difference = costPerHead - parseFloat(costPerPersonAtThisCount);

            return (
              <div
                key={count}
                className={`rounded-[var(--radius-input)] p-3 border flex justify-between items-center ${
                  isCurrentCount
                    ? 'bg-blue-100 border-accent'
                    : 'bg-white border-border'
                }`}
              >
                <span className={isCurrentCount ? 'font-medium text-accent' : 'text-text-primary'}>
                  {count} guests
                </span>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-text-primary font-medium">
                    £{costPerPersonAtThisCount}
                  </span>
                  {!isCurrentCount && difference !== 0 && (
                    <span
                      className={`text-sm font-medium ${
                        difference > 0 ? 'text-green-600' : 'text-orange-600'
                      }`}
                    >
                      {difference > 0 ? '+' : ''}£{difference.toFixed(2)}
                    </span>
                  )}
                  {isCurrentCount && <span className="text-xs font-medium text-accent">Current</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
          <p className="text-text-secondary text-xs mb-2">Adjust guest count manually:</p>
          <div className="flex gap-2">
            <button
              onClick={handleRemoveGuests}
              className="flex-1 px-3 py-2 rounded-[var(--radius-input)] border border-border text-text-primary hover:bg-surface transition-colors font-medium text-sm"
            >
              Remove 10 Guests
            </button>
            <button
              onClick={handleAddGuests}
              className="flex-1 px-3 py-2 rounded-[var(--radius-input)] border border-border text-text-primary hover:bg-surface transition-colors font-medium text-sm"
            >
              Add 10 Guests
            </button>
          </div>
        </div>
      </Card>

      {/* Budget Planning Tips */}
      <Card>
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
          Budget Planning Tips
        </h3>

        <ul className="space-y-3 text-sm text-text-secondary">
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Catering is your biggest expense.</span>{' '}
              Reducing guest count or choosing simpler menu options makes the biggest impact.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Smaller guest lists = lower per-head cost.</span>{' '}
              An intimate 50-guest wedding is often cheaper per person than 200 guests.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Afternoon weddings cost less.</span> Lunch or
              afternoon tea receptions are cheaper than evening dinners.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Flowers are flexible.</span> Seasonal
              flowers and greenery-heavy designs cost far less than elaborate floral displays.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Build in contingency.</span> Add 10-15%
              for unexpected costs and unexpected guests.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">•</span>
            <span>
              <span className="font-medium text-text-primary">Get quotes before committing.</span> Use
              your per-head cost as a target when negotiating with vendors.
            </span>
          </li>
        </ul>
      </Card>

      {/* Average Benchmarks */}
      <Card className="bg-blue-50 border-blue-100">
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
          Typical Cost Ranges (UK)
        </h3>

        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex justify-between">
            <span>Budget wedding (50 guests)</span>
            <span className="font-mono text-text-primary">£2,500 to £4,000</span>
          </div>
          <div className="flex justify-between">
            <span>Mid-range wedding (100 guests)</span>
            <span className="font-mono text-text-primary">£5,000 to £12,000</span>
          </div>
          <div className="flex justify-between">
            <span>Premium wedding (100 guests)</span>
            <span className="font-mono text-text-primary">£15,000 to £25,000+</span>
          </div>
          <div className="flex justify-between">
            <span>Luxury wedding (150 guests)</span>
            <span className="font-mono text-text-primary">£25,000 to £50,000+</span>
          </div>
        </div>

        <p className="text-text-muted text-xs mt-3">
          These are approximate ranges and vary greatly depending on location, season, and vendor
          choices.
        </p>
      </Card>
    </div>
  );
}
