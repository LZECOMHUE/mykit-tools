"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

const POSITIONS = [
  { label: "Center", value: "center" },
  { label: "Tile", value: "tile" },
  { label: "Bottom-Right", value: "bottom-right" },
  { label: "Diagonal", value: "diagonal" },
];

export default function AddWatermarkToImage() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const prevUrlRef = useRef(null);
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [text, setText] = useState("SAMPLE");
  const [fontSize, setFontSize] = useState(40);
  const [opacity, setOpacity] = useState(30);
  const [colour, setColour] = useState("#888888");
  const [rotation, setRotation] = useState(-25);
  const [position, setPosition] = useState("tile");
  const [showOriginal, setShowOriginal] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
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
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => setImage(img);
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const drawWatermark = useCallback(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    if (showOriginal || !text.trim()) return;

    // Scale font size relative to image dimensions
    const scale = Math.max(image.width, image.height) / 800;
    const scaledSize = Math.round(fontSize * scale);

    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = colour;
    ctx.font = `${scaledSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const rad = (rotation * Math.PI) / 180;

    if (position === "center") {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    } else if (position === "bottom-right") {
      ctx.save();
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.translate(canvas.width - 20 * scale, canvas.height - 20 * scale);
      ctx.rotate(rad);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    } else if (position === "diagonal") {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 4);
      ctx.font = `${Math.max(scaledSize, Math.floor(canvas.width / 10))}px sans-serif`;
      ctx.fillText(text, 0, 0);
      ctx.restore();
    } else if (position === "tile") {
      const metrics = ctx.measureText(text);
      const tw = metrics.width + 60 * scale;
      const th = scaledSize + 60 * scale;
      for (let y = -canvas.height; y < canvas.height * 2; y += th) {
        for (let x = -canvas.width; x < canvas.width * 2; x += tw) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rad);
          ctx.fillText(text, 0, 0);
          ctx.restore();
        }
      }
    }

    ctx.globalAlpha = 1;
  }, [image, text, fontSize, opacity, colour, rotation, position, showOriginal]);

  useEffect(() => {
    drawWatermark();
  }, [drawWatermark]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      prevUrlRef.current = url;
      const a = document.createElement("a");
      a.href = url;
      a.download = "watermarked-image.png";
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

      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Watermark text"
          className="border border-border rounded-lg px-3 py-1.5 text-sm w-40 focus:outline-none focus:border-accent"
        />
        <div className="flex gap-1">
          {POSITIONS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPosition(p.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                position === p.value
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-1.5 text-xs text-text-secondary">
          <input
            type="color"
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            className="w-6 h-6 rounded border border-border cursor-pointer"
          />
        </label>
        <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
          Replace
        </Button>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Slider label="Font size" value={fontSize} onChange={setFontSize} min={12} max={80} formatValue={(v) => `${v}px`} />
        <Slider label="Opacity" value={opacity} onChange={setOpacity} min={10} max={90} formatValue={(v) => `${v}%`} />
        <Slider label="Rotation" value={rotation} onChange={setRotation} min={-45} max={45} formatValue={(v) => `${v}deg`} />
      </div>

      {/* Original / Watermarked toggle */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setShowOriginal(false)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !showOriginal
              ? "bg-accent text-white"
              : "bg-surface text-text-secondary hover:bg-surface-hover"
          }`}
        >
          Watermarked
        </button>
        <button
          onClick={() => setShowOriginal(true)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            showOriginal
              ? "bg-accent text-white"
              : "bg-surface text-text-secondary hover:bg-surface-hover"
          }`}
        >
          Original
        </button>
      </div>

      {/* Preview */}
      <div className="flex items-center justify-center overflow-hidden bg-[#f0f0f0] rounded-xl border border-border">
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-[400px] object-contain"
        />
      </div>

      {/* Download */}
      <div className="flex gap-2">
        <Button onClick={handleDownload}>Download</Button>
        <Button variant="ghost" onClick={() => { setImage(null); setShowOriginal(false); }}>
          New Image
        </Button>
      </div>
    </div>
  );
}
