'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function OvulationCalculator() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [results, setResults] = useState(null);

  const calculateOvulation = () => {
    if (!lastPeriod) return;

    const [year, month, day] = lastPeriod.split('-');
    const lastDate = new Date(year, month - 1, day);
    if (isNaN(lastDate)) return;

    const ovulationDate = new Date(lastDate);
    ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14);

    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);

    const nextPeriod = new Date(lastDate);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    setResults({
      ovulationDate,
      fertileStart,
      fertileEnd,
      nextPeriod,
      cycleLength,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDayType = (date) => {
    if (!results) return null;
    const time = date.getTime();
    const ovTime = results.ovulationDate.getTime();
    const fertStartTime = results.fertileStart.getTime();
    const fertEndTime = results.fertileEnd.getTime();
    const nextPeriodTime = results.nextPeriod.getTime();

    const [y, m, d] = lastPeriod.split('-');
    const cycleStart = new Date(y, m - 1, d);
    const periodEnd = new Date(cycleStart);
    periodEnd.setDate(periodEnd.getDate() + 4);

    if (time >= cycleStart.getTime() && time <= periodEnd.getTime()) return 'period';
    if (time === ovTime) return 'ovulation';
    if (time >= fertStartTime && time <= fertEndTime) return 'fertile';
    if (time === nextPeriodTime) return 'nextPeriod';
    if (time >= cycleStart.getTime() && time < nextPeriodTime) return 'safe';
    return null;
  };

  const renderCycleCalendar = () => {
    if (!results) return null;

    const [y, m, d] = lastPeriod.split('-');
    const cycleStart = new Date(y, m - 1, d);
    const cycleEnd = new Date(results.nextPeriod);

    const startMonth = new Date(cycleStart.getFullYear(), cycleStart.getMonth(), 1);
    const endMonth = new Date(cycleEnd.getFullYear(), cycleEnd.getMonth(), 1);

    const months = [];
    const current = new Date(startMonth);
    while (current <= endMonth) {
      months.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }

    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const styleMap = {
      period: 'bg-rose-100 text-rose-700 border-rose-200',
      ovulation: 'bg-amber-100 text-amber-800 border-amber-300 ring-2 ring-amber-300',
      fertile: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      nextPeriod: 'bg-rose-50 text-rose-500 border-rose-200 border-dashed',
      safe: '',
    };

    return (
      <Card>
        <h3 className="font-heading text-lg font-bold mb-4">Cycle Calendar</h3>
        <div className={`grid gap-6 ${months.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          {months.map((monthDate) => {
            const year = monthDate.getFullYear();
            const month = monthDate.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

            return (
              <div key={`${year}-${month}`}>
                <p className="font-heading font-semibold text-center mb-3">
                  {monthNames[month]} {year}
                </p>
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
                    const type = getDayType(date);
                    const isToday = date.getTime() === today.getTime();
                    const inCycle = type !== null;
                    const style = type ? styleMap[type] : '';

                    return (
                      <div
                        key={dayNum}
                        className={`
                          relative flex items-center justify-center rounded-lg border text-sm font-mono
                          h-9 sm:h-10
                          transition-all
                          ${inCycle ? style || 'bg-white border-border text-primary' : 'text-muted border-transparent'}
                          ${isToday ? 'font-bold' : 'font-medium'}
                        `}
                        title={type ? `Day ${dayNum} - ${type}` : ''}
                      >
                        {dayNum}
                        {isToday && (
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 pt-4 border-t border-border">
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
          <div className="flex items-center gap-2 text-sm">
            <span className="w-5 h-5 rounded-md bg-rose-50 border border-dashed border-rose-200 inline-block" />
            <span className="text-secondary">Next period</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="absolute bottom-0.5 relative w-5 h-5 rounded-md bg-white border border-border inline-flex items-center justify-center">
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
          <div>
            <Input
              type="date"
              label="Last Menstrual Period Date"
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

          <Button onClick={calculateOvulation} className="w-full">
            Calculate Ovulation
          </Button>
        </div>
      </Card>

      {results && (
        <div className="space-y-4">
          <Card>
            <div className="space-y-4">
              <div>
                <p className="text-secondary text-sm mb-1">Ovulation Date</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.ovulationDate)}
                </p>
              </div>

              <div>
                <p className="text-secondary text-sm mb-1">Fertile Window</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.fertileStart)} to {formatDate(results.fertileEnd)}
                </p>
                <p className="text-secondary text-sm mt-2">
                  Best 6 days to try for conception (5 days before ovulation + ovulation day)
                </p>
              </div>

              <div>
                <p className="text-secondary text-sm mb-1">Next Period Date</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.nextPeriod)}
                </p>
              </div>
            </div>
          </Card>

          {renderCycleCalendar()}
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
