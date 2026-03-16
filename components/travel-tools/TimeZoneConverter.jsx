'use client';
import { useState, useMemo, useEffect } from 'react';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const TIMEZONES = [
  { value: 'UTC-12', label: 'UTC-12 (Baker Island)' },
  { value: 'UTC-11', label: 'UTC-11 (Samoa)' },
  { value: 'UTC-10', label: 'UTC-10 (Hawaii)' },
  { value: 'UTC-9', label: 'UTC-9 (Alaska)' },
  { value: 'UTC-8', label: 'UTC-8 (Pacific, Los Angeles)' },
  { value: 'UTC-7', label: 'UTC-7 (Mountain, Denver)' },
  { value: 'UTC-6', label: 'UTC-6 (Central, Chicago)' },
  { value: 'UTC-5', label: 'UTC-5 (Eastern, New York)' },
  { value: 'UTC-4', label: 'UTC-4 (Atlantic, Canada)' },
  { value: 'UTC-3', label: 'UTC-3 (Brazil, Argentina)' },
  { value: 'UTC-2', label: 'UTC-2 (Mid-Atlantic)' },
  { value: 'UTC-1', label: 'UTC-1 (Azores)' },
  { value: 'UTC+0', label: 'UTC+0 (London, GMT)' },
  { value: 'UTC+1', label: 'UTC+1 (Paris, Berlin)' },
  { value: 'UTC+2', label: 'UTC+2 (Cairo, Helsinki)' },
  { value: 'UTC+3', label: 'UTC+3 (Moscow, Istanbul)' },
  { value: 'UTC+4', label: 'UTC+4 (Dubai, Georgia)' },
  { value: 'UTC+5', label: 'UTC+5 (Pakistan, Kazakhstan)' },
  { value: 'UTC+5:30', label: 'UTC+5:30 (India)' },
  { value: 'UTC+6', label: 'UTC+6 (Bangladesh)' },
  { value: 'UTC+7', label: 'UTC+7 (Thailand, Vietnam)' },
  { value: 'UTC+8', label: 'UTC+8 (Singapore, Hong Kong)' },
  { value: 'UTC+9', label: 'UTC+9 (Tokyo, Seoul)' },
  { value: 'UTC+10', label: 'UTC+10 (Sydney)' },
  { value: 'UTC+11', label: 'UTC+11 (Solomon Islands)' },
  { value: 'UTC+12', label: 'UTC+12 (Fiji, New Zealand)' },
  { value: 'UTC+13', label: 'UTC+13 (Tonga)' },
  { value: 'UTC+14', label: 'UTC+14 (Line Islands)' },
];

function parseTimezoneOffset(tzString) {
  if (tzString === 'UTC+0') return 0;
  const match = tzString.match(/UTC([+-])(\d+):?(\d*)/);
  if (!match) return 0;
  const sign = match[1] === '+' ? 1 : -1;
  const hours = parseInt(match[2]);
  const minutes = match[3] ? parseInt(match[3]) : 0;
  return sign * (hours + minutes / 60);
}

export default function TimeZoneConverter() {
  const [timezone1, setTimezone1] = useState('UTC+0');
  const [timezone2, setTimezone2] = useState('UTC-5');
  const [inputTime, setInputTime] = useState('12:00');
  const [currentTime1, setCurrentTime1] = useState('');
  const [currentTime2, setCurrentTime2] = useState('');

  const offset1 = parseTimezoneOffset(timezone1);
  const offset2 = parseTimezoneOffset(timezone2);
  const offsetDifference = offset2 - offset1;

  useEffect(() => {
    const updateCurrentTimes = () => {
      const now = new Date();
      const utcHours = now.getUTCHours();
      const minutes = now.getUTCMinutes();

      const time1Hours = (utcHours + offset1 + 24) % 24;
      const time2Hours = (utcHours + offset2 + 24) % 24;

      const formatTime = (hours, mins) => {
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
      };

      setCurrentTime1(formatTime(time1Hours, minutes));
      setCurrentTime2(formatTime(time2Hours, minutes));
    };

    updateCurrentTimes();
    const interval = setInterval(updateCurrentTimes, 1000);
    return () => clearInterval(interval);
  }, [offset1, offset2]);

  const convertedTime = useMemo(() => {
    const [hours, minutes] = inputTime.split(':').map(Number);
    const inputMinutesTotal = hours * 60 + minutes;
    const offsetMinutes = offsetDifference * 60;
    const convertedMinutes = inputMinutesTotal + offsetMinutes;
    const normalizedMinutes = ((convertedMinutes % 1440) + 1440) % 1440;

    const convertedHours = Math.floor(normalizedMinutes / 60);
    const convertedMins = normalizedMinutes % 60;

    return {
      hours: String(convertedHours).padStart(2, '0'),
      minutes: String(convertedMins).padStart(2, '0'),
    };
  }, [inputTime, offsetDifference]);

  const getOffsetDisplay = () => {
    const absOffset = Math.abs(offsetDifference);
    const hours = Math.floor(absOffset);
    const minutes = Math.round((absOffset % 1) * 60);
    const sign = offsetDifference >= 0 ? '+' : '';
    const minString = minutes > 0 ? `:${String(minutes).padStart(2, '0')}` : '';
    return `${sign}${hours}${minString} hours`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Timezone 1
            </label>
            <Select
              value={timezone1}
              onChange={(e) => setTimezone1(e.target.value)}
              options={TIMEZONES}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Timezone 2
            </label>
            <Select
              value={timezone2}
              onChange={(e) => setTimezone2(e.target.value)}
              options={TIMEZONES}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Enter Time (Timezone 1)
          </label>
          <Input
            type="time"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
              {timezone1}
            </p>
            <p className="font-mono text-3xl font-bold text-text-primary">
              {inputTime}
            </p>
            <p className="text-xs text-text-secondary">
              Current: {currentTime1}
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
              {timezone2}
            </p>
            <p className="font-mono text-3xl font-bold text-accent">
              {convertedTime.hours}:{convertedTime.minutes}
            </p>
            <p className="text-xs text-text-secondary">
              Current: {currentTime2}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Offset Difference</p>
            <p className="font-mono text-lg font-semibold text-text-primary mt-1">
              {getOffsetDisplay()}
            </p>
          </div>
          <Button
            onClick={() => {
              setTimezone1(timezone2);
              setTimezone2(timezone1);
            }}
            variant="secondary"
            size="sm"
          >
            Swap
          </Button>
        </div>
      </Card>

      <Card>
        <p className="text-sm text-text-secondary">
          Times shown are approximate and use fixed offsets. Some regions observe daylight saving
          time, which may affect actual local times.
        </p>
      </Card>
    </div>
  );
}
