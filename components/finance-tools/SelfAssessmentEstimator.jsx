'use client';

import { useState, useMemo } from 'react';
import { TAX_YEARS, CURRENT_TAX_YEAR, SELF_EMPLOYMENT_NI } from '@/data/tax-rates';
import { formatCurrency, formatPercentage } from '@/lib/format';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

export default function SelfAssessmentEstimator() {
  const [inputs, setInputs] = useState({
    taxYear: CURRENT_TAX_YEAR,
    employmentIncome: 0,
    selfEmploymentProfit: 0,
    rentalIncome: 0,
    dividendIncome: 0,
    savingsInterest: 0,
    otherIncome: 0,
    pensionContributions: 0,
    giftAidDonations: 0,
    studentLoanPlan: 'none',
    alreadyPaidTax: 0,
  });

  const handleChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value === '' ? 0 : parseFloat(value) || 0,
    }));
  };

  const calculations = useMemo(() => {
    const taxYear = TAX_YEARS[inputs.taxYear];
    if (!taxYear) return null;

    // 1. TOTAL INCOME
    const totalIncome =
      inputs.employmentIncome +
      inputs.selfEmploymentProfit +
      inputs.rentalIncome +
      inputs.dividendIncome +
      inputs.savingsInterest +
      inputs.otherIncome;

    // 2. PERSONAL ALLOWANCE (with taper for 100k+)
    let personalAllowance = taxYear.personalAllowance;
    if (totalIncome > taxYear.personalAllowanceTaperThreshold) {
      const excess = totalIncome - taxYear.personalAllowanceTaperThreshold;
      const taperReduction = Math.floor(excess / 2);
      personalAllowance = Math.max(0, personalAllowance - taperReduction);
    }

    // 3. TAXABLE INCOME (after pension contributions & gift aid)
    const deductibleReliefs = inputs.pensionContributions + inputs.giftAidDonations;
    const taxableIncome = Math.max(0, totalIncome - personalAllowance - deductibleReliefs);

    // 4. INCOME TAX CALCULATION
    let incomeTax = 0;
    const taxBreakdown = [];

    taxYear.incomeTaxBands.forEach(band => {
      const bandStart = Math.max(0, band.from);
      const bandEnd = band.to;

      if (taxableIncome > bandStart) {
        const bandableIncome = Math.min(taxableIncome, bandEnd) - bandStart;
        const bandTax = bandableIncome * band.rate;
        incomeTax += bandTax;

        if (bandableIncome > 0) {
          taxBreakdown.push({
            name: band.name,
            rate: formatPercentage(band.rate * 100),
            amount: bandableIncome,
            tax: bandTax,
          });
        }
      }
    });

    // 5. NATIONAL INSURANCE
    // Class 2 NI (if self-employed)
    let class2NI = 0;
    if (inputs.selfEmploymentProfit > 0) {
      const seNI = SELF_EMPLOYMENT_NI[inputs.taxYear];
      if (inputs.selfEmploymentProfit > seNI.class2.smallProfitsThreshold) {
        class2NI = seNI.class2.weeklyRate * 52; // Annual
      }
    }

    // Class 4 NI (on self-employment profits)
    let class4NI = 0;
    const seNI = SELF_EMPLOYMENT_NI[inputs.taxYear];
    if (inputs.selfEmploymentProfit > 0) {
      const seProfitAboveThreshold = Math.max(0, inputs.selfEmploymentProfit - seNI.class4.lowerProfitsLimit);

      if (seProfitAboveThreshold > 0) {
        const mainRateProfit = Math.min(seProfitAboveThreshold, seNI.class4.upperProfitsLimit - seNI.class4.lowerProfitsLimit);
        const higherRateProfit = Math.max(0, seProfitAboveThreshold - mainRateProfit);

        class4NI = (mainRateProfit * seNI.class4.mainRate) + (higherRateProfit * seNI.class4.higherRate);
      }
    }

    // 6. STUDENT LOAN REPAYMENT
    let studentLoanRepayment = 0;
    const studentLoanConfig = taxYear.studentLoans[inputs.studentLoanPlan];
    if (studentLoanConfig && totalIncome > studentLoanConfig.threshold) {
      const loanableIncome = totalIncome - studentLoanConfig.threshold;
      studentLoanRepayment = loanableIncome * studentLoanConfig.rate;
    }

    // 7. TOTAL DUE
    const totalTaxAndNI = incomeTax + class2NI + class4NI + studentLoanRepayment;
    const amountAlreadyPaid = inputs.alreadyPaidTax;
    const balanceOwed = Math.max(0, totalTaxAndNI - amountAlreadyPaid);

    // 8. PAYMENTS ON ACCOUNT (estimate for next year)
    const firstPaymentOnAccount = Math.round(balanceOwed / 2);
    const secondPaymentOnAccount = balanceOwed - firstPaymentOnAccount;

    return {
      totalIncome,
      personalAllowance,
      taxableIncome,
      incomeTax,
      taxBreakdown,
      class2NI,
      class4NI,
      totalNI: class2NI + class4NI,
      studentLoanRepayment,
      totalTaxAndNI,
      amountAlreadyPaid,
      balanceOwed,
      firstPaymentOnAccount,
      secondPaymentOnAccount,
    };
  }, [inputs]);

  const handleReset = () => {
    setInputs({
      taxYear: CURRENT_TAX_YEAR,
      employmentIncome: 0,
      selfEmploymentProfit: 0,
      rentalIncome: 0,
      dividendIncome: 0,
      savingsInterest: 0,
      otherIncome: 0,
      pensionContributions: 0,
      giftAidDonations: 0,
      studentLoanPlan: 'none',
      alreadyPaidTax: 0,
    });
  };

  if (!calculations) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Input Section */}
      <div className="bg-surface rounded-[var(--radius-card)] border border-border p-6">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">Your Income</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

        <h3 className="text-lg font-semibold text-text-primary mb-4 mt-6">Income Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Employment Income (PAYE)"
            type="number"
            value={inputs.employmentIncome || ''}
            onChange={(e) => handleChange('employmentIncome', e.target.value)}
            placeholder="0.00"
            helper="Salary or wages (tax already deducted)"
          />
          <Input
            label="Self-Employment Profit"
            type="number"
            value={inputs.selfEmploymentProfit || ''}
            onChange={(e) => handleChange('selfEmploymentProfit', e.target.value)}
            placeholder="0.00"
            helper="Net profit after expenses"
          />
          <Input
            label="Rental Income"
            type="number"
            value={inputs.rentalIncome || ''}
            onChange={(e) => handleChange('rentalIncome', e.target.value)}
            placeholder="0.00"
            helper="Gross annual rental income"
          />
          <Input
            label="Dividend Income"
            type="number"
            value={inputs.dividendIncome || ''}
            onChange={(e) => handleChange('dividendIncome', e.target.value)}
            placeholder="0.00"
            helper="Dividends from company shares"
          />
          <Input
            label="Savings Interest"
            type="number"
            value={inputs.savingsInterest || ''}
            onChange={(e) => handleChange('savingsInterest', e.target.value)}
            placeholder="0.00"
            helper="Interest from bank accounts"
          />
          <Input
            label="Other Income"
            type="number"
            value={inputs.otherIncome || ''}
            onChange={(e) => handleChange('otherIncome', e.target.value)}
            placeholder="0.00"
            helper="Any other taxable income"
          />
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-4 mt-8">Tax Relief & Allowances</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Pension Contributions"
            type="number"
            value={inputs.pensionContributions || ''}
            onChange={(e) => handleChange('pensionContributions', e.target.value)}
            placeholder="0.00"
            helper="Personal pension/ISA contributions"
          />
          <Input
            label="Gift Aid Donations"
            type="number"
            value={inputs.giftAidDonations || ''}
            onChange={(e) => handleChange('giftAidDonations', e.target.value)}
            placeholder="0.00"
            helper="Charity donations with Gift Aid"
          />
          <Select
            label="Student Loan Plan"
            value={inputs.studentLoanPlan}
            options={[
              { value: 'none', label: 'None' },
              { value: 'plan1', label: 'Plan 1 (£24,990 threshold)' },
              { value: 'plan2', label: 'Plan 2 (£27,295 threshold)' },
              { value: 'plan4', label: 'Plan 4 (£31,395 threshold)' },
              { value: 'plan5', label: 'Plan 5 (£25,000 threshold)' },
              { value: 'postgrad', label: 'Postgraduate (£21,000 threshold)' },
            ]}
            onChange={(e) => handleChange('studentLoanPlan', e.target.value)}
            helper="Select your loan repayment plan"
          />
          <Input
            label="Tax Already Paid (PAYE)"
            type="number"
            value={inputs.alreadyPaidTax || ''}
            onChange={(e) => handleChange('alreadyPaidTax', e.target.value)}
            placeholder="0.00"
            helper="Tax deducted through PAYE in this year"
          />
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-border">
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Summary Card */}
        <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-text-secondary mb-1">Total Income</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary">
                {formatCurrency(calculations.totalIncome)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">Taxable Income</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary">
                {formatCurrency(calculations.taxableIncome)}
              </p>
              <p className="text-xs text-text-muted mt-1">
                After allowances & reliefs
              </p>
            </div>
            <div className="bg-accent/5 rounded-lg p-4">
              <p className="text-sm text-text-secondary mb-1">Amount Due</p>
              <p className="text-2xl font-mono-num font-bold text-accent">
                {formatCurrency(calculations.balanceOwed)}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {calculations.balanceOwed < 0 ? 'Overpaid' : 'Outstanding'}
              </p>
            </div>
          </div>
        </div>

        {/* Income Tax Breakdown */}
        <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Income Tax Breakdown</h3>
          <div className="space-y-3">
            {calculations.taxBreakdown.map((band, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-text-primary">{band.name}</p>
                  <p className="text-xs text-text-muted">
                    {formatCurrency(band.amount)} × {band.rate}
                  </p>
                </div>
                <p className="font-mono-num font-bold text-text-primary">
                  {formatCurrency(band.tax)}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 font-bold text-base">
              <p className="text-text-primary">Total Income Tax</p>
              <p className="font-mono-num text-accent">
                {formatCurrency(calculations.incomeTax)}
              </p>
            </div>
          </div>
        </div>

        {/* National Insurance */}
        <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">National Insurance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="pb-4 border-b md:border-b-0 md:border-r border-border">
              <p className="text-sm text-text-secondary mb-2">Class 2 NI</p>
              <p className="text-xl font-mono-num font-bold text-text-primary">
                {formatCurrency(calculations.class2NI)}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {calculations.class2NI > 0 ? 'Fixed annual contribution' : 'N/A — not self-employed'}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Class 4 NI</p>
              <p className="text-xl font-mono-num font-bold text-text-primary">
                {formatCurrency(calculations.class4NI)}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {calculations.class4NI > 0 ? 'On self-employment profit' : 'N/A — below threshold'}
              </p>
            </div>
          </div>
        </div>

        {/* Student Loan & Total Due */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculations.studentLoanRepayment > 0 && (
            <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
              <p className="text-sm text-text-secondary mb-2">Student Loan Repayment</p>
              <p className="text-2xl font-mono-num font-bold text-text-primary">
                {formatCurrency(calculations.studentLoanRepayment)}
              </p>
              <p className="text-xs text-text-muted mt-2">
                Deducted from gross income
              </p>
            </div>
          )}

          <div className="bg-white rounded-[var(--radius-card)] p-6 border border-border">
            <p className="text-sm text-text-secondary mb-2">Total Tax & NI</p>
            <p className="text-2xl font-mono-num font-bold text-text-primary">
              {formatCurrency(calculations.totalTaxAndNI)}
            </p>
            <p className="text-xs text-text-muted mt-2">
              Income tax + NI + student loan
            </p>
          </div>
        </div>

        {/* Payment Dates */}
        <div className="bg-blue-50 rounded-[var(--radius-card)] p-6 border border-blue-200">
          <h4 className="font-semibold text-text-primary mb-3">Self-Assessment Payment Dates</h4>
          <div className="space-y-2 text-sm text-text-secondary">
            <p>
              <strong className="text-text-primary">31 January (Balancing Payment + First POA):</strong>{' '}
              {formatCurrency(calculations.firstPaymentOnAccount)}
            </p>
            <p>
              <strong className="text-text-primary">31 July (Second POA):</strong>{' '}
              {formatCurrency(calculations.secondPaymentOnAccount)}
            </p>
            <p className="text-xs text-text-muted mt-2">
              POA = Payment on Account (estimate for next tax year, 50% each)
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-amber-50 rounded-[var(--radius-card)] p-6 border border-amber-200">
          <p className="text-sm text-text-secondary">
            This is an estimate based on the information provided. Actual amounts may differ if your circumstances change. For precise calculation, use the official HMRC Self-Assessment calculator or consult a tax professional.
          </p>
        </div>
      </div>
    </div>
  );
}
