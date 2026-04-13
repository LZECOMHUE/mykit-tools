'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function DogWalkingCostCalculator() {
  const [walksPerWeek, setWalksPerWeek] = useState('5');
  const [duration, setDuration] = useState('30');
  const [region, setRegion] = useState('london');
  const [walkType, setWalkType] = useState('solo');

  const regionOptions = [
    { value: 'london', label: 'London & South East' },
    { value: 'manchester', label: 'Manchester & North' },
    { value: 'midlands', label: 'Midlands' },
    { value: 'scotland', label: 'Scotland' },
    { value: 'rural', label: 'Rural areas' },
  ];

  const walkTypeOptions = [
    { value: 'solo', label: 'Solo walker (1-on-1)' },
    { value: 'group', label: 'Group walks (budget)' },
    { value: 'dog-sitter', label: 'Dog sitter (in-home)' },
  ];

  // Cost per walk based on region and walk type
  const getCostPerWalk = () => {
    const costs = {
      london: { solo: 15, group: 8, 'dog-sitter': 18 },
      manchester: { solo: 12, group: 6, 'dog-sitter': 14 },
      midlands: { solo: 11, group: 5.5, 'dog-sitter': 13 },
      scotland: { solo: 10, group: 5, 'dog-sitter': 12 },
      rural: { solo: 8, group: 4, 'dog-sitter': 10 },
    };

    return costs[region][walkType];
  };

  const costPerWalk = getCostPerWalk();
  const walks = parseInt(walksPerWeek) || 0;
  const durationHours = parseInt(duration) / 60 || 0;

  const costs = {
    perWalk: costPerWalk.toFixed(2),
    weekly: (costPerWalk * walks).toFixed(2),
    monthly: (costPerWalk * walks * 4.3).toFixed(2),
    annual: (costPerWalk * walks * 52).toFixed(2),
    hourly: durationHours > 0 ? (costPerWalk / durationHours).toFixed(2) : 'N/A'
  };

  const savingsWithGroup = walkType === 'solo' ? (
    (costPerWalk * walks * 52 - getCostPerWalk() * walks * 52 * 0.4).toFixed(2)
  ) : 'N/A';

  return (
    <Card>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Walks per week
            </label>
            <Input
              type="number"
              value={walksPerWeek}
              onChange={(e) => setWalksPerWeek(e.target.value)}
              min="1"
              max="7"
              step="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Walk duration (mins)
            </label>
            <Select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              options={[
                { value: '20', label: '20 minutes' },
                { value: '30', label: '30 minutes' },
                { value: '45', label: '45 minutes' },
                { value: '60', label: '1 hour' },
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Walk type
            </label>
            <Select
              value={walkType}
              onChange={(e) => setWalkType(e.target.value)}
              options={walkTypeOptions}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Region (affects pricing)
          </label>
          <Select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            options={regionOptions}
          />
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-accent-muted border border-accent rounded-lg">
            <p className="text-sm text-secondary mb-1">Cost per walk</p>
            <p className="font-mono text-3xl font-bold text-accent">
              £{costs.perWalk}
            </p>
            {costs.hourly !== 'N/A' && (
              <p className="text-xs text-secondary mt-2">
                £{costs.hourly} per hour
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-medium text-blue-700 mb-1 uppercase">Weekly</p>
              <p className="font-mono text-xl font-bold text-blue-600">£{costs.weekly}</p>
              <p className="text-xs text-blue-600 mt-1">{walks} walks</p>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs font-medium text-green-700 mb-1 uppercase">Monthly</p>
              <p className="font-mono text-xl font-bold text-green-600">£{costs.monthly}</p>
            </div>

            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg col-span-2 sm:col-span-1">
              <p className="text-xs font-medium text-purple-700 mb-1 uppercase">Yearly</p>
              <p className="font-mono text-xl font-bold text-purple-600">£{costs.annual}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-700 mb-2">💡 Cost breakdown:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Professional dog walkers: £10-20 per 30-minute walk</li>
            <li>• Group walks: £4-10 per walk (cheaper but less personal)</li>
            <li>• Dog sitting: £12-20 per hour</li>
            <li>• Prices vary significantly by location</li>
          </ul>
        </div>

        {walkType === 'solo' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-medium text-green-700 mb-2">💰 Potential savings:</h3>
            <p className="text-sm text-green-700">
              You could save approximately <span className="font-mono font-bold">£{savingsWithGroup}</span> per year
              by switching to group walks (if your dog enjoys group socialization).
            </p>
          </div>
        )}

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-medium text-amber-700 mb-2">📋 Walker selection tips:</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Ask for references from other dog owners</li>
            <li>• Check reviews on Rover, Care.com, or local Facebook groups</li>
            <li>• Verify they're insured and first aid certified</li>
            <li>• Start with one walk to see how your dog reacts</li>
            <li>• Ask about backup coverage for illness</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
