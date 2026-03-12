'use client';

import { useState, useMemo } from 'react';

// Unicode fraction mappings for imperial measurements
const FRACTIONS = {
  0.125: '⅛',
  0.167: '⅙',
  0.25: '¼',
  0.333: '⅓',
  0.5: '½',
  0.667: '⅔',
  0.75: '¾',
  0.833: '⅚',
  0.875: '⅞',
};

// Unit dropdown options
const UNITS = [
  { value: 'g', label: 'g (grams)' },
  { value: 'kg', label: 'kg (kilograms)' },
  { value: 'ml', label: 'ml (millilitres)' },
  { value: 'l', label: 'L (litres)' },
  { value: 'cup', label: 'cup' },
  { value: 'tbsp', label: 'tbsp (tablespoon)' },
  { value: 'tsp', label: 'tsp (teaspoon)' },
  { value: 'oz', label: 'oz (ounces)' },
  { value: 'lb', label: 'lb (pounds)' },
  { value: 'piece', label: 'piece' },
  { value: 'pinch', label: 'pinch' },
  { value: 'totaste', label: 'to taste' },
];

// Function to format a number with fractions
const formatWithFraction = (num) => {
  if (num === 0) return '0';

  const whole = Math.floor(num);
  const decimal = num - whole;

  // Find closest fraction
  let closestFraction = null;
  let closestDiff = 1;

  for (const [decimalValue, fractionSymbol] of Object.entries(FRACTIONS)) {
    const diff = Math.abs(parseFloat(decimalValue) - decimal);
    if (diff < closestDiff && diff < 0.05) {
      closestDiff = diff;
      closestFraction = fractionSymbol;
    }
  }

  if (closestFraction) {
    return whole > 0 ? `${whole}${closestFraction}` : closestFraction;
  }

  // Round to 2 decimal places if no fraction matches
  const rounded = Math.round(num * 100) / 100;
  return rounded.toString();
};

// Smart rounding function
const smartRound = (value) => {
  if (value === 0) return 0;

  // For very small values, show more precision
  if (value < 0.1) {
    return Math.round(value * 1000) / 1000;
  }

  // For values 0.1-1, round to nearest 0.25
  if (value < 1) {
    return Math.round(value * 4) / 4;
  }

  // For values 1-10, round to nearest 0.5
  if (value < 10) {
    return Math.round(value * 2) / 2;
  }

  // For larger values, round to nearest whole number
  return Math.round(value);
};

