'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function AustraliaPenaltyRateCalculator() {
  const [config, setConfig] = useState({
    baseRate: '25',
    weekdayHours: '0',
    saturdayHours: '0',
    sundayHours: '0',
    publicHolidayHours: '0',
    eveningShiftHours: '0',
    employmentType: 'casual',
  });

  const results = useMemo(() => {
    const baseRate = parseFloat(config.baseRate) || 0;
    const weekdayHrs = parseFloat(config.weekdayHours) || 0;
    const saturdayHrs = parseFloat(config.saturdayHours) || 0;
    const sundayHrs = parseFloat(config.sundayHours) || 0;
    const pubHolHrs = parseFloat(config.publicHolidayHours) || 0;
    const eveningHrs = parseFloat(config.eveningShiftHours) || 0;

    let saturdayRate = 1.5; // 150% for casual
    let sundayRate = 1.75; // 175% for casual
    let publicHolidayRate = 2.5; // 250%
    let eveningLoadingRate = 0.15; // 15% loading

    if (config.employmentType === 'permanent') {
      saturdayRate = 1.25; // 125% for permanent
      sundayRate = 2.0; // 200% for permanent
    }

    const weekdayPay = weekdayHrs * baseRate;
    const saturdayPay = saturdayHrs * baseRate * saturdayRate;
    const sundayPay = sundayHrs * baseRate * sundayRate;
    const publicHolidayPay = pubHolHrs * baseRate * publicHolidayRate;

    // Evening loading applied on top of base or other penalties
    let eveningPay = 0;
    if (eveningHrs > 0) {
      // Evening loading is typically added to the base rate
      eveningPay = eveningHrs * baseRate * (1 + eveningLoadingRate);
    }

    const totalGrossPay =
      weekdayPay + saturdayPay + sundayPay + publicHolidayPay + eveningPay;

    const breakdown = [
      {
        category: 'Weekday hours',
        hours: weekdayHrs,
        rate: baseRate,
        multiplier: '1.0x',
        amount: weekdayPay,
      },
      {
        category: `Saturday hours (${config.employmentType === 'casual' ? '150%' : '125%'})`,
        hours: saturdayHrs,
        rate: baseRate,
        multiplier: `${(saturdayRate * 100).toFixed(0)}%`,
        amount: saturdayPay,
      },
      {
        category: `Sunday hours (${config.employmentType === 'casual' ? '175%' : '200%'})`,
        hours: sundayHrs,
        rate: baseRate,
        multiplier: `${(sundayRate * 100).toFixed(0)}%`,
        amount: sundayPay,
      },
      {
        category: 'Public holiday hours (250%)',
        hours: pubHolHrs,
        rate: baseRate,
        multiplier: '250%',
        amount: publicHolidayPay,
      },
      {
        category: `Evening shift loading (${(eveningLoadingRate * 100).toFixed(0)}%)`,
        hours: eveningHrs,
        rate: baseRate,
        multiplier: `${((1 + eveningLoadingRate) * 100).toFixed(0)}%`,
        amount: eveningPay,
      },
    ];

    const totalHours = weekdayHrs + saturdayHrs + sundayHrs + pubHolHrs + eveningHrs;

    return {
      totalGrossPay,
      totalHours,
      breakdown: breakdown.filter((item) => item.hours > 0),
      baseRate,
      employmentType: config.employmentType,
    };
  }, [config]);

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-semibold text-primary mb-4">
          Your Information
        </h2>

        <div className="space-y-4">
          <Input
            label="Base Hourly Rate (AUD)"
            type="number"
            value={config.baseRate}
            onChange={(e) => setConfig({ ...config, baseRate: e.target.value })}
            placeholder="e.g., 25.00"
            step="0.01"
            helperText="Your ordinary hourly rate (before penalties)"
          />

          <Select
            label="Employment Type"
            value={config.employmentType}
            onChange={(e) => setConfig({ ...config, employmentType: e.target.value })}
            options={[
              { value: 'casual', label: 'Casual (higher weekend rates)' },
              { value: 'permanent', label: 'Permanent/Full-time' },
            ]}
            helperText="Penalty rates vary for casual vs permanent employees"
          />

          <div className="pt-4 border-t border-border">
            <h3 className="font-medium text-primary mb-3">Hours Worked This Period</h3>

            <Input
              label="Weekday Hours (Mon-Fri)"
              type="number"
              value={config.weekdayHours}
              onChange={(e) => setConfig({ ...config, weekdayHours: e.target.value })}
              placeholder="0"
              step="0.5"
            />

            <Input
              label="Saturday Hours"
              type="number"
              value={config.saturdayHours}
              onChange={(e) => setConfig({ ...config, saturdayHours: e.target.value })}
              placeholder="0"
              step="0.5"
              className="mt-3"
            />

            <Input
              label="Sunday Hours"
              type="number"
              value={config.sundayHours}
              onChange={(e) => setConfig({ ...config, sundayHours: e.target.value })}
              placeholder="0"
              step="0.5"
              className="mt-3"
            />

            <Input
              label="Public Holiday Hours"
              type="number"
              value={config.publicHolidayHours}
              onChange={(e) => setConfig({ ...config, publicHolidayHours: e.target.value })}
              placeholder="0"
              step="0.5"
              className="mt-3"
            />

            <Input
              label="Evening Shift Hours (typically 6pm-midnight)"
              type="number"
              value={config.eveningShiftHours}
              onChange={(e) => setConfig({ ...config, eveningShiftHours: e.target.value })}
              placeholder="0"
              step="0.5"
              className="mt-3"
            />
          </div>
        </div>
      </Card>

      <Card className="bg-accent-muted border border-accent">
        <h2 className="font-heading text-2xl font-bold text-accent mb-2">
          Total Gross Pay
        </h2>
        <p className="text-4xl font-mono font-bold text-primary">
          ${results.totalGrossPay.toFixed(2)}
        </p>
        <p className="text-secondary mt-2">
          for <span className="font-medium">{results.totalHours.toFixed(1)}</span> hours worked
        </p>
      </Card>

      {results.breakdown.length > 0 && (
        <Card>
          <h3 className="font-heading font-semibold text-primary mb-4">Pay Breakdown</h3>
          <div className="space-y-3">
            {results.breakdown.map((item, idx) => (
              <div key={idx} className="border-b border-border pb-3 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-primary">{item.category}</p>
                    <p className="text-sm text-secondary">
                      {item.hours.toFixed(1)} hrs @ ${item.rate.toFixed(2)}/hr x {item.multiplier}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-accent">
                    ${item.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t-2 border-accent flex justify-between items-center">
              <span className="font-medium text-primary">Total</span>
              <span className="font-mono text-xl font-bold text-accent">
                ${results.totalGrossPay.toFixed(2)}
              </span>
            </div>
          </div>
        </Card>
      )}

      <Card className="bg-blue-50 border border-blue-200">
        <h3 className="font-heading font-semibold text-primary mb-3">Penalty Rates Explained</h3>
        <div className="space-y-3 text-sm text-secondary">
          <div>
            <p className="font-medium text-primary mb-1">Saturday</p>
            <p className="ml-2">
              Casual: 150% of base rate | Permanent: 125% of base rate
            </p>
          </div>
          <div>
            <p className="font-medium text-primary mb-1">Sunday</p>
            <p className="ml-2">
              Casual: 175% of base rate | Permanent: 200% of base rate
            </p>
          </div>
          <div>
            <p className="font-medium text-primary mb-1">Public Holiday</p>
            <p className="ml-2">
              250% of base rate (applies to all employment types)
            </p>
          </div>
          <div>
            <p className="font-medium text-primary mb-1">Evening Shift (approx 6pm-midnight)</p>
            <p className="ml-2">
              15-25% loading on top of base rate (varies by award)
            </p>
          </div>
          <p className="mt-3 italic text-secondary">
            Note: These are General Retail Industry Award rates. Your actual rates may vary depending on your specific employment award or agreement. Check your award or enterprise agreement for accurate rates.
          </p>
        </div>
      </Card>

      <Card className="bg-amber-50 border border-amber-200">
        <h3 className="font-heading font-semibold text-primary mb-3">Casual vs Permanent</h3>
        <div className="space-y-3 text-sm text-secondary">
          <div>
            <p className="font-medium text-primary mb-1">Casual Employees</p>
            <ul className="ml-4 space-y-1">
              <li>- Higher weekend penalty rates (compensation for no job security)</li>
              <li>- 25% casual loading included in base rate</li>
              <li>- Saturday: 150% | Sunday: 175%</li>
            </ul>
          </div>
          <div className="mt-3">
            <p className="font-medium text-primary mb-1">Permanent Employees</p>
            <ul className="ml-4 space-y-1">
              <li>- Lower weekend penalty rates</li>
              <li>- Guaranteed ongoing work and benefits</li>
              <li>- Saturday: 125% | Sunday: 200%</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="bg-green-50 border border-green-200">
        <h3 className="font-heading font-semibold text-primary mb-3">Important Notes</h3>
        <ul className="space-y-2 text-sm text-secondary">
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Penalty rates vary significantly by industry award (retail, hospitality, nursing, etc.). This calculator uses retail rates as an example.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Check your employment award or enterprise agreement for your exact rates.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Some roles have shift allowances or incentives on top of penalty rates.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Tax, super, and other deductions are not included in this gross figure.</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
