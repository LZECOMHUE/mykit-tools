"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";

const SIZES = [
  { size: 16, label: "16x16", desc: "favicon.ico" },
  { size: 32, label: "32x32", desc: "favicon.ico" },
  { size: 48, label: "48x48", desc: "favicon.ico" },
  { size: 180, label: "180x180", desc: "Apple Touch" },
  { size: 192, label: "192x192", desc: "Android" },
  { size: 512, label: "512x512", desc: "PWA" },
];

const HTML_SNIPPET = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">`;

export default function FaviconGenerator() {
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [toast, setToast] = useState("");
  const canvasRefs = useRef({});
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  const handleUpload = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setImage(img);
      setImageSrc(url);
    };
    img.src = url;
  }, [imageSrc]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  // Render previews when image loads
  useEffect(() => {
    if (!image) return;
    SIZES.forEach(({ size }) => {
      const canvas = canvasRefs.current[size];
      if (!canvas) return;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, size, size);
      // Draw image centered/cropped to square
      const s = Math.min(image.width, image.height);
      const sx = (image.width - s) / 2;
      const sy = (image.height - s) / 2;
      ctx.drawImage(image, sx, sy, s, s, 0, 0, size, size);
    });
  }, [image]);

  const downloadSize = (size) => {
    const canvas = canvasRefs.current[size];
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `favicon-${size}x${size}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast(`Downloaded ${size}x${size}!`);
  };

  const downloadAll = () => {
    SIZES.forEach(({ size }, i) => {
      setTimeout(() => downloadSize(size), i * 200);
    });
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(HTML_SNIPPET).catch(() => {});
    showToast("Copied!");
  };

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg animate-fade-in">
          {toast}
        </div>
      )}

      {/* Upload */}
      {!image ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors"
        >
          <div className="text-4xl mb-2">+</div>
          <p className="text-text-secondary text-sm">Drop an image or click to upload</p>
          <p className="text-text-muted text-xs mt-1">Square images work best - non-square will be center-cropped</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Source preview + controls */}
          <div className="flex items-center gap-3">
            <img src={imageSrc} alt="Source" className="w-16 h-16 rounded-lg object-cover border border-border" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary font-medium">Source image</p>
              <p className="text-xs text-text-muted font-mono">{image.width} x {image.height}</p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover transition-colors"
            >
              Change
            </button>
            <Button onClick={downloadAll} size="sm">
              Download All PNGs
            </Button>
          </div>

          {/* Size previews grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {SIZES.map(({ size, label, desc }) => (
              <div
                key={size}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border bg-surface hover:bg-surface-hover transition-colors cursor-pointer group"
                onClick={() => downloadSize(size)}
              >
                <div
                  className="flex items-center justify-center bg-white border border-border rounded"
                  style={{ width: Math.max(size, 48) + 8, height: Math.max(size, 48) + 8 }}
                >
                  <canvas
                    ref={(el) => (canvasRefs.current[size] = el)}
                    style={{
                      width: Math.min(size, 48),
                      height: Math.min(size, 48),
                      imageRendering: size <= 32 ? "pixelated" : "auto",
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-text-primary">{label}</span>
                <span className="text-[10px] text-text-muted">{desc}</span>
                <span className="text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Download
                </span>
              </div>
            ))}
          </div>

          {/* HTML snippet */}
          <div className="rounded-lg border border-border bg-surface p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-text-secondary">HTML Link Tags</span>
              <button
                onClick={copyHtml}
                className="px-2 py-0.5 rounded text-xs text-accent hover:bg-accent/10 transition-colors"
              >
                Copy
              </button>
            </div>
            <pre className="text-xs font-mono text-text-secondary overflow-x-auto whitespace-pre leading-relaxed">
              {HTML_SNIPPET}
            </pre>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleUpload(e.target.files?.[0])}
        className="hidden"
      />
    </div>
  );
}
