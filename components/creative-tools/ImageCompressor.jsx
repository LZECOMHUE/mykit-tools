"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function ImageCompressor() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const compressedBlobRef = useRef(null);
  const debounceRef = useRef(null);

  const [image, setImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState("jpg");
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const prevPreviewRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => setImage(img);
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => setImage(img);
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  // Draw image and compress
  const compress = useCallback(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const mimeType = format === "webp" ? "image/webp" : "image/jpeg";
    canvas.toBlob(
      (blob) => {
        if (blob) {
          setCompressedSize(blob.size);
          compressedBlobRef.current = blob;
          if (prevPreviewRef.current) URL.revokeObjectURL(prevPreviewRef.current);
          const url = URL.createObjectURL(blob);
          prevPreviewRef.current = url;
          setPreviewUrl(url);
        }
      },
      mimeType,
      quality / 100
    );
  }, [image, quality, format]);

  // Debounced compression on quality/format change
  useEffect(() => {
    if (!image) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(compress, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [image, quality, format, compress]);

  const download = () => {
    if (!compressedBlobRef.current) return;
    const ext = format === "webp" ? "webp" : "jpg";
    const url = URL.createObjectURL(compressedBlobRef.current);
    const link = document.createElement("a");
    link.href = url;
    link.download = `compressed-q${quality}.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setQuality(80);
    setFormat("jpg");
    compressedBlobRef.current = null;
  };

  const reductionPercent =
    originalSize > 0 && compressedSize > 0
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0;

  const reductionColor =
    reductionPercent >= 50
      ? "text-green-600"
      : reductionPercent >= 20
      ? "text-green-500"
      : reductionPercent > 0
      ? "text-amber-500"
      : "text-red-500";

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
          {/* Size comparison bar */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Original</span>
              <span className="font-mono text-text-primary">{formatBytes(originalSize)}</span>
            </div>

            {/* Visual bar */}
            <div className="relative h-6 bg-surface rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-accent/20 rounded-full"
                style={{ width: "100%" }}
              />
              <div
                className="absolute inset-y-0 left-0 bg-accent rounded-full transition-all duration-300"
                style={{
                  width:
                    originalSize > 0
                      ? `${Math.max(5, (compressedSize / originalSize) * 100)}%`
                      : "0%",
                }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Compressed</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-text-primary">{formatBytes(compressedSize)}</span>
                {reductionPercent > 0 && (
                  <span className={`font-mono text-xs font-medium ${reductionColor}`}>
                    -{reductionPercent}%
                  </span>
                )}
                {reductionPercent < 0 && (
                  <span className="font-mono text-xs font-medium text-red-500">
                    +{Math.abs(reductionPercent)}%
                  </span>
                )}
              </div>
            </div>
          </Card>

          {/* Controls */}
          <Card className="space-y-3">
            {/* Format pills */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-text-primary">Format</span>
              <div className="flex rounded-full overflow-hidden border border-border">
                {["jpg", "webp"].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setFormat(fmt)}
                    className={`px-3 py-1.5 text-xs font-medium uppercase transition-colors ${
                      format === fmt
                        ? "bg-accent text-white"
                        : "bg-white text-text-secondary hover:bg-surface"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality slider */}
            <Slider
              label="Quality"
              value={quality}
              onChange={setQuality}
              min={1}
              max={100}
              step={1}
              showValue
              formatValue={(v) => `${v}%`}
            />

            {/* Quality presets */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "Low", val: 30 },
                { label: "Medium", val: 60 },
                { label: "High", val: 80 },
                { label: "Best", val: 95 },
              ].map(({ label, val }) => (
                <button
                  key={val}
                  onClick={() => setQuality(val)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    quality === val
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {label} ({val}%)
                </button>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={download}>
              Download Compressed
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

          {/* Hidden canvas for compression */}
          <canvas ref={canvasRef} className="hidden" />
          {previewUrl && (
            <Card className="overflow-hidden" padding={false}>
              <img
                src={previewUrl}
                alt="Compressed preview"
                style={{ maxWidth: "100%", height: "auto", display: "block" }}
              />
            </Card>
          )}

          {/* Dimensions info */}
          <p className="text-xs text-text-muted text-center font-mono">
            {image.width} x {image.height}px
          </p>
        </>
      )}
    </div>
  );
}
