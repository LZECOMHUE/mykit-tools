'use client';

import { useState, useMemo } from 'react';

const PRESET_SIZES = {
  round: [
    { size: '15cm (6")', cm: 15 },
    { size: '18cm (7")', cm: 18 },
    { size: '20cm (8")', cm: 20 },
    { size: '23cm (9")', cm: 23 },
    { size: '25cm (10")', cm: 25 },
    { size: '30cm (12")', cm: 30 },
  ],
  square: [
    { size: '20cm (8")', cm: 20 },
    { size: '23cm (9")', cm: 23 },
    { size: '25cm (10")', cm: 25 },
  ],
};

const COMMON_INGREDIENTS = [
  { name: 'Plain flour (g)', original: 225 },
  { name: 'Caster sugar (g)', original: 225 },
  { name: 'Butter (g)', original: 225 },
  { name: 'Eggs', original: 4, isWhole: true },
  { name: 'Milk (ml)', original: 150 },
  { name: 'Baking powder (tsp)', original: 2, decimals: 1 },
];

const calculateArea = (shape, size, length) => {
  if (shape === 'round') {
    const radius = parseFloat(size) / 2;
    return Math.PI * radius * radius;
  }
  if (shape === 'square') {
    return parseFloat(size) ** 2;
  }
  if (shape === 'rectangle') {
    return parseFloat(size) * parseFloat(length);
  }
  return 0;
};

function VisualComparison({ originalShape, originalSize, originalLength, targetShape, targetSize, targetLength }) {
  const maxDimension = Math.max(
    parseFloat(originalSize) || 20,
    parseFloat(targetSize) || 23,
    parseFloat(originalLength) || 0,
    parseFloat(targetLength) || 0
  );

  const scale = Math.min(280 / maxDimension, 5);

  const getShapePathAndDimensions = (shape, size, length) => {
    size = parseFloat(size) || 20;
    length = parseFloat(length) || 30;

    if (shape === 'round') {
      const radius = (size / 2) * scale;
      const cx = 150;
      const cy = 100;
      return {
        shape: 'circle',
        cx,
        cy,
        radius,
        displaySize: `${size}cm Ø`,
        width: size,
        height: size,
      };
    }

    if (shape === 'square') {
      const sideLength = size * scale;
      const x = 150 - sideLength / 2;
      const y = 100 - sideLength / 2;
      return {
        shape: 'square',
        x,
        y,
        width: sideLength,
        height: sideLength,
        displaySize: `${size}cm`,
        actualWidth: size,
        actualHeight: size,
      };
    }

    if (shape === 'rectangle') {
      const w = size * scale;
      const l = length * scale;
      const x = 150 - w / 2;
      const y = 100 - l / 2;
      return {
        shape: 'rectangle',
        x,
        y,
        width: w,
        height: l,
        displaySize: `${size} x ${length}cm`,
        actualWidth: size,
        actualHeight: length,
      };
    }
  };

  const original = getShapePathAndDimensions(originalShape, originalSize, originalLength);
  const target = getShapePathAndDimensions(targetShape, targetSize, targetLength);

  return (
    <div className="space-y-4">
      <svg
        viewBox="0 0 300 200"
        className="w-full border border-border rounded-[var(--radius-input)] bg-white"
        style={{ minHeight: '280px' }}
      >
        {original.shape === 'circle' && (
          <circle cx={original.cx} cy={original.cy} r={original.radius} fill="none" stroke="#a3a3a3" strokeWidth="2" />
        )}
        {original.shape === 'square' && (
          <rect x={original.x} y={original.y} width={original.width} height={original.height} fill="none" stroke="#a3a3a3" strokeWidth="2" rx="4" />
        )}
        {original.shape === 'rectangle' && (
          <rect x={original.x} y={original.y} width={original.width} height={original.height} fill="none" stroke="#a3a3a3" strokeWidth="2" rx="4" />
        )}

        {target.shape === 'circle' && (
          <circle cx={target.cx} cy={target.cy} r={target.radius} fill="none" stroke="#2563eb" strokeWidth="2" />
        )}
        {target.shape === 'square' && (
          <rect x={target.x} y={target.y} width={target.width} height={target.height} fill="none" stroke="#2563eb" strokeWidth="2" rx="4" />
        )}
        {target.shape === 'rectangle' && (
          <rect x={target.x} y={target.y} width={target.width} height={target.height} fill="none" stroke="#2563eb" strokeWidth="2" rx="4" />
        )}

        <text
          x={original.shape === 'circle' ? original.cx : original.x + original.width / 2}
          y={original.shape === 'circle' ? original.cy + original.radius + 20 : original.y + original.height + 20}
          textAnchor="middle"
          className="font-mono text-[12px] fill-text-secondary"
        >
          {original.displaySize}
        </text>

        <text
          x={target.shape === 'circle' ? target.cx : target.x + target.width / 2}
          y={target.shape === 'circle' ? target.cy + target.radius + 20 : target.y + target.height + 20}
          textAnchor="middle"
          className="font-mono text-[12px] fill-accent"
        >
          {target.displaySize}
        </text>
      </svg>

      <div className="grid grid-cols-2 gap-3">
        <div className="text-center">
          <p className="text-text-muted text-xs mb-1">Original</p>
          <p className="font-mono font-bold text-text-primary">{original.displaySize}</p>
        </div>
        <div className="text-center">
          <p className="text-accent text-xs mb-1">Target</p>
          <p className="font-mono font-bold text-accent">{target.displaySize}</p>
        </div>
      </div>
    </div>
  );
}

