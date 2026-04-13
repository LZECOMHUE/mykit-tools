'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const parseDate = (dateStr) => {
  if (!dateStr) return new Date();
  const [y, m, d] = dateStr.split('-');
  return new Date(y, m - 1, d);
};

export default function FertileWindowCalculator() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [monthsAhead, setMonthsAhead] = useState(1);
  const [results, setResults] = useState(null);

  const calculateFertileWindow = () => {
    if (!lastPeriod) return;

    const baseDate = parseDate(lastPeriod);
    if (isNaN(baseDate)) return;

    const months = [];

    for (let m = 0; m < monthsAhead; m++) {
      const monthStart = new Date(baseDate);
      monthStart.setMonth(monthStart.getMonth() + m);

      const nextPeriodInMonth = new Date(baseDate);
      nextPeriodInMonth.setDate(nextPeriodInMonth.getDate() + cycleLength * (m + 1));

      const ovulationDate = new Date(nextPeriodInMonth);
      ovulationDate.setDate(ovulationDate.getDate() - 14);

      const fertileStart = new Date(ovulationDate);
      fertileStart.setDate(fertileStart.getDate() - 5);

      const fertileEnd = new Date(ovulationDate);

      const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
      const days = [];

      for (let d = 1; d <= daysInMonth; d++) {
        const dayDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), d);

        // Check if in period (last 5 days of cycle)
        const lastPeriodInMonth = new Date(baseDate);
        lastPeriodInMonth.setDate(
          lastPeriodInMonth.getDate() + cycleLength * m
        );

        const dayOfCycle = Math.floor((dayDate - lastPeriodInMonth) / (1000 * 60 * 60 * 24)) % cycleLength;
        const isPeriod = dayOfCycle >= 0 && dayOfCycle < 5;
        const isFertile = dayDate >= fertileStart && dayDate <= fertileEnd;
        const isOvulation = dayDate.toDateString() === ovulationDate.toDateString();

        let type = 'safe';
        if (isPeriod) type = 'period';
        else if (isOvulation) type = 'ovulation';
        else if (isFertile) type = 'fertile';

        days.push({ date: dayDate, type, dayOfCycle: (dayOfCycle + cycleLength) % cycleLength });
      }

      months.push({
        date: monthStart,
        days,
        ovulationDate,
        fertileStart,
        fertileEnd,
      });
    }

    setResults(months);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const renderMonthCalendar = (month) => {
    const year = month.date.getFullYear();
    const mo = month.date.getMonth();
    const monthName = month.date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(year, mo + 1, 0).getDate();
    const firstDayOfWeek = (new Date(year, mo, 1).getDay() + 6) % 7;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const styleMap = {
      period: 'bg-rose-100 text-rose-700 border-rose-200',
      ovulation: 'bg-amber-100 text-amber-800 border-amber-300 ring-2 ring-amber-300',
      fertile: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      safe: 'bg-white border-border text-primary',
    };

    return (
      <div key={month.date.toISOString()} className="mb-4">
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
            const date = new Date(year, mo, dayNum);
            const dayData = month.days.find(d => d.date.getDate() === dayNum);
            const type = dayData ? dayData.type : null;
            const isToday = date.getTime() === today.getTime();
            const style = type ? (styleMap[type] || styleMap.safe) : 'text-muted border-transparent';

            return (
              <div
                key={dayNum}
                className={`relative flex items-center justify-center rounded-lg border text-sm font-mono h-9 sm:h-10 transition-all ${style} ${isToday ? 'font-bold' : 'font-medium'}`}
                title={dayData ? formatDate(dayData.date) : ''}
              >
                {dayNum}
                {isToday && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 p-3 rounded-lg text-sm space-y-1 mt-3">
          <p className="text-secondary">
            <span className="font-semibold text-primary">Ovulation:</span> {formatDate(month.ovulationDate)}
          </p>
          <p className="text-secondary">
            <span className="font-semibold text-primary">Fertile Window:</span> {formatDate(month.fertileStart)} to {formatDate(month.fertileEnd)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <div>
            <Input
              type="date"
              label="Last Period Start Date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
            />
          </div>

          <div>
            <Select
              label="Average Cycle Length (days)"
              options={Array.from({ length: 25 }, (_, i) => ({
                value: 21 + i,
                label: (21 + i).toString(),
              }))}
              value={cycleLength.toString()}
              onChange={(e) => setCycleLength(parseInt(e.target.value))}
            />
          </div>

          <div>
            <Select
              label="Show Months Ahead"
              options={[
                { value: '1', label: '1 Month' },
                { value: '2', label: '2 Months' },
                { value: '3', label: '3 Months' },
                { value: '6', label: '6 Months' },
              ]}
              value={monthsAhead.toString()}
              onChange={(e) => setMonthsAhead(parseInt(e.target.value))}
            />
          </div>

          <Button onClick={calculateFertileWindow} className="w-full">
            Generate Fertility Calendar
          </Button>
        </div>
      </Card>

      {results && (
        <div className="space-y-4">
          <Card>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-5 h-5 rounded-md bg-rose-100 border border-rose-200 inline-block" />
                <span className="text-secondary">Period</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-200 inline-block" />
                <span className="text-secondary">Fertile window</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-5 h-5 rounded-md bg-amber-100 border border-amber-300 ring-2 ring-amber-300 inline-block" />
                <span className="text-secondary">Ovulation</span>
              </div>
            </div>
          </Card>

          {results.map(month => renderMonthCalendar(month))}

          <Card className="bg-green-50 border border-green-200">
            <p className="text-secondary text-sm">
              <span className="font-semibold text-primary">Best Days to Try:</span> The green highlighted days show your fertile window, with the highest chance of conception around ovulation day.
            </p>
          </Card>
        </div>
      )}

      <Card className="bg-blue-50 border border-blue-200">
        <Badge>Disclaimer</Badge>
        <p className="text-secondary text-sm mt-2">
          This tool is for informational purposes only and should not replace professional medical advice.
          Always consult your healthcare provider for medical decisions.
        </p>
      </Card>
    </div>
  );
}
