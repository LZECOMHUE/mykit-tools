'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Country to currency mapping
const COUNTRY_CURRENCY = {
  'US': 'USD',
  'GB': 'GBP',
  'FR': 'EUR',
  'DE': 'EUR',
  'IT': 'EUR',
  'ES': 'EUR',
  'JP': 'JPY',
  'AU': 'AUD',
  'CA': 'CAD',
  'CH': 'CHF',
  'CN': 'CNY',
  'IN': 'INR',
  'MX': 'MXN',
  'SG': 'SGD',
  'HK': 'HKD',
  'NZ': 'NZD',
  'SE': 'SEK',
  'NO': 'NOK',
  'ZA': 'ZAR',
  'BR': 'BRL',
};

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'FR', label: 'France' },
  { value: 'JP', label: 'Japan' },
  { value: 'AU', label: 'Australia' },
  { value: 'CA', label: 'Canada' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'DE', label: 'Germany' },
  { value: 'SG', label: 'Singapore' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'BR', label: 'Brazil' },
];

export default function TravelMoneyCalculator() {
  const [country, setCountry] = useState('US');
  const [budget, setBudget] = useState('1000');
  const [days, setDays] = useState('7');
  const [convertedBudget, setConvertedBudget] = useState('');
  const [breakdown, setBreakdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculate = async () => {
    if (!budget || parseFloat(budget) <= 0) {
      setError('Please enter a valid budget');
      return;
    }

    const numDays = parseInt(days) || 1;
    setLoading(true);
    setError('');

    try {
      const targetCurrency = COUNTRY_CURRENCY[country];
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${parseFloat(budget)}&from=GBP&to=${targetCurrency}`
      );
      const data = await res.json();

      if (data.rates && data.rates[targetCurrency]) {
        const converted = data.rates[targetCurrency];
        setConvertedBudget(converted.toFixed(2));

        // Calculate breakdown
        const accommodation = converted * 0.4; // 40%
        const food = converted * 0.25; // 25%
        const transport = converted * 0.15; // 15%
        const activities = converted * 0.2; // 20%

        setBreakdown({
          accommodation,
          food,
          transport,
          activities,
          total: converted,
          daily: converted / numDays,
          numDays
        });
      }
    } catch (err) {
      setError('Failed to fetch exchange rate');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') calculate();
  };

  const currencyMap = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'AUD': 'A$',
    'CAD': 'C$',
    'CHF': 'CHF',
    'CNY': '¥',
    'INR': '₹',
    'MXN': '$',
    'SGD': 'S$',
    'HKD': 'HK$',
    'NZD': 'NZ$',
    'SEK': 'kr',
    'NOK': 'kr',
    'ZAR': 'R',
    'BRL': 'R$',
  };

  const symbol = currencyMap[COUNTRY_CURRENCY[country]] || COUNTRY_CURRENCY[country];

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Destination country
          </label>
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={COUNTRIES}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Budget (GBP)
            </label>
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. 1000"
              min="0"
              step="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Trip length (days)
            </label>
            <Input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. 7"
              min="1"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={calculate}
          disabled={loading || !budget}
          className="w-full"
        >
          {loading ? 'Calculating...' : 'Calculate Budget'}
        </Button>

        {convertedBudget && breakdown && (
          <div className="space-y-4">
            <div className="p-4 bg-accent-muted rounded-lg border border-accent">
              <p className="text-sm text-secondary mb-1">Total budget</p>
              <p className="font-mono text-3xl font-bold text-accent">
                {symbol}{parseFloat(convertedBudget).toFixed(0)}
              </p>
              <p className="text-xs text-secondary mt-2">
                {symbol}{breakdown.daily.toFixed(0)} per day
              </p>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-3">
                Budget breakdown
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'Accommodation', amount: breakdown.accommodation, percent: 40, color: 'bg-blue-200' },
                  { label: 'Food & Drink', amount: breakdown.food, percent: 25, color: 'bg-green-200' },
                  { label: 'Transport', amount: breakdown.transport, percent: 15, color: 'bg-amber-200' },
                  { label: 'Activities', amount: breakdown.activities, percent: 20, color: 'bg-purple-200' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-primary">{item.label}</span>
                      <span className="font-mono text-primary">
                        {symbol}{item.amount.toFixed(0)} ({item.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{width: `${item.percent}%`}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
              <p className="font-medium mb-1">💡 Budget tips:</p>
              <ul className="text-xs space-y-1 list-disc list-inside">
                <li>Budget category allocations are approximate</li>
                <li>Adjust based on your travel style and destination</li>
                <li>Add 10-15% for contingencies</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
