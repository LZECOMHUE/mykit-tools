"use client";

import { useState, useRef, useCallback } from "react";
import Button from "@/components/ui/Button";

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => {
    const hex = Math.max(0, Math.min(255, x)).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

function isLight(r, g, b) {
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
}

// Simplified k-means clustering for colour extraction
function samplePixels(imageData, count) {
  const { data, width, height } = imageData;
  const total = width * height;
  const samples = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * total) * 4;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
    if (a < 128) continue; // skip transparent
    samples.push([r, g, b]);
  }
  return samples;
}

function distance(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

function kMeans(pixels, k, iterations = 10) {
  if (pixels.length === 0) return [];

  // Initialise centroids randomly from sample
  let centroids = [];
  const used = new Set();
  while (centroids.length < k && centroids.length < pixels.length) {
    const idx = Math.floor(Math.random() * pixels.length);
    const key = pixels[idx].join(",");
    if (!used.has(key)) {
      centroids.push([...pixels[idx]]);
      used.add(key);
    }
  }

  for (let iter = 0; iter < iterations; iter++) {
    // Assign each pixel to nearest centroid
    const clusters = centroids.map(() => []);
    for (const px of pixels) {
      let minDist = Infinity, minIdx = 0;
      for (let c = 0; c < centroids.length; c++) {
        const d = distance(px, centroids[c]);
        if (d < minDist) { minDist = d; minIdx = c; }
      }
      clusters[minIdx].push(px);
    }

    // Recalculate centroids
    for (let c = 0; c < centroids.length; c++) {
      const cluster = clusters[c];
      if (cluster.length === 0) continue;
      centroids[c] = [
        Math.round(cluster.reduce((s, p) => s + p[0], 0) / cluster.length),
        Math.round(cluster.reduce((s, p) => s + p[1], 0) / cluster.length),
        Math.round(cluster.reduce((s, p) => s + p[2], 0) / cluster.length),
      ];
    }
  }

  // Count cluster sizes for sorting
  const clusterSizes = centroids.map(() => 0);
  for (const px of pixels) {
    let minDist = Infinity, minIdx = 0;
    for (let c = 0; c < centroids.length; c++) {
      const d = distance(px, centroids[c]);
      if (d < minDist) { minDist = d; minIdx = c; }
    }
    clusterSizes[minIdx]++;
  }

  // Sort by size descending
  const indexed = centroids.map((c, i) => ({ colour: c, size: clusterSizes[i] }));
  indexed.sort((a, b) => b.size - a.size);

  return indexed.map(({ colour, size }) => ({
    hex: rgbToHex(colour[0], colour[1], colour[2]),
    r: colour[0], g: colour[1], b: colour[2],
    pct: Math.round((size / pixels.length) * 100),
  }));
}

export default function ColorPaletteFromImage() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const prevUrlRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [palette, setPalette] = useState([]);
  const [colourCount, setColourCount] = useState(6);
  const [copied, setCopied] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const extractColours = useCallback((img, k) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const samples = samplePixels(imageData, 1000);
    const colours = kMeans(samples, k, 12);
    setPalette(colours);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        setImage(img);
        setImageSrc(ev.target?.result);
        extractColours(img, colourCount);
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
      const img = new window.Image();
      img.onload = () => {
        setImage(img);
        setImageSrc(ev.target?.result);
        extractColours(img, colourCount);
      };
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const handleColourCountChange = (k) => {
    setColourCount(k);
    if (image) extractColours(image, k);
  };

  const copyHex = (hex, idx) => {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopied(idx);
    setTimeout(() => setCopied(null), 1200);
  };

  const copyAll = () => {
    const text = palette.map((c) => c.hex).join(", ");
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1200);
  };

  const handleDownload = () => {
    if (palette.length === 0) return;
    if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);

    const barH = 80;
    const w = 600;
    const h = barH * palette.length;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    palette.forEach((c, i) => {
      ctx.fillStyle = c.hex;
      ctx.fillRect(0, i * barH, w, barH);
      ctx.fillStyle = isLight(c.r, c.g, c.b) ? "#1a1a1a" : "#ffffff";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(c.hex, 20, i * barH + barH / 2 + 6);
      ctx.font = "14px sans-serif";
      ctx.fillText(`${c.pct}%`, w - 60, i * barH + barH / 2 + 5);
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      prevUrlRef.current = url;
      const a = document.createElement("a");
      a.href = url;
      a.download = "colour-palette.png";
      a.click();
    });
  };

  if (!image) {
    return (
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
          dragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
        }`}
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        <div className="text-4xl mb-3">+</div>
        <p className="text-text-secondary text-sm">Drop an image or click to upload</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs text-text-secondary">Colours:</span>
        <div className="flex gap-1">
          {[3, 4, 5, 6, 7, 8].map((n) => (
            <button
              key={n}
              onClick={() => handleColourCountChange(n)}
              className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                colourCount === n
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <Button variant="secondary" size="sm" onClick={() => image && extractColours(image, colourCount)}>
          Re-extract
        </Button>
        <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
          Replace
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
        {/* Image */}
        <div className="rounded-xl border border-border overflow-hidden bg-[#f0f0f0] flex items-center justify-center">
          <img src={imageSrc} alt="Uploaded" className="max-w-full max-h-[360px] object-contain" />
        </div>

        {/* Palette */}
        <div className="space-y-1.5">
          {palette.map((c, i) => (
            <button
              key={i}
              onClick={() => copyHex(c.hex, i)}
              className="w-full flex items-center rounded-lg overflow-hidden border border-border hover:border-accent/40 transition-colors"
              title="Click to copy"
            >
              <div className="w-full h-12 flex items-center px-4" style={{ backgroundColor: c.hex }}>
                <span
                  className="font-mono text-sm font-medium flex-1 text-left"
                  style={{ color: isLight(c.r, c.g, c.b) ? "#1a1a1a" : "#ffffff" }}
                >
                  {copied === i ? "Copied!" : c.hex}
                </span>
                <span
                  className="text-xs opacity-70"
                  style={{ color: isLight(c.r, c.g, c.b) ? "#1a1a1a" : "#ffffff" }}
                >
                  {c.pct}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button size="sm" onClick={copyAll}>
          {copiedAll ? "Copied!" : "Copy all"}
        </Button>
        <Button variant="secondary" size="sm" onClick={handleDownload}>
          Download PNG
        </Button>
      </div>
    </div>
  );
}
