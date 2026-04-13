'use client';

import { useState } from 'react';

export default function SubstituteIngredientFinder() {
  const [searchTerm, setSearchTerm] = useState('');

  const substitutes = [
    { ingredient: 'Buttermilk', subs: [{ name: '1 cup milk + 1 tbsp lemon juice', ratio: 'equal' }, { name: '1 cup plain yogurt', ratio: 'equal' }] },
    { ingredient: 'Honey', subs: [{ name: 'Maple syrup', ratio: 'equal' }, { name: 'Agave nectar', ratio: 'equal' }] },
    { ingredient: 'Butter', subs: [{ name: 'Coconut oil', ratio: '1:1' }, { name: 'Olive oil', ratio: '3/4 cup oil per 1 cup butter' }] },
    { ingredient: 'Egg', subs: [{ name: 'Applesauce (baking)', ratio: '1/4 cup per egg' }, { name: 'Flax egg (1 tbsp ground flax + 3 tbsp water)', ratio: '1 per egg' }] },
    { ingredient: 'Milk', subs: [{ name: 'Almond milk', ratio: 'equal' }, { name: 'Oat milk', ratio: 'equal' }] },
    { ingredient: 'Sour cream', subs: [{ name: 'Plain yogurt', ratio: 'equal' }, { name: 'Crème fraîche', ratio: 'equal' }] },
    { ingredient: 'Heavy cream', subs: [{ name: 'Coconut cream', ratio: 'equal' }, { name: 'Evaporated milk', ratio: 'equal' }] },
    { ingredient: 'Vanilla extract', subs: [{ name: 'Almond extract', ratio: '1/2 tsp per 1 tsp' }, { name: 'Maple extract', ratio: 'equal' }] },
    { ingredient: 'Baking powder', subs: [{ name: '1/4 tsp baking soda + 1/2 tsp cream of tartar', ratio: '1 tsp' }] },
    { ingredient: 'Cornstarch', subs: [{ name: 'Flour (use 50% more)', ratio: '1 tbsp cornstarch = 2 tbsp flour' }, { name: 'Arrowroot', ratio: 'equal' }] },
  ];

  const filtered = substitutes.filter((item) =>
    item.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Search Ingredient
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="e.g., butter, milk, egg..."
          className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Substitutions
        </h3>

        {filtered.length === 0 ? (
          <p className="text-center text-text-secondary py-4">No substitutes found. Try another ingredient.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div key={item.ingredient} className="border border-border rounded-[var(--radius-input)] p-4">
                <h4 className="font-medium text-text-primary mb-3">{item.ingredient}</h4>
                <div className="space-y-2">
                  {item.subs.map((sub, idx) => (
                    <div key={idx} className="bg-surface rounded-[var(--radius-input)] p-3">
                      <p className="text-sm text-text-primary">{sub.name}</p>
                      <p className="text-xs text-text-muted">Ratio: {sub.ratio}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        Substitutions work best in certain recipes. Test with small batches first, especially in baking.
      </p>
    </div>
  );
}
