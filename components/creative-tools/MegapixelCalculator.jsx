'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const ASPECT_RATIO_OPTIONS = [
  { value: '1:1', label: '1:1 (Square)' },
  { value: '4:3', label: '4:3 (Standard)' },
  { value: '16:9', label: '16:9 (Widescreen)' },
  { value: '3:2', label: '3:2 (Classic)' },
  { value: '16:10', label: '16:10 (Desktop)' },
  { value: '21:9', label: '21:9 (Ultrawide)' },
];

const CAMERA_PRESETS = [
  { name: '12MP Phone Camera', mp: 12 },
  { name: '24MP Mirrorless', mp: 24 },
  { name: '45MP Pro Mirrorless', mp: 45 },
  { name: '50MP Standard', mp: 50 },
  { name: '100MP Medium Format', mp: 100 },
];

const PRINT_SIZES = [
  { name: '4x6 inches', width: 4, height: 6, unit: 'in' },
  { name: 'A4 (8.3x11.7 in)', width: 8.3, height: 11.7, unit: 'in' },
  { name: 'A3 (11.7x16.5 in)', width: 11.7, height: 16.5, unit: 'in' },
  { name: '8x10 inches', width: 8, height: 10, unit: 'in' },
  { name: '11x14 inches', width: 11, height: 14, unit: 'in' },
  { name: 'Poster 24x36 in', width: 24, height: 36, unit: 'in' },
];

const getResolutionName = (width, height) => {
  const mp = (width * height) / 1000000;
  const aspects = [
    { name: '480p', w: 854, h: 480 },
    { name: '720p', w: 1280, h: 720 },
    { name: '1080p (Full HD)', w: 1920, h: 1080 },
    { name: '1440p (QHD)', w: 2560, h: 1440 },
    { name: '2K', w: 2560, h: 1440 },
    { name: '4K (UHD)', w: 3840, h: 2160 },
    { name: '5K', w: 5120, h: 2880 },
    { name: '8K (DCI)', w: 7680, h: 4320 },
  ];

  const match = aspects.find(
    (a) => Math.abs(a.w - width) < 50 && Math.abs(a.h - height) < 50
  );
  return match ? match.name : `${mp.toFixed(1)}MP`;
};

const getAspectRatio = (width, height) => {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
};

