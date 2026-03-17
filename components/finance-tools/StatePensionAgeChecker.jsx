'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function StatePensionAgeChecker() {
  const [dateOfBirth, setDateOfBirth] = useState('1970-01-15');
  const [result, setResult] = useState(null);

  const CURRENT_STATE_PENSION = 221.20; // 2025/26 full rate per week

  function calculate() {
    const dob = new Date(dateOfBirth);
    if (!dob || isNaN(dob.getTime())) return;

    // State pension age rules - UK 2025/26
    // Born before 6 April 1950: already receiving (age 75+)
    // Born 6 April 1950 to 5 April 1951: age 66
    // Born 6 April 1951 to 5 April 1977: age 66-67 (graduated increases)
    // Born 6 April 1977 to 5 April 1993: age 67
    // Born 6 April 1993 onwards: age 68

    const april1950 = new Date('1950-04-06');
    const april1951 = new Date('1951-04-06');
    const april1977 = new Date('1977-04-06');
    const april1993 = new Date('1993-04-06');

    let pensionAge = 68; // default
    let pensionDate = new Date(dob);

    if (dob < april1950) {
      // Already past state pension age
      pensionAge = 75;
      pensionDate = new Date(dob);
    } else if (dob < april1951) {
      pensionAge = 66;
      pensionDate = new Date(dob.getFullYear() + pensionAge, dob.getMonth(), dob.getDate());
    } else if (dob < april1977) {
      // Graduated increases
      const monthsAfterApril1951 = (dob.getFullYear() - 1951) * 12 + (dob.getMonth() + 1 - 4);
      const extraMonths = Math.floor(monthsAfterApril1951 / 2);
      const totalMonths = 66 * 12 + Math.min(extraMonths, 12);
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      pensionAge = years + months / 12;
      pensionDate = new Date(dob);
      pensionDate.setFullYear(dob.getFullYear() + years);
      pensionDate.setMonth(dob.getMonth() + months);
    } else if (dob < april1993) {
      pensionAge = 67;
      pensionDate = new Date(dob.getFullYear() + pensionAge, dob.getMonth(), dob.getDate());
    } else {
      pensionAge = 68;
      pensionDate = new Date(dob.getFullYear() + pensionAge, dob.getMonth(), dob.getDate());
    }

    const today = new Date();
    const daysUntil = Math.max(0, Math.floor((pensionDate - today) / (1000 * 60 * 60 * 24)));
    const yearsUntil = Math.floor(daysUntil / 365.25);
    const monthsUntil = Math.floor((daysUntil % 365.25) / 30.44);
    const daysRemaining = Math.floor(daysUntil % 30.44);

    const weeklyAmount = CURRENT_STATE_PENSION;
    const monthlyAmount = (weeklyAmount * 52) / 12;
    const annualAmount = weeklyAmount * 52;

    setResult({
      pensionAge: Math.floor(pensionAge),
      pensionAgeMonths: Math.floor((pensionAge % 1) * 12),
      pensionDate: pensionDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      yearsUntil,
      monthsUntil,
      daysRemaining,
      weeklyAmount: weeklyAmount.toFixed(2),
      monthlyAmount: monthlyAmount.toFixed(2),
      annualAmount: annualAmount.toFixed(2),
      isPast: daysUntil === 0 && today > pensionDate,
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-2xl font-bold text-primary mb-6">
          UK State Pension Age Checker
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Date of Birth
            </label>
            <Input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <p className="text-xs text-secondary mt-1">
              Your state pension age depends on when you were born.
            </p>
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Check My Pension Age
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Main Result */}
          <Card className="p-6 bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              Your State Pension Details
            </h3>

            {!result.isPast ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-secondary text-sm mb-2">State Pension Age</p>
                    <p className="font-mono text-2xl font-bold text-primary">
                      {result.pensionAge} {result.pensionAgeMonths > 0 && `years ${result.pensionAgeMonths} months`}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-secondary text-sm mb-2">Claim Date</p>
                    <p className="font-mono text-lg font-bold text-primary">
                      {result.pensionDate}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-accent text-center mb-6">
                  <p className="text-secondary text-sm mb-2">Time Until Pension</p>
                  <p className="font-mono text-xl font-bold text-accent">
                    {result.yearsUntil} years, {result.monthsUntil} months, {result.daysRemaining} days
                  </p>
                </div>
              </>
            ) : (
              <div className="p-4 bg-green-50 rounded-lg border border-green-300 text-center mb-6">
                <p className="text-green-700 font-bold">
                  You have reached state pension age
                </p>
                <p className="text-secondary text-sm mt-2">
                  You can claim your state pension from {result.pensionDate}
                </p>
              </div>
            )}
          </Card>

          {/* Weekly Payment */}
          <Card className="p-6 bg-surface">
            <h3 className="font-heading text-xl font-bold text-primary mb-6">
              2025/26 Full State Pension Amount
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Per Week</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.weeklyAmount}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Per Month (average)</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.monthlyAmount}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-border">
                <p className="text-secondary text-sm mb-2">Per Year</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  £{result.annualAmount}
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg border border-border text-xs text-secondary">
              <p className="font-bold mb-2">Important:</p>
              <p>This is the full state pension amount for 2025/26. The amount you receive depends on your National Insurance contribution record. Most people need 35 qualifying years of contributions for the full amount.</p>
            </div>
          </Card>

          {/* Pension Age Rules */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              State Pension Age Rules
            </h3>

            <div className="space-y-3 text-sm text-secondary">
              <div className="pb-3 border-b border-border">
                <p className="font-bold text-primary mb-1">Born before 6 April 1950</p>
                <p>Pension age: Already reached (age 75 in 2025)</p>
              </div>

              <div className="pb-3 border-b border-border">
                <p className="font-bold text-primary mb-1">Born 6 April 1950 to 5 April 1951</p>
                <p>Pension age: 66</p>
              </div>

              <div className="pb-3 border-b border-border">
                <p className="font-bold text-primary mb-1">Born 6 April 1951 to 5 April 1977</p>
                <p>Pension age: Between 66 and 67 (graduated increases based on exact birth date)</p>
              </div>

              <div className="pb-3 border-b border-border">
                <p className="font-bold text-primary mb-1">Born 6 April 1977 to 5 April 1993</p>
                <p>Pension age: 67</p>
              </div>

              <div>
                <p className="font-bold text-primary mb-1">Born 6 April 1993 onwards</p>
                <p>Pension age: 68</p>
              </div>
            </div>
          </Card>

          {/* Key Points */}
          <Card className="p-6 bg-white border border-border">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Key Points
            </h3>

            <ul className="text-sm text-secondary space-y-2 list-disc list-inside">
              <li>You must have paid National Insurance contributions</li>
              <li>You need 35 qualifying years for the full amount</li>
              <li>You can defer your pension and receive a higher amount later</li>
              <li>Deferring for a year gives approximately 5.8% increase</li>
              <li>You must apply for your state pension; it doesn't start automatically</li>
              <li>Check your National Insurance record online at gov.uk</li>
              <li>The state pension age may increase in the future</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
