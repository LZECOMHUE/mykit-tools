"use client";

import { useState, useRef, useCallback } from "react";
import Button from "@/components/ui/Button";

function isUrl(text) {
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function QrCodeReader() {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [supported, setSupported] = useState(true);

  const decodeQR = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Show preview
    const reader = new FileReader();
    reader.onload = (ev) => setImageSrc(ev.target?.result);
    reader.readAsDataURL(file);

    // Check BarcodeDetector support
    if (!("BarcodeDetector" in window)) {
      setSupported(false);
      setLoading(false);
      setError("QR scanning requires Chrome, Edge, or Opera. Your browser does not support the BarcodeDetector API.");
      return;
    }

    try {
      // Create image bitmap from file
      const bitmap = await createImageBitmap(file);
      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
      const results = await detector.detect(bitmap);

      if (results.length === 0) {
        setError("No QR code found in this image. Try a clearer photo with the QR code fully visible.");
      } else {
        setResult(results[0].rawValue);
      }
    } catch (e) {
      setError("Failed to scan the image. Make sure it contains a valid QR code.");
    }

    setLoading(false);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    decodeQR(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    decodeQR(file);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setImageSrc(null);
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // No image uploaded yet
  if (!imageSrc) {
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
        <div className="text-4xl mb-3">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-text-muted">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="3" height="3" />
            <rect x="18" y="14" width="3" height="3" />
            <rect x="14" y="18" width="3" height="3" />
            <rect x="18" y="18" width="3" height="3" />
          </svg>
        </div>
        <p className="text-text-secondary text-sm">Drop a QR code image or click to upload</p>
        <p className="text-text-muted text-xs mt-1">Also accepts camera photos</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4">
        {/* Image preview */}
        <div className="rounded-xl border border-border overflow-hidden bg-[#f0f0f0] flex items-center justify-center p-2">
          <img src={imageSrc} alt="QR code" className="max-w-full max-h-[240px] object-contain" />
        </div>

        {/* Result */}
        <div className="flex flex-col justify-center">
          {loading && (
            <p className="text-text-secondary text-sm">Scanning...</p>
          )}

          {error && (
            <div className="rounded-xl border border-error/30 bg-error/5 p-4">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs text-text-muted mb-1">Decoded content</p>
                <p className="font-mono text-sm text-text-primary break-all">{result}</p>
              </div>

              {isUrl(result) && (
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                >
                  Open link
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}

              <div className="flex gap-2">
                <Button size="sm" onClick={handleCopy}>
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button variant="secondary" size="sm" onClick={handleReset}>
                  Scan another
                </Button>
              </div>
            </div>
          )}

          {!loading && !error && !result && (
            <p className="text-text-muted text-sm">Processing image...</p>
          )}
        </div>
      </div>

      {/* Scan another at bottom if error */}
      {error && (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleReset}>
            Try another image
          </Button>
          <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
