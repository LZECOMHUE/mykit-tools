'use client';

import { useState, useMemo } from 'react';

export default function USHourlyWageCalculator() {
  const [annualSalary, setAnnualSalary] = useState(50000);
  const [state, setState] = useState('CA');
  const [filingStatus, setFilingStatus] = useState('single');

  const results = useMemo(() => {
    // Standard deduction
    const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
    const taxableIncome = Math.max(0, annualSalary - standardDeduction);

    // Federal tax (simplified single filer bracket)
    let federalTax = 0;
    if (taxableIncome > 11600) {
      federalTax = 11600 * 0.1;
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
      federalTax = taxableIncome * 0.1;
    }

    // FICA (6.2% SS + 1.45% Medicare)
    const ssTax = Math.min(annualSalary, 168600) * 0.062;
    const medicareTax = annualSalary * 0.0145;
    const ficaTax = ssTax + medicareTax;

    // State tax (CA estimate 1%)
    let stateTax = 0;
    if (state === 'CA') {
      stateTax = taxableIncome * 0.01;
    }

    const totalTax = federalTax + ficaTax + stateTax;
    const netAnnual = annualSalary - totalTax;

    // Calculate hourly rates
    const workHoursPerYear = 2080; // 40 hrs/week * 52 weeks

    const preeTaxHourly = annualSalary / workHoursPerYear;
    const postTaxHourly = netAnnual / workHoursPerYear;

    // Monthly and weekly
    const monthlyGross = annualSalary / 12;
    const monthlyNet = netAnnual / 12;
    const weeklyGross = annualSalary / 52;
    const weeklyNet = netAnnual / 52;
    const biweeklyNet = netAnnual / 26;

    const effectiveTaxRate = ((totalTax / annualSalary) * 100).toFixed(1);

    return {
      annualSalary: Math.round(annualSalary),
      federalTax: Math.round(federalTax),
      ficaTax: Math.round(ficaTax),
      stateTax: Math.round(stateTax),
      totalTax: Math.round(totalTax),
      netAnnual: Math.round(netAnnual),
      preTaxHourly: preeTaxHourly.toFixed(2),
      postTaxHourly: postTaxHourly.toFixed(2),
      monthlyGross: Math.round(monthlyGross),
      monthlyNet: Math.round(monthlyNet),
      weeklyGross: Math.round(weeklyGross),
      weeklyNet: Math.round(weeklyNet),
      biweeklyNet: Math.round(biweeklyNet),
      effectiveTaxRate,
    };
  }, [annualSalary, state, filingStatus]);

  return (
    <div className="space-y-6 p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Income Details</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Annual Salary
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
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
          <h3 className="text-lg font-semibold text-text-primary">Hourly Breakdown</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Pre-Tax Hourly Rate:</span>
              <span className="font-mono text-lg font-semibold text-text-primary">
                ${results.preTaxHourly}
              </span>
            </div>

            <div className="border-t border-border pt-3 bg-success/10 -mx-4 px-4 py-3 rounded">
              <div className="flex justify-between">
                <span className="font-semibold text-text-primary">Post-Tax Hourly Rate:</span>
                <span className="font-mono text-lg font-bold text-success">
                  ${results.postTaxHourly}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-1">What you actually earn per hour</p>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-sm font-semibold text-text-primary mb-2">Tax Breakdown:</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Federal:</span>
                  <span className="font-mono">
                    ${results.federalTax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">FICA:</span>
                  <span className="font-mono">
                    ${results.ficaTax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">State:</span>
                  <span className="font-mono">
                    ${results.stateTax.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-border pt-1 flex justify-between font-semibold">
                  <span>Total Taxes:</span>
                  <span className="font-mono">
                    ${results.totalTax.toLocaleString()} ({results.effectiveTaxRate}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pay Frequency Breakdown */}
      <div className="bg-surface p-4 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4">Pay Frequency Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted mb-1">Monthly</p>
            <div className="space-y-1">
              <p className="font-mono text-sm text-text-secondary">
                ${results.monthlyGross.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted">gross</p>
              <p className="border-t border-border pt-1 font-mono text-sm font-semibold text-text-primary">
                ${results.monthlyNet.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted">net</p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted mb-1">Weekly</p>
            <div className="space-y-1">
              <p className="font-mono text-sm text-text-secondary">
                ${results.weeklyGross.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted">gross</p>
              <p className="border-t border-border pt-1 font-mono text-sm font-semibold text-text-primary">
                ${results.weeklyNet.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted">net</p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-3 text-center bg-accent/5">
            <p className="text-xs text-text-muted mb-1">Biweekly (Most Common)</p>
            <div className="space-y-1">
              <p className="font-mono text-sm text-text-secondary">
                ${(results.weeklyGross * 2).toLocaleString()}
              </p>
              <p className="text-xs text-text-muted">gross</p>
              <p className="border-t border-border pt-1 font-mono text-sm font-semibold text-accent">
                ${results.biweeklyNet.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted">net</p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-text-muted mb-1">Annual</p>
            <div className="space-y-1">
              <p className="font-mono text-sm text-text-secondary">
                ${results.annualSalary.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted">gross</p>
              <p className="border-t border-border pt-1 font-mono text-sm font-semibold text-text-primary">
                ${results.netAnnual.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted">net</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Note:</p>
        <p>
          This assumes full-time employment (2,080 hours per year - 40 hours/week, 52 weeks/year).
          The calculation uses simplified tax brackets and does not include deductions, credits, or
          pre-tax benefits (401k, health insurance, FSA).
        </p>
      </div>
    </div>
  );
}
