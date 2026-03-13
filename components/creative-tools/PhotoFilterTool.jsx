"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const FILTER_PRESETS = {
  original: {
    name: "Original",
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    hueRotate: 0,
    invert: 0,
  },
  vintage: {
    name: "Vintage",
    brightness: 90,
    contrast: 120,
    saturation: 80,
    blur: 0,
    grayscale: 0,
    sepia: 60,
    hueRotate: 0,
    invert: 0,
  },
  bw: {
    name: "B+W",
    brightness: 100,
    contrast: 100,
    saturation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    hueRotate: 0,
    invert: 0,
  },
  vivid: {
    name: "Vivid",
    brightness: 100,
    contrast: 120,
    saturation: 150,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    hueRotate: 0,
    invert: 0,
  },
  warm: {
    name: "Warm",
    brightness: 105,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    hueRotate: 0,
    invert: 0,
  },
  cool: {
    name: "Cool",
    brightness: 100,
    contrast: 100,
    saturation: 80,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    hueRotate: 180,
    invert: 0,
  },
  dramatic: {
    name: "Dramatic",
    brightness: 80,
    contrast: 150,
    saturation: 120,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    hueRotate: 0,
    invert: 0,
  },
};

export default function PhotoFilterTool() {
  const canvasRef = useRef(null);
  const originalImageRef = useRef(null);
  const fileInputRef = useRef(null);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [filters, setFilters] = useState(FILTER_PRESETS.original);
  const [showComparison, setShowComparison] = useState(false);

  // Apply filters to canvas
  useEffect(() => {
    if (!uploadedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size to match image
    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;

    // Draw original image
    ctx.drawImage(uploadedImage, 0, 0);

    // Apply filters
    const filterString = `
      brightness(${filters.brightness}%)
      contrast(${filters.contrast}%)
      saturate(${filters.saturation}%)
      blur(${filters.blur}px)
      grayscale(${filters.grayscale}%)
      sepia(${filters.sepia}%)
      hue-rotate(${filters.hueRotate}deg)
      invert(${filters.invert}%)
    `;

    canvas.style.filter = filterString;
  }, [uploadedImage, filters]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage(img);
        originalImageRef.current = img;
      };
      img.src = event.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const updateFilter = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const applyPreset = (presetKey) => {
    setFilters(FILTER_PRESETS[presetKey]);
  };

  const resetAll = () => {
    setFilters(FILTER_PRESETS.original);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "filtered-photo.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Upload Image */}
      <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 space-y-4">
        <div>
          <label className="text-sm font-medium text-text-primary block mb-2">
            Upload Photo
          </label>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-3 border-2 border-dashed border-border rounded-lg hover:border-accent transition-colors text-text-secondary hover:text-text-primary font-medium"
          >
            {uploadedImage ? "Change Photo" : "Click to Upload"} or Drag and Drop
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </Card>

      {uploadedImage && (
        <>
          {/* Quick Presets */}
          <Card className="space-y-3">
            <h3 className="font-medium text-text-primary">Quick Filters</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(FILTER_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                    JSON.stringify(filters) === JSON.stringify(preset)
                      ? "bg-accent text-white border-accent"
                      : "bg-white border-border hover:border-accent"
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </Card>

          {/* Filter Controls */}
          <Card className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-text-primary">
                    Brightness
                  </label>
                  <span className="text-xs text-text-muted">{filters.brightness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.brightness}
                  onChange={(e) => updateFilter("brightness", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-text-primary">
                    Contrast
                  </label>
                  <span className="text-xs text-text-muted">{filters.contrast}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.contrast}
                  onChange={(e) => updateFilter("contrast", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-text-primary">
                    Saturation
                  </label>
                  <span className="text-xs text-text-muted">{filters.saturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.saturation}
                  onChange={(e) => updateFilter("saturation", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-text-primary">
                    Blur
                  </label>
                  <span className="text-xs text-text-muted">{filters.blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={filters.blur}
                  onChange={(e) => updateFilter("blur", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-text-primary">
                    Grayscale
                  </label>
                  <span className="text-xs text-text-muted">{filters.grayscale}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.grayscale}
                  onChange={(e) => updateFilter("grayscale", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-text-primary">
                    Sepia
                  </label>
                  <span className="text-xs text-text-muted">{filters.sepia}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.sepia}
                  onChange={(e) => updateFilter("sepia", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-text-primary">
                    Hue Rotate
                  </label>
                  <span className="text-xs text-text-muted">{filters.hueRotate}deg</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={filters.hueRotate}
                  onChange={(e) => updateFilter("hueRotate", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-text-primary">
                    Invert
                  </label>
                  <span className="text-xs text-text-muted">{filters.invert}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.invert}
                  onChange={(e) => updateFilter("invert", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          {/* Comparison Toggle */}
          <Card>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="w-full px-4 py-2 rounded-lg border border-border hover:bg-surface transition-colors font-medium text-sm"
            >
              {showComparison ? "Hide" : "Show"} Before/After Comparison
            </button>
          </Card>

          {/* Canvas Preview */}
          <Card className="border-2 border-border bg-surface overflow-auto flex items-center justify-center p-0" padding={false}>
            {showComparison ? (
              <div className="flex w-full">
                <div className="flex-1 border-r border-border">
                  <img
                    src={originalImageRef.current?.src}
                    alt="Original"
                    style={{ maxWidth: "100%", height: "auto", display: "block" }}
                  />
                </div>
                <div className="flex-1">
                  <canvas
                    ref={canvasRef}
                    style={{ maxWidth: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                style={{ maxWidth: "100%", height: "auto", display: "block" }}
              />
            )}
          </Card>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              onClick={resetAll}
              className="w-full"
              size="sm"
            >
              Reset All
            </Button>
            <Button
              variant="primary"
              onClick={downloadImage}
              className="w-full"
              size="sm"
            >
              Download
            </Button>
          </div>
        </>
      )}

      {!uploadedImage && (
        <Card className="border-l-4 border-l-accent bg-blue-50 text-center py-8">
          <p className="text-text-secondary">Upload a photo to start applying filters</p>
        </Card>
      )}

      {uploadedImage && (
        <Card className="border-l-4 border-l-accent-warm bg-yellow-50">
          <p className="text-sm text-text-secondary">
            Adjust sliders to apply filters in real-time. Use quick filter presets for instant effects or fine-tune each filter individually. Compare before and after side-by-side.
          </p>
        </Card>
      )}
    </div>
  );
}
