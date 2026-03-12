'use client';

import { useState, useCallback, useMemo } from 'react';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Parse a cron expression into field objects
function parseCron(expression) {
  const fields = expression.trim().split(/\s+/);
  if (fields.length !== 5) {
    return null;
  }

  return {
    minute: fields[0],
    hour: fields[1],
    dayOfMonth: fields[2],
    month: fields[3],
    dayOfWeek: fields[4],
  };
}

// Convert field string to array of selected values
function fieldToValues(field, min, max) {
  if (field === '*') {
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
  }

  const values = [];
  const parts = field.split(',');

  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        values.push(i);
      }
    } else if (part.includes('/')) {
      const [base, step] = part.split('/');
      const stepNum = Number(step);
      if (base === '*') {
        for (let i = min; i <= max; i += stepNum) {
          values.push(i);
        }
      } else {
        const start = Number(base);
        for (let i = start; i <= max; i += stepNum) {
          values.push(i);
        }
      }
    } else {
      const num = Number(part);
      if (!isNaN(num)) {
        values.push(num);
      }
    }
  }

  return [...new Set(values)].sort((a, b) => a - b);
}

// Convert selected values back to cron field notation
function valuesToField(values, min, max) {
  if (values.length === 0) {
    return '*';
  }

  const all = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  if (values.length === all.length) {
    return '*';
  }

  // Check if it's a continuous range
  if (values.length > 1) {
    const sorted = [...values].sort((a, b) => a - b);
    const isContinuous = sorted.every((v, i) => i === 0 || v === sorted[i - 1] + 1);
    if (isContinuous) {
      return `${sorted[0]}-${sorted[sorted.length - 1]}`;
    }
  }

  return values.sort((a, b) => a - b).join(',');
}

// Check if a given date matches the cron expression
function dateMatchesCron(date, parsed) {
  const minute = date.getMinutes();
  const hour = date.getHours();
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1; // 1-12
  const dayOfWeek = date.getDay(); // 0-6

  const minValues = fieldToValues(parsed.minute, 0, 59);
  const hourValues = fieldToValues(parsed.hour, 0, 23);
  const domValues = fieldToValues(parsed.dayOfMonth, 1, 31);
  const monthValues = fieldToValues(parsed.month, 1, 12);
  const dowValues = fieldToValues(parsed.dayOfWeek, 0, 6);

  return (
    minValues.includes(minute) &&
    hourValues.includes(hour) &&
    monthValues.includes(month) &&
    (domValues.includes(dayOfMonth) || dowValues.includes(dayOfWeek))
  );
}

// Get next 5 execution times
function getNextRuns(expression, limit = 5) {
  const parsed = parseCron(expression);
  if (!parsed) return [];

  const runs = [];
  const startDate = new Date();
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);
  startDate.setMinutes(startDate.getMinutes() + 1);

  let current = new Date(startDate);
  const maxIterations = 525600; // 1 year in minutes

  for (let i = 0; i < maxIterations && runs.length < limit; i++) {
    if (dateMatchesCron(current, parsed)) {
      runs.push(new Date(current));
    }
    current.setMinutes(current.getMinutes() + 1);
  }

  return runs;
}

