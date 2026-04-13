'use client';

import { useState, useMemo } from 'react';

// Tailwind utility classes
const cardCls = 'bg-white border border-border rounded-[var(--radius-card)] p-4';
const inputCls = 'w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-white text-[13px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent';
const selectCls = 'w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-white text-[13px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent';

// Ring size data
const ringSizeData = [
  { uk: 'A', us: 1, eu: 41, jp: 1, circumMm: 36.2, diamMm: 11.5 },
  { uk: 'B', us: 1.5, eu: 42, jp: 2, circumMm: 37.3, diamMm: 11.9 },
  { uk: 'C', us: 2, eu: 43, jp: 3, circumMm: 38.4, diamMm: 12.2 },
  { uk: 'D', us: 2.5, eu: 44, jp: 4, circumMm: 39.5, diamMm: 12.6 },
  { uk: 'E', us: 3, eu: 45, jp: 5, circumMm: 40.6, diamMm: 12.9 },
  { uk: 'F', us: 3.5, eu: 46, jp: 6, circumMm: 41.7, diamMm: 13.3 },
  { uk: 'G', us: 4, eu: 47, jp: 7, circumMm: 42.8, diamMm: 13.6 },
  { uk: 'H', us: 4.5, eu: 48, jp: 8, circumMm: 43.9, diamMm: 14.0 },
  { uk: 'I', us: 5, eu: 49, jp: 9, circumMm: 45.0, diamMm: 14.3 },
  { uk: 'J', us: 5.5, eu: 50, jp: 10, circumMm: 46.1, diamMm: 14.7 },
  { uk: 'K', us: 6, eu: 51, jp: 11, circumMm: 47.2, diamMm: 15.0 },
  { uk: 'L', us: 6.5, eu: 52, jp: 12, circumMm: 48.3, diamMm: 15.4 },
  { uk: 'M', us: 7, eu: 53, jp: 13, circumMm: 49.4, diamMm: 15.7 },
  { uk: 'N', us: 7.5, eu: 54, jp: 14, circumMm: 50.5, diamMm: 16.1 },
  { uk: 'O', us: 8, eu: 55, jp: 15, circumMm: 51.6, diamMm: 16.4 },
  { uk: 'P', us: 8.5, eu: 56, jp: 16, circumMm: 52.7, diamMm: 16.8 },
  { uk: 'Q', us: 9, eu: 57, jp: 17, circumMm: 53.8, diamMm: 17.1 },
  { uk: 'R', us: 9.5, eu: 58, jp: 18, circumMm: 54.9, diamMm: 17.5 },
  { uk: 'S', us: 10, eu: 59, jp: 19, circumMm: 56.0, diamMm: 17.8 },
  { uk: 'T', us: 10.5, eu: 60, jp: 20, circumMm: 57.1, diamMm: 18.2 },
  { uk: 'U', us: 11, eu: 61, jp: 21, circumMm: 58.2, diamMm: 18.5 },
  { uk: 'V', us: 11.5, eu: 62, jp: 22, circumMm: 59.3, diamMm: 18.9 },
  { uk: 'W', us: 12, eu: 63, jp: 23, circumMm: 60.4, diamMm: 19.2 },
  { uk: 'X', us: 12.5, eu: 64, jp: 24, circumMm: 61.5, diamMm: 19.6 },
  { uk: 'Y', us: 13, eu: 65, jp: 25, circumMm: 62.6, diamMm: 19.9 },
  { uk: 'Z', us: 13.5, eu: 66, jp: 26, circumMm: 63.7, diamMm: 20.3 },
];

