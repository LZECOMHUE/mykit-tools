'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [region, setRegion] = useState('england-and-wales');
  const [holidays, setHolidays] = useState([]);
  const [results, setResults] = useState(null);
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
        const regionHolidays = data[region].events.map(e => e.date);
        setHolidays(regionHolidays);
      } catch (err) {
        console.error('Failed to load holidays');
      }
    };

    fetchHolidays();
  }, [region]);

  const calculate = () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setError('Start date must be before end date');
      return;
    }

    setError('');

    let workingDays = 0;
    let weekendDays = 0;
    let bankHolidaysInRange = 0;
    const holidaySet = new Set(holidays);
    const current = new Date(start);

    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      const dayOfWeek = current.getDay();

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekend
        weekendDays++;
      } else if (holidaySet.has(dateStr)) {
        // Bank holiday
        bankHolidaysInRange++;
      } else {
        // Working day
        workingDays++;
      }

      current.setDate(current.getDate() + 1);
    }

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const netWorkingDays = workingDays;

    setResults({
      totalDays,
      weekendDays,
      bankHolidaysInRange,
      workingDays,
      netWorkingDays
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') calculate();
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Start date
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              End date
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Region (for bank holidays)
          </label>
          <Select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            options={regions}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={calculate}
          disabled={!startDate || !endDate}
          className="w-full"
        >
          Calculate
        </Button>

        {results && (
          <div className="space-y-4">
            <div className="p-4 bg-accent-muted border border-accent rounded-lg">
              <p className="text-sm text-secondary mb-1">Net working days</p>
              <p className="font-mono text-3xl font-bold text-accent">
                {results.netWorkingDays}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-surface border border-border rounded-lg">
                <p className="text-xs font-medium text-secondary mb-1 uppercase">Total days</p>
                <p className="font-mono text-2xl font-bold text-primary">{results.totalDays}</p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-medium text-blue-700 mb-1 uppercase">Weekend days</p>
                <p className="font-mono text-2xl font-bold text-blue-600">{results.weekendDays}</p>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs font-medium text-green-700 mb-1 uppercase">Bank holidays</p>
                <p className="font-mono text-2xl font-bold text-green-600">{results.bankHolidaysInRange}</p>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-xs font-medium text-purple-700 mb-1 uppercase">Working days</p>
                <p className="font-mono text-2xl font-bold text-purple-600">{results.workingDays}</p>
              </div>
            </div>

            <div className="text-sm text-secondary text-center">
              <p className="font-medium mb-1">Calculation breakdown:</p>
              <p>{results.totalDays} total - {results.weekendDays} weekend - {results.bankHolidaysInRange} holidays = {results.netWorkingDays} working days</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
