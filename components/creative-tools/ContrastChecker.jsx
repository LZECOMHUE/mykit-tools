'use client';

import { useState, useMemo, useCallback } from 'react';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert hex color to RGB object
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB object to hex color
 */
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to RGB
 */
function hslToRgb(h, s, l) {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Calculate relative luminance per WCAG spec
 */
function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two hex colors
 */
function getContrastRatio(foreground, background) {
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Find closest darker hex color that passes a target contrast ratio
 */
function findDarkerForeground(originalFg, background, targetRatio) {
  const rgb = hexToRgb(originalFg);
  if (!rgb) return originalFg;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  let testLightness = hsl.l;

  while (testLightness > 0) {
    const testHsl = { ...hsl, l: testLightness };
    const testRgb = hslToRgb(testHsl.h, testHsl.s, testHsl.l);
    const testHex = rgbToHex(testRgb.r, testRgb.g, testRgb.b);
    const ratio = getContrastRatio(testHex, background);

    if (ratio >= targetRatio) {
      return testHex;
    }

    testLightness -= 2;
  }

  return rgbToHex(0, 0, 0);
}

/**
 * Find closest lighter hex color that passes a target contrast ratio
 */
function findLighterBackground(foreground, originalBg, targetRatio) {
  const rgb = hexToRgb(originalBg);
  if (!rgb) return originalBg;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  let testLightness = hsl.l;

  while (testLightness < 100) {
    const testHsl = { ...hsl, l: testLightness };
    const testRgb = hslToRgb(testHsl.h, testHsl.s, testHsl.l);
    const testHex = rgbToHex(testRgb.r, testRgb.g, testRgb.b);
    const ratio = getContrastRatio(foreground, testHex);

    if (ratio >= targetRatio) {
      return testHex;
    }

    testLightness += 2;
  }

  return rgbToHex(255, 255, 255);
}

/**
 * Parse hex input, with or without #
 */
function parseHexInput(value) {
  let hex = value.trim();
  if (!hex.startsWith('#')) {
    hex = '#' + hex;
  }
  return /^#[0-9A-F]{6}$/i.test(hex) ? hex.toLowerCase() : null;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ContrastChecker() {
  const [foreground, setForeground] = useState('#1a1a1a');
  const [background, setBackground] = useState('#ffffff');
  const [foregroundInput, setForegroundInput] = useState('1a1a1a');
  const [backgroundInput, setBackgroundInput] = useState('ffffff');

  // Update foreground color
  const handleForegroundHexChange = useCallback((value) => {
    setForegroundInput(value);
    const parsed = parseHexInput(value);
    if (parsed) {
      setForeground(parsed);
    }
  }, []);

  const handleForegroundPickerChange = useCallback((value) => {
    setForeground(value);
    setForegroundInput(value.replace('#', ''));
  }, []);

  // Update background color
  const handleBackgroundHexChange = useCallback((value) => {
    setBackgroundInput(value);
    const parsed = parseHexInput(value);
    if (parsed) {
      setBackground(parsed);
    }
  }, []);

  const handleBackgroundPickerChange = useCallback((value) => {
    setBackground(value);
    setBackgroundInput(value.replace('#', ''));
  }, []);

  // Swap colors
  const handleSwap = useCallback(() => {
    const tempFg = foreground;
    const tempFgInput = foregroundInput;
    setForeground(background);
    setForegroundInput(backgroundInput);
    setBackground(tempFg);
    setBackgroundInput(tempFgInput);
  }, [foreground, background, foregroundInput, backgroundInput]);

  // Calculate contrast ratio and WCAG results
  const contrastRatio = useMemo(
    () => getContrastRatio(foreground, background),
    [foreground, background]
  );

  const wcagResults = useMemo(() => {
    const ratio = contrastRatio;
    return {
      aaNormal: { pass: ratio >= 4.5, ratio: 4.5 },
      aaLarge: { pass: ratio >= 3, ratio: 3 },
      aaaNormal: { pass: ratio >= 7, ratio: 7 },
      aaaLarge: { pass: ratio >= 4.5, ratio: 4.5 },
    };
  }, [contrastRatio]);

  // Check if any WCAG level fails
  const hasFails = useMemo(
    () =>
      !wcagResults.aaNormal.pass ||
      !wcagResults.aaLarge.pass ||
      !wcagResults.aaaNormal.pass ||
      !wcagResults.aaaLarge.pass,
    [wcagResults]
  );

  // Generate auto-fix suggestions
  const suggestions = useMemo(() => {
    if (!hasFails) return [];

    const fixes = [];

    // AA Normal Text
    if (!wcagResults.aaNormal.pass) {
      const darkerFg = findDarkerForeground(foreground, background, 4.5);
      const lighterBg = findLighterBackground(foreground, background, 4.5);
      fixes.push({
        type: 'aaNormal',
        label: 'AA Normal Text (4.5:1)',
        darkerFg,
        lighterBg,
      });
    }

    // AAA Normal Text
    if (!wcagResults.aaaNormal.pass) {
      const darkerFg = findDarkerForeground(foreground, background, 7);
      const lighterBg = findLighterBackground(foreground, background, 7);
      fixes.push({
        type: 'aaaNormal',
        label: 'AAA Normal Text (7:1)',
        darkerFg,
        lighterBg,
      });
    }

    return fixes;
  }, [foreground, background, hasFails, wcagResults]);

  const applyFix = useCallback(
    (color, isBackground) => {
      if (isBackground) {
        setBackground(color);
        setBackgroundInput(color.replace('#', ''));
      } else {
        setForeground(color);
        setForegroundInput(color.replace('#', ''));
      }
    },
    []
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 py-8 px-4">
      {/* Title & Description */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-text-primary">
          WCAG Contrast Checker
        </h1>
        <p className="text-text-secondary mt-2">
          Check if your color combinations meet WCAG accessibility standards and get auto-fix suggestions.
        </p>
      </div>

      {/* Color Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Foreground Color */}
        <div className="space-y-4">
          <h2 className="text-text-primary font-semibold">Foreground Color</h2>

          {/* Hex Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Hex Code
            </label>
            <div className="flex items-center">
              <span className="text-text-muted mr-2">#</span>
              <input
                type="text"
                value={foregroundInput}
                onChange={(e) => handleForegroundHexChange(e.target.value)}
                placeholder="1a1a1a"
                className="flex-1 px-3 py-2 bg-white border border-border rounded-lg text-text-primary font-mono-num focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                maxLength="6"
              />
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Color Picker
            </label>
            <input
              type="color"
              value={foreground}
              onChange={(e) => handleForegroundPickerChange(e.target.value)}
              className="w-full h-10 rounded-lg border border-border cursor-pointer"
            />
          </div>

          {/* Color Swatch Preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-text-secondary">Preview</p>
            <div
              className="h-16 w-full rounded-lg border-2 border-border"
              style={{ backgroundColor: foreground }}
            />
          </div>
        </div>

        {/* Background Color */}
        <div className="space-y-4">
          <h2 className="text-text-primary font-semibold">Background Color</h2>

          {/* Hex Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Hex Code
            </label>
            <div className="flex items-center">
              <span className="text-text-muted mr-2">#</span>
              <input
                type="text"
                value={backgroundInput}
                onChange={(e) => handleBackgroundHexChange(e.target.value)}
                placeholder="ffffff"
                className="flex-1 px-3 py-2 bg-white border border-border rounded-lg text-text-primary font-mono-num focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                maxLength="6"
              />
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Color Picker
            </label>
            <input
              type="color"
              value={background}
              onChange={(e) => handleBackgroundPickerChange(e.target.value)}
              className="w-full h-10 rounded-lg border border-border cursor-pointer"
            />
          </div>

          {/* Color Swatch Preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-text-secondary">Preview</p>
            <div
              className="h-16 w-full rounded-lg border-2 border-border"
              style={{ backgroundColor: background }}
            />
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSwap}
          className="px-6 py-2 bg-white border border-border rounded-lg text-text-primary font-medium hover:bg-surface transition-colors"
        >
          ⇄ Swap Colors
        </button>
      </div>

      {/* Live Preview */}
      <div className="space-y-3">
        <h2 className="text-text-primary font-semibold">Live Preview</h2>
        <div
          className="p-6 rounded-lg border border-border space-y-4"
          style={{ backgroundColor: background, color: foreground }}
        >
          {/* Large Heading */}
          <div className="text-3xl font-bold">The quick brown fox</div>

          {/* Normal Body Text */}
          <div className="text-base leading-relaxed">
            The quick brown fox jumps over the lazy dog. This is sample text to check readability at different sizes.
          </div>

          {/* Small Caption */}
          <div className="text-xs">12px caption text</div>
        </div>
      </div>

      {/* Contrast Ratio Display */}
      <div className="space-y-3">
        <h2 className="text-text-primary font-semibold">Contrast Ratio</h2>
        <div className="text-5xl font-mono-num font-bold text-accent">
          {contrastRatio.toFixed(2)}:1
        </div>
      </div>

      {/* WCAG Results */}
      <div className="space-y-3">
        <h2 className="text-text-primary font-semibold">WCAG Results</h2>
        <div className="space-y-3">
          {/* AA Normal Text */}
          <div className={`flex items-center justify-between p-4 rounded-lg border ${
            wcagResults.aaNormal.pass
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <span className={wcagResults.aaNormal.pass ? 'text-green-700' : 'text-red-700'}>
              AA Normal Text (≥ 4.5:1)
            </span>
            <span className={`text-2xl font-bold ${
              wcagResults.aaNormal.pass ? 'text-green-700' : 'text-red-700'
            }`}>
              {wcagResults.aaNormal.pass ? '✓' : '✗'}
            </span>
          </div>

          {/* AA Large Text */}
          <div className={`flex items-center justify-between p-4 rounded-lg border ${
            wcagResults.aaLarge.pass
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <span className={wcagResults.aaLarge.pass ? 'text-green-700' : 'text-red-700'}>
              AA Large Text (≥ 3:1)
            </span>
            <span className={`text-2xl font-bold ${
              wcagResults.aaLarge.pass ? 'text-green-700' : 'text-red-700'
            }`}>
              {wcagResults.aaLarge.pass ? '✓' : '✗'}
            </span>
          </div>

          {/* AAA Normal Text */}
          <div className={`flex items-center justify-between p-4 rounded-lg border ${
            wcagResults.aaaNormal.pass
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <span className={wcagResults.aaaNormal.pass ? 'text-green-700' : 'text-red-700'}>
              AAA Normal Text (≥ 7:1)
            </span>
            <span className={`text-2xl font-bold ${
              wcagResults.aaaNormal.pass ? 'text-green-700' : 'text-red-700'
            }`}>
              {wcagResults.aaaNormal.pass ? '✓' : '✗'}
            </span>
          </div>

          {/* AAA Large Text */}
          <div className={`flex items-center justify-between p-4 rounded-lg border ${
            wcagResults.aaaLarge.pass
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <span className={wcagResults.aaaLarge.pass ? 'text-green-700' : 'text-red-700'}>
              AAA Large Text (≥ 4.5:1)
            </span>
            <span className={`text-2xl font-bold ${
              wcagResults.aaaLarge.pass ? 'text-green-700' : 'text-red-700'
            }`}>
              {wcagResults.aaaLarge.pass ? '✓' : '✗'}
            </span>
          </div>
        </div>
      </div>

      {/* Auto-Fix Suggestions */}
      {hasFails && suggestions.length > 0 && (
        <div className="space-y-4 border-t border-border pt-8">
          <h2 className="text-text-primary font-semibold">Fix Suggestions</h2>
          {suggestions.map((fix) => (
            <div key={fix.type} className="space-y-3">
              <h3 className="text-text-secondary font-medium">{fix.label}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Darken Foreground */}
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary">
                    Darken foreground to <span className="font-mono-num">{fix.darkerFg}</span>
                  </p>
                  <div className="flex gap-3">
                    <div
                      className="w-16 h-16 rounded-lg border-2 border-border flex-shrink-0"
                      style={{ backgroundColor: fix.darkerFg }}
                    />
                    <button
                      onClick={() => applyFix(fix.darkerFg, false)}
                      className="flex-1 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
                    >
                      Use this
                    </button>
                  </div>
                </div>

                {/* Lighten Background */}
                <div className="space-y-2">
                  <p className="text-sm text-text-secondary">
                    Lighten background to <span className="font-mono-num">{fix.lighterBg}</span>
                  </p>
                  <div className="flex gap-3">
                    <div
                      className="w-16 h-16 rounded-lg border-2 border-border flex-shrink-0"
                      style={{ backgroundColor: fix.lighterBg }}
                    />
                    <button
                      onClick={() => applyFix(fix.lighterBg, true)}
                      className="flex-1 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
                    >
                      Use this
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Pass Message */}
      {!hasFails && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center font-medium">
          ✓ All WCAG levels pass! Your color combination is accessible.
        </div>
      )}
    </div>
  );
}
