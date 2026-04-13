'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';

export default function RandomRecipeGenerator() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    { value: '', label: 'Random meal from any category' },
    { value: 'Seafood', label: 'Seafood' },
    { value: 'Vegetarian', label: 'Vegetarian' },
    { value: 'Breakfast', label: 'Breakfast' },
    { value: 'Dessert', label: 'Dessert' },
    { value: 'Pasta', label: 'Pasta' },
    { value: 'Vegan', label: 'Vegan' },
  ];

  const getRecipe = async () => {
    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      let url = 'https://www.themealdb.com/api/json/v1/1/random.php';

      if (category) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (category && data.meals && data.meals.length > 0) {
        // For filtered results, pick a random one and fetch details
        const randomMeal = data.meals[Math.floor(Math.random() * data.meals.length)];
        const detailRes = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`
        );
        const detailData = await detailRes.json();
        setRecipe(detailData.meals[0]);
      } else if (data.meals && data.meals.length > 0) {
        setRecipe(data.meals[0]);
      } else {
        setError('No recipes found. Try again.');
      }
    } catch (err) {
      setError('Failed to fetch recipe. Try again.');
    }
    setLoading(false);
  };

  // Extract ingredients from recipe
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Meal category (optional)
          </label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categories}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={getRecipe}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Finding recipe...' : 'Get Random Recipe'}
        </Button>

        {recipe && (
          <div className="space-y-4">
            <div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-2">
                {recipe.strMeal}
              </h2>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  {recipe.strCategory}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  {recipe.strArea}
                </span>
                {recipe.strTags && (
                  recipe.strTags.split(',').slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                      {tag.trim()}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-3">
                Ingredients
              </h3>
              <ul className="space-y-2">
                {getIngredients(recipe).map((item, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-primary">
                    <span className="font-mono font-bold text-accent">•</span>
                    <span>
                      {item.measure && <span className="font-mono text-secondary">{item.measure}</span>} {item.ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-3">
                Instructions
              </h3>
              <p className="text-sm text-primary leading-relaxed whitespace-pre-wrap">
                {recipe.strInstructions}
              </p>
            </div>

            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition text-center"
              >
                Watch recipe video on YouTube
              </a>
            )}

            <Button
              onClick={getRecipe}
              disabled={loading}
              className="w-full"
            >
              Get another recipe
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
