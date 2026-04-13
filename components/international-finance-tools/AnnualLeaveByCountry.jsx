'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const LEAVE_DATA = {
  us: {
    name: 'United States',
    statutoryDays: 0,
    publicHolidays: 0,
    totalMinimum: 0,
    notes: 'No federal statutory paid leave requirement. Average: 10-15 days offered by employers.',
    color: 'bg-red-50 border-red-200',
    colorBg: 'bg-red-100',
    status: 'Minimal',
    rank: 20,
  },
  uk: {
    name: 'United Kingdom',
    statutoryDays: 20,
    publicHolidays: 8,
    totalMinimum: 28,
    notes: 'Statutory Minimum: 20 days. Bank holidays: 8 (varies by country within UK).',
    color: 'bg-blue-50 border-blue-200',
    colorBg: 'bg-blue-100',
    status: 'Moderate',
    rank: 11,
  },
  canada: {
    name: 'Canada',
    statutoryDays: 15,
    publicHolidays: 9,
    totalMinimum: 24,
    notes: 'Varies by province: 10-15 days statutory, plus 9-13 statutory holidays.',
    color: 'bg-yellow-50 border-yellow-200',
    colorBg: 'bg-yellow-100',
    status: 'Moderate',
    rank: 13,
  },
  australia: {
    name: 'Australia',
    statutoryDays: 20,
    publicHolidays: 10,
    totalMinimum: 30,
    notes: 'Minimum 20 days annual leave. Public holidays: 8-12 depending on state.',
    color: 'bg-yellow-50 border-yellow-200',
    colorBg: 'bg-yellow-100',
    status: 'Good',
    rank: 9,
  },
  germany: {
    name: 'Germany',
    statutoryDays: 20,
    publicHolidays: 11,
    totalMinimum: 31,
    notes: 'Statutory minimum: 20 days. Most employers offer 25-30 days. Public holidays: 9-13.',
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Excellent',
    rank: 7,
  },
  france: {
    name: 'France',
    statutoryDays: 25,
    publicHolidays: 11,
    totalMinimum: 36,
    notes: 'Statutory: 25 days annual leave plus 11 public holidays = 36 days minimum.',
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Very Generous',
    rank: 4,
  },
  japan: {
    name: 'Japan',
    statutoryDays: 10,
    publicHolidays: 16,
    totalMinimum: 26,
    notes: 'Statutory: 10 days (rising to 20 with tenure). Public holidays: 16. Limited take-up.',
    color: 'bg-yellow-50 border-yellow-200',
    colorBg: 'bg-yellow-100',
    status: 'Moderate',
    rank: 12,
  },
  india: {
    name: 'India',
    statutoryDays: 18,
    publicHolidays: 15,
    totalMinimum: 33,
    notes: 'Statutory: 15-21 days depending on state. Public holidays: 15+ (including optional sectarian holidays).',
    color: 'bg-yellow-50 border-yellow-200',
    colorBg: 'bg-yellow-100',
    status: 'Moderate',
    rank: 10,
  },
  brazil: {
    name: 'Brazil',
    statutoryDays: 30,
    publicHolidays: 12,
    totalMinimum: 42,
    notes: 'Statutory: 30 days annual leave plus 12 public holidays.',
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Very Generous',
    rank: 2,
  },
  uae: {
    name: 'United Arab Emirates',
    statutoryDays: 30,
    publicHolidays: 10,
    totalMinimum: 40,
    notes: 'Statutory: 30 days annual leave plus 10 public holidays (weekends are Sat-Sun now, changed from Thu-Fri).',
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Very Generous',
    rank: 3,
  },
  china: {
    name: 'China',
    statutoryDays: 5,
    publicHolidays: 11,
    totalMinimum: 16,
    notes: 'Base: 5 days annual leave (can rise to 15). Plus 11 national holidays + 3-week Chinese New Year period.',
    color: 'bg-yellow-50 border-yellow-200',
    colorBg: 'bg-yellow-100',
    status: 'Minimal',
    rank: 14,
  },
  sweden: {
    name: 'Sweden',
    statutoryDays: 25,
    publicHolidays: 13,
    totalMinimum: 38,
    notes: 'Statutory: 25 days annual leave plus 13 public holidays. High usage culture.',
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Very Generous',
    rank: 5,
  },
  spain: {
    name: 'Spain',
    statutoryDays: 22,
    publicHolidays: 14,
    totalMinimum: 36,
    notes: 'Statutory: 22 days annual leave plus 14 public holidays (regional variations apply).',
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Very Generous',
    rank: 4,
  },
  southkorea: {
    name: 'South Korea',
    statutoryDays: 15,
    publicHolidays: 15,
    totalMinimum: 30,
    notes: 'Statutory: 15 days annual leave plus 15 public holidays. Limited take-up due to work culture.',
    color: 'bg-yellow-50 border-yellow-200',
    colorBg: 'bg-yellow-100',
    status: 'Moderate',
    rank: 11,
  },
  mexico: {
    name: 'Mexico',
    statutoryDays: 6,
    publicHolidays: 13,
    totalMinimum: 19,
    notes: 'Statutory: 6 days (rising with tenure) plus 13 public holidays.',
    color: 'bg-yellow-50 border-yellow-200',
    colorBg: 'bg-yellow-100',
    status: 'Minimal',
    rank: 16,
  },
  norway: {
    name: 'Norway',
    statutoryDays: 25,
    publicHolidays: 12,
    totalMinimum: 37,
    notes: 'Statutory: 25 days annual leave plus 12 public holidays. High vacation culture.',
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Very Generous',
    rank: 6,
  },
  finland: {
    name: 'Finland',
    statutoryDays: 20,
    publicHolidays: 13,
    totalMinimum: 33,
    notes: 'Statutory: 20 days annual leave plus 13 public holidays plus summer bonus scheme.',
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Very Generous',
    rank: 8,
  },
  denmark: {
    name: 'Denmark',
    statutoryDays: 25,
    publicHolidays: 13,
    totalMinimum: 38,
    notes: 'Statutory: 25 days plus 13 public holidays. Strong vacation culture.',
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Very Generous',
    rank: 5,
  },
};

