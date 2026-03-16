'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Tabs from '@/components/ui/Tabs';
import Card from '@/components/ui/Card';

export default function SalaryToHourlyConverter() {
  const [activeTab, setActiveTab] = useState('salary');
  const [annualSalary, setAnnualSalary] = useState('40000');
  const [hoursPerWeek, setHoursPerWeek] = useState('37.5');
  const [weeksPerYear, setWeeksPerYear] = useState('52');
  const [hourlyRate, setHourlyRate] = useState('');

  const salaryResults = useMemo(() => {
    const salary = parseFloat(annualSalary) || 0;
    const hours = parseFloat(hoursPerWeek) || 1;
    const weeks = parseFloat(weeksPerYear) || 1;

    if (salary <= 0) return null;

    const hourly = salary / (hours * weeks);
    const daily = hourly * 8; // Standard 8-hour day
    const weekly = hourly * hours;
    const monthly = salary / 12;

    return {
      hourly,
      daily,
      weekly,
      monthly,
      annual: salary,
      totalHoursPerYear: hours * weeks,
    };
  }, [annualSalary, hoursPerWeek, weeksPerYear]);

  const hourlyResults = useMemo(() => {
    const hourly = parseFloat(hourlyRate) || 0;
    const hours = parseFloat(hoursPerWeek) || 1;
    const weeks = parseFloat(weeksPerYear) || 1;

    if (hourly <= 0) return null;

    const annual = hourly * hours * weeks;
    const daily = hourly * 8; // Standard 8-hour day
    const weekly = hourly * hours;
    const monthly = annual / 12;

    return {
      hourly,
      daily,
      weekly,
      monthly,
      annual,
      totalHoursPerYear: hours * weeks,
    };
  }, [hourlyRate, hoursPerWeek, weeksPerYear]);

  return (
    <div className="space-y-6">
      <Tabs
        tabs={[
          { id: 'salary', label: 'Salary to Hourly' },
          { id: 'hourly', label: 'Hourly to Salary' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Salary to Hourly Tab */}
      {activeTab === 'salary' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              Convert Annual Salary
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Annual Salary
              </label>
              <Input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(e.target.value)}
                placeholder="40000"
                min="0"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Hours Per Week
                </label>
                <Input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  placeholder="37.5"
                  min="1"
                  step="0.5"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Weeks Per Year
                </label>
                <Input
                  type="number"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(e.target.value)}
                  placeholder="52"
                  min="1"
                />
              </div>
            </div>
          </div>

          {salaryResults && (
            <div className="space-y-4">
              {/* Primary Result */}
              <Card className="bg-accent-muted border-2 border-accent">
                <div>
                  <p className="text-accent text-xs mb-1">Hourly Rate</p>
                  <p className="font-mono text-3xl font-bold text-accent">
                    £{salaryResults.hourly.toFixed(2)}
                  </p>
                  <p className="text-text-muted text-xs mt-2">
                    per hour, based on {salaryResults.totalHoursPerYear.toLocaleString()} hours/year
                  </p>
                </div>
              </Card>

              {/* All Equivalents */}
              <Card>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Per Hour</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{salaryResults.hourly.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Per 8-Hour Day</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{salaryResults.daily.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Per Week</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{salaryResults.weekly.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Per Month</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{salaryResults.monthly.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Per Year</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{salaryResults.annual.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Hourly to Salary Tab */}
      {activeTab === 'hourly' && (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              Convert Hourly Rate
            </h2>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Hourly Rate
              </label>
              <Input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="20"
                min="0"
                step="0.01"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Hours Per Week
                </label>
                <Input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  placeholder="37.5"
                  min="1"
                  step="0.5"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  Weeks Per Year
                </label>
                <Input
                  type="number"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(e.target.value)}
                  placeholder="52"
                  min="1"
                />
              </div>
            </div>
          </div>

          {hourlyResults && (
            <div className="space-y-4">
              {/* Primary Result */}
              <Card className="bg-accent-muted border-2 border-accent">
                <div>
                  <p className="text-accent text-xs mb-1">Annual Salary</p>
                  <p className="font-mono text-3xl font-bold text-accent">
                    £{hourlyResults.annual.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-text-muted text-xs mt-2">
                    per year, based on {hourlyResults.totalHoursPerYear.toLocaleString()} hours/year
                  </p>
                </div>
              </Card>

              {/* All Equivalents */}
              <Card>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Per Hour</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{hourlyResults.hourly.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Per 8-Hour Day</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{hourlyResults.daily.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Per Week</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{hourlyResults.weekly.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-text-secondary text-sm">Per Month</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{hourlyResults.monthly.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">Per Year</span>
                    <span className="font-mono font-bold text-text-primary">
                      £{hourlyResults.annual.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
