"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

export default function HeicToJpg() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(92);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // { url, blob, width, height }
  const [toast, setToast] = useState("");
  const fileInputRef = useRef(null);
  const prevUrlRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, []);

  const convert = async (inputFile, q) => {
    if (!inputFile) return;
    setConverting(true);
    setError("");
    setResult(null);

    // Clean up previous result
    if (prevUrlRef.current) {
      URL.revokeObjectURL(prevUrlRef.current);
      prevUrlRef.current = null;
    }

    try {
      let blob;

      // Try heic2any first (handles HEIC in all browsers)
      try {
        const heic2any = (await import("heic2any")).default;
        blob = await heic2any({
          blob: inputFile,
          toType: "image/jpeg",
          quality: q / 100,
        });
        // heic2any may return an array
        if (Array.isArray(blob)) blob = blob[0];
      } catch (heicErr) {
        // heic2any not available or failed - try native browser support
        blob = await new Promise((resolve, reject) => {
          const img = new window.Image();
          const url = URL.createObjectURL(inputFile);
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
              (b) => {
                URL.revokeObjectURL(url);
                if (b) resolve(b);
                else reject(new Error("Canvas export failed"));
              },
              "image/jpeg",
              q / 100
            );
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("BROWSER_NO_HEIC"));
          };
          img.src = url;
        });
      }

      // Create preview
      const url = URL.createObjectURL(blob);
      prevUrlRef.current = url;

      // Get dimensions
      const img = new window.Image();
      img.onload = () => {
        setResult({ url, blob, width: img.width, height: img.height });
        setConverting(false);
      };
      img.onerror = () => {
        setResult({ url, blob, width: 0, height: 0 });
        setConverting(false);
      };
      img.src = url;
    } catch (err) {
      setConverting(false);
      if (err.message === "BROWSER_NO_HEIC") {
        setError(
          "Your browser doesn't support HEIC natively. Try Safari, or the heic2any package can be added for full browser support."
        );
      } else {
        setError("Conversion failed - " + (err.message || "Unknown error"));
      }
    }
  };

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    setError("");
    convert(f, quality);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const reconvert = () => {
    if (file) convert(file, quality);
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    const name = (file?.name || "image").replace(/\.(heic|heif)$/i, "");
    a.download = `${name}.jpg`;
    a.click();
    showToast("Downloaded!");
  };

  const savings = file && result ? file.size - result.blob.size : 0;
  const savingsPct = file && result && file.size > 0 ? Math.round((savings / file.size) * 100) : 0;

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg animate-fade-in">
          {toast}
        </div>
      )}

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors"
        >
          <div className="text-4xl mb-2">+</div>
          <p className="text-text-secondary text-sm">Drop a HEIC file or click to upload</p>
          <p className="text-text-muted text-xs mt-1">iPhone photos in HEIC/HEIF format</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* File info + quality */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary font-medium truncate">{file.name}</p>
              <p className="text-xs text-text-muted font-mono">{formatBytes(file.size)}</p>
            </div>
            <div className="flex items-center gap-2 w-48">
              <span className="text-xs text-text-muted">Quality</span>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="flex-1 h-2 bg-border rounded-full appearance-none cursor-pointer accent-accent"
              />
              <span className="text-xs font-mono text-text-secondary w-7 text-right">{quality}</span>
            </div>
            <Button onClick={reconvert} size="sm" variant="secondary" disabled={converting}>
              {converting ? "Converting..." : "Reconvert"}
            </Button>
            <button
              onClick={() => { setFile(null); setResult(null); setError(""); }}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover transition-colors"
            >
              Change File
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Converting */}
          {converting && (
            <div className="flex items-center justify-center py-4 text-text-muted text-sm">
              Converting...
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-3">
              {/* Preview */}
              <div className="rounded-lg border border-border overflow-hidden bg-surface">
                <img
                  src={result.url}
                  alt="Converted"
                  className="max-w-full max-h-80 mx-auto block"
                />
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div>
                  <span className="text-text-muted">Size: </span>
                  <span className="font-mono text-text-primary">{formatBytes(result.blob.size)}</span>
                </div>
                {result.width > 0 && (
                  <div>
                    <span className="text-text-muted">Dimensions: </span>
                    <span className="font-mono text-text-primary">{result.width} x {result.height}</span>
                  </div>
                )}
                {savings > 0 && (
                  <div>
                    <span className="text-text-muted">Saved: </span>
                    <span className="font-mono text-green-600">{formatBytes(savings)} ({savingsPct}%)</span>
                  </div>
                )}
                {savings < 0 && (
                  <div>
                    <span className="text-text-muted">Size increase: </span>
                    <span className="font-mono text-amber-600">{formatBytes(Math.abs(savings))}</span>
                  </div>
                )}
                <Button onClick={download} className="ml-auto">
                  Download JPG
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/heic,image/heif,.heic,.heif"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
      />
    </div>
  );
}
