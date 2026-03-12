'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const BREWING_METHODS = {
  french_press: {
    name: 'French Press',
    baseRatio: 15,
    waterTemp: '95-96°C (200-205°F)',
    grindSize: 'Coarse',
    steepTime: '4 minutes',
    notes: 'Immersion brewing. Stir after 1 min, then wait.',
  },
  pour_over: {
    name: 'Pour Over (V60/Chemex)',
    baseRatio: 16,
    waterTemp: '90-96°C (195-205°F)',
    grindSize: 'Medium',
    steepTime: '2-4 minutes',
    notes: 'Percolation brewing. Pour slowly in circles.',
  },
  aeropress: {
    name: 'AeroPress',
    baseRatio: 14,
    waterTemp: '80-90°C (175-195°F)',
    grindSize: 'Medium-fine',
    steepTime: '1.5-2.5 minutes',
    notes: 'Pressure + immersion. Very forgiving.',
  },
  espresso: {
    name: 'Espresso',
    baseRatio: 2,
    waterTemp: '88-92°C (190-198°F)',
    grindSize: 'Very fine',
    steepTime: '25-30 seconds',
    notes: 'High pressure. Precision matters.',
  },
  cold_brew: {
    name: 'Cold Brew',
    baseRatio: 4,
    waterTemp: 'Room temp (20-25°C)',
    grindSize: 'Coarse',
    steepTime: '12-24 hours (refrigerated)',
    notes: 'Immersion in cold. Can be strong concentrate.',
  },
  drip_filter: {
    name: 'Drip/Filter Coffee',
    baseRatio: 16,
    waterTemp: '92-96°C (200-205°F)',
    grindSize: 'Medium',
    steepTime: '4-6 minutes',
    notes: 'Automatic drip machine or paper filter.',
  },
  moka_pot: {
    name: 'Moka Pot',
    baseRatio: 7,
    waterTemp: '90-96°C (195-205°F)',
    grindSize: 'Fine',
    steepTime: '5-10 minutes',
    notes: 'Stovetop pressure. Watch for hissing.',
  },
};

const STRENGTH_ADJUSTMENTS = {
  lighter: { label: 'Lighter', ratioMultiplier: 1.2, description: 'More water, less intense' },
  standard: { label: 'Standard', ratioMultiplier: 1, description: 'Balanced brew' },
  stronger: { label: 'Stronger', ratioMultiplier: 0.85, description: 'Less water, more intense' },
};

