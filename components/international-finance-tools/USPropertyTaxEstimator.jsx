'use client';

import { useState, useMemo } from 'react';

export default function USPropertyTaxEstimator() {
  const [homeValue, setHomeValue] = useState(400000);
  const [state, setState] = useState('CA');

  // Average effective property tax rates by state (as % of home value)
  const propertyTaxRates = {
    AL: 0.41, AK: 1.19, AZ: 0.62, AR: 0.62, CA: 0.76,
    CO: 0.51, CT: 2.14, DE: 0.57, FL: 0.83, GA: 0.92,
    HI: 0.28, ID: 0.84, IL: 2.27, IN: 0.85, IA: 1.57,
    KS: 1.41, KY: 0.85, LA: 0.55, ME: 1.37, MD: 1.09,
    MA: 1.23, MI: 1.54, MN: 1.12, MS: 0.81, MO: 0.97,
    MT: 0.84, NE: 2.03, NV: 0.60, NH: 2.18, NJ: 2.49,
    NM: 0.80, NY: 1.72, NC: 0.86, ND: 0.98, OH: 1.56,
    OK: 0.90, OR: 0.97, PA: 1.58, RI: 1.63, SC: 0.57,
    SD: 1.31, TN: 0.71, TX: 1.80, UT: 0.60, VT: 1.90,
    VA: 0.82, WA: 0.94, WV: 0.58, WI: 1.85, WY: 0.61,
  };

  const results = useMemo(() => {
    const rate = propertyTaxRates[state] || 1.0;
    const annualTax = (homeValue * rate) / 100;
    const monthlyTax = annualTax / 12;

    return {
      rate: rate.toFixed(2),
      annualTax: Math.round(annualTax),
      monthlyTax: Math.round(monthlyTax),
    };
  }, [homeValue, state]);

  const states = Object.keys(propertyTaxRates).sort();

  return (
    <div className="space-y-6 p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Home Value</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Estimated Home Value
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={homeValue}
                onChange={(e) => setHomeValue(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="400000"
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
                  {s} - {propertyTaxRates[s].toFixed(2)}%
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Annual Property Tax</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Home Value:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${homeValue.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Tax Rate:</span>
                <span className="font-mono font-semibold text-accent">
                  {results.rate}%
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Annual Tax:</span>
                <span className="font-mono font-semibold text-accent">
                  ${results.annualTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Monthly Estimate:</span>
                <span className="font-mono font-semibold">
                  ${results.monthlyTax.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3 bg-info/10 -mx-4 px-4 py-3 rounded">
              <div className="text-sm text-text-secondary">
                <p className="font-semibold text-text-primary mb-1">Cost of Home Ownership</p>
                <p>
                  Property tax is typically included in your monthly mortgage payment through an
                  escrow account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Important:</p>
        <p>
          This is an estimate based on state averages. Your actual property tax depends on your
          county, local assessments, homestead exemptions, and other factors. Check your county
          assessor for precise calculations.
        </p>
      </div>
    </div>
  );
}
