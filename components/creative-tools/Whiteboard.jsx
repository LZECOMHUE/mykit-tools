"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const QUICK_COLORS = [
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#dc2626" },
  { name: "Blue", value: "#2563eb" },
  { name: "Green", value: "#16a34a" },
  { name: "Orange", value: "#ea580c" },
  { name: "Purple", value: "#9333ea" },
  { name: "Brown", value: "#92400e" },
  { name: "Grey", value: "#6b7280" },
];

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen"); // pen, highlighter, eraser, line, rect, circle
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [startPoint, setStartPoint] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [preview, setPreview] = useState(null);

  // Initialize canvas
  useEffect(() => {
    if (!containerRef.current) return;

    const width = Math.min(containerRef.current.offsetWidth, 800);
    const height = 500;

    setCanvasWidth(width);

    const canvas = canvasRef.current;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.lineCap = "round";
    context.lineJoin = "round";
    contextRef.current = context;

    // Initialize history
    setHistory([canvas.toDataURL()]);
    setHistoryStep(0);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = Math.min(containerRef.current.offsetWidth, 800);
      if (newWidth !== canvasWidth) {
        setCanvasWidth(newWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [canvasWidth]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX / window.devicePixelRatio,
        y: (e.touches[0].clientY - rect.top) * scaleY / window.devicePixelRatio,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX / window.devicePixelRatio,
      y: (e.clientY - rect.top) * scaleY / window.devicePixelRatio,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const context = contextRef.current;

    if (["line", "rect", "circle"].includes(tool)) {
      setStartPoint({ x, y });
      setPreview(context.getImageData(0, 0, context.canvas.width, context.canvas.height));
    } else {
      setStartPoint(null);
      context.strokeStyle = tool === "eraser" ? "white" : selectedColor;
      context.globalAlpha = tool === "highlighter" ? 0.3 : 1;
      context.lineWidth = brushSize;
      context.beginPath();
      context.moveTo(x, y);
    }

    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();

    const { x, y } = getCoordinates(e);
    const context = contextRef.current;

    if (tool === "pen" || tool === "eraser" || tool === "highlighter") {
      context.lineTo(x, y);
      context.stroke();
    } else if (["line", "rect", "circle"].includes(tool) && startPoint && preview) {
      // Restore from preview and draw preview
      context.putImageData(preview, 0, 0);
      context.globalAlpha = 1;
      context.strokeStyle = selectedColor;
      context.lineWidth = brushSize;

      if (tool === "line") {
        context.beginPath();
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(x, y);
        context.stroke();
      } else if (tool === "rect") {
        const width = x - startPoint.x;
        const height = y - startPoint.y;
        context.strokeRect(startPoint.x, startPoint.y, width, height);
      } else if (tool === "circle") {
        const radius = Math.sqrt(
          Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
        );
        context.beginPath();
        context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
        context.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const context = contextRef.current;
      context.globalAlpha = 1;
      context.closePath();
      setIsDrawing(false);
      setStartPoint(null);
      setPreview(null);
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
      const context = contextRef.current;
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = history[step];
  };

  const clearAll = () => {
    const context = contextRef.current;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvasRef.current.width / window.devicePixelRatio, canvasRef.current.height / window.devicePixelRatio);
    saveToHistory();
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "whiteboard-drawing.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 space-y-4">
        {/* Tools */}
        <div>
          <label className="text-sm font-medium text-text-primary block mb-2">
            Tools
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "pen", emoji: "✏️", label: "Pen" },
              { id: "highlighter", emoji: "🖍️", label: "Highlighter" },
              { id: "eraser", emoji: "🧹", label: "Eraser" },
              { id: "line", emoji: "📏", label: "Line" },
              { id: "rect", emoji: "□", label: "Rectangle" },
              { id: "circle", emoji: "○", label: "Circle" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`px-3 py-2 rounded-lg border transition-all text-sm font-medium flex items-center gap-1 ${
                  tool === t.id
                    ? "bg-accent text-white border-accent"
                    : "bg-white border-border hover:border-accent"
                }`}
              >
                {t.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Brush Size */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-text-primary">
              Brush Size: {brushSize}px
            </label>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Colour Picker */}
        <div>
          <label className="text-sm font-medium text-text-primary block mb-2">
            Colours
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`w-9 h-9 rounded-lg border-2 transition-transform ${
                  selectedColor === color.value
                    ? "border-text-primary scale-110"
                    : "border-border hover:scale-105"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
            <div className="flex items-center gap-2 ml-2">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-9 h-9 rounded-lg cursor-pointer border border-border"
              />
              <span className="text-xs text-text-muted">{selectedColor}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Canvas */}
      <Card
        className="border-2 border-border bg-white overflow-auto flex items-center justify-center p-0"
        padding={false}
      >
        <div ref={containerRef} className="w-full inline-block">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full block touch-none cursor-crosshair border border-border"
            style={{ display: "block" }}
          />
        </div>
      </Card>

      {/* Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
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
          onClick={downloadDrawing}
          size="sm"
          className="w-full col-span-1"
        >
          Download
        </Button>
      </div>

      <Card className="border-l-4 border-l-accent-warm bg-yellow-50">
        <p className="text-sm text-text-secondary">
          Draw freehand with the pen, highlight with semi-transparent colour, erase mistakes. Use shapes to draw geometric lines, rectangles, and circles. Full undo/redo history keeps your last 30 strokes.
        </p>
      </Card>
    </div>
  );
}
