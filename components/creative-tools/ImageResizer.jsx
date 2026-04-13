"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const SOCIAL_PRESETS = [
  { label: "Instagram Post", w: 1080, h: 1080 },
  { label: "Instagram Story", w: 1080, h: 1920 },
  { label: "Twitter Post", w: 1200, h: 675 },
  { label: "Facebook Cover", w: 820, h: 312 },
  { label: "YouTube Thumb", w: 1280, h: 720 },
];

const SCALE_PRESETS = [25, 50, 75, 150, 200];

export default function ImageResizer() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [dragging, setDragging] = useState(false);

  const aspectRatio = originalWidth / originalHeight || 1;

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
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
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const MAX_DIM = 16384;

  const handleWidthChange = (newW) => {
    const w = Math.min(MAX_DIM, Math.max(1, Math.round(Number(newW) || 0)));
    setWidth(w);
    if (lockAspect) {
      setHeight(Math.min(MAX_DIM, Math.max(1, Math.round(w / aspectRatio))));
    }
  };

  const handleHeightChange = (newH) => {
    const h = Math.min(MAX_DIM, Math.max(1, Math.round(Number(newH) || 0)));
    setHeight(h);
    if (lockAspect) {
      setWidth(Math.max(1, Math.round(h * aspectRatio)));
    }
  };

  const applyScale = (percent) => {
    const w = Math.round(originalWidth * (percent / 100));
    const h = Math.round(originalHeight * (percent / 100));
    setWidth(w);
    setHeight(h);
  };

  const applyPreset = (pw, ph) => {
    setWidth(pw);
    setHeight(ph);
    setLockAspect(false);
  };

  // Draw resized image
  useEffect(() => {
    if (!image || !canvasRef.current || !width || !height) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image, 0, 0, width, height);
  }, [image, width, height]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `resized-${width}x${height}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const reset = () => {
    setImage(null);
    setWidth(0);
    setHeight(0);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setLockAspect(true);
  };

  const scalePercent = originalWidth > 0 ? Math.round((width / originalWidth) * 100) : 100;

  return (
    <div className="space-y-4">
      {/* Upload */}
      {!image && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full px-6 py-12 border-2 border-dashed rounded-[var(--radius-card)] cursor-pointer transition-all text-center ${
            dragging
              ? "border-accent bg-accent/5"
              : "border-border hover:border-accent hover:bg-surface"
          }`}
        >
          <div className="text-3xl mb-3">🖼</div>
          <p className="font-medium text-text-primary mb-1">
            Drop an image here or click to upload
          </p>
          <p className="text-sm text-text-muted">PNG, JPG, WebP, GIF</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      )}

      {image && (
        <>
          {/* Dimension info */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-text-primary text-sm">Dimensions</h3>
              <span className="text-xs text-text-muted font-mono">
                Original: {originalWidth} x {originalHeight}
              </span>
            </div>

            {/* Width / Height inputs with lock */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-xs text-text-muted mb-1 block">Width</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  min={1}
                  className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] font-mono text-sm bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>

              {/* Lock toggle */}
              <button
                onClick={() => setLockAspect(!lockAspect)}
                className={`mt-5 w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${
                  lockAspect
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-text-muted hover:border-border-hover"
                }`}
                title={lockAspect ? "Aspect ratio locked" : "Aspect ratio unlocked"}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {lockAspect ? (
                    <>
                      <rect x="3" y="7" width="10" height="7" rx="1.5" />
                      <path d="M5 7V5a3 3 0 0 1 6 0v2" />
                    </>
                  ) : (
                    <>
                      <rect x="3" y="7" width="10" height="7" rx="1.5" />
                      <path d="M5 7V5a3 3 0 0 1 6 0" />
                    </>
                  )}
                </svg>
              </button>

              <div className="flex-1">
                <label className="text-xs text-text-muted mb-1 block">Height</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  min={1}
                  className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] font-mono text-sm bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            {/* Scale indicator */}
            <p className="text-xs text-text-muted font-mono text-center">
              {scalePercent}% of original
            </p>
            {/* Scale presets */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-text-secondary">Scale:</span>
              {SCALE_PRESETS.map((pct) => (
                <button
                  key={pct}
                  onClick={() => applyScale(pct)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    scalePercent === pct
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>

            {/* Social media presets */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-text-secondary">Presets:</span>
              {SOCIAL_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset.w, preset.h)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    width === preset.w && height === preset.h
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {preset.label}
                  <span className="ml-1 opacity-60">{preset.w}x{preset.h}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={download}>
              Download PNG
            </Button>
            <Button variant="ghost" size="sm" onClick={reset}>
              Reset
            </Button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-text-muted hover:text-accent transition-colors ml-auto"
            >
              Change image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </div>

          {/* Canvas preview */}
          <Card padding={false} className="overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-auto" />
          </Card>

          {/* New dimensions summary */}
          <p className="text-xs text-text-muted text-center font-mono">
            Output: {width} x {height}px
          </p>
        </>
      )}
    </div>
  );
}
