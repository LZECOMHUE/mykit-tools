"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

const FONTS = [
  { label: "Sans", value: "Arial, sans-serif" },
  { label: "Serif", value: "Georgia, serif" },
  { label: "Mono", value: "Courier New, monospace" },
  { label: "Impact", value: "Impact, sans-serif" },
];

const POSITIONS = [
  { label: "Top", value: "top" },
  { label: "Center", value: "center" },
  { label: "Bottom", value: "bottom" },
];

const ALIGNS = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
];

export default function AddTextToImage() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const [text, setText] = useState("Your text here");
  const [fontSize, setFontSize] = useState(48);
  const [fontIdx, setFontIdx] = useState(0);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState("bottom");
  const [align, setAlign] = useState("center");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [stroke, setStroke] = useState(true);
  const [strokeColor, setStrokeColor] = useState("#000000");

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => setImage(img);
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

  const render = useCallback(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const w = image.width;
    const h = image.height;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    // Draw image
    ctx.drawImage(image, 0, 0);

    if (!text.trim()) return;

    // Scale font size relative to image (base is 800px width)
    const scale = Math.max(w, 400) / 800;
    const scaledSize = Math.round(fontSize * scale);

    // Build font string
    const fontStyle = italic ? "italic " : "";
    const fontWeight = bold ? "bold " : "";
    ctx.font = `${fontStyle}${fontWeight}${scaledSize}px ${FONTS[fontIdx].value}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;

    // Calculate text position
    const padding = scaledSize * 0.5;
    let x;
    if (align === "left") x = padding;
    else if (align === "right") x = w - padding;
    else x = w / 2;

    // Wrap text into lines
    const maxWidth = w - padding * 2;
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    // Handle explicit newlines
    const finalLines = [];
    for (const line of lines) {
      const parts = line.split("\n");
      finalLines.push(...parts);
    }

    const lineHeight = scaledSize * 1.2;
    const totalTextHeight = finalLines.length * lineHeight;

    let startY;
    if (position === "top") {
      startY = padding + scaledSize;
    } else if (position === "center") {
      startY = (h - totalTextHeight) / 2 + scaledSize;
    } else {
      startY = h - padding - totalTextHeight + scaledSize;
    }

    // Draw each line
    finalLines.forEach((line, i) => {
      const y = startY + i * lineHeight;
      if (stroke) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = Math.max(2, scaledSize / 15);
        ctx.lineJoin = "round";
        ctx.strokeText(line, x, y);
      }
      ctx.fillText(line, x, y);
    });
  }, [image, text, fontSize, fontIdx, color, position, align, bold, italic, stroke, strokeColor]);

  useEffect(() => { render(); }, [render]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${fileName || "image"}-text.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
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
          <div className="text-3xl mb-3">A</div>
          <p className="font-medium text-text-primary mb-1">Drop an image here or click to upload</p>
          <p className="text-sm text-text-muted">PNG, JPG, WebP - then add your text</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      )}

      {image && (
        <>
          {/* Text input */}
          <div>
            <textarea
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text..."
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-white text-text-primary text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
            />
          </div>

          {/* Controls */}
          <Card className="space-y-3">
            {/* Font family */}
            <div className="flex flex-wrap gap-1.5">
              {FONTS.map((f, i) => (
                <button
                  key={f.label}
                  onClick={() => setFontIdx(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    fontIdx === i
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                  style={{ fontFamily: f.value }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Font size */}
            <Slider
              label="Font Size"
              value={fontSize}
              onChange={setFontSize}
              min={12}
              max={120}
              step={1}
              formatValue={(v) => `${v}px`}
            />

            {/* Position and alignment */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-text-muted">Position:</span>
                {POSITIONS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPosition(p.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      position === p.value
                        ? "bg-accent text-white"
                        : "bg-surface text-text-secondary hover:bg-surface-hover"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-text-muted">Align:</span>
                {ALIGNS.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setAlign(a.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      align === a.value
                        ? "bg-accent text-white"
                        : "bg-surface text-text-secondary hover:bg-surface-hover"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Style toggles + colours */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setBold(!bold)}
                className={`w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${
                  bold ? "bg-accent text-white" : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                B
              </button>
              <button
                onClick={() => setItalic(!italic)}
                className={`w-8 h-8 rounded-lg text-sm italic flex items-center justify-center transition-all ${
                  italic ? "bg-accent text-white" : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                I
              </button>
              <button
                onClick={() => setStroke(!stroke)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  stroke ? "bg-accent text-white" : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                Stroke
              </button>

              <div className="flex items-center gap-1.5 ml-auto">
                <label className="flex items-center gap-1 text-xs text-text-secondary">
                  Fill
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-7 h-7 rounded border border-border cursor-pointer"
                  />
                </label>
                {stroke && (
                  <label className="flex items-center gap-1 text-xs text-text-secondary">
                    Outline
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="w-7 h-7 rounded border border-border cursor-pointer"
                    />
                  </label>
                )}
              </div>
            </div>
          </Card>

          {/* Preview */}
          <Card padding={false}>
            <canvas
              ref={canvasRef}
              className="w-full h-auto rounded-[var(--radius-card)]"
              style={{ display: "block" }}
            />
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleDownload}>Download PNG</Button>
            <Button variant="ghost" onClick={() => { setImage(null); setFileName(""); setText("Your text here"); }}>
              New Image
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