export default function RecipeScaler() {
  const [originalServings, setOriginalServings] = useState('4');
  const [desiredServings, setDesiredServings] = useState('4');
  const [ingredients, setIngredients] = useState([
    { id: 1, quantity: '', unit: 'g', name: '' },
    { id: 2, quantity: '', unit: 'ml', name: '' },
    { id: 3, quantity: '', unit: 'cup', name: '' },
  ]);
  const [nextId, setNextId] = useState(4);

  // Calculate scaling factor
  const scaleFactor = useMemo(() => {
    const original = parseFloat(originalServings) || 1;
    const desired = parseFloat(desiredServings) || 1;
    return desired / original;
  }, [originalServings, desiredServings]);

  // Scale ingredient quantities
  const scaledIngredients = useMemo(() => {
    return ingredients.map((ingredient) => {
      const quantity = parseFloat(ingredient.quantity) || 0;
      const scaledQty = quantity * scaleFactor;
      const rounded = smartRound(scaledQty);
      return {
        ...ingredient,
        scaledQuantity: rounded,
      };
    });
  }, [ingredients, scaleFactor]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { id: nextId, quantity: '', unit: 'g', name: '' }]);
    setNextId(nextId + 1);
  };

  const handleRemoveIngredient = (id) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const handleIngredientChange = (id, field, value) => {
    setIngredients(
      ingredients.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing))
    );
  };

  const handleQuickScale = (factor) => {
    const original = parseFloat(originalServings) || 1;
    setDesiredServings((original * factor).toString());
  };

  const handleCopyRecipe = () => {
    let recipeText = `Recipe (${desiredServings} servings)\n\nIngredients:\n`;

    scaledIngredients.forEach((ing) => {
      if (ing.name) {
        const formattedQty =
          ing.unit === 'totaste' || ing.unit === 'pinch'
            ? ing.name
            : `${formatWithFraction(ing.scaledQuantity)} ${ing.unit} ${ing.name}`;
        recipeText += `• ${formattedQty}\n`;
      }
    });

    navigator.clipboard.writeText(recipeText);
  };

  return (
    <div className="space-y-3">
      {/* Servings Control */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="text-text-primary font-bold text-lg mb-4">Recipe Servings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Original Servings
            </label>
            <input
              type="number"
              value={originalServings}
              onChange={(e) => setOriginalServings(e.target.value)}
              placeholder="e.g., 4"
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary font-mono-num focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Desired Servings
            </label>
            <input
              type="number"
              value={desiredServings}
              onChange={(e) => setDesiredServings(e.target.value)}
              placeholder="e.g., 6"
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary font-mono-num focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Scale Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickScale(0.5)}
            className="px-4 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary font-medium hover:bg-white transition-colors"
          >
            ×½
          </button>
          <button
            onClick={() => handleQuickScale(2)}
            className="px-4 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary font-medium hover:bg-white transition-colors"
          >
            ×2
          </button>
          <button
            onClick={() => handleQuickScale(3)}
            className="px-4 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary font-medium hover:bg-white transition-colors"
          >
            ×3
          </button>
        </div>

        {/* Scaling Factor Display */}
        <div className="mt-4 p-3 bg-white border border-border rounded-[var(--radius-input)]">
          <p className="text-text-secondary text-sm">
            Scale factor: <span className="font-mono-num font-bold text-text-primary">
              {scaleFactor.toFixed(2)}
            </span>
            x
          </p>
        </div>
      </div>

      {/* Ingredients Input */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="text-text-primary font-bold text-lg mb-4">Ingredients</h2>

        <div className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <div key={ingredient.id} className="flex gap-2 items-start">
              <input
                type="number"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(ingredient.id, 'quantity', e.target.value)}
                placeholder="Qty"
                className="w-20 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary font-mono-num focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              />

              <select
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(ingredient.id, 'unit', e.target.value)}
                className="w-24 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              >
                {UNITS.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(ingredient.id, 'name', e.target.value)}
                placeholder="Ingredient name"
                className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              />

              <button
                onClick={() => handleRemoveIngredient(ingredient.id)}
                className="px-3 py-2 bg-white border border-border text-red-600 rounded-[var(--radius-input)] hover:bg-red-50 transition-colors text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddIngredient}
          className="mt-4 w-full px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-accent/90 transition-colors"
        >
          + Add Ingredient
        </button>
      </div>

      {/* Scaled Ingredients Output */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-text-primary font-bold text-lg">
            Scaled Ingredients ({desiredServings} servings)
          </h2>
          <button
            onClick={handleCopyRecipe}
            className="px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-accent/90 transition-colors text-sm"
          >
            Copy Recipe
          </button>
        </div>

        <div className="space-y-2">
          {scaledIngredients.map((ingredient) => {
            if (!ingredient.name) return null;

            const isTextUnit = ingredient.unit === 'totaste' || ingredient.unit === 'pinch';
            const displayQty = isTextUnit ? '' : formatWithFraction(ingredient.scaledQuantity);
            const displayUnit = isTextUnit ? ingredient.unit : ingredient.unit;

            return (
              <div
                key={ingredient.id}
                className="flex items-center gap-3 p-3 bg-white border border-border rounded-[var(--radius-input)] hover:border-accent/30 transition-colors"
              >
                <div className="flex-1">
                  <div className="text-text-primary">
                    <span className="font-mono-num font-bold">{displayQty}</span>
                    {displayQty && <span className="ml-2 text-text-secondary">{displayUnit}</span>}
                    <span className="ml-2 text-text-primary">{ingredient.name}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {scaledIngredients.filter((ing) => ing.name).length === 0 && (
            <div className="p-4 text-center text-text-muted text-sm">
              Add ingredients above to see scaled amounts
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
        <p className="text-text-secondary text-sm leading-relaxed">
          <span className="font-medium text-text-primary">Tip:</span> Quantities are automatically
          rounded to sensible amounts. For ingredients marked "to taste" or "pinch", adjust to your
          preference after scaling. Some ingredients (like spices and seasonings) may not scale
          linearly — taste as you cook!
        </p>
      </div>
    </div>
  );
}
