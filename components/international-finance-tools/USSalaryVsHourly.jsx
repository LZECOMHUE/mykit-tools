'use client';

import { useState, useMemo } from 'react';

export default function USSalaryVsHourly() {
  const [inputType, setInputType] = useState('salary');
  const [salary, setSalary] = useState(60000);
  const [hourlyRate, setHourlyRate] = useState(30);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [state, setState] = useState('CA');
  const [filingStatus, setFilingStatus] = useState('single');

  const results = useMemo(() => {
    // Calculate gross annual from whichever input is provided
    let grossAnnual = 0;
    let displayHourly = 0;
    let displaySalary = 0;

    if (inputType === 'salary') {
      grossAnnual = salary;
      const totalHours = hoursPerWeek * weeksPerYear;
      displayHourly = totalHours > 0 ? salary / totalHours : 0;
      displaySalary = salary;
    } else {
      grossAnnual = hourlyRate * hoursPerWeek * weeksPerYear;
      displayHourly = hourlyRate;
      displaySalary = grossAnnual;
    }

    // Federal tax (simplified 2025 brackets for single filer)
    let federalTax = 0;
    const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
    const taxableIncome = Math.max(0, grossAnnual - standardDeduction);

    if (filingStatus === 'single') {
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
    }

    // FICA taxes
    const ssTax = Math.min(grossAnnual, 168600) * 0.062; // 6.2%
    const medicareTax = grossAnnual * 0.0145; // 1.45%
    const ficaTax = ssTax + medicareTax;

    // State tax (CA estimate)
    let stateTax = 0;
    if (state === 'CA' && taxableIncome > 10000) {
      stateTax = Math.min(taxableIncome - 10000, 2000) * 0.01;
    }

    const totalTax = federalTax + ficaTax + stateTax;
    const takeHome = grossAnnual - totalTax;
    const monthlyTakeHome = takeHome / 12;
    const biweeklyTakeHome = takeHome / 26;
    const weeklyTakeHome = takeHome / 52;

    const effectiveHourly = hoursPerWeek > 0 ? takeHome / (hoursPerWeek * weeksPerYear) : 0;

    return {
      grossAnnual: Math.round(grossAnnual),
      displaySalary: Math.round(displaySalary),
      displayHourly: displayHourly.toFixed(2),
      federalTax: Math.round(federalTax),
      ficaTax: Math.round(ficaTax),
      stateTax: Math.round(stateTax),
      totalTax: Math.round(totalTax),
      takeHome: Math.round(takeHome),
      monthlyTakeHome: Math.round(monthlyTakeHome),
      biweeklyTakeHome: Math.round(biweeklyTakeHome),
      weeklyTakeHome: Math.round(weeklyTakeHome),
      effectiveHourly: effectiveHourly.toFixed(2),
      effectiveTaxRate: ((totalTax / grossAnnual) * 100).toFixed(1),
    };
  }, [inputType, salary, hourlyRate, hoursPerWeek, weeksPerYear, state, filingStatus]);

  return (
    <div className="space-y-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Income Details</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Income Type
            </label>
            <div className="space-y-2">
              {['salary', 'hourly'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="inputType"
                    value={type}
                    checked={inputType === type}
                    onChange={(e) => setInputType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-text-secondary">
                    {type === 'salary' ? 'Annual Salary' : 'Hourly Rate'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {inputType === 'salary' ? (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Annual Salary
              </label>
              <div className="flex items-center">
                <span className="text-text-secondary mr-2">$</span>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                  placeholder="60000"
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Hourly Rate
                </label>
                <div className="flex items-center">
                  <span className="text-text-secondary mr-2">$</span>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Math.max(0, Number(e.target.value)))}
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                    placeholder="30"
                    step="0.25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Hours per Week
                </label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                  placeholder="40"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Weeks per Year
                </label>
                <input
                  type="number"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                  placeholder="52"
                />
              </div>
            </>
          )}

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
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Take-Home Pay</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Gross Annual:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.grossAnnual.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Federal Tax:</span>
                <span className="font-mono text-accent">
                  ${results.federalTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">FICA (Social Security + Medicare):</span>
                <span className="font-mono text-accent">
                  ${results.ficaTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">State Tax:</span>
                <span className="font-mono text-accent">
                  ${results.stateTax.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3 bg-success/10 -mx-4 px-4 py-3 rounded">
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-text-primary">Annual Take-Home:</span>
                <span className="font-mono text-lg font-bold text-success">
                  ${results.takeHome.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Monthly:</span>
                  <span className="font-mono font-semibold">
                    ${results.monthlyTakeHome.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Biweekly:</span>
                  <span className="font-mono font-semibold">
                    ${results.biweeklyTakeHome.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Weekly:</span>
                  <span className="font-mono font-semibold">
                    ${results.weeklyTakeHome.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Effective Tax Rate:</span>
                <span className="font-mono font-semibold text-text-primary">
                  {results.effectiveTaxRate}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Effective Hourly (after tax):</span>
                <span className="font-mono font-semibold text-text-primary">
                  ${results.effectiveHourly}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Disclaimer:</p>
        <p>
          This calculator uses simplified tax estimates. Actual take-home pay varies based on
          deductions, credits, pretax benefits, and state-specific rules.
        </p>
      </div>
    </div>
  );
}
