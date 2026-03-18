'use client';

import { useState, useMemo } from 'react';

const TAX_BRACKETS = [
  { threshold: 18200, rate: 0 },
  { threshold: 45000, rate: 0.19 },
  { threshold: 120000, rate: 0.325 },
  { threshold: 180000, rate: 0.37 },
  { threshold: Infinity, rate: 0.45 },
];

const SUPER_RATE_EMPLOYER = 0.115; // 11.5% Superannuation Guarantee
const MEDICARE_LEVY = 0.02; // 2% Medicare levy

function calculateTax(income) {
  let tax = 0;
  let previousThreshold = 0;

  for (const bracket of TAX_BRACKETS) {
    if (income <= previousThreshold) break;

    const currentThreshold = Math.min(bracket.threshold, income);
    if (bracket.rate > 0 && currentThreshold > previousThreshold) {
      const taxableInBracket = currentThreshold - previousThreshold;
      tax += taxableInBracket * bracket.rate;
    }
    previousThreshold = currentThreshold;
  }

  return tax;
}

export default function AustraliaContractorVsEmployee() {
  const [annualSalaryOrRate, setAnnualSalaryOrRate] = useState(80000);
  const [workingDaysPerYear, setWorkingDaysPerYear] = useState(240);
  const [isContractorDayRate, setIsContractorDayRate] = useState(false);

  const results = useMemo(() => {
    const input = parseFloat(annualSalaryOrRate) || 0;
    const workDays = parseFloat(workingDaysPerYear) || 240;

    // Determine if input is annual salary or day rate
    let employeeSalary = isContractorDayRate ? input * workDays : input;
    let contractorDayRate = isContractorDayRate ? input : employeeSalary / workDays;
    let contractorAnnualIncome = contractorDayRate * workDays;

    // EMPLOYEE PATH
    // Gross salary
    const employeeGross = employeeSalary;

    // Income tax on employee salary
    const employeeIncomeTax = calculateTax(employeeGross);

    // Medicare levy
    const employeeMedicare = employeeGross * MEDICARE_LEVY;

    // Superannuation (employer pays on top - not deducted from take-home)
    const employeeSuper = employeeGross * SUPER_RATE_EMPLOYER;

    // Take-home pay
    const employeeTakeHome = employeeGross - employeeIncomeTax - employeeMedicare;

    // CONTRACTOR PATH
    // Contractor gross income (before tax)
    const contractorGross = contractorAnnualIncome;

    // Income tax (same brackets)
    const contractorIncomeTax = calculateTax(contractorGross);

    // Medicare levy
    const contractorMedicare = contractorGross * MEDICARE_LEVY;

    // Contractor must self-manage super (typically save 11.5% separately)
    // This is not deducted but recommended
    const contractorSuperRecommended = contractorGross * SUPER_RATE_EMPLOYER;

    // Take-home pay (gross minus tax and medicare)
    const contractorTakeHome = contractorGross - contractorIncomeTax - contractorMedicare;

    // Net take-home if super is contributed
    const contractorTakeHomeAfterSuper = contractorTakeHome - contractorSuperRecommended;

    // Comparison
    const takeHomeDifference = contractorTakeHome - employeeTakeHome;
    const takeHomeDifferenceAfterSuper = contractorTakeHomeAfterSuper - employeeTakeHome;
    const superDifference = contractorSuperRecommended - employeeSuper;

    // Effective tax rate
    const employeeEffectiveTax = ((employeeIncomeTax + employeeMedicare) / employeeGross) * 100;
    const contractorEffectiveTax = ((contractorIncomeTax + contractorMedicare) / contractorGross) * 100;

    return {
      // Employee
      employeeSalary: employeeGross.toFixed(2),
      employeeIncomeTax: employeeIncomeTax.toFixed(2),
      employeeMedicare: employeeMedicare.toFixed(2),
      employeeTax: (employeeIncomeTax + employeeMedicare).toFixed(2),
      employeeSuper: employeeSuper.toFixed(2),
      employeeTakeHome: employeeTakeHome.toFixed(2),
      employeeEffectiveTax: employeeEffectiveTax.toFixed(1),

      // Contractor
      contractorDayRate: contractorDayRate.toFixed(2),
      contractorAnnual: contractorAnnualIncome.toFixed(2),
      contractorIncomeTax: contractorIncomeTax.toFixed(2),
      contractorMedicare: contractorMedicare.toFixed(2),
      contractorTax: (contractorIncomeTax + contractorMedicare).toFixed(2),
      contractorTakeHome: contractorTakeHome.toFixed(2),
      contractorSuperRecommended: contractorSuperRecommended.toFixed(2),
      contractorTakeHomeAfterSuper: contractorTakeHomeAfterSuper.toFixed(2),
      contractorEffectiveTax: contractorEffectiveTax.toFixed(1),

      // Comparison
      takeHomeDifference: takeHomeDifference.toFixed(2),
      takeHomeDifferenceAfterSuper: takeHomeDifferenceAfterSuper.toFixed(2),
      superDifference: superDifference.toFixed(2),
    };
  }, [annualSalaryOrRate, workingDaysPerYear, isContractorDayRate]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-surface rounded-lg border border-border p-6 sm:p-8 space-y-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                {isContractorDayRate ? 'Day Rate (AUD)' : 'Annual Salary (AUD)'}
              </label>
              <input
                type="number"
                value={annualSalaryOrRate}
                onChange={(e) => setAnnualSalaryOrRate(e.target.value)}
                placeholder={isContractorDayRate ? 'Enter day rate' : 'Enter annual salary'}
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                Working Days Per Year
              </label>
              <input
                type="number"
                value={workingDaysPerYear}
                onChange={(e) => setWorkingDaysPerYear(e.target.value)}
                placeholder="Enter working days"
                className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              />
              <p className="text-text-muted text-sm mt-1">Typically 240 days/year (48 weeks x 5 days)</p>
            </div>
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isContractorDayRate}
              onChange={(e) => setIsContractorDayRate(e.target.checked)}
              className="mr-2"
            />
            <span className="text-text-primary font-medium">
              Input above is a contractor day rate (not annual salary)
            </span>
          </label>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white border border-border">
                <th className="text-left p-3 font-semibold text-text-primary">Item</th>
                <th className="text-right p-3 font-semibold text-text-primary">
                  Employee
                </th>
                <th className="text-right p-3 font-semibold text-text-primary">
                  Contractor
                </th>
                <th className="text-right p-3 font-semibold text-accent">
                  Difference
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-border bg-white hover:bg-surface">
                <td className="p-3 font-semibold text-text-primary">Gross Annual</td>
                <td className="text-right p-3 font-mono">${results.employeeSalary}</td>
                <td className="text-right p-3 font-mono">${results.contractorAnnual}</td>
                <td className="text-right p-3 font-mono">$0</td>
              </tr>
              <tr className="border border-border bg-white hover:bg-surface">
                <td className="p-3 font-semibold text-text-primary">Income Tax</td>
                <td className="text-right p-3 font-mono">${results.employeeIncomeTax}</td>
                <td className="text-right p-3 font-mono">${results.contractorIncomeTax}</td>
                <td className="text-right p-3 font-mono text-error">
                  ${(parseFloat(results.employeeIncomeTax) - parseFloat(results.contractorIncomeTax)).toFixed(2)}
                </td>
              </tr>
              <tr className="border border-border bg-white hover:bg-surface">
                <td className="p-3 font-semibold text-text-primary">Medicare Levy</td>
                <td className="text-right p-3 font-mono">${results.employeeMedicare}</td>
                <td className="text-right p-3 font-mono">${results.contractorMedicare}</td>
                <td className="text-right p-3 font-mono">$0</td>
              </tr>
              <tr className="border border-border bg-blue-50">
                <td className="p-3 font-semibold text-text-primary">Take-Home (before super)</td>
                <td className="text-right p-3 font-mono font-semibold">
                  ${results.employeeTakeHome}
                </td>
                <td className="text-right p-3 font-mono font-semibold">
                  ${results.contractorTakeHome}
                </td>
                <td className="text-right p-3 font-mono font-semibold text-accent">
                  {parseFloat(results.takeHomeDifference) >= 0 ? '+' : ''}${results.takeHomeDifference}
                </td>
              </tr>
              <tr className="border border-border bg-white hover:bg-surface">
                <td className="p-3 font-semibold text-text-primary">Superannuation</td>
                <td className="text-right p-3 font-mono">${results.employeeSuper}</td>
                <td className="text-right p-3 font-mono">(self-managed)</td>
                <td className="text-right p-3 font-mono"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Side by Side Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Employee */}
          <div className="bg-white rounded-lg border border-border p-6 space-y-4">
            <h3 className="text-text-primary font-semibold text-lg">Employee</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Annual Salary:</span>
                <span className="font-mono font-semibold">
                  ${results.employeeSalary}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Income Tax:</span>
                <span className="font-mono font-semibold text-error">
                  -${results.employeeIncomeTax}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Medicare Levy:</span>
                <span className="font-mono font-semibold text-error">
                  -${results.employeeMedicare}
                </span>
              </div>

              <div className="flex justify-between pt-2 pb-3 border-b border-border">
                <span className="text-text-secondary">Take-Home Pay:</span>
                <span className="font-mono font-semibold text-accent">
                  ${results.employeeTakeHome}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-text-secondary">Employer Super (11.5%):</span>
                <span className="font-mono font-semibold text-success">
                  +${results.employeeSuper}
                </span>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-text-muted text-xs">
                  Effective tax rate: <span className="font-mono">{results.employeeEffectiveTax}%</span>
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded p-3 text-xs text-text-secondary">
              <p className="font-semibold text-success mb-1">Benefits:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Guaranteed super contributions</li>
                <li>Paid leave (annual + sick)</li>
                <li>Stable income</li>
                <li>Employer insurance</li>
              </ul>
            </div>
          </div>

          {/* Contractor */}
          <div className="bg-white rounded-lg border border-border p-6 space-y-4">
            <h3 className="text-text-primary font-semibold text-lg">Contractor</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Annual Income:</span>
                <span className="font-mono font-semibold">
                  ${results.contractorAnnual}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Income Tax:</span>
                <span className="font-mono font-semibold text-error">
                  -${results.contractorIncomeTax}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Medicare Levy:</span>
                <span className="font-mono font-semibold text-error">
                  -${results.contractorMedicare}
                </span>
              </div>

              <div className="flex justify-between pt-2 pb-3 border-b border-border">
                <span className="text-text-secondary">Take-Home Pay:</span>
                <span className="font-mono font-semibold text-accent">
                  ${results.contractorTakeHome}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-text-secondary">Self-managed Super (11.5%):</span>
                <span className="font-mono font-semibold text-warning">
                  ${results.contractorSuperRecommended}
                </span>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-text-muted text-xs">
                  Take-home after super: <span className="font-mono">${results.contractorTakeHomeAfterSuper}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-text-muted text-xs">
                  Effective tax rate: <span className="font-mono">{results.contractorEffectiveTax}%</span>
                </p>
              </div>
            </div>

            <div className="bg-orange-50 rounded p-3 text-xs text-text-secondary">
              <p className="font-semibold text-warning mb-1">Considerations:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Must self-manage super</li>
                <li>No paid leave</li>
                <li>Variable income</li>
                <li>Own insurance costs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-accent rounded-lg p-6 space-y-3">
          <h3 className="text-text-primary font-semibold text-lg">Comparison Summary</h3>
          <div className="space-y-2 text-text-secondary">
            <p>
              <span className="font-semibold">Take-home difference (before super):</span> <span className="font-mono">${results.takeHomeDifference}</span>
            </p>
            <p>
              <span className="font-semibold">Take-home difference (after super):</span> <span className="font-mono">${results.takeHomeDifferenceAfterSuper}</span>
            </p>
            {parseFloat(results.takeHomeDifference) > 0 ? (
              <p className="text-success">
                Contractors earn more take-home pay before super contributions
              </p>
            ) : (
              <p className="text-error">
                Employees earn more take-home pay (super is additional)
              </p>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Based on 2025 tax rates and super rates</li>
            <li>Contractors do not receive Superannuation Guarantee automatically</li>
            <li>Contractors pay own income protection insurance</li>
            <li>Does not account for tax deductions (contractors may have more)</li>
            <li>Does not include business expenses or ABN costs</li>
            <li>Consult a tax accountant for accurate personal advice</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
