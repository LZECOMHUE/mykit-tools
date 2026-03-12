"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── COLOR MATH ─────────────────────────────
function hsvToRgb(h, s, v) {
  h = ((h % 360) + 360) % 360;
  const i = Math.floor(h / 60) % 6;
  const f = h / 60 - Math.floor(h / 60);
  const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  let r, g, b;
  switch (i) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    default: r = v; g = p; b = q;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0, s = max === 0 ? 0 : d / max, v = max;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      default: h = ((r - g) / d + 4) * 60;
    }
  }
  return [h, s, v];
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(c => c.toString(16).padStart(2, "0")).join("");
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  if (hex.length !== 6) return [128, 128, 128];
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function makeHex(h, s, v) { return rgbToHex(...hsvToRgb(h, clamp(s, 0, 1), clamp(v, 0, 1))); }

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function textColor(hex) { return luminance(hex) > 0.35 ? "#1a1a1a" : "#f5f5f0"; }

function downloadPalette(palette, room, mood) {
  const W = 1200, H = 630;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d");

  const roomLabel = ROOMS.find(r => r.id === room)?.label || room;
  const moodLabel = MOODS.find(m => m.id === mood)?.label || mood;

  // Light theme background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#e5e5e5";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, W - 2, H - 2);

  // Title
  ctx.fillStyle = "#2563eb";
  ctx.font = "bold 28px Georgia, serif";
  ctx.fillText(`${roomLabel} — ${moodLabel}`, 48, 55);

  // Subtitle
  ctx.fillStyle = "#525252";
  ctx.font = "14px -apple-system, Arial, sans-serif";
  ctx.fillText("Interior Color Palette \u00B7 60-30-10 Rule", 48, 80);

  // ── Color strip ──
  const stripX = 48, stripY = 108, stripW = W - 96, stripH = 90;
  const flexes = [6, 1, 1, 3, 1, 1];
  const totalFlex = flexes.reduce((a, b) => a + b, 0);

  // Rounded clip
  const rad = 14;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(stripX + rad, stripY);
  ctx.lineTo(stripX + stripW - rad, stripY);
  ctx.arcTo(stripX + stripW, stripY, stripX + stripW, stripY + rad, rad);
  ctx.lineTo(stripX + stripW, stripY + stripH - rad);
  ctx.arcTo(stripX + stripW, stripY + stripH, stripX + stripW - rad, stripY + stripH, rad);
  ctx.lineTo(stripX + rad, stripY + stripH);
  ctx.arcTo(stripX, stripY + stripH, stripX, stripY + stripH - rad, rad);
  ctx.lineTo(stripX, stripY + rad);
  ctx.arcTo(stripX, stripY, stripX + rad, stripY, rad);
  ctx.closePath();
  ctx.clip();

  let cx = stripX;
  palette.forEach((c, i) => {
    const w = (flexes[i] / totalFlex) * stripW;
    ctx.fillStyle = c.hex;
    ctx.fillRect(cx, stripY, w + 1, stripH);
    // Label
    const tc = luminance(c.hex) > 0.35 ? "#1a1a1a" : "#ffffff";
    ctx.fillStyle = tc;
    ctx.globalAlpha = 0.75;
    ctx.font = "bold 12px -apple-system, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(c.role.split(" ")[0], cx + w / 2, stripY + stripH - 10);
    ctx.globalAlpha = 1;
    cx += w;
  });
  ctx.restore();
  ctx.textAlign = "left";

  // ── Swatch cards — 3 columns × 2 rows ──
  const cardY = 230;
  const cardW = (W - 96 - 40) / 3;
  palette.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 48 + col * (cardW + 20);
    const y = cardY + row * 155;

    // Swatch circle
    ctx.beginPath();
    ctx.arc(x + 26, y + 26, 22, 0, Math.PI * 2);
    ctx.fillStyle = c.hex;
    ctx.fill();
    ctx.strokeStyle = "#d4d4d4";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Role
    ctx.fillStyle = "#1a1a1a";
    ctx.font = "bold 16px -apple-system, Arial, sans-serif";
    ctx.fillText(c.role, x + 58, y + 22);

    // Percentage
    if (c.pct !== "—") {
      ctx.fillStyle = "#2563eb";
      ctx.font = "bold 11px -apple-system, Arial, sans-serif";
      const rw = ctx.measureText(c.role).width;
      ctx.fillText(c.pct, x + 58 + rw + 8, y + 22);
    }

    // Hex
    ctx.fillStyle = "#525252";
    ctx.font = "600 14px Courier New, monospace";
    ctx.fillText(c.hex.toUpperCase(), x + 58, y + 42);

    // Tip (truncated)
    ctx.fillStyle = "#a3a3a3";
    ctx.font = "12px -apple-system, Arial, sans-serif";
    const tip = c.tip.length > 52 ? c.tip.substring(0, 49) + "..." : c.tip;
    ctx.fillText(tip, x + 58, y + 60);
  });

  // ── Watermark ──
  ctx.fillStyle = "#2563eb";
  ctx.globalAlpha = 0.6;
  ctx.font = "bold 20px Georgia, serif";
  ctx.textAlign = "right";
  ctx.fillText("mykit.tools", W - 40, H - 24);
  ctx.globalAlpha = 0.35;
  ctx.font = "12px -apple-system, Arial, sans-serif";
  ctx.fillText("Interior Palette Creator \u2014 free at mykit.tools", W - 40, H - 48);
  ctx.globalAlpha = 1;
  ctx.textAlign = "left";

  // Bottom accent line
  ctx.fillStyle = "#2563eb";
  ctx.globalAlpha = 0.15;
  ctx.fillRect(48, H - 10, W - 96, 2);
  ctx.globalAlpha = 1;

  // Download
  const link = document.createElement("a");
  link.download = `mykit-${roomLabel.toLowerCase().replace(/\s+/g, "-")}-${moodLabel.toLowerCase().replace(/\s+/g, "-")}-palette.jpg`;
  link.href = cv.toDataURL("image/jpeg", 0.92);
  link.click();
}

