'use client';

import { useState, useMemo } from 'react';

export default function NationalInsuranceCalculator() {
  const [annualSalary, setAnnualSalary] = useState(35000);
  const [employeeType, setEmployeeType] = useState('employee');

  const results = useMemo(() => {
    const employeeLower = 12570;
    const employeeUpper = 50270;
    const employeeRate = 0.08;
    const employeeHighRate = 0.02;
    const employerRate = 0.138;
    const employerThreshold = 9100;

    let employeeNI = 0;
    if (annualSalary > employeeLower) {
      const taxableIncome = annualSalary - employeeLower;
      const basicRateNI = Math.min(taxableIncome, employeeUpper - employeeLower) * employeeRate;
      const higherRateNI = Math.max(0, taxableIncome - (employeeUpper - employeeLower)) * employeeHighRate;
      employeeNI = basicRateNI + higherRateNI;
    }

    let employerNI = 0;
    if (employeeType === 'employee' && annualSalary > employerThreshold) {
      employerNI = (annualSalary - employerThreshold) * employerRate;
    }

    const monthlyEmployeeNI = employeeNI / 12;
    const monthlyEmployerNI = employerNI / 12;
    const takehome = annualSalary - employeeNI;

    return {
      employeeNI,
      monthlyEmployeeNI,
      employerNI,
      monthlyEmployerNI,
      totalCost: annualSalary + employerNI,
      takehome,
      monthlyTakehome: takehome / 12,
      effectiveRate: ((employeeNI / annualSalary) * 100).toFixed(2),
    };
  }, [annualSalary, employeeType]);

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Annual Salary
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Type
          </label>
          <select
            value={employeeType}
            onChange={(e) => setEmployeeType(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="employee">Employee</option>
            <option value="director">Director</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Employee National Insurance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Annual NI</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.employeeNI.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Monthly NI</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.monthlyEmployeeNI.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Effective Rate</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              {results.effectiveRate}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Take-Home Pay
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Annual Take-Home</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.takehome.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Monthly Take-Home</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.monthlyTakehome.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {employeeType === 'employee' && (
        <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
          <h3 className="font-heading text-lg font-bold text-text-primary">
            Employer National Insurance
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface rounded-[var(--radius-input)] p-4">
              <p className="text-sm text-text-secondary mb-1">Annual Employer NI</p>
              <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
                £{results.employerNI.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="bg-surface rounded-[var(--radius-input)] p-4">
              <p className="text-sm text-text-secondary mb-1">Total Cost to Employer</p>
              <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
                £{results.totalCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          <p className="text-sm text-text-secondary bg-surface rounded-[var(--radius-input)] p-3">
            Employer pays 13.8% NI on salary above £9,100/year
          </p>
        </div>
      )}

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        2025/26 rates. This is for reference only. Check HMRC guidance for your specific circumstances.
      </p>
    </div>
  );
}
