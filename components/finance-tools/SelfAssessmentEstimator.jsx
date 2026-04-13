'use client';

import { useState, useMemo } from 'react';
import { TAX_YEARS, CURRENT_TAX_YEAR, TAX_YEAR_ORDER, SELF_EMPLOYMENT_NI } from '@/data/tax-rates';
import { formatCurrency, formatPercentage } from '@/lib/format';
import Tooltip from '@/components/ui/Tooltip';

const STUDENT_LOAN_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'plan1', label: 'Plan 1' },
  { value: 'plan2', label: 'Plan 2' },
  { value: 'plan4', label: 'Plan 4 (Scotland)' },
  { value: 'plan5', label: 'Plan 5' },
  { value: 'postgrad', label: 'Postgraduate' },
];

const TIPS = {
  employment: 'Gross salary or wages from PAYE employment before any deductions.',
  selfEmployment: 'Your total self-employment turnover/revenue before deducting expenses.',
  expenses: 'Allowable business expenses you can deduct from your self-employment income. HMRC allows costs wholly and exclusively for your business.',
  rental: 'Gross annual rental income from property you let out.',
  dividends: 'Dividend income from company shares or your own limited company.',
  savings: 'Interest earned from savings accounts, ISAs are usually tax-free.',
  pension: 'Personal pension contributions qualify for tax relief.',
  giftAid: 'Charity donations via Gift Aid extend your basic rate band.',
  paidTax: 'Tax already deducted through PAYE by your employer this tax year.',
  studentLoan: 'Your repayment plan depends on when and where you studied.',
  poa: 'Payments on Account are advance payments toward next year\'s bill, each 50% of this year\'s balance.',
};

// Common allowable expense categories for self-employed
const EXPENSE_CATEGORIES = [
  { key: 'officeAndPremises', label: 'Office / premises', tip: 'Rent, utilities, business rates. If working from home, claim a proportion.' },
  { key: 'travelAndVehicle', label: 'Travel / vehicle', tip: 'Business mileage (45p/mi first 10k, 25p after), public transport, parking.' },
  { key: 'staffCosts', label: 'Staff costs', tip: 'Salaries, subcontractor fees, employer NI, pension contributions for staff.' },
  { key: 'stockAndMaterials', label: 'Stock / materials', tip: 'Raw materials, stock for resale, direct costs of goods sold.' },
  { key: 'marketing', label: 'Marketing / ads', tip: 'Website hosting, advertising, business cards, social media ads.' },
  { key: 'professional', label: 'Professional fees', tip: 'Accountant, solicitor, professional memberships, insurance.' },
  { key: 'phoneBroadband', label: 'Phone / broadband', tip: 'Business proportion of phone and internet bills.' },
  { key: 'software', label: 'Software / tools', tip: 'Subscriptions, software licences, cloud services used for business.' },
  { key: 'training', label: 'Training / CPD', tip: 'Courses and training directly related to your current trade.' },
  { key: 'otherExpenses', label: 'Other expenses', tip: 'Any other allowable business expense not listed above.' },
];

function Tip({ text }) {
  return (
    <Tooltip content={text}>
      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-border text-[9px] text-text-muted cursor-help leading-none ml-0.5">?</span>
    </Tooltip>
  );
}

function Field({ label, tip, children }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-[13px] text-text-secondary whitespace-nowrap min-w-[120px] flex items-center">
        {label}{tip && <Tip text={tip} />}
      </label>
      {children}
    </div>
  );
}

function BreakdownBar({ items, total }) {
  const colors = ['bg-green-400', 'bg-blue-400', 'bg-amber-400', 'bg-purple-400', 'bg-rose-400', 'bg-cyan-400'];
  return (
    <div className="space-y-1.5">
      <div className="flex rounded-full overflow-hidden h-3">
        {items.map((item, i) =>
          item.value > 0 ? (
            <div key={item.label} className={`${colors[i]} transition-all duration-500`} style={{ width: `${(item.value / total) * 100}%` }} title={`${item.label}: ${formatCurrency(item.value)}`} />
          ) : null
        )}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {items.map((item, i) =>
          item.value > 0 ? (
            <span key={item.label} className="flex items-center gap-1 text-[11px] text-text-muted">
              <span className={`w-2 h-2 rounded-full ${colors[i]}`} />{item.label} ({formatPercentage((item.value / total) * 100, 0)})
            </span>
          ) : null
        )}
      </div>
    </div>
  );
}

