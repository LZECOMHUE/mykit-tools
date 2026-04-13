"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";

export default function RotateImage() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setAngle(0);
      };
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setAngle(0);
      };
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  // Draw rotated image
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const radians = (angle * Math.PI) / 180;
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));
    const newWidth = Math.floor(image.width * cos + image.height * sin);
    const newHeight = Math.floor(image.width * sin + image.height * cos);

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.clearRect(0, 0, newWidth, newHeight);
    ctx.save();
    ctx.translate(newWidth / 2, newHeight / 2);
    ctx.rotate(radians);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
  }, [image, angle]);

  const rotateBy = (delta) => {
    setAngle((prev) => ((prev + delta) % 360 + 360) % 360);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `rotated-${angle}deg.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const reset = () => {
    setImage(null);
    setAngle(0);
  };

  return (
    <div className="space-y-4">
      {/* Upload */}
      {!image && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full px-6 py-12 border-2 border-dashed rounded-[var(--radius-card)] cursor-pointer transition-all text-center ${
            dragging
              ? "border-accent bg-accent/5"
              : "border-border hover:border-accent hover:bg-surface"
          }`}
        >
          <div className="text-3xl mb-3">🖼</div>
          <p className="font-medium text-text-primary mb-1">
            Drop an image here or click to upload
          </p>
          <p className="text-sm text-text-muted">PNG, JPG, WebP, GIF</p>
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
          {/* Quick rotation buttons */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-text-primary text-sm">Rotate</h3>
              <span className="font-mono text-xs text-text-muted">{angle}deg</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => rotateBy(-90)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover transition-colors flex items-center gap-1"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 8a6 6 0 0 1-10.2-4.3" />
                  <path d="M2 2v4h4" />
                </svg>
                90 CCW
              </button>
              <button
                onClick={() => rotateBy(90)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover transition-colors flex items-center gap-1"
              >
                90 CW
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 8a6 6 0 0 1 10.2-4.3" />
                  <path d="M14 2v4h-4" />
                </svg>
              </button>
              <button
                onClick={() => rotateBy(180)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary hover:bg-surface-hover transition-colors"
              >
                180
              </button>
              {[45, 135, 270].map((a) => (
                <button
                  key={a}
                  onClick={() => setAngle(a)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    angle === a
                      ? "bg-accent text-white"
                      : "bg-surface text-text-secondary hover:bg-surface-hover"
                  }`}
                >
                  {a}deg
                </button>
              ))}
            </div>

            {/* Custom angle slider */}
            <div className="border-t border-border pt-2 mt-2">
              <Slider
                label="Custom Angle"
                value={angle}
                onChange={setAngle}
                min={0}
                max={359}
                step={1}
                showValue
                formatValue={(v) => `${v}deg`}
              />
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={download}>
              Download
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setAngle(0)}>
              Reset Angle
            </Button>
            <Button variant="ghost" size="sm" onClick={reset}>
              New Image
            </Button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-text-muted hover:text-accent transition-colors ml-auto"
            >
              Change image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </div>

          {/* Canvas preview */}
          <Card padding={false} className="overflow-hidden flex items-center justify-center bg-[#f0f0f0]">
            <canvas ref={canvasRef} className="max-w-full h-auto" />
          </Card>

          {/* Dimensions */}
          <p className="text-xs text-text-muted text-center font-mono">
            {image.width} x {image.height}px - rotated {angle}deg
          </p>
        </>
      )}
    </div>
  );
}
