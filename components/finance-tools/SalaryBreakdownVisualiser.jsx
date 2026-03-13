'use client';

import { useState, useMemo } from 'react';

export default function SalaryBreakdownVisualiser() {
  const [annualSalary, setAnnualSalary] = useState('35000');
  const [studentLoanPlan, setStudentLoanPlan] = useState('none');
  const [pensionPercentage, setPensionPercentage] = useState('5');
  const [expenses, setExpenses] = useState({
    rent: '',
    bills: '',
    food: '',
    transport: '',
    subscriptions: '',
    savings: '',
    other: '',
  });

  const fmt = (n) =>
    '£' +
    n.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const calculations = useMemo(() => {
    const salary = parseFloat(annualSalary) || 0;
    const monthly = salary / 12;
    const pension = (monthly * (parseFloat(pensionPercentage) || 0)) / 100;

    let ni = 0;
    let incomeTax = 0;
    let studentLoan = 0;

    const monthlyAfterPension = monthly - pension;

    if (monthlyAfterPension > 1257) {
      ni =
        (monthlyAfterPension - 1257) *
        (monthlyAfterPension > 4189 ? 0.08 : 0.08);
    }

    if (monthlyAfterPension > 1257) {
      const taxableTaxBand = monthlyAfterPension - 1257;
      if (taxableTaxBand > 0) {
        if (taxableTaxBand > 2917) {
          incomeTax = 2917 * 0.2 + (taxableTaxBand - 2917) * 0.4;
        } else {
          incomeTax = taxableTaxBand * 0.2;
        }
      }
    }

    if (studentLoanPlan === 'plan1') {
      if (monthlyAfterPension > 1896) {
        studentLoan = (monthlyAfterPension - 1896) * 0.09;
      }
    } else if (studentLoanPlan === 'plan2') {
      if (monthlyAfterPension > 1844) {
        studentLoan = (monthlyAfterPension - 1844) * 0.09;
      }
    } else if (studentLoanPlan === 'plan4') {
      if (monthlyAfterPension > 1932) {
        studentLoan = (monthlyAfterPension - 1932) * 0.04;
      }
    } else if (studentLoanPlan === 'plan5') {
      if (monthlyAfterPension > 1250) {
        studentLoan = (monthlyAfterPension - 1250) * 0.09;
      }
    }

    const totalDeductions = pension + ni + incomeTax + studentLoan;
    const monthlyTakeHome = monthly - totalDeductions;

    return {
      monthly,
      pension,
      ni,
      incomeTax,
      studentLoan,
      totalDeductions,
      monthlyTakeHome,
      annualTakeHome: monthlyTakeHome * 12,
    };
  }, [annualSalary, pensionPercentage, studentLoanPlan]);

  const totalExpenses = useMemo(() => {
    return Object.values(expenses).reduce((sum, val) => {
      return sum + (parseFloat(val) || 0);
    }, 0);
  }, [expenses]);

  const remaining = calculations.monthlyTakeHome - totalExpenses;

  const expenseCategories = [
    { key: 'rent', label: 'Rent / Mortgage', icon: '🏠', color: '#ea580c' },
    { key: 'bills', label: 'Bills & Utilities', icon: '⚡', color: '#ea580c' },
    { key: 'food', label: 'Food & Groceries', icon: '🍽️', color: '#10b981' },
    { key: 'transport', label: 'Transport', icon: '🚗', color: '#3b82f6' },
    { key: 'subscriptions', label: 'Subscriptions', icon: '📱', color: '#8b5cf6' },
    { key: 'savings', label: 'Savings', icon: '💰', color: '#06b6d4' },
    { key: 'other', label: 'Other', icon: '📦', color: '#6b7280' },
  ];

  const handleExpenseChange = (key, value) => {
    setExpenses({ ...expenses, [key]: value });
  };

  const colors = {
    pension: '#f97316',
    ni: '#ef4444',
    incomeTax: '#ec4899',
    remaining: '#10b981',
  };

  const deductionItems = [
    { label: 'Pension Contribution', amount: calculations.pension, color: colors.pension },
    { label: 'National Insurance', amount: calculations.ni, color: colors.ni },
    { label: 'Income Tax', amount: calculations.incomeTax, color: colors.incomeTax },
  ];

  if (calculations.studentLoan > 0) {
    deductionItems.push({
      label: 'Student Loan',
      amount: calculations.studentLoan,
      color: '#f43f5e',
    });
  }

  deductionItems.push({
    label: 'Take Home Pay',
    amount: calculations.monthlyTakeHome,
    color: colors.remaining,
  });

  const totalForViz =
    calculations.pension +
    calculations.ni +
    calculations.incomeTax +
    (calculations.studentLoan || 0) +
    calculations.monthlyTakeHome;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Input Section */}
      <div className="space-y-4 bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Annual Salary
          </label>
          <input
            type="number"
            value={annualSalary}
            onChange={(e) => setAnnualSalary(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">
            Pension Contribution
          </label>
          <div className="flex gap-2 mb-3">
            {[3, 5, 8, 10].map((pct) => (
              <button
                key={pct}
                onClick={() => setPensionPercentage(pct.toString())}
                className={`px-3 py-2 rounded-[8px] font-medium transition-colors text-sm ${
                  parseInt(pensionPercentage) === pct
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <input
            type="number"
            value={pensionPercentage}
            onChange={(e) => setPensionPercentage(e.target.value)}
            placeholder="5"
            className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">
            Student Loan Plan
          </label>
          <select
            value={studentLoanPlan}
            onChange={(e) => setStudentLoanPlan(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
          >
            <option value="none">No student loan</option>
            <option value="plan1">Plan 1 (pre-2012)</option>
            <option value="plan2">Plan 2 (2012-2023)</option>
            <option value="plan4">Plan 4 (Scotland pre-2023)</option>
            <option value="plan5">Plan 5 (2023+)</option>
          </select>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Monthly Gross</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {fmt(calculations.monthly)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Monthly Take Home</p>
          <p className="font-mono text-3xl font-bold text-accent">
            {fmt(calculations.monthlyTakeHome)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Total Deductions</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {fmt(calculations.totalDeductions)}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-1">Annual Take Home</p>
          <p className="font-mono text-3xl font-bold text-text-primary">
            {fmt(calculations.annualTakeHome)}
          </p>
        </div>
      </div>

      {/* Salary Breakdown Visualisation */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <h3 className="text-text-primary font-semibold mb-4">
          Monthly Salary Breakdown
        </h3>
        <div className="mb-4">
          <div className="flex h-10 rounded-[8px] overflow-hidden border border-border">
            {deductionItems.map((item, idx) => {
              const percentage = (item.amount / totalForViz) * 100;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center text-white text-xs font-bold transition-all hover:opacity-80"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color,
                    minWidth: percentage > 5 ? 'auto' : '0',
                  }}
                >
                  {percentage > 8 && `${percentage.toFixed(0)}%`}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          {deductionItems.map((item, idx) => {
            const percentage = (item.amount / totalForViz) * 100;
            return (
              <div
                key={idx}
                className="flex items-center justify-between py-2 px-3 bg-white border border-border rounded-[8px]"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-text-primary font-medium text-sm">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-text-muted text-xs">
                    {percentage.toFixed(1)}%
                  </span>
                  <span className="text-text-primary font-mono font-semibold">
                    {fmt(item.amount)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Deductions */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <h3 className="text-text-primary font-semibold mb-4">Tax & Contributions</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 px-3 bg-white border border-border rounded-[8px]">
            <span className="text-text-primary font-medium">Pension (Your Contribution)</span>
            <span className="text-text-primary font-mono font-semibold">
              {fmt(calculations.pension)}/month
            </span>
          </div>
          <div className="flex justify-between py-2 px-3 bg-white border border-border rounded-[8px]">
            <span className="text-text-primary font-medium">Income Tax</span>
            <span className="text-text-primary font-mono font-semibold">
              {fmt(calculations.incomeTax)}/month
            </span>
          </div>
          <div className="flex justify-between py-2 px-3 bg-white border border-border rounded-[8px]">
            <span className="text-text-primary font-medium">National Insurance</span>
            <span className="text-text-primary font-mono font-semibold">
              {fmt(calculations.ni)}/month
            </span>
          </div>
          {calculations.studentLoan > 0 && (
            <div className="flex justify-between py-2 px-3 bg-white border border-border rounded-[8px]">
              <span className="text-text-primary font-medium">Student Loan</span>
              <span className="text-text-primary font-mono font-semibold">
                {fmt(calculations.studentLoan)}/month
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Expense Input Section */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <h3 className="text-text-primary font-semibold mb-4">Monthly Expenses</h3>
        <div className="space-y-3">
          {expenseCategories.map((cat) => (
            <div key={cat.key}>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                {cat.icon} {cat.label}
              </label>
              <input
                type="number"
                value={expenses[cat.key]}
                onChange={(e) => handleExpenseChange(cat.key, e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <h3 className="text-text-primary font-semibold mb-4">Expense Summary</h3>

        <div className="space-y-3 mb-6">
          {expenseCategories.map((cat) => {
            const amount = parseFloat(expenses[cat.key]) || 0;
            if (amount <= 0) return null;
            const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
            return (
              <div key={cat.key} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary text-sm">{cat.label}</span>
                  <span className="text-text-primary font-mono font-semibold">
                    {fmt(amount)}
                  </span>
                </div>
                <div className="w-full h-2 bg-white border border-border rounded-[4px] overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2 pt-4 border-t border-border">
          <div className="flex justify-between">
            <span className="text-text-secondary">Total Expenses</span>
            <span className="text-text-primary font-mono font-semibold">
              {fmt(totalExpenses)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Monthly Take Home</span>
            <span className="text-text-primary font-mono font-semibold">
              {fmt(calculations.monthlyTakeHome)}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
            <span className={remaining >= 0 ? 'text-accent' : 'text-error'}>
              Remaining
            </span>
            <span
              className={`font-mono ${remaining >= 0 ? 'text-accent' : 'text-error'}`}
            >
              {fmt(Math.abs(remaining))}
            </span>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {remaining > 0 && (
        <div className="bg-accent bg-opacity-10 border border-accent rounded-[12px] p-4 sm:p-6">
          <p className="text-accent font-medium text-sm">
            Great! You have {fmt(remaining)} left over each month after expenses. Consider
            increasing savings or investments.
          </p>
        </div>
      )}

      {remaining < 0 && (
        <div className="bg-error bg-opacity-10 border border-error rounded-[12px] p-4 sm:p-6">
          <p className="text-error font-medium text-sm">
            Warning: Your expenses exceed your take-home pay by {fmt(Math.abs(remaining))} per
            month. Consider reviewing your budget.
          </p>
        </div>
      )}

      {remaining === 0 && (
        <div className="bg-warning bg-opacity-10 border border-warning rounded-[12px] p-4 sm:p-6">
          <p className="text-warning font-medium text-sm">
            Your expenses match your take-home pay exactly. Any unexpected costs could be
            problematic.
          </p>
        </div>
      )}
    </div>
  );
}
