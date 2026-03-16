'use client';

import { useState } from 'react';

export default function FreezerStorageGuide() {
  const [searchTerm, setSearchTerm] = useState('');

  const storageGuide = [
    { food: 'Chicken breasts', months: 9, tips: 'Wrap well, use within 3 months for best quality' },
    { food: 'Ground meat', months: 3, tips: 'Keep in airtight container, flatten for quick thawing' },
    { food: 'Beef steaks', months: 12, tips: 'Wrap individually with cling film' },
    { food: 'Fish fillets', months: 3, tips: 'Most shelf life is 3 months, keep very cold' },
    { food: 'Salmon', months: 2, tips: 'High fat content reduces storage time' },
    { food: 'Cooked rice', months: 4, tips: 'Cool before freezing, freeze in portion bags' },
    { food: 'Pasta', months: 6, tips: 'Cooked pasta can be frozen, thaw before reheating' },
    { food: 'Bread', months: 3, tips: 'Slice before freezing for convenient portions' },
    { food: 'Butter', months: 9, tips: 'Keeps very well frozen, wrap tightly' },
    { food: 'Cheese', months: 4, tips: 'Hard cheeses freeze better than soft varieties' },
    { food: 'Milk', months: 1, tips: 'Expand during freezing, leave space in container' },
    { food: 'Berries', months: 12, tips: 'Spread on tray first, then bag to prevent clumping' },
    { food: 'Vegetables', months: 8, tips: 'Blanch vegetables before freezing for best texture' },
    { food: 'Soup', months: 3, tips: 'Cool completely before freezing' },
    { food: 'Leftovers', months: 3, tips: 'Label with date, freeze in airtight containers' },
  ];

  const filtered = storageGuide.filter((item) =>
    item.food.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Search Foods
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="e.g., chicken, fish, vegetables..."
          className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Freezer Storage Times
        </h3>

        {filtered.length === 0 ? (
          <p className="text-center text-text-secondary py-8">No results found</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div key={item.food} className="border border-border rounded-[var(--radius-input)] p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-text-primary">{item.food}</h4>
                  <span className="font-mono font-bold text-accent">
                    {item.months} months
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{item.tips}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          General Tips
        </h3>

        <div className="space-y-3">
          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary mb-1">Prevent Freezer Burn</p>
            <p className="text-sm text-text-secondary">Remove as much air as possible from packaging</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary mb-1">Label Everything</p>
            <p className="text-sm text-text-secondary">Mark contents and date for easy tracking</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary mb-1">Thaw Safely</p>
            <p className="text-sm text-text-secondary">Use fridge, cold water, or microwave (not room temp)</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary mb-1">First In First Out</p>
            <p className="text-sm text-text-secondary">Organize to use oldest items first</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        Times shown assume proper storage at -18°C. Quality may decline but food remains safe if properly frozen.
      </p>
    </div>
  );
}
