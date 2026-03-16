'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function FreelanceRateCalculator() {
  const [annualIncome, setAnnualIncome] = useState('40000');
  const [workingWeeks, setWorkingWeeks] = useState('48');
  const [hoursPerDay, setHoursPerDay] = useState('7');
  const [daysPerWeek, setDaysPerWeek] = useState('5');
  const [taxRate, setTaxRate] = useState('20');
  const [monthlyExpenses, setMonthlyExpenses] = useState('500');
  const [profitMargin, setProfitMargin] = useState('20');

  const results = useMemo(() => {
    const desired = parseFloat(annualIncome) || 0;
    const weeks = parseFloat(workingWeeks) || 1;
    const hours = parseFloat(hoursPerDay) || 1;
    const days = parseFloat(daysPerWeek) || 1;
    const tax = parseFloat(taxRate) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const margin = parseFloat(profitMargin) || 0;

    if (desired <= 0) return null;

    // Add expenses to desired income
    const annualExpenses = expenses * 12;
    const totalNeeded = desired + annualExpenses;

    // Account for profit margin (add buffer above expenses)
    const withMargin = totalNeeded * (1 + margin / 100);

    // Account for tax (need to earn more to net desired amount)
    const afterTax = withMargin / (1 - tax / 100);

    // Calculate billable hours
    const billableHours = weeks * days * hours;
    const hourlyRate = afterTax / billableHours;
    const dailyRate = hourlyRate * hours;

    // Calculate monthly income needed
    const monthlyNeeded = afterTax / 12;

    return {
      hourlyRate,
      dailyRate,
      monthlyNeeded,
      billableHours,
      annualGross: afterTax,
    };
  }, [annualIncome, workingWeeks, hoursPerDay, daysPerWeek, taxRate, monthlyExpenses, profitMargin]);

  const handleReset = () => {
    setAnnualIncome('40000');
    setWorkingWeeks('48');
    setHoursPerDay('7');
    setDaysPerWeek('5');
    setTaxRate('20');
    setMonthlyExpenses('500');
    setProfitMargin('20');
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-text-primary">
          Calculate Your Rate
        </h2>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Desired Annual Income (after tax)
          </label>
          <Input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            placeholder="40000"
            min="0"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Working Weeks Per Year
            </label>
            <Input
              type="number"
              value={workingWeeks}
              onChange={(e) => setWorkingWeeks(e.target.value)}
              placeholder="48"
              min="1"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Days Per Week
            </label>
            <Input
              type="number"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              placeholder="5"
              min="1"
              max="7"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Hours Per Day
            </label>
            <Input
              type="number"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              placeholder="7"
              min="1"
              step="0.5"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Tax Rate (%)
            </label>
            <Input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              placeholder="20"
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Monthly Expenses
            </label>
            <Input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              placeholder="500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Profit Margin (%)
            </label>
            <Input
              type="number"
              value={profitMargin}
              onChange={(e) => setProfitMargin(e.target.value)}
              placeholder="20"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Main Rates */}
          <Card className="bg-accent-muted border-2 border-accent">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-accent text-xs mb-1">Hourly Rate</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  £{results.hourlyRate.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-accent text-xs mb-1">Daily Rate</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  £{results.dailyRate.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>

          {/* Additional Info */}
          <Card>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary text-sm">Monthly Income Needed</span>
                <span className="font-mono font-bold text-text-primary">
                  £{results.monthlyNeeded.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-text-secondary text-sm">Annual Billable Hours</span>
                <span className="font-mono font-bold text-text-primary">
                  {Math.round(results.billableHours).toLocaleString()} hours
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Annual Gross Income Needed</span>
                <span className="font-mono font-bold text-text-primary">
                  £{results.annualGross.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </Card>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-secondary hover:bg-surface transition-colors text-sm font-medium"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
