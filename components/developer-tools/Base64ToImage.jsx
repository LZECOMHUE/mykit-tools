"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

const PLACEHOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...";

export default function Base64ToImage() {
  const [input, setInput] = useState("");
  const [dimensions, setDimensions] = useState(null);

  const { data: imageData, error } = useMemo(() => {
    if (!input.trim()) return { data: null, error: "" };

    const trimmed = input.trim();

    // If it already looks like a data URI, use as-is
    if (trimmed.startsWith("data:image/")) {
      return { data: trimmed, error: "" };
    }

    // Try to detect if it is raw base64 - assume PNG if no prefix
    try {
      // Validate base64 by checking character set
      const cleaned = trimmed.replace(/\s/g, "");
      if (!/^[A-Za-z0-9+/=]+$/.test(cleaned)) {
        return { data: null, error: "Invalid base64 string - contains non-base64 characters." };
      }
      // Attempt to decode to verify validity
      atob(cleaned);
      return { data: `data:image/png;base64,${cleaned}`, error: "" };
    } catch {
      return { data: null, error: "Invalid base64 string - could not decode." };
    }
  }, [input]);

  // Detect format from data URI
  const detectedFormat = useMemo(() => {
    if (!imageData) return null;
    if (imageData.includes("image/png")) return "PNG";
    if (imageData.includes("image/jpeg")) return "JPG";
    if (imageData.includes("image/webp")) return "WebP";
    if (imageData.includes("image/gif")) return "GIF";
    if (imageData.includes("image/svg")) return "SVG";
    return "PNG";
  }, [imageData]);

  const estimatedSize = useMemo(() => {
    if (!input.trim()) return null;
    const cleaned = input.trim().replace(/\s/g, "");
    // Remove data URI prefix for size estimation
    const base64Part = cleaned.includes(",") ? cleaned.split(",")[1] : cleaned;
    if (!base64Part) return null;
    // Base64 encodes 3 bytes into 4 chars
    const bytes = Math.floor((base64Part.length * 3) / 4);
    return bytes;
  }, [input]);

  const [renderError, setRenderError] = useState("");

  const handleImageLoad = (e) => {
    setDimensions({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight,
    });
    setRenderError("");
  };

  const handleImageError = () => {
    setRenderError("Could not render image - the base64 data may be corrupted or not a valid image.");
    setDimensions(null);
  };

  const handleDownload = () => {
    if (!imageData) return;
    const ext = (detectedFormat || "png").toLowerCase();
    const link = document.createElement("a");
    link.download = `decoded-image.${ext === "jpg" ? "jpg" : ext}`;
    link.href = imageData;
    link.click();
  };

  return (
    <div className="space-y-4">
      <Card>
        <label className="text-sm font-medium text-text-primary block mb-2">
          Paste Base64 String
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={6}
          className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-y font-mono text-xs"
          style={{ wordBreak: "break-all" }}
        />
        <p className="text-xs text-text-muted mt-1">
          Accepts both data URIs (data:image/png;base64,...) and raw base64 strings.
        </p>
      </Card>

      {/* Error */}
      {(error || renderError) && (
        <Card className="border-red-300 bg-red-50">
          <div className="flex items-start gap-2">
            <span className="text-lg">!</span>
            <p className="text-sm text-red-700">{error || renderError}</p>
          </div>
        </Card>
      )}

      {/* Image info and preview */}
      {imageData && !error && !renderError && (
        <>
          <Card>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              {detectedFormat && (
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide">Format</p>
                  <p className="font-mono text-lg text-text-primary">{detectedFormat}</p>
                </div>
              )}
              {dimensions && (
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide">Dimensions</p>
                  <p className="font-mono text-lg text-text-primary">
                    {dimensions.width} x {dimensions.height}
                  </p>
                </div>
              )}
              {estimatedSize && (
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wide">Est. Size</p>
                  <p className="font-mono text-lg text-text-primary">
                    {formatBytes(estimatedSize)}
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card padding={false}>
            <img
              src={imageData}
              alt="Decoded"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className="max-w-full rounded-[var(--radius-card)] bg-[repeating-conic-gradient(#e5e5e5_0%_25%,transparent_0%_50%)] bg-[length:16px_16px]"
            />
          </Card>

          <div className="flex gap-2">
            <Button onClick={handleDownload}>Download Image</Button>
            <Button
              variant="ghost"
              onClick={() => {
                setInput("");
                setDimensions(null);
                setRenderError("");
              }}
            >
              Clear
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
