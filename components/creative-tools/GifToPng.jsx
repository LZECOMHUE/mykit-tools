"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function GifToPng() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const prevUrlRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [pngUrl, setPngUrl] = useState(null);
  const [pngSize, setPngSize] = useState(null);
  const [converted, setConverted] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileInfo({ name: file.name, size: file.size, type: file.type });
    setConverted(false);
    setPngUrl(null);
    setPngSize(null);
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
    if (file && (file.type === "image/gif" || file.type.startsWith("image/"))) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
      handleUpload({ target: { files: dt.files } });
    }
  };

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, []);

  // Auto-convert on image load
  useEffect(() => {
    if (!image) return;
    const canvas = canvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;
      setPngSize(blob.size);
      const url = URL.createObjectURL(blob);
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
      prevUrlRef.current = url;
      setPngUrl(url);
      setConverted(true);
    }, "image/png");
  }, [image]);

  const handleDownload = () => {
    if (!pngUrl) return;
    const a = document.createElement("a");
    a.href = pngUrl;
    const baseName = fileInfo?.name?.replace(/\.[^.]+$/, "") || "image";
    a.download = `${baseName}.png`;
    a.click();
  };

  const handleNewImage = () => {
    setImage(null);
    setFileInfo(null);
    setConverted(false);
    if (pngUrl) URL.revokeObjectURL(pngUrl);
    setPngUrl(null);
    setPngSize(null);
  };

  const sizeDiff =
    fileInfo?.size && pngSize ? Math.round(((pngSize - fileInfo.size) / fileInfo.size) * 100) : null;

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
          <div className="text-3xl mb-3">&#x1f5bc;</div>
          <p className="font-medium text-text-primary mb-1">Drop a GIF here or click to upload</p>
          <p className="text-sm text-text-muted">Extracts the first frame as a PNG image</p>
          <input ref={fileInputRef} type="file" accept="image/gif,image/*" onChange={handleUpload} className="hidden" />
        </div>
      )}

      {image && converted && (
        <>
          {/* Success indicator */}
          <Card className="border-green-200 bg-green-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold shrink-0">
                &#10003;
              </div>
              <div>
                <p className="font-medium text-text-primary">Converted to PNG</p>
                <p className="text-xs text-text-secondary mt-0.5">
                  <span className="font-mono">{fileInfo?.width} x {fileInfo?.height}px</span> - first frame extracted as lossless PNG
                </p>
              </div>
            </div>
          </Card>

          {/* File size comparison */}
          <Card>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Original</p>
                <p className="font-mono text-base text-text-primary">{formatBytes(fileInfo?.size || 0)}</p>
                <p className="text-xs text-text-muted mt-0.5">GIF</p>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-text-muted text-lg">&rarr;</span>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Converted</p>
                <p className="font-mono text-base text-text-primary">{formatBytes(pngSize || 0)}</p>
                <p className="text-xs text-text-muted mt-0.5">PNG</p>
              </div>
            </div>
            {sizeDiff !== null && (
              <p className="text-center text-xs text-text-muted mt-3">
                {sizeDiff > 0
                  ? `PNG is ${sizeDiff}% larger - this is expected for a single lossless frame`
                  : sizeDiff < 0
                  ? `PNG is ${Math.abs(sizeDiff)}% smaller - animated GIFs are often larger than a single frame`
                  : "Same file size"}
              </p>
            )}
          </Card>

          {/* Preview */}
          <Card padding={false}>
            <img src={pngUrl} alt="PNG preview" className="max-w-full rounded-[var(--radius-card)]" />
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleDownload} size="lg">
              Download PNG
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
