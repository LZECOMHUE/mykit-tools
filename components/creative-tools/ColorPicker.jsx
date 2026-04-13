"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";

function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (hex.length !== 6) return null;
  const n = parseInt(hex, 16);
  if (isNaN(n)) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Convert HSV to RGB
function hsvToRgb(h, s, v) {
  s /= 100; v /= 100;
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0, s = max === 0 ? 0 : d / max, v = max;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
}

const CANVAS_SIZE = 256;
const HUE_HEIGHT = 20;

export default function ColorPicker() {
  const [hue, setHue] = useState(210);
  const [sat, setSat] = useState(80);
  const [val, setVal] = useState(80);
  const [opacity, setOpacity] = useState(100);
  const [recentColors, setRecentColors] = useState([]);
  const [toast, setToast] = useState("");
  const [hexInput, setHexInput] = useState("");

  const areaCanvasRef = useRef(null);
  const hueCanvasRef = useRef(null);
  const draggingArea = useRef(false);
  const draggingHue = useRef(false);
  const hexRef = useRef("");

  const rgb = hsvToRgb(hue, sat, val);
  const hex = rgbToHex(...rgb);
  const hsl = rgbToHsl(...rgb);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1500);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    showToast("Copied!");
    addRecent(hex);
  };

  const addRecent = (color) => {
    setRecentColors((prev) => {
      const next = [color, ...prev.filter((c) => c !== color)].slice(0, 10);
      return next;
    });
  };

  // Draw saturation-brightness area
  useEffect(() => {
    const canvas = areaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;

    // Base hue fill
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, w, h);

    // White gradient left to right
    const g1 = ctx.createLinearGradient(0, 0, w, 0);
    g1.addColorStop(0, "rgba(255,255,255,1)");
    g1.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);

    // Black gradient top to bottom
    const g2 = ctx.createLinearGradient(0, 0, 0, h);
    g2.addColorStop(0, "rgba(0,0,0,0)");
    g2.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);
  }, [hue]);

  // Draw hue strip
  useEffect(() => {
    const canvas = hueCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const g = ctx.createLinearGradient(0, 0, w, 0);
    for (let i = 0; i <= 360; i += 60) {
      g.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
    }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, canvas.height);
  }, []);

  // Keep hexRef in sync with current hex value
  useEffect(() => {
    hexRef.current = hex;
  }, [hex]);

  // Sync hex input
  useEffect(() => {
    setHexInput(hex);
  }, [hex]);

  const handleAreaInteraction = useCallback((e) => {
    const canvas = areaCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setSat(Math.round(x * 100));
    setVal(Math.round((1 - y) * 100));
  }, []);

  const handleHueInteraction = useCallback((e) => {
    const canvas = hueCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHue(Math.round(x * 360));
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (draggingArea.current) handleAreaInteraction(e);
      if (draggingHue.current) handleHueInteraction(e);
    };
    const handleUp = () => {
      if (draggingArea.current || draggingHue.current) addRecent(hexRef.current);
      draggingArea.current = false;
      draggingHue.current = false;
    };
    const handleTouchMove = (e) => {
      if (draggingArea.current || draggingHue.current) {
        e.preventDefault();
        handleMove(e.touches[0]);
      }
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [handleAreaInteraction, handleHueInteraction]);

  const handleHexChange = (v) => {
    setHexInput(v);
    const parsed = hexToRgb(v);
    if (parsed) {
      const [h, s, vv] = rgbToHsv(...parsed);
      setHue(h); setSat(s); setVal(vv);
    }
  };

  const handleRgbChange = (idx, value) => {
    const next = [...rgb];
    next[idx] = Math.max(0, Math.min(255, parseInt(value) || 0));
    const [h, s, v] = rgbToHsv(...next);
    setHue(h); setSat(s); setVal(v);
  };

  const handleHslChange = (idx, value) => {
    const next = [...hsl];
    const max = idx === 0 ? 360 : 100;
    next[idx] = Math.max(0, Math.min(max, parseInt(value) || 0));
    const rgbNew = hslToRgb(...next);
    const [h, s, v] = rgbToHsv(...rgbNew);
    setHue(h); setSat(s); setVal(v);
  };

  const setFromRecent = (color) => {
    const parsed = hexToRgb(color);
    if (parsed) {
      const [h, s, v] = rgbToHsv(...parsed);
      setHue(h); setSat(s); setVal(v);
    }
  };

  // Cursor positions
  const areaX = (sat / 100) * CANVAS_SIZE;
  const areaY = ((100 - val) / 100) * CANVAS_SIZE;

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg animate-fade-in">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-4">
        {/* Left: picker area */}
        <div className="space-y-3">
          {/* Sat-Val area */}
          <div className="relative rounded-lg overflow-hidden border border-border" style={{ width: "100%", maxWidth: CANVAS_SIZE }}>
            <canvas
              ref={areaCanvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              className="w-full cursor-crosshair block"
              style={{ aspectRatio: "1" }}
              onMouseDown={(e) => { draggingArea.current = true; handleAreaInteraction(e); }}
              onTouchStart={(e) => { draggingArea.current = true; handleAreaInteraction(e.touches[0]); }}
            />
            <div
              className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(sat / 100) * 100}%`, top: `${((100 - val) / 100) * 100}%`, boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)" }}
            />
          </div>

          {/* Hue slider */}
          <div className="relative rounded-full overflow-hidden border border-border" style={{ maxWidth: CANVAS_SIZE }}>
            <canvas
              ref={hueCanvasRef}
              width={CANVAS_SIZE}
              height={HUE_HEIGHT}
              className="w-full cursor-pointer block"
              style={{ height: HUE_HEIGHT }}
              onMouseDown={(e) => { draggingHue.current = true; handleHueInteraction(e); }}
              onTouchStart={(e) => { draggingHue.current = true; handleHueInteraction(e.touches[0]); }}
            />
            <div
              className="absolute top-0 w-3 h-full border-2 border-white rounded-full shadow-md pointer-events-none -translate-x-1/2"
              style={{ left: `${(hue / 360) * 100}%`, boxShadow: "0 0 0 1px rgba(0,0,0,0.3)" }}
            />
          </div>

          {/* Opacity slider */}
          <div className="flex items-center gap-2" style={{ maxWidth: CANVAS_SIZE }}>
            <span className="text-xs text-text-muted w-12">Opacity</span>
            <input
              type="range"
              min={0}
              max={100}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="flex-1 h-2 bg-border rounded-full appearance-none cursor-pointer accent-accent"
            />
            <span className="text-xs font-mono text-text-secondary w-8 text-right">{opacity}%</span>
          </div>
        </div>

        {/* Right: colour info */}
        <div className="space-y-3">
          {/* Swatch */}
          <div
            className="w-full aspect-square rounded-xl border border-border shadow-inner"
            style={{ backgroundColor: opacity < 100 ? `rgba(${rgb.join(",")},${opacity / 100})` : hex }}
          />

          {/* Values */}
          <div className="space-y-2">
            {/* Hex */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-text-muted w-7">HEX</span>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                className="flex-1 px-2 py-1 text-xs font-mono border border-border rounded bg-white text-text-primary focus:border-accent focus:outline-none"
              />
              <button onClick={() => copyText(hex)} className="px-1.5 py-1 text-[10px] text-accent hover:bg-accent/10 rounded transition-colors">Copy</button>
            </div>

            {/* RGB */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-text-muted w-7">RGB</span>
              {["R", "G", "B"].map((ch, i) => (
                <input
                  key={ch}
                  type="number"
                  min={0}
                  max={255}
                  value={rgb[i]}
                  onChange={(e) => handleRgbChange(i, e.target.value)}
                  className="w-12 px-1.5 py-1 text-xs font-mono border border-border rounded bg-white text-text-primary text-center focus:border-accent focus:outline-none"
                />
              ))}
              <button onClick={() => copyText(`rgb(${rgb.join(", ")})`)} className="px-1.5 py-1 text-[10px] text-accent hover:bg-accent/10 rounded transition-colors">Copy</button>
            </div>

            {/* HSL */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-text-muted w-7">HSL</span>
              {["H", "S", "L"].map((ch, i) => (
                <input
                  key={ch}
                  type="number"
                  min={0}
                  max={i === 0 ? 360 : 100}
                  value={hsl[i]}
                  onChange={(e) => handleHslChange(i, e.target.value)}
                  className="w-12 px-1.5 py-1 text-xs font-mono border border-border rounded bg-white text-text-primary text-center focus:border-accent focus:outline-none"
                />
              ))}
              <button onClick={() => copyText(`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`)} className="px-1.5 py-1 text-[10px] text-accent hover:bg-accent/10 rounded transition-colors">Copy</button>
            </div>

            {/* CSS var */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-text-muted w-7">CSS</span>
              <code className="flex-1 text-xs font-mono text-text-secondary truncate">--color: {hex};</code>
              <button onClick={() => copyText(`--color: ${hex};`)} className="px-1.5 py-1 text-[10px] text-accent hover:bg-accent/10 rounded transition-colors">Copy</button>
            </div>

            {opacity < 100 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-text-muted w-7">RGBA</span>
                <code className="flex-1 text-xs font-mono text-text-secondary truncate">rgba({rgb.join(", ")}, {(opacity / 100).toFixed(2)})</code>
                <button onClick={() => copyText(`rgba(${rgb.join(", ")}, ${(opacity / 100).toFixed(2)})`)} className="px-1.5 py-1 text-[10px] text-accent hover:bg-accent/10 rounded transition-colors">Copy</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent colours */}
      {recentColors.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Recent:</span>
          <div className="flex gap-1.5">
            {recentColors.map((c, i) => (
              <button
                key={i}
                onClick={() => setFromRecent(c)}
                className="w-6 h-6 rounded-full border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
