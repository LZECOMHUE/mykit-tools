'use client';

import { useState, useMemo } from 'react';

export default function USW4Calculator() {
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [filingStatus, setFilingStatus] = useState('single');
  const [dependents, setDependents] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [multipleJobs, setMultipleJobs] = useState(false);

  const results = useMemo(() => {
    const grossIncome = annualIncome + otherIncome;
    const standardDeduction = {
      single: 14600,
      married: 29200,
      headOfHouse: 21900,
    }[filingStatus] || 14600;

    const childTaxCredit = dependents * 2000; // $2,000 per qualifying child under 17

    const taxableIncome = Math.max(0, grossIncome - standardDeduction);

    // Calculate federal tax based on filing status and income
    let federalTax = 0;
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

    federalTax = Math.max(0, federalTax - childTaxCredit);

    const ficaTax = grossIncome * 0.0765; // Social Security + Medicare

    const totalTax = federalTax + ficaTax;
    const payPeriodsPerYear = 26; // Biweekly
    const withholdingPerPaycheck = totalTax / payPeriodsPerYear;

    // Recommendations
    let step4Recommendation = 0;
    let step3Recommendation = 0;

    if (otherIncome > 5000 || multipleJobs) {
      step3Recommendation = Math.round(withholdingPerPaycheck * 2);
    }

    if (federalTax > 0) {
      step4Recommendation = Math.round(federalTax / payPeriodsPerYear);
    }

    return {
      grossIncome: Math.round(grossIncome),
      standardDeduction,
      taxableIncome: Math.round(taxableIncome),
      federalTax: Math.round(federalTax),
      ficaTax: Math.round(ficaTax),
      totalTax: Math.round(totalTax),
      withholdingPerPaycheck: Math.round(withholdingPerPaycheck),
      step3Recommendation,
      step4Recommendation,
      payPeriodsPerYear,
      yearlyWithholding: Math.round(withholdingPerPaycheck * payPeriodsPerYear),
    };
  }, [annualIncome, filingStatus, dependents, otherIncome, multipleJobs]);

  return (
    <div className="space-y-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Income & Dependents</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Annual Salary (Primary Job)
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="75000"
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
              <option value="headOfHouse">Head of Household</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Number of Dependents
            </label>
            <input
              type="number"
              value={dependents}
              onChange={(e) => setDependents(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
              min="0"
              max="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Other Income (Gig, Side Job, etc.)
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={otherIncome}
                onChange={(e) => setOtherIncome(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="0"
              />
            </div>
          </div>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={multipleJobs}
              onChange={(e) => setMultipleJobs(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-text-secondary">I have multiple jobs</span>
          </label>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Annual Tax Estimate</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Income:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.grossIncome.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-text-secondary">Standard Deduction:</span>
                <span className="font-mono">
                  ${results.standardDeduction.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Taxable Income:</span>
                <span className="font-mono font-semibold">
                  ${results.taxableIncome.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-text-secondary">Federal Income Tax:</span>
                <span className="font-mono text-accent">
                  ${results.federalTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">FICA (Social Security + Medicare):</span>
                <span className="font-mono text-accent">
                  ${results.ficaTax.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3 bg-accent/10 -mx-4 px-4 py-3 rounded">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-text-primary">Total Annual Tax:</span>
                <span className="font-mono text-lg font-bold text-accent">
                  ${results.totalTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Per Paycheck (Biweekly):</span>
                <span className="font-mono font-semibold">
                  ${results.withholdingPerPaycheck.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* W-4 Recommendation */}
      <div className="bg-accent/10 border border-accent rounded-lg p-4">
        <h3 className="font-semibold text-text-primary mb-3">W-4 Recommendation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-text-secondary mb-2">
              <span className="font-semibold">Step 3 - Other Income:</span>
            </p>
            <p className="font-mono font-semibold text-text-primary">
              ${results.step3Recommendation.toLocaleString()}
            </p>
            <p className="text-text-muted text-xs mt-1">
              {multipleJobs || otherIncome > 5000
                ? 'Recommended withholding from other income'
                : 'No adjustment needed'}
            </p>
          </div>
          <div>
            <p className="text-text-secondary mb-2">
              <span className="font-semibold">Step 4 - Extra Withholding:</span>
            </p>
            <p className="font-mono font-semibold text-text-primary">
              ${results.step4Recommendation.toLocaleString()}
            </p>
            <p className="text-text-muted text-xs mt-1">
              Additional per paycheck if needed to avoid large refund
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-text-primary mb-2">Dependents Matter</p>
          <p className="text-text-secondary">
            Each qualifying child under 17 gives you a $2,000 Child Tax Credit, reducing your tax
            liability.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-text-primary mb-2">Fill Out Your W-4</p>
          <p className="text-text-secondary">
            Give this form to your employer when you start a job or when your situation changes
            (marriage, new child, second job).
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Disclaimer:</p>
        <p>
          This is a simplified W-4 guide. For complex situations (multiple jobs, side income,
          investments), use the IRS W-4 calculator at irs.gov/w4app for official guidance.
        </p>
      </div>
    </div>
  );
}
