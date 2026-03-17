'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function PetFoodCostCalculator() {
  const [petType, setPetType] = useState('dog');
  const [weight, setWeight] = useState('20');
  const [size, setSize] = useState('medium');
  const [quality, setQuality] = useState('mid');
  const [foodType, setFoodType] = useState('mixed');

  const petOptions = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small (under 10kg)' },
    { value: 'medium', label: 'Medium (10-25kg)' },
    { value: 'large', label: 'Large (25-50kg)' },
    { value: 'giant', label: 'Giant (over 50kg)' },
  ];

  const qualityOptions = [
    { value: 'budget', label: 'Budget (economy brands)' },
    { value: 'mid', label: 'Mid-range (quality brands)' },
    { value: 'premium', label: 'Premium (natural, organic)' },
  ];

  const foodTypeOptions = [
    { value: 'dry', label: 'Dry kibble' },
    { value: 'wet', label: 'Wet/canned' },
    { value: 'mixed', label: 'Mixed (dry + wet)' },
    { value: 'raw', label: 'Raw/fresh' },
  ];

  // Calculate daily food amount (grams per day)
  const calculateDailyFood = () => {
    const w = parseFloat(weight) || 0;
    if (petType === 'dog') {
      if (w < 10) return 150;
      if (w < 25) return 250;
      if (w < 50) return 400;
      return 500;
    } else {
      // Cats typically need 200-250g per day
      return 225;
    }
  };

  // Cost per day based on quality and type
  const getDailyCost = () => {
    const dailyFood = calculateDailyFood();

    const costPerKg = {
      dog: {
        budget: { dry: 6, wet: 12, mixed: 10, raw: 15 },
        mid: { dry: 12, wet: 18, mixed: 15, raw: 22 },
        premium: { dry: 18, wet: 25, mixed: 22, raw: 30 }
      },
      cat: {
        budget: { dry: 8, wet: 14, mixed: 12, raw: 18 },
        mid: { dry: 14, wet: 20, mixed: 17, raw: 25 },
        premium: { dry: 22, wet: 28, mixed: 25, raw: 35 }
      }
    };

    const costPer1000g = costPerKg[petType][quality][foodType];
    return (dailyFood / 1000) * costPer1000g;
  };

  const dailyCost = getDailyCost();
  const dailyFood = calculateDailyFood();

  const costs = {
    daily: dailyCost.toFixed(2),
    weekly: (dailyCost * 7).toFixed(2),
    monthly: (dailyCost * 30).toFixed(2),
    annual: (dailyCost * 365).toFixed(2),
    lifespan: petType === 'dog' ? (dailyCost * 365 * 12).toFixed(0) : (dailyCost * 365 * 15).toFixed(0)
  };

  const expectedLifespan = petType === 'dog' ? '12 years' : '15 years';

  return (
    <Card>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Pet type
            </label>
            <Select
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              options={petOptions}
            />
          </div>

          {petType === 'dog' && (
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Weight (kg)
              </label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="1"
                step="1"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Food quality
            </label>
            <Select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              options={qualityOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Food type
            </label>
            <Select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              options={foodTypeOptions}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-accent-muted border border-accent rounded-lg">
            <p className="text-sm text-secondary mb-1">Daily food cost</p>
            <p className="font-mono text-3xl font-bold text-accent">
              £{costs.daily}
            </p>
            <p className="text-xs text-secondary mt-2">
              ~{dailyFood}g per day
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-medium text-blue-700 mb-1 uppercase">Weekly</p>
              <p className="font-mono text-xl font-bold text-blue-600">£{costs.weekly}</p>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs font-medium text-green-700 mb-1 uppercase">Monthly</p>
              <p className="font-mono text-xl font-bold text-green-600">£{costs.monthly}</p>
            </div>

            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-xs font-medium text-purple-700 mb-1 uppercase">Yearly</p>
              <p className="font-mono text-xl font-bold text-purple-600">£{costs.annual}</p>
            </div>

            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-xs font-medium text-orange-700 mb-1 uppercase">Lifetime ({expectedLifespan})</p>
              <p className="font-mono text-xl font-bold text-orange-600">£{costs.lifespan}</p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <p className="font-medium mb-1">💡 Cost saving tips:</p>
          <ul className="text-xs space-y-1 list-disc list-inside">
            <li>Buy in bulk when possible</li>
            <li>Consider mixed feeding (cheaper than all wet food)</li>
            <li>Quality food prevents vet bills down the line</li>
            <li>Check for special offers and loyalty programs</li>
          </ul>
        </div>

        <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
          <p className="font-medium mb-1">✓ Budget planning:</p>
          <p className="text-xs">
            Remember to budget for: vet bills, flea treatment, toys, grooming, and other pet supplies.
            Food is typically 40-50% of pet care costs.
          </p>
        </div>
      </div>
    </Card>
  );
}
