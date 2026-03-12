"use client";

import { useState, useMemo } from "react";
import { formatCurrency, formatPercentage } from "@/lib/format";
import { TAX_YEARS } from "@/data/tax-rates";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const SACRIFICE_TYPES = [
  { value: "pension", label: "Pension Contributions" },
  { value: "cycle", label: "Cycle to Work Scheme" },
  { value: "childcare", label: "Childcare Vouchers" },
  { value: "ev-lease", label: "EV Lease / Car Lease" },
];

const TAX_YEAR_OPTIONS = [
  { value: "2025/26", label: "2025/26 (current)" },
  { value: "2024/25", label: "2024/25" },
];

const calculateIncomeTax = (gross, personalAllowance, taxBands) => {
  let taxableIncome = Math.max(0, gross - personalAllowance);
  let totalTax = 0;

  for (const band of taxBands) {
    if (taxableIncome <= 0) break;
    const bandTop = band.to - band.from;
    const taxInBand = Math.min(taxableIncome, bandTop);
    totalTax += taxInBand * band.rate;
    taxableIncome -= taxInBand;
  }

  return totalTax;
};

const calculateNI = (gross, niThreshold, upperLimit, mainRate, higherRate) => {
  const taxableNI = Math.max(0, gross - niThreshold);
  const mainRateAmount = Math.min(taxableNI, Math.max(0, upperLimit - niThreshold)) * mainRate;
  const higherRateAmount = Math.max(0, taxableNI - (upperLimit - niThreshold)) * higherRate;
  return mainRateAmount + higherRateAmount;
};

const calculateEmployerNI = (gross, secondaryThreshold, employerNIRate) => {
  const taxableEmployerNI = Math.max(0, gross - secondaryThreshold);
  return taxableEmployerNI * employerNIRate;
};

