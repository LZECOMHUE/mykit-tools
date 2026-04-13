'use client';

import { useState, useMemo } from 'react';

export default function USOvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState('25.00');
  const [hoursWorked, setHoursWorked] = useState('52');
  const [overtimeThreshold, setOvertimeThreshold] = useState('40');
  const [overtimeMultiplier, setOvertimeMultiplier] = useState('1.5');

  const fmt = (n) => '$' + parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculations = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const hours = parseFloat(hoursWorked) || 0;
    const threshold = parseFloat(overtimeThreshold) || 40;
    const multiplier = parseFloat(overtimeMultiplier) || 1.5;

    let regularHours = Math.min(hours, threshold);
    let overtimeHours = Math.max(0, hours - threshold);

    const regularPay = regularHours * rate;
    const overtimePay = overtimeHours * rate * multiplier;
    const totalPay = regularPay + overtimePay;

    return {
      regularHours: regularHours.toFixed(2),
      overtimeHours: overtimeHours.toFixed(2),
      regularPay: regularPay.toFixed(2),
      overtimePay: overtimePay.toFixed(2),
      totalPay: totalPay.toFixed(2),
      hourlyRate: rate.toFixed(2),
      totalHours: hours.toFixed(2),
    };
  }, [hourlyRate, hoursWorked, overtimeThreshold, overtimeMultiplier]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Inputs */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Overtime Calculator</h2>

        {/* Hourly Rate */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Hourly Rate ($)</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 bg-white border border-r-0 border-border rounded-l-lg text-text-secondary font-medium">
              $
            </span>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              step="0.01"
              className="flex-1 px-4 py-3 bg-white border border-border border-l-0 rounded-r-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              placeholder="25.00"
            />
          </div>
        </div>

        {/* Hours Worked */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Hours Worked This Week</label>
          <input
            type="number"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
            step="0.5"
            min="0"
            className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            placeholder="52"
          />
        </div>

        {/* Overtime Threshold */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Overtime Threshold (hours)</label>
          <input
            type="number"
            value={overtimeThreshold}
            onChange={(e) => setOvertimeThreshold(e.target.value)}
            step="1"
            min="1"
            className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            placeholder="40"
          />
          <p className="text-xs text-text-muted mt-1">Most commonly 40 hours per week in the US</p>
        </div>

        {/* Overtime Multiplier */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-1">Overtime Multiplier</label>
          <div className="flex gap-2 mb-3">
            {['1.5', '2', '2.5'].map((mult) => (
              <button
                key={mult}
                onClick={() => setOvertimeMultiplier(mult)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  overtimeMultiplier === mult
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:border-accent'
                }`}
              >
                {mult}x
              </button>
            ))}
          </div>
          <input
            type="number"
            value={overtimeMultiplier}
            onChange={(e) => setOvertimeMultiplier(e.target.value)}
            step="0.1"
            min="1"
            className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            placeholder="1.5"
          />
          <p className="text-xs text-text-muted mt-1">1.5x is standard (time and a half). Some employers pay 2x (double time)</p>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-600 text-sm font-medium mb-1">Weekly Gross Pay</p>
        <p className="font-mono text-4xl font-bold text-blue-700">{fmt(calculations.totalPay)}</p>
        <p className="text-blue-600 text-xs mt-2">
          You worked {calculations.totalHours} hours at ${calculations.hourlyRate}/hr
        </p>
      </div>

      {/* Breakdown */}
      <div className="bg-surface border border-border rounded-lg space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Pay Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Regular Hours ({calculations.hourlyRate}/hr)</span>
            <div className="text-right">
              <span className="block font-mono font-semibold text-text-primary">{calculations.regularHours} hrs</span>
              <span className="font-mono text-sm text-text-secondary">{fmt(calculations.regularPay)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">Overtime Hours ({overtimeMultiplier}x rate)</span>
            <div className="text-right">
              <span className="block font-mono font-semibold text-text-primary">{calculations.overtimeHours} hrs</span>
              <span className="font-mono text-sm text-accent">{fmt(calculations.overtimePay)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-t-2 border-border font-semibold">
            <span className="text-text-primary">Total Gross Pay</span>
            <span className="font-mono text-lg text-green-600">{fmt(calculations.totalPay)}</span>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg space-y-3">
        <h3 className="text-text-primary font-semibold">How Overtime Works</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>• <strong>Standard:</strong> Hours up to the threshold are paid at regular rate</li>
          <li>• <strong>Overtime:</strong> Hours beyond the threshold are paid at multiplied rate</li>
          <li>• <strong>US Federal Law:</strong> Overtime (1.5x) required for hours over 40/week for non-exempt employees</li>
          <li>• <strong>Check Local Laws:</strong> Some states require daily overtime (e.g., CA: 8+ hours/day)</li>
          <li>• <strong>Note:</strong> This calculator shows gross pay. Taxes and deductions will reduce take-home pay</li>
        </ul>
      </div>
    </div>
  );
}