export default function CoffeeRatioCalculator() {
  const [method, setMethod] = useState('pour_over');
  const [inputType, setInputType] = useState('coffee'); // 'coffee' or 'water'
  const [coffeeAmount, setCoffeeAmount] = useState('20');
  const [waterAmount, setWaterAmount] = useState('320');
  const [coffeeUnit, setCoffeeUnit] = useState('grams');
  const [waterUnit, setWaterUnit] = useState('ml');
  const [strength, setStrength] = useState('standard');

  const brewing = BREWING_METHODS[method];
  const strengthInfo = STRENGTH_ADJUSTMENTS[strength];

  // Get adjusted ratio
  const adjustedRatio = useMemo(() => {
    return brewing.baseRatio / strengthInfo.ratioMultiplier;
  }, [brewing.baseRatio, strengthInfo.ratioMultiplier]);

  // Convert units if needed
  const coffeeInGrams = useMemo(() => {
    const num = parseFloat(coffeeAmount) || 0;
    if (coffeeUnit === 'grams') return num;
    if (coffeeUnit === 'ounces') return num * 28.35;
    if (coffeeUnit === 'tablespoons') return num * 6; // Rough conversion: 1 tbsp ≈ 6g
    return num;
  }, [coffeeAmount, coffeeUnit]);

  const waterInMl = useMemo(() => {
    const num = parseFloat(waterAmount) || 0;
    if (waterUnit === 'ml') return num;
    if (waterUnit === 'liters') return num * 1000;
    if (waterUnit === 'cups') return num * 236.588; // 1 cup ≈ 237ml
    if (waterUnit === 'fl-oz') return num * 29.57; // 1 fl oz ≈ 30ml
    return num;
  }, [waterAmount, waterUnit]);

  // Calculate other value
  const calculatedWaterMl = useMemo(() => {
    if (inputType === 'coffee') {
      return coffeeInGrams * adjustedRatio;
    }
    return null;
  }, [inputType, coffeeInGrams, adjustedRatio]);

  const calculatedCoffeeGrams = useMemo(() => {
    if (inputType === 'water') {
      return waterInMl / adjustedRatio;
    }
    return null;
  }, [inputType, waterInMl, adjustedRatio]);

  const actualRatio = useMemo(() => {
    if (inputType === 'coffee') {
      return (calculatedWaterMl / coffeeInGrams).toFixed(1);
    }
    return (waterInMl / calculatedCoffeeGrams).toFixed(1);
  }, [inputType, calculatedWaterMl, coffeeInGrams, waterInMl, calculatedCoffeeGrams]);

  const handleSwitchInput = () => {
    setInputType(inputType === 'coffee' ? 'water' : 'coffee');
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Method Selection */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Brewing Method
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(BREWING_METHODS).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setMethod(key)}
              className={`px-3 py-2 rounded-[var(--radius-input)] text-sm font-medium transition-colors ${
                method === key
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text-primary hover:border-accent'
              }`}
            >
              {value.name}
            </button>
          ))}
        </div>
      </Card>

      {/* Strength Selector */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Coffee Strength
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {Object.entries(STRENGTH_ADJUSTMENTS).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setStrength(key)}
              className={`px-3 py-2 rounded-[var(--radius-input)] text-sm font-medium transition-colors ${
                strength === key
                  ? 'bg-accent-warm text-white'
                  : 'bg-surface border border-border text-text-primary hover:border-accent'
              }`}
            >
              {value.label}
            </button>
          ))}
        </div>

        <p className="text-text-secondary text-sm mt-3">
          {strengthInfo.description} (ratio: 1:{adjustedRatio.toFixed(1)})
        </p>
      </Card>

      {/* Input Section */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-bold text-text-primary">
            Coffee & Water
          </h3>
          <Button onClick={handleSwitchInput} variant="secondary" size="sm">
            Switch
          </Button>
        </div>

        <div className="space-y-4">
          {/* Coffee Input */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <Input
                label="Coffee"
                type="number"
                step="0.1"
                value={coffeeAmount}
                onChange={(e) => setCoffeeAmount(e.target.value)}
                placeholder="20"
                disabled={inputType === 'water'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Unit
              </label>
              <select
                value={coffeeUnit}
                onChange={(e) => setCoffeeUnit(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="grams">grams</option>
                <option value="ounces">ounces</option>
                <option value="tablespoons">tablespoons</option>
              </select>
            </div>
          </div>

          {/* Water Input */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <Input
                label="Water"
                type="number"
                step="5"
                value={waterAmount}
                onChange={(e) => setWaterAmount(e.target.value)}
                placeholder="320"
                disabled={inputType === 'coffee'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Unit
              </label>
              <select
                value={waterUnit}
                onChange={(e) => setWaterUnit(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="ml">ml</option>
                <option value="cups">cups</option>
                <option value="liters">liters</option>
                <option value="fl-oz">fl oz</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Your Brew
        </h3>

        <div className="space-y-3">
          {/* Coffee Amount */}
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-text-muted text-sm font-medium mb-1">Coffee</p>
            <p className="text-text-primary font-mono text-3xl font-bold">
              {inputType === 'coffee' ? coffeeInGrams.toFixed(1) : calculatedCoffeeGrams?.toFixed(1)}
            </p>
            <p className="text-text-muted text-xs mt-1">grams</p>
          </div>

          {/* Water Amount */}
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-text-muted text-sm font-medium mb-1">Water</p>
            <p className="text-text-primary font-mono text-3xl font-bold">
              {inputType === 'water' ? waterInMl.toFixed(0) : calculatedWaterMl?.toFixed(0)}
            </p>
            <p className="text-text-muted text-xs mt-1">ml</p>
          </div>

          {/* Ratio */}
          <div className="bg-accent-muted rounded-[var(--radius-input)] p-4">
            <p className="text-text-muted text-sm font-medium mb-1">Brewing Ratio</p>
            <p className="text-accent font-mono text-2xl font-bold">
              1:{actualRatio}
            </p>
            <p className="text-text-muted text-xs mt-1">coffee to water</p>
          </div>
        </div>
      </Card>

      {/* Method Details */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          {brewing.name} Guide
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary text-sm">Water Temperature</span>
            <span className="text-text-primary font-mono font-bold text-sm">
              {brewing.waterTemp}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary text-sm">Grind Size</span>
            <span className="text-text-primary font-mono font-bold text-sm">
              {brewing.grindSize}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-text-secondary text-sm">Brew Time</span>
            <span className="text-text-primary font-mono font-bold text-sm">
              {brewing.steepTime}
            </span>
          </div>

          <div className="py-2">
            <p className="text-text-secondary text-sm mb-1">Tips</p>
            <p className="text-text-primary text-sm">{brewing.notes}</p>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="bg-surface">
        <h4 className="font-medium text-text-primary mb-3">☕ Coffee Tips</h4>
        <ul className="text-sm text-text-secondary space-y-2">
          <li>
            <span className="font-medium text-text-primary">Freshness:</span> Use beans roasted within 2-4 weeks
          </li>
          <li>
            <span className="font-medium text-text-primary">Grind fresh:</span> Grind beans immediately before brewing
          </li>
          <li>
            <span className="font-medium text-text-primary">Water quality:</span> Use filtered water for best taste
          </li>
          <li>
            <span className="font-medium text-text-primary">Ratios are guides:</span> Adjust to your taste preference
          </li>
          <li>
            <span className="font-medium text-text-primary">Temperature matters:</span> Water too hot burns coffee; too cool under-extracts
          </li>
        </ul>
      </Card>
    </div>
  );
}