export default function SelfAssessmentEstimator() {
  const [taxYear, setTaxYear] = useState(CURRENT_TAX_YEAR);
  const [employmentIncome, setEmploymentIncome] = useState('');
  const [selfEmploymentTurnover, setSelfEmploymentTurnover] = useState('');
  const [showExpenses, setShowExpenses] = useState(false);
  const [expenses, setExpenses] = useState({});
  const [rentalIncome, setRentalIncome] = useState('');
  const [dividendIncome, setDividendIncome] = useState('');
  const [savingsInterest, setSavingsInterest] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [pensionContributions, setPensionContributions] = useState('');
  const [giftAidDonations, setGiftAidDonations] = useState('');
  const [studentLoanPlan, setStudentLoanPlan] = useState('none');
  const [alreadyPaidTax, setAlreadyPaidTax] = useState('');
  const [showAdditional, setShowAdditional] = useState(false);

  const num = (v) => Number(v) || 0;

  const totalExpenses = useMemo(() => {
    return Object.values(expenses).reduce((sum, val) => sum + (Number(val) || 0), 0);
  }, [expenses]);

  const selfEmploymentProfit = Math.max(0, num(selfEmploymentTurnover) - totalExpenses);

  const calculations = useMemo(() => {
    const yearData = TAX_YEARS[taxYear];
    if (!yearData) return null;

    const totalIncome =
      num(employmentIncome) +
      selfEmploymentProfit +
      num(rentalIncome) +
      num(dividendIncome) +
      num(savingsInterest) +
      num(otherIncome);

    // Personal Allowance with taper
    let personalAllowance = yearData.personalAllowance;
    if (totalIncome > yearData.personalAllowanceTaperThreshold) {
      const excess = totalIncome - yearData.personalAllowanceTaperThreshold;
      personalAllowance = Math.max(0, personalAllowance - Math.floor(excess / 2));
    }

    // Taxable income
    const deductions = num(pensionContributions) + num(giftAidDonations);
    const taxableIncome = Math.max(0, totalIncome - personalAllowance - deductions);

    // Income tax
    let incomeTax = 0;
    const taxBands = [];
    let remaining = taxableIncome;

    for (const band of yearData.incomeTaxBands) {
      const bandWidth = band.to === Infinity ? Infinity : band.to - band.from;
      const taxableInBand = Math.min(remaining, bandWidth);
      if (taxableInBand > 0) {
        const tax = taxableInBand * band.rate;
        incomeTax += tax;
        taxBands.push({ name: band.name, rate: band.rate, taxable: taxableInBand, tax });
        remaining -= taxableInBand;
      }
      if (remaining <= 0) break;
    }

    // NI (self-employed)
    let class2NI = 0;
    let class4NI = 0;
    if (selfEmploymentProfit > 0) {
      const seNI = SELF_EMPLOYMENT_NI[taxYear];
      if (seNI) {
        if (selfEmploymentProfit > seNI.class2.smallProfitsThreshold) {
          class2NI = seNI.class2.weeklyRate * 52;
        }
        const above = Math.max(0, selfEmploymentProfit - seNI.class4.lowerProfitsLimit);
        if (above > 0) {
          const mainBand = Math.min(above, seNI.class4.upperProfitsLimit - seNI.class4.lowerProfitsLimit);
          const higher = Math.max(0, above - mainBand);
          class4NI = mainBand * seNI.class4.mainRate + higher * seNI.class4.higherRate;
        }
      }
    }

    // Employee NI
    let employeeNI = 0;
    if (num(employmentIncome) > 0 && yearData.ni) {
      const empIncome = num(employmentIncome);
      if (empIncome > yearData.ni.primaryThreshold) {
        const mainBand = Math.min(empIncome, yearData.ni.upperEarningsLimit) - yearData.ni.primaryThreshold;
        employeeNI += Math.max(0, mainBand) * yearData.ni.mainRate;
        if (empIncome > yearData.ni.upperEarningsLimit) {
          employeeNI += (empIncome - yearData.ni.upperEarningsLimit) * yearData.ni.higherRate;
        }
      }
    }

    // Student loan
    let studentLoan = 0;
    const slConfig = yearData.studentLoans[studentLoanPlan];
    if (slConfig && totalIncome > slConfig.threshold) {
      studentLoan = (totalIncome - slConfig.threshold) * slConfig.rate;
    }

    const totalNI = class2NI + class4NI + employeeNI;
    const totalTax = incomeTax + totalNI + studentLoan;
    const paid = num(alreadyPaidTax);
    const balance = totalTax - paid;
    const poa1 = Math.max(0, Math.round(balance / 2));
    const poa2 = Math.max(0, balance - poa1);

    return {
      totalIncome,
      personalAllowance,
      taxableIncome,
      incomeTax,
      taxBands,
      class2NI,
      class4NI,
      employeeNI,
      totalNI,
      studentLoan,
      totalTax,
      paid,
      balance,
      poa1,
      poa2,
      effectiveRate: totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0,
    };
  }, [taxYear, employmentIncome, selfEmploymentProfit, rentalIncome, dividendIncome, savingsInterest, otherIncome, pensionContributions, giftAidDonations, studentLoanPlan, alreadyPaidTax]);

  if (!calculations) return null;

  const hasIncome = calculations.totalIncome > 0;
  const inputClass = 'flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono';
  const selectClass = 'flex-1 px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer';
  const moneyInput = (value, setter, placeholder) => (
    <div className="relative flex-1">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted text-sm">&#163;</span>
      <input
        type="number"
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder || '0'}
        className="w-full pl-5 pr-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent font-mono"
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4 items-start">
      {/* LEFT: Inputs */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-2.5">
        {/* Tax Year */}
        <Field label="Tax year">
          <select value={taxYear} onChange={(e) => setTaxYear(e.target.value)} className={selectClass}>
            {TAX_YEAR_ORDER.map((yr) => (
              <option key={yr} value={yr}>{TAX_YEARS[yr].label}</option>
            ))}
          </select>
        </Field>

        <div className="border-t border-border pt-2">
          <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">Income Sources</p>
        </div>

        <Field label="Employment" tip={TIPS.employment}>
          {moneyInput(employmentIncome, setEmploymentIncome)}
        </Field>

        <Field label="SE turnover" tip={TIPS.selfEmployment}>
          {moneyInput(selfEmploymentTurnover, setSelfEmploymentTurnover)}
        </Field>

        {/* Allowable Expenses */}
        {num(selfEmploymentTurnover) > 0 && (
          <div className="ml-[128px] space-y-1.5">
            <button
              onClick={() => setShowExpenses(!showExpenses)}
              className="text-[12px] text-accent hover:text-accent-hover transition-colors cursor-pointer"
            >
              {showExpenses ? '- Hide' : '+ Allowable'} expenses
            </button>

            {showExpenses && (
              <div className="space-y-1.5 p-2.5 bg-surface rounded-lg border border-border">
                {EXPENSE_CATEGORIES.map((cat) => (
                  <div key={cat.key} className="flex items-center gap-1.5">
                    <label className="text-[11px] text-text-secondary whitespace-nowrap min-w-[90px] flex items-center">
                      {cat.label}<Tip text={cat.tip} />
                    </label>
                    <div className="relative flex-1">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted text-[11px]">&#163;</span>
                      <input
                        type="number"
                        value={expenses[cat.key] || ''}
                        onChange={(e) => setExpenses((prev) => ({ ...prev, [cat.key]: e.target.value }))}
                        placeholder="0"
                        className="w-full pl-4 pr-1 py-1 text-[11px] rounded border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent font-mono"
                      />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-1.5 border-t border-border text-[11px]">
                  <span className="font-semibold text-text-primary">Total expenses</span>
                  <span className="font-mono font-semibold text-accent">{formatCurrency(totalExpenses)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-text-secondary">Net profit</span>
                  <span className="font-mono font-semibold text-text-primary">{formatCurrency(selfEmploymentProfit)}</span>
                </div>
              </div>
            )}

            {!showExpenses && totalExpenses > 0 && (
              <p className="text-[11px] text-text-muted">
                Expenses: {formatCurrency(totalExpenses)} | Profit: {formatCurrency(selfEmploymentProfit)}
              </p>
            )}
          </div>
        )}

        <button
          onClick={() => setShowAdditional(!showAdditional)}
          className="text-[12px] text-accent hover:text-accent-hover transition-colors cursor-pointer"
        >
          {showAdditional ? '- Hide' : '+ More'} income sources
        </button>

        {showAdditional && (
          <div className="space-y-2.5 pt-1">
            <Field label="Rental" tip={TIPS.rental}>
              {moneyInput(rentalIncome, setRentalIncome)}
            </Field>
            <Field label="Dividends" tip={TIPS.dividends}>
              {moneyInput(dividendIncome, setDividendIncome)}
            </Field>
            <Field label="Savings" tip={TIPS.savings}>
              {moneyInput(savingsInterest, setSavingsInterest)}
            </Field>
            <Field label="Other income">
              {moneyInput(otherIncome, setOtherIncome)}
            </Field>
          </div>
        )}

        <div className="border-t border-border pt-2">
          <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">Reliefs & Deductions</p>
        </div>

        <Field label="Pension" tip={TIPS.pension}>
          {moneyInput(pensionContributions, setPensionContributions)}
        </Field>

        <Field label="Gift Aid" tip={TIPS.giftAid}>
          {moneyInput(giftAidDonations, setGiftAidDonations)}
        </Field>

        <Field label="Student loan" tip={TIPS.studentLoan}>
          <select value={studentLoanPlan} onChange={(e) => setStudentLoanPlan(e.target.value)} className={selectClass}>
            {STUDENT_LOAN_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Tax already paid" tip={TIPS.paidTax}>
          {moneyInput(alreadyPaidTax, setAlreadyPaidTax)}
        </Field>

        <p className="text-[10px] text-text-muted pt-1 border-t border-border">
          {TAX_YEARS[taxYear]?.label} tax year. This is an estimate for guidance only.
        </p>
      </div>

      {/* RIGHT: Results */}
      <div className="space-y-3">
        {/* Balance owed hero */}
        <div className={`${calculations.balance > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4`}>
          <div>
            <p className="text-[12px] text-text-secondary">{calculations.balance > 0 ? 'Balance to pay HMRC' : 'Nothing owed'}</p>
            <p className={`text-2xl sm:text-3xl font-bold font-mono leading-tight ${calculations.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {hasIncome ? formatCurrency(Math.abs(calculations.balance)) : '&#163;0.00'}
            </p>
          </div>
          {hasIncome && calculations.balance > 0 && (
            <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
              <p>31 Jan: {formatCurrency(calculations.balance + calculations.poa1)}</p>
              <p>31 Jul: {formatCurrency(calculations.poa2)}</p>
            </div>
          )}
        </div>

        {/* Breakdown bar */}
        {hasIncome && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
            <BreakdownBar
              total={calculations.totalIncome}
              items={[
                { label: 'After tax', value: calculations.totalIncome - calculations.totalTax },
                { label: 'Income tax', value: calculations.incomeTax },
                { label: 'NI', value: calculations.totalNI },
                { label: 'Student loan', value: calculations.studentLoan },
              ]}
            />
          </div>
        )}

        {/* Summary table */}
        {hasIncome && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Summary</th>
                  <th className="text-right py-1.5 px-2 font-semibold text-text-primary w-20">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Total income', value: calculations.totalIncome, cls: 'font-semibold' },
                  num(selfEmploymentTurnover) > 0 && totalExpenses > 0 && { label: 'Less: business expenses', value: totalExpenses, deduction: true },
                  num(selfEmploymentTurnover) > 0 && totalExpenses > 0 && { label: 'Net SE profit', value: selfEmploymentProfit },
                  { label: 'Personal allowance', value: calculations.personalAllowance },
                  { label: 'Taxable income', value: calculations.taxableIncome, cls: 'font-semibold' },
                  { label: 'Income tax', value: calculations.incomeTax, deduction: true, highlight: 'bg-red-50' },
                  calculations.class2NI > 0 && { label: 'Class 2 NI', value: calculations.class2NI, deduction: true },
                  calculations.class4NI > 0 && { label: 'Class 4 NI', value: calculations.class4NI, deduction: true },
                  calculations.employeeNI > 0 && { label: 'Employee NI (PAYE)', value: calculations.employeeNI, deduction: true },
                  calculations.studentLoan > 0 && { label: 'Student loan', value: calculations.studentLoan, deduction: true },
                  { label: 'Total tax & NI', value: calculations.totalTax, deduction: true, cls: 'font-semibold' },
                  calculations.paid > 0 && { label: 'Less: tax already paid', value: calculations.paid },
                  { label: calculations.balance >= 0 ? 'Balance to pay' : 'Overpaid', value: Math.abs(calculations.balance), cls: 'font-semibold', highlight: calculations.balance > 0 ? 'bg-red-50' : 'bg-green-50' },
                ].filter(Boolean).map((row) => (
                  <tr key={row.label} className={`border-b border-border/50 ${row.highlight || ''} ${row.cls || ''}`}>
                    <td className={`py-1.5 pr-2 ${row.cls?.includes('font-semibold') ? 'text-text-primary' : 'text-text-secondary'}`}>{row.label}</td>
                    <td className={`py-1.5 px-2 text-right font-mono ${row.deduction ? 'text-red-600' : ''}`}>
                      {row.deduction ? `-${formatCurrency(row.value)}` : formatCurrency(row.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tax band detail */}
        {hasIncome && calculations.taxBands.length > 0 && (
          <div className="bg-white border border-border rounded-[var(--radius-card)] px-4 py-3">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-1.5 font-semibold text-text-primary">Income Tax Bands</th>
                  <th className="text-right py-1.5 font-semibold text-text-primary w-14">Rate</th>
                  <th className="text-right py-1.5 font-semibold text-text-primary">Taxable</th>
                  <th className="text-right py-1.5 pl-2 font-semibold text-text-primary">Tax</th>
                </tr>
              </thead>
              <tbody>
                {calculations.taxBands.map((band) => (
                  <tr key={band.name} className="border-b border-border/50">
                    <td className="py-1 text-text-secondary">{band.name}</td>
                    <td className="py-1 text-right font-mono">{(band.rate * 100).toFixed(0)}%</td>
                    <td className="py-1 text-right font-mono">{formatCurrency(band.taxable)}</td>
                    <td className="py-1 pl-2 text-right font-mono text-red-600">-{formatCurrency(band.tax)}</td>
                  </tr>
                ))}
                <tr className="border-t border-border font-semibold">
                  <td className="py-1.5 text-text-primary" colSpan={3}>Total income tax</td>
                  <td className="py-1.5 pl-2 text-right font-mono text-red-600">-{formatCurrency(calculations.incomeTax)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Payments on Account */}
        {hasIncome && calculations.balance > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] px-4 py-3">
            <p className="text-[12px] font-semibold text-text-primary mb-2">Payment Schedule</p>
            <div className="space-y-1 text-[13px]">
              <div className="flex justify-between">
                <span className="text-text-secondary">31 January (balance + 1st POA)<Tip text={TIPS.poa} /></span>
                <span className="font-mono font-semibold text-text-primary">{formatCurrency(calculations.balance + calculations.poa1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">31 July (2nd POA)</span>
                <span className="font-mono font-semibold text-text-primary">{formatCurrency(calculations.poa2)}</span>
              </div>
              <p className="text-[11px] text-text-muted mt-1">POA = Payment on Account, each 50% of this year's balance.</p>
            </div>
          </div>
        )}

        {/* Effective rate */}
        {hasIncome && (
          <div className="bg-surface rounded-[var(--radius-card)] px-4 py-2.5 flex items-center justify-between">
            <span className="text-[13px] text-text-secondary">Effective tax rate</span>
            <span className="text-[15px] font-semibold font-mono text-text-primary">{formatPercentage(calculations.effectiveRate)}</span>
          </div>
        )}

        {/* Empty state */}
        {!hasIncome && (
          <div className="bg-surface border border-border rounded-[var(--radius-card)] px-4 py-4 text-center text-text-muted text-sm">
            Enter your income to see your Self Assessment tax estimate
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-[var(--radius-card)] px-4 py-2.5">
          <p className="text-[11px] text-text-secondary">
            This estimate is for guidance only. For official calculations, use the HMRC Self Assessment service or consult a qualified accountant. Dividend and savings tax allowances are simplified in this estimate.
          </p>
        </div>
      </div>
    </div>
  );
}
