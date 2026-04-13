"use client";

import { useState, useRef } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const OUTPUT_FORMATS = [
  { label: "PNG", mime: "image/png" },
  { label: "JPG", mime: "image/jpeg" },
  { label: "WebP", mime: "image/webp" },
];

export default function ImageToBase64() {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState("");
  const [dataUri, setDataUri] = useState("");
  const [showDataUri, setShowDataUri] = useState(true);
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
    const rawBase64 = fullDataUri.split(",")[1] || "";

    setDataUri(fullDataUri);
    setBase64(rawBase64);
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

  const currentOutput = showDataUri ? dataUri : base64;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentOutput).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
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
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                  setBase64("");
                  setDataUri("");
                }}
              >
                Clear
              </Button>
            </div>
          </Card>

          {/* Output format + mode toggle */}
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
            <span className="text-border">|</span>
            <button
              onClick={() => setShowDataUri(true)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                showDataUri
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              Data URI
            </button>
            <button
              onClick={() => setShowDataUri(false)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                !showDataUri
                  ? "bg-accent text-white"
                  : "bg-surface text-text-secondary hover:bg-surface-hover"
              }`}
            >
              Base64 Only
            </button>
          </div>

          {/* Output */}
          <Card>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-text-primary">
                {showDataUri ? "Data URI" : "Base64 String"}
              </p>
              <span className="text-xs font-mono text-text-muted">
                {currentOutput.length.toLocaleString()} chars
              </span>
            </div>
            <textarea
              value={currentOutput}
              readOnly
              rows={8}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-surface placeholder:text-text-muted focus:outline-none resize-y font-mono text-xs break-all"
              style={{ wordBreak: "break-all" }}
            />
          </Card>

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
