'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

// RGB to HSL for colour analysis
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Calculate paint mixing ratios from RGB
function calculateMixingRatios(r, g, b) {
  const total = r + g + b || 1;
  const red = (r / total * 100).toFixed(1);
  const green = (g / total * 100).toFixed(1);
  const blue = (b / total * 100).toFixed(1);

  let primary1 = 'red', primary2 = 'blue', primary3 = 'yellow', white = 0, black = 0;
  let p1 = 0, p2 = 0, p3 = 0;

  // Simplified colour theory approach
  const hsl = rgbToHsl(r, g, b);
  const h = hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  if (r > 200 && g > 150 && b < 100) {
    // Orange-ish
    primary1 = 'red';
    primary2 = 'yellow';
    p1 = 40;
    p2 = 60;
  } else if (r > 150 && g < 100 && b > 150) {
    // Purple-ish
    primary1 = 'red';
    primary2 = 'blue';
    p1 = 50;
    p2 = 50;
  } else if (r < 100 && g > 150 && b > 150) {
    // Cyan-ish
    primary1 = 'blue';
    primary2 = 'yellow';
    p1 = 50;
    p2 = 50;
  } else if (r > g && r > b) {
    // Red-dominant
    primary1 = 'red';
    p1 = Math.min(100, (r / 255) * 100 + 20);
    if (g > b) {
      primary2 = 'yellow';
      p2 = Math.max(0, (g / 255) * 100 - 20);
    } else {
      primary2 = 'blue';
      p2 = Math.max(0, (b / 255) * 100 - 20);
    }
  } else if (g > r && g > b) {
    // Green-ish (yellow + blue)
    primary1 = 'yellow';
    primary2 = 'blue';
    p1 = Math.min(100, (g / 255) * 100 + 20);
    p2 = (b / 255) * 50;
  } else {
    // Blue-dominant
    primary1 = 'blue';
    p1 = Math.min(100, (b / 255) * 100 + 20);
    if (g > r) {
      primary2 = 'yellow';
      p2 = (g / 255) * 50;
    } else {
      primary2 = 'red';
      p2 = (r / 255) * 30;
    }
  }

  // Adjust for brightness
  if (l > 80) {
    white = Math.min(100 - p1 - p2, (l - 50) * 2);
  } else if (l < 30) {
    black = Math.min(100 - p1 - p2, (30 - l) * 2);
  }

  p1 = Math.max(0, Math.min(100, p1));
  p2 = Math.max(0, Math.min(100, p2));
  white = Math.max(0, Math.min(100 - p1 - p2, white));
  black = Math.max(0, Math.min(100 - p1 - p2, black));

  return {
    primary1: { name: primary1, percent: p1 },
    primary2: { name: primary2, percent: p2 },
    white: white,
    black: black,
  };
}

export default function PaintMixingCalculator() {
  const [hexInput, setHexInput] = useState('#e85d75');

  const rgb = useMemo(() => hexToRgb(hexInput), [hexInput]);
  const mixing = useMemo(() => {
    if (!rgb) return null;
    return calculateMixingRatios(rgb.r, rgb.g, rgb.b);
  }, [rgb]);

  const isValidHex = /^#[0-9A-F]{6}$/i.test(hexInput);

  return (
    <div className="max-w-2xl space-y-4">
      <Card>
        <h3 className="font-heading text-sm font-semibold text-text-primary mb-4">Target Colour</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-2">
              Hex Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value.toUpperCase())}
                placeholder="#e85d75"
                className="flex-1 px-3 py-2 text-[13px] rounded-[var(--radius-input)] border border-border bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
              />
              <input
                type="color"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value.toUpperCase())}
                className="w-12 h-10 rounded-[var(--radius-input)] border border-border cursor-pointer"
              />
            </div>
          </div>

          {isValidHex && (
            <div className="flex gap-2 items-center">
              <div
                className="w-16 h-16 rounded-[var(--radius-card)] border-2 border-border shadow-sm"
                style={{ backgroundColor: hexInput }}
              />
              <div className="text-[13px] space-y-1">
                <p className="font-mono font-semibold text-text-primary">{hexInput}</p>
                <p className="text-text-secondary">
                  RGB({rgb?.r}, {rgb?.g}, {rgb?.b})
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {isValidHex && mixing && (
        <Card>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-4">Mixing Ratios</h3>
          <div className="space-y-3 text-[13px]">
            <p className="text-text-muted italic">
              Screen colours and physical paints differ. Use these as a starting point and adjust by eye.
            </p>

            <div className="space-y-2">
              {mixing.primary1.percent > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary capitalize">{mixing.primary1.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-surface rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: `${mixing.primary1.percent}%` }}
                      />
                    </div>
                    <span className="font-mono w-12 text-right">{mixing.primary1.percent.toFixed(0)}%</span>
                  </div>
                </div>
              )}

              {mixing.primary2.percent > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary capitalize">{mixing.primary2.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-surface rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: `${mixing.primary2.percent}%` }}
                      />
                    </div>
                    <span className="font-mono w-12 text-right">{mixing.primary2.percent.toFixed(0)}%</span>
                  </div>
                </div>
              )}

              {mixing.white > 1 && (
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">White</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-surface rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: `${mixing.white}%` }}
                      />
                    </div>
                    <span className="font-mono w-12 text-right">{mixing.white.toFixed(0)}%</span>
                  </div>
                </div>
              )}

              {mixing.black > 1 && (
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Black</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-surface rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-accent"
                        style={{ width: `${mixing.black}%` }}
                      />
                    </div>
                    <span className="font-mono w-12 text-right">{mixing.black.toFixed(0)}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      <details className="text-xs text-text-muted mt-2">
        <summary className="cursor-pointer hover:text-text-secondary">About this tool</summary>
        <div className="mt-2 space-y-1">
          <p>This calculator uses colour theory to suggest approximate mixing ratios for physical paint. The screen display may not match actual paint colours. Test small amounts first and adjust by eye. Transparency and colour mixing varies by paint brand and type.</p>
        </div>
      </details>
    </div>
  );
}
