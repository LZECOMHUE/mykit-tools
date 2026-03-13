'use client';

import { useState, useMemo, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function BoxShadowGenerator() {
  const [shadows, setShadows] = useState([
    {
      id: 1,
      offsetX: 0,
      offsetY: 4,
      blur: 6,
      spread: 0,
      color: '#000000',
      alpha: 0.1,
      inset: false,
    },
  ]);

  const presets = {
    subtle: [
      { offsetX: 0, offsetY: 1, blur: 3, spread: 0, color: '#000000', alpha: 0.05, inset: false },
    ],
    medium: [
      { offsetX: 0, offsetY: 4, blur: 6, spread: 0, color: '#000000', alpha: 0.1, inset: false },
    ],
    heavy: [
      { offsetX: 0, offsetY: 10, blur: 25, spread: 0, color: '#000000', alpha: 0.2, inset: false },
    ],
    sharp: [
      { offsetX: 2, offsetY: 2, blur: 0, spread: 0, color: '#000000', alpha: 0.3, inset: false },
    ],
    glow: [
      { offsetX: 0, offsetY: 0, blur: 20, spread: 0, color: '#3b82f6', alpha: 0.6, inset: false },
    ],
    layered: [
      { offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: '#000000', alpha: 0.05, inset: false },
      { offsetX: 0, offsetY: 8, blur: 16, spread: 0, color: '#000000', alpha: 0.1, inset: false },
    ],
  };

  const applyShadowPreset = useCallback((presetKey) => {
    const shadowLayers = presets[presetKey];
    setShadows(
      shadowLayers.map((shadow, index) => ({
        ...shadow,
        id: index + 1,
      }))
    );
  }, []);

  const updateShadow = useCallback((id, field, value) => {
    setShadows(shadows.map((shadow) =>
      shadow.id === id ? { ...shadow, [field]: value } : shadow
    ));
  }, [shadows]);

  const addShadow = useCallback(() => {
    const newId = Math.max(...shadows.map((s) => s.id), 0) + 1;
    setShadows([
      ...shadows,
      {
        id: newId,
        offsetX: 0,
        offsetY: 4,
        blur: 6,
        spread: 0,
        color: '#000000',
        alpha: 0.1,
        inset: false,
      },
    ]);
  }, [shadows]);

  const removeShadow = useCallback((id) => {
    if (shadows.length > 1) {
      setShadows(shadows.filter((shadow) => shadow.id !== id));
    }
  }, [shadows]);

  const cssOutput = useMemo(() => {
    const shadowStrings = shadows.map((shadow) => {
      const rgb = hexToRgb(shadow.color);
      const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${shadow.alpha})`;
      const insetText = shadow.inset ? 'inset ' : '';
      return `${insetText}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${rgba}`;
    });
    return shadowStrings.join(', ');
  }, [shadows]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`box-shadow: ${cssOutput};`);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 py-8 px-4">
      {/* Title */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-text-primary">
          CSS Box Shadow Generator
        </h1>
        <p className="text-text-secondary mt-2">
          Create and customize multiple shadow layers with live preview
        </p>
      </div>

      {/* Main Grid: Preview + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Preview */}
        <div className="flex flex-col items-center justify-center min-h-96 bg-surface rounded-[12px] p-8">
          <div
            className="w-48 h-48 bg-white rounded-[12px] transition-shadow duration-200"
            style={{ boxShadow: cssOutput || 'none' }}
          />
        </div>

        {/* Right: Controls */}
        <div className="space-y-6">
          {/* Presets */}
          <div className="space-y-3">
            <h3 className="text-text-primary font-semibold">Quick Presets</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(presets).map((key) => (
                <button
                  key={key}
                  onClick={() => applyShadowPreset(key)}
                  className="px-3 py-2 bg-surface border border-border rounded-[8px] text-text-primary text-sm font-medium hover:bg-surface-hover transition-colors capitalize"
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Shadows List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <h3 className="text-text-primary font-semibold">
              Shadow Layers ({shadows.length})
            </h3>
            {shadows.map((shadow) => (
              <Card key={shadow.id} className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-text-primary">
                    Shadow {shadow.id}
                  </h4>
                  <button
                    onClick={() => removeShadow(shadow.id)}
                    disabled={shadows.length === 1}
                    className="text-xs px-2 py-1 text-error hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Remove
                  </button>
                </div>

                {/* X Offset */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-text-secondary">
                      X Offset
                    </label>
                    <span className="font-mono-num text-xs text-text-primary">
                      {shadow.offsetX}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={shadow.offsetX}
                    onChange={(e) =>
                      updateShadow(shadow.id, 'offsetX', Number(e.target.value))
                    }
                    className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Y Offset */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-text-secondary">
                      Y Offset
                    </label>
                    <span className="font-mono-num text-xs text-text-primary">
                      {shadow.offsetY}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={shadow.offsetY}
                    onChange={(e) =>
                      updateShadow(shadow.id, 'offsetY', Number(e.target.value))
                    }
                    className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Blur */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-text-secondary">
                      Blur
                    </label>
                    <span className="font-mono-num text-xs text-text-primary">
                      {shadow.blur}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={shadow.blur}
                    onChange={(e) =>
                      updateShadow(shadow.id, 'blur', Number(e.target.value))
                    }
                    className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Spread */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-text-secondary">
                      Spread
                    </label>
                    <span className="font-mono-num text-xs text-text-primary">
                      {shadow.spread}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={shadow.spread}
                    onChange={(e) =>
                      updateShadow(shadow.id, 'spread', Number(e.target.value))
                    }
                    className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Color and Alpha */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Color Picker */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-text-secondary">
                      Color
                    </label>
                    <input
                      type="color"
                      value={shadow.color}
                      onChange={(e) =>
                        updateShadow(shadow.id, 'color', e.target.value)
                      }
                      className="w-full h-8 rounded-[8px] border border-border cursor-pointer"
                    />
                  </div>

                  {/* Alpha Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-text-secondary">
                        Opacity
                      </label>
                      <span className="font-mono-num text-xs text-text-primary">
                        {(shadow.alpha * 100).toFixed(0)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={shadow.alpha}
                      onChange={(e) =>
                        updateShadow(shadow.id, 'alpha', Number(e.target.value))
                      }
                      className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                </div>

                {/* Inset Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shadow.inset}
                    onChange={(e) =>
                      updateShadow(shadow.id, 'inset', e.target.checked)
                    }
                    className="w-4 h-4 accent-accent rounded cursor-pointer"
                  />
                  <span className="text-xs font-medium text-text-primary">
                    Inset shadow
                  </span>
                </label>
              </Card>
            ))}
          </div>

          {/* Add Shadow Button */}
          <Button onClick={addShadow} variant="secondary" size="md" className="w-full">
            + Add Shadow Layer
          </Button>
        </div>
      </div>

      {/* CSS Output */}
      <div className="space-y-3">
        <h3 className="text-text-primary font-semibold">CSS Output</h3>
        <div className="bg-white border border-border rounded-[12px] p-4 space-y-3">
          <pre className="font-mono-num text-xs text-text-primary overflow-x-auto whitespace-pre-wrap break-words">
            {`box-shadow: ${cssOutput};`}
          </pre>
          <Button
            onClick={handleCopy}
            variant="secondary"
            size="sm"
            className="w-full"
          >
            Copy CSS
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}
