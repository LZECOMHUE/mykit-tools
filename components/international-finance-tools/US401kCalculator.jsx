'use client';

import { useState, useMemo } from 'react';

export default function US401kCalculator() {
  const [currentAge, setCurrentAge] = useState('35');
  const [retirementAge, setRetirementAge] = useState('67');
  const [currentSalary, setCurrentSalary] = useState('75000');
  const [annualRaisePercent, setAnnualRaisePercent] = useState('2.5');
  const [contributionPercent, setContributionPercent] = useState('6');
  const [employerMatchPercent, setEmployerMatchPercent] = useState('3');
  const [employerMatchCap, setEmployerMatchCap] = useState('6');
  const [currentBalance, setCurrentBalance] = useState('25000');
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState('7');

  const fmt = (n) => '$' + parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (n) => parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const MAX_CONTRIBUTION_2025 = 23500;

  const calculations = useMemo(() => {
    const current_age = parseInt(currentAge) || 35;
    const retirement_age = parseInt(retirementAge) || 67;
    const current_salary = parseFloat(currentSalary) || 0;
    const annual_raise = parseFloat(annualRaisePercent) || 0;
    const contribution_pct = parseFloat(contributionPercent) || 0;
    const employer_match_pct = parseFloat(employerMatchPercent) || 0;
    const employer_match_cap_pct = parseFloat(employerMatchCap) || 0;
    const current_balance_amt = parseFloat(currentBalance) || 0;
    const annual_return = parseFloat(expectedAnnualReturn) || 0;

    const years_to_retirement = retirement_age - current_age;
    if (years_to_retirement <= 0) return null;

    let balance = current_balance_amt;
    let total_employee_contributions = 0;
    let total_employer_contributions = 0;
    let total_investment_growth = 0;

    const yearly_data = [];

    for (let year = 0; year < years_to_retirement; year++) {
      const age = current_age + year;

      // Salary in this year (with raises)
      const salary = current_salary * Math.pow(1 + annual_raise / 100, year);

      // Employee contribution (capped at limit)
      const employee_contribution = Math.min(salary * (contribution_pct / 100), MAX_CONTRIBUTION_2025);

      // Employer match (typically limited to a percentage of salary, up to a cap)
      const eligible_salary_for_match = salary * (employer_match_cap_pct / 100);
      const employer_contribution = Math.min(eligible_salary_for_match * (employer_match_pct / 100), MAX_CONTRIBUTION_2025 - employee_contribution);

      // Investment growth on current balance
      const investment_growth = balance * (annual_return / 100);

      // New balance
      balance = balance + employee_contribution + employer_contribution + investment_growth;

      total_employee_contributions += employee_contribution;
      total_employer_contributions += employer_contribution;
      total_investment_growth += investment_growth;

      yearly_data.push({
        age,
        salary: salary.toFixed(2),
        employee_contribution: employee_contribution.toFixed(2),
        employer_contribution: employer_contribution.toFixed(2),
        investment_growth: investment_growth.toFixed(2),
        balance: balance.toFixed(2),
      });
    }

    return {
      years_to_retirement,
      final_balance: balance.toFixed(2),
      total_employee_contributions: total_employee_contributions.toFixed(2),
      total_employer_contributions: total_employer_contributions.toFixed(2),
      total_investment_growth: total_investment_growth.toFixed(2),
      total_contributed: (total_employee_contributions + total_employer_contributions).toFixed(2),
      yearly_data,
      employer_match_value: total_employer_contributions.toFixed(2),
      first_year_employee_contribution: Math.min(current_salary * (contribution_pct / 100), MAX_CONTRIBUTION_2025).toFixed(2),
      first_year_employer_contribution: Math.min(current_salary * (employer_match_cap_pct / 100) * (employer_match_pct / 100), MAX_CONTRIBUTION_2025).toFixed(2),
    };
  }, [currentAge, retirementAge, currentSalary, annualRaisePercent, contributionPercent, employerMatchPercent, employerMatchCap, currentBalance, expectedAnnualReturn]);

  if (!calculations) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <p className="text-text-secondary">Enter your details to calculate retirement savings</p>
      </div>
    );
  }

  const balanceChartData = calculations.yearly_data.filter((_, i) => i % Math.ceil(calculations.yearly_data.length / 10) === 0 || i === calculations.yearly_data.length - 1);

  const maxBalance = parseFloat(calculations.final_balance);
  const chartHeight = 200;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
        <p className="font-semibold text-blue-900 mb-1">Disclaimer</p>
        <p>This is a projection based on assumptions. Actual returns vary yearly. Consult a financial advisor before making investment decisions.</p>
      </div>

      {/* Inputs */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h2 className="text-xl font-bold text-text-primary">401(k) Retirement Calculator</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              min="18"
              max="80"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Retirement Age</label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              min="50"
              max="85"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Current Salary ($)</label>
            <input
              type="number"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Annual Raise (%)</label>
            <input
              type="number"
              value={annualRaisePercent}
              onChange={(e) => setAnnualRaisePercent(e.target.value)}
              step="0.5"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">401(k) Contribution (%)</label>
            <input
              type="number"
              value={contributionPercent}
              onChange={(e) => setContributionPercent(e.target.value)}
              step="0.5"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
            <p className="text-text-muted text-xs mt-1">2025 limit: ${MAX_CONTRIBUTION_2025.toLocaleString()}</p>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Employer Match (%)</label>
            <input
              type="number"
              value={employerMatchPercent}
              onChange={(e) => setEmployerMatchPercent(e.target.value)}
              step="0.5"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
            <p className="text-text-muted text-xs mt-1">Match % of capped salary</p>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Match Cap (% of salary)</label>
            <input
              type="number"
              value={employerMatchCap}
              onChange={(e) => setEmployerMatchCap(e.target.value)}
              step="0.5"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
            <p className="text-text-muted text-xs mt-1">e.g., 6% means match up to 6% of salary</p>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Current 401(k) Balance ($)</label>
            <input
              type="number"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-text-secondary text-sm font-medium mb-1">Expected Annual Return (%)</label>
            <input
              type="number"
              value={expectedAnnualReturn}
              onChange={(e) => setExpectedAnnualReturn(e.target.value)}
              step="0.5"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
            <p className="text-text-muted text-xs mt-1">Historical average for diversified portfolio: 7-10%</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Projected Balance at {retirementAge}</p>
          <p className="font-mono text-2xl font-bold text-green-600">{fmt(calculations.final_balance)}</p>
          <p className="text-text-muted text-xs mt-2">{calculations.years_to_retirement} years from now</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Total Contributed</p>
          <p className="font-mono text-2xl font-bold text-blue-600">{fmt(calculations.total_contributed)}</p>
          <p className="text-text-muted text-xs mt-2">You + Employer</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-text-muted text-sm mb-1">Investment Growth</p>
          <p className="font-mono text-2xl font-bold text-purple-600">{fmt(calculations.total_investment_growth)}</p>
          <p className="text-text-muted text-xs mt-2">Returns on investments</p>
        </div>
      </div>

      {/* Employer Match Highlight */}
      <div className="bg-accent-muted border border-accent rounded-lg">
        <h3 className="text-text-primary font-bold mb-2">Free Money from Your Employer</h3>
        <p className="text-text-secondary mb-3">
          Your employer match will add <span className="font-mono font-bold text-accent">{fmt(calculations.employer_match_value)}</span> to your retirement savings.
        </p>
        <p className="text-text-secondary text-sm">
          In year 1: <span className="font-mono font-semibold">{fmt(calculations.first_year_employer_contribution)}</span>. Make sure you're contributing enough to get the full match!
        </p>
      </div>

      {/* Breakdown */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Savings Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Current Balance</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(currentBalance)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Your Contributions (Future)</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.total_employee_contributions)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Employer Match</span>
            <span className="font-mono font-semibold text-accent">{fmt(calculations.total_employer_contributions)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Investment Growth</span>
            <span className="font-mono font-semibold text-text-primary">{fmt(calculations.total_investment_growth)}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-t-2 border-border font-semibold">
            <span className="text-text-primary">PROJECTED BALANCE</span>
            <span className="font-mono text-lg text-green-600">{fmt(calculations.final_balance)}</span>
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Balance Growth Over Time</h3>
        <div className="h-80 flex items-end justify-center gap-1" style={{ minHeight: `${chartHeight}px` }}>
          {balanceChartData.map((year, idx) => {
            const balance = parseFloat(year.balance);
            const height = (balance / maxBalance) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end">
                <div
                  className="w-full bg-accent rounded-t-lg transition-all hover:bg-accent-hover"
                  style={{ height: `${Math.max(2, height)}%` }}
                  title={`Age ${year.age}: ${fmt(year.balance)}`}
                />
                <p className="text-text-muted text-xs mt-2">{year.age}</p>
              </div>
            );
          })}
        </div>
        <p className="text-text-muted text-xs text-center">Years and projected balance</p>
      </div>

      {/* Year-by-year detail (first 5 years and last 5 years) */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Detailed Year-by-Year (Selected Years)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-text-secondary font-medium">Age</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Salary</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Your Contribution</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Employer Match</th>
                <th className="text-right py-2 px-2 text-text-secondary font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {calculations.yearly_data.map((year, idx) => {
                const isRelevant = idx < 5 || idx >= calculations.yearly_data.length - 5;
                if (!isRelevant && calculations.yearly_data.length > 15) return null;

                return (
                  <tr key={idx} className="border-b border-border hover:bg-white">
                    <td className="py-2 px-2 text-text-secondary">{year.age}</td>
                    <td className="py-2 px-2 text-right font-mono text-text-primary">{fmt(year.salary)}</td>
                    <td className="py-2 px-2 text-right font-mono text-text-primary">{fmt(year.employee_contribution)}</td>
                    <td className="py-2 px-2 text-right font-mono text-accent">{fmt(year.employer_contribution)}</td>
                    <td className="py-2 px-2 text-right font-mono font-semibold text-text-primary">{fmt(year.balance)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg space-y-3">
        <h3 className="text-text-primary font-semibold">Important Notes</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>✓ This projection assumes a constant investment return rate - actual returns vary yearly</li>
          <li>✓ 2025 contribution limit is ${MAX_CONTRIBUTION_2025.toLocaleString()} per year</li>
          <li>✓ Catch-up contributions allowed at age 50 (additional $7,500)</li>
          <li>✓ Always contribute at least enough to get your full employer match</li>
          <li>✓ Early withdrawals before age 59.5 may incur penalties and taxes</li>
          <li>✓ This is for estimation purposes - consult a financial advisor for personalized advice</li>
        </ul>
      </div>
    </div>
  );
}
