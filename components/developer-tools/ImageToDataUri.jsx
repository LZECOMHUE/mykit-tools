"use client";

import { useState, useRef } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const OUTPUT_FORMATS = [
  { label: "PNG", mime: "image/png" },
  { label: "JPG", mime: "image/jpeg" },
  { label: "WebP", mime: "image/webp" },
];

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function ImageToDataUri() {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dataUri, setDataUri] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [outputFormat, setOutputFormat] = useState("image/png");
  const [copied, setCopied] = useState(false);

  const convertToFormat = (img, mime) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");

    if (mime === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(img, 0, 0);
    const fullDataUri = canvas.toDataURL(mime, 0.92);
    setDataUri(fullDataUri);
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        setImage(img);
        setPreview(ev.target?.result);
        convertToFormat(img, outputFormat);
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

  const handleFormatChange = (mime) => {
    setOutputFormat(mime);
    if (image) convertToFormat(image, mime);
  };

  const handleCopy = async () => {
    if (!dataUri) return;
    try {
      await navigator.clipboard.writeText(dataUri).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  // Estimate raw base64 size vs original
  const dataUriLen = dataUri.length;
  const base64Bytes = dataUri ? Math.ceil(((dataUri.split(",")[1] || "").length * 3) / 4) : 0;
  const overhead = originalSize > 0 && base64Bytes > 0
    ? Math.round(((base64Bytes - originalSize) / originalSize) * 100)
    : null;

  return (
    <div className="space-y-4">
      {!image && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full px-6 py-12 border-2 border-dashed border-border rounded-[var(--radius-card)] cursor-pointer hover:border-accent hover:bg-surface transition-all text-center"
        >
          <div className="text-3xl mb-3">{`</>`}</div>
          <p className="font-medium text-text-primary mb-1">
            Drop an image here or click to upload
          </p>
          <p className="text-sm text-text-muted">
            PNG, JPG, WebP, GIF, or any image format
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      )}

      {image && (
        <>
          {/* Preview */}
          <Card>
            <div className="flex items-start gap-4">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-contain rounded-[var(--radius-input)] border border-border bg-surface"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">Image Loaded</p>
                <p className="text-xs text-text-muted mt-1">
                  <span className="font-mono">{image.width} x {image.height}</span> px
                  {" - "}
                  <span className="font-mono">{formatBytes(originalSize)}</span> original
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                  setDataUri("");
                  setOriginalSize(0);
                }}
              >
                Clear
              </Button>
            </div>
          </Card>

          {/* Output format pills */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-text-muted">Encode as</span>
            {OUTPUT_FORMATS.map((f) => (
              <button
                key={f.mime}
                onClick={() => handleFormatChange(f.mime)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  outputFormat === f.mime
                    ? "bg-accent text-white"
                    : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Output */}
          <Card>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-text-primary">Data URI</p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-text-muted">
                  {dataUriLen.toLocaleString()} chars
                </span>
                {overhead !== null && (
                  <span className="text-xs font-mono text-text-muted">
                    ~{overhead > 0 ? "+" : ""}{overhead}% vs raw
                  </span>
                )}
              </div>
            </div>
            <textarea
              value={dataUri}
              readOnly
              rows={8}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-surface placeholder:text-text-muted focus:outline-none resize-y font-mono text-xs break-all"
              style={{ wordBreak: "break-all" }}
            />
          </Card>

          {/* Size info */}
          {dataUri && (
            <Card>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Original File</p>
                  <p className="font-mono text-base text-text-primary">{formatBytes(originalSize)}</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-text-muted text-lg">&rarr;</span>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Data URI Size</p>
                  <p className="font-mono text-base text-text-primary">{formatBytes(dataUriLen)}</p>
                  <p className="text-xs text-text-muted mt-0.5">as text</p>
                </div>
              </div>
            </Card>
          )}

          <div className="flex gap-2">
            <Button onClick={handleCopy}>
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
