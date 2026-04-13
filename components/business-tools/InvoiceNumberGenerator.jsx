'use client';

import { useState } from 'react';

export default function InvoiceNumberGenerator() {
  const [prefix, setPrefix] = useState('INV');
  const [startingNumber, setStartingNumber] = useState(1001);
  const [separator, setSeparator] = useState('-');
  const [dateFormat, setDateFormat] = useState('none');

  const generateNumbers = (count) => {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      let number = prefix;
      if (dateFormat === 'yyyymm') {
        const now = new Date();
        number += separator + now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0');
      } else if (dateFormat === 'dd') {
        const now = new Date();
        number += separator + String(now.getDate()).padStart(2, '0');
      }
      number += separator + (startingNumber + i).toString().padStart(5, '0');
      numbers.push(number);
    }
    return numbers;
  };

  const numbers = generateNumbers(10);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Prefix
          </label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value.toUpperCase())}
            placeholder="e.g., INV"
            maxLength="10"
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Starting Number
          </label>
          <input
            type="number"
            value={startingNumber}
            onChange={(e) => setStartingNumber(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Separator
          </label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="-">Hyphen (-)</option>
            <option value="/">Slash (/)</option>
            <option value=".">Period (.)</option>
            <option value="">None</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date Format
          </label>
          <select
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="none">None</option>
            <option value="yyyymm">Year-Month (YYYYMM)</option>
            <option value="dd">Day (DD)</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Next 10 Invoice Numbers
        </h3>

        <div className="space-y-2">
          {numbers.map((num, idx) => (
            <div key={idx} className="flex items-center justify-between bg-surface rounded-[var(--radius-input)] p-3">
              <span className="font-mono font-bold text-text-primary">{num}</span>
              <button
                onClick={() => copyToClipboard(num)}
                className="px-3 py-1 text-sm bg-accent text-white rounded-[var(--radius-input)] hover:bg-blue-700 transition"
              >
                Copy
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => copyToClipboard(numbers.join('\n'))}
          className="w-full px-3 py-2 border border-accent text-accent rounded-[var(--radius-input)] font-medium hover:bg-blue-50"
        >
          Copy All
        </button>
      </div>
    </div>
  );
}