// ─── MOOD PRESETS ───────────────────────────
const ROOMS = [
  { id: "living", label: "Living Room", icon: "🛋️" },
  { id: "bedroom", label: "Bedroom", icon: "🛏️" },
  { id: "kitchen", label: "Kitchen", icon: "🍳" },
  { id: "bathroom", label: "Bathroom", icon: "🛁" },
  { id: "office", label: "Home Office", icon: "💻" },
  { id: "dining", label: "Dining Room", icon: "🍽️" },
  { id: "nursery", label: "Nursery", icon: "🧸" },
  { id: "hallway", label: "Hallway", icon: "🚪" },
];

const MOODS = [
  { id: "cozy", label: "Cozy & Warm", icon: "🕯️",
    hueShift: 0, satMod: -0.1, valBase: 0.85, accSatBoost: 0.1, warmBias: 25 },
  { id: "modern", label: "Modern & Clean", icon: "✨",
    hueShift: 0, satMod: -0.25, valBase: 0.92, accSatBoost: 0.2, warmBias: 0 },
  { id: "earthy", label: "Earthy & Natural", icon: "🌿",
    hueShift: 15, satMod: -0.2, valBase: 0.78, accSatBoost: 0.05, warmBias: 20 },
  { id: "coastal", label: "Coastal & Airy", icon: "🌊",
    hueShift: -10, satMod: -0.15, valBase: 0.9, accSatBoost: 0.1, warmBias: -15 },
  { id: "bold", label: "Bold & Dramatic", icon: "🎭",
    hueShift: 0, satMod: 0.1, valBase: 0.65, accSatBoost: 0.25, warmBias: 0 },
  { id: "minimal", label: "Minimalist", icon: "◻️",
    hueShift: 0, satMod: -0.45, valBase: 0.95, accSatBoost: -0.1, warmBias: 0 },
  { id: "romantic", label: "Romantic & Soft", icon: "🌸",
    hueShift: -20, satMod: -0.1, valBase: 0.88, accSatBoost: 0.05, warmBias: -10 },
  { id: "industrial", label: "Industrial & Raw", icon: "🏗️",
    hueShift: 5, satMod: -0.35, valBase: 0.55, accSatBoost: 0.15, warmBias: 10 },
];

// ─── PALETTE GENERATOR ──────────────────────
const ACCENT_MAP = {
  warm:   [25, 45],
  copper: [15, 30],
  navy:   [215, 230],
  olive:  [75, 95],
  blush:  [345, 360],
  slate:  [200, 215],
  ochre:  [38, 50],
  forest: [140, 160],
};

function pickAccentHue(baseH, moodId) {
  const h = ((baseH % 360) + 360) % 360;

  if (moodId === "minimal") return baseH;
  if (moodId === "industrial") return 25;

  if ((h >= 0 && h < 60) || h >= 330) {
    if (moodId === "coastal") return 205;
    if (moodId === "modern") return 215;
    return h + 15;
  }
  if (h >= 60 && h < 170) {
    if (moodId === "cozy") return 25;
    if (moodId === "romantic") return 350;
    if (moodId === "bold") return 15;
    return 35;
  }
  if (h >= 170 && h < 260) {
    if (moodId === "cozy") return 30;
    if (moodId === "earthy") return 35;
    if (moodId === "romantic") return 15;
    if (moodId === "bold") return 20;
    return 30;
  }
  if (h >= 260 && h < 330) {
    if (moodId === "cozy") return 35;
    if (moodId === "earthy") return 40;
    if (moodId === "coastal") return 195;
    return 30;
  }
  return 30;
}

function generatePalette(baseHex, mood, room, colorMode) {
  const [r, g, b] = hexToRgb(baseHex);
  let [h, s, v] = rgbToHsv(r, g, b);
  const m = MOODS.find(x => x.id === mood) || MOODS[0];

  let wallHex, wallH, wallS, wallV;

  if (colorMode === "wall") {
    wallHex = baseHex;
    wallH = h; wallS = s; wallV = v;
  } else {
    wallH = h + m.warmBias * 0.5;
    wallS = clamp(s * 0.18, 0.02, 0.15);
    wallV = clamp(m.valBase + 0.03, 0.75, 0.97);
    wallHex = makeHex(wallH, wallS, wallV);
  }

  const trimS = clamp(wallS * 0.2, 0.01, 0.06);
  const trimV = wallV < 0.6
    ? clamp(wallV + 0.35, 0.85, 0.98)
    : clamp(wallV + 0.04, 0.9, 0.99);
  const trimHex = m.id === "bold" && colorMode !== "wall"
    ? makeHex(h, trimS, clamp(wallV - 0.3, 0.25, 0.5))
    : makeHex(wallH, trimS, trimV);

  let accS, accV;
  if (colorMode === "wall") {
    accS = clamp(s + 0.15, 0.3, 0.9);
    accV = clamp(v - 0.15, 0.3, 0.75);
  } else {
    accS = clamp(s + m.accSatBoost * 0.5, 0.25, 0.85);
    accV = clamp(v, 0.35, 0.85);
  }
  const accentHex = makeHex(h + m.hueShift * 0.5, accS, accV);

  const furnH = h + m.warmBias * 0.3;
  const furnS = clamp(s * 0.1, 0.02, 0.1);
  const furnV = colorMode === "wall"
    ? (wallV > 0.6 ? clamp(wallV - 0.35, 0.25, 0.5) : clamp(wallV + 0.3, 0.6, 0.85))
    : clamp(m.valBase - 0.3, 0.28, 0.6);
  const furnitureHex = makeHex(furnH, furnS, furnV);

  const texH = h + m.warmBias * 0.4 + 5;
  const texS = clamp(s * 0.3, 0.04, 0.25);
  const texV = clamp((wallV + furnV) * 0.5 + 0.05, 0.45, 0.85);
  const textileHex = makeHex(texH, texS, texV);

  const decorH = pickAccentHue(h, mood);
  const decorS = clamp(0.55 + m.accSatBoost * 0.3, 0.35, 0.8);
  const decorV = clamp(0.6 + m.valBase * 0.2, 0.45, 0.85);
  const decorHex = makeHex(decorH, decorS, decorV);

  return [
    { role: "Walls", hex: wallHex, pct: "60%", tip: "Main wall color — the dominant tone of the room" },
    { role: "Trim & Ceiling", hex: trimHex, pct: "—", tip: "Baseboards, crown molding, ceiling, door frames" },
    { role: "Accent Wall / Feature", hex: accentHex, pct: "10%", tip: "One statement wall, fireplace, or built-in shelving" },
    { role: "Furniture", hex: furnitureHex, pct: "30%", tip: "Sofa, bed frame, table, large pieces" },
    { role: "Textiles", hex: textileHex, pct: "—", tip: "Curtains, rugs, throw pillows, blankets" },
    { role: "Decor Accent", hex: decorHex, pct: "—", tip: "Vases, art, lamps — the only color that breaks from the family" },
  ];
}

