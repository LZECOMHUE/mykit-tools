'use client';

import { useState, useMemo } from 'react';

export default function CanadaTurkeySizeCalculator() {
  const [numGuests, setNumGuests] = useState('8');
  const [appetite, setAppetite] = useState('normal');

  const calculations = useMemo(() => {
    const guests = parseFloat(numGuests) || 8;
    const poundsPerPerson = appetite === 'light' ? 0.75 : appetite === 'normal' ? 1.0 : 1.25;

    const poundsNeeded = guests * poundsPerPerson;
    const kgsNeeded = (poundsNeeded / 2.205).toFixed(1);

    // Cooking time: 13-15 min per pound at 325F
    const cookingMinutes = Math.round(poundsNeeded * 13);
    const hours = Math.floor(cookingMinutes / 60);
    const minutes = cookingMinutes % 60;

    return {
      poundsNeeded: poundsNeeded.toFixed(0),
      kgsNeeded,
      cookingTime: `${hours}h ${minutes}m`,
      cookingMinutes,
      guests,
      appetiteMultiplier: poundsPerPerson,
    };
  }, [numGuests, appetite]);

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Number of Guests
          </label>
          <input
            type="number"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            min="1"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Appetite Level
          </label>
          <select
            value={appetite}
            onChange={(e) => setAppetite(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            <option value="light">Light Eaters</option>
            <option value="normal">Normal Appetite</option>
            <option value="hearty">Hearty Appetite</option>
          </select>
        </div>
      </div>

      {/* Turkey Size */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6">
          <div className="text-sm text-orange-700 mb-2">Turkey Size (Lbs)</div>
          <div className="text-4xl font-mono font-bold text-orange-900">
            {calculations.poundsNeeded}
          </div>
          <div className="text-sm text-orange-700 mt-2">
            {calculations.kgsNeeded} kg
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <div className="text-sm text-blue-700 mb-2">Cooking Time</div>
          <div className="text-4xl font-mono font-bold text-blue-900">
            {calculations.cookingTime}
          </div>
          <div className="text-sm text-blue-700 mt-2">
            At 325°F (163°C)
          </div>
        </div>
      </div>

      {/* Size Guide */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Turkey Size Guide
        </h3>
        <div className="space-y-3">
          {[
            { lbs: '8-10', kg: '3.6-4.5', guests: '4-6', time: '2.5-3 hours' },
            { lbs: '10-12', kg: '4.5-5.4', guests: '6-8', time: '3-3.5 hours' },
            { lbs: '12-14', kg: '5.4-6.4', guests: '8-10', time: '3.5-4 hours' },
            { lbs: '14-16', kg: '6.4-7.3', guests: '10-12', time: '4-4.5 hours' },
            { lbs: '16-18', kg: '7.3-8.2', guests: '12-14', time: '4.5-5 hours' },
            { lbs: '18-20', kg: '8.2-9.1', guests: '14-16', time: '5-5.5 hours' },
          ].map((size) => (
            <div
              key={size.lbs}
              className="flex justify-between items-center p-3 bg-surface rounded border border-border"
            >
              <div>
                <div className="font-medium text-text-primary">
                  {size.lbs} lbs ({size.kg} kg)
                </div>
                <div className="text-xs text-text-muted">
                  Serves {size.guests} guests
                </div>
              </div>
              <div className="font-mono font-bold text-accent">
                {size.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thanksgiving Info */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="font-semibold text-red-900 mb-2">
          🍂 Canadian Thanksgiving (October)
        </h3>
        <p className="text-sm text-red-800 mb-3">
          Thanksgiving is celebrated on the second Monday in October in Canada
        </p>
        <div className="space-y-2 text-sm text-red-800">
          <p>
            <strong>2025:</strong> Monday, October 13, 2025
          </p>
          <p>
            <strong>2026:</strong> Monday, October 12, 2026
          </p>
          <p>
            <strong>2027:</strong> Monday, October 11, 2027
          </p>
        </div>
      </div>

      {/* Cooking Tips */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">
          🔥 Turkey Cooking Tips
        </h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• Thaw frozen turkey in refrigerator: 24 hours per 5 lbs</li>
          <li>• Turkey is done when thigh reaches 165°F (74°C) internal temp</li>
          <li>• Let rest 20 minutes after cooking before carving</li>
          <li>• Stuff just before roasting to prevent bacterial growth</li>
          <li>• Use a meat thermometer for accurate temperature</li>
          <li>• Tent with foil if browning too quickly</li>
          <li>• Save broth and bones for gravy</li>
        </ul>
      </div>

      {/* Timeline */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">
          📅 Thanksgiving Prep Timeline
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <div>
            <strong>1 week before:</strong> Plan menu, make shopping list
          </div>
          <div>
            <strong>3 days before:</strong> Purchase turkey and fresh ingredients
          </div>
          <div>
            <strong>2 days before:</strong> Start thawing frozen turkey
          </div>
          <div>
            <strong>1 day before:</strong> Prep stuffing, sides, set table
          </div>
          <div>
            <strong>Morning of:</strong> Remove turkey from fridge, prep herb butter
          </div>
          <div>
            <strong>Several hours before:</strong> Put turkey in oven based on size and time
          </div>
        </div>
      </div>
    </div>
  );
}
