'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState('1920');
  const [height, setHeight] = useState('1080');
  const [lockRatio, setLockRatio] = useState(false);
  const [unit, setUnit] = useState('px');

  const platformPresets = [
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'Twitter/X Post', width: 1200, height: 675 },
    { name: 'Facebook Cover', width: 820, height: 312 },
    { name: 'LinkedIn Banner', width: 1584, height: 396 },
    { name: 'TikTok', width: 1080, height: 1920 },
    { name: 'A4 Paper', width: 210, height: 297, unit: 'mm' },
  ];

  const presets = [
    { label: '16:9', ratio: 16 / 9 },
    { label: '4:3', ratio: 4 / 3 },
    { label: '1:1', ratio: 1 },
    { label: '9:16', ratio: 9 / 16 },
    { label: '21:9', ratio: 21 / 9 },
    { label: '3:2', ratio: 3 / 2 },
    { label: '2:3', ratio: 2 / 3 },
  ];

  const results = useMemo(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    if (w <= 0 || h <= 0) return null;

    // Calculate GCD to simplify ratio
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(Math.round(w), Math.round(h));
    const simplifiedW = Math.round(w) / divisor;
    const simplifiedH = Math.round(h) / divisor;

    const ratio = w / h;
    let aspectRatioLabel = `${simplifiedW}:${simplifiedH}`;

    // Check against standard presets
    const matchedPreset = presets.find((p) => Math.abs(p.ratio - ratio) < 0.01);
    if (matchedPreset) {
      aspectRatioLabel = matchedPreset.label;
    }

    const megapixels = (w * h) / 1000000;

    const orientation = w > h ? 'Landscape' : w < h ? 'Portrait' : 'Square';

    return {
      width: w,
      height: h,
      aspectRatioLabel,
      megapixels,
      orientation,
      ratio,
    };
  }, [width, height]);

  const handleWidthChange = (newWidth) => {
    setWidth(newWidth);
    if (lockRatio && results) {
      const newHeight = newWidth / results.ratio;
      setHeight(newHeight.toString());
    }
  };

  const handleHeightChange = (newHeight) => {
    setHeight(newHeight);
    if (lockRatio && results) {
      const newWidth = newHeight * results.ratio;
      setWidth(newWidth.toString());
    }
  };

  const handlePresetClick = (ratio) => {
    if (lockRatio) {
      setLockRatio(false);
    }
    const currentHeight = parseFloat(height) || 1080;
    const newWidth = currentHeight * ratio;
    setWidth(newWidth.toString());
    setHeight(currentHeight.toString());
    setLockRatio(true);
  };

  const handlePlatformPreset = (preset) => {
    setWidth(preset.width.toString());
    setHeight(preset.height.toString());
    if (preset.unit) setUnit(preset.unit);
    setLockRatio(false);
  };

  const handleReset = () => {
    setWidth('1920');
    setHeight('1080');
    setLockRatio(false);
    setUnit('px');
  };

  const handleCopy = () => {
    const text = `${width}x${height}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Input Section */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-primary font-semibold">Dimensions</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={lockRatio}
                onChange={(e) => setLockRatio(e.target.checked)}
                className="w-4 h-4 rounded border-border accent-accent"
              />
              <span className="text-sm text-text-secondary">Lock aspect ratio</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Width</label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(e.target.value)}
                placeholder="1920"
                min="1"
                step="1"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Height</label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
                placeholder="1080"
                min="1"
                step="1"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
              >
                <option value="px">Pixels (px)</option>
                <option value="mm">Millimetres (mm)</option>
                <option value="cm">Centimetres (cm)</option>
                <option value="in">Inches (in)</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Visual Preview */}
      {results && (
        <Card className="border-2 border-accent bg-accent/5">
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold">Preview</h3>

            <div className="flex justify-center items-center py-8 bg-white border border-border rounded-lg">
              <div
                className="bg-accent/20 border-2 border-accent rounded-lg transition-all"
                style={{
                  aspectRatio: results.ratio,
                  maxWidth: '100%',
                  width: Math.min(400, results.width),
                  height: 'auto',
                }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-text-secondary text-xs mb-1">Aspect Ratio</p>
                <p className="font-mono text-lg font-bold text-accent">{results.aspectRatioLabel}</p>
              </div>

              <div>
                <p className="text-text-secondary text-xs mb-1">Orientation</p>
                <p className="font-mono text-lg font-bold text-text-primary">{results.orientation}</p>
              </div>

              <div>
                <p className="text-text-secondary text-xs mb-1">Dimensions</p>
                <p className="font-mono text-lg font-bold text-text-primary">
                  {results.width} × {results.height}
                </p>
              </div>

              <div>
                <p className="text-text-secondary text-xs mb-1">Megapixels</p>
                <p className="font-mono text-lg font-bold text-text-primary">{results.megapixels.toFixed(2)} MP</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="primary" onClick={handleCopy}>
                Copy Dimensions
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Common Aspect Ratio Presets */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-text-primary font-semibold">Common Aspect Ratios</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant={results?.aspectRatioLabel === preset.label ? 'primary' : 'secondary'}
                onClick={() => handlePresetClick(preset.ratio)}
                className="text-sm w-full"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Platform Presets */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-text-primary font-semibold">Platform Presets</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {platformPresets.map((preset) => (
              <Button
                key={preset.name}
                variant="secondary"
                onClick={() => handlePlatformPreset(preset)}
                className="text-sm w-full text-left"
              >
                <span className="font-medium">{preset.name}</span>
                <br />
                <span className="text-xs text-text-muted">{preset.width} × {preset.height}</span>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Info Section */}
      <div className="bg-info/10 border border-info rounded-lg p-4 text-sm text-text-secondary space-y-2">
        <p className="font-medium text-text-primary">About Aspect Ratios</p>
        <p>
          An aspect ratio is the proportional relationship between an image's width and height. Locking the aspect ratio maintains the ratio when you change either dimension. Common ratios include 16:9 (widescreen), 4:3 (standard), and 1:1 (square).
        </p>
      </div>
    </div>
  );
}
