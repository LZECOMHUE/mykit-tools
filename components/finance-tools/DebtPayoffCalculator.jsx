'use client';

import { useState, useMemo } from 'react';
import { downloadAsJPG, drawSectionHeading, drawKeyValue, drawTable } from '@/lib/download-utils';

export default function DebtPayoffCalculator() {
  const [debts, setDebts] = useState([
    { id: 1, name: 'Credit Card', balance: 3000, rate: 18.9 },
    { id: 2, name: 'Personal Loan', balance: 5000, rate: 6.5 },
  ]);
  const [monthlyPayment, setMonthlyPayment] = useState(400);
  const [strategy, setStrategy] = useState('avalanche');

  const results = useMemo(() => {
    const sorted = [...debts].sort((a, b) =>
      strategy === 'avalanche' ? b.rate - a.rate : a.balance - b.balance
    );

    let remaining = sorted.map((d) => ({ ...d }));
    let totalMonths = 0;
    let totalInterest = 0;
    const timeline = [];

    while (remaining.some((d) => d.balance > 0)) {
      totalMonths++;
      let payment = monthlyPayment;

      for (let i = 0; i < remaining.length && payment > 0; i++) {
        if (remaining[i].balance <= 0) continue;
        const interest = (remaining[i].balance * remaining[i].rate) / 100 / 12;
        const principal = Math.min(remaining[i].balance, payment - interest);
        remaining[i].balance -= principal;
        remaining[i].balance = Math.max(0, remaining[i].balance);
        totalInterest += interest;
        payment -= principal + interest;
      }

      if (totalMonths % 12 === 0) {
        timeline.push({
          month: totalMonths,
          totalRemaining: remaining.reduce((sum, d) => sum + d.balance, 0),
        });
      }

      if (totalMonths > 600) break;
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    return {
      totalMonths,
      payoffTime: `${years}y ${months}m`,
      totalInterest,
      totalPaid: debts.reduce((sum, d) => sum + d.balance, 0) + totalInterest,
      timeline,
    };
  }, [debts, monthlyPayment, strategy]);

  const addDebt = () => {
    setDebts([
      ...debts,
      {
        id: Math.max(...debts.map((d) => d.id), 0) + 1,
        name: `Debt ${debts.length + 1}`,
        balance: 1000,
        rate: 10,
      },
    ]);
  };

  const removeDebt = (id) => {
    setDebts(debts.filter((d) => d.id !== id));
  };

  const updateDebt = (id, field, value) => {
    setDebts(
      debts.map((d) =>
        d.id === id ? { ...d, [field]: Number(value) } : d
      )
    );
  };

  const handleDownloadJPG = () => {
    downloadAsJPG({
      filename: 'debt-payoff-plan.jpg',
      width: 800,
      height: 1200,
      title: 'Debt Payoff Plan',
      subtitle: `Strategy: ${strategy === 'avalanche' ? 'Avalanche' : 'Snowball'}`,
      accentColor: '#2563eb',
      render: (ctx, area) => {
        let y = area.y;

        y = drawSectionHeading(ctx, 'Your Debts', area.x, y, area.width);
        y += 8;

        const debtRows = debts.map((d) => [
          d.name,
          `£${d.balance.toFixed(2)}`,
          `${d.rate}%`,
        ]);

        y = drawTable(ctx, {
          x: area.x,
          y,
          width: area.width,
          headers: ['Debt', 'Balance', 'Rate'],
          rows: debtRows,
          colWidths: [2, 1, 1],
          accentColor: '#2563eb',
        });

        y += 16;
        y = drawSectionHeading(ctx, 'Payoff Summary', area.x, y, area.width);
        y += 8;

        y = drawKeyValue(
          ctx,
          'Monthly Payment',
          `£${monthlyPayment.toFixed(2)}`,
          area.x,
          y,
          area.width * 0.6,
          { bold: true }
        );

        y = drawKeyValue(
          ctx,
          'Payoff Time',
          results.payoffTime,
          area.x,
          y,
          area.width * 0.6,
          { bold: true }
        );

        y = drawKeyValue(
          ctx,
          'Total Interest',
          `£${results.totalInterest.toFixed(2)}`,
          area.x,
          y,
          area.width * 0.6,
          { bold: true }
        );

        y = drawKeyValue(
          ctx,
          'Total Paid',
          `£${results.totalPaid.toFixed(2)}`,
          area.x,
          y,
          area.width * 0.6,
          { bold: true }
        );
      },
    });
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Monthly Payment
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Payoff Strategy
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setStrategy('avalanche')}
              className={`flex-1 px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition ${
                strategy === 'avalanche'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Avalanche (Highest Rate)
            </button>
            <button
              onClick={() => setStrategy('snowball')}
              className={`flex-1 px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition ${
                strategy === 'snowball'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Snowball (Smallest Balance)
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Your Debts
        </h3>
        <div className="space-y-3">
          {debts.map((debt) => (
            <div key={debt.id} className="border border-border rounded-[var(--radius-input)] p-3 grid grid-cols-4 gap-2">
              <input
                type="text"
                value={debt.name}
                onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                className="col-span-1 px-2 py-1 border border-border rounded-[var(--radius-input)] text-sm"
                placeholder="Name"
              />
              <div className="relative">
                <span className="absolute left-2 text-text-primary text-sm">£</span>
                <input
                  type="number"
                  value={debt.balance}
                  onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                  className="w-full pl-6 pr-2 py-1 border border-border rounded-[var(--radius-input)] text-sm font-mono"
                  placeholder="Balance"
                />
              </div>
              <input
                type="number"
                value={debt.rate}
                onChange={(e) => updateDebt(debt.id, 'rate', e.target.value)}
                className="px-2 py-1 border border-border rounded-[var(--radius-input)] text-sm font-mono"
                placeholder="Rate %"
                step="0.1"
              />
              <button
                onClick={() => removeDebt(debt.id)}
                className="px-2 py-1 text-error bg-red-100 rounded-[var(--radius-input)] text-sm font-medium hover:opacity-80"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addDebt}
          className="mt-3 w-full px-3 py-2 border border-accent text-accent rounded-[var(--radius-input)] font-medium text-sm hover:bg-blue-50"
        >
          Add Debt
        </button>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Payoff Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Time to Pay Off</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              {results.payoffTime}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Total Interest</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.totalInterest.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Total Paid</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.totalPaid.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadJPG}
          className="w-full px-4 py-2 mt-4 bg-white border border-border text-text-primary rounded-[var(--radius-input)] font-medium hover:bg-surface transition-colors"
        >
          Download JPG
        </button>
      </div>
    </div>
  );
}
