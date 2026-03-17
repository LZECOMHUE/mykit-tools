'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';

const DPI_PRESETS = [
  { from: 72, to: 300, label: '72 to 300 (Web to Print)' },
  { from: 150, to: 300, label: '150 to 300 (Upgrade for Print)' },
  { from: 300, to: 72, label: '300 to 72 (Print to Web)' },
  { from: 96, to: 300, label: '96 to 300 (Screen to Print)' },
];

export default function ImageDpiChanger() {
  const [currentWidth, setCurrentWidth] = useState('3840');
  const [currentHeight, setCurrentHeight] = useState('2160');
  const [currentDpi, setCurrentDpi] = useState('72');
  const [desiredDpi, setDesiredDpi] = useState('300');
  const [resampleImage, setResampleImage] = useState(false);
  const [copied, setCopied] = useState(null);

  const calculations = useMemo(() => {
    const w = parseFloat(currentWidth) || 0;
    const h = parseFloat(currentHeight) || 0;
    const fromDpi = parseFloat(currentDpi) || 1;
    const toDpi = parseFloat(desiredDpi) || 1;

    // Current physical size
    const currentPhysicalWidth = w / fromDpi;
    const currentPhysicalHeight = h / fromDpi;

    // Size if just changing DPI metadata (pixels stay the same)
    const newPhysicalWidth = w / toDpi;
    const newPhysicalHeight = h / toDpi;

    // Size if resampling (physical size stays the same)
    const newPixelsWidth = currentPhysicalWidth * toDpi;
    const newPixelsHeight = currentPhysicalHeight * toDpi;

    // Current file size (RGB, uncompressed)
    const currentPixels = w * h;
    const currentFileSizeMB = (currentPixels * 3) / 1024 / 1024;

    // File size after resampling
    const newPixelsTotal = newPixelsWidth * newPixelsHeight;
    const newFileSizeMB = (newPixelsTotal * 3) / 1024 / 1024;

    // DPI change ratio
    const dpiRatio = toDpi / fromDpi;

    return {
      currentPhysicalWidth,
      currentPhysicalHeight,
      newPhysicalWidth,
      newPhysicalHeight,
      newPixelsWidth,
      newPixelsHeight,
      currentFileSizeMB,
      newFileSizeMB,
      dpiRatio,
      resampleNeeded: Math.abs(dpiRatio - 1) > 0.01,
    };
  }, [currentWidth, currentHeight, currentDpi, desiredDpi]);

  const copyToClipboard = (value, key) => {
    navigator.clipboard.writeText(
      typeof value === 'number' ? value.toFixed(0) : value
    );
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const applyPreset = (preset) => {
    setCurrentDpi(preset.from.toString());
    setDesiredDpi(preset.to.toString());
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Quick Presets */}
      <Card className="p-4 border-accent-muted bg-accent-muted">
        <h3 className="font-heading font-semibold mb-3 text-sm">Quick Presets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {DPI_PRESETS.map((preset) => (
            <Button
              key={preset.label}
              onClick={() => applyPreset(preset)}
              variant="secondary"
              className="text-xs"
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Main Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Image Section */}
        <Card className="p-6 border border-border">
          <h3 className="font-heading font-semibold mb-4">Current Image</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-secondary block mb-1">
                Width (pixels)
              </label>
              <Input
                type="number"
                value={currentWidth}
                onChange={(e) => setCurrentWidth(e.target.value)}
                placeholder="3840"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary block mb-1">
                Height (pixels)
              </label>
              <Input
                type="number"
                value={currentHeight}
                onChange={(e) => setCurrentHeight(e.target.value)}
                placeholder="2160"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary block mb-1">
                Current DPI
              </label>
              <Input
                type="number"
                value={currentDpi}
                onChange={(e) => setCurrentDpi(e.target.value)}
                placeholder="72"
              />
            </div>

            <div className="pt-2 space-y-2 text-sm border-t border-border">
              <div className="flex justify-between">
                <span className="text-text-secondary">Physical Width:</span>
                <span className="font-mono font-semibold">
                  {calculations.currentPhysicalWidth.toFixed(2)}"
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Physical Height:</span>
                <span className="font-mono font-semibold">
                  {calculations.currentPhysicalHeight.toFixed(2)}"
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">File Size:</span>
                <span className="font-mono font-semibold">
                  {calculations.currentFileSizeMB.toFixed(2)} MB
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Desired DPI Section */}
        <Card className="p-6 border border-border">
          <h3 className="font-heading font-semibold mb-4">Target DPI</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-secondary block mb-1">
                Desired DPI
              </label>
              <Input
                type="number"
                value={desiredDpi}
                onChange={(e) => setDesiredDpi(e.target.value)}
                placeholder="300"
              />
            </div>

            <div className="pt-4 border-t border-border">
              <label className="flex items-center gap-3 cursor-pointer">
                <Toggle
                  checked={resampleImage}
                  onChange={setResampleImage}
                />
                <span className="text-sm font-medium text-text-secondary">
                  Resample Image
                </span>
              </label>
              <p className="text-xs text-text-muted mt-2">
                If enabled: resize pixels to keep physical size constant.
              </p>
              <p className="text-xs text-text-muted mt-1">
                If disabled: only change DPI metadata, keep pixels the same.
              </p>
            </div>

            <div className="p-3 bg-surface rounded-lg border border-border">
              <div className="text-xs text-text-secondary mb-1">DPI Change</div>
              <div className="font-mono font-semibold">
                {currentDpi} DPI to {desiredDpi} DPI
              </div>
              <div className="text-xs text-text-secondary mt-1">
                {calculations.dpiRatio > 1 ? '+' : ''}
                {((calculations.dpiRatio - 1) * 100).toFixed(0)}% change
              </div>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <Card className="p-6 border border-border bg-surface">
          <h3 className="font-heading font-semibold mb-4">Result</h3>
          {!resampleImage ? (
            // Metadata only change
            <div className="space-y-3">
              <div className="text-sm text-text-secondary mb-2">
                Changing DPI metadata only
              </div>
              <div
                className="p-3 bg-white rounded-lg border border-border cursor-pointer hover:border-accent transition-colors"
                onClick={() => copyToClipboard(currentWidth, 'width-metadata')}
              >
                <div className="text-xs text-text-secondary mb-1">Width</div>
                <div className="font-mono font-semibold text-lg">
                  {currentWidth} px
                </div>
              </div>

              <div
                className="p-3 bg-white rounded-lg border border-border cursor-pointer hover:border-accent transition-colors"
                onClick={() => copyToClipboard(currentHeight, 'height-metadata')}
              >
                <div className="text-xs text-text-secondary mb-1">Height</div>
                <div className="font-mono font-semibold text-lg">
                  {currentHeight} px
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-border">
                <div className="text-xs text-text-secondary mb-1">
                  Physical Size
                </div>
                <div className="font-mono font-semibold">
                  {calculations.newPhysicalWidth.toFixed(2)}" × {calculations.newPhysicalHeight.toFixed(2)}"
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-border">
                <div className="text-xs text-text-secondary mb-1">File Size</div>
                <div className="font-mono font-semibold">
                  {calculations.currentFileSizeMB.toFixed(2)} MB (unchanged)
                </div>
              </div>
            </div>
          ) : (
            // Resampled
            <div className="space-y-3">
              <div className="text-sm text-text-secondary mb-2">
                Resampling to maintain physical size
              </div>
              <div
                className="p-3 bg-white rounded-lg border border-border cursor-pointer hover:border-accent transition-colors"
                onClick={() => copyToClipboard(calculations.newPixelsWidth, 'width-resample')}
              >
                <div className="text-xs text-text-secondary mb-1">New Width</div>
                <div className="font-mono font-semibold text-lg">
                  {Math.round(calculations.newPixelsWidth)} px
                </div>
                {copied === 'width-resample' && (
                  <div className="text-xs text-success mt-1">Copied!</div>
                )}
              </div>

              <div
                className="p-3 bg-white rounded-lg border border-border cursor-pointer hover:border-accent transition-colors"
                onClick={() => copyToClipboard(calculations.newPixelsHeight, 'height-resample')}
              >
                <div className="text-xs text-text-secondary mb-1">New Height</div>
                <div className="font-mono font-semibold text-lg">
                  {Math.round(calculations.newPixelsHeight)} px
                </div>
                {copied === 'height-resample' && (
                  <div className="text-xs text-success mt-1">Copied!</div>
                )}
              </div>

              <div className="p-3 bg-white rounded-lg border border-border">
                <div className="text-xs text-text-secondary mb-1">
                  Physical Size
                </div>
                <div className="font-mono font-semibold">
                  {calculations.currentPhysicalWidth.toFixed(2)}" × {calculations.currentPhysicalHeight.toFixed(2)}" (same)
                </div>
              </div>

              <div className="p-3 bg-accent-muted rounded-lg border border-accent border-opacity-20">
                <div className="text-xs text-text-secondary mb-1">
                  New File Size
                </div>
                <div className="font-mono font-semibold">
                  {calculations.newFileSizeMB.toFixed(2)} MB
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Explanation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-border">
          <h3 className="font-heading font-semibold mb-3 text-sm">DPI Metadata Only</h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <p>
              <strong className="text-text-primary">No resampling:</strong> The pixel dimensions stay exactly the same. You're only changing the DPI value in the file metadata.
            </p>
            <p>
              <strong className="text-text-primary">Use when:</strong> You want to tell a printer how to interpret your pixels without actually changing the image data.
            </p>
            <p>
              <strong className="text-text-primary">Warning:</strong> If your current DPI is very low and you just change it to 300 DPI without resampling, the image will print very small.
            </p>
            <div className="mt-3 p-3 bg-surface rounded border border-border">
              <div className="font-mono text-xs">
                Same pixels, different DPI = different physical print size
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="font-heading font-semibold mb-3 text-sm">Resample (Interpolation)</h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <p>
              <strong className="text-text-primary">With resampling:</strong> The image is recalculated to a new size, maintaining the same physical dimensions but at the new DPI.
            </p>
            <p>
              <strong className="text-text-primary">Use when:</strong> You need to increase DPI for print and want the final image to be suitable for printing at that resolution.
            </p>
            <p>
              <strong className="text-text-primary">Trade-off:</strong> Larger file size. Upsampling can cause slight quality loss. Downsampling loses detail.
            </p>
            <div className="mt-3 p-3 bg-surface rounded border border-border">
              <div className="font-mono text-xs">
                Same physical size, new pixels, new DPI
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Common Scenarios */}
      <Card className="p-6 border border-border">
        <h3 className="font-heading font-semibold mb-4">Common Scenarios</h3>
        <div className="space-y-4">
          <div className="border-b border-border pb-4 last:border-0">
            <h4 className="font-heading font-semibold text-sm mb-2">
              Web Image to Print (72 DPI to 300 DPI)
            </h4>
            <p className="text-sm text-text-secondary mb-2">
              You have a web image at 72 DPI. To print it at 300 DPI without changing its physical size:
            </p>
            <div className="text-sm font-mono bg-surface p-3 rounded border border-border">
              72 DPI image scales up 4.17x in resolution. Your 1920x1080 web image becomes 8000x4495 pixels for print.
            </div>
          </div>

          <div className="border-b border-border pb-4 last:border-0">
            <h4 className="font-heading font-semibold text-sm mb-2">
              Print Image to Web (300 DPI to 72 DPI)
            </h4>
            <p className="text-sm text-text-secondary mb-2">
              You have a print image at 300 DPI. To display it on the web at 72 DPI:
            </p>
            <div className="text-sm font-mono bg-surface p-3 rounded border border-border">
              Your 3000x2000 print image scales down to 720x480 pixels for the web.
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-2">
              Prepare for Print (Just Change Metadata)
            </h4>
            <p className="text-sm text-text-secondary mb-2">
              You already have a high-res image at 72 DPI but it contains enough pixels for 300 DPI print.
            </p>
            <div className="text-sm font-mono bg-surface p-3 rounded border border-border">
              Change only the DPI metadata to 300. The pixels stay the same, so no quality loss.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
