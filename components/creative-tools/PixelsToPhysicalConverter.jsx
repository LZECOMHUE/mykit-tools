'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const UNIT_OPTIONS = [
  { value: 'mm', label: 'Millimeters' },
  { value: 'cm', label: 'Centimeters' },
  { value: 'in', label: 'Inches' },
];

const DPI_PRESETS = [
  { label: '72', value: 72 },
  { label: '96', value: 96 },
  { label: '150', value: 150 },
  { label: '300', value: 300 },
  { label: '600', value: 600 },
];

const COMMON_CONVERSIONS = [
  { pixels: 96, dpi: 96, mm: 25.4, label: 'Screen 96 DPI' },
  { pixels: 150, dpi: 150, mm: 25.4, label: 'Web 150 DPI' },
  { pixels: 300, dpi: 300, mm: 25.4, label: 'Print 300 DPI' },
  { pixels: 600, dpi: 600, mm: 25.4, label: 'High Quality 600 DPI' },
  { pixels: 1920, dpi: 96, mm: 508, label: 'HD Width 1920px at 96 DPI' },
  { pixels: 2480, dpi: 300, mm: 209.55, label: 'A4 Width 2480px at 300 DPI' },
];

export default function PixelsToPhysicalConverter() {
  const [mode, setMode] = useState('pixels-to-size');
  const [pixels, setPixels] = useState('300');
  const [dpi, setDpi] = useState('96');
  const [size, setSize] = useState('');
  const [unit, setUnit] = useState('mm');
  const [copied, setCopied] = useState(null);

  const results = useMemo(() => {
    const px = parseFloat(pixels) || 0;
    const d = parseFloat(dpi) || 1;
    const s = parseFloat(size) || 0;

    if (mode === 'pixels-to-size') {
      // size = pixels / DPI * 25.4 (for mm)
      const sizeInInches = px / d;
      const sizeInMm = sizeInInches * 25.4;
      const sizeInCm = sizeInMm / 10;

      return {
        mm: sizeInMm,
        cm: sizeInCm,
        in: sizeInInches,
      };
    } else {
      // pixels = size * DPI / 25.4 (if size is in mm)
      let sizeInInches = s;
      if (unit === 'mm') {
        sizeInInches = s / 25.4;
      } else if (unit === 'cm') {
        sizeInInches = s / 2.54;
      }

      const resultPixels = sizeInInches * d;
      return { pixels: resultPixels };
    }
  }, [pixels, dpi, size, unit, mode]);

  const copyToClipboard = (value, key) => {
    navigator.clipboard.writeText(
      typeof value === 'number' ? value.toFixed(2) : value
    );
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const setDpiPreset = (value) => {
    setDpi(value.toString());
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selector */}
      <div className="flex gap-1 border-b border-border mb-4">
        {[
          { id: 'pixels-to-size', label: 'Pixels to Size' },
          { id: 'size-to-pixels', label: 'Size to Pixels' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px cursor-pointer ${
              mode === tab.id
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {mode === 'pixels-to-size' ? (
        // PIXELS TO SIZE MODE
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="p-6 border border-border">
              <h3 className="font-heading font-semibold mb-4">Input</h3>
              <div className="space-y-4">
                <Input
                  label="Pixels"
                  type="number"
                  value={pixels}
                  onChange={(e) => setPixels(e.target.value)}
                  placeholder="300"
                />
                <div>
                  <Input
                    label="DPI / PPI"
                    type="number"
                    value={dpi}
                    onChange={(e) => setDpi(e.target.value)}
                    placeholder="96"
                  />
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {DPI_PRESETS.map((preset) => (
                      <Button
                        key={preset.value}
                        onClick={() => setDpiPreset(preset.value)}
                        variant={
                          dpi === preset.value.toString() ? 'primary' : 'secondary'
                        }
                        className="text-xs"
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Formula */}
              <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
                <div className="text-xs text-text-secondary font-mono mb-2">
                  Formula:
                </div>
                <div className="text-sm font-mono">
                  size (mm) = pixels ÷ DPI × 25.4
                </div>
              </div>
            </Card>

            {/* Results Section */}
            <Card className="p-6 border border-border bg-surface">
              <h3 className="font-heading font-semibold mb-4">Result</h3>
              <div className="space-y-3">
                <div
                  className="p-3 bg-white rounded-lg border border-border cursor-pointer hover:border-accent transition-colors"
                  onClick={() => copyToClipboard(results.mm, 'mm')}
                >
                  <div className="text-xs text-text-secondary mb-1">
                    Millimeters (mm)
                  </div>
                  <div className="font-mono font-semibold text-lg">
                    {results.mm.toFixed(2)} mm
                  </div>
                  {copied === 'mm' && (
                    <div className="text-xs text-success mt-1">Copied!</div>
                  )}
                </div>

                <div
                  className="p-3 bg-white rounded-lg border border-border cursor-pointer hover:border-accent transition-colors"
                  onClick={() => copyToClipboard(results.cm, 'cm')}
                >
                  <div className="text-xs text-text-secondary mb-1">
                    Centimeters (cm)
                  </div>
                  <div className="font-mono font-semibold text-lg">
                    {results.cm.toFixed(2)} cm
                  </div>
                  {copied === 'cm' && (
                    <div className="text-xs text-success mt-1">Copied!</div>
                  )}
                </div>

                <div
                  className="p-3 bg-white rounded-lg border border-border cursor-pointer hover:border-accent transition-colors"
                  onClick={() => copyToClipboard(results.in, 'in')}
                >
                  <div className="text-xs text-text-secondary mb-1">Inches (in)</div>
                  <div className="font-mono font-semibold text-lg">
                    {results.in.toFixed(2)} in
                  </div>
                  {copied === 'in' && (
                    <div className="text-xs text-success mt-1">Copied!</div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Common Conversions Table */}
          <Card className="p-6 border border-border">
            <h3 className="font-heading font-semibold mb-4">
              Common Conversions Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-semibold">Scenario</th>
                    <th className="text-right py-2 font-semibold">Pixels</th>
                    <th className="text-right py-2 font-semibold">DPI</th>
                    <th className="text-right py-2 font-semibold">Size (mm)</th>
                    <th className="text-right py-2 font-semibold">Size (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMON_CONVERSIONS.map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-surface">
                      <td className="py-2">{row.label}</td>
                      <td className="text-right font-mono">{row.pixels}</td>
                      <td className="text-right font-mono">{row.dpi}</td>
                      <td className="text-right font-mono">
                        {row.mm.toFixed(2)} mm
                      </td>
                      <td className="text-right font-mono">
                        {(row.mm / 25.4).toFixed(2)} in
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : (
        // SIZE TO PIXELS MODE
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="p-6 border border-border">
              <h3 className="font-heading font-semibold mb-4">Input</h3>
              <div className="space-y-4">
                <Select
                  label="Unit"
                  options={UNIT_OPTIONS}
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
                <Input
                  label={`Size (${unit})`}
                  type="number"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="100"
                />
                <div>
                  <Input
                    label="DPI / PPI"
                    type="number"
                    value={dpi}
                    onChange={(e) => setDpi(e.target.value)}
                    placeholder="300"
                  />
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {DPI_PRESETS.map((preset) => (
                      <Button
                        key={preset.value}
                        onClick={() => setDpiPreset(preset.value)}
                        variant={
                          dpi === preset.value.toString() ? 'primary' : 'secondary'
                        }
                        className="text-xs"
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Formula */}
              <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
                <div className="text-xs text-text-secondary font-mono mb-2">
                  Formula:
                </div>
                <div className="text-sm font-mono">
                  pixels = size × DPI ÷ 25.4
                </div>
              </div>
            </Card>

            {/* Results Section */}
            <Card className="p-6 border border-border bg-surface">
              <h3 className="font-heading font-semibold mb-4">Result</h3>
              <div
                className="p-4 bg-white rounded-lg border border-border cursor-pointer hover:border-accent transition-colors"
                onClick={() => copyToClipboard(results.pixels, 'pixels')}
              >
                <div className="text-sm text-text-secondary mb-2">Pixels</div>
                <div className="font-mono font-semibold text-2xl">
                  {Math.round(results.pixels)} px
                </div>
                {copied === 'pixels' && (
                  <div className="text-sm text-success mt-2">Copied!</div>
                )}
              </div>
            </Card>
          </div>

          {/* Quick Reference */}
          <Card className="p-6 border border-border">
            <h3 className="font-heading font-semibold mb-4">Quick Reference</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-surface rounded-lg border border-border">
                <div className="text-sm font-heading font-semibold mb-2">
                  Screen Display (96 DPI)
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">100 px =</span>
                    <span className="font-mono font-semibold">26.46 mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">1 inch =</span>
                    <span className="font-mono font-semibold">96 px</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-surface rounded-lg border border-border">
                <div className="text-sm font-heading font-semibold mb-2">
                  Print (300 DPI)
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">100 px =</span>
                    <span className="font-mono font-semibold">8.47 mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">1 inch =</span>
                    <span className="font-mono font-semibold">300 px</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
