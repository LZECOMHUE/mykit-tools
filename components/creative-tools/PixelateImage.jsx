"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

export default function PixelateImage() {
  const canvasRef = useRef(null);
  const originalCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  const [image, setImage] = useState(null);
  const [blockSize, setBlockSize] = useState(8);
  const [showOriginal, setShowOriginal] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("png");
  const [fileDragging, setFileDragging] = useState(false);

  // Region selection
  const [mode, setMode] = useState("full"); // "full" or "region"
  const [region, setRegion] = useState(null); // { x, y, w, h } in image coords
  const [isDrawing, setIsDrawing] = useState(false);
  const drawStart = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => { setImage(img); setRegion(null); };
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFileDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => { setImage(img); setRegion(null); };
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setFileDragging(true); };
  const handleDragLeave = () => setFileDragging(false);

  // Get scale from displayed canvas to actual image dimensions
  const getScale = useCallback(() => {
    if (!containerRef.current || !image) return 1;
    const displayWidth = containerRef.current.getBoundingClientRect().width;
    return image.width / displayWidth;
  }, [image]);

  // Convert mouse event to image coordinates
  const toImageCoords = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const scale = getScale();
    return {
      x: Math.round((e.clientX - rect.left) * scale),
      y: Math.round((e.clientY - rect.top) * scale),
    };
  }, [getScale]);

  // Draw original for comparison
  useEffect(() => {
    if (!image || !originalCanvasRef.current) return;
    const canvas = originalCanvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  }, [image]);

  // Main pixelation render
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;

    if (mode === "full") {
      // Pixelate entire image
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      const w = Math.ceil(canvas.width / blockSize);
      const h = Math.ceil(canvas.height / blockSize);
      offscreen.width = w;
      offscreen.height = h;
      offCtx.imageSmoothingEnabled = false;
      offCtx.drawImage(image, 0, 0, w, h);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
    } else {
      // Draw sharp image first
      ctx.drawImage(image, 0, 0);

      // Then pixelate only the selected region
      if (region && region.w > 0 && region.h > 0) {
        const rx = Math.max(0, region.x);
        const ry = Math.max(0, region.y);
        const rw = Math.min(region.w, image.width - rx);
        const rh = Math.min(region.h, image.height - ry);

        // Extract region, scale down, scale back up
        const offscreen = document.createElement("canvas");
        const offCtx = offscreen.getContext("2d");
        const sw = Math.max(1, Math.ceil(rw / blockSize));
        const sh = Math.max(1, Math.ceil(rh / blockSize));
        offscreen.width = sw;
        offscreen.height = sh;
        offCtx.imageSmoothingEnabled = false;
        offCtx.drawImage(image, rx, ry, rw, rh, 0, 0, sw, sh);

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreen, 0, 0, sw, sh, rx, ry, rw, rh);

        // Draw selection border (dashed)
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 2;
        ctx.strokeRect(rx, ry, rw, rh);
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.lineWidth = 1;
        ctx.strokeRect(rx, ry, rw, rh);
        ctx.setLineDash([]);
      }
    }
  }, [image, blockSize, mode, region]);

  // Mouse handlers for region selection
  const handleMouseDown = (e) => {
    if (mode !== "region" || !image) return;
    e.preventDefault();
    const coords = toImageCoords(e);
    drawStart.current = coords;
    setIsDrawing(true);
    setRegion({ x: coords.x, y: coords.y, w: 0, h: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !drawStart.current) return;
    e.preventDefault();
    const coords = toImageCoords(e);
    const x = Math.min(drawStart.current.x, coords.x);
    const y = Math.min(drawStart.current.y, coords.y);
    const w = Math.abs(coords.x - drawStart.current.x);
    const h = Math.abs(coords.y - drawStart.current.y);
    setRegion({ x, y, w, h });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    drawStart.current = null;
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    if (mode !== "region" || !image) return;
    const touch = e.touches[0];
    const coords = toImageCoords(touch);
    drawStart.current = coords;
    setIsDrawing(true);
    setRegion({ x: coords.x, y: coords.y, w: 0, h: 0 });
  };

  const handleTouchMove = (e) => {
    if (!isDrawing || !drawStart.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const coords = toImageCoords(touch);
    const x = Math.min(drawStart.current.x, coords.x);
    const y = Math.min(drawStart.current.y, coords.y);
    const w = Math.abs(coords.x - drawStart.current.x);
    const h = Math.abs(coords.y - drawStart.current.y);
    setRegion({ x, y, w, h });
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    drawStart.current = null;
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mimeType = downloadFormat === "jpg" ? "image/jpeg" : "image/png";
    const link = document.createElement("a");
    link.download = `pixelated-image.${downloadFormat === "jpg" ? "jpg" : "png"}`;
    link.href = canvas.toDataURL(mimeType, 0.92);
    link.click();
  };

  const reset = () => {
    setImage(null);
    setBlockSize(8);
    setShowOriginal(false);
    setMode("full");
    setRegion(null);
  };

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
            fileDragging
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
          {/* Controls */}
          <Card className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-medium text-text-primary text-sm">Pixel Block Size</h3>
              <span className="text-xs text-text-muted font-mono">
                {image.width} x {image.height}px
              </span>
            </div>

            <Slider
              value={blockSize}
              onChange={setBlockSize}
              min={2}
              max={50}
              step={1}
              showValue
              formatValue={(v) => `${v}px`}
            />

            {/* Quick presets */}
            <div className="flex flex-wrap gap-1.5">
              {[2, 4, 8, 12, 16, 24, 32, 48].map((size) => (
                <button
                  key={size}
                  onClick={() => setBlockSize(size)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    blockSize === size
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {size}px
                </button>
              ))}
            </div>

            {/* Mode toggle */}
            <div className="flex items-center gap-2 pt-1 border-t border-border">
              <span className="text-xs text-text-muted">Mode:</span>
              <div className="flex rounded-full overflow-hidden border border-border">
                <button
                  onClick={() => { setMode("full"); setRegion(null); }}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    mode === "full" ? "bg-accent text-white" : "bg-white text-text-secondary hover:bg-surface"
                  }`}
                >
                  Full Image
                </button>
                <button
                  onClick={() => setMode("region")}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    mode === "region" ? "bg-accent text-white" : "bg-white text-text-secondary hover:bg-surface"
                  }`}
                >
                  Select Region
                </button>
              </div>
              {mode === "region" && region && region.w > 0 && (
                <span className="text-xs text-text-muted font-mono ml-auto">
                  {region.w} x {region.h}px
                </span>
              )}
            </div>
            {mode === "region" && !region?.w && (
              <p className="text-xs text-accent">Click and drag on the image to select the area to pixelate</p>
            )}
          </Card>

          {/* View toggle + actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-full overflow-hidden border border-border">
              <button
                onClick={() => setShowOriginal(false)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  !showOriginal ? "bg-accent text-white" : "bg-white text-text-secondary hover:bg-surface"
                }`}
              >
                Pixelated
              </button>
              <button
                onClick={() => setShowOriginal(true)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  showOriginal ? "bg-accent text-white" : "bg-white text-text-secondary hover:bg-surface"
                }`}
              >
                Original
              </button>
            </div>

            <div className="flex rounded-full overflow-hidden border border-border ml-auto">
              {["png", "jpg"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setDownloadFormat(fmt)}
                  className={`px-3 py-1.5 text-xs font-medium uppercase transition-colors ${
                    downloadFormat === fmt
                      ? "bg-accent text-white"
                      : "bg-white text-text-secondary hover:bg-surface"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            <Button size="sm" onClick={download}>
              Download
            </Button>
            <Button variant="ghost" size="sm" onClick={reset}>
              Reset
            </Button>
          </div>

          {/* Canvas preview */}
          <Card padding={false} className="overflow-hidden">
            <div
              ref={containerRef}
              className="relative"
              style={{ cursor: mode === "region" ? "crosshair" : "default" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <canvas
                ref={canvasRef}
                className={`w-full h-auto ${showOriginal ? "hidden" : "block"}`}
              />
              <canvas
                ref={originalCanvasRef}
                className={`w-full h-auto ${showOriginal ? "block" : "hidden"}`}
              />
            </div>
          </Card>

          {/* Change image */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-sm text-text-muted hover:text-accent transition-colors"
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
        </>
      )}
    </div>
  );
}
