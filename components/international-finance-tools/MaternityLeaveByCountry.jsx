'use client';

import { useState } from 'react';

const MATERNITY_DATA = {
  us: {
    name: 'United States',
    totalWeeks: 0,
    paidWeeks: 0,
    payRate: '0%',
    payer: 'N/A',
    notes: 'FMLA: 12 weeks unpaid for eligible employees',
    paternityWeeks: 0,
    color: 'bg-red-50 border-red-200',
    colorBg: 'bg-red-100',
    status: 'Minimal',
  },
  uk: {
    name: 'United Kingdom',
    totalWeeks: 52,
    paidWeeks: 39,
    payRate: '90% for 6 weeks, flat rate £184/week for 33 weeks',
    payer: 'Employer + Government',
    notes: 'Statutory Maternity Pay (SMP) available to eligible employees',
    paternityWeeks: 2,
    color: 'bg-blue-50 border-blue-200',
    colorBg: 'bg-blue-100',
    status: 'Moderate',
  },
  canada: {
    name: 'Canada',
    totalWeeks: 96,
    paidWeeks: 50,
    payRate: '55% (standard) or 33% (extended)',
    payer: 'Government (Employment Insurance)',
    notes: '15 weeks maternity + 35-61 weeks parental (flexible between parents)',
    paternityWeeks: 35,
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Generous',
  },
  australia: {
    name: 'Australia',
    totalWeeks: 20,
    paidWeeks: 20,
    payRate: '100% (minimum wage)',
    payer: 'Employer',
    notes: 'National Employment Standards. Unpaid parental leave available up to 12 months.',
    paternityWeeks: 2,
    color: 'bg-yellow-50 border-yellow-200',
    colorBg: 'bg-yellow-100',
    status: 'Moderate',
  },
  india: {
    name: 'India',
    totalWeeks: 26,
    paidWeeks: 26,
    payRate: '100%',
    payer: 'Employer',
    notes: 'Maternity Benefit Act: 26 weeks paid leave',
    paternityWeeks: 0,
    color: 'bg-yellow-50 border-yellow-200',
    colorBg: 'bg-yellow-100',
    status: 'Moderate',
  },
  germany: {
    name: 'Germany',
    totalWeeks: 234,
    paidWeeks: 14,
    payRate: '100% for 14 weeks (Elternzeit extends unpaid)',
    payer: 'Employer + Elterngeld (State)',
    notes: '14 weeks maternity protection. Elterngeld (parental benefit) available for up to 3 years.',
    paternityWeeks: 14,
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Generous',
  },
  sweden: {
    name: 'Sweden',
    totalWeeks: 480,
    paidWeeks: 384,
    payRate: '80% (standard)',
    payer: 'Government',
    notes: '480 days (68-69 weeks) shared between parents, 80% of income covered',
    paternityWeeks: 240,
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Very Generous',
  },
  japan: {
    name: 'Japan',
    totalWeeks: 78,
    paidWeeks: 14,
    payRate: '67% for maternity, varies for childcare leave',
    payer: 'Government / Employer',
    notes: '14 weeks maternity pay + childcare leave up to child\'s 1st birthday',
    paternityWeeks: 0,
    color: 'bg-yellow-50 border-yellow-200',
    colorBg: 'bg-yellow-100',
    status: 'Moderate',
  },
  france: {
    name: 'France',
    totalWeeks: 16,
    paidWeeks: 16,
    payRate: '100%',
    payer: 'Government (Social Security)',
    notes: '16 weeks paid, can be extended unpaid to 3 years',
    paternityWeeks: 11,
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Moderate',
  },
  norway: {
    name: 'Norway',
    totalWeeks: 109,
    paidWeeks: 100,
    payRate: '100% (49 weeks) or 80% (59 weeks)',
    payer: 'Government',
    notes: '49 weeks at 100% or 59 weeks at 80% - parents choose. Flexible between parents.',
    paternityWeeks: 49,
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Very Generous',
  },
  finland: {
    name: 'Finland',
    totalWeeks: 60,
    paidWeeks: 60,
    payRate: '70% (maternity) + government support',
    payer: 'Government + Employer',
    notes: '14 months combined maternity/parental benefit, flexible between parents',
    paternityWeeks: 30,
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Very Generous',
  },
  denmark: {
    name: 'Denmark',
    totalWeeks: 52,
    paidWeeks: 52,
    payRate: '100%',
    payer: 'Government (via employer)',
    notes: '52 weeks: 24 weeks maternity, 24 weeks paternity, 4 weeks shared',
    paternityWeeks: 24,
    color: 'bg-green-50 border-green-200',
    colorBg: 'bg-green-100',
    status: 'Generous',
  },
};