export default function AnnualLeaveByCountry() {
  const [selectedCountries, setSelectedCountries] = useState([
    'us',
    'uk',
    'france',
    'germany',
    'australia',
    'japan',
  ]);

  const allCountries = Object.keys(LEAVE_DATA);

  function toggleCountry(country) {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  }

  function selectAll() {
    setSelectedCountries(allCountries);
  }

  function clearAll() {
    setSelectedCountries([]);
  }

  const selected = selectedCountries
    .map((key) => LEAVE_DATA[key])
    .sort((a, b) => b.totalMinimum - a.totalMinimum);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-primary mb-2">
          International Annual Leave Comparison
        </h2>
        <p className="text-secondary text-sm mb-4">
          Compare statutory annual leave and public holidays by country
        </p>

        {/* Country Selection */}
        <div className="mb-4">
          <div className="flex gap-2 mb-4">
            <Button
              onClick={selectAll}
              className="bg-surface hover:bg-surface-hover border border-border text-primary"
            >
              Select All
            </Button>
            <Button
              onClick={clearAll}
              className="bg-surface hover:bg-surface-hover border border-border text-primary"
            >
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {allCountries.map((country) => (
              <label
                key={country}
                className="flex items-center gap-2 p-2 rounded border border-border hover:bg-surface cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(country)}
                  onChange={() => toggleCountry(country)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm font-medium text-primary truncate">
                  {LEAVE_DATA[country].name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <p className="text-xs text-secondary mt-4 p-3 bg-surface rounded border border-border">
          Data represents statutory minimums as of 2026. Actual entitlements vary by employment
          type, tenure, and region. Many employers offer more generous benefits above the statutory
          minimum.
        </p>
      </Card>

      {selected.length > 0 && (
        <div className="space-y-4">
          {/* Main Comparison Table */}
          <Card className="overflow-x-auto">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Comparison Table
            </h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-bold text-primary">Country</th>
                  <th className="text-center py-3 px-3 font-bold text-primary">
                    Annual Leave Days
                  </th>
                  <th className="text-center py-3 px-3 font-bold text-primary">
                    Public Holidays
                  </th>
                  <th className="text-center py-3 px-3 font-bold text-primary">
                    Total Days Off
                  </th>
                </tr>
              </thead>
              <tbody>
                {selected.map((country) => (
                  <tr key={country.name} className={`border-b border-border ${country.color}`}>
                    <td className="py-4 px-3 font-medium text-primary">{country.name}</td>
                    <td className="text-center py-4 px-3 font-mono font-bold">
                      {country.statutoryDays}
                    </td>
                    <td className="text-center py-4 px-3 font-mono font-bold">
                      {country.publicHolidays}
                    </td>
                    <td className="text-center py-4 px-3 font-mono font-bold text-accent text-lg">
                      {country.totalMinimum}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Ranking */}
          <Card className="bg-blue-50 border-2 border-blue-200">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Ranking by Total Days Off (among selected)
            </h3>

            <div className="space-y-2">
              {selected.map((country, idx) => (
                <div key={country.name} className="flex items-center justify-between p-3 bg-white rounded border border-blue-200">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-accent w-8">#{idx + 1}</span>
                    <span className="font-medium text-primary">{country.name}</span>
                  </div>
                  <span className="font-mono font-bold text-primary text-lg">
                    {country.totalMinimum} days
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Detailed Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {selected.map((country) => (
              <Card key={country.name} className={`border-2 ${country.color}`}>
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-heading text-lg font-bold text-primary">
                    {country.name}
                  </h4>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${country.colorBg} text-primary`}
                  >
                    {country.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-secondary uppercase font-bold">Annual Leave</p>
                    <p className="font-mono text-2xl font-bold text-primary">
                      {country.statutoryDays} days
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-secondary uppercase font-bold">Public Holidays</p>
                    <p className="font-mono text-2xl font-bold text-accent">
                      {country.publicHolidays} days
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-border">
                    <p className="text-xs text-secondary uppercase font-bold mb-1">
                      Total Minimum Days Off
                    </p>
                    <p className="font-mono text-3xl font-bold text-accent">
                      {country.totalMinimum}
                    </p>
                    <p className="text-xs text-secondary mt-1">
                      = {(country.totalMinimum / 365 * 100).toFixed(1)}% of the year
                    </p>
                  </div>

                  <p className="text-xs text-secondary pt-3 border-t border-border">
                    {country.notes}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Key Insights */}
          <Card className="bg-green-50 border-2 border-green-200">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">Key Insights</h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-bold text-primary mb-1">Most Generous:</p>
                <p className="text-secondary">
                  {selected.reduce((a, b) => (b.totalMinimum > a.totalMinimum ? b : a)).name}{' '}
                  offers the most statutory time off ({selected.reduce((a, b) => (b.totalMinimum > a.totalMinimum ? b : a)).totalMinimum} days)
                </p>
              </div>

              <div>
                <p className="font-bold text-primary mb-1">Least Generous:</p>
                <p className="text-secondary">
                  {selected.reduce((a, b) => (b.totalMinimum < a.totalMinimum ? b : a)).name} has
                  the minimum statutory entitlement ({selected.reduce((a, b) => (b.totalMinimum < a.totalMinimum ? b : a)).totalMinimum} days)
                </p>
              </div>

              <div>
                <p className="font-bold text-primary mb-1">Average Work Year:</p>
                <p className="text-secondary">
                  In {selected[0].name}, you work approximately{' '}
                  {(365 - selected.reduce((sum, c) => sum + c.totalMinimum, 0) / selected.length).toFixed(0)} days per year on average
                </p>
              </div>

              <div className="mt-4 p-3 bg-white rounded border border-green-200">
                <p className="text-secondary">
                  Note: These are statutory minimums. Many countries have regional variations,
                  collective agreements, or employer benefits that exceed these standards.
                </p>
              </div>
            </div>
          </Card>

          {/* Important Notes */}
          <Card className="bg-yellow-50 border-2 border-yellow-200">
            <p className="font-bold text-yellow-900 mb-3">Important Notes:</p>
            <ul className="text-sm text-yellow-900 space-y-2 list-disc list-inside">
              <li>Statutory minimums vary by employment type (full-time, part-time, contract work)</li>
              <li>Tenure may affect entitlements (e.g., Japan: more leave with length of service)</li>
              <li>Regional variations apply in many countries (e.g., UK bank holidays vary by country)</li>
              <li>Some countries require you to take leave (no "banking" of unused days)</li>
              <li>Sectarian holidays vary by region and may be optional in some countries</li>
              <li>Self-employed workers may have different entitlements</li>
            </ul>
          </Card>
        </div>
      )}

      {selected.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-secondary text-lg">Select countries above to view comparison</p>
        </Card>
      )}
    </div>
  );
}
