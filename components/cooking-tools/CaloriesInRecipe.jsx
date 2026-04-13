'use client';

import { useState } from 'react';

export default function CaloriesInRecipe() {
  const [ingredients, setIngredients] = useState([
    { name: 'Chicken breast', qty: 200, unit: 'g', calories: 331 },
  ]);
  const [servings, setServings] = useState(2);

  const calorieDatabase = {
    'chicken breast': 165,
    'olive oil': 884,
    'butter': 717,
    'rice': 130,
    'pasta': 371,
    'tomato': 18,
    'onion': 40,
    'garlic': 149,
    'broccoli': 34,
    'carrot': 41,
    'cheese': 402,
    'yogurt': 59,
    'egg': 155,
    'bread': 265,
    'almonds': 579,
  };

  const updateIngredient = (idx, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[idx][field] = field === 'qty' ? Number(value) : value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', qty: 100, unit: 'g', calories: 0 }]);
  };

  const removeIngredient = (idx) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const totalCalories = ingredients.reduce((sum, ing) => sum + ing.calories, 0);
  const caloriesPerServing = totalCalories / servings;

  const estimateCalories = (name, qty) => {
    const ingredient = Object.keys(calorieDatabase).find((key) =>
      name.toLowerCase().includes(key) || key.includes(name.toLowerCase())
    );
    if (!ingredient) return 0;
    return (qty / 100) * calorieDatabase[ingredient];
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Number of Servings
        </label>
        <input
          type="number"
          min="1"
          max="20"
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Ingredients
        </h3>

        <div className="space-y-3">
          {ingredients.map((ing, idx) => (
            <div key={idx} className="grid grid-cols-5 gap-2">
              <input
                type="text"
                value={ing.name}
                onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                placeholder="Ingredient"
                className="col-span-2 px-2 py-1 border border-border rounded-[var(--radius-input)] text-sm"
                list="ingredients"
              />
              <input
                type="number"
                value={ing.qty}
                onChange={(e) => updateIngredient(idx, 'qty', e.target.value)}
                placeholder="Qty"
                className="px-2 py-1 border border-border rounded-[var(--radius-input)] text-sm"
              />
              <select
                value={ing.unit}
                onChange={(e) => updateIngredient(idx, 'unit', e.target.value)}
                className="px-2 py-1 border border-border rounded-[var(--radius-input)] text-sm"
              >
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="tbsp">tbsp</option>
              </select>
              <button
                onClick={() => removeIngredient(idx)}
                className="px-2 text-error text-sm hover:bg-red-100 rounded"
              >
                -
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addIngredient}
          className="w-full mt-3 px-3 py-2 border border-accent text-accent rounded-[var(--radius-input)] font-medium hover:bg-blue-50"
        >
          Add Ingredient
        </button>

        <datalist id="ingredients">
          {Object.keys(calorieDatabase).map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Nutrition Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Total Calories</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              {totalCalories.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Per Serving</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              {caloriesPerServing.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        Calorie estimates are based on standard food values. Use USDA database for precise nutrition info.
      </p>
    </div>
  );
}
