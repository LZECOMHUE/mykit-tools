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

function QRCodeSVG({ qr, size = 240, fgColor = "#1a1a1a", bgColor = "#ffffff" }) {
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
// WiFi QR string builder
// ═══════════════════════════════════════════════════════════════

function buildWifiString(ssid, password, encryption, hidden) {
  const esc = (s) => s.replace(/[\\;,:""]/g, (c) => "\\" + c);
  return `WIFI:T:${encryption};S:${esc(ssid)};P:${esc(password)};${hidden ? "H:true;" : ""};`;
}

// ═══════════════════════════════════════════════════════════════
// Card style presets for the downloadable WiFi card
// ═══════════════════════════════════════════════════════════════

const CARD_STYLES = [
  {
    id: "modern",
    name: "Modern",
    bg1: "#1a1a2e", bg2: "#16213e", accent: "#0f3460", text: "#e8e8e8",
    qrBg: "#ffffff", qrFg: "#1a1a2e", emoji: "📶",
  },
  {
    id: "warm",
    name: "Warm Home",
    bg1: "#f5e6d3", bg2: "#e8d5b7", accent: "#b8860b", text: "#5c3d2e",
    qrBg: "#ffffff", qrFg: "#5c3d2e", emoji: "🏠",
  },
  {
    id: "ocean",
    name: "Ocean",
    bg1: "#0077b6", bg2: "#023e8a", accent: "#48cae4", text: "#ffffff",
    qrBg: "#ffffff", qrFg: "#023e8a", emoji: "🌊",
  },
  {
    id: "garden",
    name: "Garden",
    bg1: "#2d6a4f", bg2: "#1b4332", accent: "#95d5b2", text: "#ffffff",
    qrBg: "#ffffff", qrFg: "#1b4332", emoji: "🌿",
  },
  {
    id: "sunset",
    name: "Sunset",
    bg1: "#ff6b6b", bg2: "#ee5a24", accent: "#feca57", text: "#ffffff",
    qrBg: "#ffffff", qrFg: "#c0392b", emoji: "🌅",
  },
  {
    id: "minimal",
    name: "Minimal",
    bg1: "#ffffff", bg2: "#f8f9fa", accent: "#2563eb", text: "#1a1a1a",
    qrBg: "#ffffff", qrFg: "#1a1a1a", emoji: "✨",
  },
];

// ═══════════════════════════════════════════════════════════════
// Canvas-based downloadable WiFi card generator
// ═══════════════════════════════════════════════════════════════

function downloadWifiCard(qrData, ssid, password, encryption, style) {
  if (!qrData) return;

  const W = 800;
  const H = 1000;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, style.bg1);
  grad.addColorStop(1, style.bg2);
  ctx.fillStyle = grad;
  roundRect(ctx, 0, 0, W, H, 32);
  ctx.fill();

  // Decorative circles
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = style.accent;
  ctx.beginPath();
  ctx.arc(-60, -40, 250, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(W + 40, H + 20, 280, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // WiFi icon / emoji
  ctx.font = "64px serif";
  ctx.textAlign = "center";
  ctx.fillText(style.emoji, W / 2, 90);

  // Title
  ctx.fillStyle = style.text;
  ctx.font = "bold 42px 'Segoe UI', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("WiFi Password", W / 2, 150);

  // Subtitle
  ctx.globalAlpha = 0.7;
  ctx.font = "20px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText("Scan to connect instantly", W / 2, 185);
  ctx.globalAlpha = 1;

  // QR code container (white rounded rect)
  const qrSize = 320;
  const qrX = (W - qrSize - 48) / 2;
  const qrY = 215;
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, qrX, qrY, qrSize + 48, qrSize + 48, 20);
  ctx.fill();
  ctx.strokeStyle = style.id === "minimal" ? "#e5e5e5" : "transparent";
  ctx.lineWidth = 2;
  roundRect(ctx, qrX, qrY, qrSize + 48, qrSize + 48, 20);
  ctx.stroke();

  // Draw QR code
  const count = qrData.getModuleCount();
  const cellSize = qrSize / count;
  const qrOffX = qrX + 24;
  const qrOffY = qrY + 24;
  ctx.fillStyle = style.qrFg;
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qrData.isDark(row, col)) {
        ctx.fillRect(qrOffX + col * cellSize, qrOffY + row * cellSize, cellSize + 0.5, cellSize + 0.5);
      }
    }
  }

  // Network details section
  const detailsY = qrY + qrSize + 80;

  // Network name
  ctx.fillStyle = style.text;
  ctx.globalAlpha = 0.5;
  ctx.font = "16px 'Segoe UI', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("NETWORK NAME", W / 2, detailsY);
  ctx.globalAlpha = 1;
  ctx.font = "bold 32px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText(ssid.length > 24 ? ssid.slice(0, 22) + "…" : ssid, W / 2, detailsY + 42);

  // Divider
  ctx.strokeStyle = style.text;
  ctx.globalAlpha = 0.15;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W * 0.2, detailsY + 65);
  ctx.lineTo(W * 0.8, detailsY + 65);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Password
  if (encryption !== "nopass") {
    ctx.fillStyle = style.text;
    ctx.globalAlpha = 0.5;
    ctx.font = "16px 'Segoe UI', system-ui, sans-serif";
    ctx.fillText("PASSWORD", W / 2, detailsY + 95);
    ctx.globalAlpha = 1;
    ctx.font = "bold 28px 'Courier New', monospace";
    const displayPw = password.length > 28 ? password.slice(0, 26) + "…" : password;
    ctx.fillText(displayPw, W / 2, detailsY + 132);
  } else {
    ctx.fillStyle = style.text;
    ctx.globalAlpha = 0.6;
    ctx.font = "20px 'Segoe UI', system-ui, sans-serif";
    ctx.fillText("No password required", W / 2, detailsY + 100);
    ctx.globalAlpha = 1;
  }

  // Security badge
  ctx.globalAlpha = 0.3;
  ctx.font = "14px 'Segoe UI', system-ui, sans-serif";
  ctx.fillStyle = style.text;
  ctx.fillText(`Security: ${encryption === "nopass" ? "Open" : encryption}`, W / 2, H - 55);
  ctx.globalAlpha = 1;

  // Footer
  ctx.globalAlpha = 0.25;
  ctx.font = "13px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText("Made with mykit.tools", W / 2, H - 28);
  ctx.globalAlpha = 1;

  // Download
  const link = document.createElement("a");
  link.download = `wifi-${ssid.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

export default function WifiQRCodeGenerator() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [hidden, setHidden] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [qrData, setQrData] = useState(null);
  const svgRef = useRef(null);

  const { ready, generate } = useQRCode();

  const style = CARD_STYLES.find((s) => s.id === selectedStyle) || CARD_STYLES[0];
  const isValid = ssid.trim().length > 0;

  const handleGenerate = () => {
    if (!isValid) return;
    const wifiStr = buildWifiString(ssid, password, encryption, hidden);
    const qr = generate(wifiStr);
    setQrData(qr);
  };

  const handleDownloadCard = () => {
    downloadWifiCard(qrData, ssid, password, encryption, style);
  };

  const handleDownloadPNG = () => {
    if (!qrData) return;
    const count = qrData.getModuleCount();
    const scale = 10;
    const size = count * scale;
    const canvas = document.createElement("canvas");
    canvas.width = size + 80;
    canvas.height = size + 80;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1a1a1a";
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (qrData.isDark(row, col)) {
          ctx.fillRect(40 + col * scale, 40 + row * scale, scale, scale);
        }
      }
    }
    const link = document.createElement("a");
    link.download = "wifi-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="space-y-4">
      {/* Configuration */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-3">WiFi Details</h3>
        <div className="space-y-3">
          <Input
            label="Network Name (SSID)"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            placeholder="My Home WiFi"
          />

          <div className="relative">
            <Input
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={encryption === "nopass" ? "No password needed" : "Enter WiFi password"}
              type={showPassword ? "text" : "password"}
              disabled={encryption === "nopass"}
            />
            {encryption !== "nopass" && (
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-xs text-accent hover:underline cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Security Type</label>
            <div className="flex gap-2">
              {[
                { key: "WPA", label: "WPA/WPA2/WPA3", desc: "Most common" },
                { key: "WEP", label: "WEP", desc: "Legacy" },
                { key: "nopass", label: "Open", desc: "No password" },
              ].map(({ key, label, desc }) => (
                <button
                  key={key}
                  onClick={() => setEncryption(key)}
                  className={`flex-1 px-3 py-2.5 text-sm rounded-[var(--radius-input)] cursor-pointer border font-medium transition-colors text-center ${
                    encryption === key
                      ? "bg-accent text-white border-accent"
                      : "bg-white text-text-secondary border-border hover:border-border-hover"
                  }`}
                >
                  <span className="block">{label}</span>
                  <span className={`block text-[10px] mt-0.5 ${encryption === key ? "text-white/70" : "text-text-muted"}`}>
                    {desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={hidden}
              onChange={(e) => setHidden(e.target.checked)}
              className="rounded"
            />
            Hidden network (not broadcast)
          </label>
        </div>

        <div className="mt-4">
          <Button
            onClick={handleGenerate}
            disabled={!isValid || !ready}
            size="lg"
            className="w-full"
          >
            {!ready ? "Loading QR engine…" : "📶 Generate WiFi QR Code"}
          </Button>
        </div>
      </Card>

      {/* QR Code display + card preview */}
      {qrData && (
        <>
          {/* QR Code */}
          <Card className="text-center space-y-3">
            <h3 className="text-sm font-semibold text-text-primary">Your WiFi QR Code</h3>
            <div ref={svgRef} className="inline-block p-4 bg-white rounded-xl border border-border">
              <QRCodeSVG qr={qrData} size={240} fgColor={style.qrFg} bgColor={style.qrBg} />
            </div>
            <p className="text-xs text-text-muted">
              Scan with any phone camera to connect to <strong className="text-text-secondary">{ssid}</strong>
            </p>
          </Card>

          {/* Card style selector */}
          <Card>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Card Style</h3>
            <p className="text-xs text-text-muted mb-3">
              Choose a design for your printable WiFi card. Perfect for framing near your router, guest rooms, or at reception.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {CARD_STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all aspect-[4/5] ${
                    selectedStyle === s.id
                      ? "border-accent ring-2 ring-accent/20 scale-105"
                      : "border-border hover:border-border-hover"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${s.bg1}, ${s.bg2})`,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <span className="text-xl">{s.emoji}</span>
                    <span className="text-[10px] font-semibold" style={{ color: s.text }}>
                      {s.name}
                    </span>
                  </div>
                  {selectedStyle === s.id && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px]">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Card preview */}
          <Card>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Preview</h3>
            <div className="flex justify-center">
              <div
                className="rounded-2xl p-6 text-center w-full max-w-[320px] shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${style.bg1}, ${style.bg2})`,
                  color: style.text,
                }}
              >
                <div className="text-3xl mb-1">{style.emoji}</div>
                <h4 className="font-bold text-lg" style={{ color: style.text }}>WiFi Password</h4>
                <p className="text-xs opacity-60 mb-3">Scan to connect instantly</p>
                <div className="bg-white rounded-xl p-3 inline-block mx-auto mb-3">
                  <QRCodeSVG qr={qrData} size={160} fgColor={style.qrFg} bgColor={style.qrBg} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] opacity-50 uppercase tracking-wider">Network Name</p>
                  <p className="font-bold text-base">{ssid.length > 20 ? ssid.slice(0, 18) + "…" : ssid}</p>
                  {encryption !== "nopass" && (
                    <>
                      <div className="border-t border-current opacity-15 my-2" />
                      <p className="text-[10px] opacity-50 uppercase tracking-wider">Password</p>
                      <p className="font-mono font-bold text-sm tracking-wide">
                        {password.length > 20 ? password.slice(0, 18) + "…" : password}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Download buttons */}
          <Card className="space-y-3">
            <h3 className="text-sm font-semibold text-text-primary">Download</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button onClick={handleDownloadCard} size="lg" className="w-full">
                🖼️ Download WiFi Card
              </Button>
              <Button onClick={handleDownloadPNG} variant="secondary" size="lg" className="w-full">
                📥 Download QR Only (PNG)
              </Button>
            </div>
            <p className="text-xs text-text-muted text-center">
              The WiFi card is print-ready at 800×1000px. Frame it, stick it on the fridge, or put it in your guest room!
            </p>
          </Card>
        </>
      )}

      {/* Tips */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-2">How It Works</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>WiFi QR codes use a standard format that most modern phones recognise. When a guest scans the code with their camera, their phone offers to join your network automatically — no typing passwords.</p>
          <p>Works with iPhone (iOS 11+), all Android phones, and most tablets.</p>
          <p>WPA/WPA2/WPA3 networks all use the "WPA" setting. Only select WEP if you have a very old router.</p>
          <p>Your WiFi details stay private — everything is generated in your browser. Nothing is sent to any server.</p>
        </div>
      </Card>
    </div>
  );
}
