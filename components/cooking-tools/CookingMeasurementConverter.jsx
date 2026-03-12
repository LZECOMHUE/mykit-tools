'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const CONVERSIONS = {
  // Metric to Imperial
  grams_to_oz: { from: 'grams', to: 'oz', factor: 0.03527, label: 'Grams to Ounces' },
  oz_to_grams: { from: 'oz', to: 'grams', factor: 28.35, label: 'Ounces to Grams' },
  ml_to_fl_oz: { from: 'ml', to: 'fl oz', factor: 0.0338, label: 'Millilitres to Fl Oz' },
  fl_oz_to_ml: { from: 'fl oz', to: 'ml', factor: 29.5735, label: 'Fl Oz to Millilitres' },

  // Common cooking measurements
  cups_to_ml: { from: 'cups', to: 'ml', factor: 236.588, label: 'Cups to Millilitres' },
  ml_to_cups: { from: 'ml', to: 'cups', factor: 0.00423, label: 'Millilitres to Cups' },
  tbsp_to_ml: { from: 'tbsp', to: 'ml', factor: 14.787, label: 'Tablespoons to Millilitres' },
  ml_to_tbsp: { from: 'ml', to: 'tbsp', factor: 0.0676, label: 'Millilitres to Tablespoons' },
  tsp_to_ml: { from: 'tsp', to: 'ml', factor: 4.929, label: 'Teaspoons to Millilitres' },
  ml_to_tsp: { from: 'ml', to: 'tsp', factor: 0.203, label: 'Millilitres to Teaspoons' },

  // Weight conversions
  kg_to_lbs: { from: 'kg', to: 'lbs', factor: 2.20462, label: 'Kilograms to Pounds' },
  lbs_to_kg: { from: 'lbs', to: 'kg', factor: 0.453592, label: 'Pounds to Kilograms' },
  g_to_lbs: { from: 'g', to: 'lbs', factor: 0.00220462, label: 'Grams to Pounds' },

  // Temperature
  celsius_to_fahrenheit: { from: '°C', to: '°F', formula: (c) => (c * 9) / 5 + 32, label: 'Celsius to Fahrenheit' },
  fahrenheit_to_celsius: { from: '°F', to: '°C', formula: (f) => ((f - 32) * 5) / 9, label: 'Fahrenheit to Celsius' },
};

const QUICK_RECIPES = {
  all_purpose_flour: { g: 120, cups: 1 },
  sugar: { g: 200, cups: 1 },
  butter: { g: 225, cups: 1 },
  milk: { ml: 240, cups: 1 },
  chocolate_chips: { g: 175, cups: 1 },
  honey: { g: 340, cups: 1 },
  water: { ml: 240, cups: 1 },
  oil: { ml: 240, cups: 1 },
  egg: { g: 50, count: 1 },
  baking_soda: { g: 5, tsp: 1 },
  baking_powder: { g: 5, tsp: 1 },
};

