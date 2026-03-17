'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const DEVICE_PRESETS = [
  // Phones
  { name: 'iPhone 15', diagonal: 6.1, widthPx: 1179, heightPx: 2556 },
  { name: 'iPhone 15 Pro Max', diagonal: 6.7, widthPx: 1320, heightPx: 2868 },
  { name: 'Samsung Galaxy S24', diagonal: 6.2, widthPx: 1440, heightPx: 3120 },
  { name: 'Google Pixel 9', diagonal: 6.3, widthPx: 1280, heightPx: 2992 },
  // Tablets
  { name: 'iPad Pro 11', diagonal: 11, widthPx: 1668, heightPx: 2388 },
  { name: 'iPad Pro 12.9', diagonal: 12.9, widthPx: 2048, heightPx: 2732 },
  { name: 'iPad Air 11', diagonal: 11, widthPx: 1640, heightPx: 2360 },
  // Laptops
  { name: 'MacBook Pro 14', diagonal: 14, widthPx: 3072, heightPx: 1920 },
  { name: 'MacBook Pro 16', diagonal: 16, widthPx: 3456, heightPx: 2234 },
  { name: 'Dell XPS 13', diagonal: 13.3, widthPx: 1920, heightPx: 1200 },
  // Monitors
  { name: '24 inch Full HD', diagonal: 24, widthPx: 1920, heightPx: 1080 },
  { name: '27 inch 4K', diagonal: 27, widthPx: 3840, heightPx: 2160 },
  { name: '32 inch 4K', diagonal: 32, widthPx: 3840, heightPx: 2160 },
  { name: '35 inch Ultra-wide', diagonal: 35, widthPx: 3440, heightPx: 1440 },
  // TVs
  { name: '55 inch 4K TV', diagonal: 55, widthPx: 3840, heightPx: 2160 },
  { name: '65 inch 4K TV', diagonal: 65, widthPx: 3840, heightPx: 2160 },
  { name: '75 inch 4K TV', diagonal: 75, widthPx: 3840, heightPx: 2160 },
];

