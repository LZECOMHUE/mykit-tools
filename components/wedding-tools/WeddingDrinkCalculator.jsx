'use client';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const DRINK_RATIOS = {
  champagne: { glassesPerBottle: 6, perPersonGlasses: 1 },
  whiteWine: { bottlesPerPerson: 0.5 },
  redWine: { bottlesPerPerson: 0.3 },
  beer: { bottlesPerPerson: 2 },
};

const DEFAULT_PRICES = {
  champagne: 15,
  whiteWine: 10,
  redWine: 10,
  beer: 2,
  softDrinks: 1.5,
  water: 0.5,
};

export default function WeddingDrinkCalculator() {
  const [guests, setGuests] = useState(100);
  const [duration, setDuration] = useState(4);
  const [season, setSeason] = useState('spring');
  const [barType, setBarType] = useState('open');
  const [prices, setPrices] = useState(DEFAULT_PRICES);

  // Calculate quantities
  const calculateChampagne = () => {
    const glassesPerson = DRINK_RATIOS.champagne.perPersonGlasses;
    const totalGlasses = guests * glassesPerson;
    return Math.ceil(totalGlasses / DRINK_RATIOS.champagne.glassesPerBottle);
  };

  const calculateWineBottles = () => {
    if (barType === 'limited') return { white: 0, red: 0 };
    const white = Math.ceil(guests * DRINK_RATIOS.whiteWine.bottlesPerPerson * 0.5);
    const red = Math.ceil(guests * DRINK_RATIOS.redWine.bottlesPerPerson * 0.5);
    return { white, red };
  };

  const calculateBeer = () => {
    if (barType === 'limited') return 0;
    return Math.ceil(guests * DRINK_RATIOS.beer.bottlesPerPerson * (duration / 4) * 0.3);
  };

  const calculateSoftDrinks = () => {
    const basePerPerson = 1.5;
    const seasonMultiplier = season === 'summer' ? 1.4 : 1;
    const durationMultiplier = duration / 4;
    return Math.ceil(guests * basePerPerson * seasonMultiplier * durationMultiplier);
  };

  const calculateWater = () => {
    return Math.ceil(guests * 2);
  };

  const champagneBottles = calculateChampagne();
  const { white: whiteWineBottles, red: redWineBottles } = calculateWineBottles();
  const beerBottles = calculateBeer();
  const softDrinks = calculateSoftDrinks();
  const waterBottles = calculateWater();

  const costs = {
    champagne: champagneBottles * prices.champagne,
    whiteWine: whiteWineBottles * prices.whiteWine,
    redWine: redWineBottles * prices.redWine,
    beer: beerBottles * prices.beer,
    softDrinks: softDrinks * prices.softDrinks,
    water: waterBottles * prices.water,
  };

  const totalCost = Object.values(costs).reduce((a, b) => a + b, 0);
  const costPerGuest = (totalCost / guests).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Configuration Section */}
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Number of Guests
            </label>
            <Input
              type="number"
              value={guests}
              onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Event Duration (hours)
            </label>
            <Select
              options={[
                { value: 2, label: '2 hours' },
                { value: 3, label: '3 hours' },
                { value: 4, label: '4 hours (full reception)' },
                { value: 5, label: '5 hours' },
                { value: 6, label: '6 hours (evening party)' },
              ]}
              value={duration}
              onChange={(val) => setDuration(Number(val))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Season
            </label>
            <Select
              options={[
                { value: 'spring', label: 'Spring' },
                { value: 'summer', label: 'Summer (increases soft drinks)' },
                { value: 'autumn', label: 'Autumn' },
                { value: 'winter', label: 'Winter' },
              ]}
              value={season}
              onChange={setSeason}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Bar Type
            </label>
            <Select
              options={[
                { value: 'open', label: 'Open bar (all drinks included)' },
                { value: 'limited', label: 'Limited bar (champagne and soft drinks only)' },
              ]}
              value={barType}
              onChange={setBarType}
            />
          </div>
        </div>
      </Card>

      {/* Results Section */}
      <Card className="bg-blue-50 border-blue-100">
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
          Drink Quantities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
            <p className="text-text-secondary text-sm mb-1">Champagne</p>
            <p className="font-mono text-2xl font-semibold text-text-primary">
              {champagneBottles}
            </p>
            <p className="text-text-muted text-xs mt-1">bottles (for toast)</p>
          </div>

          {barType === 'open' && (
            <>
              <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
                <p className="text-text-secondary text-sm mb-1">White Wine</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {whiteWineBottles}
                </p>
                <p className="text-text-muted text-xs mt-1">bottles</p>
              </div>

              <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
                <p className="text-text-secondary text-sm mb-1">Red Wine</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {redWineBottles}
                </p>
                <p className="text-text-muted text-xs mt-1">bottles</p>
              </div>

              <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
                <p className="text-text-secondary text-sm mb-1">Beer</p>
                <p className="font-mono text-2xl font-semibold text-text-primary">
                  {beerBottles}
                </p>
                <p className="text-text-muted text-xs mt-1">bottles</p>
              </div>
            </>
          )}

          <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
            <p className="text-text-secondary text-sm mb-1">Soft Drinks</p>
            <p className="font-mono text-2xl font-semibold text-text-primary">
              {softDrinks}
            </p>
            <p className="text-text-muted text-xs mt-1">bottles</p>
          </div>

          <div className="bg-white rounded-[var(--radius-input)] p-3 border border-border">
            <p className="text-text-secondary text-sm mb-1">Water</p>
            <p className="font-mono text-2xl font-semibold text-text-primary">
              {waterBottles}
            </p>
            <p className="text-text-muted text-xs mt-1">bottles</p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="font-heading text-sm font-semibold text-text-secondary mb-3">Cost Breakdown</p>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-text-secondary">Champagne ({champagneBottles} bottles)</span>
              <span className="font-mono text-text-primary">£{costs.champagne.toFixed(2)}</span>
            </div>
            {barType === 'open' && (
              <>
                <div className="flex justify-between">
                  <span className="text-text-secondary">White Wine ({whiteWineBottles} bottles)</span>
                  <span className="font-mono text-text-primary">£{costs.whiteWine.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Red Wine ({redWineBottles} bottles)</span>
                  <span className="font-mono text-text-primary">£{costs.redWine.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Beer ({beerBottles} bottles)</span>
                  <span className="font-mono text-text-primary">£{costs.beer.toFixed(2)}</span>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <span className="text-text-secondary">Soft Drinks ({softDrinks} bottles)</span>
              <span className="font-mono text-text-primary">£{costs.softDrinks.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Water ({waterBottles} bottles)</span>
              <span className="font-mono text-text-primary">£{costs.water.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-blue-100 rounded-[var(--radius-input)] p-3">
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-heading font-semibold text-text-primary">Total Cost</span>
              <span className="font-mono text-2xl font-semibold text-accent">£{totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Cost per guest</span>
              <span className="font-mono text-text-primary">£{costPerGuest}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Price Adjustment Section */}
      <Card>
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
          Adjust Unit Prices
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(prices).map(([key, price]) => (
            <div key={key}>
              <label className="block text-xs font-medium text-text-secondary mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()} per unit
              </label>
              <Input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrices({
                    ...prices,
                    [key]: parseFloat(e.target.value) || 0,
                  })
                }
                step="0.5"
                min="0"
                placeholder="£"
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
