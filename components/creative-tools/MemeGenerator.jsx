"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const GRADIENT_PRESETS = [
  { id: "white", label: "White", gradient: "white" },
  { id: "black", label: "Black", gradient: "black" },
  { id: "blue", label: "Blue Gradient", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: "sunset", label: "Sunset", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { id: "ocean", label: "Ocean", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
];

export default function MemeGenerator() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [fontSize, setFontSize] = useState("auto");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState("white");
  const [strokeWidth, setStrokeWidth] = useState(3);

  // Draw meme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    let canvasWidth = 600;
    let canvasHeight = 400;

    if (uploadedImage) {
      const ratio = uploadedImage.width / uploadedImage.height;
      canvasWidth = Math.min(uploadedImage.width, 800);
      canvasHeight = canvasWidth / ratio;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    // Draw background
    if (uploadedImage) {
      ctx.drawImage(uploadedImage, 0, 0, canvasWidth, canvasHeight);
      // Darken edges slightly for text readability
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    } else {
      // Draw gradient or solid background
      if (backgroundStyle === "white") {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      } else if (backgroundStyle === "black") {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      } else {
        // Handle gradient backgrounds
        const gradientPreset = GRADIENT_PRESETS.find((g) => g.id === backgroundStyle);
        if (gradientPreset && gradientPreset.gradient.includes("linear-gradient")) {
          // Parse and apply gradient
          const canvas2d = document.createElement("canvas");
          canvas2d.width = canvasWidth;
          canvas2d.height = canvasHeight;
          const ctx2d = canvas2d.getContext("2d");
          const grad = ctx2d.createLinearGradient(0, 0, canvasWidth, canvasHeight);
          // Simplified gradient application
          ctx.fillStyle = "#667eea";
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }
      }
    }

    // Calculate font size
    let calculatedFontSize = fontSize === "auto" ? Math.floor(canvasWidth / 12) : parseInt(fontSize);

    // Draw text with stroke
    ctx.font = `bold ${calculatedFontSize}px Impact, Arial`;
    ctx.textAlign = "center";
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = textColor;
    ctx.textBaseline = "middle";

    const padding = 20;
    const maxWidth = canvasWidth - padding * 2;

    // Draw top text
    drawWrappedText(ctx, topText.toUpperCase(), canvasWidth / 2, padding + calculatedFontSize, maxWidth, calculatedFontSize, true);

    // Draw bottom text
    drawWrappedText(ctx, bottomText.toUpperCase(), canvasWidth / 2, canvasHeight - padding, maxWidth, calculatedFontSize, false);
  }, [topText, bottomText, fontSize, textColor, strokeColor, uploadedImage, backgroundStyle, strokeWidth]);

  const drawWrappedText = (ctx, text, x, y, maxWidth, fontSize, isTop) => {
    const words = text.split(" ");
    let line = "";
    const lines = [];

    words.forEach((word) => {
      const testLine = line + (line ? " " : "") + word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    });
    lines.push(line);

    const lineHeight = fontSize * 1.2;
    const totalHeight = lines.length * lineHeight;
    let startY = isTop ? y : y - totalHeight + lineHeight;

    lines.forEach((lineText, index) => {
      const lineY = startY + index * lineHeight;
      ctx.strokeText(lineText, x, lineY);
      ctx.fillText(lineText, x, lineY);
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage(img);
      };
      img.src = event.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "meme.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetMeme = () => {
    setTopText("TOP TEXT");
    setBottomText("BOTTOM TEXT");
    setTextColor("#FFFFFF");
    setStrokeColor("#000000");
    setUploadedImage(null);
    setBackgroundStyle("white");
    setFontSize("auto");
    setStrokeWidth(3);
  };

  return (
    <div className="space-y-6">
      {/* Upload Image */}
      <Card className="bg-gradient-to-br from-pink-50 to-rose-50 space-y-4">
        <div>
          <label className="text-sm font-medium text-text-primary block mb-2">
            Background Image
          </label>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-3 border-2 border-dashed border-border rounded-lg hover:border-accent transition-colors text-text-secondary hover:text-text-primary"
          >
            {uploadedImage ? "Change Image" : "Upload Image"} or Choose Background
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {!uploadedImage && (
          <div>
            <label className="text-sm font-medium text-text-primary block mb-2">
              Quick Backgrounds
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {GRADIENT_PRESETS.slice(0, 5).map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setBackgroundStyle(preset.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                    backgroundStyle === preset.id
                      ? "border-accent-warm bg-accent-warm text-white"
                      : "border-border bg-white hover:border-accent"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Text Inputs */}
      <Card className="space-y-4">
        <Input
          label="Top Text"
          value={topText}
          onChange={(e) => setTopText(e.target.value.slice(0, 50))}
          maxLength={50}
          placeholder="TOP TEXT"
        />
        <Input
          label="Bottom Text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value.slice(0, 50))}
          maxLength={50}
          placeholder="BOTTOM TEXT"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text-primary block mb-2">
              Text Colour
            </label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer border border-border"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary block mb-2">
              Outline Colour
            </label>
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer border border-border"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text-primary block mb-2">
              Font Size
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border text-sm"
            >
              <option value="auto">Auto</option>
              <option value="30">Small</option>
              <option value="50">Medium</option>
              <option value="70">Large</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary block mb-2">
              Outline Width: {strokeWidth}
            </label>
            <input
              type="range"
              min="0"
              max="8"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* Canvas Preview */}
      <Card className="border-2 border-border bg-surface overflow-auto flex items-center justify-center p-0" padding={false}>
        <div className="inline-block max-w-full">
          <canvas
            ref={canvasRef}
            className="block max-w-full h-auto"
            style={{ maxWidth: "100%", height: "auto", display: "block" }}
          />
        </div>
      </Card>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          onClick={resetMeme}
          className="w-full"
          size="sm"
        >
          Reset
        </Button>
        <Button
          variant="primary"
          onClick={downloadMeme}
          className="w-full"
          size="sm"
        >
          Download Meme
        </Button>
      </div>

      <Card className="border-l-4 border-l-accent-warm bg-yellow-50">
        <p className="text-sm text-text-secondary">
          Create classic Impact-style memes with text outlines for readability. Upload an image or use a solid colour background. The text automatically wraps and scales to fit.
        </p>
      </Card>
    </div>
  );
}
