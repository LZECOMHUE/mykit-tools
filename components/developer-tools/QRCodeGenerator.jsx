"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

// ═══════════════════════════════════════════════════════════════
// QR Code library loader hook
// ═══════════════════════════════════════════════════════════════

function useQRCode() {
  const [ready, setReady] = useState(false);
  const qrRef = useRef(null);

  useEffect(() => {
    if (window.qrcode) {
      qrRef.current = window.qrcode;
      setReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js";
    script.onload = () => {
      qrRef.current = window.qrcode;
      setReady(true);
    };
    script.onerror = () => setReady(false);
    document.head.appendChild(script);
  }, []);

  const generate = useCallback((text, ecLevel = "M") => {
    if (!qrRef.current || !text) return null;
    try {
      const qr = qrRef.current(0, ecLevel);
      qr.addData(text);
      qr.make();
      return qr;
    } catch {
      return null;
    }
  }, []);

  return { ready, generate };
}

// ═══════════════════════════════════════════════════════════════
// QR Code SVG Renderer
// ═══════════════════════════════════════════════════════════════

function QRCodeSVG({ qr, size = 280, fgColor = "#1a1a1a", bgColor = "#ffffff" }) {
  if (!qr) return null;
  const count = qr.getModuleCount();
  const cellSize = size / count;

  const paths = [];
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) {
        paths.push(`M${col * cellSize},${row * cellSize}h${cellSize}v${cellSize}h${-cellSize}z`);
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill={bgColor} />
      <path d={paths.join("")} fill={fgColor} />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// QR Code Generator — URL & Text
// ═══════════════════════════════════════════════════════════════

export default function QRCodeGenerator() {
  const [mode, setMode] = useState("url"); // "url" | "text"
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [fgColor, setFgColor] = useState("#1a1a1a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrData, setQrData] = useState(null);
  const svgRef = useRef(null);

  const { ready, generate } = useQRCode();

  const payload = mode === "url" ? url.trim() : text.trim();
  const isValid = payload.length > 0;

  const handleGenerate = () => {
    if (!isValid) return;
    const qr = generate(payload);
    setQrData(qr);
  };

  const handleDownload = (format) => {
    if (!qrData) return;
    const count = qrData.getModuleCount();
    const scale = 10;
    const size = count * scale;
    const canvas = document.createElement("canvas");
    canvas.width = size + 80;
    canvas.height = size + 80;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = fgColor;
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (qrData.isDark(row, col)) {
          ctx.fillRect(40 + col * scale, 40 + row * scale, scale, scale);
        }
      }
    }

    if (format === "png") {
      // Watermark
      ctx.fillStyle = '#d4d4d4';
      ctx.font = '11px system-ui, Arial, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('mykit.tools', canvas.width - 8, canvas.height - 8);

      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } else {
      const svgEl = svgRef.current?.querySelector("svg");
      if (svgEl) {
        const svgData = new XMLSerializer().serializeToString(svgEl);
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.download = "qrcode.svg";
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }
    }
  };

  const handleCopySVG = () => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (svgEl) {
      const svgData = new XMLSerializer().serializeToString(svgEl);
      navigator.clipboard.writeText(svgData);
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode selector */}
      <Card>
        <div className="flex rounded-[var(--radius-input)] border border-border overflow-hidden mb-4">
          {[
            { key: "url", label: "🔗 Website URL" },
            { key: "text", label: "📝 Plain Text" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setMode(key); setQrData(null); }}
              className={`flex-1 px-3 py-2.5 text-sm font-semibold cursor-pointer border-none transition-all ${
                mode === key
                  ? "bg-accent text-white"
                  : "bg-white text-text-muted hover:text-text-secondary hover:bg-surface"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* URL mode */}
        {mode === "url" && (
          <div className="space-y-3">
            <Input
              label="Website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
            <p className="text-xs text-text-muted">
              Enter any website address. The QR code will open this URL when scanned.
            </p>
          </div>
        )}

        {/* Text mode */}
        {mode === "text" && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Text Content</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter any text, phone number, email, or message..."
                rows={3}
                className="w-full px-3 py-2 text-sm border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 resize-vertical"
              />
            </div>
            <p className="text-xs text-text-muted">
              Encode any text up to ~2,000 characters into a QR code.
            </p>
          </div>
        )}

        <div className="mt-4">
          <Button
            onClick={handleGenerate}
            disabled={!isValid || !ready}
            size="lg"
            className="w-full"
          >
            {!ready ? "Loading QR engine…" : "Generate QR Code"}
          </Button>
        </div>
      </Card>

      {/* QR Code display */}
      {qrData && (
        <Card className="text-center space-y-4">
          <div ref={svgRef} className="inline-block p-4 bg-white rounded-xl border border-border">
            <QRCodeSVG qr={qrData} size={280} fgColor={fgColor} bgColor={bgColor} />
          </div>

          {/* Colour customisation */}
          <div className="flex items-center justify-center gap-6">
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <span>Foreground</span>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => { setFgColor(e.target.value); handleGenerate(); }}
                className="w-8 h-8 rounded cursor-pointer border border-border"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <span>Background</span>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => { setBgColor(e.target.value); handleGenerate(); }}
                className="w-8 h-8 rounded cursor-pointer border border-border"
              />
            </label>
          </div>

          {/* Download buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button onClick={() => handleDownload("png")} variant="primary" size="md">
              📥 Download PNG
            </Button>
            <Button onClick={() => handleDownload("svg")} variant="secondary" size="md">
              📥 Download SVG
            </Button>
            <Button onClick={handleCopySVG} variant="ghost" size="md">
              📋 Copy SVG
            </Button>
          </div>

          {/* What's encoded */}
          <div className="bg-surface rounded-lg px-4 py-3 text-left">
            <p className="text-xs text-text-muted font-semibold mb-1">Encoded data:</p>
            <p className="text-sm text-text-secondary font-mono break-all">
              {payload.length > 200 ? payload.slice(0, 200) + "…" : payload}
            </p>
          </div>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-2">Tips</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          {mode === "url" && (
            <>
              <p>Always include <code className="text-xs bg-surface px-1.5 py-0.5 rounded font-mono">https://</code> for best compatibility across all QR scanners.</p>
              <p>Test your QR code with your phone camera before printing.</p>
            </>
          )}
          {mode === "text" && (
            <>
              <p>You can encode phone numbers (e.g. <code className="text-xs bg-surface px-1.5 py-0.5 rounded font-mono">tel:+44123456789</code>), emails, or any plain text.</p>
              <p>Keep text short for a cleaner, easier-to-scan QR code.</p>
            </>
          )}
          <p>Use high contrast colours (dark on light) for best scan reliability. Avoid light foreground colours.</p>
        </div>
      </Card>
    </div>
  );
}
