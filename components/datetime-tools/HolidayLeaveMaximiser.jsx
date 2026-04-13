'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

// UK Bank Holidays for 2024-2026
const BANK_HOLIDAYS = {
  2024: [
    { date: '2024-01-01', name: 'New Year\'s Day', all: true },
    { date: '2024-03-29', name: 'Good Friday', all: true },
    { date: '2024-04-01', name: 'Easter Monday', all: true },
    { date: '2024-05-06', name: 'Early May Bank Holiday', all: true },
    { date: '2024-05-27', name: 'Spring Bank Holiday', all: true },
    { date: '2024-08-26', name: 'Summer Bank Holiday', all: true },
    { date: '2024-12-25', name: 'Christmas Day', all: true },
    { date: '2024-12-26', name: 'Boxing Day', all: true },
  ],
  2025: [
    { date: '2025-01-01', name: 'New Year\'s Day', all: true },
    { date: '2025-04-18', name: 'Good Friday', all: true },
    { date: '2025-04-21', name: 'Easter Monday', all: true },
    { date: '2025-05-05', name: 'Early May Bank Holiday', all: true },
    { date: '2025-05-26', name: 'Spring Bank Holiday', all: true },
    { date: '2025-08-25', name: 'Summer Bank Holiday', all: true },
    { date: '2025-12-25', name: 'Christmas Day', all: true },
    { date: '2025-12-26', name: 'Boxing Day', all: true },
  ],
  2026: [
    { date: '2026-01-01', name: 'New Year\'s Day', all: true },
    { date: '2026-04-10', name: 'Good Friday', all: true },
    { date: '2026-04-13', name: 'Easter Monday', all: true },
    { date: '2026-05-04', name: 'Early May Bank Holiday', all: true },
    { date: '2026-05-25', name: 'Spring Bank Holiday', all: true },
    { date: '2026-08-31', name: 'Summer Bank Holiday', all: true },
    { date: '2026-12-25', name: 'Christmas Day', all: true },
    { date: '2026-12-26', name: 'Boxing Day', all: true },
  ],
};

const getScottishHolidays = (year) => {
  const baseHolidays = BANK_HOLIDAYS[year] || [];
  return baseHolidays.filter(h => h.all).map(h => h.date);
};

