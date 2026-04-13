'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

export default function TextToCsvConverter() {
  const [text, setText] = useState('');
  const [delimiter, setDelimiter] = useState('auto');
  const [detectedDelimiter, setDetectedDelimiter] = useState(null);

  const { rows, csvOutput } = useMemo(() => {
    if (!text.trim()) {
      return { rows: [], csvOutput: '' };
    }

    let delim = delimiter;
    if (delimiter === 'auto') {
      // Auto-detect delimiter
      const commonDelimiters = [',', '\t', '|', ';'];
      let maxCount = 0;
      commonDelimiters.forEach((d) => {
        const count = (text.split('\n')[0] || '').split(d).length;
        if (count > maxCount) {
          maxCount = count;
          delim = d;
        }
      });
      setDetectedDelimiter(delim);
    }

    // Parse text into rows
    const lines = text.split('\n');
    const parsedRows = [];

    lines.forEach((line) => {
      if (!line.trim()) return;

      const fields = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === delim && !inQuotes) {
          fields.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      fields.push(current.trim());

      parsedRows.push(fields);
    });

    // Convert to CSV (with proper quoting if needed)
    const csv = parsedRows
      .map((row) =>
        row
          .map((field) => {
            if (field.includes(',') || field.includes('"') || field.includes('\n')) {
              return `"${field.replace(/"/g, '""')}"`;
            }
            return field;
          })
          .join(',')
      )
      .join('\n');

    return { rows: parsedRows, csvOutput: csv };
  }, [text, delimiter]);

  const handleCopy = () => {
    navigator.clipboard.writeText(csvOutput).catch(() => {});
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvOutput)}`);
    element.setAttribute('download', 'data.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Paste Delimited Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste comma-separated, tab-separated, or pipe-separated text..."
          className="w-full min-h-[150px] px-4 py-3 border border-border rounded-[var(--radius-input)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-10 resize-vertical"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Delimiter
        </label>
        <Select
          value={delimiter}
          onChange={setDelimiter}
          options={[
            { value: 'auto', label: 'Auto-detect' },
            { value: ',', label: 'Comma (,)' },
            { value: '\t', label: 'Tab' },
            { value: '|', label: 'Pipe (|)' },
            { value: ';', label: 'Semicolon (;)' },
          ]}
        />
        {detectedDelimiter && delimiter === 'auto' && (
          <p className="text-xs text-text-muted mt-2">
            Detected: {detectedDelimiter === '\t' ? 'Tab' : detectedDelimiter === ',' ? 'Comma' : detectedDelimiter === '|' ? 'Pipe' : 'Semicolon'}
          </p>
        )}
      </div>

      {rows.length > 0 && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)]">
            <h3 className="text-sm font-medium text-text-secondary mb-4">
              Preview ({rows.length} row{rows.length !== 1 ? 's' : ''})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {rows.slice(0, 10).map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-surface-hover'}>
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className="border border-border px-3 py-2 font-mono text-text-primary"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {rows.length > 10 && (
                <p className="text-xs text-text-muted mt-2">
                  ...and {rows.length - 10} more rows
                </p>
              )}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-3">
            <p className="text-sm font-medium text-text-secondary">CSV Output:</p>
            <textarea
              value={csvOutput}
              readOnly
              className="w-full min-h-[200px] px-4 py-3 font-mono text-sm text-text-primary bg-white border border-border rounded-[var(--radius-input)] resize-vertical"
            />
            <div className="flex gap-2">
              <Button onClick={handleCopy} className="flex-1">
                Copy CSV
              </Button>
              <Button onClick={handleDownload} className="flex-1">
                Download CSV
              </Button>
            </div>
          </div>
        </div>
      )}

      {!text && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] text-center">
          <p className="text-text-muted">Paste delimited text to convert to CSV format</p>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>Convert any delimited text to proper CSV format with automatic delimiter detection.</p>
      </div>
    </div>
  );
}
