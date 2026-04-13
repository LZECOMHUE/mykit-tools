"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

const BLEND_MODES = ["overlay", "soft-light", "screen", "multiply", "color"];

const RAINBOW_STYLES = [
  { label: "Standard", colors: ["#ff0000", "#ff8800", "#ffff00", "#00cc00", "#0066ff", "#4400cc", "#8800aa"] },
  { label: "Pastel", colors: ["#ffb3b3", "#ffd9b3", "#ffffb3", "#b3ffb3", "#b3d9ff", "#ccb3ff", "#ffb3e6"] },
  { label: "Neon", colors: ["#ff003c", "#ff6600", "#ffea00", "#00ff66", "#00ccff", "#6600ff", "#ff00cc"] },
];

export default function RainbowFilter() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showOriginal, setShowOriginal] = useState(false);

  const [opacity, setOpacity] = useState(40);
  const [angle, setAngle] = useState(0);
  const [gradientMode, setGradientMode] = useState("linear"); // linear | radial
  const [blendMode, setBlendMode] = useState("overlay");
  const [styleIdx, setStyleIdx] = useState(0);
  const [isCustom, setIsCustom] = useState(false);
  const [customColor1, setCustomColor1] = useState("#ff0000");
  const [customColor2, setCustomColor2] = useState("#0066ff");

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => setImage(img);
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
      handleUpload({ target: { files: dt.files } });
    }
  };

  const render = useCallback(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const w = image.width;
    const h = image.height;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    // Draw original image
    ctx.drawImage(image, 0, 0);

    if (showOriginal) return;

    // Create gradient overlay
    const off = document.createElement("canvas");
    off.width = w; off.height = h;
    const offCtx = off.getContext("2d");

    let gradient;
    if (gradientMode === "linear") {
      // Calculate gradient start/end from angle
      const rad = (angle * Math.PI) / 180;
      const cx = w / 2, cy = h / 2;
      const len = Math.sqrt(w * w + h * h) / 2;
      const x0 = cx - Math.cos(rad) * len;
      const y0 = cy - Math.sin(rad) * len;
      const x1 = cx + Math.cos(rad) * len;
      const y1 = cy + Math.sin(rad) * len;
      gradient = offCtx.createLinearGradient(x0, y0, x1, y1);
    } else {
      gradient = offCtx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 2);
    }

    if (isCustom) {
      gradient.addColorStop(0, customColor1);
      gradient.addColorStop(1, customColor2);
    } else {
      const colors = RAINBOW_STYLES[styleIdx].colors;
      colors.forEach((c, i) => gradient.addColorStop(i / (colors.length - 1), c));
    }

    offCtx.fillStyle = gradient;
    offCtx.fillRect(0, 0, w, h);

    // Apply blend mode and opacity
    ctx.globalCompositeOperation = blendMode;
    ctx.globalAlpha = opacity / 100;
    ctx.drawImage(off, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }, [image, opacity, angle, gradientMode, blendMode, styleIdx, isCustom, customColor1, customColor2, showOriginal]);

  useEffect(() => { render(); }, [render]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${fileName || "image"}-rainbow.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="space-y-4">
      {!image && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full px-6 py-12 border-2 border-dashed border-border rounded-[var(--radius-card)] cursor-pointer hover:border-accent hover:bg-surface transition-all text-center"
        >
          <div className="text-3xl mb-3">🌈</div>
          <p className="font-medium text-text-primary mb-1">Drop an image here or click to upload</p>
          <p className="text-sm text-text-muted">PNG, JPG, WebP</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      )}

      {image && (
        <>
          {/* Controls */}
          <Card className="space-y-3">
            {/* Rainbow style */}
            <div className="flex flex-wrap gap-1.5">
              {RAINBOW_STYLES.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => { setStyleIdx(i); setIsCustom(false); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    !isCustom && styleIdx === i
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {s.label}
                </button>
              ))}
              <button
                onClick={() => setIsCustom(true)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isCustom
                    ? "bg-accent text-white"
                    : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                Custom
              </button>
            </div>

            {/* Custom colour pickers */}
            {isCustom && (
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-text-secondary">
                  From
                  <input
                    type="color"
                    value={customColor1}
                    onChange={(e) => setCustomColor1(e.target.value)}
                    className="w-8 h-8 rounded border border-border cursor-pointer"
                  />
                </label>
                <label className="flex items-center gap-1.5 text-xs text-text-secondary">
                  To
                  <input
                    type="color"
                    value={customColor2}
                    onChange={(e) => setCustomColor2(e.target.value)}
                    className="w-8 h-8 rounded border border-border cursor-pointer"
                  />
                </label>
              </div>
            )}

            {/* Mode */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">Mode:</span>
              {["linear", "radial"].map((m) => (
                <button
                  key={m}
                  onClick={() => setGradientMode(m)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
                    gradientMode === m
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Blend mode */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-text-muted">Blend:</span>
              {BLEND_MODES.map((m) => (
                <button
                  key={m}
                  onClick={() => setBlendMode(m)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
                    blendMode === m
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {m.replace("-", " ")}
                </button>
              ))}
            </div>

            <Slider label="Opacity" value={opacity} onChange={setOpacity} min={10} max={100} step={1} formatValue={(v) => `${v}%`} />

            {gradientMode === "linear" && (
              <Slider label="Angle" value={angle} onChange={setAngle} min={0} max={360} step={1} formatValue={(v) => `${v}\u00B0`} />
            )}
          </Card>

          {/* Preview */}
          <Card padding={false}>
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="w-full h-auto rounded-[var(--radius-card)]"
                style={{ display: "block" }}
              />
              {showOriginal && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                  Original
                </div>
              )}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleDownload}>Download PNG</Button>
            <Button
              variant="secondary"
              onMouseDown={() => setShowOriginal(true)}
              onMouseUp={() => setShowOriginal(false)}
              onMouseLeave={() => setShowOriginal(false)}
              onTouchStart={() => setShowOriginal(true)}
              onTouchEnd={() => setShowOriginal(false)}
            >
              Hold to Compare
            </Button>
            <Button variant="ghost" onClick={() => { setImage(null); setFileName(""); }}>
              New Image
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
