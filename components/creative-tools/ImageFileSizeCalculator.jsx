'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Slider from '@/components/ui/Slider';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const COLOR_DEPTH_OPTIONS = [
  { value: 8, label: '8-bit Grayscale', bytes: 1 },
  { value: 24, label: '24-bit RGB', bytes: 3 },
  { value: 32, label: '32-bit RGBA', bytes: 4 },
  { value: 48, label: '48-bit Deep Color', bytes: 6 },
];

const PRESETS = [
  { name: 'Web Banner 1920x600', width: 1920, height: 600 },
  { name: 'Instagram 1080x1080', width: 1080, height: 1080 },
  { name: '4K Photo 3840x2160', width: 3840, height: 2160 },
  { name: 'A4 Print 2480x3508', width: 2480, height: 3508 },
];

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
};

export default function ImageFileSizeCalculator() {
  const [width, setWidth] = useState('1920');
  const [height, setHeight] = useState('1080');
  const [colorDepth, setColorDepth] = useState('24');
  const [jpegQuality, setJpegQuality] = useState(80);
  const [webpQuality, setWebpQuality] = useState(80);
  const [copied, setCopied] = useState(null);

  const depthInfo = useMemo(() => {
    return COLOR_DEPTH_OPTIONS.find((opt) => opt.value.toString() === colorDepth);
  }, [colorDepth]);

  const sizes = useMemo(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const pixelCount = w * h;

    if (pixelCount === 0) {
      return {
        uncompressed: 0,
        jpeg: 0,
        png: 0,
        webp: 0,
        tiff: 0,
        bmp: 0,
        gif: 0,
      };
    }

    const bytesPerPixel = depthInfo?.bytes || 3;
    const uncompressedBytes = pixelCount * bytesPerPixel;

    // JPEG: ~10:1 compression at 80% quality, better at lower quality
    const jpegRatio = Math.max(1.5, 15 - jpegQuality / 6.67); // Higher quality = lower ratio
    const jpegBytes = uncompressedBytes / jpegRatio;

    // PNG: ~2:1 average (varies with image content)
    const pngBytes = uncompressedBytes / 2;

    // WebP: ~25:1 at 80% quality
    const webpRatio = Math.max(2, 30 - webpQuality / 3.33);
    const webpBytes = uncompressedBytes / webpRatio;

    // TIFF: ~0.5:1 (often larger due to no compression or lossless)
    const tiffBytes = uncompressedBytes * 1.1;

    // BMP: uncompressed
    const bmpBytes = uncompressedBytes;

    // GIF: ~3:1 average (varies greatly)
    const gifBytes = uncompressedBytes / 3;

    return {
      uncompressed: uncompressedBytes,
      jpeg: jpegBytes,
      png: pngBytes,
      webp: webpBytes,
      tiff: tiffBytes,
      bmp: bmpBytes,
      gif: gifBytes,
    };
  }, [width, height, colorDepth, depthInfo, jpegQuality, webpQuality]);

  const copyToClipboard = (value, key) => {
    navigator.clipboard.writeText(formatFileSize(value));
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const applyPreset = (preset) => {
    setWidth(preset.width.toString());
    setHeight(preset.height.toString());
  };

  const compressionRatios = {
    jpeg: (sizes.uncompressed / sizes.jpeg).toFixed(2),
    png: (sizes.uncompressed / sizes.png).toFixed(2),
    webp: (sizes.uncompressed / sizes.webp).toFixed(2),
    tiff: (sizes.uncompressed / sizes.tiff).toFixed(2),
    bmp: (sizes.uncompressed / sizes.bmp).toFixed(2),
    gif: (sizes.uncompressed / sizes.gif).toFixed(2),
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Quick Presets */}
      <Card className="p-4 border-accent-muted bg-accent-muted">
        <h3 className="font-heading font-semibold mb-3 text-sm">Quick Presets</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 border border-border">
            <h3 className="font-heading font-semibold mb-4">Image Dimensions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Width (px)"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="1920"
              />
              <Input
                label="Height (px)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="1080"
              />
            </div>
            <div className="mt-4 p-3 bg-surface rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Total Pixels:</span>
                <span className="font-mono font-semibold">
                  {((parseFloat(width) || 0) * (parseFloat(height) || 0)).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <h3 className="font-heading font-semibold mb-4">Color Depth</h3>
            <Select
              options={COLOR_DEPTH_OPTIONS.map((opt) => ({
                value: opt.value.toString(),
                label: opt.label,
              }))}
              value={colorDepth}
              onChange={(e) => setColorDepth(e.target.value)}
            />
            <div className="mt-4 p-3 bg-surface rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Uncompressed Size:</div>
              <div className="font-mono font-semibold text-lg">
                {formatFileSize(sizes.uncompressed)}
              </div>
            </div>
          </Card>
        </div>

        {/* Format Preview */}
        <Card className="p-6 border border-border bg-surface">
          <h3 className="font-heading font-semibold mb-4">Selected Format</h3>
          <div className="space-y-3 text-sm">
            <div>
              <div className="text-text-secondary mb-1">Color Depth:</div>
              <div className="font-mono font-semibold text-primary">
                {depthInfo?.label} ({depthInfo?.bytes} bytes/pixel)
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <div className="text-text-secondary mb-1">Uncompressed:</div>
              <div className="font-mono font-semibold text-primary">
                {formatFileSize(sizes.uncompressed)}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Format Comparison */}
      <Card className="p-6 border border-border">
        <h3 className="font-heading font-semibold mb-4">Compressed Formats</h3>

        {/* JPEG */}
        <div className="mb-6 pb-6 border-b border-border last:border-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium font-heading">JPEG</h4>
              <p className="text-xs text-text-secondary">Lossy compression</p>
            </div>
            <div className="text-right">
              <div className="font-mono font-semibold text-lg">
                {formatFileSize(sizes.jpeg)}
              </div>
              <div className="text-xs text-text-secondary">
                {compressionRatios.jpeg}:1 ratio
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm text-text-secondary flex items-center justify-between mb-2">
              <span>Quality: {jpegQuality}%</span>
            </label>
            <Slider
              min={1}
              max={100}
              value={jpegQuality}
              onChange={(e) => setJpegQuality(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* PNG */}
        <div className="mb-6 pb-6 border-b border-border last:border-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium font-heading">PNG</h4>
              <p className="text-xs text-text-secondary">Lossless compression</p>
            </div>
            <div className="text-right">
              <div className="font-mono font-semibold text-lg">
                {formatFileSize(sizes.png)}
              </div>
              <div className="text-xs text-text-secondary">
                {compressionRatios.png}:1 ratio
              </div>
            </div>
          </div>
        </div>

        {/* WebP */}
        <div className="mb-6 pb-6 border-b border-border last:border-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium font-heading">WebP</h4>
              <p className="text-xs text-text-secondary">Modern, highly efficient</p>
            </div>
            <div className="text-right">
              <div className="font-mono font-semibold text-lg">
                {formatFileSize(sizes.webp)}
              </div>
              <div className="text-xs text-text-secondary">
                {compressionRatios.webp}:1 ratio
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm text-text-secondary flex items-center justify-between mb-2">
              <span>Quality: {webpQuality}%</span>
            </label>
            <Slider
              min={1}
              max={100}
              value={webpQuality}
              onChange={(e) => setWebpQuality(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* TIFF */}
        <div className="mb-6 pb-6 border-b border-border last:border-0">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium font-heading">TIFF</h4>
              <p className="text-xs text-text-secondary">Professional, uncompressed</p>
            </div>
            <div className="text-right">
              <div className="font-mono font-semibold text-lg">
                {formatFileSize(sizes.tiff)}
              </div>
              <div className="text-xs text-text-secondary">
                {compressionRatios.tiff}:1 ratio
              </div>
            </div>
          </div>
        </div>

        {/* BMP */}
        <div className="mb-6 pb-6 border-b border-border last:border-0">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium font-heading">BMP</h4>
              <p className="text-xs text-text-secondary">Uncompressed bitmap</p>
            </div>
            <div className="text-right">
              <div className="font-mono font-semibold text-lg">
                {formatFileSize(sizes.bmp)}
              </div>
              <div className="text-xs text-text-secondary">
                {compressionRatios.bmp}:1 ratio
              </div>
            </div>
          </div>
        </div>

        {/* GIF */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium font-heading">GIF</h4>
              <p className="text-xs text-text-secondary">Lossless, limited colors</p>
            </div>
            <div className="text-right">
              <div className="font-mono font-semibold text-lg">
                {formatFileSize(sizes.gif)}
              </div>
              <div className="text-xs text-text-secondary">
                {compressionRatios.gif}:1 ratio
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Table */}
      <Card className="p-6 border border-border">
        <h3 className="font-heading font-semibold mb-4">Quick Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold">Format</th>
                <th className="text-right py-2 font-semibold">Size</th>
                <th className="text-right py-2 font-semibold">Compression</th>
                <th className="text-right py-2 font-semibold">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2">JPEG</td>
                <td className="text-right font-mono">{formatFileSize(sizes.jpeg)}</td>
                <td className="text-right text-text-secondary">
                  {compressionRatios.jpeg}:1
                </td>
                <td className="text-right text-text-secondary">Photos</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2">PNG</td>
                <td className="text-right font-mono">{formatFileSize(sizes.png)}</td>
                <td className="text-right text-text-secondary">
                  {compressionRatios.png}:1
                </td>
                <td className="text-right text-text-secondary">Graphics</td>
              </tr>
              <tr className="border-b border-border hover:bg-surface">
                <td className="py-2">WebP</td>
                <td className="text-right font-mono">{formatFileSize(sizes.webp)}</td>
                <td className="text-right text-text-secondary">
                  {compressionRatios.webp}:1
                </td>
                <td className="text-right text-text-secondary">Web</td>
              </tr>
              <tr className="hover:bg-surface">
                <td className="py-2">TIFF</td>
                <td className="text-right font-mono">{formatFileSize(sizes.tiff)}</td>
                <td className="text-right text-text-secondary">
                  {compressionRatios.tiff}:1
                </td>
                <td className="text-right text-text-secondary">Print</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