export default function CookingMeasurementConverter() {
  const [selectedConversion, setSelectedConversion] = useState('grams_to_oz');
  const [inputValue, setInputValue] = useState('100');
  const [view, setView] = useState('converter'); // 'converter' or 'quickref'

  const conversion = CONVERSIONS[selectedConversion];
  const conversionEntries = Object.entries(CONVERSIONS);

  const convertValue = useMemo(() => {
    const num = parseFloat(inputValue) || 0;
    if (conversion.formula) {
      return conversion.formula(num).toFixed(2);
    }
    return (num * conversion.factor).toFixed(3);
  }, [inputValue, conversion]);

  const reverseConversion = useMemo(() => {
    const entries = Object.entries(CONVERSIONS);
    const reverse = entries.find(
      ([_, conv]) =>
        conv.from === conversion.to && conv.to === conversion.from
    );
    return reverse ? reverse[0] : null;
  }, [selectedConversion, conversion]);

  const handleSwap = () => {
    if (reverseConversion) {
      setSelectedConversion(reverseConversion);
      setInputValue(convertValue);
    }
  };

  const handleQuickValue = (ingredient, unit, value) => {
    const conversion_key = Object.keys(CONVERSIONS).find(
      (key) =>
        CONVERSIONS[key].from === unit || CONVERSIONS[key].to === unit
    );

    if (conversion_key) {
      setSelectedConversion(conversion_key);
      setInputValue(value.toString());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* View Switcher */}
      <div className="flex gap-2">
        <Button
          onClick={() => setView('converter')}
          variant={view === 'converter' ? 'primary' : 'secondary'}
          className="flex-1"
        >
          Converter
        </Button>
        <Button
          onClick={() => setView('quickref')}
          variant={view === 'quickref' ? 'primary' : 'secondary'}
          className="flex-1"
        >
          Quick Reference
        </Button>
      </div>

      {/* Converter View */}
      {view === 'converter' && (
        <>
          {/* Conversion Type */}
          <Card>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
              Conversion Type
            </h3>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {conversionEntries.map(([key, conv]) => (
                <button
                  key={key}
                  onClick={() => setSelectedConversion(key)}
                  className={`w-full px-3 py-2 rounded-[var(--radius-input)] text-sm font-medium text-left transition-colors ${
                    selectedConversion === key
                      ? 'bg-accent text-white'
                      : 'bg-surface border border-border text-text-primary hover:border-accent'
                  }`}
                >
                  {conv.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Conversion Input/Output */}
          <Card>
            <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
              {conversion.label}
            </h3>

            <div className="space-y-4">
              {/* Input */}
              <div>
                <Input
                  label={`Enter ${conversion.from}`}
                  type="number"
                  step="0.01"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="100"
                />
              </div>

              {/* Conversion Display */}
              <div className="bg-accent-muted rounded-[var(--radius-input)] p-4">
                <p className="text-text-muted text-sm font-medium mb-2">Result</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-text-primary font-mono text-3xl font-bold">
                    {convertValue}
                  </p>
                  <p className="text-text-secondary text-lg font-medium">
                    {conversion.to}
                  </p>
                </div>
              </div>

              {/* Swap Button */}
              {reverseConversion && (
                <Button
                  onClick={handleSwap}
                  variant="secondary"
                  className="w-full"
                >
                  ↔ Swap ({conversion.to} to {conversion.from})
                </Button>
              )}
            </div>
          </Card>

          {/* Common Values */}
          <Card>
            <h3 className="text-sm font-heading font-bold text-text-primary mb-3">
              Common values
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[50, 100, 250, 500, 1000].map((val) => (
                <button
                  key={val}
                  onClick={() => setInputValue(val.toString())}
                  className="px-2 py-1 rounded-[var(--radius-input)] bg-surface border border-border text-text-secondary hover:border-accent text-xs font-medium transition-colors"
                >
                  {val}
                </button>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Quick Reference View */}
      {view === 'quickref' && (
        <Card>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
            Common Ingredient Equivalents
          </h3>

          <div className="space-y-4">
            {Object.entries(QUICK_RECIPES).map(([ingredient, conversions]) => (
              <div key={ingredient} className="border-b border-border pb-4 last:border-0">
                <h4 className="text-text-primary font-medium mb-2 capitalize">
                  {ingredient.replace(/_/g, ' ')}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(conversions).map(([unit, value]) => (
                    <button
                      key={`${ingredient}-${unit}`}
                      onClick={() =>
                        handleQuickValue(ingredient, unit, value)
                      }
                      className="px-3 py-2 rounded-[var(--radius-input)] bg-surface border border-border text-text-primary hover:border-accent text-xs font-medium transition-colors text-center"
                    >
                      <p className="font-mono font-bold">{value}</p>
                      <p className="text-text-muted text-xs">{unit}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Temperature Chart */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          🌡️ Oven Temperature Guide
        </h3>

        <div className="space-y-2 text-sm">
          {[
            { c: 150, f: 300, desc: 'Very slow' },
            { c: 160, f: 325, desc: 'Slow' },
            { c: 180, f: 350, desc: 'Moderate' },
            { c: 190, f: 375, desc: 'Moderately hot' },
            { c: 200, f: 400, desc: 'Hot' },
            { c: 220, f: 425, desc: 'Very hot' },
          ].map((temp, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-border last:border-0">
              <span className="text-text-secondary">{temp.desc}</span>
              <div className="flex gap-4">
                <span className="font-mono font-bold text-text-primary">
                  {temp.c}°C
                </span>
                <span className="font-mono font-bold text-text-primary">
                  {temp.f}°F
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tips */}
      <Card className="bg-surface">
        <h4 className="font-medium text-text-primary mb-3">💡 Measurement Tips</h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>
            • <span className="font-medium text-text-primary">Weight is more accurate</span> than
            volume for baking
          </li>
          <li>
            • <span className="font-medium text-text-primary">Pack ingredients differently:</span> flour
            should be spooned, not scooped
          </li>
          <li>
            • <span className="font-medium text-text-primary">Temperature conversions</span> can be
            rounded to nearest 5°C/°F
          </li>
          <li>
            • <span className="font-medium text-text-primary">Always check your scale</span> for
            accuracy
          </li>
        </ul>
      </Card>
    </div>
  );
}
