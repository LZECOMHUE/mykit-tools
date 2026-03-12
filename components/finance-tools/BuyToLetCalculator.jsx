'use client';

import { useState, useMemo } from 'react';
import { BTL_SDLT, TAX_YEARS, CURRENT_TAX_YEAR } from '@/data/tax-rates';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/format';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';

export default function BuyToLetCalculator() {
  const [inputs, setInputs] = useState({
    propertyPrice: 250000,
    depositPercent: 25,
    mortgageRate: 5.5,
    mortgageTerm: 25,
    monthlyRent: 1200,
    annualExpenses: 3600,
    personalIncome: 50000,
    mortgageType: 'repayment',
    taxYear: CURRENT_TAX_YEAR,
  });

  const handleChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value === '' ? 0 : (typeof value === 'boolean' ? value : parseFloat(value) || 0),
    }));
  };

  const calculations = useMemo(() => {
    // 1. DEPOSIT & BORROWING
    const deposit = inputs.propertyPrice * (inputs.depositPercent / 100);
    const mortgageAmount = inputs.propertyPrice - deposit;

    // 2. SDLT CALCULATION (with 5% surcharge for additional property)
    let sdlt = 0;
    const sdltBands = BTL_SDLT.bands;
    sdltBands.forEach(band => {
      if (inputs.propertyPrice > band.from) {
        const taxableInThisBand = Math.min(inputs.propertyPrice, band.to) - band.from;
        sdlt += taxableInThisBand * band.rate;
      }
    });

    // 3. MORTGAGE CALCULATION
    const monthlyRate = inputs.mortgageRate / 100 / 12;
    const numPayments = inputs.mortgageTerm * 12;
    let monthlyPayment = 0;
    let totalInterest = 0;

    if (inputs.mortgageType === 'repayment') {
      // Standard repayment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
      monthlyPayment = (mortgageAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
      totalInterest = (monthlyPayment * numPayments) - mortgageAmount;
    } else {
      // Interest-only: just monthly interest
      monthlyPayment = mortgageAmount * monthlyRate;
      totalInterest = monthlyPayment * numPayments;
    }

    // 4. RENTAL INCOME & EXPENSES
    const annualRent = inputs.monthlyRent * 12;
    const monthlyExpenses = inputs.annualExpenses / 12;
    const totalMonthlyExpenses = monthlyExpenses + monthlyPayment;
    const monthlyNetCashFlow = inputs.monthlyRent - totalMonthlyExpenses;
    const annualNetCashFlow = monthlyNetCashFlow * 12;

    // 5. TAX CALCULATION ON RENTAL PROFIT
    // Mortgage interest is NOT deductible from income (Section 24 restriction)
    // Only basic rate (20%) tax credit applies
    const monthlyMortgageInterest = mortgageAmount * monthlyRate;
    const annualMortgageInterest = monthlyMortgageInterest * 12;

    // For interest-only, all payment is interest; for repayment, calculate interest portion
    let totalAnnualMortgageInterest = 0;
    if (inputs.mortgageType === 'interest-only') {
      totalAnnualMortgageInterest = monthlyPayment * 12;
    } else {
      // Over time, proportion of interest decreases. Use average for simplicity.
      totalAnnualMortgageInterest = annualMortgageInterest;
    }

    // Rental profit = rent - expenses (NOT minus mortgage principal, but minus mortgage interest as 20% credit)
    const rentalProfitBeforeTax = annualRent - inputs.annualExpenses;

    // Tax benefit from mortgage interest: only 20% basic rate relief
    const mortgageInterestTaxCredit = totalAnnualMortgageInterest * 0.20;

    // Effective profit for tax: rental profit - mortgage interest relief credit
    const taxableRentalProfit = Math.max(0, rentalProfitBeforeTax - mortgageInterestTaxCredit);

    // 6. MARGINAL TAX RATE ON RENTAL PROFIT
    const taxYear = TAX_YEARS[inputs.taxYear];
    let marginalTaxRate = 0.20; // Default to basic rate
    const totalPersonalIncome = inputs.personalIncome + taxableRentalProfit;
    const personalAllowance = taxYear.personalAllowance;

    if (totalPersonalIncome > personalAllowance) {
      if (totalPersonalIncome > 50270) {
        marginalTaxRate = 0.40; // Higher rate
      } else if (totalPersonalIncome > 37700) {
        // Blended or higher rate depending on exact point
        marginalTaxRate = 0.40;
      }
    }

    // Tax on rental profit at marginal rate
    const taxOnRentalProfit = taxableRentalProfit * marginalTaxRate;

    // 7. YIELDS
    const grossYield = (annualRent / inputs.propertyPrice) * 100;
    const netYield = (annualNetCashFlow / inputs.propertyPrice) * 100;

    // 8. TOTAL INITIAL COSTS
    const legalFees = Math.max(1000, inputs.propertyPrice * 0.005); // ~0.5% estimate
    const totalInitialCost = deposit + sdlt + legalFees;

    // 9. RETURN ON INVESTMENT (first year)
    const roi = (annualNetCashFlow / totalInitialCost) * 100;

    return {
      deposit,
      mortgageAmount,
      sdlt,
      legalFees,
      totalInitialCost,
      monthlyPayment,
      totalInterest,
      annualRent,
      monthlyExpenses,
      monthlyNetCashFlow,
      annualNetCashFlow,
      rentalProfitBeforeTax,
      mortgageInterestTaxCredit,
      taxableRentalProfit,
      marginalTaxRate,
      taxOnRentalProfit,
      annualProfitAfterTax: annualNetCashFlow - taxOnRentalProfit,
      grossYield,
      netYield,
      roi,
      totalAnnualMortgageInterest,
    };
  }, [inputs]);

  const handleReset = () => {
    setInputs({
      propertyPrice: 250000,
      depositPercent: 25,
      mortgageRate: 5.5,
      mortgageTerm: 25,
      monthlyRent: 1200,
      annualExpenses: 3600,
      personalIncome: 50000,
      mortgageType: 'repayment',
      taxYear: CURRENT_TAX_YEAR,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Input Section */}
      <div className="bg-surface rounded-[var(--radius-card)] border border-border p-6">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">Property Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            label="Property Purchase Price"
            type="number"
            value={inputs.propertyPrice || ''}
            onChange={(e) => handleChange('propertyPrice', e.target.value)}
            placeholder="250000"
          />
          <Input
            label="Deposit %"
            type="number"
            value={inputs.depositPercent || ''}
            onChange={(e) => handleChange('depositPercent', e.target.value)}
            placeholder="25"
            helper="Typically 20-30% for buy-to-let"
          />
          <Select
            label="Mortgage Type"
            value={inputs.mortgageType}
            options={[
              { value: 'repayment', label: 'Repayment (capital + interest)' },
              { value: 'interest-only', label: 'Interest-only' },
            ]}
            onChange={(e) => handleChange('mortgageType', e.target.value)}
          />
          <Select
            label="Tax Year"
            value={inputs.taxYear}
            options={Object.keys(TAX_YEARS).map(year => ({
              value: year,
              label: TAX_YEARS[year].label,
            }))}
            onChange={(e) => handleChange('taxYear', e.target.value)}
          />
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-4 mt-8">Mortgage Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Mortgage Rate (%)"
            type="number"
            value={inputs.mortgageRate || ''}
            onChange={(e) => handleChange('mortgageRate', e.target.value)}
            placeholder="5.5"
            step="0.1"
          />
          <Input
            label="Mortgage Term (years)"
            type="number"
            value={inputs.mortgageTerm || ''}
            onChange={(e) => handleChange('mortgageTerm', e.target.value)}
            placeholder="25"
          />
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-4 mt-8">Rental Income & Expenses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Monthly Rental Income"
            type="number"
            value={inputs.monthlyRent || ''}
            onChange={(e) => handleChange('monthlyRent', e.target.value)}
            placeholder="1200"
            helper="Gross monthly rent (before expenses)"
          />
          <Input
            label="Annual Expenses"
            type="number"
            value={inputs.annualExpenses || ''}
            onChange={(e) => handleChange('annualExpenses', e.target.value)}
            placeholder="3600"
            helper="Insurance, maintenance, management, void periods"
          />
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-4 mt-8">Your Personal Income</h3>
        <div className="max-w-md">
          <Input
            label="Annual Salary/Income"
            type="number"
            value={inputs.personalIncome || ''}
            onChange={(e) => handleChange('personalIncome', e.target.value)}
            placeholder="50000"
            helper="Used to determine marginal tax rate on rental profit"
          />
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-border">
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Investment Summary */}
        <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Investment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-text-secondary mb-1">Deposit Required</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary">
                {formatCurrency(calculations.deposit)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">Mortgage Amount</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary">
                {formatCurrency(calculations.mortgageAmount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">SDLT (Stamp Duty)</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary">
                {formatCurrency(calculations.sdlt)}
              </p>
              <p className="text-xs text-text-muted mt-1">5% surcharge on additional property</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">Legal Fees (est.)</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary">
                {formatCurrency(calculations.legalFees)}
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-text-secondary mb-2">Total Initial Investment</p>
            <p className="text-3xl font-mono-num font-bold text-accent">
              {formatCurrency(calculations.totalInitialCost)}
            </p>
          </div>
        </div>

        {/* Yields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
            <p className="text-sm text-text-secondary mb-2">Gross Yield</p>
            <p className="text-3xl font-mono-num font-bold text-text-primary">
              {formatPercentage(calculations.grossYield, 2)}
            </p>
            <p className="text-xs text-text-muted mt-2">
              Annual rent ÷ property price
            </p>
          </div>
          <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
            <p className="text-sm text-text-secondary mb-2">Net Yield</p>
            <p className="text-3xl font-mono-num font-bold text-accent">
              {formatPercentage(calculations.netYield, 2)}
            </p>
            <p className="text-xs text-text-muted mt-2">
              After mortgage & expenses
            </p>
          </div>
          <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
            <p className="text-sm text-text-secondary mb-2">ROI (Year 1)</p>
            <p className="text-3xl font-mono-num font-bold text-text-primary">
              {formatPercentage(calculations.roi, 2)}
            </p>
            <p className="text-xs text-text-muted mt-2">
              Based on net cash flow
            </p>
          </div>
        </div>

        {/* Monthly Cash Flow */}
        <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Monthly Cash Flow</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-sm text-text-secondary">Rental Income</p>
              <p className="font-mono-num font-bold text-success">
                +{formatCurrency(inputs.monthlyRent)}
              </p>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-sm text-text-secondary">Operating Expenses</p>
              <p className="font-mono-num font-bold text-error">
                -{formatCurrency(calculations.monthlyExpenses)}
              </p>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-sm text-text-secondary">Mortgage Payment</p>
              <p className="font-mono-num font-bold text-error">
                -{formatCurrency(calculations.monthlyPayment)}
              </p>
            </div>
            <div className="flex justify-between items-center pt-3 font-bold text-base">
              <p className="text-text-primary">Net Monthly Cash Flow</p>
              <p className={`font-mono-num ${calculations.monthlyNetCashFlow >= 0 ? 'text-success' : 'text-error'}`}>
                {calculations.monthlyNetCashFlow >= 0 ? '+' : ''}{formatCurrency(calculations.monthlyNetCashFlow)}
              </p>
            </div>
          </div>
        </div>

        {/* Annual Profit Breakdown */}
        <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Annual Profit Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-sm text-text-secondary">Annual Rent</p>
              <p className="font-mono-num text-text-primary">
                {formatCurrency(calculations.annualRent)}
              </p>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-sm text-text-secondary">Operating Expenses</p>
              <p className="font-mono-num text-text-primary">
                {formatCurrency(inputs.annualExpenses)}
              </p>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border font-semibold">
              <p className="text-text-primary">Rental Profit (before tax)</p>
              <p className="font-mono-num text-text-primary">
                {formatCurrency(calculations.rentalProfitBeforeTax)}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg my-3">
              <p className="text-xs text-text-muted mb-2">
                <strong>Section 24 Mortgage Interest Tax Relief:</strong> Only 20% basic rate relief allowed
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Mortgage Interest p.a.</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(calculations.totalAnnualMortgageInterest)}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-text-secondary">20% Tax Credit</span>
                <span className="font-mono-num text-text-primary">
                  {formatCurrency(calculations.mortgageInterestTaxCredit)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border font-semibold">
              <p className="text-text-primary">Taxable Rental Profit</p>
              <p className="font-mono-num text-text-primary">
                {formatCurrency(calculations.taxableRentalProfit)}
              </p>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border text-sm">
              <p className="text-text-secondary">Tax at {formatPercentage(calculations.marginalTaxRate * 100, 0)}</p>
              <p className="font-mono-num text-error">
                -{formatCurrency(calculations.taxOnRentalProfit)}
              </p>
            </div>
            <div className="flex justify-between items-center pt-3 font-bold text-base bg-accent/5 p-3 rounded-lg">
              <p className="text-text-primary">Annual Profit After Tax</p>
              <p className="font-mono-num text-accent">
                {formatCurrency(calculations.annualProfitAfterTax)}
              </p>
            </div>
          </div>
        </div>

        {/* Info Boxes */}
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-[var(--radius-card)] p-6 border border-blue-200">
            <h4 className="font-semibold text-text-primary mb-3">Section 24 — Mortgage Interest Relief</h4>
            <p className="text-sm text-text-secondary mb-2">
              From April 2020, higher-rate taxpayers can only claim 20% basic rate tax credit on mortgage interest (not full deduction). This is why your taxable profit is calculated as: rental profit minus mortgage interest relief credit.
            </p>
          </div>

          <div className="bg-amber-50 rounded-[var(--radius-card)] p-6 border border-amber-200">
            <h4 className="font-semibold text-text-primary mb-3">SDLT Surcharge (Oct 2024)</h4>
            <p className="text-sm text-text-secondary mb-2">
              An additional 5% surcharge applies to all additional residential properties (second homes, buy-to-let). This is added to the standard SDLT rates shown above.
            </p>
          </div>

          <div className="bg-green-50 rounded-[var(--radius-card)] p-6 border border-green-200">
            <h4 className="font-semibold text-text-primary mb-3">Important Notes</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• This calculation assumes a standard 5/5 mortgage (5% deposit down, interest-only or repayment)</li>
              <li>• Mortgage interest is calculated on remaining balance; this uses a simplified first-year estimate</li>
              <li>• Tax calculation is approximate; actual tax depends on your full income, reliefs, and personal circumstances</li>
              <li>• Rental expenses should include insurance, maintenance, letting agent fees, void periods, and repairs</li>
              <li>• Consult an accountant for precise tax planning and mortgage eligibility</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
