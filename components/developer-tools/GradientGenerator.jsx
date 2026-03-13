'use client';

import { useState, useMemo, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function GradientGenerator() {
  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState([
    { id: 1, color: '#ff6b6b', position: 0 },
    { id: 2, color: '#4ecdc4', position: 100 },
  ]);

  const presets = {
    sunset: [
      { color: '#ff6b6b', position: 0 },
      { color: '#feca57', position: 50 },
      { color: '#ff9ff3', position: 100 },
    ],
    ocean: [
      { color: '#667eea', position: 0 },
      { color: '#764ba2', position: 100 },
    ],
    forest: [
      { color: '#134e5e', position: 0 },
      { color: '#71b280', position: 100 },
    ],
    aurora: [
      { color: '#a8edea', position: 0 },
      { color: '#fed6e3', position: 100 },
    ],
    midnight: [
      { color: '#0f2027', position: 0 },
      { color: '#203a43', position: 50 },
      { color: '#2c5364', position: 100 },
    ],
    peach: [
      { color: '#fccb90', position: 0 },
      { color: '#d57eeb', position: 100 },
    ],
  };

  const applyPreset = useCallback((presetKey) => {
    const preset = presets[presetKey];
    const stopsWithIds = preset.map((stop, index) => ({
      ...stop,
      id: index + 1,
    }));
    setStops(stopsWithIds);
  }, []);

  const updateStop = useCallback((id, field, value) => {
    setStops(stops.map((stop) =>
      stop.id === id ? { ...stop, [field]: value } : stop
    ));
  }, [stops]);

  const addStop = useCallback(() => {
    const newId = Math.max(...stops.map((s) => s.id), 0) + 1;
    const midPosition = (stops[stops.length - 1].position + stops[0].position) / 2;
    setStops([
      ...stops,
      {
        id: newId,
        color: '#000000',
        position: Math.min(midPosition, 100),
      },
    ]);
  }, [stops]);

  const removeStop = useCallback((id) => {
    if (stops.length > 2) {
      setStops(stops.filter((stop) => stop.id !== id));
    }
  }, [stops]);

  const sortedStops = useMemo(() => {
    return [...stops].sort((a, b) => a.position - b.position);
  }, [stops]);

  const cssOutput = useMemo(() => {
    const stopStrings = sortedStops.map(
      (stop) => `${stop.color} ${stop.position}%`
    );

    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${stopStrings.join(', ')})`;
    } else {
      return `radial-gradient(circle, ${stopStrings.join(', ')})`;
    }
  }, [gradientType, angle, sortedStops]);

  const gradientStyle = `background: ${cssOutput};`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`background: ${cssOutput};`);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 py-8 px-4">
      {/* Title */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-text-primary">
          CSS Gradient Generator
        </h1>
        <p className="text-text-secondary mt-2">
          Create beautiful gradients with multiple colour stops
        </p>
      </div>

      {/* Main Grid: Preview + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Preview */}
        <div className="flex flex-col items-center justify-center min-h-96 rounded-[12px] p-8" style={{ background: cssOutput }}>
          <div className="text-center">
            <p className="text-white font-semibold drop-shadow">Gradient Preview</p>
          </div>
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
                  onClick={() => applyPreset(key)}
                  className="px-3 py-2 bg-surface border border-border rounded-[8px] text-text-primary text-sm font-medium hover:bg-surface-hover transition-colors capitalize"
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Gradient Type */}
          <div className="space-y-2">
            <h3 className="text-text-primary font-semibold">Type</h3>
            <div className="flex gap-2">
              {['linear', 'radial'].map((type) => (
                <button
                  key={type}
                  onClick={() => setGradientType(type)}
                  className={`flex-1 px-3 py-2 rounded-[8px] text-sm font-medium transition-colors ${
                    gradientType === type
                      ? 'bg-accent text-white'
                      : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  {type === 'linear' ? 'Linear' : 'Radial'}
                </button>
              ))}
            </div>
          </div>

          {/* Angle Slider (only for linear) */}
          {gradientType === 'linear' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-text-primary font-semibold">Angle</label>
                <span className="font-mono-num text-text-primary">
                  {angle}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-accent"
              />
            </div>
          )}
        </div>
      </div>

      {/* Colour Stops */}
      <div className="space-y-3">
        <h3 className="text-text-primary font-semibold">
          Colour Stops ({stops.length})
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sortedStops.map((stop) => (
            <Card key={stop.id} className="flex items-center gap-4">
              {/* Colour Picker */}
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(stop.id, 'color', e.target.value)}
                className="w-12 h-12 rounded-[8px] border border-border cursor-pointer flex-shrink-0"
              />

              {/* Hex Value */}
              <div className="flex-1 font-mono-num text-sm text-text-primary">
                {stop.color}
              </div>

              {/* Position Slider */}
              <div className="flex-1 space-y-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stop.position}
                  onChange={(e) =>
                    updateStop(stop.id, 'position', Number(e.target.value))
                  }
                  className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-accent"
                />
              </div>

              {/* Position Value */}
              <div className="text-xs font-mono-num text-text-primary w-10 text-right">
                {stop.position}%
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeStop(stop.id)}
                disabled={stops.length === 2}
                className="text-xs px-2 py-1 text-error hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                Remove
              </button>
            </Card>
          ))}
        </div>

        {/* Add Stop Button */}
        {stops.length < 5 && (
          <Button
            onClick={addStop}
            variant="secondary"
            size="sm"
            className="w-full"
          >
            + Add Colour Stop
          </Button>
        )}
      </div>

      {/* CSS Output */}
      <div className="space-y-3">
        <h3 className="text-text-primary font-semibold">CSS Output</h3>
        <div className="bg-white border border-border rounded-[12px] p-4 space-y-4">
          {/* Shorthand */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-secondary">Standard CSS</p>
            <pre className="font-mono-num text-xs text-text-primary overflow-x-auto whitespace-pre-wrap break-words bg-surface p-3 rounded-[8px]">
              {`background: ${cssOutput};`}
            </pre>
          </div>

          {/* Vendor Prefixes */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-secondary">With Vendor Prefixes</p>
            <pre className="font-mono-num text-xs text-text-primary overflow-x-auto whitespace-pre-wrap break-words bg-surface p-3 rounded-[8px]">
              {`background: -webkit-${cssOutput};
background: -moz-${cssOutput};
background: ${cssOutput};`}
            </pre>
          </div>

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
