'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function PeriodTracker() {
  const [periods, setPeriods] = useState([]);
  const [periodDuration, setPeriodDuration] = useState(5);
  const [startDate, setStartDate] = useState('');
  const [results, setResults] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('periodTrackerData');
    if (saved) {
      const data = JSON.parse(saved);
      setPeriods(data.periods || []);
      setPeriodDuration(data.periodDuration || 5);
    }
    setLoaded(true);
  }, []);

  // Save to localStorage whenever periods or duration change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('periodTrackerData', JSON.stringify({
        periods,
        periodDuration,
      }));
    }
  }, [periods, periodDuration, loaded]);

  const addPeriod = () => {
    if (!startDate) {
      alert('Please select a period start date');
      return;
    }

    if (periods.includes(startDate)) {
      alert('This date is already logged');
      return;
    }

    const newPeriods = [...periods, startDate].sort();
    setPeriods(newPeriods);
    setStartDate('');
    calculateCycleStats(newPeriods);
  };

  const removePeriod = (date) => {
    const newPeriods = periods.filter(p => p !== date);
    setPeriods(newPeriods);
    if (newPeriods.length >= 2) {
      calculateCycleStats(newPeriods);
    } else {
      setResults(null);
    }
  };

  const calculateCycleStats = (periodList) => {
    if (periodList.length < 2) {
      setResults(null);
      return;
    }

    const periodDates = periodList.map(p => new Date(p)).sort((a, b) => a - b);
    const cycles = [];

    for (let i = 1; i < periodDates.length; i++) {
      const cycleDays = Math.floor((periodDates[i] - periodDates[i - 1]) / (1000 * 60 * 60 * 24));
      cycles.push(cycleDays);
    }

    const averageCycle = Math.round(cycles.reduce((a, b) => a + b, 0) / cycles.length);
    const minCycle = Math.min(...cycles);
    const maxCycle = Math.max(...cycles);
    const lastPeriod = periodDates[periodDates.length - 1];

    // Calculate next period
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + averageCycle);

    // Calculate next fertile window
    const nextFertileStart = new Date(nextPeriod);
    nextFertileStart.setDate(nextFertileStart.getDate() + averageCycle - 19);

    const nextFertileEnd = new Date(nextPeriod);
    nextFertileEnd.setDate(nextFertileEnd.getDate() + averageCycle - 14);

    // Calculate period end for next period
    const nextPeriodEnd = new Date(nextPeriod);
    nextPeriodEnd.setDate(nextPeriodEnd.getDate() + periodDuration - 1);

    // Regularity assessment
    let regularity = 'Very Regular';
    const variance = maxCycle - minCycle;
    if (variance > 10) {
      regularity = 'Somewhat Irregular';
    } else if (variance > 5) {
      regularity = 'Moderately Regular';
    }

    const today = new Date();
    const daysUntilNextPeriod = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));

    setResults({
      averageCycle,
      minCycle,
      maxCycle,
      variance,
      regularity,
      lastPeriod,
      nextPeriod,
      nextFertileStart,
      nextFertileEnd,
      nextPeriodEnd,
      daysUntilNextPeriod,
      cycleCount: cycles.length,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatFullDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysUntil = (futureDate) => {
    const today = new Date();
    const diff = Math.ceil((futureDate - today) / (1000 * 60 * 60 * 24));
    if (diff < 0) return `${Math.abs(diff)} days ago`;
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `in ${diff} days`;
  };

  const renderCalendar = () => {
    if (!results || periods.length === 0) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

    const monthName = new Date(year, month, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <Card>
        <p className="font-heading font-semibold text-center mb-3">{monthName}</p>

        <div className="grid grid-cols-7 gap-px">
          {dayNames.map((name) => (
            <div key={name} className="text-center text-xs font-medium text-secondary py-1.5">
              {name}
            </div>
          ))}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const date = new Date(year, month, dayNum);
            const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const isToday = date.getTime() === today.getTime();

            let style = 'bg-white border-border text-primary';
            if (periods.includes(dayStr)) {
              style = 'bg-rose-100 text-rose-700 border-rose-200';
            } else if (results.nextFertileStart <= date && date <= results.nextFertileEnd) {
              style = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            } else if (results.nextPeriod <= date && date <= results.nextPeriodEnd) {
              style = 'bg-rose-50 text-rose-500 border-rose-200 border-dashed';
            }

            return (
              <div
                key={dayNum}
                className={`relative flex items-center justify-center rounded-lg border text-sm font-mono h-9 sm:h-10 transition-all ${style} ${isToday ? 'font-bold' : 'font-medium'}`}
              >
                {dayNum}
                {isToday && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-5 h-5 rounded-md bg-rose-100 border border-rose-200 inline-block" />
            <span className="text-secondary">Logged period</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-200 inline-block" />
            <span className="text-secondary">Fertile window</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-5 h-5 rounded-md bg-rose-50 border border-dashed border-rose-200 inline-block" />
            <span className="text-secondary">Predicted period</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-5 h-5 rounded-md bg-white border border-border inline-flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-accent" />
            </span>
            <span className="text-secondary">Today</span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <p className="text-secondary text-sm">
            Log your period start dates to track cycles and predict future periods.
          </p>

          <div>
            <Select
              label="Typical Period Duration (days)"
              options={Array.from({ length: 7 }, (_, i) => ({
                value: (3 + i).toString(),
                label: (3 + i).toString(),
              }))}
              value={periodDuration.toString()}
              onChange={(e) => setPeriodDuration(parseInt(e.target.value))}
            />
          </div>

          <div>
            <Input
              type="date"
              label="Period Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <Button onClick={addPeriod} className="w-full">
            Log Period
          </Button>
        </div>
      </Card>

      {periods.length > 0 && (
        <Card>
          <h3 className="font-heading font-bold mb-3">Logged Periods</h3>
          <div className="space-y-2">
            {periods.map((period) => (
              <div
                key={period}
                className="flex items-center justify-between bg-surface p-3 rounded"
              >
                <p className="font-mono font-semibold text-primary">
                  {formatDate(period)}
                </p>
                <button
                  onClick={() => removePeriod(period)}
                  className="px-3 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <p className="text-secondary text-xs mt-3">
            {periods.length} period{periods.length !== 1 ? 's' : ''} logged
          </p>
        </Card>
      )}

      {results && (
        <div className="space-y-4">
          <Card>
            <h3 className="font-heading font-bold mb-4">Cycle Analysis</h3>
            <div className="space-y-5">
              <div>
                <p className="text-secondary text-xs font-semibold mb-1">REGULARITY</p>
                <p className="font-heading text-lg font-bold text-primary">
                  {results.regularity}
                </p>
                <p className="text-secondary text-sm mt-1">
                  Based on {results.cycleCount} cycle{results.cycleCount !== 1 ? 's' : ''} (variance: {results.variance} days)
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-xs font-semibold mb-2">AVERAGE CYCLE</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-surface p-2 rounded text-center">
                    <p className="text-secondary text-xs mb-1">Min</p>
                    <p className="font-mono font-bold text-primary">{results.minCycle}</p>
                  </div>
                  <div className="bg-surface p-2 rounded text-center">
                    <p className="text-secondary text-xs mb-1">Average</p>
                    <p className="font-mono font-bold text-primary">{results.averageCycle}</p>
                  </div>
                  <div className="bg-surface p-2 rounded text-center">
                    <p className="text-secondary text-xs mb-1">Max</p>
                    <p className="font-mono font-bold text-primary">{results.maxCycle}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-heading font-bold mb-4">Predictions</h3>
            <div className="space-y-5">
              <div>
                <p className="text-secondary text-xs font-semibold mb-1">LAST PERIOD</p>
                <p className="font-mono font-semibold text-primary">
                  {formatFullDate(results.lastPeriod)}
                </p>
              </div>

              <div className="border-t border-border pt-4 bg-red-50 p-3 rounded">
                <p className="text-secondary text-xs font-semibold mb-1">NEXT EXPECTED PERIOD</p>
                <p className="font-mono font-bold text-primary text-lg">
                  {formatFullDate(results.nextPeriod)}
                </p>
                <p className="text-secondary text-sm mt-2">
                  {getDaysUntil(results.nextPeriod)}
                </p>
              </div>

              <div className="border-t border-border pt-4 bg-green-50 p-3 rounded">
                <p className="text-secondary text-xs font-semibold mb-1">FERTILE WINDOW</p>
                <p className="font-mono font-semibold text-primary">
                  {formatFullDate(results.nextFertileStart)} to {formatFullDate(results.nextFertileEnd)}
                </p>
                <p className="text-secondary text-sm mt-2">
                  Your estimated fertile window for this cycle
                </p>
              </div>
            </div>
          </Card>

          {renderCalendar()}
        </div>
      )}

      <Card className="bg-blue-50 border border-blue-200">
        <Badge>Disclaimer</Badge>
        <p className="text-secondary text-sm mt-2">
          This tool is for informational purposes only and should not replace professional medical advice.
          Always consult your healthcare provider for medical decisions. Cycle tracking is more accurate with 6 months of data.
        </p>
      </Card>
    </div>
  );
}
