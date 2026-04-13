'use client';

import { useState, useMemo } from 'react';

export default function USBonusTaxCalculator() {
  const [bonusAmount, setBonusAmount] = useState(5000);
  const [regularSalary, setRegularSalary] = useState(60000);
  const [state, setState] = useState('CA');
  const [witholdingMethod, setWitholdingMethod] = useState('flat');

  const results = useMemo(() => {
    // Federal withholding - flat 22% or aggregate method
    let federalWithholding = 0;
    if (witholdingMethod === 'flat') {
      federalWithholding = bonusAmount * 0.22;
    } else {
      // Aggregate method - calculate total tax on (salary + bonus), then subtract regular tax
      const totalIncome = regularSalary + bonusAmount;
      const standardDeduction = 14600;
      const taxableTotal = Math.max(0, totalIncome - standardDeduction);

      let totalTax = 0;
      if (taxableTotal > 11600) {
        totalTax = 11600 * 0.1;
        if (taxableTotal > 47150) {
          totalTax += (47150 - 11600) * 0.12;
          if (taxableTotal > 100525) {
            totalTax += (100525 - 47150) * 0.22;
            if (taxableTotal > taxableTotal) {
              totalTax += (taxableTotal - 100525) * 0.24;
            }
          } else {
            totalTax += (taxableTotal - 47150) * 0.22;
          }
        } else {
          totalTax += (taxableTotal - 11600) * 0.12;
        }
      } else {
        totalTax = taxableTotal * 0.1;
      }

      // Regular salary tax
      const salaryTaxable = Math.max(0, regularSalary - standardDeduction);
      let salaryTax = 0;
      if (salaryTaxable > 11600) {
        salaryTax = 11600 * 0.1 + (salaryTaxable - 11600) * 0.12;
      } else {
        salaryTax = salaryTaxable * 0.1;
      }

      federalWithholding = totalTax - salaryTax;
    }

    // FICA on bonus
    const ssTax = Math.min(bonusAmount, 168600) * 0.062;
    const medicareTax = bonusAmount * 0.0145;
    const ficaTax = ssTax + medicareTax;

    // State tax (CA estimate)
    let stateWithholding = 0;
    if (state === 'CA') {
      stateWithholding = bonusAmount * 0.01;
    }

    const totalWithholding = federalWithholding + ficaTax + stateWithholding;
    const netBonus = bonusAmount - totalWithholding;

    return {
      federalWithholding: Math.round(federalWithholding),
      ficaTax: Math.round(ficaTax),
      ssTax: Math.round(ssTax),
      medicareTax: Math.round(medicareTax),
      stateWithholding: Math.round(stateWithholding),
      totalWithholding: Math.round(totalWithholding),
      netBonus: Math.round(netBonus),
      effectiveTaxRate: ((totalWithholding / bonusAmount) * 100).toFixed(1),
    };
  }, [bonusAmount, regularSalary, state, witholdingMethod]);

  return (
    <div className="space-y-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Bonus Details</h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Bonus Amount
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="5000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Regular Annual Salary
            </label>
            <div className="flex items-center">
              <span className="text-text-secondary mr-2">$</span>
              <input
                type="number"
                value={regularSalary}
                onChange={(e) => setRegularSalary(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
                placeholder="60000"
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

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Federal Withholding Method
            </label>
            <select
              value={witholdingMethod}
              onChange={(e) => setWitholdingMethod(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              <option value="flat">Flat 22% (simpler)</option>
              <option value="aggregate">Aggregate (more accurate)</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Tax Withholding</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Bonus Amount:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${bonusAmount.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-sm font-semibold text-text-primary mb-2">Withholding Breakdown:</p>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-text-secondary">Federal Income Tax:</span>
                <span className="font-mono text-accent">
                  ${results.federalWithholding.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-text-secondary">Social Security (6.2%):</span>
                <span className="font-mono text-accent">
                  ${results.ssTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-text-secondary">Medicare (1.45%):</span>
                <span className="font-mono text-accent">
                  ${results.medicareTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">State Withholding:</span>
                <span className="font-mono text-accent">
                  ${results.stateWithholding.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3 bg-warning/10 -mx-4 px-4 py-3 rounded">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-text-primary">Total Withholding:</span>
                <span className="font-mono text-lg font-bold text-warning">
                  ${results.totalWithholding.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Effective Tax Rate:</span>
                <span className="font-mono font-semibold">
                  {results.effectiveTaxRate}%
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3 bg-success/10 -mx-4 px-4 py-3 rounded">
              <div className="flex justify-between">
                <span className="font-semibold text-text-primary">Net Bonus (in your pocket):</span>
                <span className="font-mono text-lg font-bold text-success">
                  ${results.netBonus.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Important:</p>
        <p>
          Actual withholding depends on your W-4 elections and year-to-date income. The aggregate
          method is more accurate for large bonuses but requires more calculation. Check your
          paystub to confirm exact withholding applied.
        </p>
      </div>
    </div>
  );
}
