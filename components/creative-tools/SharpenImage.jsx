"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

const PRESETS = [
  { label: "Subtle", value: 25 },
  { label: "Medium", value: 50 },
  { label: "Strong", value: 80 },
];

const FORMAT_OPTIONS = [
  { label: "PNG", value: "image/png", ext: "png" },
  { label: "JPG", value: "image/jpeg", ext: "jpg" },
];

export default function SharpenImage() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [strength, setStrength] = useState(50);
  const [showOriginal, setShowOriginal] = useState(false);
  const [format, setFormat] = useState("image/png");
  const [fileName, setFileName] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => { setImage(img); setStrength(50); };
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

  // Unsharp mask: sharp = original + strength * (original - blurred)
  const applySharpen = useCallback(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const w = image.width;
    const h = image.height;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    if (showOriginal || strength === 0) {
      ctx.drawImage(image, 0, 0);
      return;
    }

    // Get original pixel data
    const origCanvas = document.createElement("canvas");
    origCanvas.width = w; origCanvas.height = h;
    const origCtx = origCanvas.getContext("2d");
    origCtx.drawImage(image, 0, 0);
    const origData = origCtx.getImageData(0, 0, w, h);

    // Get blurred version
    const blurCanvas = document.createElement("canvas");
    blurCanvas.width = w; blurCanvas.height = h;
    const blurCtx = blurCanvas.getContext("2d");
    const blurRadius = 1 + (strength / 100) * 2; // 1-3px blur radius
    blurCtx.filter = `blur(${blurRadius}px)`;
    blurCtx.drawImage(image, 0, 0);
    const blurData = blurCtx.getImageData(0, 0, w, h);

    // Apply unsharp mask
    const output = ctx.createImageData(w, h);
    const od = origData.data;
    const bd = blurData.data;
    const out = output.data;
    const amount = strength / 50; // 0-2 multiplier

    for (let i = 0; i < od.length; i += 4) {
      out[i] = Math.max(0, Math.min(255, od[i] + amount * (od[i] - bd[i])));
      out[i + 1] = Math.max(0, Math.min(255, od[i + 1] + amount * (od[i + 1] - bd[i + 1])));
      out[i + 2] = Math.max(0, Math.min(255, od[i + 2] + amount * (od[i + 2] - bd[i + 2])));
      out[i + 3] = od[i + 3]; // preserve alpha
    }

    ctx.putImageData(output, 0, 0);
  }, [image, strength, showOriginal]);

  useEffect(() => { applySharpen(); }, [applySharpen]);

  const handleDownload = () => {
    if (!image) return;
    const ext = FORMAT_OPTIONS.find((f) => f.value === format)?.ext || "png";
    const quality = format === "image/jpeg" ? 0.92 : undefined;

    // Re-render for download (ensure not showing original)
    const w = image.width, h = image.height;
    const dlCanvas = document.createElement("canvas");
    dlCanvas.width = w; dlCanvas.height = h;
    const dlCtx = dlCanvas.getContext("2d");

    if (format === "image/jpeg") {
      dlCtx.fillStyle = "#ffffff";
      dlCtx.fillRect(0, 0, w, h);
    }

    if (strength === 0) {
      dlCtx.drawImage(image, 0, 0);
    } else {
      // Get original
      const origCanvas = document.createElement("canvas");
      origCanvas.width = w; origCanvas.height = h;
      const origCtx = origCanvas.getContext("2d");
      origCtx.drawImage(image, 0, 0);
      const origData = origCtx.getImageData(0, 0, w, h);

      // Get blurred
      const blurCanvas = document.createElement("canvas");
      blurCanvas.width = w; blurCanvas.height = h;
      const blurCtx = blurCanvas.getContext("2d");
      blurCtx.filter = `blur(${1 + (strength / 100) * 2}px)`;
      blurCtx.drawImage(image, 0, 0);
      const blurData = blurCtx.getImageData(0, 0, w, h);

      const output = dlCtx.createImageData(w, h);
      const od = origData.data, bd = blurData.data, out = output.data;
      const amount = strength / 50;
      for (let i = 0; i < od.length; i += 4) {
        out[i] = Math.max(0, Math.min(255, od[i] + amount * (od[i] - bd[i])));
        out[i + 1] = Math.max(0, Math.min(255, od[i + 1] + amount * (od[i + 1] - bd[i + 1])));
        out[i + 2] = Math.max(0, Math.min(255, od[i + 2] + amount * (od[i + 2] - bd[i + 2])));
        out[i + 3] = od[i + 3];
      }
      dlCtx.putImageData(output, 0, 0);
    }

    const link = document.createElement("a");
    link.download = `${fileName || "image"}-sharpened.${ext}`;
    link.href = dlCanvas.toDataURL(format, quality);
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
          <div className="text-3xl mb-3">🔍</div>
          <p className="font-medium text-text-primary mb-1">Drop an image here or click to upload</p>
          <p className="text-sm text-text-muted">PNG, JPG, WebP, or any image format</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      )}

      {image && (
        <>
          {/* Controls */}
          <Card className="space-y-3">
            <Slider
              label="Sharpen Strength"
              value={strength}
              onChange={setStrength}
              min={0}
              max={100}
              step={1}
              formatValue={(v) => `${v}%`}
            />
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setStrength(p.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    strength === p.value
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Preview */}
          <Card padding={false}>
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="max-w-full rounded-[var(--radius-card)]"
                style={{ display: "block", width: "100%", height: "auto" }}
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
            <div className="flex gap-1.5">
              {FORMAT_OPTIONS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFormat(f.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    format === f.value
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <Button onClick={handleDownload}>
              Download {FORMAT_OPTIONS.find((f) => f.value === format)?.ext.toUpperCase()}
            </Button>

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

            <Button variant="ghost" onClick={() => { setImage(null); setStrength(50); setFileName(""); }}>
              New Image
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
