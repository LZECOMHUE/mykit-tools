"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

const PRESETS = [
  { label: "Lo-fi", pixelate: 4, blur: 2, noise: 15, jpegQ: 20, posterize: 8 },
  { label: "VHS", pixelate: 2, blur: 1, noise: 30, jpegQ: 35, posterize: 12 },
  { label: "Deep Fried", pixelate: 3, blur: 0, noise: 40, jpegQ: 5, posterize: 6 },
  { label: "Vintage", pixelate: 0, blur: 1, noise: 10, jpegQ: 30, posterize: 10 },
  { label: "Glitch", pixelate: 6, blur: 0, noise: 50, jpegQ: 8, posterize: 4 },
];

const DEFAULT_FX = { pixelate: 0, blur: 0, noise: 0, jpegQ: 0, posterize: 0 };

export default function ReduceImageQuality() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showOriginal, setShowOriginal] = useState(false);
  const [activePreset, setActivePreset] = useState(null);

  // Effect toggles and values
  const [fx, setFx] = useState({ ...DEFAULT_FX });
  const [enabled, setEnabled] = useState({
    pixelate: false, blur: false, noise: false, jpegQ: false, posterize: false,
  });

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

  const updateFx = (key, val) => {
    setFx((p) => ({ ...p, [key]: val }));
    setActivePreset(null);
  };

  const toggleEffect = (key) => {
    setEnabled((p) => ({ ...p, [key]: !p[key] }));
    setActivePreset(null);
  };

  const applyPreset = (preset) => {
    setFx({ pixelate: preset.pixelate, blur: preset.blur, noise: preset.noise, jpegQ: preset.jpegQ, posterize: preset.posterize });
    setEnabled({ pixelate: preset.pixelate > 0, blur: preset.blur > 0, noise: preset.noise > 0, jpegQ: preset.jpegQ > 0, posterize: preset.posterize > 0 });
    setActivePreset(preset.label);
  };

  // Render pipeline
  const render = useCallback(async () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const w = image.width;
    const h = image.height;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    if (showOriginal) {
      ctx.drawImage(image, 0, 0);
      return;
    }

    // Start with original
    let src = document.createElement("canvas");
    src.width = w; src.height = h;
    const srcCtx = src.getContext("2d");
    srcCtx.drawImage(image, 0, 0);

    // 1. Pixelation
    if (enabled.pixelate && fx.pixelate > 1) {
      const bs = fx.pixelate;
      const small = document.createElement("canvas");
      const sw = Math.max(1, Math.ceil(w / bs));
      const sh = Math.max(1, Math.ceil(h / bs));
      small.width = sw; small.height = sh;
      const sCtx = small.getContext("2d");
      sCtx.imageSmoothingEnabled = false;
      sCtx.drawImage(src, 0, 0, sw, sh);
      srcCtx.imageSmoothingEnabled = false;
      srcCtx.drawImage(small, 0, 0, w, h);
    }

    // 2. Blur
    if (enabled.blur && fx.blur > 0) {
      const tmp = document.createElement("canvas");
      tmp.width = w; tmp.height = h;
      const tCtx = tmp.getContext("2d");
      tCtx.filter = `blur(${fx.blur}px)`;
      tCtx.drawImage(src, 0, 0);
      srcCtx.clearRect(0, 0, w, h);
      srcCtx.drawImage(tmp, 0, 0);
    }

    // 3. Posterize (colour reduction)
    if (enabled.posterize && fx.posterize < 16) {
      const imgData = srcCtx.getImageData(0, 0, w, h);
      const d = imgData.data;
      const levels = fx.posterize;
      const step = 255 / (levels - 1);
      for (let i = 0; i < d.length; i += 4) {
        d[i] = Math.round(Math.round(d[i] / step) * step);
        d[i + 1] = Math.round(Math.round(d[i + 1] / step) * step);
        d[i + 2] = Math.round(Math.round(d[i + 2] / step) * step);
      }
      srcCtx.putImageData(imgData, 0, 0);
    }

    // 4. Noise
    if (enabled.noise && fx.noise > 0) {
      const imgData = srcCtx.getImageData(0, 0, w, h);
      const d = imgData.data;
      const amount = fx.noise * 2.55; // scale 0-50 to 0-127.5
      for (let i = 0; i < d.length; i += 4) {
        const n = (Math.random() - 0.5) * amount * 2;
        d[i] = Math.max(0, Math.min(255, d[i] + n));
        d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
        d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
      }
      srcCtx.putImageData(imgData, 0, 0);
    }

    // 5. JPEG artifacts
    if (enabled.jpegQ && fx.jpegQ > 0) {
      const quality = fx.jpegQ / 100;
      const blob = await new Promise((resolve) => src.toBlob(resolve, "image/jpeg", quality));
      const url = URL.createObjectURL(blob);
      const jpegImg = new window.Image();
      await new Promise((resolve) => {
        jpegImg.onload = resolve;
        jpegImg.src = url;
      });
      srcCtx.clearRect(0, 0, w, h);
      srcCtx.drawImage(jpegImg, 0, 0);
      URL.revokeObjectURL(url);
    }

    ctx.drawImage(src, 0, 0);
  }, [image, fx, enabled, showOriginal]);

  useEffect(() => { render(); }, [render]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${fileName || "image"}-degraded.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const effects = [
    { key: "pixelate", label: "Pixelation", min: 2, max: 20, step: 1, fmt: (v) => `${v}px` },
    { key: "blur", label: "Blur", min: 1, max: 10, step: 0.5, fmt: (v) => `${v}px` },
    { key: "noise", label: "Noise", min: 1, max: 50, step: 1, fmt: (v) => `${v}%` },
    { key: "jpegQ", label: "JPEG Artifacts", min: 5, max: 50, step: 1, fmt: (v) => `Q${v}` },
    { key: "posterize", label: "Colour Reduce", min: 2, max: 16, step: 1, fmt: (v) => `${v} levels` },
  ];

  return (
    <div className="space-y-4">
      {!image && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full px-6 py-12 border-2 border-dashed border-border rounded-[var(--radius-card)] cursor-pointer hover:border-accent hover:bg-surface transition-all text-center"
        >
          <div className="text-3xl mb-3">📉</div>
          <p className="font-medium text-text-primary mb-1">Drop an image here or click to upload</p>
          <p className="text-sm text-text-muted">PNG, JPG, WebP</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      )}

      {image && (
        <>
          {/* Presets */}
          <div className="flex flex-wrap gap-1.5">
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
            <button
              onClick={() => {
                setFx({ ...DEFAULT_FX });
                setEnabled({ pixelate: false, blur: false, noise: false, jpegQ: false, posterize: false });
                setActivePreset(null);
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-muted hover:bg-surface-hover transition-all"
            >
              Reset All
            </button>
          </div>

          {/* Effect toggles with sliders */}
          <Card className="space-y-3">
            {effects.map((ef) => (
              <div key={ef.key}>
                <button
                  onClick={() => toggleEffect(ef.key)}
                  className={`flex items-center gap-2 w-full text-left text-sm font-medium transition-colors ${
                    enabled[ef.key] ? "text-accent" : "text-text-secondary"
                  }`}
                >
                  <span className={`w-4 h-4 rounded border-2 flex items-center justify-center text-[10px] transition-all ${
                    enabled[ef.key] ? "border-accent bg-accent text-white" : "border-border"
                  }`}>
                    {enabled[ef.key] ? "✓" : ""}
                  </span>
                  {ef.label}
                </button>
                {enabled[ef.key] && (
                  <div className="mt-1.5 ml-6">
                    <Slider
                      value={fx[ef.key]}
                      onChange={(v) => updateFx(ef.key, v)}
                      min={ef.min}
                      max={ef.max}
                      step={ef.step}
                      formatValue={ef.fmt}
                    />
                  </div>
                )}
              </div>
            ))}
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
            <Button variant="ghost" onClick={() => { setImage(null); setFileName(""); setFx({ ...DEFAULT_FX }); setEnabled({ pixelate: false, blur: false, noise: false, jpegQ: false, posterize: false }); setActivePreset(null); }}>
              New Image
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
