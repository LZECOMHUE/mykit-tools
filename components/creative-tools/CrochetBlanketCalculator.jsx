'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Yarn estimates per stitch type and yarn weight
const STITCH_YARN_USAGE = {
  'single-crochet': {
    lace: 0.8,
    fingering: 1.0,
    DK: 1.2,
    worsted: 1.5,
    aran: 1.8,
    chunky: 2.0,
    'super-chunky': 2.3,
  },
  'half-double': {
    lace: 1.0,
    fingering: 1.2,
    DK: 1.5,
    worsted: 1.8,
    aran: 2.1,
    chunky: 2.4,
    'super-chunky': 2.7,
  },
  'double': {
    lace: 1.2,
    fingering: 1.5,
    DK: 1.8,
    worsted: 2.1,
    aran: 2.4,
    chunky: 2.7,
    'super-chunky': 3.0,
  },
  'granny-square': {
    lace: 1.5,
    fingering: 1.8,
    DK: 2.2,
    worsted: 2.6,
    aran: 3.0,
    chunky: 3.4,
    'super-chunky': 3.8,
  },
};

// Presets for blanket dimensions
const BLANKET_PRESETS = [
  { name: 'Baby Blanket', width: 75, height: 100 },
  { name: 'Throw Blanket', width: 130, height: 180 },
  { name: 'Single Bed Blanket', width: 180, height: 230 },
  { name: 'Double Bed Blanket', width: 230, height: 230 },
  { name: 'King Size Blanket', width: 260, height: 260 },
];

// Average crochet speed in square metres per hour
const CROCHET_SPEED = 0.15; // square metres per hour

