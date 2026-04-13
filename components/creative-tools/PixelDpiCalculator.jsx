'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const DPI_PRESETS = [
  { label: '72 (Screen)', value: 72 },
  { label: '96 (Windows)', value: 96 },
  { label: '150 (Web)', value: 150 },
  { label: '300 (Print)', value: 300 },
  { label: '600 (High Quality)', value: 600 },
];

const UNIT_OPTIONS = [
  { value: 'mm', label: 'Millimeters' },
  { value: 'cm', label: 'Centimeters' },
  { value: 'in', label: 'Inches' },
];

const PRESETS = [
  { name: 'A4 at 300 DPI', widthPx: 2480, heightPx: 3508, dpi: 300 },
  { name: 'US Letter at 300 DPI', widthPx: 2550, heightPx: 3300, dpi: 300 },
  { name: '4x6 Photo at 300 DPI', widthPx: 1200, heightPx: 1800, dpi: 300 },
  { name: 'HD 1920x1080', widthPx: 1920, heightPx: 1080, dpi: 96 },
  { name: '4K 3840x2160', widthPx: 3840, heightPx: 2160, dpi: 96 },
  { name: 'Instagram 1080x1080', widthPx: 1080, heightPx: 1080, dpi: 72 },
];

export default function PixelDpiCalculator() {
  const [widthPx, setWidthPx] = useState('1920');
  const [heightPx, setHeightPx] = useState('1080');
  const [physicalWidth, setPhysicalWidth] = useState('');
  const [physicalHeight, setPhysicalHeight] = useState('');
  const [unit, setUnit] = useState('inches');
  const [dpi, setDpi] = useState('96');
  const [copied, setCopied] = useState(null);

  const calculations = useMemo(() => {
    const wpx = parseFloat(widthPx) || 0;
    const hpx = parseFloat(heightPx) || 0;
    const d = parseFloat(dpi) || 1;
    const pw = parseFloat(physicalWidth) || 0;
    const ph = parseFloat(physicalHeight) || 0;

    // Convert unit to inches for calculations
    const getInches = (value, u) => {
      if (u === 'mm') return value / 25.4;
      if (u === 'cm') return value / 2.54;
      return value;
    };

    const getPhysical = (pixels, d, u) => {
      const inches = pixels / d;
      if (u === 'mm') return inches * 25.4;
      if (u === 'cm') return inches * 2.54;
      return inches;
    };

    // Determine what was changed and recalculate
    let finalWidthPx = wpx;
    let finalHeightPx = hpx;
    let finalWidth = pw;
    let finalHeight = ph;
    let finalDpi = d;

    // If physical dimensions are provided, use them to calculate pixels
    if (pw > 0 && ph > 0) {
      const inchesW = getInches(pw, unit);
      const inchesH = getInches(ph, unit);
      finalWidthPx = Math.round(inchesW * d);
      finalHeightPx = Math.round(inchesH * d);
    } else if (wpx > 0 && hpx > 0) {
      // Calculate physical from pixels
      finalWidth = getPhysical(wpx, d, unit);
      finalHeight = getPhysical(hpx, d, unit);
    }

    // Calculate additional metrics
    const totalPixels = finalWidthPx * finalHeightPx;
    const megapixels = (totalPixels / 1000000).toFixed(2);
    const aspectRatio = finalWidthPx && finalHeightPx
      ? `${(finalWidthPx / finalHeightPx).toFixed(2)}:1`
      : 'N/A';

    // Uncompressed RGB size (3 bytes per pixel)
    const uncompressedMB = (totalPixels * 3 / 1024 / 1024).toFixed(2);

    return {
      widthPx: finalWidthPx,
      heightPx: finalHeightPx,
      physicalWidth: finalWidth,
      physicalHeight: finalHeight,
      totalPixels,
      megapixels,
      aspectRatio,
      uncompressedMB,
    };
  }, [widthPx, heightPx, physicalWidth, physicalHeight, unit, dpi]);

  const copyToClipboard = (value, key) => {
    navigator.clipboard.writeText(value.toString().catch(() => {}));
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const applyPreset = (preset) => {
    setWidthPx(preset.widthPx.toString());
    setHeightPx(preset.heightPx.toString());
    setDpi(preset.dpi.toString());
    setPhysicalWidth('');
    setPhysicalHeight('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Presets */}
      <Card className="p-4 border-accent-muted bg-accent-muted">
        <h3 className="font-heading font-semibold mb-3 text-sm">Quick Presets</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {PRESETS.map((preset) => (
            <Button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              variant="secondary"
              className="text-xs"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Pixels Section */}
        <Card className="border border-border">
          <h3 className="font-heading font-semibold mb-4">Dimensions (Pixels)</h3>
          <div className="space-y-4">
            <div>
              <Input
                label="Width (px)"
                type="number"
                value={widthPx}
                onChange={(e) => {
                  setWidthPx(e.target.value);
                  setPhysicalWidth('');
                }}
                placeholder="1920"
              />
            </div>
            <div>
              <Input
                label="Height (px)"
                type="number"
                value={heightPx}
                onChange={(e) => {
                  setHeightPx(e.target.value);
                  setPhysicalHeight('');
                }}
                placeholder="1080"
              />
            </div>
            <div className="pt-2 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Total Pixels:</span>
                <span className="font-mono font-semibold text-text-primary">
                  {calculations.totalPixels.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Megapixels:</span>
                <span className="font-mono font-semibold text-text-primary">
                  {calculations.megapixels} MP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Aspect Ratio:</span>
                <span className="font-mono font-semibold text-text-primary">
                  {calculations.aspectRatio}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Physical Size Section */}
        <Card className="border border-border">
          <h3 className="font-heading font-semibold mb-4">Physical Size</h3>
          <div className="space-y-4">
            <div>
              <Select
                label="Unit"
                options={UNIT_OPTIONS}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
            <div>
              <Input
                label={`Width (${unit})`}
                type="number"
                value={physicalWidth}
                onChange={(e) => {
                  setPhysicalWidth(e.target.value);
                  if (e.target.value) {
                    setWidthPx('');
                  }
                }}
                placeholder="0"
              />
            </div>
            <div>
              <Input
                label={`Height (${unit})`}
                type="number"
                value={physicalHeight}
                onChange={(e) => {
                  setPhysicalHeight(e.target.value);
                  if (e.target.value) {
                    setHeightPx('');
                  }
                }}
                placeholder="0"
              />
            </div>
            <div className="pt-2">
              <div className="text-sm text-text-secondary mb-2">Current Size:</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Width:</span>
                  <span className="font-mono font-semibold">
                    {calculations.physicalWidth.toFixed(2)} {unit}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Height:</span>
                  <span className="font-mono font-semibold">
                    {calculations.physicalHeight.toFixed(2)} {unit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Resolution Section */}
        <Card className="border border-border">
          <h3 className="font-heading font-semibold mb-4">Resolution</h3>
          <div className="space-y-4">
            <div>
              <Input
                label="DPI / PPI"
                type="number"
                value={dpi}
                onChange={(e) => setDpi(e.target.value)}
                placeholder="300"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary block mb-2">
                Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DPI_PRESETS.map((preset) => (
                  <Button
                    key={preset.value}
                    onClick={() => setDpi(preset.value.toString())}
                    variant={dpi === preset.value.toString() ? 'primary' : 'secondary'}
                    className="text-xs"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="pt-2 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">File Size (RGB):</span>
                <span className="font-mono font-semibold text-text-primary">
                  {calculations.uncompressedMB} MB
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface">
          <div className="text-sm text-text-secondary mb-1">Width × Height</div>
          <div className="font-mono font-semibold text-lg">
            {calculations.widthPx} × {calculations.heightPx}
          </div>
        </Card>
        <Card className="p-4 bg-surface">
          <div className="text-sm text-text-secondary mb-1">Megapixels</div>
          <div className="font-mono font-semibold text-lg">
            {calculations.megapixels} MP
          </div>
        </Card>
        <Card className="p-4 bg-surface">
          <div className="text-sm text-text-secondary mb-1">DPI</div>
          <div className="font-mono font-semibold text-lg">{dpi}</div>
        </Card>
        <Card className="p-4 bg-surface">
          <div className="text-sm text-text-secondary mb-1">File Size</div>
          <div className="font-mono font-semibold text-lg">
            {calculations.uncompressedMB} MB
          </div>
        </Card>
      </div>
    </div>
  );
}
