"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function PngToWebp() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [quality, setQuality] = useState(85);
  const [hasTransparency, setHasTransparency] = useState(false);
  const [webpSize, setWebpSize] = useState(null);
  const [webpUrl, setWebpUrl] = useState(null);
  const prevUrlRef = useRef(null);
  const [converted, setConverted] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileInfo({ name: file.name, size: file.size, type: file.type });
    setConverted(false);
    setWebpUrl(null);
    setWebpSize(null);
    setHasTransparency(false);
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

  // Detect transparency on image load
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
    setHasTransparency(hasAlpha);
  }, [image]);

  const convert = useCallback(() => {
    if (!image) return;
    const canvas = canvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    // Clear canvas to preserve transparency
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setWebpSize(blob.size);
        const url = URL.createObjectURL(blob);
        if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
        prevUrlRef.current = url;
        setWebpUrl(url);
        setConverted(true);
      },
      "image/webp",
      quality / 100
    );
  }, [image, quality]);

  useEffect(() => {
    if (image) convert();
  }, [image, quality, convert]);

  const handleDownload = () => {
    if (!webpUrl) return;
    const a = document.createElement("a");
    a.href = webpUrl;
    const baseName = fileInfo?.name?.replace(/\.[^.]+$/, "") || "image";
    a.download = `${baseName}.webp`;
    a.click();
  };

  const handleNewImage = () => {
    setImage(null);
    setFileInfo(null);
    setConverted(false);
    setHasTransparency(false);
    if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    prevUrlRef.current = null;
    setWebpUrl(null);
    setWebpSize(null);
  };

  const reduction =
    fileInfo?.size && webpSize ? Math.round((1 - webpSize / fileInfo.size) * 100) : null;

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
          <p className="font-medium text-text-primary mb-1">Drop a PNG here or click to upload</p>
          <p className="text-sm text-text-muted">PNG or any image format</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      )}

      {image && (
        <>
          {/* Transparency notice */}
          {hasTransparency && (
            <Card className="border-green-200 bg-green-50">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-lg shrink-0">&#10003;</span>
                <div>
                  <p className="text-sm font-medium text-text-primary">Transparency detected</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    WebP supports transparency - your transparent areas will be preserved in the output.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Quality control */}
          <Card>
            <Slider
              label="WebP Quality"
              value={quality}
              onChange={setQuality}
              min={1}
              max={100}
              step={1}
              formatValue={(v) => `${v}%`}
            />
          </Card>

          {/* File size comparison */}
          {converted && (
            <Card>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide">Original PNG</p>
                  <p className="font-mono text-lg text-text-primary">{formatBytes(fileInfo?.size || 0)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide">WebP Output</p>
                  <p className="font-mono text-lg text-text-primary">{formatBytes(webpSize || 0)}</p>
                </div>
              </div>
              {reduction !== null && (
                <p className="text-center text-sm mt-2">
                  {reduction > 0 ? (
                    <span className="text-green-600 font-medium">{reduction}% smaller</span>
                  ) : (
                    <span className="text-amber-600 font-medium">{Math.abs(reduction)}% larger</span>
                  )}
                </p>
              )}
              <p className="text-xs text-text-muted text-center mt-1">WebP is typically 25-35% smaller than PNG at the same visual quality</p>
            </Card>
          )}

          {/* Preview */}
          {webpUrl && (
            <Card padding={false} className="overflow-hidden">
              <div
                className="rounded-[var(--radius-card)]"
                style={{
                  backgroundImage: hasTransparency
                    ? "repeating-conic-gradient(#e5e5e5 0% 25%, #fff 0% 50%)"
                    : "none",
                  backgroundSize: "16px 16px",
                }}
              >
                <img src={webpUrl} alt="WebP preview" className="max-w-full" />
              </div>
            </Card>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleDownload} disabled={!webpUrl} size="lg">
              Download WebP
            </Button>
            <Button variant="ghost" onClick={handleNewImage}>
              Convert Another
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
