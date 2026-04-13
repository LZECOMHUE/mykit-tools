'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('GBP');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch('https://api.frankfurter.app/currencies');
        const data = await res.json();
        const currencyList = Object.entries(data).map(([code, name]) => ({
          value: code,
          label: `${code} - ${name}`
        }));
        currencyList.sort((a, b) => a.value.localeCompare(b.value));
        setCurrencies(currencyList);
      } catch (err) {
        setError('Failed to load currencies');
      }
      setLoading(false);
    };

    fetchCurrencies();
  }, []);

  const convert = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setConverting(true);
    setError('');

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${parseFloat(amount)}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();

      if (data.rates && data.rates[toCurrency]) {
        setResult(data.rates[toCurrency]);
        setLastUpdated(new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }));
      } else {
        setError('Conversion failed. Try again.');
      }
    } catch (err) {
      setError('Failed to fetch exchange rate');
    }
    setConverting(false);
  };

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') convert();
  };

  if (loading) return <Card><p className="text-secondary">Loading currencies...</p></Card>;

  const currencyOptions = currencies;

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Amount
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter amount"
            step="0.01"
            min="0"
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

          <div className="flex flex-col justify-end">
            <Button onClick={swap} variant="secondary" className="w-full">
              Swap
            </Button>
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
          onClick={convert}
          disabled={converting || !amount}
          className="w-full"
        >
          {converting ? 'Converting...' : 'Convert'}
        </Button>

        {result && (
          <div className="space-y-3">
            <div className="p-4 bg-accent-muted rounded-lg border border-accent">
              <p className="text-sm text-secondary mb-1">Result</p>
              <p className="font-mono text-3xl font-bold text-primary">
                {parseFloat(result).toFixed(2)} {toCurrency}
              </p>
            </div>

            <div className="text-xs text-secondary text-center">
              1 {fromCurrency} = {(parseFloat(result) / parseFloat(amount)).toFixed(4)} {toCurrency}
            </div>

            {lastUpdated && (
              <div className="text-xs text-secondary text-center">
                Exchange rate as of {lastUpdated}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
