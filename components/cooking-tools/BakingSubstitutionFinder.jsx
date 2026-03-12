'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const SUBSTITUTIONS = {
  eggs: [
    { name: 'Applesauce', ratio: '1 egg = ¼ cup (60ml)', notes: 'Best for moist cakes, adds slight apple flavour', tags: ['vegan', 'dairy-free'] },
    { name: 'Mashed banana', ratio: '1 egg = ¼ cup (60ml)', notes: 'Good for quick breads and brownies, adds banana flavour', tags: ['vegan', 'dairy-free'] },
    { name: 'Aquafaba', ratio: '1 egg = 3 tbsp (45ml)', notes: 'Liquid from canned chickpeas, works like egg whites', tags: ['vegan', 'dairy-free', 'gluten-free'] },
    { name: 'Flax/chia eggs', ratio: '1 egg = 1 tbsp ground + 3 tbsp water', notes: 'Let sit 15 mins before using, adds nutty flavour', tags: ['vegan', 'dairy-free'] },
  ],
  butter: [
    { name: 'Oil (coconut or vegetable)', ratio: '1 cup = ¾-1 cup oil', notes: 'Use slightly less, will make cakes softer', tags: ['vegan', 'dairy-free'] },
    { name: 'Applesauce', ratio: '1 cup = 1 cup applesauce', notes: 'Reduces fat, best for muffins and brownies', tags: ['vegan', 'dairy-free'] },
    { name: 'Coconut oil', ratio: '1:1 ratio', notes: 'Good for all baking, adds subtle coconut flavour', tags: ['vegan', 'dairy-free'] },
    { name: 'Greek yogurt', ratio: '1 cup = ½ cup yogurt + ½ cup oil', notes: 'Adds protein, keep some fat to avoid dry results', tags: ['lower-calorie'] },
  ],
  milk: [
    { name: 'Coconut milk', ratio: '1:1 ratio', notes: 'Use full-fat for best results, may add coconut flavour', tags: ['vegan', 'dairy-free'] },
    { name: 'Almond milk', ratio: '1:1 ratio', notes: 'Neutral flavour, use unsweetened if recipe is sweet', tags: ['vegan', 'dairy-free'] },
    { name: 'Oat milk', ratio: '1:1 ratio', notes: 'Rich and creamy, closest to dairy milk', tags: ['vegan', 'dairy-free'] },
    { name: 'Water + oil', ratio: '1 cup milk = ¾ cup water + ¼ cup oil', notes: 'Emergency option, slightly drier results', tags: ['vegan', 'dairy-free'] },
  ],
  sugar: [
    { name: 'Honey', ratio: '1 cup = ¾ cup honey, reduce liquid by ¼ cup', notes: 'Adds moisture and sweetness, reduce oven temp by 25°F', tags: ['vegan', 'dairy-free'] },
    { name: 'Maple syrup', ratio: '1 cup = ¾ cup + reduce liquid by ¼ cup', notes: 'Strong flavour, best in small amounts', tags: ['vegan', 'dairy-free'] },
    { name: 'Agave nectar', ratio: '1 cup = ⅔-¾ cup, reduce liquid by ¼ cup', notes: 'Neutral flavour, less sweet than sugar', tags: ['vegan', 'dairy-free'] },
    { name: 'Stevia', ratio: '1 cup = 1 tsp (very concentrated)', notes: 'Zero calories but can leave aftertaste', tags: ['vegan', 'dairy-free', 'lower-calorie'] },
  ],
  flour: [
    { name: 'Almond flour', ratio: '1:1 ratio', notes: 'Gluten-free, denser results, add 1 tbsp starch per cup', tags: ['gluten-free'] },
    { name: 'Coconut flour', ratio: '1 cup = ¼ cup flour (very absorbent)', notes: 'Add extra eggs or liquid, strong coconut flavour', tags: ['gluten-free', 'vegan'] },
    { name: 'Oat flour', ratio: '1:1 ratio', notes: 'Slightly sweet, gluten-free if certified', tags: ['gluten-free'] },
    { name: 'GF 1-to-1 flour blend', ratio: '1:1 ratio', notes: 'Formulated for baking, closest to wheat flour', tags: ['gluten-free'] },
  ],
  baking_powder: [
    { name: 'Baking soda + acid', ratio: '1 tsp powder = ¼ tsp soda + ½ tsp acid', notes: 'Use lemon juice, vinegar, or buttermilk as acid', tags: ['gluten-free', 'dairy-free'] },
    { name: 'Potassium bicarbonate', ratio: '1:1 ratio', notes: 'Sodium-free option, same rise', tags: ['gluten-free'] },
  ],
  cream: [
    { name: 'Greek yogurt', ratio: '1:1 ratio', notes: 'Adds tanginess and protein, lower fat', tags: ['lower-calorie'] },
    { name: 'Coconut cream', ratio: '1:1 ratio', notes: 'Full-fat from can of coconut milk (top part)', tags: ['vegan', 'dairy-free'] },
    { name: 'Cashew cream', ratio: '1:1 ratio', notes: 'Blend soaked cashews with water, creamy and neutral', tags: ['vegan', 'dairy-free'] },
  ],
  buttermilk: [
    { name: 'Milk + lemon/vinegar', ratio: '1 cup = 1 cup milk + 1 tbsp acid', notes: 'Let sit 5 mins before using, simulates buttermilk', tags: ['vegan', 'dairy-free'] },
    { name: 'Plain yogurt', ratio: '1:1 ratio', notes: 'Use full-fat, adds tanginess', tags: ['lower-calorie'] },
  ],
  honey: [
    { name: 'Maple syrup', ratio: '1:1 ratio', notes: 'Slightly different flavour, similar sweetness', tags: ['vegan', 'dairy-free'] },
    { name: 'Agave nectar', ratio: '1:1 ratio', notes: 'Less sweet than honey, more neutral flavour', tags: ['vegan', 'dairy-free'] },
  ],
  vanilla_extract: [
    { name: 'Almond extract', ratio: '½ the amount', notes: 'Much stronger, use half or less', tags: ['vegan', 'dairy-free'] },
    { name: 'Maple extract', ratio: '1:1 ratio', notes: 'Adds maple flavour instead of vanilla', tags: ['vegan', 'dairy-free'] },
  ],
  cornstarch: [
    { name: 'Arrowroot powder', ratio: '1:1 ratio', notes: 'Similar thickening power, neutral flavour', tags: ['gluten-free'] },
    { name: 'Tapioca starch', ratio: '1:1 ratio', notes: 'Creates glossy finish, good for puddings', tags: ['gluten-free', 'vegan'] },
  ],
  cream_cheese: [
    { name: 'Greek yogurt', ratio: '1:1 ratio', notes: 'Tangier, lower fat, works in cheesecake', tags: ['lower-calorie'] },
    { name: 'Cashew cream', ratio: '1:1 ratio', notes: 'Blend soaked cashews, creamier texture', tags: ['vegan', 'dairy-free'] },
  ],
  sour_cream: [
    { name: 'Plain yogurt', ratio: '1:1 ratio', notes: 'Very similar taste and function', tags: ['lower-calorie'] },
    { name: 'Greek yogurt + milk', ratio: '½ cup + ½ cup milk', notes: 'Adjust consistency with milk', tags: ['lower-calorie'] },
  ],
  yogurt: [
    { name: 'Sour cream', ratio: '1:1 ratio', notes: 'Tangier flavour, similar texture', tags: [] },
    { name: 'Greek yogurt + milk', ratio: '½ cup + ½ cup milk', notes: 'If you need regular yogurt consistency', tags: ['lower-calorie'] },
  ],
  oil: [
    { name: 'Applesauce', ratio: '1:1 ratio', notes: 'Reduces fat significantly, may be denser', tags: ['vegan', 'dairy-free'] },
    { name: 'Butter', ratio: '1 cup = 1 cup + ¼ cup extra', notes: 'Adds flavour and richness, slightly drier', tags: ['vegan'] },
  ],
  cocoa_powder: [
    { name: 'Carob powder', ratio: '1:1 ratio', notes: 'Slightly sweet, less intense chocolate flavour', tags: ['vegan', 'dairy-free'] },
    { name: 'Dutch cocoa powder', ratio: '1:1 ratio', notes: 'Darker and more intense, not interchangeable', tags: ['vegan', 'dairy-free'] },
  ],
  chocolate: [
    { name: 'Cocoa powder + butter', ratio: '½ cup cocoa + ½ cup butter = 1 cup chocolate', notes: 'Adjust sweetness separately', tags: ['vegan', 'dairy-free'] },
    { name: 'Carob chips', ratio: '1:1 ratio', notes: 'Less intense, naturally sweet', tags: ['vegan', 'dairy-free'] },
  ],
};