// ─── COMPONENTS ─────────────────────────────
function Chip({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium
        transition-all duration-150 cursor-pointer
        ${active
          ? "bg-accent text-white border border-accent"
          : "bg-surface border border-border text-text-secondary hover:bg-surface-hover"
        }
      `}
    >
      <span className="text-sm">{icon}</span>
      {label}
    </button>
  );
}

function CopyBtn({ value }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
      className="text-xs font-mono text-text-muted hover:text-text-secondary transition-colors"
    >
      {copied ? "✓ copied" : value.toUpperCase()}
    </button>
  );
}

// ─── MAIN COMPONENT ───────────────────────────
export default function InteriorPaletteCreator() {
  const [room, setRoom] = useState("living");
  const [mood, setMood] = useState("cozy");
  const [baseColor, setBaseColor] = useState("#4a7c8a");
  const [hexInput, setHexInput] = useState("#4a7c8a");
  const [palette, setPalette] = useState([]);
  const [colorMode, setColorMode] = useState("wall");
  const canvasRef = useRef(null);
  const dragging = useRef(false);
  const hueRef = useRef(null);
  const hueDragging = useRef(false);

  const INITIAL_COLOR = "#4a7c8a";
  const [hue, setHue] = useState(() => { const [h] = rgbToHsv(...hexToRgb(INITIAL_COLOR)); return h; });
  const [sat, setSat] = useState(() => { const [, s] = rgbToHsv(...hexToRgb(INITIAL_COLOR)); return s; });
  const [val, setVal] = useState(() => { const [,, v] = rgbToHsv(...hexToRgb(INITIAL_COLOR)); return v; });

  const updateBase = useCallback((hh, ss, vv) => {
    const hex = makeHex(hh, ss, vv);
    setBaseColor(hex);
    setHexInput(hex);
  }, []);

  useEffect(() => { updateBase(hue, sat, val); }, [hue, sat, val, updateBase]);

  useEffect(() => {
    setPalette(generatePalette(baseColor, mood, room, colorMode));
  }, [baseColor, mood, room, colorMode]);

  const drawSV = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const w = c.width, ch = c.height;
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < ch; y++) {
        const ss = x / w, vv = 1 - y / ch;
        const [rr, gg, bb] = hsvToRgb(hue, ss, vv);
        ctx.fillStyle = `rgb(${rr},${gg},${bb})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [hue]);

  useEffect(() => { drawSV(); }, [drawSV]);

  const handleSV = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSat(clamp((e.clientX - rect.left) / rect.width, 0, 1));
    setVal(1 - clamp((e.clientY - rect.top) / rect.height, 0, 1));
  }, []);

  const handleHue = useCallback((e) => {
    const rect = hueRef.current?.getBoundingClientRect();
    if (!rect) return;
    setHue(clamp((e.clientX - rect.left) / rect.width, 0, 1) * 360);
  }, []);

  useEffect(() => {
    const up = () => { dragging.current = false; hueDragging.current = false; };
    const mv = (e) => {
      if (dragging.current) handleSV(e);
      if (hueDragging.current) handleHue(e);
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", mv);
    return () => { window.removeEventListener("mouseup", up); window.removeEventListener("mousemove", mv); };
  }, [handleSV, handleHue]);

  const applyHex = () => {
    const [rr, gg, bb] = hexToRgb(hexInput);
    const [hh, ss, vv] = rgbToHsv(rr, gg, bb);
    setHue(hh); setSat(ss); setVal(vv);
  };

  return (
    <div className="w-full space-y-3">
      {/* Room select */}
      <Card>
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          Room Type
        </div>
        <div className="flex flex-wrap gap-2">
          {ROOMS.map(r => (
            <Chip key={r.id} label={r.label} icon={r.icon} active={room === r.id} onClick={() => setRoom(r.id)} />
          ))}
        </div>
      </Card>

      {/* Mood select */}
      <Card>
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          Mood / Style
        </div>
        <div className="flex flex-wrap gap-2">
          {MOODS.map(m => (
            <Chip key={m.id} label={m.label} icon={m.icon} active={mood === m.id} onClick={() => setMood(m.id)} />
          ))}
        </div>
      </Card>

      {/* Color picker */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Base Color
          </div>
          <div className="flex bg-surface border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setColorMode("wall")}
              className={`
                text-xs px-3 py-1 font-medium transition-colors border-r border-border
                ${colorMode === "wall"
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary"
                }
              `}
            >
              Use as wall color
            </button>
            <button
              onClick={() => setColorMode("inspiration")}
              className={`
                text-xs px-3 py-1 font-medium transition-colors
                ${colorMode === "inspiration"
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:text-text-primary"
                }
              `}
            >
              Inspiration only
            </button>
          </div>
        </div>

        {/* Preview */}
        <div
          className="h-12 rounded-lg mb-4 border border-border flex items-center justify-center"
          style={{ backgroundColor: baseColor }}
        >
          <span className="font-mono text-sm font-bold" style={{ color: textColor(baseColor) }}>
            {baseColor.toUpperCase()}
          </span>
        </div>

        {/* SV canvas */}
        <div className="relative mb-4 rounded-lg overflow-hidden cursor-crosshair border border-border">
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            className="w-full h-40 block"
            onMouseDown={(e) => { dragging.current = true; handleSV(e); }}
          />
          <div
            className="absolute w-3.5 h-3.5 rounded-full border-2 border-white pointer-events-none"
            style={{
              left: `${sat * 100}%`,
              top: `${(1 - val) * 100}%`,
              transform: "translate(-50%,-50%)",
              boxShadow: "0 0 4px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* Hue slider */}
        <div
          ref={hueRef}
          className="h-5 rounded-full cursor-pointer relative mb-4 border border-border overflow-hidden"
          style={{
            background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
          }}
          onMouseDown={(e) => { hueDragging.current = true; handleHue(e); }}
        >
          <div
            className="absolute top-1/2 w-3 h-3 rounded-full border-2 border-white pointer-events-none"
            style={{
              left: `${(hue / 360) * 100}%`,
              transform: "translate(-50%,-50%)",
              backgroundColor: `hsl(${hue}, 100%, 50%)`,
              boxShadow: "0 0 3px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* Hex input */}
        <div className="flex gap-2">
          <input
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyHex()}
            placeholder="#4a7c8a"
            className="flex-1 bg-white border border-border rounded-lg px-3 py-2 text-sm font-mono text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0"
          />
          <Button onClick={applyHex} variant="primary" size="md">
            Apply
          </Button>
        </div>
      </Card>

      {/* Generated Palette */}
      {palette.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-bold text-accent uppercase tracking-widest">
              Your {ROOMS.find(r => r.id === room)?.label} — {MOODS.find(m => m.id === mood)?.label}
            </div>
            <Button
              onClick={() => downloadPalette(palette, room, mood)}
              variant="secondary"
              size="md"
              className="flex items-center gap-2 text-xs"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Save JPG
            </Button>
          </div>

          {/* Full strip preview */}
          <div className="flex rounded-lg overflow-hidden h-14 mb-4 border border-border">
            {palette.map((c, i) => (
              <div
                key={i}
                className="flex items-end justify-center pb-1"
                style={{
                  flex: i === 0 ? "6 0 0%" : i === 3 ? "3 0 0%" : "1 0 0%",
                  backgroundColor: c.hex,
                }}
              >
                <span className="text-xs font-bold opacity-70" style={{ color: textColor(c.hex) }}>
                  {c.role.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Individual color cards */}
          <div className="space-y-1">
            {palette.map((c, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg ${i < palette.length - 1 ? "border-b border-border" : ""}`}
              >
                <div
                  className="w-11 h-11 rounded-lg border border-border flex-shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-text-primary">{c.role}</span>
                    {c.pct !== "—" && (
                      <span className="text-xs font-bold text-white bg-accent px-2 py-0.5 rounded">
                        {c.pct}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-text-secondary mt-1">{c.tip}</div>
                </div>
                <CopyBtn value={c.hex} />
              </div>
            ))}
          </div>

          {/* 60-30-10 explainer */}
          <div className="mt-4 p-3 bg-surface border border-border rounded-lg">
            <div className="text-xs font-semibold text-accent mb-2">The 60-30-10 Rule</div>
            <div className="text-xs text-text-secondary leading-relaxed">
              Professional designers use this ratio: 60% dominant color (walls, floors), 30% secondary (furniture, large textiles), 10% accent (art, decor, throw pillows). This creates visual balance without overwhelming a space.
            </div>
          </div>
        </Card>
      )}

      {/* Room visualization */}
      {palette.length > 0 && (
        <Card>
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Room Preview
          </div>
          <svg viewBox="0 0 400 260" className="w-full border border-border rounded-lg" style={{ backgroundColor: palette[1]?.hex || "#fff" }}>
            {/* ── SHARED: Back wall ── */}
            <rect x="30" y="15" width="340" height="185" fill={palette[0]?.hex} />
            {/* Accent wall left */}
            <rect x="30" y="15" width="85" height="185" fill={palette[2]?.hex} opacity="0.85" />
            {/* Trim top */}
            <rect x="30" y="12" width="340" height="6" rx="1" fill={palette[1]?.hex} />
            {/* Trim bottom baseboard */}
            <rect x="30" y="195" width="340" height="8" rx="1" fill={palette[1]?.hex} />
            {/* Floor */}
            <polygon points="0,203 400,203 370,260 30,260" fill={palette[3]?.hex} opacity="0.35" />
            {/* Floor line */}
            <line x1="30" y1="203" x2="370" y2="203" stroke={palette[1]?.hex} strokeWidth="1" opacity="0.3" />

            {room === "living" && <>
              {/* Sofa */}
              <rect x="130" y="145" width="170" height="48" rx="10" fill={palette[3]?.hex} />
              {/* Sofa back */}
              <rect x="126" y="128" width="178" height="22" rx="8" fill={palette[3]?.hex} />
              {/* Sofa arms */}
              <rect x="120" y="135" width="18" height="55" rx="7" fill={palette[3]?.hex} />
              <rect x="292" y="135" width="18" height="55" rx="7" fill={palette[3]?.hex} />
              {/* Pillows */}
              <ellipse cx="160" cy="152" rx="18" ry="14" fill={palette[4]?.hex} />
              <ellipse cx="270" cy="152" rx="18" ry="14" fill={palette[5]?.hex} />
              <ellipse cx="215" cy="155" rx="15" ry="12" fill={palette[4]?.hex} opacity="0.7" />
              {/* Coffee table */}
              <rect x="170" y="200" width="90" height="8" rx="2" fill={palette[3]?.hex} opacity="0.8" />
              <rect x="180" y="208" width="4" height="14" fill={palette[3]?.hex} opacity="0.6" />
              <rect x="246" y="208" width="4" height="14" fill={palette[3]?.hex} opacity="0.6" />
              {/* Book on table */}
              <rect x="200" y="197" width="22" height="5" rx="1" fill={palette[5]?.hex} opacity="0.7" />
              {/* Wall art - framed */}
              <rect x="190" y="42" width="60" height="45" rx="2" fill={palette[3]?.hex} opacity="0.6" />
              <rect x="194" y="46" width="52" height="37" rx="1" fill={palette[5]?.hex} opacity="0.5" />
              {/* Floor lamp left */}
              <rect x="52" y="90" width="3" height="105" fill={palette[1]?.hex} opacity="0.6" />
              <path d="M 38 90 Q 53 75 68 90 Z" fill={palette[4]?.hex} opacity="0.8" />
              {/* Side table */}
              <rect x="330" y="165" width="28" height="28" rx="4" fill={palette[3]?.hex} opacity="0.7" />
              {/* Plant on side table */}
              <ellipse cx="344" cy="158" rx="14" ry="12" fill="#5a8a5e" opacity="0.5" />
              <ellipse cx="340" cy="162" rx="10" ry="9" fill="#4a7a4e" opacity="0.5" />
              <rect x="340" y="164" width="8" height="6" rx="2" fill={palette[3]?.hex} opacity="0.7" />
              {/* Rug */}
              <ellipse cx="215" cy="230" rx="90" ry="18" fill={palette[4]?.hex} opacity="0.25" />
            </>}

            {room === "bedroom" && <>
              {/* Bed frame */}
              <rect x="110" y="130" width="200" height="65" rx="6" fill={palette[3]?.hex} />
              {/* Headboard */}
              <rect x="108" y="85" width="204" height="50" rx="8" fill={palette[3]?.hex} />
              {/* Headboard panel detail */}
              <rect x="118" y="92" width="58" height="36" rx="4" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.5" />
              <rect x="182" y="92" width="58" height="36" rx="4" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.5" />
              <rect x="246" y="92" width="58" height="36" rx="4" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.5" />
              {/* Bedding / duvet */}
              <rect x="115" y="135" width="190" height="50" rx="5" fill={palette[4]?.hex} />
              {/* Pillows */}
              <ellipse cx="165" cy="138" rx="28" ry="16" fill={palette[1]?.hex} opacity="0.85" />
              <ellipse cx="255" cy="138" rx="28" ry="16" fill={palette[1]?.hex} opacity="0.85" />
              {/* Throw blanket */}
              <rect x="180" y="155" width="70" height="25" rx="4" fill={palette[5]?.hex} opacity="0.7" />
              {/* Nightstand left */}
              <rect x="60" y="148" width="36" height="42" rx="4" fill={palette[3]?.hex} opacity="0.8" />
              <rect x="63" y="162" width="30" height="12" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="0.5" opacity="0.6" />
              {/* Lamp on nightstand */}
              <rect x="75" y="130" width="4" height="20" fill={palette[1]?.hex} opacity="0.5" />
              <ellipse cx="77" cy="128" rx="12" ry="8" fill={palette[4]?.hex} opacity="0.7" />
              {/* Nightstand right */}
              <rect x="324" y="148" width="36" height="42" rx="4" fill={palette[3]?.hex} opacity="0.8" />
              {/* Book stack */}
              <rect x="330" y="142" width="18" height="4" rx="1" fill={palette[5]?.hex} opacity="0.6" />
              <rect x="332" y="138" width="14" height="4" rx="1" fill={palette[2]?.hex} opacity="0.4" />
              {/* Wall art pair */}
              <rect x="160" y="35" width="35" height="35" rx="2" fill={palette[3]?.hex} opacity="0.5" />
              <rect x="163" y="38" width="29" height="29" rx="1" fill={palette[5]?.hex} opacity="0.4" />
              <rect x="225" y="35" width="35" height="35" rx="2" fill={palette[3]?.hex} opacity="0.5" />
              <rect x="228" y="38" width="29" height="29" rx="1" fill={palette[4]?.hex} opacity="0.3" />
              {/* Rug */}
              <ellipse cx="210" cy="232" rx="100" ry="16" fill={palette[4]?.hex} opacity="0.2" />
            </>}

            {room === "kitchen" && <>
              {/* Countertop */}
              <rect x="130" y="120" width="230" height="10" rx="2" fill={palette[1]?.hex} opacity="0.8" />
              {/* Lower cabinets */}
              <rect x="130" y="130" width="230" height="65" rx="3" fill={palette[3]?.hex} />
              {/* Cabinet doors */}
              <rect x="135" y="135" width="50" height="55" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.7" />
              <rect x="190" y="135" width="50" height="55" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.7" />
              <rect x="245" y="135" width="50" height="55" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.7" />
              <rect x="300" y="135" width="55" height="55" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.7" />
              {/* Cabinet handles */}
              <rect x="157" y="158" width="8" height="3" rx="1" fill={palette[1]?.hex} opacity="0.5" />
              <rect x="212" y="158" width="8" height="3" rx="1" fill={palette[1]?.hex} opacity="0.5" />
              <rect x="267" y="158" width="8" height="3" rx="1" fill={palette[1]?.hex} opacity="0.5" />
              <rect x="324" y="158" width="8" height="3" rx="1" fill={palette[1]?.hex} opacity="0.5" />
              {/* Upper cabinets */}
              <rect x="160" y="25" width="200" height="60" rx="3" fill={palette[3]?.hex} opacity="0.8" />
              <rect x="165" y="30" width="60" height="50" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.6" />
              <rect x="230" y="30" width="60" height="50" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.6" />
              <rect x="295" y="30" width="60" height="50" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.6" />
              {/* Backsplash area */}
              <rect x="130" y="85" width="230" height="35" fill={palette[4]?.hex} opacity="0.3" />
              {/* Range hood */}
              <path d="M 220 85 L 200 25 L 280 25 L 260 85 Z" fill={palette[1]?.hex} opacity="0.3" />
              {/* Fridge */}
              <rect x="38" y="40" width="65" height="155" rx="4" fill={palette[1]?.hex} opacity="0.4" />
              <rect x="42" y="44" width="57" height="80" rx="2" fill={palette[1]?.hex} opacity="0.3" />
              <rect x="42" y="128" width="57" height="62" rx="2" fill={palette[1]?.hex} opacity="0.3" />
              <rect x="95" y="80" width="3" height="20" rx="1" fill={palette[1]?.hex} opacity="0.4" />
              <rect x="95" y="150" width="3" height="20" rx="1" fill={palette[1]?.hex} opacity="0.4" />
              {/* Items on counter */}
              <rect x="145" y="108" width="12" height="14" rx="2" fill={palette[5]?.hex} opacity="0.6" />
              <rect x="310" y="106" width="18" height="16" rx="3" fill={palette[5]?.hex} opacity="0.5" />
              {/* Pendant lights */}
              <line x1="200" y1="0" x2="200" y2="18" stroke={palette[1]?.hex} strokeWidth="1" opacity="0.4" />
              <ellipse cx="200" cy="22" rx="10" ry="6" fill={palette[5]?.hex} opacity="0.5" />
              <line x1="280" y1="0" x2="280" y2="18" stroke={palette[1]?.hex} strokeWidth="1" opacity="0.4" />
              <ellipse cx="280" cy="22" rx="10" ry="6" fill={palette[5]?.hex} opacity="0.5" />
            </>}

            {room === "bathroom" && <>
              {/* Vanity */}
              <rect x="130" y="115" width="160" height="80" rx="4" fill={palette[3]?.hex} />
              <rect x="135" y="120" width="70" height="65" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.7" />
              <rect x="210" y="120" width="70" height="65" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="1" opacity="0.7" />
              {/* Countertop */}
              <rect x="128" y="110" width="164" height="8" rx="2" fill={palette[1]?.hex} opacity="0.7" />
              {/* Sink */}
              <ellipse cx="210" cy="114" rx="22" ry="5" fill={palette[0]?.hex} opacity="0.5" />
              {/* Faucet */}
              <rect x="208" y="100" width="4" height="14" rx="1" fill={palette[1]?.hex} opacity="0.6" />
              <rect x="202" y="98" width="16" height="4" rx="2" fill={palette[1]?.hex} opacity="0.6" />
              {/* Mirror */}
              <rect x="165" y="30" width="90" height="65" rx="6" fill={palette[1]?.hex} opacity="0.3" />
              <rect x="169" y="34" width="82" height="57" rx="4" fill={palette[0]?.hex} opacity="0.3" />
              {/* Towel rack */}
              <rect x="320" y="90" width="35" height="4" rx="2" fill={palette[1]?.hex} opacity="0.5" />
              <rect x="325" y="94" width="12" height="50" rx="2" fill={palette[4]?.hex} opacity="0.7" />
              <rect x="340" y="94" width="12" height="45" rx="2" fill={palette[5]?.hex} opacity="0.6" />
              {/* Bathtub / shower area */}
              <rect x="35" y="80" width="70" height="115" rx="6" fill={palette[1]?.hex} opacity="0.2" />
              <rect x="38" y="83" width="64" height="109" rx="4" fill={palette[4]?.hex} opacity="0.15" />
              {/* Shower head */}
              <rect x="65" y="25" width="3" height="58" fill={palette[1]?.hex} opacity="0.4" />
              <ellipse cx="66" cy="24" rx="10" ry="5" fill={palette[1]?.hex} opacity="0.4" />
              {/* Plant */}
              <ellipse cx="148" cy="104" rx="10" ry="9" fill="#5a8a5e" opacity="0.4" />
              <rect x="144" y="107" width="8" height="6" rx="2" fill={palette[5]?.hex} opacity="0.5" />
              {/* Floor tile pattern */}
              <rect x="80" y="220" width="240" height="2" fill={palette[1]?.hex} opacity="0.1" />
              <rect x="60" y="238" width="280" height="2" fill={palette[1]?.hex} opacity="0.1" />
            </>}

            {room === "office" && <>
              {/* Desk */}
              <rect x="100" y="145" width="220" height="10" rx="2" fill={palette[3]?.hex} />
              {/* Desk legs */}
              <rect x="108" y="155" width="6" height="40" fill={palette[3]?.hex} opacity="0.8" />
              <rect x="306" y="155" width="6" height="40" fill={palette[3]?.hex} opacity="0.8" />
              <rect x="108" y="170" width="198" height="4" rx="1" fill={palette[3]?.hex} opacity="0.4" />
              {/* Monitor */}
              <rect x="175" y="90" width="80" height="52" rx="3" fill="#1a1a1a" opacity="0.8" />
              <rect x="179" y="94" width="72" height="44" rx="1" fill={palette[2]?.hex} opacity="0.2" />
              <rect x="210" y="142" width="10" height="6" fill="#1a1a1a" opacity="0.7" />
              <rect x="200" y="145" width="30" height="3" rx="1" fill="#1a1a1a" opacity="0.6" />
              {/* Keyboard */}
              <rect x="185" y="152" width="55" height="10" rx="2" fill={palette[1]?.hex} opacity="0.4" />
              {/* Mouse */}
              <rect x="252" y="153" width="12" height="8" rx="4" fill={palette[1]?.hex} opacity="0.4" />
              {/* Office chair */}
              <ellipse cx="215" cy="215" rx="32" ry="10" fill={palette[3]?.hex} opacity="0.5" />
              <rect x="207" y="200" width="16" height="15" fill={palette[3]?.hex} opacity="0.4" />
              <rect x="195" y="195" width="40" height="10" rx="5" fill={palette[4]?.hex} opacity="0.7" />
              <rect x="190" y="175" width="50" height="22" rx="6" fill={palette[4]?.hex} opacity="0.8" />
              {/* Shelf */}
              <rect x="40" y="50" width="60" height="6" rx="1" fill={palette[3]?.hex} opacity="0.7" />
              <rect x="40" y="85" width="60" height="6" rx="1" fill={palette[3]?.hex} opacity="0.7" />
              {/* Books on shelf */}
              <rect x="45" y="35" width="8" height="15" rx="1" fill={palette[5]?.hex} opacity="0.6" />
              <rect x="55" y="38" width="7" height="12" rx="1" fill={palette[2]?.hex} opacity="0.4" />
              <rect x="64" y="36" width="9" height="14" rx="1" fill={palette[4]?.hex} opacity="0.5" />
              <rect x="48" y="70" width="10" height="15" rx="1" fill={palette[4]?.hex} opacity="0.5" />
              <rect x="62" y="72" width="8" height="13" rx="1" fill={palette[5]?.hex} opacity="0.5" />
              {/* Plant */}
              <ellipse cx="85" cy="75" rx="12" ry="11" fill="#5a8a5e" opacity="0.45" />
              <rect x="81" y="80" width="8" height="7" rx="2" fill={palette[5]?.hex} opacity="0.5" />
              {/* Desk lamp */}
              <rect x="120" y="130" width="3" height="18" fill={palette[1]?.hex} opacity="0.5" />
              <path d="M 110 130 L 122 118 L 134 130 Z" fill={palette[5]?.hex} opacity="0.6" />
              {/* Mug */}
              <rect x="290" y="140" width="12" height="10" rx="2" fill={palette[5]?.hex} opacity="0.6" />
            </>}

            {room === "dining" && <>
              {/* Table */}
              <rect x="120" y="140" width="180" height="12" rx="3" fill={palette[3]?.hex} />
              {/* Table legs */}
              <rect x="140" y="152" width="5" height="42" fill={palette[3]?.hex} opacity="0.7" />
              <rect x="275" y="152" width="5" height="42" fill={palette[3]?.hex} opacity="0.7" />
              {/* Chairs back */}
              <rect x="145" y="105" width="30" height="40" rx="4" fill={palette[3]?.hex} opacity="0.7" />
              <rect x="195" y="105" width="30" height="40" rx="4" fill={palette[3]?.hex} opacity="0.7" />
              <rect x="245" y="105" width="30" height="40" rx="4" fill={palette[3]?.hex} opacity="0.7" />
              {/* Chair seats (front, overlapping table) */}
              <rect x="140" y="200" width="38" height="10" rx="3" fill={palette[4]?.hex} opacity="0.7" />
              <rect x="192" y="200" width="38" height="10" rx="3" fill={palette[4]?.hex} opacity="0.7" />
              <rect x="244" y="200" width="38" height="10" rx="3" fill={palette[4]?.hex} opacity="0.7" />
              {/* Table settings */}
              <ellipse cx="165" cy="140" rx="12" ry="4" fill={palette[1]?.hex} opacity="0.4" />
              <ellipse cx="210" cy="140" rx="12" ry="4" fill={palette[1]?.hex} opacity="0.4" />
              <ellipse cx="260" cy="140" rx="12" ry="4" fill={palette[1]?.hex} opacity="0.4" />
              {/* Centerpiece */}
              <ellipse cx="213" cy="136" rx="8" ry="6" fill="#5a8a5e" opacity="0.4" />
              <rect x="209" y="136" width="8" height="6" rx="2" fill={palette[5]?.hex} opacity="0.5" />
              {/* Chandelier / pendant */}
              <line x1="213" y1="0" x2="213" y2="30" stroke={palette[1]?.hex} strokeWidth="1.5" opacity="0.4" />
              <ellipse cx="213" cy="36" rx="20" ry="10" fill={palette[5]?.hex} opacity="0.35" />
              <ellipse cx="213" cy="34" rx="15" ry="7" fill={palette[5]?.hex} opacity="0.2" />
              {/* Wall art */}
              <rect x="310" y="40" width="40" height="55" rx="2" fill={palette[3]?.hex} opacity="0.5" />
              <rect x="314" y="44" width="32" height="47" rx="1" fill={palette[5]?.hex} opacity="0.35" />
              {/* Sideboard */}
              <rect x="35" y="140" width="60" height="52" rx="4" fill={palette[3]?.hex} opacity="0.7" />
              <rect x="39" y="145" width="24" height="42" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="0.5" opacity="0.5" />
              <rect x="67" y="145" width="24" height="42" rx="2" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="0.5" opacity="0.5" />
              {/* Decor on sideboard */}
              <rect x="50" y="128" width="10" height="14" rx="2" fill={palette[5]?.hex} opacity="0.5" />
              <rect x="72" y="132" width="14" height="10" rx="2" fill={palette[4]?.hex} opacity="0.4" />
            </>}

            {room === "nursery" && <>
              {/* Crib */}
              <rect x="140" y="120" width="140" height="70" rx="6" fill={palette[3]?.hex} />
              {/* Crib rails */}
              {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
                <rect key={i} x={148 + i * 12} y="105" width="3" height="55" rx="1" fill={palette[3]?.hex} stroke={palette[1]?.hex} strokeWidth="0.5" opacity="0.7" />
              ))}
              {/* Crib top rail */}
              <rect x="138" y="102" width="144" height="6" rx="3" fill={palette[3]?.hex} />
              {/* Bedding */}
              <rect x="148" y="155" width="120" height="28" rx="4" fill={palette[4]?.hex} opacity="0.7" />
              {/* Pillow */}
              <ellipse cx="175" cy="150" rx="18" ry="10" fill={palette[1]?.hex} opacity="0.7" />
              {/* Mobile */}
              <line x1="210" y1="15" x2="210" y2="60" stroke={palette[1]?.hex} strokeWidth="1" opacity="0.4" />
              <line x1="190" y1="60" x2="230" y2="60" stroke={palette[1]?.hex} strokeWidth="1.5" opacity="0.4" />
              <circle cx="190" cy="70" r="6" fill={palette[5]?.hex} opacity="0.6" />
              <circle cx="210" cy="73" r="5" fill={palette[4]?.hex} opacity="0.5" />
              <circle cx="230" cy="70" r="6" fill={palette[2]?.hex} opacity="0.4" />
              {/* Rocking chair */}
              <rect x="42" y="135" width="45" height="35" rx="6" fill={palette[4]?.hex} opacity="0.7" />
              <rect x="40" y="120" width="49" height="18" rx="5" fill={palette[4]?.hex} opacity="0.8" />
              <path d="M 35 175 Q 64 185 93 175" fill="none" stroke={palette[3]?.hex} strokeWidth="4" opacity="0.6" />
              {/* Pillow on chair */}
              <ellipse cx="64" cy="140" rx="12" ry="10" fill={palette[5]?.hex} opacity="0.5" />
              {/* Shelf with toys */}
              <rect x="310" y="70" width="48" height="6" rx="1" fill={palette[3]?.hex} opacity="0.7" />
              <rect x="310" y="110" width="48" height="6" rx="1" fill={palette[3]?.hex} opacity="0.7" />
              {/* Toys */}
              <circle cx="322" cy="64" r="6" fill={palette[5]?.hex} opacity="0.5" />
              <rect x="335" y="58" width="10" height="12" rx="2" fill={palette[4]?.hex} opacity="0.5" />
              <circle cx="325" cy="104" r="5" fill={palette[2]?.hex} opacity="0.3" />
              <rect x="338" y="100" width="12" height="10" rx="1" fill={palette[5]?.hex} opacity="0.4" />
              {/* Rug */}
              <ellipse cx="200" cy="230" rx="85" ry="16" fill={palette[4]?.hex} opacity="0.2" />
              {/* Stars on accent wall */}
              <text x="55" y="55" fontSize="12" fill={palette[1]?.hex} opacity="0.25">★</text>
              <text x="75" y="80" fontSize="8" fill={palette[1]?.hex} opacity="0.2">★</text>
              <text x="48" y="100" fontSize="10" fill={palette[1]?.hex} opacity="0.2">★</text>
            </>}

            {room === "hallway" && <>
              {/* Console table */}
              <rect x="145" y="145" width="130" height="8" rx="2" fill={palette[3]?.hex} />
              <rect x="155" y="153" width="4" height="40" fill={palette[3]?.hex} opacity="0.7" />
              <rect x="261" y="153" width="4" height="40" fill={palette[3]?.hex} opacity="0.7" />
              {/* Mirror above */}
              <ellipse cx="210" cy="75" rx="35" ry="45" fill={palette[1]?.hex} opacity="0.25" />
              <ellipse cx="210" cy="75" rx="32" ry="42" fill={palette[0]?.hex} opacity="0.3" />
              {/* Vase */}
              <path d="M 200 145 Q 195 125 200 115 Q 210 110 220 115 Q 225 125 220 145 Z" fill={palette[5]?.hex} opacity="0.6" />
              {/* Flowers */}
              <circle cx="205" cy="108" r="4" fill={palette[5]?.hex} opacity="0.7" />
              <circle cx="215" cy="105" r="4" fill={palette[4]?.hex} opacity="0.5" />
              <circle cx="210" cy="110" r="3" fill="#5a8a5e" opacity="0.4" />
              {/* Keys tray */}
              <rect x="240" y="140" width="22" height="5" rx="2" fill={palette[3]?.hex} opacity="0.6" />
              {/* Coat hooks */}
              <rect x="330" y="80" width="25" height="4" rx="2" fill={palette[3]?.hex} opacity="0.5" />
              <circle cx="337" cy="84" r="3" fill={palette[1]?.hex} opacity="0.4" />
              <circle cx="349" cy="84" r="3" fill={palette[1]?.hex} opacity="0.4" />
              {/* Hanging coat */}
              <path d="M 337 87 L 330 130 L 344 130 Z" fill={palette[3]?.hex} opacity="0.3" />
              {/* Gallery wall on accent side */}
              <rect x="43" y="40" width="30" height="40" rx="2" fill={palette[3]?.hex} opacity="0.5" />
              <rect x="46" y="43" width="24" height="34" rx="1" fill={palette[5]?.hex} opacity="0.35" />
              <rect x="78" y="50" width="25" height="30" rx="2" fill={palette[3]?.hex} opacity="0.5" />
              <rect x="81" y="53" width="19" height="24" rx="1" fill={palette[4]?.hex} opacity="0.3" />
              <rect x="55" y="85" width="35" height="25" rx="2" fill={palette[3]?.hex} opacity="0.5" />
              <rect x="58" y="88" width="29" height="19" rx="1" fill={palette[2]?.hex} opacity="0.25" />
              {/* Runner rug */}
              <rect x="130" y="218" width="160" height="24" rx="4" fill={palette[4]?.hex} opacity="0.2" />
              <rect x="140" y="226" width="140" height="8" rx="2" fill={palette[5]?.hex} opacity="0.1" />
            </>}
          </svg>
        </Card>
      )}

      {/* Tips per room */}
      {palette.length > 0 && (
        <Card>
          <h3 className="text-base font-semibold text-text-primary mb-2">
            {ROOMS.find(r => r.id === room)?.icon} Tips for your {ROOMS.find(r => r.id === room)?.label}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {room === "living" && "Living rooms benefit from warm, inviting tones. Use your accent color sparingly on throw pillows and art. Keep walls neutral if you have bold furniture, or go bold on walls with neutral furnishings."}
            {room === "bedroom" && "Bedrooms work best with calming, muted palettes. Avoid high-saturation accent walls behind the bed — opt for soft textiles instead. Layer different textures in similar tones for depth."}
            {room === "kitchen" && "Kitchens need to feel clean and energizing. White or light walls work universally. Add color through backsplash, bar stools, or small appliances. Avoid dark walls unless you have great natural light."}
            {room === "bathroom" && "Bathrooms benefit from spa-like palettes. Use your accent color on towels and accessories rather than walls. Ensure enough contrast between walls and fixtures for a polished look."}
            {room === "office" && "Home offices need focus-friendly colors. Blues and greens boost productivity. Avoid overly warm reds/oranges on large surfaces. Use accent color on desk accessories and art."}
            {room === "dining" && "Dining rooms can handle bolder choices than other rooms. Rich, warm tones stimulate appetite and conversation. Use accent lighting to make your wall color shift beautifully at night."}
            {room === "nursery" && "Nurseries work best with soft, muted versions of any color. Avoid stark white — it can feel clinical. Add playful pops through textiles and wall art rather than painting everything bright."}
            {room === "hallway" && "Hallways are transitional — keep them lighter than adjacent rooms to feel spacious. A bold accent color on the front door or a single gallery wall adds personality without overwhelming a narrow space."}
          </p>
        </Card>
      )}

      {/* SEO content */}
      <Card>
        <h3 className="text-base font-semibold text-text-primary mb-2">How this tool works</h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          Choose a room type and mood, then pick your base inspiration color. The algorithm generates a complete 6-color interior scheme using the professional 60-30-10 ratio — walls, trim, accent, furniture, textiles, and decor. Every palette is designed to feel cohesive and balanced. Click any hex code to copy it. Runs entirely in your browser.
        </p>
      </Card>
    </div>
  );
}