export default function RingSizeConverter() {
  const [inputType, setInputType] = useState('uk');
  const [inputValue, setInputValue] = useState('M');

  const selectedSize = useMemo(() => {
    if (inputType === 'circumMm') {
      const inputNum = parseFloat(inputValue);
      if (!inputNum) return null;
      let closest = ringSizeData[0];
      let minDiff = Math.abs(closest.circumMm - inputNum);
      ringSizeData.forEach(size => {
        const diff = Math.abs(size.circumMm - inputNum);
        if (diff < minDiff) {
          minDiff = diff;
          closest = size;
        }
      });
      return closest;
    } else if (inputType === 'diamMm') {
      const inputNum = parseFloat(inputValue);
      if (!inputNum) return null;
      let closest = ringSizeData[0];
      let minDiff = Math.abs(closest.diamMm - inputNum);
      ringSizeData.forEach(size => {
        const diff = Math.abs(size.diamMm - inputNum);
        if (diff < minDiff) {
          minDiff = diff;
          closest = size;
        }
      });
      return closest;
    } else if (inputType === 'uk') {
      return ringSizeData.find(s => s.uk === inputValue.toUpperCase());
    } else if (inputType === 'us') {
      return ringSizeData.find(s => s.us === parseFloat(inputValue));
    } else if (inputType === 'eu') {
      return ringSizeData.find(s => s.eu === parseInt(inputValue));
    } else if (inputType === 'jp') {
      return ringSizeData.find(s => s.jp === parseInt(inputValue));
    }
    return null;
  }, [inputType, inputValue]);

  return (
    <div className="max-w-3xl space-y-4">
      {/* Input Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className={cardCls}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Enter a Size</h3>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Size Type</label>
            <select
              className={selectCls}
              value={inputType}
              onChange={(e) => {
                setInputType(e.target.value);
                setInputValue('');
              }}
            >
              <option value="uk">UK Size (A-Z)</option>
              <option value="us">US Size (1-13.5)</option>
              <option value="eu">EU Size (41-66)</option>
              <option value="jp">Japanese Size (1-26)</option>
              <option value="circumMm">Circumference (mm)</option>
              <option value="diamMm">Diameter (mm)</option>
            </select>
          </div>
        </div>

        <div className={cardCls}>
          {inputType === 'uk' && (
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">UK Size</label>
              <select
                className={selectCls}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              >
                <option value="">Select...</option>
                {ringSizeData.map(s => (
                  <option key={s.uk} value={s.uk}>{s.uk}</option>
                ))}
              </select>
            </div>
          )}

          {inputType === 'us' && (
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">US Size</label>
              <select
                className={selectCls}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              >
                <option value="">Select...</option>
                {ringSizeData.map(s => (
                  <option key={s.us} value={s.us}>{s.us}</option>
                ))}
              </select>
            </div>
          )}

          {inputType === 'eu' && (
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">EU Size</label>
              <select
                className={selectCls}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              >
                <option value="">Select...</option>
                {ringSizeData.map(s => (
                  <option key={s.eu} value={s.eu}>{s.eu}</option>
                ))}
              </select>
            </div>
          )}

          {inputType === 'jp' && (
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Japanese Size</label>
              <select
                className={selectCls}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              >
                <option value="">Select...</option>
                {ringSizeData.map(s => (
                  <option key={s.jp} value={s.jp}>{s.jp}</option>
                ))}
              </select>
            </div>
          )}

          {inputType === 'circumMm' && (
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Circumference (mm)</label>
              <input
                className={inputCls}
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="49.4"
                step="0.1"
              />
            </div>
          )}

          {inputType === 'diamMm' && (
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Diameter (mm)</label>
              <input
                className={inputCls}
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="15.7"
                step="0.1"
              />
            </div>
          )}
        </div>
      </div>

      {/* Conversion Result */}
      {selectedSize && (
        <div className={`${cardCls} bg-accent-muted`}>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-4">Equivalent Sizes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-[13px]">
            <div>
              <p className="text-text-muted mb-1">UK</p>
              <p className="font-mono text-xl font-semibold text-accent">{selectedSize.uk}</p>
            </div>
            <div>
              <p className="text-text-muted mb-1">US</p>
              <p className="font-mono text-xl font-semibold text-accent">{selectedSize.us}</p>
            </div>
            <div>
              <p className="text-text-muted mb-1">EU</p>
              <p className="font-mono text-xl font-semibold text-accent">{selectedSize.eu}</p>
            </div>
            <div>
              <p className="text-text-muted mb-1">Japanese</p>
              <p className="font-mono text-xl font-semibold text-accent">{selectedSize.jp}</p>
            </div>
            <div>
              <p className="text-text-muted mb-1">Circumference</p>
              <p className="font-mono text-lg font-semibold text-accent">{selectedSize.circumMm}mm</p>
            </div>
            <div>
              <p className="text-text-muted mb-1">Diameter</p>
              <p className="font-mono text-lg font-semibold text-accent">{selectedSize.diamMm}mm</p>
            </div>
          </div>
        </div>
      )}

      {/* Full Reference Table */}
      <div className={cardCls}>
        <h3 className="font-heading text-sm font-semibold text-text-primary mb-4">Complete Ring Size Chart</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead className="border-b border-border bg-surface">
              <tr>
                <th className="text-left p-2 font-semibold text-text-primary">UK</th>
                <th className="text-left p-2 font-semibold text-text-primary">US</th>
                <th className="text-left p-2 font-semibold text-text-primary">EU</th>
                <th className="text-left p-2 font-semibold text-text-primary">JP</th>
                <th className="text-right p-2 font-semibold text-text-primary">Circumference</th>
                <th className="text-right p-2 font-semibold text-text-primary">Diameter</th>
              </tr>
            </thead>
            <tbody>
              {ringSizeData.map((size, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-border ${
                    selectedSize?.uk === size.uk ? 'bg-accent-muted' : 'hover:bg-surface'
                  }`}
                >
                  <td className="p-2 font-mono text-text-primary">{size.uk}</td>
                  <td className="p-2 font-mono text-text-primary">{size.us}</td>
                  <td className="p-2 font-mono text-text-primary">{size.eu}</td>
                  <td className="p-2 font-mono text-text-primary">{size.jp}</td>
                  <td className="p-2 font-mono text-right text-text-secondary">{size.circumMm}mm</td>
                  <td className="p-2 font-mono text-right text-text-secondary">{size.diamMm}mm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How to Measure */}
      <div className="bg-surface/50 border border-border rounded-[var(--radius-card)] p-4">
        <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">How to Measure Your Ring Size</h3>
        <ul className="text-[12px] text-text-secondary space-y-1 list-disc list-inside">
          <li><strong>With a ring you wear:</strong> Measure the inner diameter with calipers</li>
          <li><strong>With string or tape:</strong> Wrap around your finger (knuckle), measure circumference</li>
          <li><strong>At a jeweller:</strong> They have a proper ring sizer tool (most accurate)</li>
          <li>Measure when your hands are warm and at the end of the day (fingers swell)</li>
          <li>Most people are a size M-R (UK) or 6-10 (US)</li>
        </ul>
      </div>
    </div>
  );
}
