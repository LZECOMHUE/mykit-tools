'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function CompoundInterestCalculator() {
  const [initialDeposit, setInitialDeposit] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [annualRate, setAnnualRate] = useState('5');
  const [compoundingFrequency, setCompoundingFrequency] = useState('monthly');
  const [timePeriod, setTimePeriod] = useState('10');

  const results = useMemo(() => {
    const principal = parseFloat(initialDeposit) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualRate) || 0;
    const years = parseFloat(timePeriod) || 0;

    if (principal < 0 || monthly < 0 || rate < 0 || years <= 0) return null;

    // Compound frequency multiplier
    const frequencies = {
      daily: 365,
      monthly: 12,
      quarterly: 4,
      annually: 1,
    };

    const n = frequencies[compoundingFrequency] || 12;
    const r = rate / 100;

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const finalBalance =
      principal * Math.pow(1 + r / n, n * years) +
      monthly *
        (Math.pow(1 + r / n, n * years) - 1) /
        (r / n);

    const totalContributions = principal + monthly * 12 * years;
    const totalInterest = finalBalance - totalContributions;

    // Year-by-year breakdown
    const yearlyBreakdown = [];
    for (let y = 1; y <= years; y++) {
      const yearlyBalance =
        principal * Math.pow(1 + r / n, n * y) +
        monthly *
          (Math.pow(1 + r / n, n * y) - 1) /
          (r / n);
      yearlyBreakdown.push({
        year: y,
        balance: yearlyBalance,
        interest: yearlyBalance - (principal + monthly * 12 * y),
      });
    }

    return {
      finalBalance,
      totalContributions,
      totalInterest,
      yearlyBreakdown: yearlyBreakdown.slice(0, 11), // Max 11 rows to keep table manageable
    };
  }, [initialDeposit, monthlyContribution, annualRate, compoundingFrequency, timePeriod]);

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-4">
        <h2 className="font-heading text-lg font-semibold text-text-primary">
          Calculate Compound Interest
        </h2>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Initial Deposit
          </label>
          <Input
            type="number"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
            placeholder="10000"
            min="0"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Monthly Contribution
          </label>
          <Input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            placeholder="500"
            min="0"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Annual Interest Rate (%)
            </label>
            <Input
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              placeholder="5"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Compounding Frequency
            </label>
            <Select
              value={compoundingFrequency}
              onChange={setCompoundingFrequency}
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
                { value: 'annually', label: 'Annually' },
              ]}
            />
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Time Period (years)
          </label>
          <Input
            type="number"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            placeholder="10"
            min="0.1"
            step="0.1"
          />
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Final Balance */}
          <Card className="bg-accent-muted border-2 border-accent">
            <div>
              <p className="text-accent text-xs mb-1">Final Balance</p>
              <p className="font-mono text-3xl font-bold text-accent">
                £{results.finalBalance.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
              </p>
            </div>
          </Card>

          {/* Key Metrics */}
          <Card>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary text-sm">Total Contributions</span>
                <span className="font-mono font-bold text-text-primary">
                  £{results.totalContributions.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary text-sm">Total Interest Earned</span>
                <span className="font-mono font-bold text-accent">
                  £{results.totalInterest.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Interest as % of Total</span>
                <span className="font-mono font-bold text-text-primary">
                  {((results.totalInterest / results.finalBalance) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </Card>

          {/* Year-by-Year Table */}
          {results.yearlyBreakdown.length > 0 && (
            <div>
              <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">
                Year-by-Year Growth
              </h3>
              <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-text-secondary text-left py-2 px-2 font-medium">
                        Year
                      </th>
                      <th className="text-text-secondary text-right py-2 px-2 font-medium">
                        Balance
                      </th>
                      <th className="text-text-secondary text-right py-2 px-2 font-medium">
                        Interest Earned
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlyBreakdown.map((row) => (
                      <tr
                        key={row.year}
                        className="border-b border-border hover:bg-white transition-colors"
                      >
                        <td className="text-text-primary py-2 px-2 font-mono">
                          {row.year}
                        </td>
                        <td className="text-text-primary text-right py-2 px-2 font-mono">
                          £{row.balance.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                        </td>
                        <td className="text-accent text-right py-2 px-2 font-mono font-bold">
                          £{row.interest.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
