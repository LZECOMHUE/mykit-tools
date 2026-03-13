'use client';

import { useState, useMemo } from 'react';

// Hardcoded exchange rates (last updated March 12, 2026) - GBP base
const EXCHANGE_RATES = {
  'GBP': 1.0,
  'USD': 1.27,
  'EUR': 1.17,
  'JPY': 189.45,
  'AUD': 1.94,
  'CAD': 1.75,
  'CHF': 1.13,
  'CNY': 9.15,
  'INR': 105.20,
  'MXN': 21.45,
  'SGD': 1.72,
  'HKD': 9.92,
  'NZD': 2.09,
  'SEK': 13.85,
  'NOK': 13.70,
  'DKK': 8.70,
  'ZAR': 24.10,
  'BRL': 6.35,
  'AED': 4.66,
  'SAR': 4.77,
  'KWD': 0.39,
  'SGD': 1.72,
  'THB': 44.80,
  'MYR': 5.90,
  'PHP': 71.50,
  'IDR': 20100,
  'VND': 32000,
  'KRW': 1650,
  'TWD': 40.50,
  'HKD': 9.92,
  'PKR': 355.00
};

const CURRENCIES = Object.keys(EXCHANGE_RATES).sort();

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('GBP');
  const [toCurrency, setToCurrency] = useState('USD');

  const result = useMemo(() => {
    const num = parseFloat(amount);
    if (isNaN(num) || num < 0) return null;

    const rate = EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency];
    const converted = num * rate;
    const inverseRate = 1 / rate;

    return {
      converted: converted.toFixed(2),
      rate: rate.toFixed(4),
      inverseRate: inverseRate.toFixed(4)
    };
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="w-full space-y-6">
      {/* Amount Input */}
      <div>
        <label className="text-text-secondary text-sm font-medium">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
          className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Currency Selection */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* From */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            From
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {CURRENCIES.map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>

        {/* To */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            To
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {CURRENCIES.map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button */}
      <button
        onClick={swapCurrencies}
        className="w-full rounded-[var(--radius-card)] bg-white border border-border text-text-primary px-4 py-2 text-sm font-medium hover:bg-surface transition-colors"
      >
        Swap Currencies
      </button>

      {/* Result */}
      {result && (
        <>
          <div className="rounded-[var(--radius-card)] bg-accent bg-opacity-10 border border-accent p-4">
            <p className="text-text-secondary text-sm font-medium mb-2">
              Result
            </p>
            <p className="text-3xl font-bold font-mono text-accent">
              {result.converted}
            </p>
            <p className="text-text-secondary text-sm mt-1">
              {amount} {fromCurrency} = {result.converted} {toCurrency}
            </p>
          </div>

          {/* Exchange Rates */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Rate
              </p>
              <p className="font-mono text-text-primary mt-1">
                1 {fromCurrency} = {result.rate} {toCurrency}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
              <p className="text-text-secondary text-[11px] font-medium uppercase">
                Reverse Rate
              </p>
              <p className="font-mono text-text-primary mt-1">
                1 {toCurrency} = {result.inverseRate} {fromCurrency}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Disclaimer */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
        <p className="text-text-secondary text-[11px]">
          Note: Rates are approximate and last updated March 12, 2026. For live rates, check your bank or a financial service.
        </p>
      </div>
    </div>
  );
}
