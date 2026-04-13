'use client';

import { useState, useMemo } from 'react';

// Age pension eligibility by birth date
// Currently 67 for everyone born after 1 Jan 1957
const getPensionAge = (birthDate) => {
  const date = new Date(birthDate);
  const year = date.getFullYear();

  if (year < 1952) return 65;
  if (year < 1956) return 65.5;
  if (year < 1961) return 66;
  return 67; // Born 1961 onwards
};

export default function AustraliaPensionAgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState('1990-01-15');
  const [includePartialYear, setIncludePartialYear] = useState(true);

  const results = useMemo(() => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    // Calculate current age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    // Calculate more precise age with decimals
    const exactAge =
      age + (monthDiff + (dayDiff / 31)) / 12;

    // Get pension age
    const pensionAge = getPensionAge(dateOfBirth);

    // Calculate when pension eligibility occurs
    const pensionYears = Math.floor(pensionAge);
    const pensionMonths = Math.round((pensionAge % 1) * 12);

    // Calculate pension eligibility date
    const pensionDate = new Date(birthDate);
    pensionDate.setFullYear(pensionDate.getFullYear() + pensionYears);
    pensionDate.setMonth(pensionDate.getMonth() + pensionMonths);

    // Years and months until eligibility
    let yearsUntil = pensionDate.getFullYear() - today.getFullYear();
    let monthsUntil = pensionDate.getMonth() - today.getMonth();

    if (monthsUntil < 0) {
      yearsUntil--;
      monthsUntil += 12;
    }

    const isEligible = today >= pensionDate;
    const daysUntil = Math.max(0, Math.floor((pensionDate - today) / (1000 * 60 * 60 * 24)));

    // Format dates
    const birthDateStr = birthDate.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const pensionDateStr = pensionDate.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      dateOfBirth: birthDateStr,
      currentAge: age.toFixed(0),
      exactAge: exactAge.toFixed(1),
      pensionAge: pensionAge.toFixed(1),
      pensionDate: pensionDateStr,
      yearsUntil: Math.max(0, yearsUntil).toFixed(0),
      monthsUntil: monthsUntil.toFixed(0),
      daysUntil: daysUntil.toFixed(0),
      isEligible,
    };
  }, [dateOfBirth]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-4">
      <div className="bg-surface rounded-lg border border-border sm:p-4 space-y-4">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-text-primary font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            />
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includePartialYear}
              onChange={(e) => setIncludePartialYear(e.target.checked)}
              className="mr-2"
            />
            <span className="text-text-primary font-medium">
              Show partial months and days until eligibility
            </span>
          </label>
        </div>

        {/* Current Age */}
        <div className="bg-white rounded-lg border border-border">
          <h2 className="text-text-primary font-semibold text-lg mb-4">
            Current Age
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-text-secondary text-sm mb-1">Age (years)</p>
              <p className="text-4xl font-mono font-semibold text-accent">
                {results.currentAge}
              </p>
            </div>

            <div>
              <p className="text-text-secondary text-sm mb-1">Precise Age</p>
              <p className="text-3xl font-mono font-semibold text-accent">
                {results.exactAge}
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-text-muted text-sm">
                Born: <span className="font-mono">{results.dateOfBirth}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Pension Eligibility */}
        <div className={`rounded-lg border ${
          results.isEligible
            ? 'bg-green-50 border-green-200'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <h2 className="text-text-primary font-semibold text-lg mb-4">
            Age Pension Eligibility
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-text-secondary text-sm mb-1">
                Eligible Pension Age
              </p>
              <p className="text-4xl font-mono font-semibold text-accent">
                {results.pensionAge} years
              </p>
            </div>

            <div>
              <p className="text-text-secondary text-sm mb-1">
                Eligibility Date
              </p>
              <p className="text-3xl font-mono font-semibold">
                {results.pensionDate}
              </p>
            </div>

            {results.isEligible ? (
              <div className="pt-4 border-t border-green-200 bg-green-100 -mx-6 -mb-4 px-6 py-4 rounded-b-lg">
                <p className="text-success font-semibold text-lg">
                  You are eligible for Age Pension
                </p>
                <p className="text-text-secondary text-sm mt-2">
                  You can apply at Services Australia (humanservices.gov.au)
                </p>
              </div>
            ) : (
              <div className="pt-4 space-y-2 border-t border-blue-200">
                <p className="text-text-secondary">
                  Time until eligibility:
                </p>
                <p className="text-2xl font-mono font-semibold text-accent">
                  {results.yearsUntil} years, {results.monthsUntil} months
                </p>
                <p className="text-text-muted text-sm">
                  ({results.daysUntil} days)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Historical Context */}
        <div className="bg-white rounded-lg border border-border">
          <h3 className="text-text-primary font-semibold text-lg mb-4">
            Pension Age History
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between pb-2 border-b border-border">
              <span className="text-text-secondary">Born before 1952:</span>
              <span className="font-mono font-semibold">65 years</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span className="text-text-secondary">Born 1952 - 1955:</span>
              <span className="font-mono font-semibold">65.5 years</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span className="text-text-secondary">Born 1956 - 1960:</span>
              <span className="font-mono font-semibold">66 years</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-text-secondary">Born 1961 onwards:</span>
              <span className="font-mono font-semibold">67 years</span>
            </div>
          </div>
        </div>

        {/* Key Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-text-primary font-semibold text-lg mb-4">
            Age Pension Information
          </h3>
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              <span className="font-semibold">Eligibility:</span> Must be Australian
              citizen or permanent resident with 10+ years residency
            </p>
            <p>
              <span className="font-semibold">Income test:</span> Limits apply to your
              fortnightly income (different for single / couple)
            </p>
            <p>
              <span className="font-semibold">Asset test:</span> Limits apply to your
              total liquid assets
            </p>
            <p>
              <span className="font-semibold">Payment:</span> Depends on your age,
              relationship status, and results of income / asset tests
            </p>
            <p>
              <span className="font-semibold">Work bonus:</span> Earn up to $300/fortnight
              without affecting payment
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Pension age is currently 67 for everyone born 1 Jan 1957 onwards</li>
            <li>
              Future governments may change the eligible age - this calculator
              uses current legislation
            </li>
            <li>Meeting age requirements is only one part of eligibility</li>
            <li>
              Residency, income, and asset tests also apply to receive payment
            </li>
            <li>
              Apply at Services Australia (humanservices.gov.au) or phone 131 500
            </li>
            <li>For official information, visit humanservices.gov.au</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
