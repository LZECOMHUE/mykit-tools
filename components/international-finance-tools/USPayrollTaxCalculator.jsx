'use client';

import { useState, useMemo } from 'react';

export default function USPayrollTaxCalculator() {
  const [salary, setSalary] = useState(60000);
  const [state, setState] = useState('CA');

  const results = useMemo(() => {
    // Employer-side FICA
    const ssMatch = Math.min(salary, 168600) * 0.062; // 6.2% up to wage base
    const medicareMath = salary * 0.0145; // 1.45%
    const ficaTotal = ssMatch + medicareMath;

    // FUTA (Federal Unemployment Tax Act) - 0.6% up to $7,000 wage base
    const futaTax = Math.min(salary, 7000) * 0.006;

    // SUTA (State Unemployment Tax Act) - varies by state (using 2.5% average)
    const sutaTax = Math.min(salary, 14000) * 0.025;

    // Additional Medicare Tax (employer-side) - 0.9% above $200k
    const additionalMedicareTax = salary > 200000 ? (salary - 200000) * 0.009 : 0;

    // State income tax (simplified CA estimate: 1% of salary)
    const stateIncomeTax = salary * (state === 'CA' ? 0.01 : 0);

    // Total employer cost
    const totalEmployerTax = ficaTotal + futaTax + sutaTax + additionalMedicareTax + stateIncomeTax;
    const totalCost = salary + totalEmployerTax;

    // Effective rate
    const employerTaxRate = ((totalEmployerTax / salary) * 100).toFixed(2);
    const totalCostRate = ((totalCost / salary) * 100).toFixed(2);

    return {
      salary,
      ssMath: Math.round(ssMatch),
      medicareMath: Math.round(medicareMath),
      ficaTotal: Math.round(ficaTotal),
      futaTax: Math.round(futaTax),
      sutaTax: Math.round(sutaTax),
      additionalMedicareTax: Math.round(additionalMedicareTax),
      stateIncomeTax: Math.round(stateIncomeTax),
      totalEmployerTax: Math.round(totalEmployerTax),
      totalCost: Math.round(totalCost),
      employerTaxRate,
      totalCostRate,
    };
  }, [salary, state]);

  return (
    <div className="space-y-6 p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Employee Salary</h3>

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
          <h3 className="text-lg font-semibold text-text-primary">Employer Tax Cost</h3>

          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Employee Salary:</span>
              <span className="font-mono font-semibold text-text-primary">
                ${results.salary.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-sm font-semibold text-text-primary mb-2">Employer FICA (7.65%):</p>
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-text-secondary ml-2">Social Security Match (6.2%):</span>
                <span className="font-mono text-accent">
                  ${results.ssMath.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary ml-2">Medicare Match (1.45%):</span>
                <span className="font-mono text-accent">
                  ${results.medicareMath.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-text-secondary">FUTA Tax (0.6%):</span>
                <span className="font-mono text-accent">
                  ${results.futaTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-text-secondary">SUTA Tax (~2.5%):</span>
                <span className="font-mono text-accent">
                  ${results.sutaTax.toLocaleString()}
                </span>
              </div>
              {results.stateIncomeTax > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">State Withholding:</span>
                  <span className="font-mono text-accent">
                    ${results.stateIncomeTax.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-border pt-3 bg-accent/10 -mx-4 px-4 py-3 rounded">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-text-primary">Total Employer Tax:</span>
                <span className="font-mono text-lg font-bold text-accent">
                  ${results.totalEmployerTax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-text-secondary text-sm">Tax Rate:</span>
                <span className="font-mono text-sm font-semibold">
                  {results.employerTaxRate}%
                </span>
              </div>

              <div className="border-t border-accent/20 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-text-primary">Total Cost to Hire:</span>
                  <span className="font-mono text-lg font-bold text-success">
                    ${results.totalCost.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mt-2">
                  Salary is {results.totalCostRate}% of total hiring cost
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <h4 className="font-semibold text-text-primary mb-2">Quick Fact</h4>
          <p className="text-sm text-text-secondary">
            Hiring a $60k employee actually costs the employer about $64,590 when payroll taxes are
            included.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-text-primary mb-2">Hidden Cost</h4>
          <p className="text-sm text-text-secondary">
            Employers also pay for health insurance, workers comp, and retirement benefits. Total
            loaded cost is typically 30-40% above base salary.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary mb-1">Disclaimer:</p>
        <p>
          This calculator uses simplified rates. Actual employer taxes vary by state, industry,
          and employee classification. SUTA rates depend on company unemployment history. Consult a
          payroll professional for accuracy.
        </p>
      </div>
    </div>
  );
}
