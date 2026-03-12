'use client';

import { useState, useMemo } from 'react';

export default function LoanRepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [annualRate, setAnnualRate] = useState(5.5);
  const [termType, setTermType] = useState('years');
  const [termValue, setTermValue] = useState(25);
  const [repaymentType, setRepaymentType] = useState('repayment');
  const [overpayment, setOverpayment] = useState(0);

  const results = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12;
    const loanTermMonths = termType === 'years' ? termValue * 12 : termValue;

    let monthlyPayment = 0;
    let totalRepayment = 0;
    let totalInterest = 0;

    if (repaymentType === 'repayment') {
      // Standard repayment mortgage formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
      if (monthlyRate > 0) {
        monthlyPayment =
          (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) /
          (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
      } else {
        monthlyPayment = loanAmount / loanTermMonths;
      }

      // Calculate with overpayment
      let balance = loanAmount;
      let monthsToPayoff = loanTermMonths;
      let totalPaid = 0;

      if (overpayment > 0) {
        monthsToPayoff = 0;
        while (balance > 0 && monthsToPayoff < 600) {
          // 50-year safety limit
          const interestThisMonth = balance * monthlyRate;
          const principalThisMonth = monthlyPayment + overpayment - interestThisMonth;
          balance -= principalThisMonth;
          totalPaid += monthlyPayment + overpayment;
          monthsToPayoff++;
        }
        totalRepayment = totalPaid;
      } else {
        totalRepayment = monthlyPayment * loanTermMonths;
      }

      totalInterest = totalRepayment - loanAmount;
    } else {
      // Interest-only: only pay interest each month
      monthlyPayment = loanAmount * monthlyRate;
      totalRepayment = monthlyPayment * loanTermMonths + loanAmount;
      totalInterest = monthlyPayment * loanTermMonths;
    }

    // Calculate amortization summary
    const calculateBalance = (months) => {
      let balance = loanAmount;
      for (let i = 0; i < months; i++) {
        const interestPayment = balance * monthlyRate;
        let principalPayment = monthlyPayment - interestPayment;
        if (principalPayment < 0) principalPayment = 0; // Interest-only
        balance -= principalPayment;
      }
      return Math.max(0, balance);
    };

    const firstYearBalance = calculateBalance(12);
    const midpointBalance = calculateBalance(Math.floor(loanTermMonths / 2));
    const lastYearBalance = calculateBalance(loanTermMonths - 1);

    return {
      monthlyPayment,
      totalRepayment,
      totalInterest,
      firstYearBalance,
      midpointBalance,
      lastYearBalance,
      monthsToPayoff: overpayment > 0 ? loanTermMonths - Math.round((monthsToPayoff - loanTermMonths) / 12) : loanTermMonths,
      timeSaved: overpayment > 0 ? loanTermMonths - Math.round(monthsToPayoff) : 0,
      moneySaved: overpayment > 0 ? (monthlyPayment * loanTermMonths + loanAmount) - totalRepayment : 0,
    };
  }, [loanAmount, annualRate, termType, termValue, repaymentType, overpayment]);

  const formatCurrency = (value) => {
    return '£' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Loan Repayment Calculator</h2>

      {/* Inputs */}
      <div className="space-y-4 mb-8">
        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Loan Amount (£)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="1000"
          />
          <p className="text-xs text-text-muted mt-1">Total amount to borrow</p>
        </div>

        {/* Annual Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="0.1"
          />
          <p className="text-xs text-text-muted mt-1">Annual percentage rate</p>
        </div>

        {/* Loan Term */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Term Value
            </label>
            <input
              type="number"
              value={termValue}
              onChange={(e) => setTermValue(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
              min="0"
              step="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Term Type
            </label>
            <select
              value={termType}
              onChange={(e) => setTermType(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        {/* Repayment Type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Repayment Type
          </label>
          <select
            value={repaymentType}
            onChange={(e) => setRepaymentType(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
          >
            <option value="repayment">Repayment (Capital + Interest)</option>
            <option value="interest-only">Interest-Only</option>
          </select>
          <p className="text-xs text-text-muted mt-1">Choose how you'll repay the loan</p>
        </div>

        {/* Overpayment */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Monthly Overpayment (£) <span className="text-text-muted">Optional</span>
          </label>
          <input
            type="number"
            value={overpayment}
            onChange={(e) => setOverpayment(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent"
            min="0"
            step="50"
          />
          <p className="text-xs text-text-muted mt-1">Extra amount paid each month</p>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border space-y-4">
        <div>
          <p className="text-text-secondary text-sm mb-1">Monthly Payment</p>
          <p className="text-3xl font-bold text-accent font-mono-num">
            {formatCurrency(results.monthlyPayment)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-text-secondary text-sm mb-1">Total Repayment</p>
            <p className="text-xl font-bold text-text-primary font-mono-num">
              {formatCurrency(results.totalRepayment)}
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Total Interest Paid</p>
            <p className="text-xl font-bold text-text-primary font-mono-num">
              {formatCurrency(results.totalInterest)}
            </p>
          </div>
        </div>

        {overpayment > 0 && (
          <div className="border-t border-border pt-4 space-y-2">
            <p className="text-sm text-text-secondary">With Overpayment:</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-muted">Time Saved</p>
                <p className="font-bold text-text-primary">{results.timeSaved} months</p>
              </div>
              <div>
                <p className="text-text-muted">Money Saved</p>
                <p className="font-bold text-accent font-mono-num">{formatCurrency(results.moneySaved)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Amortization Summary */}
      <div className="bg-white rounded-[var(--radius-card)] p-6 mb-8 border border-border">
        <h3 className="text-lg font-bold text-text-primary mb-4">Amortization Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-text-secondary">After Year 1</span>
            <span className="font-mono-num font-bold text-text-primary">
              {formatCurrency(results.firstYearBalance)} remaining
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-text-secondary">Midpoint</span>
            <span className="font-mono-num font-bold text-text-primary">
              {formatCurrency(results.midpointBalance)} remaining
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Final Year</span>
            <span className="font-mono-num font-bold text-text-primary">
              {formatCurrency(results.lastYearBalance)} remaining
            </span>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="bg-white rounded-[var(--radius-card)] p-4 border border-border text-xs text-text-muted">
        <p>Monthly payment is calculated using the standard mortgage formula and is rounded to the nearest penny.</p>
      </div>
    </div>
  );
}
