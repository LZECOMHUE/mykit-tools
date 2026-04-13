"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

const STRENGTH_PRESETS = [
  { label: "25%", value: 25 },
  { label: "50%", value: 50 },
  { label: "75%", value: 75 },
  { label: "100%", value: 100 },
];

export default function InvertImageColors() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [invertStrength, setInvertStrength] = useState(100);
  const [showOriginal, setShowOriginal] = useState(false);
  const [outputUrl, setOutputUrl] = useState(null);

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

  const applyInvert = useCallback(() => {
    if (!image) return;
    const canvas = canvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const strength = invertStrength / 100;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.round(data[i] * (1 - strength) + (255 - data[i]) * strength);
      data[i + 1] = Math.round(data[i + 1] * (1 - strength) + (255 - data[i + 1]) * strength);
      data[i + 2] = Math.round(data[i + 2] * (1 - strength) + (255 - data[i + 2]) * strength);
    }

    ctx.putImageData(imageData, 0, 0);
    setOutputUrl(canvas.toDataURL("image/png"));
  }, [image, invertStrength]);

  useEffect(() => {
    if (image) applyInvert();
  }, [image, invertStrength, applyInvert]);

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    const baseName = fileInfo?.name?.replace(/\.[^.]+$/, "") || "image";
    a.download = `${baseName}-inverted.png`;
    a.click();
  };

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
          <div className="text-3xl mb-3">🖼</div>
          <p className="font-medium text-text-primary mb-1">Drop an image here or click to upload</p>
          <p className="text-sm text-text-muted">PNG, JPG, WebP, GIF</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      )}

      {image && (
        <>
          {/* Controls */}
          <Card>
            <div className="space-y-3">
              <Slider
                label="Invert Strength"
                value={invertStrength}
                onChange={setInvertStrength}
                min={0}
                max={100}
                step={1}
                formatValue={(v) => `${v}%`}
              />
              <div className="flex flex-wrap gap-2">
                {STRENGTH_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setInvertStrength(p.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      invertStrength === p.value
                        ? "bg-accent text-white"
                        : "bg-surface text-text-secondary hover:bg-surface-hover"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Preview toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOriginal(false)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                !showOriginal
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              Inverted
            </button>
            <button
              onClick={() => setShowOriginal(true)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                showOriginal
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              Original
            </button>
            <span className="text-xs text-text-muted ml-2">
              <span className="font-mono">{fileInfo?.width} x {fileInfo?.height}px</span>
            </span>
          </div>

          {/* Image preview */}
          <Card padding={false}>
            <img
              src={showOriginal ? image.src : outputUrl}
              alt={showOriginal ? "Original" : "Inverted"}
              className="max-w-full rounded-[var(--radius-card)]"
            />
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleDownload} disabled={!outputUrl}>
              Download Inverted Image
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setImage(null);
                setFileInfo(null);
                setOutputUrl(null);
              }}
            >
              New Image
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
