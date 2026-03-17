'use client';
import { useState, useMemo } from 'react';

const PAPER_SIZES = {
  'A0': { mm: { w: 841, h: 1189 }, name: 'A0' },
  'A1': { mm: { w: 594, h: 841 }, name: 'A1' },
  'A2': { mm: { w: 420, h: 594 }, name: 'A2' },
  'A3': { mm: { w: 297, h: 420 }, name: 'A3' },
  'A4': { mm: { w: 210, h: 297 }, name: 'A4' },
  'A5': { mm: { w: 148, h: 210 }, name: 'A5' },
  'A6': { mm: { w: 105, h: 148 }, name: 'A6' },
  'Letter': { mm: { w: 215.9, h: 279.4 }, name: 'US Letter' },
  'Legal': { mm: { w: 215.9, h: 355.6 }, name: 'US Legal' },
  'Tabloid': { mm: { w: 279.4, h: 431.8 }, name: 'US Tabloid' },
};

export default function PaperSizeConverter() {
  const [selectedSize, setSelectedSize] = useState('A4');
  const [customWidth, setCustomWidth] = useState('210');
  const [customHeight, setCustomHeight] = useState('297');
  const [unit, setUnit] = useState('mm');

  const currentSize = useMemo(() => {
    if (selectedSize === 'Custom') {
      return {
        mm: { w: parseFloat(customWidth) || 0, h: parseFloat(customHeight) || 0 },
        name: 'Custom',
      };
    }
    return PAPER_SIZES[selectedSize] || PAPER_SIZES['A4'];
  }, [selectedSize, customWidth, customHeight]);

  const conversions = useMemo(() => {
    const w = currentSize.mm.w;
    const h = currentSize.mm.h;

    return {
      mm: { w: w.toFixed(1), h: h.toFixed(1) },
      cm: { w: (w / 10).toFixed(2), h: (h / 10).toFixed(2) },
      inches: { w: (w / 25.4).toFixed(2), h: (h / 25.4).toFixed(2) },
      pixels150dpi: { w: Math.round((w / 25.4) * 150), h: Math.round((h / 25.4) * 150) },
      pixels300dpi: { w: Math.round((w / 25.4) * 300), h: Math.round((h / 25.4) * 300) },
    };
  }, [currentSize]);

  const aspectRatio = useMemo(() => {
    const ratio = currentSize.mm.w / currentSize.mm.h;
    return ratio.toFixed(2);
  }, [currentSize]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.toString());
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-surface rounded-lg border border-border">
      <div className="space-y-6">
        {/* Paper Size Selection */}
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase mb-3">Paper Size</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(PAPER_SIZES).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setSelectedSize(key)}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedSize === key
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:border-accent'
                }`}
              >
                {val.name}
              </button>
            ))}
            <button
              onClick={() => setSelectedSize('Custom')}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedSize === 'Custom'
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:border-accent'
              }`}
            >
              Custom
            </button>
          </div>
        </div>

        {/* Custom Size Input */}
        {selectedSize === 'Custom' && (
          <div className="p-4 bg-white border border-border rounded-lg space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Width (mm)</label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Height (mm)</label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Dimensions Preview */}
        <div className="p-4 bg-white border border-border rounded-lg">
          <p className="text-xs text-text-secondary mb-3">{currentSize.name}</p>
          <div className="flex justify-center mb-4">
            {(() => {
              const maxH = 140;
              const w = currentSize.mm.w;
              const h = currentSize.mm.h;
              const isPortrait = h >= w;
              const boxH = isPortrait ? maxH : maxH * (h / w);
              const boxW = isPortrait ? maxH * (w / h) : maxH;
              return (
                <div
                  className="border-2 border-accent bg-blue-50 rounded-sm"
                  style={{ width: boxW, height: boxH }}
                />
              );
            })()}
          </div>
          <p className="text-xs text-text-secondary text-center">
            Aspect Ratio: {aspectRatio}:1
          </p>
        </div>

        {/* Dimension Conversions */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-text-secondary uppercase">Dimensions</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Millimeters */}
            <div className="p-3 bg-white border border-border rounded-lg">
              <p className="text-xs text-text-secondary mb-2">Millimeters</p>
              <div className="flex items-center gap-2">
                <p className="flex-1 font-mono text-lg font-bold text-text-primary">
                  {conversions.mm.w} x {conversions.mm.h} mm
                </p>
                <button
                  onClick={() => copyToClipboard(`${conversions.mm.w}x${conversions.mm.h}mm`)}
                  className="px-2 py-2 bg-accent text-white rounded text-xs hover:bg-blue-600 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Centimeters */}
            <div className="p-3 bg-white border border-border rounded-lg">
              <p className="text-xs text-text-secondary mb-2">Centimeters</p>
              <div className="flex items-center gap-2">
                <p className="flex-1 font-mono text-lg font-bold text-text-primary">
                  {conversions.cm.w} x {conversions.cm.h} cm
                </p>
                <button
                  onClick={() => copyToClipboard(`${conversions.cm.w}x${conversions.cm.h}cm`)}
                  className="px-2 py-2 bg-accent text-white rounded text-xs hover:bg-blue-600 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Inches */}
            <div className="p-3 bg-white border border-border rounded-lg">
              <p className="text-xs text-text-secondary mb-2">Inches</p>
              <div className="flex items-center gap-2">
                <p className="flex-1 font-mono text-lg font-bold text-text-primary">
                  {conversions.inches.w}" x {conversions.inches.h}"
                </p>
                <button
                  onClick={() => copyToClipboard(`${conversions.inches.w}x${conversions.inches.h}in`)}
                  className="px-2 py-2 bg-accent text-white rounded text-xs hover:bg-blue-600 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Pixels at 150 DPI */}
            <div className="p-3 bg-white border border-border rounded-lg">
              <p className="text-xs text-text-secondary mb-2">Pixels (150 DPI)</p>
              <p className="font-mono text-lg font-bold text-text-primary">
                {conversions.pixels150dpi.w} x {conversions.pixels150dpi.h}px
              </p>
            </div>

            {/* Pixels at 300 DPI */}
            <div className="p-3 bg-white border border-border rounded-lg">
              <p className="text-xs text-text-secondary mb-2">Pixels (300 DPI)</p>
              <p className="font-mono text-lg font-bold text-text-primary">
                {conversions.pixels300dpi.w} x {conversions.pixels300dpi.h}px
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900">
            A-series paper is defined by ISO 216. A4 is the most common size worldwide. 150 DPI is suitable for screen, 300 DPI for print.
          </p>
        </div>
      </div>
    </div>
  );
}
