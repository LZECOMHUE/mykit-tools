'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const COMMON_INGREDIENTS = [
  'Vodka', 'Rum', 'Gin', 'Tequila', 'Whiskey', 'Brandy',
  'Lime juice', 'Lemon juice', 'Cola', 'Tonic water',
  'Orange juice', 'Cranberry juice', 'Triple sec',
  'Simple syrup', 'Ginger beer', 'Club soda'
];

export default function CocktailFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const searchCocktails = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter an ingredient');
      return;
    }

    setLoading(true);
    setError('');
    setCocktails([]);
    setSelectedCocktail(null);
    setSearched(true);

    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();

      if (data.drinks && data.drinks.length > 0) {
        setCocktails(data.drinks.slice(0, 20));
      } else {
        setError('No cocktails found with that ingredient. Try another.');
      }
    } catch (err) {
      setError('Failed to fetch cocktails. Try again.');
    }
    setLoading(false);
  };

  const getCocktailDetails = async (cocktailId) => {
    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
      );
      const data = await res.json();
      if (data.drinks && data.drinks.length > 0) {
        setSelectedCocktail(data.drinks[0]);
      }
    } catch (err) {
      setError('Failed to fetch cocktail details');
    }
  };

  const getIngredients = (cocktail) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') searchCocktails();
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Search by ingredient
          </label>
          <div className="flex gap-2">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. Vodka, Rum, Gin"
              className="flex-1"
              list="ingredients"
            />
            <datalist id="ingredients">
              {COMMON_INGREDIENTS.map(ing => (
                <option key={ing} value={ing} />
              ))}
            </datalist>
            <Button
              onClick={searchCocktails}
              disabled={loading || !searchTerm.trim()}
            >
              {loading ? 'Searching...' : 'Find'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {searched && cocktails.length === 0 && !selectedCocktail && !loading && !error && (
          <p className="text-secondary text-sm">No cocktails found. Try another ingredient.</p>
        )}

        {!selectedCocktail ? (
          <div>
            {cocktails.length > 0 && (
              <>
                <p className="text-sm text-secondary mb-3">
                  Found {cocktails.length} cocktail{cocktails.length !== 1 ? 's' : ''} with {searchTerm}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cocktails.map(cocktail => (
                    <button
                      key={cocktail.idDrink}
                      onClick={() => getCocktailDetails(cocktail.idDrink)}
                      className="group text-left p-3 bg-surface border border-border rounded-lg hover:border-accent hover:bg-accent-muted transition"
                    >
                      <div className="relative w-full h-32 rounded mb-2 overflow-hidden">
                        <img
                          src={cocktail.strDrinkThumb}
                          alt={cocktail.strDrink}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <p className="font-medium text-primary text-sm group-hover:text-accent transition">
                        {cocktail.strDrink}
                      </p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedCocktail(null)}
              className="text-sm text-accent hover:text-accent-hover font-medium"
            >
              Back to list
            </button>

            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <img
                src={selectedCocktail.strDrinkThumb}
                alt={selectedCocktail.strDrink}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="font-heading text-2xl font-bold text-primary">
              {selectedCocktail.strDrink}
            </h2>

            <div className="flex gap-2">
              {selectedCocktail.strCategory && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  {selectedCocktail.strCategory}
                </span>
              )}
              {selectedCocktail.strGlass && (
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                  {selectedCocktail.strGlass}
                </span>
              )}
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-3">
                Ingredients
              </h3>
              <ul className="space-y-2">
                {getIngredients(selectedCocktail).map((item, idx) => (
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
              <p className="text-sm text-primary leading-relaxed">
                {selectedCocktail.strInstructions}
              </p>
            </div>

            <Button
              onClick={() => setSelectedCocktail(null)}
              className="w-full"
            >
              Try another ingredient
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
