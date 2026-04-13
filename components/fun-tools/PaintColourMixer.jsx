'use client';

import { useState, useMemo } from 'react';

const colorNames = {
  '#FF0000': 'Red',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#FFA500': 'Orange',
  '#008000': 'Green',
  '#800080': 'Purple',
  '#FFC0CB': 'Pink',
  '#A52A2A': 'Brown',
  '#FFFFFF': 'White',
  '#000000': 'Black',
};

const predefinedColors = [
  { hex: '#FF0000', name: 'Red' },
  { hex: '#0000FF', name: 'Blue' },
  { hex: '#FFFF00', name: 'Yellow' },
  { hex: '#FFA500', name: 'Orange' },
  { hex: '#008000', name: 'Green' },
  { hex: '#800080', name: 'Purple' },
  { hex: '#FFC0CB', name: 'Pink' },
  { hex: '#A52A2A', name: 'Brown' },
];

function getColorName(hex) {
  return colorNames[hex] || 'Custom Color';
}

function mixRGB(hex1, hex2) {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);

  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);

  const rMix = Math.round((r1 + r2) / 2);
  const gMix = Math.round((g1 + g2) / 2);
  const bMix = Math.round((b1 + b2) / 2);

  return `#${rMix.toString(16).padStart(2, '0')}${gMix.toString(16).padStart(2, '0')}${bMix.toString(16).padStart(2, '0')}`.toUpperCase();
}

function approxColorName(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (r > g && r > b) return 'Red-tinted';
  if (b > r && b > g) return 'Blue-tinted';
  if (g > r && g > b) return 'Green-tinted';
  if (r > 200 && g > 200) return 'Yellow-ish';
  if (r > 100 && g > 100 && b < 100) return 'Olive';
  if (r < 100 && g > 100 && b > 100) return 'Teal';
  if (r > 100 && b > 100) return 'Purple-ish';

  return 'Mixed Color';
}

export default function PaintColourMixer() {
  const [color1, setColor1] = useState('#FF0000');
  const [color2, setColor2] = useState('#0000FF');

  const mixed = useMemo(() => {
    const hex = mixRGB(color1, color2);
    return { hex, name: approxColorName(hex) };
  }, [color1, color2]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Colour 1 */}
        <div className="space-y-2">
          <h3 className="font-heading text-base font-bold text-text-primary">First Colour</h3>
          <div className="flex gap-2 flex-wrap">
            {predefinedColors.map((color) => (
              <button
                key={color.hex}
                onClick={() => setColor1(color.hex)}
                className={`w-10 h-10 rounded-lg border-2 transition-transform hover:scale-110 ${
                  color1 === color.hex ? 'border-accent scale-110' : 'border-border'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              ></button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-12 h-10 rounded-lg border border-border cursor-pointer"
            />
            <span className="font-mono font-bold text-text-primary">{color1}</span>
            <span className="text-text-muted text-xs">{getColorName(color1)}</span>
          </div>
        </div>

        {/* Colour 2 */}
        <div className="space-y-2">
          <h3 className="font-heading text-base font-bold text-text-primary">Second Colour</h3>
          <div className="flex gap-2 flex-wrap">
            {predefinedColors.map((color) => (
              <button
                key={color.hex}
                onClick={() => setColor2(color.hex)}
                className={`w-10 h-10 rounded-lg border-2 transition-transform hover:scale-110 ${
                  color2 === color.hex ? 'border-accent scale-110' : 'border-border'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              ></button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-12 h-10 rounded-lg border border-border cursor-pointer"
            />
            <span className="font-mono font-bold text-text-primary">{color2}</span>
            <span className="text-text-muted text-xs">{getColorName(color2)}</span>
          </div>
        </div>
      </div>

      {/* Mixed Result - always visible */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-3">
        <h3 className="font-heading text-base font-bold text-text-primary">Mixed Result</h3>
        <div
          className="w-full h-28 rounded-lg border-2 border-accent shadow-lg"
          style={{ backgroundColor: mixed.hex }}
        ></div>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-text-muted text-xs font-medium">Hex Code</p>
            <p className="font-mono font-bold text-accent text-lg">{mixed.hex}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs font-medium">Approximate Name</p>
            <p className="text-text-primary font-medium">{mixed.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
