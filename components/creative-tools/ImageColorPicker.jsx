"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => {
    const hex = Math.max(0, Math.min(255, x)).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
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

function isLight(r, g, b) {
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
}

export default function ImageColorPicker() {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const magnifierRef = useRef(null);
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [picked, setPicked] = useState(null);
  const [recentPicks, setRecentPicks] = useState([]);
  const [copied, setCopied] = useState(null);
  const [mousePos, setMousePos] = useState(null);
  const [magnifierData, setMagnifierData] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        setImage(img);
        setPicked(null);
        setRecentPicks([]);
      };
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        setImage(img);
        setPicked(null);
        setRecentPicks([]);
      };
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  }, [image]);

  const getPixelAt = useCallback((clientX, clientY) => {
    if (!canvasRef.current) return null;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((clientX - rect.left) * scaleX);
    const y = Math.floor((clientY - rect.top) * scaleY);
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return null;
    const ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return { r: pixel[0], g: pixel[1], b: pixel[2], a: pixel[3], x, y };
  }, []);

  const handleCanvasClick = (e) => {
    const pixel = getPixelAt(e.clientX, e.clientY);
    if (!pixel) return;
    const hex = rgbToHex(pixel.r, pixel.g, pixel.b);
    const hsl = rgbToHsl(pixel.r, pixel.g, pixel.b);
    const colour = { hex, r: pixel.r, g: pixel.g, b: pixel.b, hsl };
    setPicked(colour);
    setRecentPicks((prev) => {
      const next = [colour, ...prev.filter((c) => c.hex !== hex)];
      return next.slice(0, 10);
    });
  };

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    setMousePos({ x: relX, y: relY });

    // Build magnifier data
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const sx = Math.floor(relX * scaleX);
    const sy = Math.floor(relY * scaleY);
    const ctx = canvas.getContext("2d");
    const size = 10; // pixels to sample around cursor
    const half = Math.floor(size / 2);
    const startX = Math.max(0, sx - half);
    const startY = Math.max(0, sy - half);
    const endX = Math.min(canvas.width, startX + size);
    const endY = Math.min(canvas.height, startY + size);
    if (endX <= startX || endY <= startY) return;
    const data = ctx.getImageData(startX, startY, endX - startX, endY - startY);
    setMagnifierData({ data, x: relX, y: relY, w: endX - startX, h: endY - startY });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setMagnifierData(null);
  };

  // Draw magnifier
  useEffect(() => {
    if (!magnifierData || !magnifierRef.current) return;
    const mag = magnifierRef.current;
    const ctx = mag.getContext("2d");
    const zoom = 8;
    mag.width = magnifierData.w * zoom;
    mag.height = magnifierData.h * zoom;
    const { data } = magnifierData;
    for (let y = 0; y < data.height; y++) {
      for (let x = 0; x < data.width; x++) {
        const i = (y * data.width + x) * 4;
        ctx.fillStyle = `rgba(${data.data[i]},${data.data[i+1]},${data.data[i+2]},${data.data[i+3]/255})`;
        ctx.fillRect(x * zoom, y * zoom, zoom, zoom);
      }
    }
  }, [magnifierData]);

  const copyValue = (val, label) => {
    navigator.clipboard.writeText(val).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(null), 1200);
  };

  const selectRecent = (colour) => setPicked(colour);

  if (!image) {
    return (
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
          dragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
        }`}
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        <div className="text-4xl mb-3">+</div>
        <p className="text-text-secondary text-sm">Drop an image or click to upload</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4">
        {/* Image canvas */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-[#f0f0f0]">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="max-w-full max-h-[420px] object-contain cursor-crosshair block mx-auto"
          />
          {/* Magnifier overlay */}
          {magnifierData && mousePos && (
            <div
              className="absolute pointer-events-none border-2 border-white rounded-full overflow-hidden shadow-lg"
              style={{
                width: 80,
                height: 80,
                left: mousePos.x + 20,
                top: mousePos.y - 90,
              }}
            >
              <canvas ref={magnifierRef} className="w-full h-full" style={{ imageRendering: "pixelated" }} />
            </div>
          )}
        </div>

        {/* Colour info panel */}
        <div className="space-y-3">
          {picked ? (
            <>
              <div
                className="w-full h-24 rounded-xl border border-border"
                style={{ backgroundColor: picked.hex }}
              />
              {[
                { label: "HEX", value: picked.hex },
                { label: "RGB", value: `rgb(${picked.r}, ${picked.g}, ${picked.b})` },
                { label: "HSL", value: `hsl(${picked.hsl.h}, ${picked.hsl.s}%, ${picked.hsl.l}%)` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xs text-text-muted w-8">{label}</span>
                  <code className="font-mono text-sm text-text-primary flex-1">{value}</code>
                  <button
                    onClick={() => copyValue(value, label)}
                    className="text-xs px-2 py-1 rounded bg-surface hover:bg-surface-hover text-text-secondary transition-colors"
                  >
                    {copied === label ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))}
            </>
          ) : (
            <p className="text-sm text-text-muted py-4 text-center">Click on the image to pick a colour</p>
          )}

          {/* Recent picks */}
          {recentPicks.length > 0 && (
            <div>
              <p className="text-xs text-text-muted mb-2">Recent picks</p>
              <div className="flex flex-wrap gap-1.5">
                {recentPicks.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => selectRecent(c)}
                    title={c.hex}
                    className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                      picked?.hex === c.hex ? "border-accent" : "border-border"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
            Replace image
          </Button>
        </div>
      </div>
    </div>
  );
}
