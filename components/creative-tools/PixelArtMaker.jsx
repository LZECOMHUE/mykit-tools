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
  const [showGenerateMenu, setShowGenerateMenu] = useState(false);

  // ---- Generators ----
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateRandom = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#FFD700", "#FF6347", "#32CD32", "#1E90FF"];
    const density = 0.35 + Math.random() * 0.3;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (Math.random() < density) {
          ctx.fillStyle = randomFrom(colors);
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }
    drawGrid(ctx, gridSize, pixelSize);
    saveToHistory();
  };

  const generateFace = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const mid = Math.floor(gridSize / 2);
    const skinTones = ["#FFDAB9", "#F5DEB3", "#DEB887", "#D2B48C", "#C68642", "#8D5524"];
    const hairColors = ["#2C1B0E", "#4A2912", "#8B4513", "#DAA520", "#FF4500", "#B22222", "#1a1a1a"];
    const eyeColors = ["#1E90FF", "#228B22", "#8B4513", "#2F4F4F", "#4B0082"];
    const skin = randomFrom(skinTones);
    const hair = randomFrom(hairColors);
    const eyes = randomFrom(eyeColors);
    const mouthColor = "#CC3333";

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // face oval
    const faceR = Math.floor(gridSize * 0.3);
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const dx = x - mid;
        const dy = y - mid;
        if (dx * dx + (dy * 1.2) * (dy * 1.2) < faceR * faceR) {
          ctx.fillStyle = skin;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    // hair on top
    const hairY = mid - faceR;
    for (let x = mid - faceR; x <= mid + faceR; x++) {
      for (let row = hairY - 2; row <= hairY + 1; row++) {
        if (x >= 0 && x < gridSize && row >= 0 && row < gridSize) {
          ctx.fillStyle = hair;
          ctx.fillRect(x * pixelSize, row * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    // eyes
    const eyeY = mid - Math.floor(faceR * 0.25);
    const eyeSpread = Math.max(1, Math.floor(faceR * 0.45));
    [mid - eyeSpread, mid + eyeSpread].forEach((ex) => {
      if (ex >= 0 && ex < gridSize && eyeY >= 0 && eyeY < gridSize) {
        ctx.fillStyle = eyes;
        ctx.fillRect(ex * pixelSize, eyeY * pixelSize, pixelSize, pixelSize);
      }
    });

    // mouth
    const mouthY = mid + Math.floor(faceR * 0.45);
    const mouthW = Math.max(1, Math.floor(faceR * 0.5));
    for (let mx = mid - mouthW; mx <= mid + mouthW; mx++) {
      if (mx >= 0 && mx < gridSize && mouthY >= 0 && mouthY < gridSize) {
        ctx.fillStyle = mouthColor;
        ctx.fillRect(mx * pixelSize, mouthY * pixelSize, pixelSize, pixelSize);
      }
    }

    drawGrid(ctx, gridSize, pixelSize);
    saveToHistory();
  };

  const generatePattern = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const patterns = ["checker", "stripes", "diamonds", "zigzag", "dots"];
    const pat = randomFrom(patterns);
    const c1 = randomFrom(PALETTE.filter((c) => c !== "#FFFFFF"));
    const c2 = randomFrom(PALETTE.filter((c) => c !== c1 && c !== "#FFFFFF"));

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        let fill = null;
        if (pat === "checker") {
          fill = (x + y) % 2 === 0 ? c1 : c2;
        } else if (pat === "stripes") {
          fill = (x + y) % 4 < 2 ? c1 : c2;
        } else if (pat === "diamonds") {
          const cx = Math.abs(x - gridSize / 2);
          const cy = Math.abs(y - gridSize / 2);
          fill = (Math.floor(cx + cy) % 4 < 2) ? c1 : c2;
        } else if (pat === "zigzag") {
          fill = ((x + Math.floor(y / 2)) % 3 === 0) ? c1 : ((x + Math.floor(y / 2)) % 3 === 1 ? c2 : null);
        } else if (pat === "dots") {
          fill = (x % 3 === 0 && y % 3 === 0) ? c1 : null;
        }
        if (fill) {
          ctx.fillStyle = fill;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }
    drawGrid(ctx, gridSize, pixelSize);
    saveToHistory();
  };

  const generateSymmetric = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const palette = [
      randomFrom(PALETTE.filter((c) => c !== "#FFFFFF")),
      randomFrom(PALETTE.filter((c) => c !== "#FFFFFF")),
      randomFrom(PALETTE.filter((c) => c !== "#FFFFFF")),
    ];
    const half = Math.ceil(gridSize / 2);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // generate left half, mirror to right (like spaceship/character sprites)
    for (let x = 0; x < half; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (Math.random() < 0.45) {
          const color = randomFrom(palette);
          ctx.fillStyle = color;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
          // mirror
          const mx = gridSize - 1 - x;
          ctx.fillRect(mx * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }
    drawGrid(ctx, gridSize, pixelSize);
    saveToHistory();
  };

  const generateLandscape = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const skyColors = ["#87CEEB", "#6BB3D9", "#5DA8D1", "#4A9BC7"];
    const groundColors = ["#228B22", "#2E8B57", "#3CB371", "#32CD32"];
    const horizon = Math.floor(gridSize * 0.55) + randomInt(-2, 2);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (y < horizon) {
          // sky gradient
          const shade = Math.min(skyColors.length - 1, Math.floor((y / horizon) * skyColors.length));
          ctx.fillStyle = skyColors[shade];
        } else {
          ctx.fillStyle = randomFrom(groundColors);
        }
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }

    // sun
    const sunX = randomInt(2, gridSize - 3);
    const sunY = randomInt(1, Math.floor(horizon * 0.5));
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const sx = sunX + dx;
        const sy = sunY + dy;
        if (sx >= 0 && sx < gridSize && sy >= 0 && sy < gridSize) {
          ctx.fillStyle = "#FFD700";
          ctx.fillRect(sx * pixelSize, sy * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    // maybe a tree
    if (Math.random() > 0.3) {
      const tx = randomInt(3, gridSize - 4);
      const trunkH = randomInt(2, 4);
      for (let ty = horizon; ty < Math.min(gridSize, horizon + trunkH); ty++) {
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(tx * pixelSize, ty * pixelSize, pixelSize, pixelSize);
      }
      // leaves
      for (let lx = tx - 2; lx <= tx + 2; lx++) {
        for (let ly = horizon - 3; ly < horizon; ly++) {
          if (lx >= 0 && lx < gridSize && ly >= 0 && ly < gridSize && Math.random() > 0.25) {
            ctx.fillStyle = randomFrom(["#006400", "#228B22", "#32CD32"]);
            ctx.fillRect(lx * pixelSize, ly * pixelSize, pixelSize, pixelSize);
          }
        }
      }
    }

    drawGrid(ctx, gridSize, pixelSize);
    saveToHistory();
  };

  const generators = [
    { id: "random", label: "Random Splatter", emoji: "🎲", fn: generateRandom },
    { id: "face", label: "Pixel Face", emoji: "😊", fn: generateFace },
    { id: "pattern", label: "Pattern", emoji: "🔷", fn: generatePattern },
    { id: "symmetric", label: "Sprite", emoji: "👾", fn: generateSymmetric },
    { id: "landscape", label: "Landscape", emoji: "🌄", fn: generateLandscape },
  ];

  const handleGenerate = (gen) => {
    gen.fn();
    setShowGenerateMenu(false);
  };

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
    const sourceCtx = canvas.getContext("2d");
    const exportSize = gridSize * 32;
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = exportSize;
    exportCanvas.height = exportSize;
    const exportContext = exportCanvas.getContext("2d");
    const outPixel = exportSize / gridSize;

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const centerX = x * pixelSize + Math.floor(pixelSize / 2);
        const centerY = y * pixelSize + Math.floor(pixelSize / 2);
        const source = sourceCtx.getImageData(centerX, centerY, 1, 1);
        exportContext.fillStyle = `rgb(${source.data[0]},${source.data[1]},${source.data[2]})`;
        exportContext.fillRect(x * outPixel, y * outPixel, outPixel, outPixel);
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
          <div className="flex flex-wrap gap-2">
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

            {/* Generate dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowGenerateMenu(!showGenerateMenu)}
                className={`px-3 py-2 rounded-lg border transition-all text-sm font-medium ${
                  showGenerateMenu
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white border-border hover:border-purple-400 text-purple-600"
                }`}
              >
                🎨 Generate {showGenerateMenu ? "▲" : "▼"}
              </button>
              {showGenerateMenu && (
                <div className="absolute top-full mt-1 left-0 w-48 bg-white border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                  {generators.map((gen) => (
                    <button
                      key={gen.id}
                      onClick={() => handleGenerate(gen)}
                      className="w-full px-4 py-3 text-left text-sm font-medium text-text-primary hover:bg-purple-50 transition-colors flex items-center gap-2"
                    >
                      <span>{gen.emoji}</span>
                      <span>{gen.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
          className="w-full"
        >
          Clear
        </Button>
        <Button
          variant="primary"
          onClick={downloadArt}
          size="sm"
          className="w-full"
        >
          Download PNG
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
