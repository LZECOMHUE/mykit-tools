'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function DebtSnowballCalculator() {
  const [debts, setDebts] = useState([
    { id: 1, name: 'Credit Card', balance: 5000, minPayment: 150, interestRate: 18.9 },
    { id: 2, name: 'Car Loan', balance: 15000, minPayment: 350, interestRate: 4.5 },
    { id: 3, name: 'Student Loan', balance: 25000, minPayment: 200, interestRate: 3.1 },
  ]);
  const [extraPayment, setExtraPayment] = useState(0);
  const [nextId, setNextId] = useState(4);

  const formatCurrency = (value) => {
    return '£' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const addDebt = () => {
    setDebts([
      ...debts,
      { id: nextId, name: '', balance: 0, minPayment: 0, interestRate: 0 },
    ]);
    setNextId(nextId + 1);
  };

  const updateDebt = (id, field, value) => {
    setDebts(debts.map(d =>
      d.id === id ? { ...d, [field]: field === 'name' ? value : parseFloat(value) || 0 } : d
    ));
  };

  const removeDebt = (id) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const calculateStrategy = (strategy) => {
    let workingDebts = JSON.parse(JSON.stringify(debts));

    // Sort by strategy
    if (strategy === 'snowball') {
      workingDebts.sort((a, b) => a.balance - b.balance);
    } else {
      workingDebts.sort((a, b) => b.interestRate - a.interestRate);
    }

    let month = 0;
    let totalInterestPaid = 0;
    const timeline = [];
    const debtsPaidOff = [];

    // Simulation loop
    for (let i = 0; i < 600; i++) {
      month++;
      let allPaid = true;
      let monthlyExtraPayment = extraPayment;
      let totalMinPayment = 0;

      // Calculate total minimum payment needed
      workingDebts.forEach(debt => {
        if (debt.balance > 0) {
          allPaid = false;
          totalMinPayment += debt.minPayment;
        }
      });

      if (allPaid) break;

      // Apply payments in order (smallest balance first for snowball, highest rate for avalanche)
      for (let j = 0; j < workingDebts.length; j++) {
        const debt = workingDebts[j];
        if (debt.balance <= 0) continue;

        const monthlyRate = debt.interestRate / 100 / 12;
        const interest = debt.balance * monthlyRate;
        totalInterestPaid += interest;

        let payment = debt.minPayment + monthlyExtraPayment;
        if (payment > debt.balance + interest) {
          payment = debt.balance + interest;
          monthlyExtraPayment = Math.max(0, payment - debt.minPayment - interest);
        } else {
          monthlyExtraPayment = 0;
        }

        debt.balance -= (payment - interest);
        if (debt.balance < 0) debt.balance = 0;

        if (debt.balance === 0 && !debtsPaidOff.includes(debt.name)) {
          debtsPaidOff.push({ name: debt.name, month });
        }
      }

      if (i < 12 || i > 588) {
        timeline.push({
          month,
          debts: workingDebts.map(d => ({ ...d })),
          totalBalance: workingDebts.reduce((sum, d) => sum + d.balance, 0),
        });
      }
    }

    const totalYears = Math.floor(month / 12);
    const totalMonths = month % 12;

    return {
      month,
      totalYears,
      totalMonths,
      totalInterestPaid,
      timeline: timeline.slice(0, 12).concat(timeline.slice(-6)),
      debtsPaidOff,
    };
  };

  const snowballResult = useMemo(() => calculateStrategy('snowball'), [debts, extraPayment]);
  const avalancheResult = useMemo(() => calculateStrategy('avalanche'), [debts, extraPayment]);

  const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minPayment, 0);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-surface rounded-[12px] border border-border p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Debt Snowball Calculator</h2>

        <div className="mb-6">
          <Input
            label="Extra Monthly Payment (£)"
            type="number"
            value={extraPayment}
            onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
            min="0"
            step="50"
            helper="Additional amount to pay towards debt each month"
          />
        </div>

        <div className="bg-white border border-border rounded-[8px] p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-text-muted uppercase">Total Debt</p>
              <p className="text-lg font-bold text-text-primary font-mono">
                {formatCurrency(totalBalance)}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase">Total Min Payment</p>
              <p className="text-lg font-bold text-text-primary font-mono">
                {formatCurrency(totalMinPayment)}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase">Total Payment</p>
              <p className="text-lg font-bold text-accent font-mono">
                {formatCurrency(totalMinPayment + extraPayment)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Debts Table */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Your Debts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="text-left px-3 py-2 text-text-primary font-semibold">Debt Name</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Balance</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Min Payment</th>
                <th className="text-right px-3 py-2 text-text-primary font-semibold">Interest Rate</th>
                <th className="text-center px-3 py-2 text-text-primary font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt) => (
                <tr key={debt.id} className="border-b border-border hover:bg-surface">
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={debt.name}
                      onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                      placeholder="e.g. Credit Card"
                      className="w-full px-2 py-1 border border-border rounded-[6px] text-sm bg-white text-text-primary"
                    />
                  </td>
                  <td className="text-right px-3 py-2">
                    <input
                      type="number"
                      value={debt.balance}
                      onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                      min="0"
                      step="100"
                      className="w-full px-2 py-1 border border-border rounded-[6px] text-sm bg-white text-text-primary text-right"
                    />
                  </td>
                  <td className="text-right px-3 py-2">
                    <input
                      type="number"
                      value={debt.minPayment}
                      onChange={(e) => updateDebt(debt.id, 'minPayment', e.target.value)}
                      min="0"
                      step="10"
                      className="w-full px-2 py-1 border border-border rounded-[6px] text-sm bg-white text-text-primary text-right"
                    />
                  </td>
                  <td className="text-right px-3 py-2">
                    <input
                      type="number"
                      value={debt.interestRate}
                      onChange={(e) => updateDebt(debt.id, 'interestRate', e.target.value)}
                      min="0"
                      step="0.1"
                      className="w-full px-2 py-1 border border-border rounded-[6px] text-sm bg-white text-text-primary text-right"
                    />
                  </td>
                  <td className="text-center px-3 py-2">
                    <button
                      onClick={() => removeDebt(debt.id)}
                      className="text-error hover:text-error text-sm font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={addDebt}
        >
          + Add Another Debt
        </Button>
      </div>

      {/* Strategy Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Snowball */}
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Snowball Method</h3>
          <p className="text-xs text-text-muted mb-4">Pay smallest debt first for psychological wins</p>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-1">Time to Debt-Free</p>
              <p className="text-2xl font-bold text-accent font-mono">
                {snowballResult.totalYears}y {snowballResult.totalMonths}m
              </p>
              <p className="text-xs text-text-muted mt-1">{snowballResult.month} months</p>
            </div>

            <div>
              <p className="text-sm text-text-secondary mb-1">Total Interest Paid</p>
              <p className="text-xl font-bold text-text-primary font-mono">
                {formatCurrency(snowballResult.totalInterestPaid)}
              </p>
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <p className="text-sm font-semibold text-text-primary mb-3">Payoff Order</p>
              <div className="space-y-2">
                {snowballResult.debtsPaidOff.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-text-primary">{item.name}</span>
                    <span className="text-text-muted">Month {item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Avalanche */}
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Avalanche Method</h3>
          <p className="text-xs text-text-muted mb-4">Pay highest interest rate first to save money</p>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-1">Time to Debt-Free</p>
              <p className="text-2xl font-bold text-accent font-mono">
                {avalancheResult.totalYears}y {avalancheResult.totalMonths}m
              </p>
              <p className="text-xs text-text-muted mt-1">{avalancheResult.month} months</p>
            </div>

            <div>
              <p className="text-sm text-text-secondary mb-1">Total Interest Paid</p>
              <p className="text-xl font-bold text-text-primary font-mono">
                {formatCurrency(avalancheResult.totalInterestPaid)}
              </p>
              {avalancheResult.totalInterestPaid < snowballResult.totalInterestPaid && (
                <p className="text-xs text-success mt-1">
                  Save {formatCurrency(snowballResult.totalInterestPaid - avalancheResult.totalInterestPaid)}
                </p>
              )}
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <p className="text-sm font-semibold text-text-primary mb-3">Payoff Order</p>
              <div className="space-y-2">
                {avalancheResult.debtsPaidOff.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-text-primary">{item.name}</span>
                    <span className="text-text-muted">Month {item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Comparison */}
      {Math.abs(snowballResult.totalInterestPaid - avalancheResult.totalInterestPaid) > 1 && (
        <div className="bg-green-50 border border-green-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold text-green-900 mb-2">Interest Savings Insight</h3>
          <p className="text-green-700">
            The Avalanche method saves you <span className="font-bold">
              {formatCurrency(Math.abs(snowballResult.totalInterestPaid - avalancheResult.totalInterestPaid))}
            </span> in interest compared to the Snowball method.
          </p>
        </div>
      )}
    </div>
  );
}