export default function HolidayLeaveMaximiser() {
  const [annualLeaveDays, setAnnualLeaveDays] = useState(25);
  const [year, setYear] = useState(2025);
  const [region, setRegion] = useState('england');

  const holidays = useMemo(() => {
    const bankHols = BANK_HOLIDAYS[year] || [];
    const workingDays = bankHols.map(h => h.date);
    return workingDays;
  }, [year]);

  // Calculate best leave blocks
  const getLeaveRecommendations = () => {
    const recommendations = [];
    const holidaySet = new Set(holidays);

    // Find consecutive non-holiday weekdays and recommend taking leave before/after holidays
    for (let i = 0; i < holidays.length; i++) {
      const holiday = new Date(holidays[i]);
      const dayOfWeek = holiday.getDay();

      // If holiday is on Friday, suggest taking Thursday (4 day weekend)
      if (dayOfWeek === 5) {
        const thursday = new Date(holiday);
        thursday.setDate(thursday.getDate() - 1);
        recommendations.push({
          date: thursday.toISOString().split('T')[0],
          reason: `Take this day off before ${BANK_HOLIDAYS[year].find(h => h.date === holidays[i])?.name}`,
          leverage: 1,
          days: 1,
        });
      }

      // If holiday is on Monday, suggest taking Friday before (4 day weekend)
      if (dayOfWeek === 1 && i > 0) {
        const friday = new Date(holiday);
        friday.setDate(friday.getDate() - 3);
        recommendations.push({
          date: friday.toISOString().split('T')[0],
          reason: `Take Friday before ${BANK_HOLIDAYS[year].find(h => h.date === holidays[i])?.name}`,
          leverage: 1,
          days: 1,
        });
      }
    }

    // Christmas break strategy
    const christmasDay = new Date(`${year}-12-25`);
    if (christmasDay.getDay() !== 0) { // Not Sunday
      recommendations.push({
        date: `${year}-12-23 to ${year}-12-24`,
        reason: 'Take Dec 23-24 for a 9-day break (with weekends and bank holidays)',
        leverage: 4,
        days: 2,
      });
    }

    // Easter break
    const easterDates = BANK_HOLIDAYS[year].filter(h => h.name.includes('Easter'));
    if (easterDates.length > 0) {
      recommendations.push({
        date: `${year}-04-14 to ${year}-04-18`,
        reason: 'Take days around Easter for maximum consecutive time off',
        leverage: 3,
        days: 3,
      });
    }

    return recommendations;
  };

  const recommendations = getLeaveRecommendations();
  const bankHolidayCount = holidays.length;

  const regions = [
    { value: 'england', label: 'England' },
    { value: 'scotland', label: 'Scotland' },
    { value: 'wales', label: 'Wales' },
    { value: 'ni', label: 'Northern Ireland' },
  ];

  const years = [
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4">
      {/* Settings */}
      <Card className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Annual leave days"
            type="number"
            min={1}
            max={50}
            value={annualLeaveDays}
            onChange={(e) => setAnnualLeaveDays(Number(e.target.value))}
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Year</label>
            <Select
              options={years}
              value={String(year)}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Region</label>
            <Select
              options={regions}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="bg-success/5 border-success/30">
          <p className="text-xs text-text-secondary mb-1">Bank Holidays</p>
          <p className="font-heading text-3xl font-bold text-success">{bankHolidayCount}</p>
        </Card>

        <Card className="bg-accent/5 border-accent/30">
          <p className="text-xs text-text-secondary mb-1">Annual Leave Days</p>
          <p className="font-heading text-3xl font-bold text-accent">{annualLeaveDays}</p>
        </Card>

        <Card className="bg-info/5 border-info/20">
          <p className="text-xs text-text-secondary mb-1">Total Days Off Possible</p>
          <p className="font-heading text-3xl font-bold text-info">
            {bankHolidayCount + annualLeaveDays + 104}
          </p>
          <p className="text-xs text-text-secondary mt-1">(includes weekends)</p>
        </Card>
      </div>

      {/* Best Value Leave Blocks */}
      <Card className="mb-4">
        <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
          Best Value Leave Blocks
        </h3>

        <div className="space-y-3">
          {recommendations.length > 0 ? (
            recommendations.map((rec, idx) => (
              <div key={idx} className="p-4 bg-surface rounded-lg border border-accent/20">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-text-primary">{rec.date}</p>
                    <p className="text-xs text-text-secondary mt-1">{rec.reason}</p>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/30">
                    Take {rec.days} days, get {rec.leverage + rec.days} off
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="text-text-secondary text-sm">No specific recommendations for this year.</p>
          )}
        </div>
      </Card>

      {/* Bank Holidays List */}
      <Card>
        <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
          Bank Holidays in {year}
        </h3>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {BANK_HOLIDAYS[year]?.map((holiday, idx) => {
            const date = new Date(holiday.date);
            const dateStr = new Intl.DateTimeFormat('en-GB', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            }).format(date);

            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-surface rounded-lg"
              >
                <div>
                  <p className="font-medium text-text-primary">{holiday.name}</p>
                  <p className="text-xs text-text-secondary">{dateStr}</p>
                </div>
                <Badge variant="secondary">{date.toLocaleDateString('en-GB', { weekday: 'short' })}</Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Strategy Tips */}
      <Card className="mt-6 bg-info/5 border-info/20">
        <h3 className="text-sm font-medium text-text-primary mb-2">Top Tips</h3>
        <ul className="text-xs text-text-secondary space-y-1 list-disc list-inside">
          <li>Use Friday or Monday take the day off adjacent to bank holidays for 4-day weekends</li>
          <li>Plan Christmas leave in December for maximum consecutive time off</li>
          <li>Check if your employer offers flexible leave for better planning</li>
          <li>Consider off-peak travel dates to maximize value of your time off</li>
        </ul>
      </Card>
    </div>
  );
}