export default function CakeTinConverter() {
  const [originalShape, setOriginalShape] = useState('round');
  const [originalSize, setOriginalSize] = useState('20');
  const [originalLength, setOriginalLength] = useState('');
  const [originalDepth, setOriginalDepth] = useState('2');

  const [targetShape, setTargetShape] = useState('round');
  const [targetSize, setTargetSize] = useState('23');
  const [targetLength, setTargetLength] = useState('');
  const [targetDepth, setTargetDepth] = useState('2');

  const inputCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono';
  const selectCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer';

  const handleOriginalShapeChange = (shape) => {
    setOriginalShape(shape);
    if (shape === 'round' || shape === 'square') {
      setOriginalLength('');
    } else if (shape === 'rectangle') {
      setOriginalLength('30');
    }
  };

  const handleTargetShapeChange = (shape) => {
    setTargetShape(shape);
    if (shape === 'round' || shape === 'square') {
      setTargetLength('');
    } else if (shape === 'rectangle') {
      setTargetLength('33');
    }
  };

  const originalArea = useMemo(() => calculateArea(originalShape, originalSize, originalLength), [originalShape, originalSize, originalLength]);
  const targetArea = useMemo(() => calculateArea(targetShape, targetSize, targetLength), [targetShape, targetSize, targetLength]);

  const scaleFactor = useMemo(() => {
    if (originalArea === 0) return 1;
    return targetArea / originalArea;
  }, [originalArea, targetArea]);

  const timeAdjustment = useMemo(() => {
    if (scaleFactor <= 0.7) return 0.85;
    if (scaleFactor <= 1) return 1;
    if (scaleFactor <= 1.2) return 1;
    if (scaleFactor <= 1.5) return 0.95;
    return 0.9;
  }, [scaleFactor]);

  const showOriginalLength = originalShape === 'rectangle';
  const showTargetLength = targetShape === 'rectangle';

  const scaleIngredient = (amount, isWhole = false, decimals = 0) => {
    const scaled = amount * scaleFactor;
    if (isWhole) {
      const whole = Math.round(scaled);
      const fractional = scaled % 1;
      if (fractional < 0.25) return whole.toString();
      if (fractional < 0.75) return `${whole} to ${whole + 1}`;
      return (whole + 1).toString();
    }
    return decimals > 0 ? scaled.toFixed(decimals) : Math.round(scaled).toString();
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      {/* Two-column layout: left panel (inputs), right panel (visual + results) */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
        {/* LEFT PANEL: Input Controls */}
        <div className="space-y-6">
          {/* YOUR TIN SECTION */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-text-primary text-[15px]">Your Tin</h3>

            {/* Shape Select */}
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5">Shape</label>
              <select value={originalShape} onChange={(e) => handleOriginalShapeChange(e.target.value)} className={selectCls}>
                <option value="round">Round</option>
                <option value="square">Square</option>
                <option value="rectangle">Rectangle</option>
              </select>
            </div>

            {/* Size Input */}
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5">
                {originalShape === 'round' ? 'Diameter (cm)' : originalShape === 'square' ? 'Side (cm)' : 'Width (cm)'}
              </label>
              <input type="number" step="0.1" value={originalSize} onChange={(e) => setOriginalSize(e.target.value)} className={inputCls} />
            </div>

            {/* Length Input (Rectangle only) */}
            {showOriginalLength && (
              <div>
                <label className="block text-text-secondary text-xs font-medium mb-1.5">Length (cm)</label>
                <input type="number" step="0.1" value={originalLength} onChange={(e) => setOriginalLength(e.target.value)} className={inputCls} />
              </div>
            )}

            {/* Depth Select */}
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5">Depth</label>
              <select value={originalDepth} onChange={(e) => setOriginalDepth(e.target.value)} className={selectCls}>
                <option value="2">2" (standard)</option>
                <option value="3">3" (deep)</option>
              </select>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5">Quick sizes</label>
              <div className="flex flex-wrap gap-1">
                {originalShape === 'round' &&
                  PRESET_SIZES.round.map((preset) => (
                    <button
                      key={preset.size}
                      onClick={() => setOriginalSize(preset.cm.toString())}
                      className="px-2 py-1 text-xs bg-surface hover:bg-surface-hover border border-border rounded-[4px] text-text-primary transition"
                    >
                      {preset.size}
                    </button>
                  ))}
                {originalShape === 'square' &&
                  PRESET_SIZES.square.map((preset) => (
                    <button
                      key={preset.size}
                      onClick={() => setOriginalSize(preset.cm.toString())}
                      className="px-2 py-1 text-xs bg-surface hover:bg-surface-hover border border-border rounded-[4px] text-text-primary transition"
                    >
                      {preset.size}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* RECIPE TIN SECTION */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="font-heading font-bold text-accent text-[15px]">Recipe Tin</h3>

            {/* Shape Select */}
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5">Shape</label>
              <select value={targetShape} onChange={(e) => handleTargetShapeChange(e.target.value)} className={selectCls}>
                <option value="round">Round</option>
                <option value="square">Square</option>
                <option value="rectangle">Rectangle</option>
              </select>
            </div>

            {/* Size Input */}
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5">
                {targetShape === 'round' ? 'Diameter (cm)' : targetShape === 'square' ? 'Side (cm)' : 'Width (cm)'}
              </label>
              <input type="number" step="0.1" value={targetSize} onChange={(e) => setTargetSize(e.target.value)} className={inputCls} />
            </div>

            {/* Length Input (Rectangle only) */}
            {showTargetLength && (
              <div>
                <label className="block text-text-secondary text-xs font-medium mb-1.5">Length (cm)</label>
                <input type="number" step="0.1" value={targetLength} onChange={(e) => setTargetLength(e.target.value)} className={inputCls} />
              </div>
            )}

            {/* Depth Select */}
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5">Depth</label>
              <select value={targetDepth} onChange={(e) => setTargetDepth(e.target.value)} className={selectCls}>
                <option value="2">2" (standard)</option>
                <option value="3">3" (deep)</option>
              </select>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5">Quick sizes</label>
              <div className="flex flex-wrap gap-1">
                {targetShape === 'round' &&
                  PRESET_SIZES.round.map((preset) => (
                    <button
                      key={preset.size}
                      onClick={() => setTargetSize(preset.cm.toString())}
                      className="px-2 py-1 text-xs bg-accent bg-opacity-10 hover:bg-opacity-20 border border-accent border-opacity-30 rounded-[4px] text-accent transition"
                    >
                      {preset.size}
                    </button>
                  ))}
                {targetShape === 'square' &&
                  PRESET_SIZES.square.map((preset) => (
                    <button
                      key={preset.size}
                      onClick={() => setTargetSize(preset.cm.toString())}
                      className="px-2 py-1 text-xs bg-accent bg-opacity-10 hover:bg-opacity-20 border border-accent border-opacity-30 rounded-[4px] text-accent transition"
                    >
                      {preset.size}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Visual & Results */}
        <div className="space-y-6">
          {/* VISUAL COMPARISON (Hero) */}
          <div className="bg-white border border-border rounded-[var(--radius-input)] p-6">
            <VisualComparison originalShape={originalShape} originalSize={originalSize} originalLength={originalLength} targetShape={targetShape} targetSize={targetSize} targetLength={targetLength} />
          </div>

          {/* SCALE FACTOR CARD */}
          <div className="bg-accent-muted rounded-[var(--radius-input)] p-5 border border-accent border-opacity-20">
            <p className="text-text-muted text-xs font-medium mb-1">Scaling Factor</p>
            <p className="font-mono font-bold text-accent text-4xl">{scaleFactor.toFixed(2)}×</p>
            <p className="text-text-secondary text-xs mt-2">Multiply all ingredients by this number</p>
          </div>

          {/* AREA COMPARISON */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface rounded-[var(--radius-input)] p-4 border border-border">
              <p className="text-text-muted text-xs font-medium mb-1">Your Tin</p>
              <p className="font-mono font-bold text-text-primary text-lg">{originalArea.toFixed(0)}</p>
              <p className="text-text-muted text-xs">cm²</p>
            </div>
            <div className="bg-surface rounded-[var(--radius-input)] p-4 border border-border">
              <p className="text-accent text-xs font-medium mb-1">Recipe Tin</p>
              <p className="font-mono font-bold text-accent text-lg">{targetArea.toFixed(0)}</p>
              <p className="text-text-muted text-xs">cm²</p>
            </div>
          </div>

          {/* SCALING TABLE */}
          <div className="bg-white border border-border rounded-[var(--radius-input)] p-5">
            <h4 className="font-heading font-bold text-text-primary text-sm mb-4">Ingredient Scaling</h4>
            <div className="space-y-2">
              {COMMON_INGREDIENTS.map((ing) => (
                <div key={ing.name} className="flex items-center justify-between gap-3 pb-2 border-b border-border last:border-b-0">
                  <p className="text-text-secondary text-xs">{ing.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-text-primary text-sm">{ing.original}</span>
                    <span className="text-text-muted text-xs">→</span>
                    <span className="font-mono font-bold text-accent text-sm">{scaleIngredient(ing.original, ing.isWhole, ing.decimals)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BAKING TIME ADJUSTMENT */}
          <div className="bg-surface border border-border rounded-[var(--radius-input)] p-5">
            <p className="text-text-secondary text-xs font-medium mb-2">Baking Time Adjustment</p>
            <p className="text-text-primary text-sm">
              Original recipe time × <span className="font-mono font-bold">{timeAdjustment.toFixed(2)}</span>
            </p>
            <p className="text-text-muted text-xs mt-2">
              {scaleFactor > 1.2 ? 'Larger tins need slightly less time. Start checking earlier.' : scaleFactor < 0.7 ? 'Smaller tins bake faster. Start checking earlier.' : 'Keep baking time approximately the same.'}
            </p>
          </div>

          {/* TIPS */}
          <div className="bg-white border border-border rounded-[var(--radius-input)] p-5">
            <h4 className="font-heading font-bold text-text-primary text-sm mb-3">Tips</h4>
            <ul className="text-xs text-text-secondary space-y-2">
              <li>Depth matters: deep tins hold more batter</li>
              <li>Shape affects heat distribution: round and square behave differently</li>
              <li>Always check doneness with a skewer, especially with new sizes</li>
              <li>Temperature stays the same, only ingredients and time change</li>
              <li>Fill tins 2/3 full for best results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
