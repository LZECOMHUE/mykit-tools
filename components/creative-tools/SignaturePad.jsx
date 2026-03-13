"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function SignaturePad() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(3);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(600);

  // Initialize canvas
  useEffect(() => {
    if (!containerRef.current) return;

    // Determine canvas width based on container
    const width = Math.min(containerRef.current.offsetWidth, 600);
    const height = 250;

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

    // Draw watermark
    context.font = "20px sans-serif";
    context.fillStyle = "rgba(200, 200, 200, 0.3)";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Sign here", width / 2, height / 2);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = Math.min(containerRef.current.offsetWidth, 600);
      if (newWidth !== canvasWidth && !hasDrawing) {
        setCanvasWidth(newWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [canvasWidth, hasDrawing]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = getCoordinates(e);
    if (hasDrawing === false) {
      setHasDrawing(true);
      // Clear watermark
      const context = contextRef.current;
      context.fillStyle = "white";
      context.fillRect(0, 0, canvasRef.current.width / window.devicePixelRatio, canvasRef.current.height / window.devicePixelRatio);
    }
    contextRef.current.strokeStyle = penColor;
    contextRef.current.lineWidth = penSize;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoordinates(e);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches) {
      return {
        offsetX: (e.touches[0].clientX - rect.left) * scaleX / window.devicePixelRatio,
        offsetY: (e.touches[0].clientY - rect.top) * scaleY / window.devicePixelRatio,
      };
    }
    return {
      offsetX: (e.clientX - rect.left) * scaleX / window.devicePixelRatio,
      offsetY: (e.clientY - rect.top) * scaleY / window.devicePixelRatio,
    };
  };

  const clearCanvas = () => {
    const context = contextRef.current;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvasRef.current.width / window.devicePixelRatio, canvasRef.current.height / window.devicePixelRatio);
    context.font = "20px sans-serif";
    context.fillStyle = "rgba(200, 200, 200, 0.3)";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Sign here", canvasWidth / 2, 125);
    setHasDrawing(false);
  };

  const downloadSignature = (withBackground = false) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let downloadCanvas = canvas;

    if (withBackground === false) {
      // Create a transparent background version
      downloadCanvas = document.createElement("canvas");
      downloadCanvas.width = canvas.width;
      downloadCanvas.height = canvas.height;
      const downloadContext = downloadCanvas.getContext("2d");
      downloadContext.drawImage(canvas, 0, 0);
    }

    const link = document.createElement("a");
    link.href = downloadCanvas.toDataURL("image/png");
    link.download = withBackground ? "signature-white-bg.png" : "signature.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-text-primary block mb-2">
              Pen Color
            </label>
            <div className="flex flex-wrap gap-3">
              {["#000000", "#2563eb", "#dc2626"].map((color) => (
                <button
                  key={color}
                  onClick={() => setPenColor(color)}
                  className={`w-10 h-10 rounded-lg border-2 transition-transform ${
                    penColor === color
                      ? "border-text-primary scale-110"
                      : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color === "#000000" ? "Black" : color === "#2563eb" ? "Blue" : "Red"}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-text-primary block mb-2">
              Pen Size: {penSize}px
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={penSize}
              onChange={(e) => setPenSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      <Card
        className="border-2 border-border bg-white overflow-hidden"
        padding={false}
      >
        <div ref={containerRef} className="w-full">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="w-full touch-none cursor-crosshair block"
            style={{ display: "block" }}
          />
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button
          variant="secondary"
          onClick={clearCanvas}
          className="w-full"
          size="sm"
        >
          Clear
        </Button>
        <Button
          variant="primary"
          onClick={() => downloadSignature(false)}
          disabled={!hasDrawing}
          className="w-full"
          size="sm"
        >
          Download PNG
        </Button>
        <Button
          variant="primary"
          onClick={() => downloadSignature(true)}
          disabled={!hasDrawing}
          className="w-full"
          size="sm"
        >
          With BG
        </Button>
      </div>

      <Card className="border-l-4 border-l-accent-warm bg-yellow-50">
        <p className="text-sm text-text-secondary">
          Tip: Use your mouse on desktop or finger on mobile to draw. The pen uses smooth curves for a natural writing feel.
        </p>
      </Card>
    </div>
  );
}
