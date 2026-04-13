'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';

export default function BankHolidayChecker() {
  const [holidays, setHolidays] = useState([]);
  const [region, setRegion] = useState('england-and-wales');
  const [nextHoliday, setNextHoliday] = useState(null);
  const [daysUntil, setDaysUntil] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const regions = [
    { value: 'england-and-wales', label: 'England & Wales' },
    { value: 'scotland', label: 'Scotland' },
    { value: 'northern-ireland', label: 'Northern Ireland' },
  ];

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await fetch('https://www.gov.uk/bank-holidays.json');
        const data = await res.json();

        const regionKey = region === 'england-and-wales' ? 'england-and-wales' :
                         region === 'scotland' ? 'scotland' : 'northern-ireland';

        const regionHolidays = data[regionKey].events;
        setHolidays(regionHolidays);

        // Find next holiday
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = regionHolidays.find(h => new Date(h.date) >= today);
        if (upcoming) {
          setNextHoliday(upcoming);
          const diff = Math.ceil((new Date(upcoming.date) - today) / (1000 * 60 * 60 * 24));
          setDaysUntil(diff);
        }
      } catch (err) {
        setError('Failed to load bank holidays');
      }
      setLoading(false);
    };

    fetchHolidays();
  }, [region]);

  const currentYear = new Date().getFullYear();
  const currentYearHolidays = holidays.filter(h => new Date(h.date).getFullYear() === currentYear);

  if (loading) return <Card><p className="text-secondary">Loading bank holidays...</p></Card>;
  if (error) return <Card><p className="text-red-600">{error}</p></Card>;

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Select region
          </label>
          <Select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            options={regions}
          />
        </div>

        {nextHoliday && (
          <div className="p-4 bg-accent-muted border-2 border-accent rounded-lg">
            <p className="text-sm text-secondary mb-2">Next bank holiday</p>
            <h3 className="font-heading text-xl font-bold text-accent mb-2">
              {nextHoliday.title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold text-accent">
                {daysUntil}
              </span>
              <span className="text-secondary">
                day{daysUntil !== 1 ? 's' : ''} away
              </span>
            </div>
            <p className="text-sm text-secondary mt-2">
              {new Date(nextHoliday.date).toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}

        {currentYearHolidays.length > 0 && (
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-3">
              Bank holidays for {currentYear}
            </h3>
            <div className="space-y-2">
              {currentYearHolidays.map((holiday, idx) => {
                const holidayDate = new Date(holiday.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isPast = holidayDate < today;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border ${
                      isPast
                        ? 'bg-surface border-border opacity-50'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`font-medium ${isPast ? 'text-secondary' : 'text-primary'}`}>
                          {holiday.title}
                        </p>
                        <p className="text-xs text-secondary mt-1">
                          {holidayDate.toLocaleDateString('en-GB', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      {!isPast && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          Upcoming
                        </span>
                      )}
                      {isPast && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                          Past
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
