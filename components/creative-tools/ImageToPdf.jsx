"use client";

import { useState, useRef, useCallback } from "react";
import Button from "@/components/ui/Button";

const PAGE_SIZES = [
  { label: "A4", value: "a4", w: 595.28, h: 841.89 },
  { label: "Letter", value: "letter", w: 612, h: 792 },
  { label: "Fit to Image", value: "fit", w: 0, h: 0 },
];

const ORIENTATIONS = [
  { label: "Portrait", value: "portrait" },
  { label: "Landscape", value: "landscape" },
  { label: "Auto", value: "auto" },
];

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

export default function ImageToPdf() {
  const [images, setImages] = useState([]);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("auto");
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState("");
  const fileInputRef = useRef(null);
  const dragIdx = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  const handleFiles = useCallback((files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!valid.length) return;
    const newImages = valid.map((file) => ({
      file,
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      loaded: null,
    }));
    // Preload to get dimensions
    newImages.forEach((img) => {
      const i = new window.Image();
      i.onload = () => {
        img.loaded = i;
        img.width = i.width;
        img.height = i.height;
        setImages((prev) => [...prev]);
      };
      i.src = img.url;
    });
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const moveImage = (idx, dir) => {
    setImages((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const handleDragStart = (idx) => {
    dragIdx.current = idx;
  };

  const handleDragOver = (e, idx) => {
    e.preventDefault();
    if (dragIdx.current === null || dragIdx.current === idx) return;
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx.current, 1);
      next.splice(idx, 0, moved);
      dragIdx.current = idx;
      return next;
    });
  };

  const handleDragEnd = () => {
    dragIdx.current = null;
  };

  // Helper to convert blob URL to data URL via canvas
  const toDataUrl = (img) => {
    const c = document.createElement("canvas");
    c.width = img.naturalWidth || img.width;
    c.height = img.naturalHeight || img.height;
    c.getContext("2d").drawImage(img, 0, 0);
    return c.toDataURL("image/jpeg", 0.92);
  };

  const generatePdf = async () => {
    if (!images.length) return;
    setGenerating(true);
    try {
      const { jsPDF } = await import("jspdf");
      const sizeObj = PAGE_SIZES.find((s) => s.value === pageSize);
      let pdf = null;

      images.forEach((img, i) => {
        if (!img.loaded) return;
        const imgW = img.width;
        const imgH = img.height;
        const isLandscapeImg = imgW > imgH;

        // Determine orientation for this page
        let orient = orientation;
        if (orient === "auto") orient = isLandscapeImg ? "landscape" : "portrait";

        if (pageSize === "fit") {
          // Page size matches image
          const pxToMm = 25.4 / 72; // approximate: treat px as points
          const pw = imgW * pxToMm;
          const ph = imgH * pxToMm;
          if (i === 0) {
            pdf = new jsPDF({ orientation: orient, unit: "mm", format: [pw, ph] });
          } else {
            pdf.addPage([pw, ph], orient);
          }
          pdf.addImage(toDataUrl(img.loaded), "JPEG", 0, 0, pw, ph);
        } else {
          // Fixed page size - fit image with margin
          const pageW = orient === "landscape" ? sizeObj.h : sizeObj.w;
          const pageH = orient === "landscape" ? sizeObj.w : sizeObj.h;
          const pWmm = pageW * 25.4 / 72;
          const pHmm = pageH * 25.4 / 72;
          const margin = 10; // mm
          const availW = pWmm - margin * 2;
          const availH = pHmm - margin * 2;
          const scale = Math.min(availW / imgW, availH / imgH);
          const drawW = imgW * scale;
          const drawH = imgH * scale;
          const x = margin + (availW - drawW) / 2;
          const y = margin + (availH - drawH) / 2;

          if (i === 0) {
            pdf = new jsPDF({ orientation: orient, unit: "mm", format: sizeObj.value === "a4" ? "a4" : "letter" });
          } else {
            pdf.addPage(sizeObj.value === "a4" ? "a4" : "letter", orient);
          }
          pdf.addImage(toDataUrl(img.loaded), "JPEG", x, y, drawW, drawH);
        }
      });

      if (pdf) {
        pdf.save("images.pdf");
        showToast("PDF downloaded!");
      }
    } catch (err) {
      showToast("Error generating PDF");
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg animate-fade-in">
          {toast}
        </div>
      )}

      {/* Upload area */}
      {!images.length ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors"
        >
          <div className="text-4xl mb-2">+</div>
          <p className="text-text-secondary text-sm">Drop images here or click to upload</p>
          <p className="text-text-muted text-xs mt-1">JPG, PNG, WebP - multiple files supported</p>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="space-y-4"
        >
          {/* Controls row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-text-muted">Page:</span>
              {PAGE_SIZES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setPageSize(s.value)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    pageSize === s.value
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-text-muted">Orient:</span>
              {ORIENTATIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setOrientation(o.value)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    orientation === o.value
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover transition-colors ml-auto"
            >
              + Add More
            </button>
          </div>

          {/* Image thumbnails */}
          <div className="flex flex-wrap gap-2">
            {images.map((img, idx) => (
              <div
                key={img.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                className="relative group w-24 h-24 rounded-lg overflow-hidden border border-border bg-surface flex-shrink-0 cursor-grab active:cursor-grabbing"
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => moveImage(idx, -1)}
                    className="w-6 h-6 rounded bg-white/90 text-text-primary text-xs flex items-center justify-center hover:bg-white"
                    title="Move left"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={() => moveImage(idx, 1)}
                    className="w-6 h-6 rounded bg-white/90 text-text-primary text-xs flex items-center justify-center hover:bg-white"
                    title="Move right"
                  >
                    &gt;
                  </button>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="w-6 h-6 rounded bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
                    title="Remove"
                  >
                    x
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-1 py-0.5 truncate font-mono">
                  {idx + 1}. {img.width && `${img.width}x${img.height}`}
                </div>
              </div>
            ))}
          </div>

          {/* Summary + Download */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">
              <span className="font-mono">{images.length}</span> image{images.length !== 1 ? "s" : ""}{" "}
              <span className="text-text-muted">
                ({formatBytes(images.reduce((s, i) => s + i.size, 0))} total)
              </span>
            </span>
            <Button
              onClick={generatePdf}
              disabled={generating || !images.some((i) => i.loaded)}
              className="ml-auto"
            >
              {generating ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
    </div>
  );
}
