'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ColourContrastCheckerPro() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');

  const presets = [
    { name: 'Black on White', fg: '#000000', bg: '#ffffff' },
    { name: 'White on Black', fg: '#ffffff', bg: '#000000' },
    { name: 'Dark Blue on Light', fg: '#1a365d', bg: '#e0f2fe' },
    { name: 'White on Blue', fg: '#ffffff', bg: '#2563eb' },
    { name: 'Dark on Cream', fg: '#1a1a1a', bg: '#fffef0' },
    { name: 'Navy on Yellow', fg: '#0c3b66', bg: '#fef08a' },
  ];

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  };

  const getLuminance = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const getContrastRatio = (hex1, hex2) => {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  };

  const checkWCAG = (ratio) => {
    const numRatio = parseFloat(ratio);
    return {
      AANormalText: numRatio >= 4.5,
      AALargeText: numRatio >= 3,
      AAUIComponent: numRatio >= 3,
      AAA: numRatio >= 7,
    };
  };

  const analysis = useMemo(() => {
    const ratio = getContrastRatio(foreground, background);
    const wcag = checkWCAG(ratio);

    return { ratio, wcag };
  }, [foreground, background]);

  const generateNearbyAccessibleColours = () => {
    const fgRgb = hexToRgb(foreground);
    if (!fgRgb) return [];

    const suggestions = [];
    const adjustments = [
      { r: 30, g: 30, b: 30 },
      { r: -30, g: -30, b: -30 },
      { r: 50, g: 50, b: 50 },
      { r: -50, g: -50, b: -50 },
    ];

    adjustments.forEach(adj => {
      const newR = Math.max(0, Math.min(255, fgRgb.r + adj.r));
      const newG = Math.max(0, Math.min(255, fgRgb.g + adj.g));
      const newB = Math.max(0, Math.min(255, fgRgb.b + adj.b));
      const newHex = rgbToHex(newR, newG, newB);
      const ratio = getContrastRatio(newHex, background);

      if (parseFloat(ratio) >= 4.5) {
        suggestions.push({ hex: newHex, ratio });
      }
    });

    return suggestions;
  };

  const suggestions = useMemo(() => generateNearbyAccessibleColours(), [foreground, background]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Colour Pickers */}
      <div className="bg-surface rounded-[12px] border border-border p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6">WCAG Contrast Checker</h2>

        {/* Presets */}
        <div className="mb-6">
          <p className="text-sm font-medium text-text-secondary mb-3">Quick Presets</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setForeground(preset.fg);
                  setBackground(preset.bg);
                }}
                className="p-3 rounded-[8px] border border-border hover:border-accent transition text-center text-xs text-text-primary"
              >
                <div
                  className="w-full h-6 rounded mb-1"
                  style={{ backgroundColor: preset.bg }}
                >
                  <div style={{ color: preset.fg }}>Aa</div>
                </div>
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Foreground */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Foreground (Text)
            </label>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <input
                  type="color"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="w-full h-12 rounded-[8px] cursor-pointer border border-border"
                />
              </div>
              <input
                type="text"
                value={foreground}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.startsWith('#') && val.length === 7) {
                    setForeground(val.toUpperCase());
                  }
                }}
                className="flex-1 px-3 py-2 border border-border rounded-[8px] bg-white text-text-primary text-sm font-mono"
              />
            </div>
          </div>

          {/* Background */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Background
            </label>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full h-12 rounded-[8px] cursor-pointer border border-border"
                />
              </div>
              <input
                type="text"
                value={background}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.startsWith('#') && val.length === 7) {
                    setBackground(val.toUpperCase());
                  }
                }}
                className="flex-1 px-3 py-2 border border-border rounded-[8px] bg-white text-text-primary text-sm font-mono"
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => {
            setForeground(background);
            setBackground(foreground);
          }}
        >
          ↔ Swap Colours
        </Button>
      </div>

      {/* Live Preview */}
      <div
        className="rounded-[12px] border border-border p-12 text-center"
        style={{ backgroundColor: background }}
      >
        <h3 className="text-3xl font-bold mb-2" style={{ color: foreground }}>
          Preview Text
        </h3>
        <p className="text-lg mb-4" style={{ color: foreground }}>
          This is how your text will appear on the background.
        </p>
        <p className="text-sm" style={{ color: foreground }}>
          The quick brown fox jumps over the lazy dog
        </p>
      </div>

      {/* Contrast Ratio */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold text-text-primary mb-6">Contrast Analysis</h3>

        <div className="mb-6">
          <p className="text-sm text-text-secondary mb-2">Contrast Ratio</p>
          <p className="text-4xl font-bold text-accent font-mono mb-1">
            {analysis.ratio}:1
          </p>
          <p className="text-xs text-text-muted">
            Higher ratios indicate greater contrast and better accessibility
          </p>
        </div>

        {/* WCAG Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AA Standards */}
          <div className="border border-border rounded-[8px] p-4">
            <p className="text-sm font-semibold text-text-primary mb-3">WCAG AA</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Normal Text</span>
                <span className={`text-sm font-bold ${analysis.wcag.AANormalText ? 'text-success' : 'text-error'}`}>
                  {analysis.wcag.AANormalText ? '✓ Pass' : '✗ Fail'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Large Text</span>
                <span className={`text-sm font-bold ${analysis.wcag.AALargeText ? 'text-success' : 'text-error'}`}>
                  {analysis.wcag.AALargeText ? '✓ Pass' : '✗ Fail'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">UI Components</span>
                <span className={`text-sm font-bold ${analysis.wcag.AAUIComponent ? 'text-success' : 'text-error'}`}>
                  {analysis.wcag.AAUIComponent ? '✓ Pass' : '✗ Fail'}
                </span>
              </div>
            </div>
          </div>

          {/* AAA Standard */}
          <div className={`border rounded-[8px] p-4 ${analysis.wcag.AAA ? 'bg-green-50 border-green-200' : 'border-border'}`}>
            <p className="text-sm font-semibold text-text-primary mb-3">WCAG AAA</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Enhanced Contrast</span>
              <span className={`text-sm font-bold ${analysis.wcag.AAA ? 'text-success' : 'text-error'}`}>
                {analysis.wcag.AAA ? '✓ Pass' : '✗ Fail'}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-2">Requires 7:1 ratio</p>
          </div>
        </div>
      </div>

      {/* Accessibility Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-3">Accessibility Requirements</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex gap-2">
            <span className="font-bold">4.5:1</span>
            <span>Required for normal text (AA standard)</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">3:1</span>
            <span>Required for large text and UI components (AA standard)</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">7:1</span>
            <span>Required for enhanced accessibility (AAA standard)</span>
          </li>
        </ul>
      </div>

      {/* Suggestions */}
      {!analysis.wcag.AANormalText && suggestions.length > 0 && (
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Accessible Alternatives</h3>
          <p className="text-sm text-text-secondary mb-4">
            Try these foreground colours to achieve WCAG AA compliance with your current background.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setForeground(suggestion.hex)}
                className="p-4 border border-border rounded-[8px] hover:border-accent transition text-center"
              >
                <div
                  className="w-full h-12 rounded mb-2"
                  style={{ backgroundColor: suggestion.hex }}
                >
                  <div style={{ color: suggestion.hex === '#000000' ? 'white' : 'black', fontSize: '8px' }}>
                    {suggestion.hex}
                  </div>
                </div>
                <p className="text-xs font-mono font-bold text-text-primary">{suggestion.hex}</p>
                <p className="text-xs text-text-muted">Ratio: {suggestion.ratio}:1</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