export default function BakingSubstitutionFinder() {
  const [selectedIngredient, setSelectedIngredient] = useState('eggs');
  const [activeFilters, setActiveFilters] = useState([]);

  const ingredients = Object.keys(SUBSTITUTIONS).sort((a, b) =>
    a.replace('_', ' ').localeCompare(b.replace('_', ' '))
  );

  const subs = SUBSTITUTIONS[selectedIngredient] || [];

  const filteredSubs = useMemo(() => {
    if (activeFilters.length === 0) return subs;
    return subs.filter((sub) =>
      activeFilters.every((filter) => sub.tags.includes(filter))
    );
  }, [subs, activeFilters]);

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const allTags = useMemo(() => {
    const tags = new Set();
    subs.forEach((sub) => {
      sub.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [subs]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Ingredient Selection */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Choose an Ingredient
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {ingredients.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => {
                setSelectedIngredient(ingredient);
                setActiveFilters([]);
              }}
              className={`px-3 py-2 rounded-[var(--radius-input)] text-sm font-medium transition-colors ${
                selectedIngredient === ingredient
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text-primary hover:border-accent'
              }`}
            >
              {ingredient.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </Card>

      {/* Filters */}
      {allTags.length > 0 && (
        <Card>
          <h4 className="text-sm font-medium text-text-primary mb-3">
            Filter by dietary needs
          </h4>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleFilter(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeFilters.includes(tag)
                    ? 'bg-accent text-white'
                    : 'bg-surface border border-border text-text-secondary hover:border-accent'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Substitutions */}
      <div className="space-y-3">
        {filteredSubs.length > 0 ? (
          filteredSubs.map((sub, idx) => (
            <Card key={idx}>
              <div className="flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-text-primary font-bold text-base">
                      {sub.name}
                    </h4>
                    <p className="text-accent font-mono text-sm mt-1 font-bold">
                      {sub.ratio}
                    </p>
                  </div>
                  {sub.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {sub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-accent-muted text-accent text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notes */}
                <p className="text-text-secondary text-sm">{sub.notes}</p>
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center p-6">
            <p className="text-text-muted">
              No substitutions match your filters. Try adjusting them.
            </p>
          </Card>
        )}
      </div>

      {/* Tips */}
      <Card className="bg-surface">
        <h4 className="font-medium text-text-primary mb-3">💡 General Tips</h4>
        <ul className="text-sm text-text-secondary space-y-2">
          <li>
            <span className="font-medium text-text-primary">Baking is precise:</span> Substitutions work best with one or two at a time
          </li>
          <li>
            <span className="font-medium text-text-primary">Test first:</span> Try substitutions in batches or simple recipes before cakes
          </li>
          <li>
            <span className="font-medium text-text-primary">Liquids matter:</span> Watch for wet/dry balance when substituting wet ingredients
          </li>
          <li>
            <span className="font-medium text-text-primary">Flavour changes:</span> Some substitutes alter taste — test a small batch first
          </li>
          <li>
            <span className="font-medium text-text-primary">Temperature:</span> Oil is liquid at room temp, butter isn't — this affects texture
          </li>
        </ul>
      </Card>
    </div>
  );
}
