'use client';

import { useState, useMemo } from 'react';

const countries = {
  US: { name: 'United States', limit: 0.08, unit: 'BAC%' },
  CA: { name: 'Canada', limit: 0.08, unit: 'BAC%' },
  AU: { name: 'Australia', limit: 0.05, unit: 'BAC%' },
  UK: { name: 'United Kingdom', limit: 0.08, unit: 'BAC%' },
  DE: { name: 'Germany', limit: 0.05, unit: 'BAC%' },
  FR: { name: 'France', limit: 0.05, unit: 'BAC%' },
  JP: { name: 'Japan', limit: 0.03, unit: 'BAC%' },
  SE: { name: 'Sweden', limit: 0.02, unit: 'BAC%' },
  AE: { name: 'UAE', limit: 0.0, unit: 'BAC%' },
  IN: { name: 'India', limit: 0.03, unit: 'BAC%' },
};

export default function BloodAlcoholLimitByCountry() {
  const [country, setCountry] = useState('US');
  const [drinks, setDrinks] = useState('2');
  const [weight, setWeight] = useState('75');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [timeHours, setTimeHours] = useState('1');

  const calculations = useMemo(() => {
    const numDrinks = parseFloat(drinks) || 0;
    let weightKg = parseFloat(weight) || 75;

    if (weightUnit === 'lbs') {
      weightKg = weightKg * 0.453592;
    }

    const isMale = true; // Simplified assumption
    const waterDistribution = isMale ? 0.68 : 0.55;

    // Standard drink = 14g alcohol
    const totalAlcohol = numDrinks * 14;
    const bloodVolume = weightKg * 1000 * waterDistribution;
    const bac = (totalAlcohol * 100) / (bloodVolume * 0.806);

    // Elimination rate: ~0.015 BAC per hour
    const eliminationRate = 0.015;
    const adjustedBAC = Math.max(0, bac - eliminationRate * (parseFloat(timeHours) || 1));

    const countryData = countries[country];
    const isLegal = adjustedBAC <= countryData.limit;

    return {
      bac: bac.toFixed(3),
      adjustedBAC: adjustedBAC.toFixed(3),
      legalLimit: countryData.limit.toFixed(3),
      isLegal,
      country: countryData.name,
      drinks: numDrinks,
      timeHours: parseFloat(timeHours),
    };
  }, [drinks, weight, weightUnit, timeHours, country]);

  const formatBAC = (value) => {
    return (parseFloat(value) * 100).toFixed(2);
  };

  return (
    <div className="bg-surface rounded-lg p-8 space-y-8">
      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            {Object.entries(countries).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Body Weight
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-white"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Number of Standard Drinks
          </label>
          <input
            type="number"
            value={drinks}
            onChange={(e) => setDrinks(e.target.value)}
            step="0.5"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
          <div className="text-xs text-text-muted mt-1">
            1 drink = 14g alcohol (12oz beer, 5oz wine, 1.5oz spirits)
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Hours Since First Drink
          </label>
          <input
            type="number"
            value={timeHours}
            onChange={(e) => setTimeHours(e.target.value)}
            step="0.5"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
          <div className="text-xs text-text-muted mt-1">
            ~0.015 BAC eliminated per hour
          </div>
        </div>
      </div>

      {/* Results */}
      <div className={`rounded-lg p-8 border-2 ${
        calculations.isLegal
          ? 'bg-green-50 border-green-200'
          : 'bg-red-50 border-red-200'
      }`}>
        <div
          className={`text-4xl font-mono font-bold mb-2 ${
            calculations.isLegal ? 'text-green-900' : 'text-red-900'
          }`}
        >
          {formatBAC(calculations.adjustedBAC)}%
        </div>
        <div className={`text-xl font-semibold ${
          calculations.isLegal ? 'text-green-900' : 'text-red-900'
        }`}>
          {calculations.isLegal ? '✓ Legal to Drive' : '✗ Over Legal Limit'}
        </div>
        <div className={`text-sm mt-2 ${
          calculations.isLegal ? 'text-green-800' : 'text-red-800'
        }`}>
          Legal limit in {calculations.country}: {formatBAC(calculations.legalLimit)}%
        </div>
      </div>

      {/* BAC Breakdown */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          BAC Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-text-secondary mb-2">Initial BAC</div>
            <div className="text-3xl font-mono font-bold text-accent">
              {formatBAC(calculations.bac)}%
            </div>
          </div>
          <div>
            <div className="text-sm text-text-secondary mb-2">After {calculations.timeHours}h</div>
            <div className="text-3xl font-mono font-bold text-accent">
              {formatBAC(calculations.adjustedBAC)}%
            </div>
          </div>
        </div>
      </div>

      {/* Global Limits */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Drink-Driving Limits by Country
        </h3>
        <div className="space-y-2">
          {Object.entries(countries)
            .sort((a, b) => a[1].limit - b[1].limit)
            .map(([key, data]) => (
              <div
                key={key}
                className={`flex justify-between items-center p-3 rounded border ${
                  country === key
                    ? 'bg-accent/10 border-accent'
                    : 'bg-surface border-border'
                }`}
              >
                <span className="text-text-secondary">{data.name}</span>
                <span className="font-mono font-bold text-text-primary">
                  {(data.limit * 100).toFixed(2)}%
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Impairment Effects */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">🚗 BAC and Impairment</h3>
        <div className="space-y-2 text-sm text-blue-800">
          {[
            { bac: '0.02-0.04%', effect: 'Some loss of judgment, slight coordination issues' },
            { bac: '0.05-0.07%', effect: 'Reduced coordination, slower reactions, impaired judgment' },
            { bac: '0.08%+', effect: 'Significantly impaired, unsafe to drive (illegal in most places)' },
            { bac: '0.15%+', effect: 'Major loss of balance and coordination' },
            { bac: '0.30%+', effect: 'Severe intoxication, potential loss of consciousness' },
          ].map((item) => (
            <div key={item.bac} className="border-b border-blue-200 pb-2">
              <div className="font-medium">{item.bac}</div>
              <div className="text-xs">{item.effect}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="font-semibold text-red-900 mb-2">⚠️ Important Reminder</h3>
        <p className="text-sm text-red-800">
          This calculator provides estimates only. Individual responses to alcohol vary
          based on food intake, medication, health conditions, and other factors. When
          in doubt, don't drive. Use a taxi, rideshare, or designated driver instead.
          Drink responsibly and stay safe.
        </p>
      </div>
    </div>
  );
}
