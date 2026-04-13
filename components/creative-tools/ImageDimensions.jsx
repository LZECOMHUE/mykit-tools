"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function getAspectRatio(w, h) {
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

const SUITABILITY = [
  { label: "Instagram Post", w: 1080, h: 1080 },
  { label: "Instagram Story", w: 1080, h: 1920 },
  { label: "Facebook Cover", w: 820, h: 312 },
  { label: "Twitter Header", w: 1500, h: 500 },
  { label: "YouTube Thumbnail", w: 1280, h: 720 },
  { label: "HD (720p)", w: 1280, h: 720 },
  { label: "Full HD (1080p)", w: 1920, h: 1080 },
  { label: "2K (1440p)", w: 2560, h: 1440 },
  { label: "4K (2160p)", w: 3840, h: 2160 },
  { label: "HD Wallpaper", w: 1920, h: 1080 },
  { label: "4K Wallpaper", w: 3840, h: 2160 },
  { label: "A4 Print (300dpi)", w: 2480, h: 3508 },
  { label: "Letter Print (300dpi)", w: 2550, h: 3300 },
  { label: "Favicon", w: 512, h: 512 },
  { label: "App Icon", w: 1024, h: 1024 },
];

function getSuitability(w, h) {
  const matches = [];
  SUITABILITY.forEach(({ label, w: sw, h: sh }) => {
    // Image is suitable if it's at least as large in both dimensions
    if (w >= sw && h >= sh) {
      matches.push(label);
    }
    // Also check landscape match for portrait targets and vice versa
    if (w >= sh && h >= sw && sw !== sh) {
      matches.push(label);
    }
  });
  // Dedupe
  return [...new Set(matches)];
}

function getFormatName(type) {
  const map = {
    "image/jpeg": "JPEG",
    "image/jpg": "JPEG",
    "image/png": "PNG",
    "image/gif": "GIF",
    "image/webp": "WebP",
    "image/svg+xml": "SVG",
    "image/bmp": "BMP",
    "image/tiff": "TIFF",
    "image/avif": "AVIF",
    "image/heic": "HEIC",
  };
  return map[type] || type?.split("/")[1]?.toUpperCase() || "Unknown";
}

export default function ImageDimensions() {
  const [info, setInfo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState("");
  const fileInputRef = useRef(null);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const mp = (w * h) / 1000000;
      const ratio = getAspectRatio(w, h);
      const decimal = (w / h).toFixed(2);
      const suitable = getSuitability(w, h);

      setInfo({
        name: file.name,
        size: file.size,
        type: file.type,
        width: w,
        height: h,
        megapixels: mp,
        ratio,
        decimal,
        suitable,
        format: getFormatName(file.type),
      });
      setPreview(url);
    };
    img.src = url;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const copyDimensions = () => {
    if (!info) return;
    navigator.clipboard.writeText(`${info.width} x ${info.height}`).catch(() => {});
    showToast("Copied!");
  };

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg animate-fade-in">
          {toast}
        </div>
      )}

      {!info ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors"
        >
          <div className="text-4xl mb-2">+</div>
          <p className="text-text-secondary text-sm">Drop an image or click to upload</p>
          <p className="text-text-muted text-xs mt-1">Any image format - JPG, PNG, WebP, GIF, SVG, AVIF</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Preview + main stats */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
            {/* Preview */}
            <div className="flex-shrink-0">
              <img
                src={preview}
                alt={info.name}
                className="max-w-48 max-h-48 rounded-lg border border-border object-contain bg-surface"
              />
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-text-primary truncate flex-1">{info.name}</p>
                <button
                  onClick={() => { setInfo(null); setPreview(null); }}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover transition-colors flex-shrink-0"
                >
                  Change
                </button>
              </div>

              {/* Hero dimensions */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-mono font-bold text-text-primary">{info.width} x {info.height}</span>
                <button
                  onClick={copyDimensions}
                  className="px-2 py-0.5 text-xs text-accent hover:bg-accent/10 rounded transition-colors"
                >
                  Copy
                </button>
              </div>

              {/* Detail grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5 text-sm">
                <div>
                  <span className="text-text-muted">Format: </span>
                  <span className="font-mono text-text-primary">{info.format}</span>
                </div>
                <div>
                  <span className="text-text-muted">File size: </span>
                  <span className="font-mono text-text-primary">{formatBytes(info.size)}</span>
                </div>
                <div>
                  <span className="text-text-muted">Megapixels: </span>
                  <span className="font-mono text-text-primary">{info.megapixels.toFixed(1)} MP</span>
                </div>
                <div>
                  <span className="text-text-muted">Aspect ratio: </span>
                  <span className="font-mono text-text-primary">{info.ratio}</span>
                </div>
                <div>
                  <span className="text-text-muted">Decimal: </span>
                  <span className="font-mono text-text-primary">{info.decimal}</span>
                </div>
                <div>
                  <span className="text-text-muted">Orientation: </span>
                  <span className="font-mono text-text-primary">
                    {info.width > info.height ? "Landscape" : info.width < info.height ? "Portrait" : "Square"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Suitability */}
          {info.suitable.length > 0 && (
            <div>
              <span className="text-xs text-text-muted mb-1.5 block">Suitable for:</span>
              <div className="flex flex-wrap gap-1.5">
                {info.suitable.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {info.suitable.length === 0 && (
            <div>
              <span className="text-xs text-text-muted mb-1.5 block">Suitability:</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                Small image - may not be suitable for print or large displays
              </span>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
      />
    </div>
  );
}
