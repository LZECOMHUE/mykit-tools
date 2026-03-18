'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

const BASE_RATES = {
  metro: {
    simple: { min: 3000, max: 5000 },
    moderate: { min: 5000, max: 10000 },
    lavish: { min: 10000, max: 25000 },
  },
  tier2: {
    simple: { min: 1800, max: 3000 },
    moderate: { min: 3000, max: 6000 },
    lavish: { min: 6000, max: 15000 },
  },
  tier3: {
    simple: { min: 1200, max: 2500 },
    moderate: { min: 2000, max: 5000 },
    lavish: { min: 4000, max: 12500 },
  },
};

const BUDGET_BREAKDOWN = {
  venue: 0.25,
  catering: 0.3,
  decoration: 0.125,
  photography: 0.075,
  bridalWear: 0.125,
  musicEntertainment: 0.04,
  invitations: 0.04,
  miscellaneous: 0.075,
};

export default function IndiaWeddingBudgetCalculator() {
  const [cityTier, setCityTier] = useState('metro');
  const [guestCount, setGuestCount] = useState('300');
  const [weddingType, setWeddingType] = useState('moderate');

  const calculations = useMemo(() => {
    const guests = parseInt(guestCount) || 0;
    if (guests <= 0) {
      return { totalBudget: 0, breakdown: {}, error: true };
    }

    const rates = BASE_RATES[cityTier][weddingType];
    const perGuestBudget = (rates.min + rates.max) / 2;
    const totalBudget = Math.round(guests * perGuestBudget);

    const breakdown = {
      venue: Math.round(totalBudget * BUDGET_BREAKDOWN.venue),
      catering: Math.round(totalBudget * BUDGET_BREAKDOWN.catering),
      decoration: Math.round(totalBudget * BUDGET_BREAKDOWN.decoration),
      photography: Math.round(totalBudget * BUDGET_BREAKDOWN.photography),
      bridalWear: Math.round(totalBudget * BUDGET_BREAKDOWN.bridalWear),
      musicEntertainment: Math.round(totalBudget * BUDGET_BREAKDOWN.musicEntertainment),
      invitations: Math.round(totalBudget * BUDGET_BREAKDOWN.invitations),
      miscellaneous: Math.round(totalBudget * BUDGET_BREAKDOWN.miscellaneous),
    };

    return { totalBudget, breakdown, error: false };
  }, [cityTier, guestCount, weddingType]);

  const handleReset = () => {
    setCityTier('metro');
    setGuestCount('300');
    setWeddingType('moderate');
  };

  const breakdownItems = [
    { label: 'Venue', key: 'venue', color: 'bg-accent' },
    { label: 'Catering', key: 'catering', color: 'bg-blue-400' },
    { label: 'Decoration', key: 'decoration', color: 'bg-pink-400' },
    { label: 'Photography', key: 'photography', color: 'bg-purple-400' },
    { label: 'Bridal Wear & Jewellery', key: 'bridalWear', color: 'bg-yellow-500' },
    { label: 'Music/Entertainment', key: 'musicEntertainment', color: 'bg-green-400' },
    { label: 'Invitations & Gifts', key: 'invitations', color: 'bg-orange-400' },
    { label: 'Miscellaneous', key: 'miscellaneous', color: 'bg-gray-400' },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              City Category
            </label>
            <Select
              value={cityTier}
              onChange={(e) => setCityTier(e.target.value)}
              options={[
                { value: 'metro', label: 'Metro (Delhi, Mumbai, Bangalore, Hyderabad)' },
                { value: 'tier2', label: 'Tier-2 (Pune, Ahmedabad, Jaipur, Chandigarh)' },
                { value: 'tier3', label: 'Tier-3 (Other cities/towns)' },
              ]}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Number of Guests
            </label>
            <Input
              type="number"
              min="50"
              max="2000"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              placeholder="Enter guest count"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Wedding Type
            </label>
            <Select
              value={weddingType}
              onChange={(e) => setWeddingType(e.target.value)}
              options={[
                { value: 'simple', label: 'Simple (minimalist, essential elements)' },
                { value: 'moderate', label: 'Moderate (comfortable, well-planned)' },
                { value: 'lavish', label: 'Lavish (grand, premium everything)' },
              ]}
              className="w-full"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleReset} variant="secondary" className="w-full">
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {!calculations.error && (
        <>
          <Card className="p-6 bg-accent-muted">
            <h3 className="font-heading text-lg font-bold text-primary mb-2">
              Estimated Total Budget
            </h3>
            <p className="font-mono text-4xl font-bold text-accent">
              ₹{calculations.totalBudget.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-secondary mt-2">
              ≈ ₹{(calculations.totalBudget / parseInt(guestCount)).toLocaleString('en-IN')} per guest
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Budget Breakdown
            </h3>
            <div className="space-y-3">
              {breakdownItems.map(({ label, key, color }) => {
                const amount = calculations.breakdown[key];
                const percent = (amount / calculations.totalBudget) * 100;
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-secondary">{label}</span>
                      <span className="font-mono font-bold text-primary">
                        ₹{amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full bg-surface rounded-lg h-6 overflow-hidden">
                      <div
                        className={`${color} h-full flex items-center justify-center text-xs font-bold text-white`}
                        style={{ width: `${percent}%` }}
                      >
                        {percent > 8 && `${percent.toFixed(0)}%`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-4 bg-surface">
            <p className="text-sm text-secondary">
              <strong>Note:</strong> Indian weddings are typically multi-day events including pre-wedding functions, the main ceremony, and reception. This estimate covers the primary celebration. Actual costs may vary based on local customs, vendor preferences, and inflation.
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
