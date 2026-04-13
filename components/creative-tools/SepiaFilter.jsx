"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

const PRESETS = [
  { label: "Light Vintage", sepia: 30, warmth: 0, grain: false, vignette: false },
  { label: "Classic", sepia: 60, warmth: 10, grain: false, vignette: false },
  { label: "Full Sepia", sepia: 100, warmth: 0, grain: false, vignette: false },
  { label: "Aged Photo", sepia: 80, warmth: 15, grain: true, vignette: true },
];

export default function SepiaFilter() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [sepia, setSepia] = useState(70);
  const [warmth, setWarmth] = useState(0);
  const [grain, setGrain] = useState(false);
  const [vignette, setVignette] = useState(false);
  const [outputUrl, setOutputUrl] = useState(null);
  const [activePreset, setActivePreset] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileInfo({ name: file.name, size: file.size, type: file.type });
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        setImage(img);
        setFileInfo((prev) => ({ ...prev, width: img.width, height: img.height }));
      };
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

  const applyFilter = useCallback(() => {
    if (!image) return;
    const canvas = canvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    // Apply sepia
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const s = sepia / 100;
    const w = warmth / 100;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2];

      // Sepia transform
      const tr = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
      const tg = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
      const tb = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);

      let nr = Math.round(r * (1 - s) + tr * s);
      let ng = Math.round(g * (1 - s) + tg * s);
      let nb = Math.round(b * (1 - s) + tb * s);

      // Warmth - push reds up, blues down
      if (w > 0) {
        nr = Math.min(255, nr + Math.round(w * 30));
        ng = Math.min(255, ng + Math.round(w * 10));
        nb = Math.max(0, nb - Math.round(w * 15));
      }

      data[i] = nr;
      data[i + 1] = ng;
      data[i + 2] = nb;
    }

    ctx.putImageData(imageData, 0, 0);

    // Grain overlay
    if (grain) {
      const grainData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const gd = grainData.data;
      for (let i = 0; i < gd.length; i += 4) {
        const noise = (Math.random() - 0.5) * 40;
        gd[i] = Math.min(255, Math.max(0, gd[i] + noise));
        gd[i + 1] = Math.min(255, Math.max(0, gd[i + 1] + noise));
        gd[i + 2] = Math.min(255, Math.max(0, gd[i + 2] + noise));
      }
      ctx.putImageData(grainData, 0, 0);
    }

    // Vignette
    if (vignette) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.max(cx, cy) * 1.2;
      const gradient = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(0.5, "rgba(0,0,0,0.1)");
      gradient.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    setOutputUrl(canvas.toDataURL("image/png"));
  }, [image, sepia, warmth, grain, vignette]);

  useEffect(() => {
    if (image) applyFilter();
  }, [image, sepia, warmth, grain, vignette, applyFilter]);

  const applyPreset = (preset) => {
    setSepia(preset.sepia);
    setWarmth(preset.warmth);
    setGrain(preset.grain);
    setVignette(preset.vignette);
    setActivePreset(preset.label);
  };

  // Clear active preset label when user manually changes a control
  const handleManualChange = (setter, value) => {
    setter(value);
    setActivePreset(null);
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    const baseName = fileInfo?.name?.replace(/\.[^.]+$/, "") || "image";
    a.download = `${baseName}-sepia.png`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="hidden" />

      {!image && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full px-6 py-12 border-2 border-dashed border-border rounded-[var(--radius-card)] cursor-pointer hover:border-accent hover:bg-surface transition-all text-center"
        >
          <div className="text-3xl mb-3">🖼</div>
          <p className="font-medium text-text-primary mb-1">Drop an image here or click to upload</p>
          <p className="text-sm text-text-muted">PNG, JPG, WebP, GIF</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      )}

      {image && (
        <>
          {/* Presets */}
          <Card>
            <p className="text-sm font-medium text-text-primary mb-2">Presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activePreset === p.label
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Controls */}
          <Card>
            <div className="space-y-4">
              <Slider
                label="Sepia Intensity"
                value={sepia}
                onChange={(v) => handleManualChange(setSepia, v)}
                min={0}
                max={100}
                step={1}
                formatValue={(v) => `${v}%`}
              />
              <Slider
                label="Warmth"
                value={warmth}
                onChange={(v) => handleManualChange(setWarmth, v)}
                min={0}
                max={50}
                step={1}
                formatValue={(v) => `${v}%`}
              />

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={grain}
                    onChange={(e) => handleManualChange(setGrain, e.target.checked)}
                    className="w-4 h-4 accent-accent rounded"
                  />
                  <span className="text-sm text-text-primary">Film Grain</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={vignette}
                    onChange={(e) => handleManualChange(setVignette, e.target.checked)}
                    className="w-4 h-4 accent-accent rounded"
                  />
                  <span className="text-sm text-text-primary">Vignette</span>
                </label>
              </div>
            </div>
          </Card>

          {/* Preview */}
          {outputUrl && (
            <Card padding={false}>
              <img src={outputUrl} alt="Sepia preview" className="max-w-full rounded-[var(--radius-card)]" />
            </Card>
          )}

          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="font-mono">{fileInfo?.width} x {fileInfo?.height}px</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleDownload} disabled={!outputUrl}>
              Download
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setImage(null);
                setFileInfo(null);
                setOutputUrl(null);
                setSepia(70);
                setWarmth(0);
                setGrain(false);
                setVignette(false);
                setActivePreset(null);
              }}
            >
              New Image
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
