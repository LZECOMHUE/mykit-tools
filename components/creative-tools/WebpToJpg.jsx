"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

const BG_PRESETS = [
  { label: "White", value: "#ffffff" },
  { label: "Black", value: "#000000" },
  { label: "Grey", value: "#cccccc" },
];

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function WebpToJpg() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const prevUrlRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [quality, setQuality] = useState(92);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [transparent, setTransparent] = useState(false);
  const [jpgSize, setJpgSize] = useState(null);
  const [jpgUrl, setJpgUrl] = useState(null);
  const [converted, setConverted] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileInfo({ name: file.name, size: file.size, type: file.type });
    setConverted(false);
    setJpgUrl(null);
    setJpgSize(null);
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

  // Check transparency when image loads
  useEffect(() => {
    if (!image) return;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(image, 0, 0);
    const data = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;
    let hasAlpha = false;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 255) {
        hasAlpha = true;
        break;
      }
    }
    setTransparent(hasAlpha);
  }, [image]);

  // Convert whenever image, quality, or bgColor changes
  const convert = useCallback(() => {
    if (!image) return;
    const canvas = canvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");

    // Fill background (JPG has no transparency)
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setJpgSize(blob.size);
        const url = URL.createObjectURL(blob);
        if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
        prevUrlRef.current = url;
        setJpgUrl(url);
        setConverted(true);
      },
      "image/jpeg",
      quality / 100
    );
  }, [image, quality, bgColor]);

  useEffect(() => {
    if (image) convert();
  }, [image, quality, bgColor, convert]);

  const handleDownload = () => {
    if (!jpgUrl) return;
    const a = document.createElement("a");
    a.href = jpgUrl;
    const baseName = fileInfo?.name?.replace(/\.[^.]+$/, "") || "image";
    a.download = `${baseName}.jpg`;
    a.click();
  };

  const reduction =
    fileInfo?.size && jpgSize ? Math.round((1 - jpgSize / fileInfo.size) * 100) : null;

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
          <p className="font-medium text-text-primary mb-1">
            Drop a WebP image here or click to upload
          </p>
          <p className="text-sm text-text-muted">WebP files - will be converted to JPG</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/webp,image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      )}

      {image && (
        <>
          {/* Transparency warning */}
          {transparent && (
            <Card className="border-amber-300 bg-amber-50">
              <div className="flex items-start gap-2">
                <span className="text-lg">⚠</span>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    This WebP has transparent areas
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Transparent pixels will be filled with the background colour below. JPG does not support transparency.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Controls */}
          <Card>
            <div className="space-y-4">
              <Slider
                label="JPG Quality"
                value={quality}
                onChange={setQuality}
                min={1}
                max={100}
                step={1}
                formatValue={(v) => `${v}%`}
              />

              {transparent && (
                <div>
                  <p className="text-sm font-medium text-text-primary mb-2">
                    Background Colour
                  </p>
                  <div className="flex items-center gap-2">
                    {BG_PRESETS.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setBgColor(p.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          bgColor === p.value
                            ? "bg-accent text-white"
                            : "bg-surface text-text-secondary hover:bg-surface-hover"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded-md border border-border cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* File size comparison */}
          {converted && (
            <Card>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide">
                    Original WebP
                  </p>
                  <p className="font-mono text-lg text-text-primary">
                    {formatBytes(fileInfo?.size || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide">
                    JPG Output
                  </p>
                  <p className="font-mono text-lg text-text-primary">
                    {formatBytes(jpgSize || 0)}
                  </p>
                </div>
              </div>
              {reduction !== null && (
                <p className="text-center text-sm mt-2">
                  {reduction > 0 ? (
                    <span className="text-green-600 font-medium">{reduction}% smaller</span>
                  ) : (
                    <span className="text-amber-600 font-medium">
                      {Math.abs(reduction)}% larger
                    </span>
                  )}
                </p>
              )}
            </Card>
          )}

          {/* Preview */}
          {jpgUrl && (
            <Card padding={false}>
              <img
                src={jpgUrl}
                alt="JPG preview"
                className="max-w-full rounded-[var(--radius-card)]"
              />
            </Card>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleDownload} disabled={!jpgUrl}>
              Download JPG
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setImage(null);
                setFileInfo(null);
                setConverted(false);
                setJpgUrl(null);
                setJpgSize(null);
                if (prevUrlRef.current) {
                  URL.revokeObjectURL(prevUrlRef.current);
                  prevUrlRef.current = null;
                }
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
