'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function HistoricalExchangeRateChecker() {
  const [date, setDate] = useState('');
  const [fromCurrency, setFromCurrency] = useState('GBP');
  const [toCurrency, setToCurrency] = useState('USD');
  const [historicalRate, setHistoricalRate] = useState('');
  const [currentRate, setCurrentRate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currencyOptions = [
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'CHF', label: 'CHF - Swiss Franc' },
  ];

  const getRate = async (targetDate) => {
    if (!targetDate) {
      setError('Please select a date');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const [histRes, currRes] = await Promise.all([
        fetch(
          `https://api.frankfurter.app/${targetDate}?from=${fromCurrency}&to=${toCurrency}`
        ),
        fetch(
          `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`
        )
      ]);

      if (!histRes.ok || !currRes.ok) {
        throw new Error('Failed to fetch rates');
      }

      const histData = await histRes.json();
      const currData = await currRes.json();

      if (histData.rates && histData.rates[toCurrency]) {
        setHistoricalRate(histData.rates[toCurrency]);
        setCurrentRate(currData.rates[toCurrency]);
      } else {
        setError('No data available for this date. Try a more recent date.');
      }
    } catch (err) {
      setError('Failed to fetch exchange rates');
    }
    setLoading(false);
  };

  const handleSearch = () => {
    getRate(date);
  };

  const getChangePercent = () => {
    if (!historicalRate || !currentRate) return 0;
    const change = ((currentRate - historicalRate) / historicalRate) * 100;
    return change.toFixed(2);
  };

  const changePercent = getChangePercent();
  const isUp = parseFloat(changePercent) > 0;

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Select a date
          </label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              From
            </label>
            <Select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              options={currencyOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              To
            </label>
            <Select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              options={currencyOptions}
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleSearch}
          disabled={loading || !date}
          className="w-full"
        >
          {loading ? 'Loading...' : 'Check Rate'}
        </Button>

        {historicalRate && currentRate && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-surface border border-border rounded-lg">
                <p className="text-xs font-medium text-secondary mb-1 uppercase">
                  Rate on {date}
                </p>
                <p className="font-mono text-2xl font-bold text-primary">
                  1 {fromCurrency} = {historicalRate.toFixed(4)} {toCurrency}
                </p>
              </div>

              <div className="p-4 bg-accent-muted border border-accent rounded-lg">
                <p className="text-xs font-medium text-secondary mb-1 uppercase">
                  Rate today
                </p>
                <p className="font-mono text-2xl font-bold text-accent">
                  1 {fromCurrency} = {currentRate.toFixed(4)} {toCurrency}
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${isUp ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className="text-sm font-medium mb-1">
                {isUp ? '📈 Appreciation' : '📉 Depreciation'}
              </p>
              <p className={`font-mono text-lg font-bold ${isUp ? 'text-green-700' : 'text-red-700'}`}>
                {isUp ? '+' : ''}{changePercent}% change
              </p>
            </div>

            <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
              <p className="font-medium">What this means:</p>
              <p className="text-xs mt-1">
                {isUp ?
                  `The ${fromCurrency} has strengthened against the ${toCurrency} since ${date}. You get more ${toCurrency} for each ${fromCurrency}.` :
                  `The ${fromCurrency} has weakened against the ${toCurrency} since ${date}. You get fewer ${toCurrency} for each ${fromCurrency}.`
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
