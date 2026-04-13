'use client';

import { useState, useMemo } from 'react';

const lslByState = {
  NSW: { threshold: 10, accrual: 1.3, name: 'New South Wales' },
  VIC: { threshold: 7, accrual: 1.3, name: 'Victoria' },
  QLD: { threshold: 10, accrual: 1.3, name: 'Queensland' },
  SA: { threshold: 10, accrual: 1.3, name: 'South Australia' },
  WA: { threshold: 10, accrual: 1.3, name: 'Western Australia' },
  TAS: { threshold: 10, accrual: 1.3, name: 'Tasmania' },
  ACT: { threshold: 7, accrual: 1.3, name: 'Australian Capital Territory' },
  NT: { threshold: 10, accrual: 1.3, name: 'Northern Territory' },
};

export default function AustraliaLongServiceLeaveCalculator() {
  const [state, setState] = useState('NSW');
  const [yearsService, setYearsService] = useState('12');
  const [weeklyPay, setWeeklyPay] = useState('1200');

  const calculations = useMemo(() => {
    const rule = lslByState[state];
    const years = parseFloat(yearsService) || 12;
    const weekly = parseFloat(weeklyPay) || 1200;

    const isEligible = years >= rule.threshold;
    let leaveWeeks = 0;

    if (isEligible) {
      leaveWeeks = (years / 10) * rule.accrual * 52;
    }

    const totalPay = leaveWeeks * weekly;

    return {
      state: rule.name,
      threshold: rule.threshold,
      yearsService: years,
      isEligible,
      leaveWeeks: Math.floor(leaveWeeks),
      leaveDays: Math.floor(leaveWeeks * 5),
      leaveMonths: (leaveWeeks / 4.33).toFixed(1),
      totalPay: totalPay.toFixed(2),
      weeklyPay: weekly,
      daysUntilEligible: Math.max(0, rule.threshold - years),
    };
  }, [state, yearsService, weeklyPay]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-surface rounded-lg space-y-4">
      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            State / Territory
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:border-accent"
          >
            {Object.entries(lslByState).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Years of Service
          </label>
          <input
            type="number"
            value={yearsService}
            onChange={(e) => setYearsService(e.target.value)}
            step="0.5"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
          />
          <div className="text-xs text-text-muted mt-1">
            Eligible after {calculations.threshold} years
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Weekly Pay
          </label>
          <div className="flex gap-2">
            <span className="px-3 py-2 bg-white border border-border rounded-lg text-text-muted">
              $
            </span>
            <input
              type="number"
              value={weeklyPay}
              onChange={(e) => setWeeklyPay(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Eligibility Status */}
      {calculations.isEligible ? (
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg">
          <div className="text-2xl font-bold text-green-900 mb-2">
            ✓ You Are Eligible
          </div>
          <div className="text-lg text-green-800">
            Long service leave entitlement: {calculations.leaveWeeks} weeks ({calculations.leaveDays} days)
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg">
          <div className="text-2xl font-bold text-orange-900 mb-2">
            ⏳ Not Yet Eligible
          </div>
          <div className="text-lg text-orange-800">
            {calculations.daysUntilEligible.toFixed(1)} more years until eligible ({calculations.threshold} year threshold in {calculations.state})
          </div>
        </div>
      )}

      {/* Leave Entitlement */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-700 mb-2">Leave Weeks</div>
          <div className="text-4xl font-mono font-bold text-blue-900">
            {calculations.leaveWeeks}
          </div>
          <div className="text-sm text-blue-700 mt-2">
            {calculations.leaveDays} working days
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg">
          <div className="text-sm text-purple-700 mb-2">Leave Duration</div>
          <div className="text-4xl font-mono font-bold text-purple-900">
            {calculations.leaveMonths}
          </div>
          <div className="text-sm text-purple-700 mt-2">months continuous</div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm text-green-700 mb-2">Paid Leave Value</div>
          <div className="text-4xl font-mono font-bold text-green-900">
            {formatCurrency(calculations.totalPay)}
          </div>
          <div className="text-sm text-green-700 mt-2">at {formatCurrency(calculations.weeklyPay)}/week</div>
        </div>
      </div>

      {/* State Comparison */}
      <div className="bg-white border border-border rounded-lg">
        <h3 className="font-semibold text-text-primary mb-4 text-lg">
          Long Service Leave by State
        </h3>
        <div className="space-y-2">
          {Object.entries(lslByState)
            .sort((a, b) => a[1].threshold - b[1].threshold)
            .map(([key, data]) => (
              <div
                key={key}
                className={`flex justify-between items-center p-3 rounded border ${
                  state === key
                    ? 'bg-accent/10 border-accent'
                    : 'bg-surface border-border'
                }`}
              >
                <span className="text-text-secondary">{data.name}</span>
                <div className="text-right">
                  <div className="font-mono font-bold text-text-primary">
                    {data.threshold} year threshold
                  </div>
                  <div className="text-xs text-text-muted">
                    {data.accrual * 10} weeks per 10 years
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">
          ℹ️ Long Service Leave (LSL) in Australia
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            Long service leave is paid leave for employees who have served an
            employer for a specified period (usually 7-10 years).
          </p>
          <p>
            <strong>Accrual Rate:</strong> Typically 1.3 weeks per year of service
            (or 13 weeks per 10 years)
          </p>
          <p>
            <strong>Usage:</strong> Can be taken as continuous leave or periodic breaks
            (depends on agreement)
          </p>
          <p>
            <strong>Payment:</strong> You continue to receive your regular pay during
            LSL
          </p>
          <p>
            <strong>Portable LSL (NSW/ACT):</strong> Some schemes allow LSL to be
            carried between employers in same industry
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">
          💡 Long Service Leave Tips
        </h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• Check your award or enterprise agreement for exact LSL terms</li>
          <li>• Some employers require advance notice for LSL (typically 3 months)</li>
          <li>• You cannot be forced to take LSL - it's your choice when to use it</li>
          <li>• Unused LSL is usually paid out on termination of employment</li>
          <li>• Part-time employees accrue LSL at the same rate as full-time</li>
          <li>• Some employers offer LSL cash-out schemes (if allowed by state)</li>
        </ul>
      </div>

      {/* Fair Work Information */}
      <div className="bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-2">
          📞 More Information
        </h3>
        <p className="text-sm text-green-800">
          Fair Work Ombudsman (Australia) provides official LSL information at
          fairwork.gov.au
        </p>
      </div>
    </div>
  );
}
