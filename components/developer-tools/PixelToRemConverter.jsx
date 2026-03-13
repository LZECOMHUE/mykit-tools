'use client';

import { useState, useMemo } from 'react';

export default function PixelToRemConverter() {
  const [pixelValue, setPixelValue] = useState('16');
  const [remValue, setRemValue] = useState('1');
  const [baseFontSize, setBaseFontSize] = useState('16');
  const [mode, setMode] = useState('px-to-rem');

  const results = useMemo(() => {
    const base = parseFloat(baseFontSize) || 16;

    if (mode === 'px-to-rem') {
      const px = parseFloat(pixelValue) || 0;
      const rem = px / base;
      return { px, rem, base };
    } else {
      const rem = parseFloat(remValue) || 0;
      const px = rem * base;
      return { px, rem, base };
    }
  }, [pixelValue, remValue, baseFontSize, mode]);

  const commonValues = [12, 14, 16, 18, 20, 24, 32, 48, 64];
  const previewSizes = [
    { label: 'Small', px: 12 },
    { label: 'Base', px: 16 },
    { label: 'Large', px: 24 },
    { label: 'XL', px: 32 },
  ];

  const copyToClipboard = (value) => {
    const px = results.px.toFixed(2);
    const rem = results.rem.toFixed(3);
    const text = `font-size: ${rem}rem; /* ${px}px */`;
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      alert('CSS copied to clipboard!');
    }, 100);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Mode Toggle */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <label className="block text-text-secondary text-sm font-medium mb-3">
          Conversion Mode
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMode('px-to-rem');
              setPixelValue('16');
            }}
            className={`flex-1 px-4 py-2 rounded-[8px] font-medium transition-colors ${
              mode === 'px-to-rem'
                ? 'bg-accent text-white'
                : 'bg-white border border-border text-text-primary hover:bg-surface'
            }`}
          >
            Pixels to REM
          </button>
          <button
            onClick={() => {
              setMode('rem-to-px');
              setRemValue('1');
            }}
            className={`flex-1 px-4 py-2 rounded-[8px] font-medium transition-colors ${
              mode === 'rem-to-px'
                ? 'bg-accent text-white'
                : 'bg-white border border-border text-text-primary hover:bg-surface'
            }`}
          >
            REM to Pixels
          </button>
        </div>
      </div>

      {/* Base Font Size */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <label className="block text-text-secondary text-sm font-medium mb-1">
          Base Font Size (for REM calculation)
        </label>
        <div className="flex gap-2 mb-3">
          {[12, 14, 16, 18].map((size) => (
            <button
              key={size}
              onClick={() => setBaseFontSize(size.toString())}
              className={`px-3 py-2 rounded-[8px] font-medium transition-colors text-sm ${
                parseInt(baseFontSize) === size
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              {size}px
            </button>
          ))}
        </div>
        <input
          type="number"
          value={baseFontSize}
          onChange={(e) => setBaseFontSize(e.target.value)}
          placeholder="16"
          className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
        />
        <p className="text-text-muted text-xs mt-2">
          Usually set to the root font-size (default 16px in browsers)
        </p>
      </div>

      {/* Conversion Input */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        {mode === 'px-to-rem' ? (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Pixels (px)
            </label>
            <input
              type="number"
              value={pixelValue}
              onChange={(e) => setPixelValue(e.target.value)}
              placeholder="Enter pixel value"
              className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        ) : (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              REM Value
            </label>
            <input
              type="number"
              value={remValue}
              onChange={(e) => setRemValue(e.target.value)}
              placeholder="Enter REM value"
              step="0.1"
              className="w-full px-4 py-3 bg-white border border-border rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-2">Pixels</p>
          <p className="font-mono text-2xl font-bold text-text-primary">
            {results.px.toFixed(2)}px
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
          <p className="text-text-secondary text-sm mb-2">REM</p>
          <p className="font-mono text-2xl font-bold text-accent">
            {results.rem.toFixed(3)}rem
          </p>
        </div>
      </div>

      {/* CSS Copy */}
      <div className="bg-accent bg-opacity-10 border border-accent rounded-[12px] p-4 sm:p-6">
        <p className="text-text-muted text-xs mb-3 uppercase font-semibold">
          CSS Output
        </p>
        <div className="bg-white border border-border rounded-[8px] p-4 mb-4 font-mono text-sm text-text-primary overflow-x-auto">
          font-size: {results.rem.toFixed(3)}rem; /* {results.px.toFixed(2)}px
          */
        </div>
        <button
          onClick={() => copyToClipboard()}
          className="w-full px-4 py-2 bg-accent text-white rounded-[8px] font-medium hover:bg-accent hover:brightness-110 transition-all"
        >
          📋 Copy CSS
        </button>
      </div>

      {/* Common Values Reference Table */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <h3 className="text-text-primary font-semibold mb-4">
          Common Values Reference
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-text-secondary font-medium py-2 px-3">
                  Pixels
                </th>
                <th className="text-right text-text-secondary font-medium py-2 px-3">
                  REM
                </th>
                <th className="text-right text-text-secondary font-medium py-2 px-3">
                  Usage
                </th>
              </tr>
            </thead>
            <tbody>
              {commonValues.map((px) => {
                const base = parseFloat(baseFontSize) || 16;
                const rem = px / base;
                return (
                  <tr
                    key={px}
                    className="border-b border-border hover:bg-white transition-colors last:border-b-0"
                  >
                    <td className="text-text-primary font-mono py-2 px-3">
                      {px}px
                    </td>
                    <td className="text-right text-accent font-mono font-semibold py-2 px-3">
                      {rem.toFixed(3)}rem
                    </td>
                    <td className="text-right text-text-muted text-xs py-2 px-3">
                      {px <= 12
                        ? 'Small text'
                        : px <= 16
                          ? 'Body text'
                          : px <= 20
                            ? 'Subheading'
                            : px <= 32
                              ? 'Heading'
                              : 'Large heading'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Text Preview */}
      <div className="bg-surface border border-border rounded-[12px] p-4 sm:p-6">
        <h3 className="text-text-primary font-semibold mb-4">Text Preview</h3>
        <div className="space-y-4">
          {previewSizes.map((size) => (
            <div key={size.px} className="space-y-1">
              <p className="text-text-secondary text-xs font-medium">
                {size.label} ({size.px}px / {(size.px / (parseFloat(baseFontSize) || 16)).toFixed(3)}rem)
              </p>
              <div
                className="bg-white border border-border rounded-[8px] p-4 text-text-primary"
                style={{ fontSize: `${size.px}px` }}
              >
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-info bg-opacity-10 border border-info rounded-[12px] p-4 sm:p-6">
        <p className="text-info text-sm font-medium mb-2">Why use REM?</p>
        <p className="text-text-secondary text-sm">
          REM units are relative to the root element's font size, making them perfect for scalable,
          accessible designs. They respond to user font-size preferences and are easier to maintain
          than pixels. Use REM for fonts and spacing, PX for borders and precise measurements.
        </p>
      </div>
    </div>
  );
}