export default function SalarySacrificeCalculator() {
  const [state, setState] = useState({
    grossSalary: 50000,
    sacrificeAmount: 500, // monthly
    sacrificeType: "pension",
    taxYear: "2025/26",
  });

  const handleChange = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const calculations = useMemo(() => {
    const taxYear = TAX_YEARS[state.taxYear];
    const grossAnnual = parseFloat(state.grossSalary) || 0;
    const sacrificeMonthly = parseFloat(state.sacrificeAmount) || 0;
    const sacrificeAnnual = sacrificeMonthly * 12;

    if (grossAnnual <= 0) {
      return null;
    }

    const pa = taxYear.personalAllowance;
    const ni = taxYear.ni;
    const employerNI = taxYear.employerNI;

    // Without sacrifice
    const incomeTaxWithout = calculateIncomeTax(grossAnnual, pa, taxYear.incomeTaxBands);
    const employeeNIWithout = calculateNI(
      grossAnnual,
      ni.primaryThreshold,
      ni.upperEarningsLimit,
      ni.mainRate,
      ni.higherRate
    );
    const employerNIWithout = calculateEmployerNI(
      grossAnnual,
      employerNI.secondaryThreshold,
      employerNI.rate
    );
    const takeHomeWithout = grossAnnual - incomeTaxWithout - employeeNIWithout;

    // With sacrifice
    const grossAfterSacrifice = grossAnnual - sacrificeAnnual;
    const incomeTaxWith = calculateIncomeTax(grossAfterSacrifice, pa, taxYear.incomeTaxBands);
    const employeeNIWith = calculateNI(
      grossAfterSacrifice,
      ni.primaryThreshold,
      ni.upperEarningsLimit,
      ni.mainRate,
      ni.higherRate
    );
    const employerNIWith = calculateEmployerNI(
      grossAfterSacrifice,
      employerNI.secondaryThreshold,
      employerNI.rate
    );
    const takeHomeWith = grossAfterSacrifice - incomeTaxWith - employeeNIWith;

    // Savings
    const incomeTaxSaving = Math.max(0, incomeTaxWithout - incomeTaxWith);
    const employeeNISaving = Math.max(0, employeeNIWithout - employeeNIWith);
    const employerNISaving = Math.max(0, employerNIWithout - employerNIWith);
    const totalTaxSaving = incomeTaxSaving + employeeNISaving + employerNISaving;

    // Effective cost (what you lose in take-home)
    const takeHomeDifference = takeHomeWithout - takeHomeWith;
    const effectiveCost = sacrificeAnnual - totalTaxSaving;
    const effectiveCostMonthly = effectiveCost / 12;

    // Percentage of sacrifice that is actual cost
    const costPercentage = (effectiveCost / sacrificeAnnual) * 100;

    return {
      without: {
        gross: grossAnnual,
        incomeTax: incomeTaxWithout,
        employeeNI: employeeNIWithout,
        employerNI: employerNIWithout,
        takeHome: takeHomeWithout,
      },
      with: {
        gross: grossAfterSacrifice,
        incomeTax: incomeTaxWith,
        employeeNI: employeeNIWith,
        employerNI: employerNIWith,
        takeHome: takeHomeWith,
      },
      savings: {
        incomeTaxSaving,
        employeeNISaving,
        employerNISaving,
        totalTaxSaving,
      },
      sacrifice: {
        annual: sacrificeAnnual,
        monthly: sacrificeMonthly,
      },
      effectiveCost,
      effectiveCostMonthly,
      costPercentage,
      takeHomeDifference,
    };
  }, [state]);

  if (!calculations) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
        <p className="text-error">Please enter a valid salary.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border space-y-6">
      {/* Configuration Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">Your Details</h2>

        <Input
          label="Gross Annual Salary"
          type="number"
          value={state.grossSalary}
          onChange={(e) => handleChange("grossSalary", e.target.value)}
          min="0"
          step="1000"
          helper="Annual income before tax and deductions"
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Sacrifice Type"
            value={state.sacrificeType}
            onChange={(e) => handleChange("sacrificeType", e.target.value)}
            options={SACRIFICE_TYPES}
          />

          <Input
            label="Monthly Sacrifice Amount"
            type="number"
            value={state.sacrificeAmount}
            onChange={(e) => handleChange("sacrificeAmount", e.target.value)}
            min="0"
            step="10"
            helper="£ per month"
          />
        </div>

        <Select
          label="Tax Year"
          value={state.taxYear}
          onChange={(e) => handleChange("taxYear", e.target.value)}
          options={TAX_YEAR_OPTIONS}
        />
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border space-y-6">
        <h2 className="text-lg font-semibold text-text-primary">Comparison</h2>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-2 gap-4">
          {/* Without Sacrifice */}
          <div className="border border-border rounded-[var(--radius-card)] p-4 bg-surface/50">
            <h3 className="font-medium text-text-primary mb-4 text-sm">Without Sacrifice</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Gross Salary</span>
                <span className="font-mono-num font-medium">{formatCurrency(calculations.without.gross)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Income Tax</span>
                <span className="font-mono-num font-medium">-{formatCurrency(calculations.without.incomeTax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Employee NI</span>
                <span className="font-mono-num font-medium">-{formatCurrency(calculations.without.employeeNI)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="text-text-primary font-medium">Take Home</span>
                <span className="font-mono-num font-semibold text-accent">
                  {formatCurrency(calculations.without.takeHome)}
                </span>
              </div>
              <p className="text-xs text-text-muted pt-2">
                Monthly: {formatCurrency(calculations.without.takeHome / 12)}
              </p>
            </div>
          </div>

          {/* With Sacrifice */}
          <div className="border border-accent rounded-[var(--radius-card)] p-4 bg-accent/5">
            <h3 className="font-medium text-text-primary mb-4 text-sm">With Sacrifice</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Gross Salary</span>
                <span className="font-mono-num font-medium">{formatCurrency(calculations.with.gross)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Income Tax</span>
                <span className="font-mono-num font-medium">-{formatCurrency(calculations.with.incomeTax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Employee NI</span>
                <span className="font-mono-num font-medium">-{formatCurrency(calculations.with.employeeNI)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="text-text-primary font-medium">Take Home</span>
                <span className="font-mono-num font-semibold text-accent">
                  {formatCurrency(calculations.with.takeHome)}
                </span>
              </div>
              <p className="text-xs text-text-muted pt-2">
                Monthly: {formatCurrency(calculations.with.takeHome / 12)}
              </p>
            </div>
          </div>
        </div>

        {/* Key Savings */}
        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-text-primary mb-4 text-sm">Annual Tax & NI Savings</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-success/5 rounded-[var(--radius-card)] p-4 border border-success/10">
              <p className="text-text-secondary text-xs mb-2">Income Tax Saving</p>
              <p className="text-lg font-mono-num font-semibold text-success">
                {formatCurrency(calculations.savings.incomeTaxSaving)}
              </p>
            </div>
            <div className="bg-success/5 rounded-[var(--radius-card)] p-4 border border-success/10">
              <p className="text-text-secondary text-xs mb-2">Employee NI Saving</p>
              <p className="text-lg font-mono-num font-semibold text-success">
                {formatCurrency(calculations.savings.employeeNISaving)}
              </p>
            </div>
            <div className="bg-success/5 rounded-[var(--radius-card)] p-4 border border-success/10">
              <p className="text-text-secondary text-xs mb-2">Total Tax Saving</p>
              <p className="text-lg font-mono-num font-semibold text-success">
                {formatCurrency(calculations.savings.totalTaxSaving)}
              </p>
            </div>
          </div>
        </div>

        {/* Effective Cost */}
        <div className="bg-info/5 rounded-[var(--radius-card)] p-4 border border-info/10">
          <p className="text-text-secondary text-sm mb-4">
            <span className="font-medium text-text-primary">What the benefit actually costs you:</span>
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-text-secondary text-xs mb-1">Effective Annual Cost</p>
              <p className="text-2xl font-mono-num font-semibold text-text-primary">
                {formatCurrency(calculations.effectiveCost)}
              </p>
              <p className="text-xs text-text-muted mt-1">
                ({formatPercentage(calculations.costPercentage)} of sacrifice amount)
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-xs mb-1">Effective Monthly Cost</p>
              <p className="text-2xl font-mono-num font-semibold text-text-primary">
                {formatCurrency(calculations.effectiveCostMonthly)}
              </p>
              <p className="text-xs text-text-muted mt-1">
                vs {formatCurrency(calculations.sacrifice.monthly)} sacrifice
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-text-primary mb-4 text-sm">How the Saving Works</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-3 bg-surface rounded-[var(--radius-input)]">
              <span className="text-text-secondary">Annual sacrifice amount</span>
              <span className="font-mono-num font-medium">-{formatCurrency(calculations.sacrifice.annual)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-success/5 rounded-[var(--radius-input)]">
              <span className="text-text-secondary">Gross salary reduction</span>
              <span className="font-mono-num font-medium">{formatCurrency(calculations.sacrifice.annual)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-success/5 rounded-[var(--radius-input)]">
              <span className="text-text-secondary">Tax & NI saved</span>
              <span className="font-mono-num font-semibold text-success">+{formatCurrency(calculations.savings.totalTaxSaving)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-info/5 rounded-[var(--radius-input)] border border-info/10">
              <span className="text-text-primary font-medium">Net cost to you</span>
              <span className="font-mono-num font-semibold">{formatCurrency(calculations.effectiveCost)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="space-y-4 bg-white rounded-[var(--radius-card)] p-6 border border-border">
        <h3 className="font-medium text-text-primary mb-3 text-sm">Important Considerations</h3>

        <div className="space-y-3 text-sm text-text-secondary">
          <div className="border-l-4 border-warning pl-4">
            <p className="font-medium text-text-primary mb-1">Mortgage & Credit Applications</p>
            <p>Your salary sacrifice reduces your declared income, which may affect mortgage affordability and credit applications. Lenders may still use your gross salary, but check with your lender first.</p>
          </div>

          <div className="border-l-4 border-warning pl-4">
            <p className="font-medium text-text-primary mb-1">Maternity & Paternity Pay</p>
            <p>Statutory pay is calculated on your reduced salary. This may significantly reduce maternity/paternity benefits.</p>
          </div>

          <div className="border-l-4 border-info pl-4">
            <p className="font-medium text-text-primary mb-1">Student Loan Repayments</p>
            <p>Salary sacrifice reduces the income on which student loan repayments are calculated, potentially lowering monthly payments.</p>
          </div>

          <div className="border-l-4 border-info pl-4">
            <p className="font-medium text-text-primary mb-1">Employer NI Savings</p>
            <p>Your employer also saves National Insurance. Many employers pass this saving to the employee's pension rather than keeping it.</p>
          </div>

          <div className="border-l-4 border-success pl-4">
            <p className="font-medium text-text-primary mb-1">Always Tax Efficient</p>
            <p>Unlike personal contributions, salary sacrifice is always tax and NI efficient. No need to claim relief on tax returns.</p>
          </div>
        </div>
      </div>

      {/* Scheme-Specific Notes */}
      {state.sacrificeType === "pension" && (
        <div className="bg-accent/5 rounded-[var(--radius-card)] p-4 border border-accent/10">
          <p className="text-sm font-medium text-text-primary mb-2">Pension Contributions via Salary Sacrifice</p>
          <p className="text-sm text-text-secondary">
            Contributions are always made gross (before tax), so you get immediate tax relief. There's no difference between salary sacrifice and personal contributions in terms of tax relief — just convenience.
          </p>
        </div>
      )}

      {state.sacrificeType === "cycle" && (
        <div className="bg-accent/5 rounded-[var(--radius-card)] p-4 border border-accent/10">
          <p className="text-sm font-medium text-text-primary mb-2">Cycle to Work Scheme</p>
          <p className="text-sm text-text-secondary">
            You can sacrifice up to £1,500/year. Maximum participation period is typically 3 years, after which you keep the bike. This example assumes you start fresh each year.
          </p>
        </div>
      )}

      {state.sacrificeType === "childcare" && (
        <div className="bg-accent/5 rounded-[var(--radius-card)] p-4 border border-accent/10">
          <p className="text-sm font-medium text-text-primary mb-2">Childcare Vouchers</p>
          <p className="text-sm text-text-secondary">
            Maximum £243/month per child (up to 2 children = £486/month). Must be registered childcare. No claims possible after vouchers are replaced by Tax-Free Childcare or 30-hour free childcare entitlements.
          </p>
        </div>
      )}

      {state.sacrificeType === "ev-lease" && (
        <div className="bg-accent/5 rounded-[var(--radius-card)] p-4 border border-accent/10">
          <p className="text-sm font-medium text-text-primary mb-2">Car Lease / EV Lease via Salary Sacrifice</p>
          <p className="text-sm text-text-secondary">
            Avoid capital gains tax. The benefit is taxable as a benefit-in-kind based on the list price, but salary sacrifice removes that tax. However, you lose ownership and flexibility.
          </p>
        </div>
      )}
    </div>
  );
}