export default function CrochetBlanketCalculator() {
  const [usePreset, setUsePreset] = useState(true);
  const [presetIdx, setPresetIdx] = useState(1); // Throw blanket
  const [customWidth, setCustomWidth] = useState('130');
  const [customHeight, setCustomHeight] = useState('180');
  const [stitchType, setStitchType] = useState('double');
  const [yarnWeight, setYarnWeight] = useState('worsted');
  const [pricePerBall, setPricePerBall] = useState('5.00');
  const [metresPerBall, setMetresPerBall] = useState('150');

  const [width, height] = usePreset
    ? [BLANKET_PRESETS[presetIdx].width, BLANKET_PRESETS[presetIdx].height]
    : [parseFloat(customWidth) || 0, parseFloat(customHeight) || 0];

  const results = useMemo(() => {
    const w = width;
    const h = height;
    const price = parseFloat(pricePerBall) || 0;
    const metres = parseFloat(metresPerBall) || 0;

    if (w <= 0 || h <= 0 || price <= 0 || metres <= 0) return null;

    // Calculate area in square centimetres
    const areaCm2 = w * h;
    const areaM2 = areaCm2 / 10000;

    // Get yarn usage per square metre
    const usagePerM2 = STITCH_YARN_USAGE[stitchType]?.[yarnWeight] || 2.0;

    // Calculate total metres needed (add 10% for joining and edges)
    const totalMetres = (areaM2 * 100 * usagePerM2) * 1.1;
    const ballsExact = totalMetres / metres;
    const ballsNeeded = Math.ceil(ballsExact) + 1; // Add 1 extra

    const totalCost = ballsNeeded * price;

    // Calculate time estimate
    const timeHours = areaM2 / CROCHET_SPEED;
    const timeHoursFull = Math.floor(timeHours);
    const timeMinutes = Math.round((timeHours - timeHoursFull) * 60);

    return {
      width: w,
      height: h,
      areaM2: parseFloat(areaM2.toFixed(2)),
      totalMetres: Math.round(totalMetres),
      ballsExact: parseFloat(ballsExact.toFixed(2)),
      ballsNeeded,
      totalCost: parseFloat(totalCost.toFixed(2)),
      timeHours: timeHoursFull,
      timeMinutes,
    };
  }, [width, height, stitchType, yarnWeight, pricePerBall, metresPerBall]);

  const handleReset = () => {
    setUsePreset(true);
    setPresetIdx(1);
    setCustomWidth('130');
    setCustomHeight('180');
    setStitchType('double');
    setYarnWeight('worsted');
    setPricePerBall('5.00');
    setMetresPerBall('150');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4 space-y-4">
      {/* Input Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
        {/* Left: Configuration */}
        <Card>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h4 className="text-text-primary text-[13px] font-semibold mb-3">Blanket Size</h4>
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="radio"
                  checked={usePreset}
                  onChange={() => setUsePreset(true)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-text-primary text-sm">Use preset</span>
              </label>
              {usePreset && (
                <select
                  value={presetIdx}
                  onChange={(e) => setPresetIdx(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                >
                  {BLANKET_PRESETS.map((preset, idx) => (
                    <option key={idx} value={idx}>
                      {preset.name} ({preset.width}x{preset.height}cm)
                    </option>
                  ))}
                </select>
              )}

              <label className="flex items-center gap-2 cursor-pointer mt-3">
                <input
                  type="radio"
                  checked={!usePreset}
                  onChange={() => setUsePreset(false)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-text-primary text-sm">Custom size</span>
              </label>
              {!usePreset && (
                <div className="space-y-3 mt-3">
                  <div>
                    <label className="block text-text-primary text-[13px] font-medium mb-2">Width (cm)</label>
                    <input
                      type="number"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      step="5"
                      min="0"
                      className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                    />
                  </div>
                  <div>
                    <label className="block text-text-primary text-[13px] font-medium mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                      step="5"
                      min="0"
                      className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="border-b border-border pb-4">
              <h4 className="text-text-primary text-[13px] font-semibold mb-3">Crochet Details</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-text-primary text-[13px] font-medium mb-2">Stitch Type</label>
                  <select
                    value={stitchType}
                    onChange={(e) => setStitchType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  >
                    <option value="single-crochet">Single Crochet</option>
                    <option value="half-double">Half Double Crochet</option>
                    <option value="double">Double Crochet</option>
                    <option value="granny-square">Granny Square</option>
                  </select>
                </div>

                <div>
                  <label className="block text-text-primary text-[13px] font-medium mb-2">Yarn Weight</label>
                  <select
                    value={yarnWeight}
                    onChange={(e) => setYarnWeight(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  >
                    <option value="lace">Lace</option>
                    <option value="fingering">Fingering</option>
                    <option value="DK">DK</option>
                    <option value="worsted">Worsted</option>
                    <option value="aran">Aran</option>
                    <option value="chunky">Chunky</option>
                    <option value="super-chunky">Super Chunky</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-b border-border pb-4">
              <h4 className="text-text-primary text-[13px] font-semibold mb-3">Yarn Specs</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-text-primary text-[13px] font-medium mb-2">Price per Ball (£)</label>
                  <input
                    type="number"
                    value={pricePerBall}
                    onChange={(e) => setPricePerBall(e.target.value)}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>

                <div>
                  <label className="block text-text-primary text-[13px] font-medium mb-2">Metres per Ball</label>
                  <input
                    type="number"
                    value={metresPerBall}
                    onChange={(e) => setMetresPerBall(e.target.value)}
                    step="5"
                    min="0"
                    className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Button variant="secondary" onClick={handleReset} className="w-full">
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Right: Hero Results */}
        {results && (
          <Card className="bg-accent-muted border-accent-muted">
            <div className="space-y-4">
              <div>
                <h3 className="text-text-secondary text-[13px] font-medium mb-1">Total Cost</h3>
                <p className="font-mono text-4xl font-bold text-accent">
                  £{results.totalCost.toFixed(2)}
                </p>
              </div>

              <div>
                <h3 className="text-text-secondary text-[13px] font-medium mb-1">Time to Crochet</h3>
                <p className="font-mono text-3xl font-bold text-text-primary">
                  {results.timeHours} hours {results.timeMinutes}m
                </p>
              </div>

              <div className="bg-white rounded-[var(--radius-card)] p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Dimensions</span>
                  <span className="font-mono text-text-primary font-semibold">
                    {results.width} × {results.height} cm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Area</span>
                  <span className="font-mono text-text-primary font-semibold">
                    {results.areaM2} m²
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Yarn Needed</span>
                  <span className="font-mono text-text-primary font-semibold">
                    {results.totalMetres} m
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-text-secondary text-sm">Balls to Buy</span>
                  <span className="font-mono text-text-primary font-semibold">
                    {results.ballsNeeded}
                  </span>
                </div>
              </div>

              <p className="text-text-secondary text-xs leading-relaxed">
                Your {results.width}×{results.height}cm blanket will cost approximately <strong>£{results.totalCost.toFixed(2)}</strong> and take roughly <strong>{results.timeHours} hours {results.timeMinutes > 0 ? `${results.timeMinutes} minutes` : ''}</strong>.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Info Section */}
      <details className="text-xs text-text-muted mt-2">
        <summary className="cursor-pointer hover:text-text-secondary">About this calculator</summary>
        <div className="mt-2 space-y-1">
          <ul className="space-y-1 list-disc list-inside">
            <li>Yarn estimates include an extra 10% for joining squares and edging</li>
            <li>We add 1 extra ball to account for mistakes and adjustments</li>
            <li>Time estimates assume an average crochet speed of 0.15 m² per hour</li>
            <li>Granny square projects typically use more yarn than single stitch blankets</li>
          </ul>
        </div>
      </details>
    </div>
  );
}
