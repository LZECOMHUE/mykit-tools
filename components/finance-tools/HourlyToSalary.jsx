'use client';

import { useState, useMemo } from 'react';

function formatGBP(amount) {
  return '£' + amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function HourlyToSalary() {
  const [mode, setMode] = useState('hourly'); // 'hourly' or 'salary'
  const [hourlyRate, setHourlyRate] = useState(20);
  const [annualSalary, setAnnualSalary] = useState(40000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);

  // Calculate all breakdowns based on mode
  const calculations = useMemo(() => {
    let baseHourly = hourlyRate;

    // If in salary mode, convert salary to hourly first
    if (mode === 'salary') {
      baseHourly = annualSalary / (hoursPerWeek * weeksPerYear);
    }

    const hourly = baseHourly;
    const daily = baseHourly * 8; // Standard 8-hour day
    const weekly = baseHourly * hoursPerWeek;
    const biWeekly = weekly * 2;
    const monthly = (baseHourly * hoursPerWeek * weeksPerYear) / 12;
    const annual = baseHourly * hoursPerWeek * weeksPerYear;

    return {
      hourly,
      daily,
      weekly,
      biWeekly,
      monthly,
      annual,
    };
  }, [mode, hourlyRate, annualSalary, hoursPerWeek, weeksPerYear]);

  // Handle input changes with mode awareness
  const handleHourlyChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setHourlyRate(value);
    if (mode === 'hourly') {
      // Update salary based on hourly rate
      setAnnualSalary(value * hoursPerWeek * weeksPerYear);
    }
  };

  const handleSalaryChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setAnnualSalary(value);
    if (mode === 'salary') {
      // Update hourly based on salary
      setHourlyRate(value / (hoursPerWeek * weeksPerYear));
    }
  };

  const handleHoursChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setHoursPerWeek(value);
    if (mode === 'salary') {
      // Recalculate hourly from salary with new hours
      setHourlyRate(annualSalary / (value * weeksPerYear));
    } else {
      // Update salary with new hours
      setAnnualSalary(hourlyRate * value * weeksPerYear);
    }
  };

  const handleWeeksChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setWeeksPerYear(value);
    if (mode === 'salary') {
      // Recalculate hourly from salary with new weeks
      setHourlyRate(annualSalary / (hoursPerWeek * value));
    } else {
      // Update salary with new weeks
      setAnnualSalary(hourlyRate * hoursPerWeek * value);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'hourly' ? 'salary' : 'hourly');
  };

  const quickRates = [10, 12, 15, 20, 25, 30, 40, 50];

  const handleQuickRate = (rate) => {
    setHourlyRate(rate);
    setMode('hourly');
    setAnnualSalary(rate * hoursPerWeek * weeksPerYear);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={toggleMode}
          className={`px-6 py-2 rounded-[var(--radius-input)] font-medium transition-all ${
            mode === 'hourly'
              ? 'bg-accent text-white'
              : 'bg-surface border border-border text-text-secondary hover:bg-surface-hover'
          }`}
        >
          Hourly → Salary
        </button>
        <button
          onClick={toggleMode}
          className={`px-6 py-2 rounded-[var(--radius-input)] font-medium transition-all ${
            mode === 'salary'
              ? 'bg-accent text-white'
              : 'bg-surface border border-border text-text-secondary hover:bg-surface-hover'
          }`}
        >
          Salary → Hourly
        </button>
      </div>

      {/* Input Card */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <h2 className="text-text-primary font-medium">Your Rates</h2>

        <div className="space-y-4">
          {/* Primary Input (toggles based on mode) */}
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              {mode === 'hourly' ? 'Hourly Rate' : 'Annual Salary'}
            </label>
            <div className="flex items-center">
              <span className="text-text-muted mr-2">£</span>
              <input
                type="number"
                value={mode === 'hourly' ? hourlyRate : annualSalary}
                onChange={mode === 'hourly' ? handleHourlyChange : handleSalaryChange}
                placeholder={mode === 'hourly' ? '20.00' : '40000'}
                className="flex-1 px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-muted"
              />
            </div>
            {mode === 'hourly' && (
              <p className="text-xs text-text-muted mt-1">
                Current UK National Minimum Wage (21+): £12.21/hr (April 2025)
              </p>
            )}
          </div>

          {/* Hours Per Week */}
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Hours Per Week
            </label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={handleHoursChange}
              min="1"
              max="100"
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-muted"
            />
          </div>

          {/* Weeks Per Year */}
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Weeks Per Year
            </label>
            <input
              type="number"
              value={weeksPerYear}
              onChange={handleWeeksChange}
              min="1"
              max="52"
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-muted"
            />
          </div>
        </div>
      </div>

      {/* Results Card */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="text-text-primary font-medium mb-4">Your Breakdown</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Hourly */}
          <div className="bg-white border border-border rounded-[var(--radius-input)] p-4">
            <p className="text-text-secondary text-xs font-medium mb-1">Per Hour</p>
            <p className="font-mono-num text-xl font-semibold text-text-primary">
              {formatGBP(calculations.hourly)}
            </p>
          </div>

          {/* Daily */}
          <div className="bg-white border border-border rounded-[var(--radius-input)] p-4">
            <p className="text-text-secondary text-xs font-medium mb-1">Per Day (8h)</p>
            <p className="font-mono-num text-xl font-semibold text-text-primary">
              {formatGBP(calculations.daily)}
            </p>
          </div>

          {/* Weekly */}
          <div className="bg-white border border-border rounded-[var(--radius-input)] p-4">
            <p className="text-text-secondary text-xs font-medium mb-1">Per Week</p>
            <p className="font-mono-num text-xl font-semibold text-text-primary">
              {formatGBP(calculations.weekly)}
            </p>
          </div>

          {/* Bi-weekly */}
          <div className="bg-white border border-border rounded-[var(--radius-input)] p-4">
            <p className="text-text-secondary text-xs font-medium mb-1">Per Fortnight</p>
            <p className="font-mono-num text-xl font-semibold text-text-primary">
              {formatGBP(calculations.biWeekly)}
            </p>
          </div>

          {/* Monthly */}
          <div className="bg-white border border-border rounded-[var(--radius-input)] p-4">
            <p className="text-text-secondary text-xs font-medium mb-1">Per Month</p>
            <p className="font-mono-num text-xl font-semibold text-text-primary">
              {formatGBP(calculations.monthly)}
            </p>
          </div>

          {/* Annual */}
          <div className="bg-white border border-border rounded-[var(--radius-input)] p-4 ring-2 ring-accent ring-opacity-20">
            <p className="text-text-secondary text-xs font-medium mb-1">Annual Salary</p>
            <p className="font-mono-num text-xl font-semibold text-accent">
              {formatGBP(calculations.annual)}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Reference Table */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="text-text-primary font-medium mb-4">Quick Reference</h2>

        <div className="mb-4 text-xs text-text-secondary">
          Hourly rates at {hoursPerWeek} hours/week, {weeksPerYear} weeks/year:
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {quickRates.map((rate) => (
            <button
              key={rate}
              onClick={() => handleQuickRate(rate)}
              className={`p-3 rounded-[var(--radius-input)] border transition-all text-center ${
                Math.abs(calculations.hourly - rate) < 0.01
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white border-border text-text-primary hover:bg-accent-muted'
              }`}
            >
              <p className="text-xs font-medium mb-1">£{rate}/hr</p>
              <p className="font-mono-num text-sm font-semibold">
                {formatGBP(rate * hoursPerWeek * weeksPerYear)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
        <p className="text-xs text-blue-900">
          <strong>Note:</strong> This calculator assumes {hoursPerWeek} hours per week and {weeksPerYear} weeks per year.
          Adjust these values to account for holidays, sick leave, or flexible hours. Annual salary shown is gross (before tax and National Insurance).
        </p>
      </div>
    </div>
  );
}