// Format a date for display
function formatDate(date) {
  const day = DAY_NAMES[date.getDay()];
  const dateNum = date.getDate().toString().padStart(2, '0');
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${dateNum} ${month} ${year} at ${hours}:${minutes}`;
}

// Convert cron field to plain English
function fieldToEnglish(field, fieldName) {
  if (field === '*') {
    return `every ${fieldName}`;
  }

  if (field.includes('/')) {
    const [base, step] = field.split('/');
    if (base === '*') {
      return `every ${step} ${fieldName}s`;
    }
  }

  if (field.includes('-')) {
    const [start, end] = field.split('-');
    if (fieldName === 'month') {
      return `${MONTH_NAMES[Number(start) - 1]} through ${MONTH_NAMES[Number(end) - 1]}`;
    } else if (fieldName === 'day of week') {
      return `${DAY_NAMES[Number(start)]} through ${DAY_NAMES[Number(end)]}`;
    }
    return `${start} through ${end}`;
  }

  if (field.includes(',')) {
    const parts = field.split(',');
    if (fieldName === 'month') {
      return parts.map(p => MONTH_NAMES[Number(p) - 1]).join(', ');
    } else if (fieldName === 'day of week') {
      return parts.map(p => DAY_NAMES[Number(p)]).join(', ');
    }
    return parts.join(', ');
  }

  return field;
}

// Generate plain English description
function cronToEnglish(expression) {
  const parsed = parseCron(expression);
  if (!parsed) return '';

  const parts = [];

  if (parsed.minute !== '*') {
    parts.push(`at minute ${fieldToEnglish(parsed.minute, 'minute')}`);
  }

  if (parsed.hour !== '*') {
    parts.push(`at hour ${fieldToEnglish(parsed.hour, 'hour')}`);
  }

  if (parsed.dayOfMonth !== '*' || parsed.dayOfWeek !== '*') {
    if (parsed.dayOfMonth !== '*' && parsed.dayOfWeek === '*') {
      parts.push(`on day ${fieldToEnglish(parsed.dayOfMonth, 'day')}`);
    } else if (parsed.dayOfMonth === '*' && parsed.dayOfWeek !== '*') {
      parts.push(`on ${fieldToEnglish(parsed.dayOfWeek, 'day of week')}`);
    } else {
      parts.push(
        `on day ${fieldToEnglish(parsed.dayOfMonth, 'day')} or ${fieldToEnglish(
          parsed.dayOfWeek,
          'day of week'
        )}`
      );
    }
  }

  if (parsed.month !== '*') {
    parts.push(`in ${fieldToEnglish(parsed.month, 'month')}`);
  }

  return parts.length > 0 ? parts.join(', ') : 'Never';
}

// Field editor component
function FieldEditor({ label, field, min, max, nameMap, onChange }) {
  const [mode, setMode] = useState(field === '*' ? 'every' : 'specific');
  const [values, setValues] = useState(fieldToValues(field, min, max));
  const [rangeStart, setRangeStart] = useState(min);
  const [rangeEnd, setRangeEnd] = useState(max);
  const [stepValue, setStepValue] = useState(1);

  const handleToggleValue = (val) => {
    setValues(prev => {
      if (prev.includes(val)) {
        return prev.filter(v => v !== val);
      } else {
        return [...prev, val];
      }
    });
  };

  const handleApply = useCallback(() => {
    let newField = '';

    if (mode === 'every') {
      newField = '*';
    } else if (mode === 'specific') {
      newField = valuesToField(values, min, max);
    } else if (mode === 'range') {
      newField = `${rangeStart}-${rangeEnd}`;
    } else if (mode === 'step') {
      newField = `*/${stepValue}`;
    }

    onChange(newField);
  }, [mode, values, rangeStart, rangeEnd, stepValue, onChange, min, max]);

  const gridCols = {
    minute: 12,
    hour: 6,
    dayOfMonth: 7,
    month: 4,
    dayOfWeek: 7,
  }[label.toLowerCase()] || 7;

  return (
    <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-text-primary">{label}</h3>
        <span className="text-xs font-mono text-text-muted bg-surface px-2 py-1 rounded-[var(--radius-input)]">
          {field}
        </span>
      </div>

      <div className="flex gap-2 mb-4">
        {['every', 'specific', 'range', 'step'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`text-xs px-2 py-1 rounded-[var(--radius-input)] transition-colors ${
              mode === m
                ? 'bg-accent text-white'
                : 'bg-surface text-text-secondary hover:bg-border'
            }`}
          >
            {m === 'every' && 'Every'}
            {m === 'specific' && 'Specific'}
            {m === 'range' && 'Range'}
            {m === 'step' && 'Step'}
          </button>
        ))}
      </div>

      {mode === 'specific' && (
        <div className={`grid gap-2 mb-4`} style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}>
          {Array.from({ length: max - min + 1 }, (_, i) => min + i).map(val => (
            <button
              key={val}
              onClick={() => handleToggleValue(val)}
              className={`w-8 h-8 text-[11px] rounded-[var(--radius-input)] transition-colors ${
                values.includes(val)
                  ? 'bg-accent text-white font-medium'
                  : 'bg-surface text-text-secondary hover:bg-border'
              }`}
            >
              {nameMap && nameMap[val] ? nameMap[val] : val}
            </button>
          ))}
        </div>
      )}

      {mode === 'range' && (
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <label className="block text-xs text-text-secondary mb-1">From</label>
            <input
              type="number"
              min={min}
              max={max}
              value={rangeStart}
              onChange={e => setRangeStart(Number(e.target.value))}
              className="w-full px-2 py-1 border border-border rounded-[var(--radius-input)] text-sm text-text-primary font-mono"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-text-secondary mb-1">To</label>
            <input
              type="number"
              min={min}
              max={max}
              value={rangeEnd}
              onChange={e => setRangeEnd(Number(e.target.value))}
              className="w-full px-2 py-1 border border-border rounded-[var(--radius-input)] text-sm text-text-primary font-mono"
            />
          </div>
        </div>
      )}

      {mode === 'step' && (
        <div className="mb-4">
          <label className="block text-xs text-text-secondary mb-1">Every N {label.toLowerCase().slice(0, -1)}s</label>
          <input
            type="number"
            min="1"
            max={max - min}
            value={stepValue}
            onChange={e => setStepValue(Number(e.target.value))}
            className="w-full px-2 py-1 border border-border rounded-[var(--radius-input)] text-sm text-text-primary font-mono"
          />
        </div>
      )}

      <button
        onClick={handleApply}
        className="w-full px-3 py-2 text-sm font-medium bg-accent text-white rounded-[var(--radius-input)] hover:opacity-90 transition-opacity"
      >
        Apply
      </button>
    </div>
  );
}

export default function CronBuilder() {
  const [cron, setCron] = useState('0 9 * * 1-5');
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => parseCron(cron), [cron]);
  const english = useMemo(() => (parsed ? cronToEnglish(cron) : ''), [cron, parsed]);
  const nextRuns = useMemo(() => (parsed ? getNextRuns(cron) : []), [cron, parsed]);

  const handleFieldChange = useCallback((fieldName, value) => {
    if (!parsed) return;
    const updated = {
      ...parsed,
      [fieldName]: value,
    };
    const newCron = `${updated.minute} ${updated.hour} ${updated.dayOfMonth} ${updated.month} ${updated.dayOfWeek}`;
    setCron(newCron);
  }, [parsed]);

  const handlePreset = (expression) => {
    setCron(expression);
  };

  const handleCopyExpression = () => {
    navigator.clipboard.writeText(cron);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleManualInput = (e) => {
    const value = e.target.value;
    setCron(value);
  };

  if (!parsed) {
    return (
      <div className="max-w-3xl">
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-6 text-center">
          <p className="text-text-secondary">Invalid cron expression. Please enter a valid 5-field cron.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Manual Input */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
        <label className="block text-xs text-text-secondary font-medium mb-2">Manual Cron Input</label>
        <input
          type="text"
          value={cron}
          onChange={handleManualInput}
          placeholder="e.g. 0 9 * * 1-5"
          className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-sm text-text-primary font-mono focus:outline-none focus:border-accent"
        />
      </div>

      {/* Expression Display */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-6">
        <div className="flex items-end gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-xs text-text-secondary font-medium mb-2">Cron Expression</label>
            <code className="text-2xl font-mono font-bold text-text-primary break-all">{cron}</code>
          </div>
          <button
            onClick={handleCopyExpression}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-accent text-white rounded-[var(--radius-input)] hover:opacity-90 transition-opacity"
          >
            {copied ? '✓ Copied' : '⧉ Copy'}
          </button>
        </div>

        <p className="text-sm text-text-secondary">
          <span className="font-medium text-text-primary">Plain English:</span> {english}
        </p>
      </div>

      {/* Quick Presets */}
      <div className="bg-surface rounded-[var(--radius-card)] p-4">
        <p className="text-xs text-text-secondary font-medium mb-3">Quick Presets</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Every minute', expr: '* * * * *' },
            { label: 'Hourly', expr: '0 * * * *' },
            { label: 'Daily midnight', expr: '0 0 * * *' },
            { label: 'Daily 9am', expr: '0 9 * * *' },
            { label: 'Weekdays 9am', expr: '0 9 * * 1-5' },
            { label: 'Weekly Monday', expr: '0 0 * * 1' },
            { label: 'Monthly 1st', expr: '0 0 1 * *' },
          ].map(preset => (
            <button
              key={preset.expr}
              onClick={() => handlePreset(preset.expr)}
              className={`px-3 py-2 text-xs rounded-[var(--radius-input)] transition-colors ${
                cron === preset.expr
                  ? 'bg-accent text-white font-medium'
                  : 'bg-white border border-border text-text-secondary hover:bg-border'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Field Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <FieldEditor
          label="Minute"
          field={parsed.minute}
          min={0}
          max={59}
          onChange={value => handleFieldChange('minute', value)}
        />
        <FieldEditor
          label="Hour"
          field={parsed.hour}
          min={0}
          max={23}
          onChange={value => handleFieldChange('hour', value)}
        />
        <FieldEditor
          label="Day of Month"
          field={parsed.dayOfMonth}
          min={1}
          max={31}
          onChange={value => handleFieldChange('dayOfMonth', value)}
        />
        <FieldEditor
          label="Month"
          field={parsed.month}
          min={1}
          max={12}
          nameMap={MONTH_NAMES.reduce((acc, name, i) => ({ ...acc, [i + 1]: name }), {})}
          onChange={value => handleFieldChange('month', value)}
        />
        <FieldEditor
          label="Day of Week"
          field={parsed.dayOfWeek}
          min={0}
          max={6}
          nameMap={DAY_NAMES.reduce((acc, name, i) => ({ ...acc, [i]: name }), {})}
          onChange={value => handleFieldChange('dayOfWeek', value)}
        />
      </div>

      {/* Next Runs */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="text-sm font-medium text-text-primary mb-4">Next 5 Run Times</h2>
        {nextRuns.length > 0 ? (
          <ul className="space-y-2">
            {nextRuns.map((date, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-medium">
                  {i + 1}
                </span>
                <span className="text-sm text-text-secondary font-mono">{formatDate(date)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-text-muted">No matches in the next year</p>
        )}
      </div>
    </div>
  );
}
