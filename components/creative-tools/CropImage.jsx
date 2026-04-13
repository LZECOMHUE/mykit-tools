"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const ASPECT_RATIOS = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
  { label: "4:3", value: 4 / 3 },
  { label: "3:2", value: 3 / 2 },
];

export default function CropImage() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [aspectRatio, setAspectRatio] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropStart, setCropStart] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [cropped, setCropped] = useState(false);
  const [croppedUrl, setCroppedUrl] = useState(null);
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });
  const prevCropRef = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileInfo({ name: file.name, size: file.size, type: file.type });
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        setImage(img);
        setFileInfo((prev) => ({ ...prev, width: img.width, height: img.height }));
        setCropped(false);
        setCroppedUrl(null);
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

  // Compute display dimensions and set initial crop when image loads
  useEffect(() => {
    if (!image || !containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const scale = Math.min(1, containerWidth / image.width);
    const dw = image.width * scale;
    const dh = image.height * scale;
    setDisplaySize({ w: dw, h: dh });

    // Default crop to center 80%
    const margin = 0.1;
    setCrop({
      x: Math.round(image.width * margin),
      y: Math.round(image.height * margin),
      w: Math.round(image.width * (1 - 2 * margin)),
      h: Math.round(image.height * (1 - 2 * margin)),
    });
    setCropped(false);
    setCroppedUrl(null);
  }, [image]);

  const getScale = useCallback(() => {
    if (!image || displaySize.w === 0) return 1;
    return displaySize.w / image.width;
  }, [image, displaySize.w]);

  // Convert display coords to image coords
  const toImage = useCallback(
    (dx, dy) => {
      const s = getScale();
      return { x: Math.round(dx / s), y: Math.round(dy / s) };
    },
    [getScale]
  );

  // Convert image coords to display coords
  const toDisplay = useCallback(
    (ix, iy) => {
      const s = getScale();
      return { x: ix * s, y: iy * s };
    },
    [getScale]
  );

  const clampCrop = useCallback(
    (c) => {
      if (!image) return c;
      let { x, y, w, h } = c;
      w = Math.max(20, Math.min(w, image.width));
      h = Math.max(20, Math.min(h, image.height));
      x = Math.max(0, Math.min(x, image.width - w));
      y = Math.max(0, Math.min(y, image.height - h));
      return { x, y, w, h };
    },
    [image]
  );

  const getMousePos = useCallback(
    (e) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    },
    []
  );

  const HANDLE_SIZE = 12;

  const getHitTarget = useCallback(
    (pos) => {
      const s = getScale();
      const cx = crop.x * s;
      const cy = crop.y * s;
      const cw = crop.w * s;
      const ch = crop.h * s;
      const hs = HANDLE_SIZE;

      // Check corners
      if (Math.abs(pos.x - cx) < hs && Math.abs(pos.y - cy) < hs) return "nw";
      if (Math.abs(pos.x - (cx + cw)) < hs && Math.abs(pos.y - cy) < hs) return "ne";
      if (Math.abs(pos.x - cx) < hs && Math.abs(pos.y - (cy + ch)) < hs) return "sw";
      if (Math.abs(pos.x - (cx + cw)) < hs && Math.abs(pos.y - (cy + ch)) < hs) return "se";

      // Check inside
      if (pos.x >= cx && pos.x <= cx + cw && pos.y >= cy && pos.y <= cy + ch) return "move";

      return "new";
    },
    [crop, getScale]
  );

  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault();
      const pos = getMousePos(e);
      const hit = getHitTarget(pos);
      setDragging(hit);
      setDragStart(pos);
      setCropStart({ ...crop });

      if (hit === "new") {
        const imgPos = toImage(pos.x, pos.y);
        setCrop({ x: imgPos.x, y: imgPos.y, w: 0, h: 0 });
        setCropStart({ x: imgPos.x, y: imgPos.y, w: 0, h: 0 });
      }
    },
    [crop, getMousePos, getHitTarget, toImage]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!dragging) return;
      e.preventDefault();
      const pos = getMousePos(e);
      const dx = pos.x - dragStart.x;
      const dy = pos.y - dragStart.y;
      const s = getScale();
      const idx = Math.round(dx / s);
      const idy = Math.round(dy / s);

      let newCrop;

      if (dragging === "move") {
        newCrop = {
          ...cropStart,
          x: cropStart.x + idx,
          y: cropStart.y + idy,
        };
      } else if (dragging === "new") {
        const imgPos = toImage(pos.x, pos.y);
        let w = imgPos.x - cropStart.x;
        let h = imgPos.y - cropStart.y;
        if (aspectRatio) {
          h = Math.round(Math.abs(w) / aspectRatio) * Math.sign(h || 1);
        }
        newCrop = {
          x: w >= 0 ? cropStart.x : cropStart.x + w,
          y: h >= 0 ? cropStart.y : cropStart.y + h,
          w: Math.abs(w),
          h: Math.abs(h),
        };
      } else {
        // Resize from corners
        let { x, y, w, h } = cropStart;
        if (dragging.includes("e")) w = cropStart.w + idx;
        if (dragging.includes("w")) {
          w = cropStart.w - idx;
          x = cropStart.x + idx;
        }
        if (dragging.includes("s")) h = cropStart.h + idy;
        if (dragging.includes("n")) {
          h = cropStart.h - idy;
          y = cropStart.y + idy;
        }
        if (aspectRatio) {
          const maxDim = Math.max(Math.abs(w), Math.abs(h) * aspectRatio);
          w = maxDim;
          h = Math.round(maxDim / aspectRatio);
          if (dragging.includes("w")) x = cropStart.x + cropStart.w - w;
          if (dragging.includes("n")) y = cropStart.y + cropStart.h - h;
        }
        newCrop = { x, y, w: Math.abs(w), h: Math.abs(h) };
      }

      setCrop(clampCrop(newCrop));
    },
    [dragging, dragStart, cropStart, getMousePos, getScale, toImage, aspectRatio, clampCrop]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", handlePointerUp);
      window.addEventListener("touchmove", handlePointerMove, { passive: false });
      window.addEventListener("touchend", handlePointerUp);
      return () => {
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseup", handlePointerUp);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("touchend", handlePointerUp);
      };
    }
  }, [dragging, handlePointerMove, handlePointerUp]);

  const applyCrop = () => {
    if (!image || crop.w < 1 || crop.h < 1) return;
    prevCropRef.current = { ...crop };
    const canvas = canvasRef.current;
    canvas.width = crop.w;
    canvas.height = crop.h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
    setCroppedUrl(canvas.toDataURL("image/png"));
    setCropped(true);
  };

  const handleDownload = () => {
    if (!croppedUrl) return;
    const a = document.createElement("a");
    a.href = croppedUrl;
    const baseName = fileInfo?.name?.replace(/\.[^.]+$/, "") || "image";
    a.download = `cropped-${baseName}.png`;
    a.click();
  };

  const handleReset = () => {
    setCropped(false);
    setCroppedUrl(null);
    if (prevCropRef.current.w > 0 && prevCropRef.current.h > 0) {
      setCrop({ ...prevCropRef.current });
    } else if (image) {
      const margin = 0.1;
      setCrop({
        x: Math.round(image.width * margin),
        y: Math.round(image.height * margin),
        w: Math.round(image.width * 0.8),
        h: Math.round(image.height * 0.8),
      });
    }
  };

  const handleNewImage = () => {
    setImage(null);
    setFileInfo(null);
    setCropped(false);
    setCroppedUrl(null);
    setCrop({ x: 0, y: 0, w: 0, h: 0 });
  };

  const s = getScale();
  const dc = { x: crop.x * s, y: crop.y * s, w: crop.w * s, h: crop.h * s };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="hidden" />

      {!image && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full px-6 py-12 border-2 border-dashed border-border rounded-[var(--radius-card)] cursor-pointer hover:border-accent hover:bg-surface transition-all text-center"
        >
          <div className="text-3xl mb-3">+</div>
          <p className="font-medium text-text-primary mb-1">Drop an image here or click to upload</p>
          <p className="text-sm text-text-muted">PNG, JPG, WebP, GIF</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      )}

      {image && !cropped && (
        <>
          {/* Aspect ratio presets */}
          <Card>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-text-secondary mr-1">Aspect Ratio:</span>
              {ASPECT_RATIOS.map((ar) => (
                <button
                  key={ar.label}
                  onClick={() => {
                    setAspectRatio(ar.value);
                    if (ar.value && image) {
                      // Adjust current crop to match ratio
                      const newW = crop.w;
                      const newH = Math.round(newW / ar.value);
                      setCrop(clampCrop({ ...crop, h: newH }));
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    aspectRatio === ar.value
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-text-muted">
              <span>
                Image: <span className="font-mono">{image.width} x {image.height}px</span>
              </span>
              <span>
                Selection: <span className="font-mono">{crop.w} x {crop.h}px</span>
              </span>
            </div>
          </Card>

          {/* Crop area */}
          <Card padding={false}>
            <div
              ref={containerRef}
              className="relative overflow-hidden select-none touch-none"
              style={{ width: "100%", height: displaySize.h || "auto" }}
              onMouseDown={handlePointerDown}
              onTouchStart={handlePointerDown}
            >
              <img
                src={image.src}
                alt="Source"
                className="block w-full h-auto pointer-events-none"
                style={{ width: displaySize.w, height: displaySize.h }}
                draggable={false}
              />

              {/* Dark overlay - 4 rectangles around the crop */}
              {crop.w > 0 && crop.h > 0 && (
                <>
                  {/* Top */}
                  <div
                    className="absolute left-0 top-0 bg-black/50 pointer-events-none"
                    style={{ width: displaySize.w, height: dc.y }}
                  />
                  {/* Bottom */}
                  <div
                    className="absolute left-0 bg-black/50 pointer-events-none"
                    style={{ top: dc.y + dc.h, width: displaySize.w, height: displaySize.h - dc.y - dc.h }}
                  />
                  {/* Left */}
                  <div
                    className="absolute left-0 bg-black/50 pointer-events-none"
                    style={{ top: dc.y, width: dc.x, height: dc.h }}
                  />
                  {/* Right */}
                  <div
                    className="absolute bg-black/50 pointer-events-none"
                    style={{ top: dc.y, left: dc.x + dc.w, width: displaySize.w - dc.x - dc.w, height: dc.h }}
                  />

                  {/* Crop border */}
                  <div
                    className="absolute border-2 border-white border-dashed pointer-events-none"
                    style={{ left: dc.x, top: dc.y, width: dc.w, height: dc.h }}
                  >
                    {/* Rule of thirds grid lines */}
                    <div className="absolute left-1/3 top-0 w-px h-full bg-white/30" />
                    <div className="absolute left-2/3 top-0 w-px h-full bg-white/30" />
                    <div className="absolute left-0 top-1/3 w-full h-px bg-white/30" />
                    <div className="absolute left-0 top-2/3 w-full h-px bg-white/30" />
                  </div>

                  {/* Corner handles */}
                  {[
                    { pos: "nw", left: dc.x - 5, top: dc.y - 5 },
                    { pos: "ne", left: dc.x + dc.w - 5, top: dc.y - 5 },
                    { pos: "sw", left: dc.x - 5, top: dc.y + dc.h - 5 },
                    { pos: "se", left: dc.x + dc.w - 5, top: dc.y + dc.h - 5 },
                  ].map((h) => (
                    <div
                      key={h.pos}
                      className="absolute w-[10px] h-[10px] bg-white border-2 border-accent rounded-sm pointer-events-none"
                      style={{ left: h.left, top: h.top }}
                    />
                  ))}
                </>
              )}
            </div>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button onClick={applyCrop} disabled={crop.w < 1 || crop.h < 1}>
              Apply Crop
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Reset Selection
            </Button>
            <Button variant="ghost" onClick={handleNewImage}>
              New Image
            </Button>
          </div>
        </>
      )}

      {cropped && croppedUrl && (
        <>
          <Card>
            <p className="text-sm text-text-secondary mb-2">
              Cropped to <span className="font-mono">{crop.w} x {crop.h}px</span>
            </p>
            <img src={croppedUrl} alt="Cropped result" className="max-w-full rounded-lg border border-border" />
          </Card>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleDownload}>
              Download Cropped Image
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Adjust Crop
            </Button>
            <Button variant="ghost" onClick={handleNewImage}>
              New Image
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
