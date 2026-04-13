"use client";

import { useState, useRef, useCallback } from "react";
import Card from "@/components/ui/Card";

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function ImageUploader({ onImageLoad, accept = "image/*", children }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;

    setFileInfo({ name: file.name, size: file.size, type: file.type });

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setFileInfo((prev) => prev ? { ...prev, width: img.width, height: img.height } : null);
        onImageLoad?.(img, file);
      };
      img.src = e.target?.result;
    };
    reader.readAsDataURL(file);
  }, [onImageLoad]);

  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) processFile(file);
  };

  const handlePaste = useCallback((e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        processFile(item.getAsFile());
        return;
      }
    }
  }, [processFile]);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const reset = () => {
    setFileInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div onPaste={handlePaste}>
      {!fileInfo ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full px-6 py-12 border-2 border-dashed rounded-[var(--radius-card)] cursor-pointer transition-all text-center ${
            dragActive
              ? "border-accent bg-accent/5"
              : "border-border hover:border-accent hover:bg-surface"
          }`}
        >
          <div className="text-3xl mb-3">🖼</div>
          <p className="font-medium text-text-primary mb-1">
            Drop an image here, click to upload, or paste
          </p>
          <p className="text-sm text-text-muted">PNG, JPG, WebP, GIF - any size</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* File info bar */}
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-surface rounded-[var(--radius-input)] border border-border">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg flex-shrink-0">🖼</span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{fileInfo.name}</p>
                <p className="text-xs text-text-muted font-mono">
                  {fileInfo.width && fileInfo.height
                    ? `${fileInfo.width} x ${fileInfo.height}px`
                    : "Loading..."}{" "}
                  - {formatFileSize(fileInfo.size)}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); reset(); }}
              className="text-xs text-text-muted hover:text-error transition-colors flex-shrink-0 px-2 py-1 rounded hover:bg-red-50"
            >
              Remove
            </button>
          </div>

          {/* Tool-specific controls + canvas rendered by parent */}
          {children}

          {/* Hidden file input for "change image" */}
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

export { formatFileSize };
