'use client';
import { useState, useMemo } from 'react';

export default function HexToRgb() {
  const [hex, setHex] = useState('#FF5733');
  const [red, setRed] = useState('255');
  const [green, setGreen] = useState('87');
  const [blue, setBlue] = useState('51');

  const colors = useMemo(() => {
    let hexValue = hex;
    let r, g, b;

    if (hex.match(/^#[0-9A-F]{6}$/i)) {
      hexValue = hex;
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    } else if (red && green && blue) {
      const rNum = Math.max(0, Math.min(255, parseInt(red) || 0));
      const gNum = Math.max(0, Math.min(255, parseInt(green) || 0));
      const bNum = Math.max(0, Math.min(255, parseInt(blue) || 0));
      hexValue = '#' + [rNum, gNum, bNum].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
      r = rNum;
      g = gNum;
      b = bNum;
    } else {
      return { hex: '', rgb: '', preview: '#ffffff' };
    }

    return {
      hex: hexValue,
      rgb: `rgb(${r}, ${g}, ${b})`,
      rgbText: `${r}, ${g}, ${b}`,
      r: r.toString(),
      g: g.toString(),
      b: b.toString(),
      preview: hexValue,
    };
  }, [hex, red, green, blue]);

  const handleHexChange = (value) => {
    const cleanValue = value.startsWith('#') ? value : '#' + value;
    setHex(cleanValue);
    if (cleanValue.match(/^#[0-9A-F]{6}$/i)) {
      setRed(parseInt(cleanValue.slice(1, 3), 16).toString());
      setGreen(parseInt(cleanValue.slice(3, 5), 16).toString());
      setBlue(parseInt(cleanValue.slice(5, 7), 16).toString());
    }
  };

  const handleRedChange = (value) => {
    const num = Math.max(0, Math.min(255, parseInt(value) || 0));
    setRed(num.toString());
  };

  const handleGreenChange = (value) => {
    const num = Math.max(0, Math.min(255, parseInt(value) || 0));
    setGreen(num.toString());
  };

  const handleBlueChange = (value) => {
    const num = Math.max(0, Math.min(255, parseInt(value) || 0));
    setBlue(num.toString());
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-surface rounded-lg border border-border">
      <div className="space-y-4">
        {/* Colour Preview */}
        <div className="p-4 rounded-lg border border-border bg-white flex items-center justify-center min-h-40">
          <div
            className="w-32 h-32 rounded-lg shadow-lg border-4 border-border transition-colors"
            style={{ backgroundColor: colors.preview || '#ffffff' }}
          />
        </div>

        {/* HEX Input */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            HEX Colour
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#FF5733"
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
            />
            <button
              onClick={() => copyToClipboard(colors.hex)}
              className="px-4 py-3 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Copy
            </button>
          </div>
        </div>

        {/* RGB Inputs */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            RGB Values (0-255)
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-text-secondary mb-1 block">Red</label>
              <input
                type="number"
                min="0"
                max="255"
                value={red}
                onChange={(e) => handleRedChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-text-secondary mb-1 block">Green</label>
              <input
                type="number"
                min="0"
                max="255"
                value={green}
                onChange={(e) => handleGreenChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-text-secondary mb-1 block">Blue</label>
              <input
                type="number"
                min="0"
                max="255"
                value={blue}
                onChange={(e) => handleBlueChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 font-mono text-text-primary bg-white"
              />
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(`rgb(${colors.rgbText})`)}
            className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
          >
            Copy RGB Format
          </button>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
          <div className="p-3 bg-white border border-border rounded-lg">
            <p className="text-xs text-text-secondary mb-1">HEX Format</p>
            <p className="font-mono text-lg font-medium text-text-primary">{colors.hex}</p>
          </div>
          <div className="p-3 bg-white border border-border rounded-lg">
            <p className="text-xs text-text-secondary mb-1">RGB Format</p>
            <p className="font-mono text-sm font-medium text-text-primary">{colors.rgbText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
