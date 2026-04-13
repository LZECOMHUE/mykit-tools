"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

const PRESETS = [
  { label: "-50%", value: -50 },
  { label: "-25%", value: -25 },
  { label: "Original", value: 0 },
  { label: "+25%", value: 25 },
  { label: "+50%", value: 50 },
];

const FORMAT_OPTIONS = [
  { label: "PNG", value: "image/png", ext: "png" },
  { label: "JPG", value: "image/jpeg", ext: "jpg" },
];

export default function AdjustImageBrightness() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [brightness, setBrightness] = useState(0);
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
      img.onload = () => {
        setImage(img);
        setBrightness(0);
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

  const drawCanvas = useCallback(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");

    const filterValue = showOriginal ? 1 : (100 + brightness) / 100;

    // Use offscreen canvas to bake the filter into pixel data
    const offscreen = document.createElement("canvas");
    offscreen.width = image.width;
    offscreen.height = image.height;
    const offCtx = offscreen.getContext("2d");
    offCtx.filter = `brightness(${filterValue})`;
    offCtx.drawImage(image, 0, 0);

    ctx.drawImage(offscreen, 0, 0);
  }, [image, brightness, showOriginal]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleDownload = () => {
    if (!image || !canvasRef.current) return;
    const ext = FORMAT_OPTIONS.find((f) => f.value === format)?.ext || "png";
    const quality = format === "image/jpeg" ? 0.92 : undefined;

    // Re-draw with filter baked in (not showing original)
    const offscreen = document.createElement("canvas");
    offscreen.width = image.width;
    offscreen.height = image.height;
    const offCtx = offscreen.getContext("2d");

    if (format === "image/jpeg") {
      offCtx.fillStyle = "#ffffff";
      offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
    }

    offCtx.filter = `brightness(${(100 + brightness) / 100})`;
    offCtx.drawImage(image, 0, 0);

    const link = document.createElement("a");
    link.download = `${fileName || "image"}-brightness.${ext}`;
    link.href = offscreen.toDataURL(format, quality);
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
          <div className="text-3xl mb-3">☀</div>
          <p className="font-medium text-text-primary mb-1">
            Drop an image here or click to upload
          </p>
          <p className="text-sm text-text-muted">
            PNG, JPG, WebP, or any image format
          </p>
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
          {/* Controls */}
          <Card>
            <div className="space-y-4">
              <Slider
                label="Brightness"
                value={brightness}
                onChange={setBrightness}
                min={-100}
                max={100}
                step={1}
                formatValue={(v) => `${v > 0 ? "+" : ""}${v}%`}
              />

              <div>
                <p className="text-sm font-medium text-text-primary mb-2">
                  Quick Presets
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => setBrightness(p.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        brightness === p.value
                          ? "bg-accent text-white"
                          : "bg-surface text-text-secondary hover:bg-surface-hover"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
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

            <Button
              variant="ghost"
              onClick={() => {
                setImage(null);
                setBrightness(0);
                setFileName("");
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
