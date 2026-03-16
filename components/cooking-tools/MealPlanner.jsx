'use client';

import { useState } from 'react';
import { downloadAsJPG, drawTable } from '@/lib/download-utils';
import Button from '@/components/ui/Button';

export default function MealPlanner() {
  const [meals, setMeals] = useState({
    Monday: { breakfast: '', lunch: '', dinner: '' },
    Tuesday: { breakfast: '', lunch: '', dinner: '' },
    Wednesday: { breakfast: '', lunch: '', dinner: '' },
    Thursday: { breakfast: '', lunch: '', dinner: '' },
    Friday: { breakfast: '', lunch: '', dinner: '' },
    Saturday: { breakfast: '', lunch: '', dinner: '' },
    Sunday: { breakfast: '', lunch: '', dinner: '' },
  });

  const [dietary, setDietary] = useState('all');

  const suggestions = {
    breakfast: ['Porridge', 'Scrambled eggs', 'Pancakes', 'Toast & jam', 'Granola', 'Smoothie'],
    lunch: ['Salad', 'Sandwich', 'Soup', 'Pasta', 'Rice bowl', 'Wrap'],
    dinner: ['Roast chicken', 'Steak', 'Fish & chips', 'Curry', 'Stir-fry', 'Pasta'],
  };

  const days = Object.keys(meals);

  const updateMeal = (day, mealType, value) => {
    setMeals({
      ...meals,
      [day]: { ...meals[day], [mealType]: value },
    });
  };

  const handleDownloadJPG = () => {
    const tableRows = days.map((day) => [
      day,
      meals[day].breakfast || '-',
      meals[day].lunch || '-',
      meals[day].dinner || '-',
    ]);

    downloadAsJPG({
      filename: `meal-plan-${new Date().toISOString().split('T')[0]}.jpg`,
      width: 800,
      height: 1000,
      title: 'Weekly Meal Plan',
      subtitle: new Date().toLocaleDateString('en-GB', { weekday: 'long', month: 'short', day: 'numeric' }),
      accentColor: '#2563eb',
      render: (ctx, area) => {
        let y = area.y;

        if (dietary !== 'all') {
          ctx.fillStyle = '#525252';
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(`Dietary: ${dietary.charAt(0).toUpperCase() + dietary.slice(1)}`, area.x, y);
          y += 18;
        }

        y = drawTable(ctx, {
          x: area.x,
          y: y,
          width: area.width,
          headers: ['Day', 'Breakfast', 'Lunch', 'Dinner'],
          rows: tableRows,
          colWidths: [1, 1.2, 1.2, 1.2],
          accentColor: '#2563eb',
        });
      },
    });
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Dietary Preferences
        </label>
        <select
          value={dietary}
          onChange={(e) => setDietary(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        >
          <option value="all">No restrictions</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="glutenfree">Gluten-free</option>
        </select>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          7-Day Meal Plan
        </h3>

        <div className="space-y-4">
          {days.map((day) => (
            <div key={day} className="border border-border rounded-[var(--radius-input)] p-4">
              <h4 className="font-medium text-text-primary mb-3">{day}</h4>
              <div className="grid grid-cols-3 gap-2">
                {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                  <input
                    key={mealType}
                    type="text"
                    value={meals[day][mealType]}
                    onChange={(e) => updateMeal(day, mealType, e.target.value)}
                    placeholder={mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                    className="px-2 py-1 border border-border rounded-[var(--radius-input)] text-sm"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setMeals({
              Monday: { breakfast: '', lunch: '', dinner: '' },
              Tuesday: { breakfast: '', lunch: '', dinner: '' },
              Wednesday: { breakfast: '', lunch: '', dinner: '' },
              Thursday: { breakfast: '', lunch: '', dinner: '' },
              Friday: { breakfast: '', lunch: '', dinner: '' },
              Saturday: { breakfast: '', lunch: '', dinner: '' },
              Sunday: { breakfast: '', lunch: '', dinner: '' },
            })}
            className="flex-1 px-3 py-2 border border-border text-text-primary rounded-[var(--radius-input)] font-medium hover:bg-surface"
          >
            Clear All
          </button>
          <Button
            onClick={handleDownloadJPG}
            variant="secondary"
            className="flex-1"
          >
            Download JPG
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Quick Suggestions
        </h3>

        <div className="space-y-3">
          {Object.entries(suggestions).map(([mealType, items]) => (
            <div key={mealType} className="bg-surface rounded-[var(--radius-input)] p-3">
              <p className="text-sm font-medium text-text-primary capitalize mb-2">{mealType}</p>
              <p className="text-sm text-text-secondary">
                {items.join(' | ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
