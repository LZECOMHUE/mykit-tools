'use client';

import { useState, useMemo } from 'react';

export default function USSelfEmploymentTaxCalculator() {
  const [income1099, setIncome1099] = useState(50000);
  const [businessExpenses, setBusinessExpenses] = useState(5000);
  const [state, setState] = useState('CA');

  const results = useMemo(() => {
    const netIncome = income1099 - businessExpenses;
    const seIncome = Math.max(0, netIncome * 0.9235); // 92.35% calculation
    const seTax = seIncome * 0.153; // 15.3%
    const seTaxDeduction = seTax / 2;
    const taxableIncome = Math.max(0, netIncome - seTaxDeduction);

    // Simplified federal tax (2025 rates for single filer)
    let federalTax = 0;
    if (taxableIncome > 11600) {
      federalTax = 11600 * 0.10;
      if (taxableIncome > 47150) {
        federalTax += (47150 - 11600) * 0.12;
        if (taxableIncome > 100525) {
          federalTax += (100525 - 47150) * 0.22;
          if (taxableIncome > taxableIncome) {
            federalTax += (taxableIncome - 100525) * 0.24;
          }
        } else {
          federalTax += (taxableIncome - 47150) * 0.22;
        }
      } else {
        federalTax += (taxableIncome - 11600) * 0.12;
      }
    } else {
      federalTax = taxableIncome * 0.10;
    }

    // State tax (varies by state, using CA 1% estimate)
    const stateTaxRates = {
      CA: 0.0105, TX: 0, FL: 0, NY: 0.0465, WA: 0,
    };
    const stateTax = taxableIncome * (stateTaxRates[state] || 0.02);

    const quarterlyPayment = (seTax + federalTax + stateTax) / 4;

    return {
      netIncome: Math.round(netIncome),
      seTax: Math.round(seTax),
      federalTax: Math.round(federalTax),
      stateTax: Math.round(stateTax),
      totalTax: Math.round(seTax + federalTax + stateTax),
      quarterlyPayment: Math.round(quarterlyPayment),
      takeHome: Math.round(netIncome - seTax - federalTax - stateTax),
    };
  }, [income1099, businessExpenses, state]);

  return (
    <div className="space-y-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Income & Expenses</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              1099 Income
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={income1099}
                onChange={(e) => setIncome1099(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Business Expenses
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={businessExpenses}
                onChange={(e) => setBusinessExpenses(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="5000"
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
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="NY">New York</option>
              <option value="WA">Washington</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Tax Breakdown</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Net Income:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.netIncome.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Self-Employment Tax (15.3%):</span>
                <span className="font-mono text-accent font-semibold">
                  ${results.seTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Federal Income Tax:</span>
                <span className="font-mono text-accent font-semibold">
                  ${results.federalTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">State Income Tax:</span>
                <span className="font-mono text-accent font-semibold">
                  ${results.stateTax.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2 text-lg">
                <span className="font-semibold text-text-primary">Total Tax:</span>
                <span className="font-mono font-bold text-accent">
                  ${results.totalTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Quarterly Estimated Payment:</span>
                <span className="font-mono font-semibold">
                  ${results.quarterlyPayment.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3 bg-success/10 -mx-4 px-4 py-3 rounded">
              <div className="flex justify-between">
                <span className="font-semibold text-text-primary">Take-Home:</span>
                <span className="font-mono text-lg font-bold text-success">
                  ${results.takeHome.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Disclaimer:</p>
        <p>
          This is an estimate. Actual taxes depend on deductions, credits, and state-specific rules.
          Consult a tax professional for accurate calculations.
        </p>
      </div>
    </div>
  );
}