export default function MegapixelCalculator() {
  const [mode, setMode] = useState('resolution-to-mp');
  const [width, setWidth] = useState('3840');
  const [height, setHeight] = useState('2160');
  const [megapixels, setMegapixels] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');

  const calculations = useMemo(() => {
    if (mode === 'resolution-to-mp') {
      const w = parseFloat(width) || 0;
      const h = parseFloat(height) || 0;
      const totalPixels = w * h;
      const mp = totalPixels / 1000000;
      const ratio = getAspectRatio(w, h);
      const resolutionName = getResolutionName(w, h);
      const uncompressedMB = (totalPixels * 3) / 1024 / 1024;

      return {
        megapixels: mp,
        totalPixels,
        resolutionName,
        aspectRatio: ratio,
        uncompressedMB,
      };
    } else {
      // MP to Resolution mode
      const mp = parseFloat(megapixels) || 0;
      const totalPixels = mp * 1000000;
      const ratio = aspectRatio.split(':');
      const ratioWidth = parseFloat(ratio[0]) || 1;
      const ratioHeight = parseFloat(ratio[1]) || 1;

      // Calculate dimensions from MP and aspect ratio
      const aspectValue = ratioWidth / ratioHeight;
      const calculatedHeight = Math.sqrt(totalPixels / aspectValue);
      const calculatedWidth = calculatedHeight * aspectValue;

      return {
        width: Math.round(calculatedWidth),
        height: Math.round(calculatedHeight),
        totalPixels,
        resolutionName: getResolutionName(
          Math.round(calculatedWidth),
          Math.round(calculatedHeight)
        ),
      };
    }
  }, [mode, width, height, megapixels, aspectRatio]);

  const printQuality = useMemo(() => {
    const w = mode === 'resolution-to-mp' ? parseFloat(width) : calculations.width;
    const h = mode === 'resolution-to-mp' ? parseFloat(height) : calculations.height;
    const totalPixels = w * h;

    return PRINT_SIZES.map((size) => {
      const dpi = ((w / size.width) + (h / size.height)) / 2;
      let quality = 'Poor';
      if (dpi >= 300) quality = 'Excellent';
      else if (dpi >= 200) quality = 'Very Good';
      else if (dpi >= 150) quality = 'Good';
      else if (dpi >= 100) quality = 'Fair';

      return {
        ...size,
        dpi: Math.round(dpi),
        quality,
      };
    });
  }, [mode, width, height, calculations]);

  const applyPreset = (preset) => {
    setMegapixels(preset.mp.toString());
    setMode('megapixels-to-resolution');
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Excellent':
        return 'text-success';
      case 'Very Good':
        return 'text-accent';
      case 'Good':
        return 'text-warning';
      default:
        return 'text-error';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Mode Selector */}
      <div className="flex gap-1 border-b border-border mb-4">
        {[
          { id: 'resolution-to-mp', label: 'Resolution to Megapixels' },
          { id: 'megapixels-to-resolution', label: 'Megapixels to Resolution' },
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

      {mode === 'resolution-to-mp' ? (
        // RESOLUTION TO MP MODE
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input */}
            <Card className="border border-border">
              <h3 className="font-heading font-semibold mb-4">Image Resolution</h3>
              <div className="space-y-4">
                <Input
                  label="Width (pixels)"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="3840"
                />
                <Input
                  label="Height (pixels)"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="2160"
                />
              </div>
            </Card>

            {/* Results */}
            <Card className="border border-border bg-surface">
              <h3 className="font-heading font-semibold mb-4">Results</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-border">
                  <div className="text-sm text-text-secondary mb-1">Megapixels</div>
                  <div className="font-mono font-semibold text-2xl">
                    {calculations.megapixels.toFixed(2)} MP
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-border">
                  <div className="text-sm text-text-secondary mb-1">Resolution Name</div>
                  <div className="font-heading font-semibold">
                    {calculations.resolutionName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-lg border border-border">
                    <div className="text-xs text-text-secondary mb-1">
                      Total Pixels
                    </div>
                    <div className="font-mono font-semibold text-sm">
                      {(calculations.totalPixels / 1000000).toFixed(2)}M
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-border">
                    <div className="text-xs text-text-secondary mb-1">
                      Aspect Ratio
                    </div>
                    <div className="font-mono font-semibold text-sm">
                      {calculations.aspectRatio}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-accent-muted rounded-lg border border-accent border-opacity-20">
                  <div className="text-xs text-text-secondary mb-1">
                    File Size (RGB, uncompressed)
                  </div>
                  <div className="font-mono font-semibold">
                    {calculations.uncompressedMB.toFixed(2)} MB
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      ) : (
        // MEGAPIXELS TO RESOLUTION MODE
        <>
          {/* Presets */}
          <Card className="p-4 border-accent-muted bg-accent-muted">
            <h3 className="font-heading font-semibold mb-3 text-sm">Camera Presets</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {CAMERA_PRESETS.map((preset) => (
                <Button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  variant={megapixels === preset.mp.toString() ? 'primary' : 'secondary'}
                  className="text-xs"
                >
                  {preset.mp}MP
                </Button>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input */}
            <Card className="border border-border">
              <h3 className="font-heading font-semibold mb-4">Specifications</h3>
              <div className="space-y-4">
                <Input
                  label="Megapixels (MP)"
                  type="number"
                  step="0.1"
                  value={megapixels}
                  onChange={(e) => setMegapixels(e.target.value)}
                  placeholder="50"
                />
                <Select
                  label="Aspect Ratio"
                  options={ASPECT_RATIO_OPTIONS}
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                />
              </div>
            </Card>

            {/* Results */}
            <Card className="border border-border bg-surface">
              <h3 className="font-heading font-semibold mb-4">Possible Resolution</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-border">
                  <div className="text-sm text-text-secondary mb-1">
                    Resolution
                  </div>
                  <div className="font-mono font-semibold text-lg">
                    {calculations.width} × {calculations.height}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-border">
                  <div className="text-sm text-text-secondary mb-1">
                    Resolution Name
                  </div>
                  <div className="font-heading font-semibold">
                    {calculations.resolutionName}
                  </div>
                </div>

                <div className="p-3 bg-accent-muted rounded-lg border border-accent border-opacity-20">
                  <div className="text-xs text-text-secondary mb-1">
                    Aspect Ratio
                  </div>
                  <div className="font-mono font-semibold">
                    {aspectRatio}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Print Quality Guide */}
      <Card className="border border-border">
        <h3 className="font-heading font-semibold mb-4">Print Quality at Various Sizes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold">Print Size</th>
                <th className="text-right py-2 font-semibold">Required DPI</th>
                <th className="text-right py-2 font-semibold">Current DPI</th>
                <th className="text-right py-2 font-semibold">Quality</th>
              </tr>
            </thead>
            <tbody>
              {printQuality.map((row, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-surface">
                  <td className="py-2">{row.name}</td>
                  <td className="text-right text-text-secondary">300 DPI</td>
                  <td className="text-right font-mono font-semibold">
                    {row.dpi} DPI
                  </td>
                  <td className={`text-right font-semibold ${getQualityColor(row.quality)}`}>
                    {row.quality}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quality Legend */}
      <Card className="border border-border">
        <h3 className="font-heading font-semibold mb-4">Print Quality Ratings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-3 rounded-lg bg-error bg-opacity-10 border border-error border-opacity-20">
            <div className="font-heading font-semibold text-error text-sm mb-1">
              Poor
            </div>
            <div className="text-xs text-text-secondary">Less than 100 DPI</div>
          </div>

          <div className="p-3 rounded-lg bg-warning bg-opacity-10 border border-warning border-opacity-20">
            <div className="font-heading font-semibold text-warning text-sm mb-1">
              Fair
            </div>
            <div className="text-xs text-text-secondary">100-149 DPI</div>
          </div>

          <div className="p-3 rounded-lg bg-warning bg-opacity-10 border border-warning border-opacity-20">
            <div className="font-heading font-semibold text-warning text-sm mb-1">
              Good
            </div>
            <div className="text-xs text-text-secondary">150-199 DPI</div>
          </div>

          <div className="p-3 rounded-lg bg-accent bg-opacity-10 border border-accent border-opacity-20">
            <div className="font-heading font-semibold text-accent text-sm mb-1">
              Very Good
            </div>
            <div className="text-xs text-text-secondary">200-299 DPI</div>
          </div>

          <div className="p-3 rounded-lg bg-success bg-opacity-10 border border-success border-opacity-20">
            <div className="font-heading font-semibold text-success text-sm mb-1">
              Excellent
            </div>
            <div className="text-xs text-text-secondary">300+ DPI</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
