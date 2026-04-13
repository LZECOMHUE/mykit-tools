'use client';

import { useState, useMemo } from 'react';

export default function IsaCalculator() {
  const [currentBalance, setCurrentBalance] = useState(10000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(200);
  const [interestRate, setInterestRate] = useState(4.5);
  const [years, setYears] = useState(5);

  const results = useMemo(() => {
    const yearData = [];
    let balance = currentBalance;
    const monthlyRate = interestRate / 100 / 12;

    for (let year = 1; year <= years; year++) {
      let yearlyBalance = balance;
      for (let month = 0; month < 12; month++) {
        yearlyBalance = yearlyBalance * (1 + monthlyRate) + monthlyDeposit;
      }
      const interest = yearlyBalance - balance - (monthlyDeposit * 12);
      yearData.push({
        year,
        startBalance: balance,
        endBalance: yearlyBalance,
        contributions: monthlyDeposit * 12,
        interest,
      });
      balance = yearlyBalance;
    }

    return {
      yearData,
      finalBalance: balance,
      totalContributions: currentBalance + (monthlyDeposit * 12 * years),
      totalInterest: balance - currentBalance - (monthlyDeposit * 12 * years),
    };
  }, [currentBalance, monthlyDeposit, interestRate, years]);

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Current Balance
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Monthly Deposit
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-text-primary">£</span>
            <input
              type="number"
              value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Interest Rate (%)
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Time Period (Years)
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Final Balance</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.finalBalance.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Total Contributions</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-text-primary">
              £{results.totalContributions.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-sm text-text-secondary mb-1">Interest Earned</p>
            <p className="text-2xl md:text-3xl font-mono font-bold text-accent">
              £{results.totalInterest.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <p className="text-sm text-text-secondary bg-blue-50 border border-accent border-opacity-20 rounded-[var(--radius-input)] p-3">
          ISA Annual Allowance: £20,000 per tax year
        </p>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Year-by-Year Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-primary">Year</th>
                <th className="text-right py-2 px-2 font-medium text-text-primary">Opening</th>
                <th className="text-right py-2 px-2 font-medium text-text-primary">Interest</th>
                <th className="text-right py-2 px-2 font-medium text-text-primary">Closing</th>
              </tr>
            </thead>
            <tbody>
              {results.yearData.map((row) => (
                <tr key={row.year} className="border-b border-border hover:bg-surface">
                  <td className="py-2 px-2 text-text-primary">{row.year}</td>
                  <td className="text-right py-2 px-2 font-mono text-text-primary">
                    £{row.startBalance.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="text-right py-2 px-2 font-mono text-accent">
                    £{row.interest.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="text-right py-2 px-2 font-mono font-bold text-text-primary">
                    £{row.endBalance.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
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
