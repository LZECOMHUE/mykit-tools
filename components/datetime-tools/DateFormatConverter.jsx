'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

function parseDate(input) {
  // Try different formats
  const cleanInput = input.trim();

  // ISO format (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanInput)) {
    const date = new Date(cleanInput + 'T00:00:00Z');
    if (!isNaN(date.getTime())) {
      return { date, format: 'ISO' };
    }
  }

  // UK format (DD/MM/YYYY or DD-MM-YYYY)
  if (/^\d{1,2}[-\/]\d{1,2}[-\/]\d{4}$/.test(cleanInput)) {
    const parts = cleanInput.split(/[-\/]/);
    if (parts.length === 3) {
      const date = new Date(parts[2], parts[1] - 1, parts[0]);
      if (!isNaN(date.getTime())) {
        return { date, format: 'UK' };
      }
    }
  }

  // US format (MM/DD/YYYY or MM-DD-YYYY)
  if (/^\d{1,2}[-\/]\d{1,2}[-\/]\d{4}$/.test(cleanInput)) {
    const parts = cleanInput.split(/[-\/]/);
    if (parts.length === 3) {
      const date = new Date(parts[2], parts[0] - 1, parts[1]);
      if (!isNaN(date.getTime())) {
        return { date, format: 'US' };
      }
    }
  }

  // Unix timestamp
  if (/^\d{10}$/.test(cleanInput)) {
    const date = new Date(parseInt(cleanInput) * 1000);
    if (!isNaN(date.getTime())) {
      return { date, format: 'Unix' };
    }
  }

  // Unix timestamp (milliseconds)
  if (/^\d{13}$/.test(cleanInput)) {
    const date = new Date(parseInt(cleanInput));
    if (!isNaN(date.getTime())) {
      return { date, format: 'Unix (ms)' };
    }
  }

  return null;
}

export default function DateFormatConverter() {
  const [input, setInput] = useState('');

  const result = useMemo(() => {
    if (!input.trim()) {
      return null;
    }

    const parsed = parseDate(input);
    if (!parsed) {
      return null;
    }

    const { date } = parsed;

    // Format conversions
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formats = {
      uk: `${day}/${month}/${year}`,
      us: `${month}/${day}/${year}`,
      iso: `${year}-${month}-${day}`,
      written: `${date.getDate()} ${monthNames[date.getMonth()]} ${year}`,
      written_full: `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]} ${year}`,
      unix: Math.floor(date.getTime() / 1000),
      unix_ms: date.getTime(),
      rfc2822: date.toUTCString(),
    };

    return {
      formats,
      source: parsed.format,
    };
  }, [input]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Enter a Date
        </label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, or Unix timestamp..."
        />
        <p className="text-xs text-text-muted mt-2">
          Supports: UK (DD/MM/YYYY), US (MM/DD/YYYY), ISO (YYYY-MM-DD), Unix timestamps
        </p>
      </div>

      {result && (
        <div className="space-y-4">
          {result.source && (
            <div className="bg-blue-100 border border-accent rounded-[var(--radius-card)] p-4">
              <p className="text-sm text-text-primary">
                Detected format: <span className="font-semibold">{result.source}</span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'UK Format', value: result.formats.uk, key: 'uk' },
              { label: 'US Format', value: result.formats.us, key: 'us' },
              { label: 'ISO Format', value: result.formats.iso, key: 'iso' },
              { label: 'Written', value: result.formats.written, key: 'written' },
              { label: 'Written (Full)', value: result.formats.written_full, key: 'written_full' },
              { label: 'Unix Timestamp', value: result.formats.unix, key: 'unix' },
              { label: 'Unix Timestamp (ms)', value: result.formats.unix_ms, key: 'unix_ms' },
              { label: 'RFC 2822', value: result.formats.rfc2822, key: 'rfc2822' },
            ].map((item) => (
              <div
                key={item.key}
                className="bg-surface border border-border rounded-[var(--radius-card)] p-4 flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-text-muted text-sm">{item.label}</p>
                  <p className="font-mono text-text-primary break-all">
                    {item.value}
                  </p>
                </div>
                <Button
                  onClick={() => handleCopy(String(item.value))}
                  size="sm"
                  className="flex-shrink-0"
                >
                  Copy
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {input && !result && (
        <div className="bg-red-50 border border-red-200 rounded-[var(--radius-card)] p-6 text-center">
          <p className="text-red-900 text-sm">Could not parse date. Check the format and try again.</p>
        </div>
      )}

      {!input && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 text-center">
          <p className="text-text-muted">Enter a date to convert to different formats</p>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>Convert dates between different formats with automatic format detection.</p>
      </div>
    </div>
  );
}
