'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// ── Colour conversion helpers ───────────────────────────────────

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((x) => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
      default: h = 0;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function isLight(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 140;
}

// ── Palette generators ──────────────────────────────────────────

function gen(mode) {
  const fns = { random, monochromatic, analogous, complementary, triadic, pastel, earthy, warm, cool, neon };
  return (fns[mode] || random)();
}

function random() {
  const hue = Math.random() * 360;
  return Array.from({ length: 5 }, (_, i) => {
    const h = (hue + Math.random() * 60 - 30 + 360) % 360;
    const rgb = hslToRgb(h, 40 + Math.random() * 50, 45 + Math.random() * 30);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

function monochromatic() {
  const h = Math.random() * 360, s = 60 + Math.random() * 30;
  return [20, 35, 50, 65, 80].map((l) => { const rgb = hslToRgb(h, s, l); return rgbToHex(rgb.r, rgb.g, rgb.b); });
}

function analogous() {
  const base = Math.random() * 360, s = 50 + Math.random() * 40, l = 50 + Math.random() * 20;
  return [-30, 0, 30, 60, -60].map((offset) => {
    const rgb = hslToRgb((base + offset + 360) % 360, s + Math.random() * 20 - 10, l + Math.random() * 20 - 10);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

function complementary() {
  const h1 = Math.random() * 360, h2 = (h1 + 180) % 360, s = 50 + Math.random() * 40, l = 50 + Math.random() * 20;
  return Array.from({ length: 5 }, (_, i) => {
    const h = i < 3 ? h1 + Math.random() * 40 - 20 : h2 + Math.random() * 40 - 20;
    const rgb = hslToRgb((h + 360) % 360, s + Math.random() * 20 - 10, l + Math.random() * 20 - 10);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

function triadic() {
  const h1 = Math.random() * 360, s = 50 + Math.random() * 40, l = 50 + Math.random() * 20;
  return [h1, h1 + 120, h1 + 240, h1 + 60, h1 + 180].map((h) => {
    const rgb = hslToRgb(h % 360, s + Math.random() * 20 - 10, l + Math.random() * 20 - 10);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

function pastel() {
  const base = Math.random() * 360;
  return Array.from({ length: 5 }, (_, i) => {
    const rgb = hslToRgb((base + i * 72 + Math.random() * 20 - 10) % 360, 30 + Math.random() * 20, 70 + Math.random() * 15);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

function earthy() {
  const base = 20 + Math.random() * 40;
  return Array.from({ length: 5 }, (_, i) => {
    const rgb = hslToRgb((base + i * 20 + Math.random() * 15 - 7.5) % 360, 30 + Math.random() * 40, 40 + Math.random() * 30);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

function warm() {
  return [0, 30, 60, 120, 180].map((h) => {
    const rgb = hslToRgb((h + Math.random() * 20 - 10 + 360) % 360, 60 + Math.random() * 35, 50 + Math.random() * 25);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

function cool() {
  return [180, 210, 240, 270, 300].map((h) => {
    const rgb = hslToRgb(h + Math.random() * 20 - 10, 60 + Math.random() * 35, 50 + Math.random() * 25);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

function neon() {
  return [0, 60, 120, 240, 300].map((h) => {
    const rgb = hslToRgb((h + Math.random() * 15 - 7.5 + 360) % 360, 90 + Math.random() * 10, 45 + Math.random() * 10);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
}

// ── Component ───────────────────────────────────────────────────

const MODES = [
  { id: 'random', label: 'Random' },
  { id: 'monochromatic', label: 'Mono' },
  { id: 'analogous', label: 'Analogous' },
  { id: 'complementary', label: 'Complement' },
  { id: 'triadic', label: 'Triadic' },
  { id: 'pastel', label: 'Pastel' },
  { id: 'earthy', label: 'Earthy' },
  { id: 'warm', label: 'Warm' },
  { id: 'cool', label: 'Cool' },
  { id: 'neon', label: 'Neon' },
];

export default function ColourPaletteGenerator() {
  const [palette, setPalette] = useState(() => gen('random'));
  const [locked, setLocked] = useState(new Set());
  const [mode, setMode] = useState('random');
  const [copied, setCopied] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const canvasRef = useRef(null);

  const generate = useCallback(() => {
    const fresh = gen(mode);
    const next = palette.map((c, i) => locked.has(i) ? c : fresh[i]);
    setHistory((prev) => [palette, ...prev].slice(0, 10));
    setPalette(next);
  }, [palette, locked, mode]);

  const toggleLock = (i) => {
    setLocked((prev) => {
      const s = new Set(prev);
      s.has(i) ? s.delete(i) : s.add(i);
      return s;
    });
  };

  const copy = (text, id) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1200);
  };

  const restore = (p) => {
    setHistory((prev) => [palette, ...prev].slice(0, 10));
    setPalette(p);
    setShowHistory(false);
  };

  const download = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800; canvas.height = 260;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 800, 260);
    const sw = 800 / 5;
    palette.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(i * sw, 0, sw, 200);
      ctx.fillStyle = '#1a1a1a';
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(c.toUpperCase(), i * sw + sw / 2, 232);
    });
    ctx.fillStyle = '#d4d4d4';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('mykit.tools', 400, 255);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `palette-${Date.now()}.png`;
    link.click();
  };

  const copyAllHex = () => {
    copy(palette.map((c) => c.toUpperCase()).join(', '), 'all');
  };

  const copyCss = () => {
    const css = palette.map((c, i) => `--color-${i + 1}: ${c};`).join('\n');
    copy(css, 'css');
  };

  // Spacebar shortcut
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        generate();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [generate]);

  return (
    <div className="space-y-3">
      {/* Mode pills - single scrollable row */}
      <div className="flex flex-wrap gap-1.5">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              mode === m.id
                ? 'bg-accent text-white'
                : 'bg-surface text-text-secondary hover:bg-surface-hover border border-border'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Main palette display - horizontal colour bars */}
      <div className="flex rounded-[var(--radius-card)] overflow-hidden border border-border" style={{ minHeight: 220 }}>
        {palette.map((colour, i) => {
          const light = isLight(colour);
          const textClass = light ? 'text-black/70' : 'text-white/80';
          const hoverClass = light ? 'hover:text-black' : 'hover:text-white';
          const rgb = hexToRgb(colour);
          const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
          const isExpanded = expanded === i;

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-end relative cursor-pointer transition-all group"
              style={{ backgroundColor: colour }}
              onClick={() => copy(colour.toUpperCase(), i)}
            >
              {/* Lock button - top */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleLock(i); }}
                className={`absolute top-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                  locked.has(i)
                    ? (light ? 'bg-black/15 text-black/80' : 'bg-white/20 text-white/90')
                    : `opacity-0 group-hover:opacity-100 ${light ? 'bg-black/10 text-black/50' : 'bg-white/10 text-white/50'}`
                }`}
                title={locked.has(i) ? 'Unlock' : 'Lock'}
              >
                {locked.has(i) ? '🔒' : '🔓'}
              </button>

              {/* Expand toggle */}
              <button
                onClick={(e) => { e.stopPropagation(); setExpanded(isExpanded ? null : i); }}
                className={`absolute top-10 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all ${
                  light ? 'bg-black/10 text-black/50 hover:bg-black/20' : 'bg-white/10 text-white/50 hover:bg-white/20'
                }`}
                title="Details"
              >
                {isExpanded ? '−' : '+'}
              </button>

              {/* Colour info (centre) - shown on expand */}
              {isExpanded && rgb && hsl && (
                <div className={`text-center space-y-1 mb-auto mt-16 ${textClass} text-xs font-mono`}>
                  <div
                    className={`cursor-pointer ${hoverClass}`}
                    onClick={(e) => { e.stopPropagation(); copy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, `rgb-${i}`); }}
                  >
                    {copied === `rgb-${i}` ? '✓ Copied' : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                  </div>
                  <div
                    className={`cursor-pointer ${hoverClass}`}
                    onClick={(e) => { e.stopPropagation(); copy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, `hsl-${i}`); }}
                  >
                    {copied === `hsl-${i}` ? '✓ Copied' : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                  </div>
                </div>
              )}

              {/* Hex label - bottom */}
              <div className={`pb-3 pt-2 text-center ${textClass} ${hoverClass} transition-colors`}>
                <div className="font-mono text-sm font-semibold">
                  {copied === i ? '✓ Copied' : colour.toUpperCase()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action row */}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary" onClick={generate} size="sm">
          Generate
        </Button>
        <span className="text-xs text-text-muted hidden sm:inline">or press Space</span>

        <div className="flex gap-1.5 ml-auto">
          <button
            onClick={copyAllHex}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover border border-border transition-colors"
          >
            {copied === 'all' ? '✓ Copied' : 'Copy Hex'}
          </button>
          <button
            onClick={copyCss}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover border border-border transition-colors"
          >
            {copied === 'css' ? '✓ Copied' : 'Copy CSS'}
          </button>
          <button
            onClick={download}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover border border-border transition-colors"
          >
            Download PNG
          </button>
          {history.length > 0 && (
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                showHistory
                  ? 'bg-accent text-white'
                  : 'bg-surface text-text-secondary hover:bg-surface-hover border border-border'
              }`}
            >
              History ({history.length})
            </button>
          )}
        </div>
      </div>

      {/* History panel */}
      {showHistory && history.length > 0 && (
        <Card className="space-y-1.5">
          {history.map((hp, hi) => (
            <button
              key={hi}
              onClick={() => restore(hp)}
              className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface transition-colors"
            >
              <div className="flex flex-1 rounded overflow-hidden h-6">
                {hp.map((c, ci) => (
                  <div key={ci} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-xs text-text-muted font-mono hidden sm:block">
                {hp.map((c) => c.toUpperCase()).join(' ')}
              </span>
            </button>
          ))}
        </Card>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
