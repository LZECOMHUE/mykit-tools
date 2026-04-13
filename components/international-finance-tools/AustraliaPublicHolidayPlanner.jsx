'use client';

import { useState, useMemo } from 'react';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function AustraliaPublicHolidayPlanner() {
  const [config, setConfig] = useState({
    state: 'nsw',
    year: '2026',
  });

  const getPublicHolidays = (state, year) => {
    const yearNum = parseInt(year);

    // Helper: determine Easter Sunday (Computus algorithm simplified)
    const getEasterSunday = (y) => {
      const a = y % 19;
      const b = Math.floor(y / 100);
      const c = y % 100;
      const d = Math.floor(b / 4);
      const e = b % 4;
      const f = Math.floor((b + 8) / 25);
      const g = Math.floor((b - f + 1) / 3);
      const h = (19 * a + b - d - g + 15) % 30;
      const i = Math.floor(c / 4);
      const k = c % 4;
      const l = (32 + 2 * e + 2 * i - h - k) % 7;
      const m = Math.floor((a + 11 * h + 22 * l) / 451);
      const month = Math.floor((h + l - 7 * m + 114) / 31);
      const day = ((h + l - 7 * m + 114) % 31) + 1;
      return new Date(y, month - 1, day);
    };

    const easterSunday = getEasterSunday(yearNum);
    const goodFridayDate = new Date(easterSunday);
    goodFridayDate.setDate(goodFridayDate.getDate() - 2);
    const easterSaturdayDate = new Date(easterSunday);
    easterSaturdayDate.setDate(easterSaturdayDate.getDate() - 1);
    const easterMondayDate = new Date(easterSunday);
    easterMondayDate.setDate(easterMondayDate.getDate() + 1);

    // Format date as "Mon, DD Mon"
    const formatDate = (date) => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
    };

    const national = [
      { name: 'New Year\'s Day', date: formatDate(new Date(yearNum, 0, 1)) },
      { name: 'Australia Day', date: formatDate(new Date(yearNum, 0, 26)) },
      { name: 'Good Friday', date: formatDate(goodFridayDate) },
      { name: 'Easter Saturday', date: formatDate(easterSaturdayDate), stateOnly: 'most' },
      { name: 'Easter Monday', date: formatDate(easterMondayDate) },
      { name: 'ANZAC Day', date: formatDate(new Date(yearNum, 3, 25)) },
      { name: 'Christmas Day', date: formatDate(new Date(yearNum, 11, 25)) },
      { name: 'Boxing Day', date: formatDate(new Date(yearNum, 11, 26)) },
    ];

    // Queen's Birthday varies by state
    const getQueensBirthdayDate = (st) => {
      if (st === 'wa') return formatDate(new Date(yearNum, 5, 1)); // WA: first Mon in June
      if (st === 'qld') return formatDate(new Date(yearNum, 9, 1)); // QLD: first Mon in Oct
      // Most states: second Mon in June
      const june1 = new Date(yearNum, 5, 1);
      const firstMonday = 1 + (8 - june1.getDay());
      const secondMonday = firstMonday + 7;
      return formatDate(new Date(yearNum, 5, secondMonday));
    };

    let stateHolidays = [];

    if (state === 'nsw') {
      stateHolidays = [
        { name: "Bank Holiday (NSW) - Financial sector only", date: formatDate(new Date(yearNum, 7, 1)), category: 'special' }, // First Mon in Aug
      ];
    } else if (state === 'vic') {
      stateHolidays = [
        {
          name: 'Melbourne Cup Day (metropolitan areas only)',
          date: formatDate(new Date(yearNum, 10, 1)),
          category: 'regional',
        }, // First Tue in Nov
      ];
    } else if (state === 'qld') {
      stateHolidays = [
        {
          name: 'Royal Queensland Show (Brisbane region only)',
          date: formatDate(new Date(yearNum, 7, 1)),
          category: 'regional',
        }, // Aug (varies by region)
      ];
    } else if (state === 'sa') {
      stateHolidays = [
        { name: 'Adelaide Cup Day', date: formatDate(new Date(yearNum, 2, 1)), category: 'regional' }, // Mar
        { name: 'Proclamation Day', date: formatDate(new Date(yearNum, 11, 26)) },
      ];
    } else if (state === 'wa') {
      stateHolidays = [
        { name: 'Western Australia Day', date: formatDate(new Date(yearNum, 5, 1)) },
      ];
    } else if (state === 'tas') {
      stateHolidays = [
        {
          name: 'Recreation Day (northern Tasmania only)',
          date: formatDate(new Date(yearNum, 10, 1)),
          category: 'regional',
        }, // First Mon in Nov
      ];
    } else if (state === 'nt') {
      stateHolidays = [
        { name: 'May Day', date: formatDate(new Date(yearNum, 4, 1)) },
        { name: 'Picnic Day (first Mon in Aug)', date: formatDate(new Date(yearNum, 7, 1)) },
        // Show Day varies by region, approximate to mid-July
        { name: 'Show Day (approx mid-July)', date: formatDate(new Date(yearNum, 6, 15)), category: 'regional' },
      ];
    } else if (state === 'act') {
      stateHolidays = [
        { name: 'Canberra Day', date: formatDate(new Date(yearNum, 2, 1)) }, // Mar
        { name: 'Reconciliation Day (first Mon in May)', date: formatDate(new Date(yearNum, 4, 1)) },
        { name: 'Family & Community Day (last Mon in Sept)', date: formatDate(new Date(yearNum, 8, 1)), category: 'variable' },
      ];
    }

    const queensBirthdayDate = getQueensBirthdayDate(state);
    stateHolidays.push({
      name: `Queen's Birthday (${state === 'wa' ? 'June' : state === 'qld' ? 'October' : 'June'})`,
      date: queensBirthdayDate,
    });

    return {
      national,
      stateSpecific: stateHolidays.filter((h) => h.name !== `Queen's Birthday (${state === 'wa' ? 'June' : state === 'qld' ? 'October' : 'June'})`),
      queensBirthday: stateHolidays.find(
        (h) =>
          h.name ===
          `Queen's Birthday (${state === 'wa' ? 'June' : state === 'qld' ? 'October' : 'June'})`
      ),
    };
  };

  const holidays = useMemo(() => getPublicHolidays(config.state, config.year), [config]);

  const stateNames = {
    nsw: 'New South Wales',
    vic: 'Victoria',
    qld: 'Queensland',
    sa: 'South Australia',
    wa: 'Western Australia',
    tas: 'Tasmania',
    nt: 'Northern Territory',
    act: 'Australian Capital Territory',
  };

  const leaveMaximiserTips = {
    nsw: [
      'Take 3 days around Easter (Good Fri + Sat + Mon = 4 days off)',
      'Take 1 day before ANZAC (Fri) if it falls on Sat: 3 days off',
      'Take Christmas Eve: bridges to 4-day break',
    ],
    vic: [
      'Take 3 days around Easter',
      'Take 1 day before Melbourne Cup (if on Tue) = 3 days off',
      'Take Dec 24-27 for 6 days off (includes Boxing Day)',
    ],
    qld: [
      'Take 3 days around Easter',
      'Take Oct 7 (before Queen\'s Birthday) for 4 days off',
      'Take Dec 24 and 27 for 6 days off',
    ],
    sa: [
      'Take 3 days around Easter',
      'Take Mar 9 (before Adelaide Cup) for 4 days off if Cup is Mon',
      'Take Dec 24 and 27 for 6 days off',
    ],
    wa: [
      'Take 3 days around Easter',
      'Take Jun 2 (after Queen\'s Birthday Mon) = 3 days off',
      'Take Dec 24 and 27 for 6 days off',
    ],
    tas: [
      'Take 3 days around Easter',
      'Take Nov 2-3 around Recreation Day for 4 days off',
      'Take Dec 24 and 27 for 6 days off',
    ],
    nt: [
      'Take 3 days around Easter',
      'Take May 2 (after May Day Mon) = 3 days',
      'Take Dec 24 and 27 for 6 days off',
    ],
    act: [
      'Take 3 days around Easter',
      'Take Mar 2 (after Canberra Day Mon) = 3 days',
      'Take Dec 24 and 27 for 6 days off',
    ],
  };

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-semibold text-primary mb-4">
          Select Your Location
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="State or Territory"
            value={config.state}
            onChange={(e) => setConfig({ ...config, state: e.target.value })}
            options={[
              { value: 'nsw', label: 'New South Wales (NSW)' },
              { value: 'vic', label: 'Victoria (VIC)' },
              { value: 'qld', label: 'Queensland (QLD)' },
              { value: 'sa', label: 'South Australia (SA)' },
              { value: 'wa', label: 'Western Australia (WA)' },
              { value: 'tas', label: 'Tasmania (TAS)' },
              { value: 'nt', label: 'Northern Territory (NT)' },
              { value: 'act', label: 'Australian Capital Territory (ACT)' },
            ]}
          />

          <Select
            label="Year"
            value={config.year}
            onChange={(e) => setConfig({ ...config, year: e.target.value })}
            options={[
              { value: '2024', label: '2024' },
              { value: '2025', label: '2025' },
              { value: '2026', label: '2026' },
              { value: '2027', label: '2027' },
            ]}
          />
        </div>
      </Card>

      <Card className="bg-accent-muted border border-accent">
        <h2 className="font-heading text-2xl font-bold text-accent mb-2">
          {stateNames[config.state]} - {config.year}
        </h2>
        <p className="text-secondary">
          {holidays.national.length + holidays.stateSpecific.length + (holidays.queensBirthday ? 1 : 0)} public holidays
        </p>
      </Card>

      <Card>
        <h3 className="font-heading font-semibold text-primary mb-4">National Public Holidays</h3>
        <div className="space-y-2">
          {holidays.national.map((holiday, idx) => (
            <div key={idx} className="flex justify-between items-center pb-2 border-b border-border last:border-b-0">
              <span className="text-secondary">{holiday.name}</span>
              <span className="font-mono text-sm text-primary font-medium">{holiday.date}</span>
            </div>
          ))}
        </div>
      </Card>

      {holidays.queensBirthday && (
        <Card className="bg-blue-50 border border-blue-200">
          <h3 className="font-heading font-semibold text-primary mb-4">
            State-Specific: Queen's Birthday
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-secondary">{holidays.queensBirthday.name}</span>
            <span className="font-mono text-sm text-primary font-medium">
              {holidays.queensBirthday.date}
            </span>
          </div>
        </Card>
      )}

      {holidays.stateSpecific.length > 0 && (
        <Card>
          <h3 className="font-heading font-semibold text-primary mb-4">
            State/Territory-Specific Holidays
          </h3>
          <div className="space-y-2">
            {holidays.stateSpecific.map((holiday, idx) => (
              <div
                key={idx}
                className={`pb-2 border-b border-border last:border-b-0 flex justify-between items-start`}
              >
                <div>
                  <p className="text-secondary font-medium">{holiday.name}</p>
                  {holiday.category === 'regional' && (
                    <p className="text-xs text-muted mt-1">Regional variation - not statewide</p>
                  )}
                </div>
                <span className="font-mono text-sm text-primary font-medium flex-shrink-0 ml-2">
                  {holiday.date}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="bg-green-50 border border-green-200">
        <h3 className="font-heading font-semibold text-primary mb-3">Leave Maximiser Tips</h3>
        <p className="text-sm text-secondary mb-3">
          Here's how to get the most days off with minimal leave taken:
        </p>
        <ul className="space-y-2 text-sm text-secondary">
          {(leaveMaximiserTips[config.state] || []).map((tip, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-accent font-bold flex-shrink-0">+</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="bg-amber-50 border border-amber-200">
        <h3 className="font-heading font-semibold text-primary mb-3">Important Notes</h3>
        <ul className="space-y-2 text-sm text-secondary">
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Some holidays vary by region. Confirm with your employer.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>If a public holiday falls on a weekend, there may be a substitute day on Monday (varies by state).</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Banking and financial sectors may have different holiday rules.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Emergency services and essential services may not observe all public holidays.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Retail may require shift penalties rather than the day off.</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