export default function ScreenPpiCalculator() {
  const [mode, setMode] = useState('manual');
  const [diagonal, setDiagonal] = useState('24');
  const [widthPx, setWidthPx] = useState('1920');
  const [heightPx, setHeightPx] = useState('1080');
  const [selectedDevice, setSelectedDevice] = useState('');

  const calculations = useMemo(() => {
    const d = parseFloat(diagonal) || 0;
    const w = parseFloat(widthPx) || 0;
    const h = parseFloat(heightPx) || 0;

    if (d === 0 || w === 0 || h === 0) {
      return {
        ppi: 0,
        totalPixels: 0,
        diagonalPixels: 0,
        aspectRatio: 'N/A',
        pixelDensity: 'N/A',
      };
    }

    // Calculate diagonal in pixels using Pythagorean theorem
    const diagonalPixels = Math.sqrt(w * w + h * h);

    // PPI = diagonal pixels / diagonal inches
    const ppi = diagonalPixels / d;

    // Total pixels
    const totalPixels = w * h;

    // Aspect ratio
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(w, h);
    const aspectRatio = `${w / divisor}:${h / divisor}`;

    // Pixel density rating
    let pixelDensity = 'Low';
    if (ppi >= 326) pixelDensity = 'Retina (High)';
    else if (ppi >= 264) pixelDensity = 'High';
    else if (ppi >= 200) pixelDensity = 'Medium';

    return {
      ppi,
      totalPixels,
      diagonalPixels,
      aspectRatio,
      pixelDensity,
    };
  }, [diagonal, widthPx, heightPx]);

  const handleDeviceSelect = (preset) => {
    setSelectedDevice(preset.name);
    setDiagonal(preset.diagonal.toString());
    setWidthPx(preset.widthPx.toString());
    setHeightPx(preset.heightPx.toString());
  };

  const getPpiColor = (ppi) => {
    if (ppi >= 326) return 'text-success';
    if (ppi >= 264) return 'text-accent';
    if (ppi >= 200) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Mode Selector */}
      <div className="flex gap-1 border-b border-border mb-4">
        {[
          { id: 'manual', label: 'Manual Entry' },
          { id: 'presets', label: 'Device Presets' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px cursor-pointer ${
              mode === tab.id
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {mode === 'manual' ? (
        // MANUAL MODE
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="p-6 border border-border">
              <h3 className="font-heading font-semibold mb-4">Screen Specifications</h3>
              <div className="space-y-4">
                <Input
                  label="Screen Diagonal (inches)"
                  type="number"
                  step="0.1"
                  value={diagonal}
                  onChange={(e) => setDiagonal(e.target.value)}
                  placeholder="24"
                />
                <div>
                  <label className="text-sm font-medium text-text-secondary block mb-1">
                    Horizontal Resolution (px)
                  </label>
                  <Input
                    type="number"
                    value={widthPx}
                    onChange={(e) => setWidthPx(e.target.value)}
                    placeholder="1920"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary block mb-1">
                    Vertical Resolution (px)
                  </label>
                  <Input
                    type="number"
                    value={heightPx}
                    onChange={(e) => setHeightPx(e.target.value)}
                    placeholder="1080"
                  />
                </div>
              </div>

              {/* Formula */}
              <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
                <div className="text-xs text-text-secondary font-mono mb-2">
                  Formula:
                </div>
                <div className="text-sm font-mono space-y-1">
                  <div>diag_px = √(w² + h²)</div>
                  <div>PPI = diag_px / diagonal_in</div>
                </div>
              </div>
            </Card>

            {/* Results Section */}
            <Card className="p-6 border border-border bg-surface">
              <h3 className="font-heading font-semibold mb-4">Display Metrics</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-border">
                  <div className="text-sm text-text-secondary mb-1">Pixels Per Inch (PPI)</div>
                  <div className={`font-mono font-semibold text-3xl ${getPpiColor(calculations.ppi)}`}>
                    {calculations.ppi.toFixed(1)}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-border">
                  <div className="text-sm text-text-secondary mb-1">Pixel Density</div>
                  <div className="font-heading font-semibold text-lg">
                    {calculations.pixelDensity}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-lg border border-border">
                    <div className="text-xs text-text-secondary mb-1">Total Pixels</div>
                    <div className="font-mono font-semibold">
                      {(calculations.totalPixels / 1000000).toFixed(2)}MP
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-border">
                    <div className="text-xs text-text-secondary mb-1">Aspect Ratio</div>
                    <div className="font-mono font-semibold">
                      {calculations.aspectRatio}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* PPI Guide */}
          <Card className="p-6 border border-border">
            <h3 className="font-heading font-semibold mb-4">PPI Rating Guide</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-error bg-opacity-10 border border-error border-opacity-20">
                <div className="font-heading font-semibold text-error mb-1">Low</div>
                <div className="text-sm text-text-secondary">Less than 200 PPI</div>
                <div className="text-xs text-text-muted mt-2">Visible pixels, pixelated</div>
              </div>

              <div className="p-4 rounded-lg bg-warning bg-opacity-10 border border-warning border-opacity-20">
                <div className="font-heading font-semibold text-warning mb-1">Medium</div>
                <div className="text-sm text-text-secondary">200-263 PPI</div>
                <div className="text-xs text-text-muted mt-2">Acceptable for most uses</div>
              </div>

              <div className="p-4 rounded-lg bg-accent bg-opacity-10 border border-accent border-opacity-20">
                <div className="font-heading font-semibold text-accent mb-1">High</div>
                <div className="text-sm text-text-secondary">264-325 PPI</div>
                <div className="text-xs text-text-muted mt-2">Sharp, very good clarity</div>
              </div>

              <div className="p-4 rounded-lg bg-success bg-opacity-10 border border-success border-opacity-20">
                <div className="font-heading font-semibold text-success mb-1">Retina</div>
                <div className="text-sm text-text-secondary">326+ PPI</div>
                <div className="text-xs text-text-muted mt-2">Indistinguishable pixels</div>
              </div>
            </div>
          </Card>
        </>
      ) : (
        // PRESETS MODE
        <>
          <div className="space-y-6">
            {/* Device Categories */}
            <div className="space-y-4">
              <div>
                <h3 className="font-heading font-semibold mb-3 text-sm">Smartphones</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEVICE_PRESETS.filter((d) =>
                    ['iPhone', 'Samsung', 'Google Pixel'].some((name) =>
                      d.name.includes(name)
                    )
                  ).map((device) => (
                    <Button
                      key={device.name}
                      onClick={() => handleDeviceSelect(device)}
                      variant={selectedDevice === device.name ? 'primary' : 'secondary'}
                      className="justify-start"
                    >
                      {device.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold mb-3 text-sm">Tablets</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEVICE_PRESETS.filter((d) =>
                    ['iPad'].some((name) => d.name.includes(name))
                  ).map((device) => (
                    <Button
                      key={device.name}
                      onClick={() => handleDeviceSelect(device)}
                      variant={selectedDevice === device.name ? 'primary' : 'secondary'}
                      className="justify-start"
                    >
                      {device.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold mb-3 text-sm">Laptops</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEVICE_PRESETS.filter((d) =>
                    ['MacBook', 'Dell'].some((name) => d.name.includes(name))
                  ).map((device) => (
                    <Button
                      key={device.name}
                      onClick={() => handleDeviceSelect(device)}
                      variant={selectedDevice === device.name ? 'primary' : 'secondary'}
                      className="justify-start"
                    >
                      {device.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold mb-3 text-sm">Monitors & TVs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEVICE_PRESETS.filter((d) =>
                    ['inch', 'TV'].some((name) =>
                      d.name.includes(name)
                    )
                  ).map((device) => (
                    <Button
                      key={device.name}
                      onClick={() => handleDeviceSelect(device)}
                      variant={selectedDevice === device.name ? 'primary' : 'secondary'}
                      className="justify-start text-xs"
                    >
                      {device.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            {selectedDevice && (
              <Card className="p-6 border border-border bg-surface">
                <h3 className="font-heading font-semibold mb-4">{selectedDevice}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <div className="text-sm text-text-secondary mb-1">Diagonal</div>
                    <div className="font-mono font-semibold text-lg">
                      {diagonal}"
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-border">
                    <div className="text-sm text-text-secondary mb-1">Resolution</div>
                    <div className="font-mono font-semibold text-sm">
                      {widthPx} × {heightPx}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-border">
                    <div className="text-sm text-text-secondary mb-1">PPI</div>
                    <div className={`font-mono font-semibold text-lg ${getPpiColor(calculations.ppi)}`}>
                      {calculations.ppi.toFixed(1)}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-border">
                    <div className="text-sm text-text-secondary mb-1">Density</div>
                    <div className="font-heading font-semibold text-sm">
                      {calculations.pixelDensity}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
