"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

export default function BackgroundRemover() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [tolerance, setTolerance] = useState(30);
  const [edgeOnly, setEdgeOnly] = useState(true);
  const [pickedColor, setPickedColor] = useState(null);
  const [history, setHistory] = useState([]); // stack of ImageData for undo
  const [currentData, setCurrentData] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        setImage(img);
        setPickedColor(null);
        setHistory([]);
        setCurrentData(null);
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

  // Initial draw
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
    setCurrentData(ctx.getImageData(0, 0, canvas.width, canvas.height));
  }, [image]);

  // Redraw currentData with checkerboard
  const drawWithCheckerboard = useCallback((imgData) => {
    if (!canvasRef.current || !imgData) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;

    // Draw checkerboard pattern
    const tileSize = 8;
    for (let y = 0; y < h; y += tileSize) {
      for (let x = 0; x < w; x += tileSize) {
        const isLight = ((x / tileSize) + (y / tileSize)) % 2 === 0;
        ctx.fillStyle = isLight ? "#e5e5e5" : "#ffffff";
        ctx.fillRect(x, y, tileSize, tileSize);
      }
    }

    // Create temp canvas for image data
    const tmp = document.createElement("canvas");
    tmp.width = w; tmp.height = h;
    const tmpCtx = tmp.getContext("2d");
    tmpCtx.putImageData(imgData, 0, 0);

    ctx.drawImage(tmp, 0, 0);
  }, []);

  useEffect(() => {
    if (currentData) drawWithCheckerboard(currentData);
  }, [currentData, drawWithCheckerboard]);

  const colorDistance = (r1, g1, b1, r2, g2, b2) => {
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  };

  const removeColor = useCallback((color, tol, useEdge) => {
    if (!currentData) return;

    // Save to undo stack
    const cloned = new ImageData(
      new Uint8ClampedArray(currentData.data),
      currentData.width,
      currentData.height
    );
    setHistory((prev) => [...prev, cloned]);

    const w = currentData.width;
    const h = currentData.height;
    const data = new Uint8ClampedArray(currentData.data);
    const maxDist = Math.sqrt(255 * 255 * 3);
    const threshold = (tol / 100) * maxDist;

    const [tr, tg, tb] = color;

    if (useEdge) {
      // Flood-fill from all border pixels
      const visited = new Uint8Array(w * h);
      const queue = [];

      // Add all border pixels to queue if they match
      for (let x = 0; x < w; x++) {
        queue.push(x); // top row
        queue.push((h - 1) * w + x); // bottom row
      }
      for (let y = 0; y < h; y++) {
        queue.push(y * w); // left col
        queue.push(y * w + (w - 1)); // right col
      }

      while (queue.length > 0) {
        const idx = queue.pop();
        if (idx < 0 || idx >= w * h || visited[idx]) continue;
        visited[idx] = 1;

        const pi = idx * 4;
        if (data[pi + 3] === 0) continue; // already transparent

        const dist = colorDistance(data[pi], data[pi + 1], data[pi + 2], tr, tg, tb);
        if (dist <= threshold) {
          data[pi + 3] = 0; // make transparent

          const x = idx % w;
          const y = Math.floor(idx / w);
          if (x > 0) queue.push(idx - 1);
          if (x < w - 1) queue.push(idx + 1);
          if (y > 0) queue.push(idx - w);
          if (y < h - 1) queue.push(idx + w);
        }
      }
    } else {
      // Remove all matching pixels regardless of position
      for (let i = 0; i < data.length; i += 4) {
        const dist = colorDistance(data[i], data[i + 1], data[i + 2], tr, tg, tb);
        if (dist <= threshold) {
          data[i + 3] = 0;
        }
      }
    }

    const newImgData = new ImageData(data, w, h);
    setCurrentData(newImgData);
  }, [currentData]);

  const handleCanvasClick = (e) => {
    if (!image || !canvasRef.current || !currentData) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = image.width / rect.width;
    const scaleY = image.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const idx = (y * currentData.width + x) * 4;
    const r = currentData.data[idx];
    const g = currentData.data[idx + 1];
    const b = currentData.data[idx + 2];

    setPickedColor([r, g, b]);
    removeColor([r, g, b], tolerance, edgeOnly);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentData(prev);
  };

  const handleReset = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    setCurrentData(ctx.getImageData(0, 0, canvas.width, canvas.height));
    setHistory([]);
    setPickedColor(null);
  };

  const handleDownload = () => {
    if (!currentData) return;
    const tmp = document.createElement("canvas");
    tmp.width = currentData.width;
    tmp.height = currentData.height;
    const ctx = tmp.getContext("2d");
    ctx.putImageData(currentData, 0, 0);
    const link = document.createElement("a");
    link.download = `${fileName || "image"}-no-bg.png`;
    link.href = tmp.toDataURL("image/png");
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
          <div className="text-3xl mb-3">✂</div>
          <p className="font-medium text-text-primary mb-1">Drop an image here or click to upload</p>
          <p className="text-sm text-text-muted">PNG, JPG, WebP - click on the colour you want to remove</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      )}

      {image && (
        <>
          {/* Controls */}
          <Card className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-text-muted">Click on the image to pick a colour to remove</span>
              {pickedColor && (
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-5 h-5 rounded border border-border"
                    style={{ backgroundColor: `rgb(${pickedColor[0]},${pickedColor[1]},${pickedColor[2]})` }}
                  />
                  <span className="text-xs font-mono text-text-secondary">
                    {pickedColor[0]},{pickedColor[1]},{pickedColor[2]}
                  </span>
                </div>
              )}
            </div>

            <Slider
              label="Tolerance"
              value={tolerance}
              onChange={setTolerance}
              min={0}
              max={100}
              step={1}
              formatValue={(v) => `${v}%`}
            />

            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">Mode:</span>
              <button
                onClick={() => setEdgeOnly(true)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  edgeOnly ? "bg-accent text-white" : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                Edge Connected
              </button>
              <button
                onClick={() => setEdgeOnly(false)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  !edgeOnly ? "bg-accent text-white" : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                All Matching
              </button>
            </div>
          </Card>

          {/* Canvas */}
          <Card padding={false}>
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full h-auto rounded-[var(--radius-card)] cursor-crosshair"
              style={{ display: "block" }}
            />
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleDownload}>Download PNG</Button>
            <Button variant="secondary" onClick={handleUndo} disabled={history.length === 0}>
              Undo
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="ghost" onClick={() => { setImage(null); setFileName(""); setHistory([]); setCurrentData(null); setPickedColor(null); }}>
              New Image
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
