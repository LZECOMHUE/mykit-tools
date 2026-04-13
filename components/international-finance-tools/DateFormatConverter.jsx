'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ORDINAL_SUFFIXES = ['th', 'st', 'nd', 'rd'];

function getOrdinalSuffix(day) {
  if (day % 100 >= 11 && day % 100 <= 13) return 'th';
  return ORDINAL_SUFFIXES[day % 10] || 'th';
}

function numberToWords(num) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  if (num === 0) return 'Zero';
  if (num < 0) return 'Negative ' + numberToWords(Math.abs(num));

  let words = '';
  let scaleIndex = 0;

  while (num > 0) {
    if (num % 1000 !== 0) {
      words = convertHundreds(num % 1000) + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '') + ' ' + words;
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return words.trim();

  function convertHundreds(num) {
    let result = '';
    const hundred = Math.floor(num / 100);
    if (hundred > 0) {
      result += ones[hundred] + ' Hundred ';
    }

    const remainder = num % 100;
    if (remainder >= 20) {
      result += tens[Math.floor(remainder / 10)];
      if (remainder % 10 > 0) {
        result += ' ' + ones[remainder % 10];
      }
    } else if (remainder > 0) {
      result += (remainder < 10 ? ones[remainder] : teens[remainder - 10]);
    }

    return result.trim();
  }
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export default function DateFormatConverter() {
  const [dateInput, setDateInput] = useState('2026-03-17');
  const [result, setResult] = useState(null);

  function convert() {
    if (!dateInput) {
      setResult(null);
      return;
    }

    const date = new Date(dateInput + 'T00:00:00Z');
    if (isNaN(date.getTime())) {
      setResult(null);
      return;
    }

    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const dayOfWeekNum = date.getUTCDay();
    const dayOfWeekName = DAYS_OF_WEEK[dayOfWeekNum];
    const monthName = MONTHS[month];
    const ordinalDay = day + getOrdinalSuffix(day);

    // Unix timestamp (seconds since 1970-01-01)
    const unixTimestamp = Math.floor(date.getTime() / 1000);

    // Day of year
    const dayOfYear = getDayOfYear(date);

    // Week number (ISO 8601)
    const weekNumber = getWeekNumber(date);

    // Written form
    const writtenForm = `${monthName} ${ordinalDay}, ${year}`;
    const writtenWords = `${monthName} ${numberToWords(day)}, ${numberToWords(year)}`;

    setResult({
      us: `${String(month + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`,
      uk: `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`,
      iso: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      longUs: `${monthName} ${day}, ${year}`,
      longUk: `${day} ${monthName} ${year}`,
      japanese: `${year}年${String(month + 1).padStart(2, '0')}月${String(day).padStart(2, '0')}日`,
      written: writtenForm,
      writtenFull: writtenWords,
      dayOfWeek: dayOfWeekName,
      dayOfYear: `Day ${dayOfYear} of ${year}`,
      weekNumber: `Week ${weekNumber} of ${year} (ISO 8601)`,
      unixTimestamp: unixTimestamp,
      epochMs: Math.floor(date.getTime()),
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-primary mb-2">
          Date Format Converter
        </h2>
        <p className="text-secondary text-sm mb-4">
          Convert a date to every major format used around the world
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Enter a Date
            </label>
            <Input
              type="date"
              value={dateInput}
              onChange={(e) => {
                setDateInput(e.target.value);
              }}
            />
            <p className="text-xs text-secondary mt-1">
              Click on the date field to pick a date, or type it manually
            </p>
          </div>

          <Button onClick={convert} className="w-full mt-6">
            Convert Date
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Overview Card */}
          <Card className="bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Date Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-secondary text-sm mb-1">Day of Week</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  {result.dayOfWeek}
                </p>
              </div>

              <div>
                <p className="text-secondary text-sm mb-1">Calendar Position</p>
                <p className="font-mono text-lg font-bold text-accent">
                  {result.dayOfYear}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-secondary text-sm mb-1">ISO Week Number</p>
                <p className="font-mono text-lg font-bold text-primary">
                  {result.weekNumber}
                </p>
              </div>
            </div>
          </Card>

          {/* Format Comparison Table */}
          <Card>
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              All Date Formats
            </h3>

            <div className="space-y-3">
              {/* US Format */}
              <div className="border border-border rounded-lg p-4 bg-white">
                <p className="text-secondary text-sm font-bold mb-2 uppercase">
                  US Format (MM/DD/YYYY)
                </p>
                <p className="font-mono text-xl font-bold text-primary">{result.us}</p>
                <p className="text-xs text-secondary mt-2">
                  Used in the United States and common in business
                </p>
              </div>

              {/* UK/European Format */}
              <div className="border border-border rounded-lg p-4 bg-white">
                <p className="text-secondary text-sm font-bold mb-2 uppercase">
                  UK / European Format (DD/MM/YYYY)
                </p>
                <p className="font-mono text-xl font-bold text-primary">{result.uk}</p>
                <p className="text-xs text-secondary mt-2">
                  Used in the UK, Australia, and most of Europe
                </p>
              </div>

              {/* ISO 8601 Format */}
              <div className="border border-border rounded-lg p-4 bg-blue-50">
                <p className="text-secondary text-sm font-bold mb-2 uppercase">
                  ISO 8601 Format (YYYY-MM-DD)
                </p>
                <p className="font-mono text-xl font-bold text-primary">{result.iso}</p>
                <p className="text-xs text-secondary mt-2">
                  International standard. Unambiguous, used in computing and databases
                </p>
              </div>

              {/* Long US Format */}
              <div className="border border-border rounded-lg p-4 bg-white">
                <p className="text-secondary text-sm font-bold mb-2 uppercase">
                  Long US Format
                </p>
                <p className="font-mono text-xl font-bold text-primary">{result.longUs}</p>
              </div>

              {/* Long UK Format */}
              <div className="border border-border rounded-lg p-4 bg-white">
                <p className="text-secondary text-sm font-bold mb-2 uppercase">
                  Long UK Format
                </p>
                <p className="font-mono text-xl font-bold text-primary">{result.longUk}</p>
              </div>

              {/* Japanese Format */}
              <div className="border border-border rounded-lg p-4 bg-white">
                <p className="text-secondary text-sm font-bold mb-2 uppercase">
                  Japanese Format (年月日)
                </p>
                <p className="font-mono text-xl font-bold text-primary">{result.japanese}</p>
                <p className="text-xs text-secondary mt-2">
                  Japanese calendar format using kanji characters
                </p>
              </div>

              {/* Written Format */}
              <div className="border border-border rounded-lg p-4 bg-white">
                <p className="text-secondary text-sm font-bold mb-2 uppercase">
                  Written Format
                </p>
                <p className="font-mono text-lg font-bold text-primary">{result.written}</p>
              </div>

              {/* Written Format (Full Words) */}
              <div className="border border-border rounded-lg p-4 bg-white">
                <p className="text-secondary text-sm font-bold mb-2 uppercase">
                  Written Format (Full Words)
                </p>
                <p className="font-mono text-lg font-bold text-primary">{result.writtenFull}</p>
                <p className="text-xs text-secondary mt-2">
                  Formal written format with numbers spelled out
                </p>
              </div>

              {/* Unix Timestamp */}
              <div className="border border-border rounded-lg p-4 bg-gray-50">
                <p className="text-secondary text-sm font-bold mb-2 uppercase">
                  Unix Timestamp (seconds since Jan 1, 1970)
                </p>
                <p className="font-mono text-xl font-bold text-primary">
                  {result.unixTimestamp}
                </p>
                <p className="text-xs text-secondary mt-2">
                  Used in computing and programming
                </p>
              </div>

              {/* Epoch Milliseconds */}
              <div className="border border-border rounded-lg p-4 bg-gray-50">
                <p className="text-secondary text-sm font-bold mb-2 uppercase">
                  Unix Timestamp (milliseconds)
                </p>
                <p className="font-mono text-lg font-bold text-primary text-wrap break-all">
                  {result.epochMs}
                </p>
                <p className="text-xs text-secondary mt-2">
                  JavaScript and modern programming languages use milliseconds
                </p>
              </div>
            </div>
          </Card>

          {/* Key Insight */}
          <Card className="bg-yellow-50 border-2 border-yellow-200">
            <h3 className="font-heading text-lg font-bold text-yellow-900 mb-3">
              Why This Matters
            </h3>

            <div className="space-y-2 text-sm text-yellow-900">
              <p>
                The most common source of confusion is the US vs. UK date formats:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>US: 03/17/2026 means March 17th</li>
                <li>UK: 03/17/2026 means the 17th of March... but wait, that doesn't work!</li>
                <li>UK: 17/03/2026 means 17th of March</li>
              </ul>
              <p className="mt-3">
                When in doubt, use ISO 8601 format (YYYY-MM-DD) which is unambiguous worldwide.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
