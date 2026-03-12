"use client";

import { useState, useMemo } from "react";
import { formatCurrency, formatPercentage, formatNumber } from "@/lib/format";
import { TAX_YEARS, PENSION_LIMITS } from "@/data/tax-rates";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const TAX_YEAR_OPTIONS = [
  { value: "2025/26", label: "2025/26 (current)" },
  { value: "2024/25", label: "2024/25" },
];

export default function PensionCalculator() {
  const [state, setState] = useState({
    currentAge: 35,
    retirementAge: 67,
    currentSalary: 50000,
    salaryGrowth: 2.5,
    currentPensionPot: 50000,
    employeeContribution: 5,
    employerContribution: 3,
    investmentGrowth: 5,
    fees: 0.5,
    taxYear: "2025/26",
    isScottish: false,
  });

  const handleChange = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const calculations = useMemo(() => {
    const taxYear = TAX_YEARS[state.taxYear];
    const pensionLimits = PENSION_LIMITS[state.taxYear];
    const currentAge = parseInt(state.currentAge) || 35;
    const retirementAge = parseInt(state.retirementAge) || 67;
    const years = retirementAge - currentAge;

    if (years <= 0) {
      return null;
    }

    let pot = parseFloat(state.currentPensionPot) || 0;
    const salary = parseFloat(state.currentSalary) || 0;
    const empContrib = parseFloat(state.employeeContribution) / 100;
    const emrContrib = parseFloat(state.employerContribution) / 100;
    const growth = parseFloat(state.investmentGrowth) / 100;
    const fees = parseFloat(state.fees) / 100;
    const salaryGrowth = parseFloat(state.salaryGrowth) / 100;

    // Calculate basic rate tax relief
    const basicRateTaxRate = 0.2;
    const basicRateTaxRelief = empContrib * basicRateTaxRate / (1 - basicRateTaxRate);

    // Calculate if higher rate taxpayer (for additional relief)
    const incomeTaxBands = taxYear.incomeTaxBands;
    let taxBracket = "basic";
    let higherRateTaxRelief = 0;

    if (salary > incomeTaxBands[2].from) {
      taxBracket = "additional";
      higherRateTaxRelief = empContrib * 0.25; // 45% - 20% = 25%
    } else if (salary > incomeTaxBands[1].from) {
      taxBracket = "higher";
      higherRateTaxRelief = empContrib * 0.2; // 40% - 20% = 20%
    }

    // Project pension pot year by year
    const yearBreakdown = [];
    let totalEmployeeContrib = 0;
    let totalEmployerContrib = 0;
    let totalInvestmentGrowth = 0;
    let totalTaxRelief = 0;

    let currentYearSalary = salary;

    for (let i = 0; i < years; i++) {
      const age = currentAge + i;
      const startingPot = pot;

      // Annual contributions
      const annualEmployeeContrib = currentYearSalary * empContrib;
      const annualEmployerContrib = currentYearSalary * emrContrib;
      const annualTaxRelief = annualEmployeeContrib * basicRateTaxRelief / empContrib;

      totalEmployeeContrib += annualEmployeeContrib;
      totalEmployerContrib += annualEmployerContrib;
      totalTaxRelief += annualTaxRelief;

      // Add contributions
      pot += annualEmployeeContrib;
      pot += annualEmployerContrib;
      pot += annualTaxRelief;

      // Investment growth minus fees
      const netGrowth = growth - fees;
      const investmentReturn = pot * netGrowth;
      totalInvestmentGrowth += Math.max(0, investmentReturn);
      pot *= (1 + netGrowth);

      // Check annual allowance warning
      const totalContribs = annualEmployeeContrib + annualEmployerContrib + annualTaxRelief;
      const exceedsAllowance = totalContribs > pensionLimits.annualAllowance;

      if (i < 5 || i >= years - 5) {
        yearBreakdown.push({
          age,
          salary: currentYearSalary,
          employeeContrib: annualEmployeeContrib,
          employerContrib: annualEmployerContrib,
          taxRelief: annualTaxRelief,
          investmentGrowth: investmentReturn,
          endingPot: pot,
          exceedsAllowance,
        });
      }

      // Grow salary for next year
      currentYearSalary *= (1 + salaryGrowth);
    }

    // 4% withdrawal rule for retirement income
    const annualRetirementIncome = pot * 0.04;

    return {
      finalPot: pot,
      annualRetirementIncome,
      totalEmployeeContrib,
      totalEmployerContrib,
      totalTaxRelief,
      totalInvestmentGrowth,
      yearBreakdown,
      taxBracket,
      higherRateTaxRelief,
      years,
    };
  }, [state]);

  if (!calculations) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
        <p className="text-error">Retirement age must be after current age.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border space-y-6">
      {/* Configuration Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">Your Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Current Age"
            type="number"
            value={state.currentAge}
            onChange={(e) => handleChange("currentAge", e.target.value)}
            min="18"
            max="100"
          />
          <Input
            label="Retirement Age"
            type="number"
            value={state.retirementAge}
            onChange={(e) => handleChange("retirementAge", e.target.value)}
            min="18"
            max="100"
          />
        </div>

        <Input
          label="Current Salary (annual)"
          type="number"
          value={state.currentSalary}
          onChange={(e) => handleChange("currentSalary", e.target.value)}
          min="0"
          step="1000"
          helper="Gross annual income"
        />

        <Input
          label="Current Pension Pot"
          type="number"
          value={state.currentPensionPot}
          onChange={(e) => handleChange("currentPensionPot", e.target.value)}
          min="0"
          step="5000"
          helper="Total value of existing pensions"
        />
      </div>

      {/* Contribution Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">Contributions</h2>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Employee Contribution (%)"
            type="number"
            value={state.employeeContribution}
            onChange={(e) => handleChange("employeeContribution", e.target.value)}
            min="0"
            max="100"
            step="0.1"
            helper="% of salary"
          />
          <Input
            label="Employer Contribution (%)"
            type="number"
            value={state.employerContribution}
            onChange={(e) => handleChange("employerContribution", e.target.value)}
            min="0"
            max="100"
            step="0.1"
            helper="% of salary"
          />
        </div>
      </div>

      {/* Growth Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">Growth Assumptions</h2>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Investment Growth (%)"
            type="number"
            value={state.investmentGrowth}
            onChange={(e) => handleChange("investmentGrowth", e.target.value)}
            min="0"
            max="20"
            step="0.1"
            helper="Expected annual return"
          />
          <Input
            label="Annual Fees (%)"
            type="number"
            value={state.fees}
            onChange={(e) => handleChange("fees", e.target.value)}
            min="0"
            max="5"
            step="0.01"
            helper="Fund management fees"
          />
        </div>

        <Input
          label="Salary Growth (%)"
          type="number"
          value={state.salaryGrowth}
          onChange={(e) => handleChange("salaryGrowth", e.target.value)}
          min="0"
          max="10"
          step="0.1"
          helper="Expected annual salary increase"
        />
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <Select
          label="Tax Year"
          value={state.taxYear}
          onChange={(e) => handleChange("taxYear", e.target.value)}
          options={TAX_YEAR_OPTIONS}
        />
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border space-y-6">
        <h2 className="text-lg font-semibold text-text-primary">Projections</h2>

        {/* Main Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-accent/5 rounded-[var(--radius-card)] p-4 border border-accent/10">
            <p className="text-text-secondary text-sm mb-1">Projected Pension Pot at {state.retirementAge}</p>
            <p className="text-2xl font-mono-num font-semibold text-accent">
              {formatCurrency(calculations.finalPot)}
            </p>
          </div>

          <div className="bg-success/5 rounded-[var(--radius-card)] p-4 border border-success/10">
            <p className="text-text-secondary text-sm mb-1">Estimated Annual Retirement Income (4% rule)</p>
            <p className="text-2xl font-mono-num font-semibold text-text-primary">
              {formatCurrency(calculations.annualRetirementIncome)}
            </p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="border-t border-border pt-6">
          <p className="text-text-secondary text-sm mb-4">What makes up this amount?</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-primary">Your contributions</span>
              <span className="font-mono-num font-medium">{formatCurrency(calculations.totalEmployeeContrib)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-primary">Employer contributions</span>
              <span className="font-mono-num font-medium">{formatCurrency(calculations.totalEmployerContrib)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-primary">Tax relief received</span>
              <span className="font-mono-num font-medium text-success">{formatCurrency(calculations.totalTaxRelief)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-border pt-3">
              <span className="text-text-primary font-medium">Investment growth</span>
              <span className="font-mono-num font-medium">{formatCurrency(calculations.totalInvestmentGrowth)}</span>
            </div>
          </div>
        </div>

        {/* Tax Relief Info */}
        <div className="bg-info/5 rounded-[var(--radius-card)] p-4 border border-info/10">
          <p className="text-sm text-text-primary mb-2 font-medium">Tax Relief on Your Contributions</p>
          <p className="text-sm text-text-secondary mb-3">
            Your employee contributions get automatic basic rate relief (20%). You receive {formatCurrency(calculations.totalTaxRelief)} in tax relief across {calculations.years} years.
          </p>
          {calculations.taxBracket !== "basic" && (
            <p className="text-sm text-text-secondary">
              As a {calculations.taxBracket} rate taxpayer, you may claim additional relief via Self-Assessment, worth approximately {formatCurrency(calculations.totalEmployeeContrib * calculations.higherRateTaxRelief)}.
            </p>
          )}
        </div>

        {/* Annual Allowance Warning */}
        {calculations.yearBreakdown.some((y) => y.exceedsAllowance) && (
          <div className="bg-warning/5 rounded-[var(--radius-card)] p-4 border border-warning/10">
            <p className="text-sm text-warning font-medium mb-2">Annual Allowance Warning</p>
            <p className="text-sm text-text-secondary">
              Some years exceed the £60,000 annual allowance. You may face a tax charge on excess contributions. Consider varying your contributions or claiming relief carry-forward.
            </p>
          </div>
        )}

        {/* State Pension Info */}
        <div className="bg-surface rounded-[var(--radius-card)] p-4 border border-border">
          <p className="text-sm text-text-secondary mb-2">
            <span className="font-medium text-text-primary">Plus State Pension:</span> The full state pension is approximately {formatCurrency(11502.40)}/year (2025/26 rates).
          </p>
          <p className="text-xs text-text-muted">
            Your total retirement income would be {formatCurrency(calculations.annualRetirementIncome + 11502.40)}/year including state pension.
          </p>
        </div>
      </div>

      {/* Year-by-Year Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Year-by-Year Projection</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-3 py-2 text-text-secondary font-medium">Age</th>
                <th className="text-right px-3 py-2 text-text-secondary font-medium">Salary</th>
                <th className="text-right px-3 py-2 text-text-secondary font-medium">Your Contrib</th>
                <th className="text-right px-3 py-2 text-text-secondary font-medium">Employer</th>
                <th className="text-right px-3 py-2 text-text-secondary font-medium">Pot Value</th>
              </tr>
            </thead>
            <tbody>
              {calculations.yearBreakdown.map((year, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-surface">
                  <td className="px-3 py-2 text-text-primary font-medium">{year.age}</td>
                  <td className="px-3 py-2 text-right font-mono-num text-text-secondary">
                    {formatCurrency(year.salary)}
                  </td>
                  <td className="px-3 py-2 text-right font-mono-num text-text-secondary">
                    {formatCurrency(year.employeeContrib)}
                  </td>
                  <td className="px-3 py-2 text-right font-mono-num text-text-secondary">
                    {formatCurrency(year.employerContrib)}
                  </td>
                  <td className="px-3 py-2 text-right font-mono-num font-semibold text-accent">
                    {formatCurrency(year.endingPot)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
