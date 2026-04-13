"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function FlipImage() {
  const canvasRef = useRef(null);
  const originalCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setFlipH(false);
        setFlipV(false);
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
        setFlipH(false);
        setFlipV(false);
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

  // Draw original
  useEffect(() => {
    if (!image || !originalCanvasRef.current) return;
    const canvas = originalCanvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  }, [image]);

  // Draw flipped
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.save();
    const scaleX = flipH ? -1 : 1;
    const scaleY = flipV ? -1 : 1;
    ctx.scale(scaleX, scaleY);
    ctx.drawImage(
      image,
      flipH ? -image.width : 0,
      flipV ? -image.height : 0
    );
    ctx.restore();
  }, [image, flipH, flipV]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    const suffix = [flipH && "h", flipV && "v"].filter(Boolean).join("") || "original";
    link.download = `flipped-${suffix}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const resetFlip = () => {
    setFlipH(false);
    setFlipV(false);
  };

  const reset = () => {
    setImage(null);
    setFlipH(false);
    setFlipV(false);
  };

  const hasFlip = flipH || flipV;

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
          {/* Flip controls */}
          <Card className="space-y-3">
            <h3 className="font-medium text-text-primary text-sm">Flip</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFlipH(!flipH)}
                className={`px-4 py-2 rounded-[var(--radius-input)] text-sm font-medium transition-all flex items-center gap-2 ${
                  flipH
                    ? "bg-accent text-white shadow-sm"
                    : "bg-surface text-text-secondary hover:bg-surface-hover border border-border"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2v12" strokeDasharray="2 2" />
                  <path d="M5 4H3l2 8H3" />
                  <path d="M11 4h2l-2 8h2" />
                </svg>
                Flip Horizontal
                {flipH && <span className="text-xs opacity-75">ON</span>}
              </button>

              <button
                onClick={() => setFlipV(!flipV)}
                className={`px-4 py-2 rounded-[var(--radius-input)] text-sm font-medium transition-all flex items-center gap-2 ${
                  flipV
                    ? "bg-accent text-white shadow-sm"
                    : "bg-surface text-text-secondary hover:bg-surface-hover border border-border"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 8h12" strokeDasharray="2 2" />
                  <path d="M4 5V3l8 2V3" />
                  <path d="M4 11v2l8-2v2" />
                </svg>
                Flip Vertical
                {flipV && <span className="text-xs opacity-75">ON</span>}
              </button>

              <button
                onClick={() => { if (flipH && flipV) { setFlipH(false); setFlipV(false); } else { setFlipH(true); setFlipV(true); } }}
                className={`px-4 py-2 rounded-[var(--radius-input)] text-sm font-medium transition-all flex items-center gap-2 ${
                  flipH && flipV
                    ? "bg-accent text-white shadow-sm"
                    : "bg-surface text-text-secondary hover:bg-surface-hover border border-border"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4l8 8M12 4L4 12" />
                </svg>
                Flip Both
              </button>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={download}>
              Download
            </Button>
            {hasFlip && (
              <Button variant="secondary" size="sm" onClick={resetFlip}>
                Reset Flip
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={reset}>
              New Image
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

          {/* Side-by-side preview (desktop) / stacked (mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card padding={false} className="overflow-hidden">
              <div className="px-3 py-1.5 bg-surface border-b border-border">
                <span className="text-xs font-medium text-text-muted">Original</span>
              </div>
              <canvas ref={originalCanvasRef} className="w-full h-auto" />
            </Card>

            <Card padding={false} className="overflow-hidden">
              <div className="px-3 py-1.5 bg-surface border-b border-border flex items-center justify-between">
                <span className="text-xs font-medium text-text-muted">
                  {hasFlip ? "Flipped" : "No changes"}
                </span>
                {hasFlip && (
                  <span className="text-xs font-mono text-accent">
                    {[flipH && "H", flipV && "V"].filter(Boolean).join(" + ")}
                  </span>
                )}
              </div>
              <canvas ref={canvasRef} className="w-full h-auto" />
            </Card>
          </div>

          {/* Dimensions */}
          <p className="text-xs text-text-muted text-center font-mono">
            {image.width} x {image.height}px
          </p>
        </>
      )}
    </div>
  );
}
