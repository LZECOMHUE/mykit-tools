'use client';

import { useState, useMemo } from 'react';

export default function USSalesTaxCalculator() {
  const [amount, setAmount] = useState(100);
  const [state, setState] = useState('CA');

  // State sales tax rates (2025 estimates)
  const stateTaxRates = {
    AL: 4.0, AK: 0.0, AZ: 5.6, AR: 6.5, CA: 7.25,
    CO: 4.63, CT: 6.35, DE: 0.0, FL: 6.0, GA: 4.0,
    HI: 4.0, ID: 6.0, IL: 6.25, IN: 7.0, IA: 6.0,
    KS: 5.7, KY: 6.0, LA: 4.45, ME: 5.5, MD: 6.0,
    MA: 6.25, MI: 6.0, MN: 6.875, MS: 7.0, MO: 4.225,
    MT: 0.0, NE: 5.5, NV: 6.85, NH: 0.0, NJ: 6.625,
    NM: 5.125, NY: 4.0, NC: 4.75, ND: 5.0, OH: 5.75,
    OK: 4.5, OR: 0.0, PA: 6.0, RI: 7.0, SC: 7.5,
    SD: 4.2, TN: 9.55, TX: 6.25, UT: 4.7, VT: 6.0,
    VA: 5.3, WA: 6.5, WV: 6.0, WI: 5.0, WY: 4.0,
  };

  const results = useMemo(() => {
    const rate = stateTaxRates[state] || 5.0;
    const taxAmount = (amount * rate) / 100;
    const total = amount + taxAmount;

    return {
      rate: rate.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      total: total.toFixed(2),
    };
  }, [amount, state]);

  const states = Object.keys(stateTaxRates).sort();

  return (
    <div className="space-y-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Purchase Amount</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Pre-Tax Amount
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="100"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s} - {stateTaxRates[s].toFixed(2)}%
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Sales Tax</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Pre-Tax Amount:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${parseFloat(amount).toFixed(2)}
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Tax Rate:</span>
                <span className="font-mono font-semibold text-accent">
                  {results.rate}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Sales Tax:</span>
                <span className="font-mono font-semibold text-accent">
                  ${parseFloat(results.taxAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3 bg-success/10 -mx-4 px-4 py-3 rounded">
              <div className="flex justify-between">
                <span className="font-semibold text-text-primary">Total (with Tax):</span>
                <span className="font-mono text-lg font-bold text-success">
                  ${parseFloat(results.total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Note:</p>
        <p>
          Sales tax rates shown are state-level averages. Local counties and cities may add
          additional taxes. Some items (groceries, medicine) may be exempt. Check your locality for
          exact rates.
        </p>
      </div>
    </div>
  );
}
