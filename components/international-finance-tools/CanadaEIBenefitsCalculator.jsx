'use client';

import { useState, useMemo } from 'react';

const EI_MAX_WEEKLY = 668;
const EI_REPLACEMENT_RATE = 0.55;

// Regional unemployment rates and max insurable hours (2025)
const REGION_DATA = {
  ON: { unemployment: 5.5, maxWeeks: 14 },
  QC: { unemployment: 4.8, maxWeeks: 14 },
  BC: { unemployment: 5.2, maxWeeks: 14 },
  AB: { unemployment: 4.9, maxWeeks: 14 },
  MB: { unemployment: 5.1, maxWeeks: 14 },
  SK: { unemployment: 4.6, maxWeeks: 14 },
  NS: { unemployment: 5.8, maxWeeks: 19 },
  NB: { unemployment: 7.2, maxWeeks: 25 },
  NL: { unemployment: 11.5, maxWeeks: 45 },
  PE: { unemployment: 7.9, maxWeeks: 32 },
};

export default function CanadaEIBenefitsCalculator() {
  const [weeklyEarnings, setWeeklyEarnings] = useState(600);
  const [weeksWorked, setWeeksWorked] = useState(52);
  const [region, setRegion] = useState('ON');

  const results = useMemo(() => {
    const earnings = parseFloat(weeklyEarnings) || 0;
    const weeks = parseFloat(weeksWorked) || 0;
    const regionInfo = REGION_DATA[region] || REGION_DATA.ON;

    // Average insurable weekly earnings
    const avgWeeklyEarnings = weeks > 0 ? earnings : 0;

    // Weekly benefit (55% of average, capped at max)
    const weeklyBenefit = Math.min(avgWeeklyEarnings * EI_REPLACEMENT_RATE, EI_MAX_WEEKLY);

    // Duration: must have 120 hours minimum
    let durationWeeks = 0;
    if (weeks >= 15) {
      // Base on unemployment rate: higher unemployment = longer benefits
      if (regionInfo.unemployment < 5) {
        durationWeeks = 14;
      } else if (regionInfo.unemployment < 7) {
        durationWeeks = 19;
      } else if (regionInfo.unemployment < 9) {
        durationWeeks = 25;
      } else {
        durationWeeks = regionInfo.maxWeeks;
      }
    }

    const totalBenefit = weeklyBenefit * durationWeeks;

    return {
      avgWeeklyEarnings: avgWeeklyEarnings.toFixed(2),
      weeklyBenefit: weeklyBenefit.toFixed(2),
      durationWeeks,
      totalBenefit: totalBenefit.toFixed(2),
      unemploymentRate: regionInfo.unemployment,
      maxWeeks: regionInfo.maxWeeks,
    };
  }, [weeklyEarnings, weeksWorked, region]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-surface rounded-lg border border-border p-6 sm:p-8 space-y-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-text-primary font-medium mb-2">
              Average Weekly Earnings (CAD)
            </label>
            <input
              type="number"
              value={weeklyEarnings}
              onChange={(e) => setWeeklyEarnings(e.target.value)}
              placeholder="Enter weekly earnings"
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
            <p className="text-text-muted text-sm mt-1">Before any deductions</p>
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Weeks Worked in Last 52 Weeks
            </label>
            <input
              type="number"
              value={weeksWorked}
              onChange={(e) => setWeeksWorked(e.target.value)}
              placeholder="Enter weeks"
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
            <p className="text-text-muted text-sm mt-1">Minimum 15 weeks required for EI eligibility</p>
          </div>

          <div>
            <label className="block text-text-primary font-medium mb-2">
              Province or Territory
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            >
              {Object.entries(REGION_DATA).map(([code, data]) => (
                <option key={code} value={code}>
                  {code} (Unemployment: {data.unemployment}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg border border-border p-6 space-y-4">
          <h2 className="text-text-primary font-semibold text-lg">Estimated EI Benefits</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-text-secondary text-sm mb-1">Weekly Benefit Amount</p>
              <p className="text-2xl sm:text-3xl font-mono font-semibold text-accent">
                ${results.weeklyBenefit}
              </p>
            </div>

            <div>
              <p className="text-text-secondary text-sm mb-1">Benefit Duration</p>
              <p className="text-2xl sm:text-3xl font-mono font-semibold text-accent">
                {results.durationWeeks} weeks
              </p>
            </div>

            <div>
              <p className="text-text-secondary text-sm mb-1">Total Benefit Amount</p>
              <p className="text-2xl sm:text-3xl font-mono font-semibold text-accent">
                ${results.totalBenefit}
              </p>
            </div>

            <div>
              <p className="text-text-secondary text-sm mb-1">Replacement Rate</p>
              <p className="text-2xl sm:text-3xl font-mono font-semibold text-accent">
                55%
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border text-text-muted text-sm space-y-2">
            <p>Max weekly benefit: <span className="font-mono">${EI_MAX_WEEKLY}</span></p>
            <p>Weekly benefit capped at 55% of average insured earnings or max weekly rate</p>
            <p>Duration varies by regional unemployment rate (14 - 45 weeks)</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Requires minimum 120 insurable hours in qualifying period</li>
            <li>EI rates and maximums change annually (2025 rates shown)</li>
            <li>Does not account for waiting period or deductions</li>
            <li>Consult Service Canada for your specific situation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