export default function MaternityLeaveByCountry() {
  const [selectedCountries, setSelectedCountries] = useState([
    'us',
    'uk',
    'canada',
    'australia',
    'germany',
    'sweden',
  ]);

  const allCountries = Object.keys(MATERNITY_DATA);

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
    .map((key) => MATERNITY_DATA[key])
    .sort((a, b) => b.paidWeeks - a.paidWeeks);

  return (
    <div className="w-full space-y-4">
      {/* Country filter pills */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-text-secondary">Countries ({selectedCountries.length} selected)</p>
          <div className="flex gap-2">
            <button onClick={selectAll} className="text-xs text-accent hover:underline">All</button>
            <button onClick={clearAll} className="text-xs text-text-muted hover:text-text-secondary">Clear</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allCountries.map((country) => (
            <button
              key={country}
              onClick={() => toggleCountry(country)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCountries.includes(country)
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
              }`}
            >
              {MATERNITY_DATA[country].name}
            </button>
          ))}
        </div>
      </div>

      {selected.length > 0 && (
        <div className="space-y-4">
          {/* Main comparison table */}
          <div className="bg-surface border border-border rounded-[var(--radius-card)] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-white">
                  <th className="text-left py-2 px-3 font-semibold text-text-primary text-xs">Country</th>
                  <th className="text-center py-2 px-3 font-semibold text-text-primary text-xs">Status</th>
                  <th className="text-center py-2 px-3 font-semibold text-text-primary text-xs">Total wks</th>
                  <th className="text-center py-2 px-3 font-semibold text-text-primary text-xs">Paid wks</th>
                  <th className="text-center py-2 px-3 font-semibold text-text-primary text-xs">Pay rate</th>
                  <th className="text-center py-2 px-3 font-semibold text-text-primary text-xs">Paternity wks</th>
                </tr>
              </thead>
              <tbody>
                {selected.map((country) => (
                  <tr key={country.name} className="border-b border-border last:border-b-0 hover:bg-surface-hover">
                    <td className="py-2 px-3 font-medium text-primary text-xs">{country.name}</td>
                    <td className="text-center py-2 px-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${country.colorBg} text-primary`}>
                        {country.status}
                      </span>
                    </td>
                    <td className="text-center py-2 px-3 font-mono text-xs font-bold">
                      {country.totalWeeks === 0 ? '-' : country.totalWeeks}
                    </td>
                    <td className="text-center py-2 px-3 font-mono text-xs font-bold text-accent">
                      {country.paidWeeks === 0 ? '-' : country.paidWeeks}
                    </td>
                    <td className="text-center py-2 px-3 text-secondary text-xs max-w-[120px]">
                      {country.payRate === 'N/A' ? '-' : country.payRate}
                    </td>
                    <td className="text-center py-2 px-3 font-mono text-xs font-bold">
                      {country.paternityWeeks === 0 ? '-' : country.paternityWeeks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes per country (compact) */}
          <div className="bg-surface border border-border rounded-[var(--radius-card)] overflow-hidden">
            <div className="px-4 py-2 border-b border-border">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Details & notes</p>
            </div>
            {selected.map((country) => (
              <div key={country.name} className="px-4 py-3 border-b border-border last:border-b-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-primary">{country.name}</p>
                  <p className="text-xs text-text-secondary shrink-0">{country.payer}</p>
                </div>
                <p className="text-xs text-secondary mt-1">{country.notes}</p>
              </div>
            ))}
          </div>

          {/* Key insight strip */}
          {selected.length >= 2 && (
            <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-3 text-sm text-blue-900">
              <span className="font-semibold">Most paid leave: </span>
              {selected.reduce((a, b) => (b.paidWeeks > a.paidWeeks ? b : a)).name}
              {selected.filter((c) => c.paidWeeks === 0).length > 0 && (
                <span className="ml-3 text-blue-700">
                  {selected.filter((c) => c.paidWeeks === 0).length} {selected.filter((c) => c.paidWeeks === 0).length === 1 ? 'country' : 'countries'} with no statutory paid leave
                </span>
              )}
            </div>
          )}

          <p className="text-xs text-secondary px-1">
            Data is current as of 2026 and represents statutory minimums. Regulations vary by employment type and tenure. Always verify with official government sources.
          </p>
        </div>
      )}

      {selected.length === 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-8 text-center">
          <p className="text-secondary">Select countries above to view comparison</p>
        </div>
      )}
    </div>
  );
}
