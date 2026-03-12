'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// ============================================================================
// COLOUR CONVERSION HELPERS
// ============================================================================

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

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

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
      default:
        h = 0;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

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

// ============================================================================
// PALETTE GENERATION MODES
// ============================================================================

function generateRandomHarmonious() {
  // Generate 5 random colours with good saturation and lightness variation
  const hue = Math.random() * 360;
  const colours = [];

  for (let i = 0; i < 5; i++) {
    const h = (hue + Math.random() * 60 - 30 + 360) % 360;
    const s = 40 + Math.random() * 50; // 40-90%
    const l = 45 + Math.random() * 30; // 45-75%
    const rgb = hslToRgb(h, s, l);
    colours.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return colours;
}

function generateMonochromatic() {
  const hue = Math.random() * 360;
  const saturation = 60 + Math.random() * 30; // 60-90%
  const colours = [];

  // Create 5 shades from dark to light
  const lightnesses = [20, 35, 50, 65, 80];
  for (const l of lightnesses) {
    const rgb = hslToRgb(hue, saturation, l);
    colours.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return colours;
}

function generateAnalogous() {
  const baseHue = Math.random() * 360;
  const saturation = 50 + Math.random() * 40; // 50-90%
  const lightness = 50 + Math.random() * 20; // 50-70%
  const colours = [];

  // Three adjacent hues + two variations
  const hues = [baseHue - 30, baseHue, baseHue + 30, baseHue + 60, baseHue - 60];
  for (const h of hues) {
    const s = saturation + (Math.random() * 20 - 10);
    const l = lightness + (Math.random() * 20 - 10);
    const rgb = hslToRgb((h + 360) % 360, s, l);
    colours.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return colours;
}

function generateComplementary() {
  const hue1 = Math.random() * 360;
  const hue2 = (hue1 + 180) % 360;
  const saturation = 50 + Math.random() * 40; // 50-90%
  const lightness = 50 + Math.random() * 20; // 50-70%
  const colours = [];

  // Use both hues and variations
  for (let i = 0; i < 5; i++) {
    const h = i < 3 ? hue1 + (Math.random() * 40 - 20) : hue2 + (Math.random() * 40 - 20);
    const s = saturation + (Math.random() * 20 - 10);
    const l = lightness + (Math.random() * 20 - 10);
    const rgb = hslToRgb((h + 360) % 360, s, l);
    colours.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return colours;
}

function generateTriadic() {
  const hue1 = Math.random() * 360;
  const hue2 = (hue1 + 120) % 360;
  const hue3 = (hue1 + 240) % 360;
  const saturation = 50 + Math.random() * 40; // 50-90%
  const lightness = 50 + Math.random() * 20; // 50-70%
  const colours = [];

  const hues = [hue1, hue2, hue3, hue1 + 60, hue2 + 60];
  for (let i = 0; i < 5; i++) {
    const h = hues[i];
    const s = saturation + (Math.random() * 20 - 10);
    const l = lightness + (Math.random() * 20 - 10);
    const rgb = hslToRgb(h, s, l);
    colours.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return colours;
}

function generatePastel() {
  const baseHue = Math.random() * 360;
  const colours = [];

  for (let i = 0; i < 5; i++) {
    const h = (baseHue + (i * 72 + Math.random() * 20 - 10)) % 360;
    const s = 30 + Math.random() * 20; // 30-50% for muted effect
    const l = 70 + Math.random() * 15; // 70-85% for light, soft colours
    const rgb = hslToRgb(h, s, l);
    colours.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return colours;
}

function generateEarthy() {
  const baseHue = 20 + Math.random() * 40; // Browns and oranges
  const colours = [];

  for (let i = 0; i < 5; i++) {
    const h = (baseHue + (i * 20 + Math.random() * 15 - 7.5)) % 360;
    const s = 30 + Math.random() * 40; // 30-70%
    const l = 40 + Math.random() * 30; // 40-70%
    const rgb = hslToRgb(h, s, l);
    colours.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return colours;
}

function generateWarm() {
  const colours = [];
  const hues = [0, 30, 60, 120, 180]; // Reds, oranges, yellows to warm greens

  for (const baseHue of hues) {
    const h = baseHue + (Math.random() * 20 - 10);
    const s = 60 + Math.random() * 35; // 60-95%
    const l = 50 + Math.random() * 25; // 50-75%
    const rgb = hslToRgb((h + 360) % 360, s, l);
    colours.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return colours;
}

function generateCool() {
  const colours = [];
  const hues = [180, 210, 240, 270, 300]; // Cyans, blues, purples

  for (const baseHue of hues) {
    const h = baseHue + (Math.random() * 20 - 10);
    const s = 60 + Math.random() * 35; // 60-95%
    const l = 50 + Math.random() * 25; // 50-75%
    const rgb = hslToRgb(h, s, l);
    colours.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return colours;
}

function generateNeon() {
  const colours = [];
  const hues = [0, 60, 120, 240, 300]; // Neon red, yellow, green, blue, magenta

  for (const baseHue of hues) {
    const h = baseHue + (Math.random() * 15 - 7.5);
    const s = 90 + Math.random() * 10; // 90-100% for vibrant neon
    const l = 45 + Math.random() * 10; // 45-55% for brightness
    const rgb = hslToRgb((h + 360) % 360, s, l);
    colours.push(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return colours;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ColourPaletteGenerator() {
  const [palette, setPalette] = useState(generateRandomHarmonious());
  const [lockedIndices, setLockedIndices] = useState(new Set());
  const [mode, setMode] = useState('random');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const canvasRef = useRef(null);

  const modeGenerators = {
    random: generateRandomHarmonious,
    monochromatic: generateMonochromatic,
    analogous: generateAnalogous,
    complementary: generateComplementary,
    triadic: generateTriadic,
    pastel: generatePastel,
    earthy: generateEarthy,
    warm: generateWarm,
    cool: generateCool,
    neon: generateNeon,
  };

  // Generate new palette
  const generatePalette = useCallback(() => {
    const newColours = [];

    // Keep locked colours, generate new ones for unlocked
    for (let i = 0; i < 5; i++) {
      if (lockedIndices.has(i)) {
        newColours[i] = palette[i];
      }
    }

    // Generate missing colours
    const generator = modeGenerators[mode];
    const generatedFull = generator();

    let generatedIdx = 0;
    for (let i = 0; i < 5; i++) {
      if (!lockedIndices.has(i)) {
        newColours[i] = generatedFull[generatedIdx];
        generatedIdx++;
      }
    }

    // Add to history
    setHistory((prev) => [palette, ...prev].slice(0, 10));
    setPalette(newColours);
  }, [palette, lockedIndices, mode]);

  // Toggle lock
  const toggleLock = useCallback((index) => {
    setLockedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  // Copy colour to clipboard
  const copyToClipboard = useCallback((colour, index) => {
    navigator.clipboard.writeText(colour);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }, []);

  // Download palette as PNG
  const downloadPalette = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = 800;
    const height = 300;

    canvas.width = width;
    canvas.height = height;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw 5 colour swatches
    const swatchWidth = width / 5;
    const swatchHeight = 200;

    for (let i = 0; i < 5; i++) {
      const x = i * swatchWidth;
      const y = 20;

      // Draw colour
      ctx.fillStyle = palette[i];
      ctx.fillRect(x, y, swatchWidth, swatchHeight);

      // Draw border
      ctx.strokeStyle = '#e5e5e5';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, swatchWidth, swatchHeight);

      // Draw hex code below
      ctx.fillStyle = '#1a1a1a';
      ctx.font = 'bold 16px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(palette[i].toUpperCase(), x + swatchWidth / 2, y + swatchHeight + 40);
    }

    // Watermark
    ctx.fillStyle = '#d4d4d4';
    ctx.font = '12px system-ui, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('mykit.tools', canvas.width / 2, canvas.height - 10);

    // Download
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `palette-${Date.now()}.png`;
    link.click();
  }, [palette]);

  // Restore from history
  const restoreFromHistory = useCallback((paletteCopy) => {
    setHistory((prev) => [palette, ...prev].slice(0, 10));
    setPalette(paletteCopy);
    setShowHistory(false);
  }, [palette]);

  // Spacebar shortcut
  useEffect(() => {
    function handleKeyPress(e) {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        generatePalette();
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [generatePalette]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Mode Selection */}
      <Card>
        <h2 className="text-text-primary font-medium mb-4">Generation Mode</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { id: 'random', label: 'Random' },
            { id: 'monochromatic', label: 'Monochromatic' },
            { id: 'analogous', label: 'Analogous' },
            { id: 'complementary', label: 'Complementary' },
            { id: 'triadic', label: 'Triadic' },
            { id: 'pastel', label: 'Pastel' },
            { id: 'earthy', label: 'Earthy' },
            { id: 'warm', label: 'Warm' },
            { id: 'cool', label: 'Cool' },
            { id: 'neon', label: 'Neon' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                mode === m.id
                  ? 'bg-accent text-white'
                  : 'bg-surface text-text-primary hover:bg-surface-hover border border-border'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Colour Swatches */}
      <div className="space-y-2">
        {palette.map((colour, index) => {
          const rgb = hexToRgb(colour);
          const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 0 };
          const isLocked = lockedIndices.has(index);
          const isCopied = copiedIndex === index;

          return (
            <Card key={index} className="overflow-hidden">
              <div className="flex items-stretch gap-4">
                {/* Colour Swatch */}
                <div
                  className="w-24 h-24 rounded-lg flex-shrink-0 border-2 border-border cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: colour }}
                  onClick={() => copyToClipboard(colour, index)}
                  title="Click to copy hex code"
                />

                {/* Colour Values */}
                <div className="flex-grow space-y-3">
                  <div className="space-y-1">
                    <p className="text-text-secondary text-sm">Hex</p>
                    <p
                      className="font-mono text-lg font-medium text-text-primary cursor-pointer hover:text-accent transition-colors"
                      onClick={() => copyToClipboard(colour, index)}
                    >
                      {colour.toUpperCase()}
                    </p>
                    {isCopied && <p className="text-sm text-green-600 font-medium">✓ Copied!</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-text-secondary">RGB</p>
                      <p className="font-mono text-text-primary">
                        {rgb.r}, {rgb.g}, {rgb.b}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary">HSL</p>
                      <p className="font-mono text-text-primary">
                        {hsl.h}°, {hsl.s}%, {hsl.l}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lock Button */}
                <div className="flex flex-col items-center justify-center gap-2 pl-4 border-l border-border">
                  <button
                    onClick={() => toggleLock(index)}
                    className={`p-2 rounded-lg transition-all ${
                      isLocked
                        ? 'bg-accent text-white'
                        : 'bg-surface text-text-secondary hover:bg-surface-hover'
                    }`}
                    title={isLocked ? 'Unlock colour' : 'Lock colour'}
                  >
                    {isLocked ? '🔒' : '🔓'}
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="primary" onClick={generatePalette} className="flex-1">
          Generate Palette (Spacebar)
        </Button>
        <Button variant="secondary" onClick={downloadPalette} className="flex-1">
          📥 Download as PNG
        </Button>
        {history.length > 0 && (
          <Button
            variant="ghost"
            onClick={() => setShowHistory(!showHistory)}
            className="flex-1"
          >
            📋 History ({history.length})
          </Button>
        )}
      </div>

      {/* History */}
      {showHistory && history.length > 0 && (
        <Card className="bg-surface">
          <h3 className="text-text-primary font-medium mb-3">Palette History</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {history.map((historyPalette, historyIndex) => (
              <button
                key={historyIndex}
                onClick={() => restoreFromHistory(historyPalette)}
                className="w-full p-3 bg-white border border-border rounded-lg hover:bg-surface-hover transition-colors text-left"
              >
                <div className="flex gap-2 items-center">
                  {historyPalette.slice(0, 5).map((colour, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded border border-border flex-shrink-0"
                      style={{ backgroundColor: colour }}
                    />
                  ))}
                  <span className="text-text-secondary text-sm ml-auto">
                    {historyPalette.join(', ')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Hidden canvas for PNG export */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
