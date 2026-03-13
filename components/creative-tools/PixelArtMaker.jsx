"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const PALETTE = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00",
  "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FFA500", "#800080", "#FFC0CB", "#A52A2A",
  "#808080", "#008000", "#000080", "#FFD700"
];

export default function PixelArtMaker() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [gridSize, setGridSize] = useState(16);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen"); // pen, eraser, fill
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [recentColors, setRecentColors] = useState([]);
  const [showCustomColor, setShowCustomColor] = useState(false);

  // Initialize grid
  useEffect(() => {
    const canvas = canvasRef.current;
    const pixelSize = 20;
    const size = gridSize * pixelSize;

    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, size, size);
    drawGrid(context, gridSize, pixelSize);

    // Initialize history
    setHistory([canvas.toDataURL()]);
    setHistoryStep(0);
  }, [gridSize]);

  const pixelSize = 20;

  const drawGrid = (context, gridCount, pxSize) => {
    context.strokeStyle = "#e5e5e5";
    context.lineWidth = 1;
    const size = gridCount * pxSize;
    for (let i = 0; i <= gridCount; i++) {
      context.beginPath();
      context.moveTo(i * pxSize, 0);
      context.lineTo(i * pxSize, size);
      context.stroke();

      context.beginPath();
      context.moveTo(0, i * pxSize);
      context.lineTo(size, i * pxSize);
      context.stroke();
    }
  };

  const getPixelCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / (canvas.width / gridSize));
    const y = Math.floor((e.clientY - rect.top) / (canvas.height / gridSize));
    return { x, y };
  };

  const getPixelCoordsTouch = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.touches[0].clientX - rect.left) / (canvas.width / gridSize));
    const y = Math.floor((e.touches[0].clientY - rect.top) / (canvas.height / gridSize));
    return { x, y };
  };

  const paintPixel = (x, y, color) => {
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = color;
    context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    context.strokeStyle = "#e5e5e5";
    context.lineWidth = 1;
    context.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  };

  const floodFill = (startX, startY, newColor) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(
      startX * pixelSize,
      startY * pixelSize,
      pixelSize,
      pixelSize
    );
    const startPixel = imageData.data;
    const startColor = `rgb(${startPixel[0]},${startPixel[1]},${startPixel[2]})`;

    if (startColor === newColor) return;

    const queue = [[startX, startY]];
    const visited = new Set();

    while (queue.length > 0) {
      const [x, y] = queue.shift();
      const key = `${x},${y}`;

      if (visited.has(key) || x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
        continue;
      }

      const pixelImageData = context.getImageData(
        x * pixelSize,
        y * pixelSize,
        pixelSize,
        pixelSize
      );
      const pixel = pixelImageData.data;
      const pixelColor = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

      if (pixelColor !== startColor) continue;

      visited.add(key);
      paintPixel(x, y, newColor);

      queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
  };

  const handleCanvasDown = (e) => {
    setIsDrawing(true);
    const { x, y } = e.touches ? getPixelCoordsTouch(e) : getPixelCoords(e);

    if (tool === "fill") {
      floodFill(x, y, selectedColor);
    } else {
      const color = tool === "eraser" ? "white" : selectedColor;
      paintPixel(x, y, color);
    }
  };

  const handleCanvasMove = (e) => {
    if (!isDrawing || tool === "fill") return;
    e.preventDefault();
    const { x, y } = e.touches ? getPixelCoordsTouch(e) : getPixelCoords(e);
    const color = tool === "eraser" ? "white" : selectedColor;
    paintPixel(x, y, color);
  };

  const handleCanvasUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      restoreFromHistory(newStep);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      restoreFromHistory(newStep);
    }
  };

  const restoreFromHistory = (step) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);
    };
    img.src = history[step];
  };

  const clearAll = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(context, gridSize, pixelSize);
    saveToHistory();
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    const exportSize = 512;
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = exportSize;
    exportCanvas.height = exportSize;
    const exportContext = exportCanvas.getContext("2d");

    // Draw pixels at higher resolution without grid
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const source = canvas.getContext("2d").getImageData(
          x * pixelSize,
          y * pixelSize,
          pixelSize,
          pixelSize
        );
        const pxlSize = exportSize / gridSize;
        exportContext.fillStyle = `rgb(${source.data[0]},${source.data[1]},${source.data[2]})`;
        exportContext.fillRect(x * pxlSize, y * pxlSize, pxlSize, pxlSize);
      }
    }

    const link = document.createElement("a");
    link.href = exportCanvas.toDataURL("image/png");
    link.download = "pixel-art.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addColorToRecent = (color) => {
    if (color.startsWith("#")) {
      setRecentColors((prev) => {
        const filtered = prev.filter((c) => c !== color);
        return [color, ...filtered].slice(0, 6);
      });
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    addColorToRecent(color);
  };

  return (
    <div className="space-y-6">
      {/* Grid Size and Tool Selection */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 space-y-4">
        <div>
          <label className="text-sm font-medium text-text-primary block mb-2">
            Grid Size
          </label>
          <div className="flex gap-2">
            {[8, 16, 32].map((size) => (
              <button
                key={size}
                onClick={() => setGridSize(size)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  gridSize === size
                    ? "bg-accent text-white"
                    : "bg-white border border-border hover:border-accent"
                }`}
              >
                {size}x{size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-text-primary block mb-2">
            Tools
          </label>
          <div className="flex gap-2">
            {[
              { id: "pen", emoji: "✏️", label: "Pen" },
              { id: "eraser", emoji: "🧹", label: "Eraser" },
              { id: "fill", emoji: "🪣", label: "Fill" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`px-3 py-2 rounded-lg border transition-all text-sm font-medium ${
                  tool === t.id
                    ? "bg-accent-warm text-white border-accent-warm"
                    : "bg-white border-border hover:border-accent"
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Colour Palette */}
      <Card className="space-y-3">
        <div>
          <label className="text-sm font-medium text-text-primary block mb-2">
            Palette
          </label>
          <div className="flex flex-wrap gap-2">
            {PALETTE.map((color) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`w-8 h-8 rounded-lg border-2 transition-transform ${
                  selectedColor === color
                    ? "border-text-primary scale-110"
                    : "border-border hover:scale-105"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {recentColors.length > 0 && (
          <div>
            <label className="text-sm font-medium text-text-primary block mb-2">
              Recent
            </label>
            <div className="flex flex-wrap gap-2">
              {recentColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-transform ${
                    selectedColor === color
                      ? "border-text-primary scale-110"
                      : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowCustomColor(!showCustomColor)}
          className="text-sm text-accent hover:text-accent-hover font-medium"
        >
          {showCustomColor ? "Hide" : "Custom Color"}
        </button>

        {showCustomColor && (
          <div className="flex gap-2">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => handleColorSelect(e.target.value)}
              className="w-12 h-10 rounded-lg cursor-pointer"
            />
            <span className="text-sm text-text-secondary flex items-center">
              {selectedColor}
            </span>
          </div>
        )}
      </Card>

      {/* Canvas */}
      <Card
        className="border-2 border-border bg-white overflow-auto flex items-center justify-center p-0"
        padding={false}
      >
        <div
          ref={containerRef}
          className="inline-block touch-none"
          style={{
            imageRendering: "pixelated",
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleCanvasDown}
            onMouseMove={handleCanvasMove}
            onMouseUp={handleCanvasUp}
            onMouseLeave={handleCanvasUp}
            onTouchStart={handleCanvasDown}
            onTouchMove={handleCanvasMove}
            onTouchEnd={handleCanvasUp}
            className="cursor-crosshair block border border-border"
            style={{
              imageRendering: "pixelated",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </Card>

      {/* Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Button
          variant="secondary"
          onClick={undo}
          disabled={historyStep <= 0}
          size="sm"
          className="w-full"
        >
          Undo
        </Button>
        <Button
          variant="secondary"
          onClick={redo}
          disabled={historyStep >= history.length - 1}
          size="sm"
          className="w-full"
        >
          Redo
        </Button>
        <Button
          variant="secondary"
          onClick={clearAll}
          size="sm"
          className="w-full col-span-1"
        >
          Clear
        </Button>
        <Button
          variant="primary"
          onClick={downloadArt}
          size="sm"
          className="w-full col-span-1"
        >
          Download
        </Button>
      </div>

      <Card className="border-l-4 border-l-accent-warm bg-yellow-50">
        <p className="text-sm text-text-secondary">
          Use the pen to draw, eraser to remove pixels, and fill tool to flood-fill areas with a colour. Undo and redo to refine your art. Downloaded images are clean and crisp.
        </p>
      </Card>
    </div>
  );
}
