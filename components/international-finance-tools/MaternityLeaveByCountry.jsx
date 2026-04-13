'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

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
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-primary mb-2">
          International Maternity & Parental Leave
        </h2>
        <p className="text-secondary text-sm mb-4">
          Compare statutory maternity, paternity, and parental leave by country
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
                  {MATERNITY_DATA[country].name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <p className="text-xs text-secondary mt-4 p-3 bg-surface rounded border border-border">
          Data is current as of 2026. Regulations may vary based on employment type, tenure, and
          eligibility. Government funding and employer obligations vary significantly by country.
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
                    Total Leave (weeks)
                  </th>
                  <th className="text-center py-3 px-3 font-bold text-primary">
                    Paid Leave (weeks)
                  </th>
                  <th className="text-center py-3 px-3 font-bold text-primary">Pay Rate</th>
                  <th className="text-center py-3 px-3 font-bold text-primary">
                    Paternity Leave (weeks)
                  </th>
                </tr>
              </thead>
              <tbody>
                {selected.map((country) => (
                  <tr key={country.name} className={`border-b border-border ${country.color}`}>
                    <td className="py-4 px-3 font-medium text-primary">{country.name}</td>
                    <td className="text-center py-4 px-3 font-mono font-bold">
                      {country.totalWeeks === 0 ? 'None' : country.totalWeeks}
                    </td>
                    <td className="text-center py-4 px-3 font-mono font-bold text-accent">
                      {country.paidWeeks === 0 ? 'None' : country.paidWeeks}
                    </td>
                    <td className="text-center py-4 px-3 text-secondary text-xs">
                      {country.payRate === 'N/A' ? 'N/A' : country.payRate}
                    </td>
                    <td className="text-center py-4 px-3 font-mono font-bold">
                      {country.paternityWeeks === 0 ? 'None' : country.paternityWeeks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                    <p className="text-xs text-secondary uppercase font-bold">Maternity Leave</p>
                    <p className="font-mono text-lg font-bold text-primary">
                      {country.totalWeeks === 0
                        ? 'No statutory leave'
                        : `${country.totalWeeks} weeks total`}
                    </p>
                  </div>

                  {country.paidWeeks > 0 && (
                    <div>
                      <p className="text-xs text-secondary uppercase font-bold">Paid Weeks</p>
                      <p className="font-mono text-lg font-bold text-accent">
                        {country.paidWeeks} weeks
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-secondary uppercase font-bold">Pay Rate</p>
                    <p className="text-sm text-primary">{country.payRate}</p>
                  </div>

                  <div>
                    <p className="text-xs text-secondary uppercase font-bold">Funded By</p>
                    <p className="text-sm text-primary">{country.payer}</p>
                  </div>

                  {country.paternityWeeks > 0 && (
                    <div>
                      <p className="text-xs text-secondary uppercase font-bold">
                        Paternity / Partner Leave
                      </p>
                      <p className="text-sm text-primary">{country.paternityWeeks} weeks</p>
                    </div>
                  )}

                  <p className="text-xs text-secondary pt-2 border-t border-border mt-3">
                    {country.notes}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Key Insights */}
          <Card className="bg-blue-50 border-2 border-blue-200">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">Key Insights</h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-bold text-primary mb-1">Most Generous Leave:</p>
                <p className="text-secondary">
                  {selected.reduce((a, b) => (b.paidWeeks > a.paidWeeks ? b : a)).name} offers the
                  most paid leave
                </p>
              </div>

              <div>
                <p className="font-bold text-primary mb-1">Paid vs. Unpaid:</p>
                <p className="text-secondary">
                  {selected.filter((c) => c.paidWeeks === 0).length} countries have no statutory
                  paid leave
                </p>
              </div>

              <div>
                <p className="font-bold text-primary mb-1">Parental Leave Flexibility:</p>
                <p className="text-secondary">
                  Nordic countries (Sweden, Norway, Finland, Denmark) and Canada offer flexible
                  parental leave that can be shared between parents
                </p>
              </div>

              <div>
                <p className="font-bold text-primary mb-1">Work-Life Balance:</p>
                <p className="text-secondary">
                  Total statutory leave (maternity + paternity) varies from 0 weeks in the US to
                  over 1 year in Nordic countries
                </p>
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card className="bg-yellow-50 border-2 border-yellow-200">
            <p className="font-bold text-yellow-900 mb-2">Important Notes:</p>
            <ul className="text-sm text-yellow-900 space-y-2 list-disc list-inside">
              <li>Data represents statutory minimums. Many employers offer more generous benefits.</li>
              <li>
                Eligibility requirements vary (length of service, employment type, salary thresholds)
              </li>
              <li>Some countries allow unpaid leave beyond paid entitlements</li>
              <li>Exchange rates and regional variations apply in some countries</li>
              <li>Regulations change periodically - always verify with official government sources</li>
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
