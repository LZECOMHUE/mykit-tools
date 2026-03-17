'use client';

import { useState, useMemo } from 'react';

const PRESET_SIZES = {
  round: [
    { label: '15cm (6")', cm: 15 },
    { label: '18cm (7")', cm: 18 },
    { label: '20cm (8")', cm: 20 },
    { label: '23cm (9")', cm: 23 },
    { label: '25cm (10")', cm: 25 },
    { label: '30cm (12")', cm: 30 },
  ],
  square: [
    { label: '20cm (8")', cm: 20 },
    { label: '23cm (9")', cm: 23 },
    { label: '25cm (10")', cm: 25 },
  ],
};

const METRIC_INGREDIENTS = [
  { name: 'Plain flour', unit: 'g', original: 225 },
  { name: 'Caster sugar', unit: 'g', original: 225 },
  { name: 'Butter', unit: 'g', original: 225 },
  { name: 'Eggs', unit: '', original: 4, isWhole: true },
  { name: 'Milk', unit: 'ml', original: 150 },
  { name: 'Baking powder', unit: 'tsp', original: 2, decimals: 1 },
  { name: 'Cocoa powder', unit: 'g', original: 40 },
  { name: 'Vanilla extract', unit: 'tsp', original: 1, decimals: 1 },
];

const US_INGREDIENTS = [
  { name: 'All-purpose flour', unit: 'cups', original: 1.75, decimals: 2 },
  { name: 'Granulated sugar', unit: 'cups', original: 1, decimals: 2 },
  { name: 'Butter', unit: 'sticks', original: 2, decimals: 1 },
  { name: 'Eggs', unit: '', original: 4, isWhole: true },
  { name: 'Milk', unit: 'cups', original: 0.63, decimals: 2 },
  { name: 'Baking powder', unit: 'tsp', original: 2, decimals: 1 },
  { name: 'Cocoa powder', unit: 'cups', original: 0.33, decimals: 2 },
  { name: 'Vanilla extract', unit: 'tsp', original: 1, decimals: 1 },
];

const calculateArea = (shape, size, length) => {
  const s = parseFloat(size) || 0;
  const l = parseFloat(length) || 0;
  if (shape === 'round') return Math.PI * (s / 2) * (s / 2);
  if (shape === 'square') return s * s;
  if (shape === 'rectangle') return s * l;
  return 0;
};

function ShapeVisualisation({ originalShape, originalSize, originalLength, targetShape, targetSize, targetLength }) {
  const oSize = parseFloat(originalSize) || 20;
  const tSize = parseFloat(targetSize) || 23;
  const oLength = parseFloat(originalLength) || oSize;
  const tLength = parseFloat(targetLength) || tSize;

  const maxDim = Math.max(oSize, tSize, oLength, tLength);
  const sc = maxDim > 0 ? Math.min(110 / maxDim, 6) : 4;

  const cx = 150;
  const cy = 95;

  const renderShape = (shape, size, length, colour, dashed) => {
    const sw = dashed ? '1.5' : '2';
    const dash = dashed ? '6 3' : undefined;
    const fill = dashed ? `${colour}08` : `${colour}15`;

    if (shape === 'round') {
      const r = (size / 2) * sc;
      return <circle cx={cx} cy={cy} r={r} fill={fill} stroke={colour} strokeWidth={sw} strokeDasharray={dash} />;
    }
    const w = size * sc;
    const h = (shape === 'rectangle' ? length : size) * sc;
    return <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={3} fill={fill} stroke={colour} strokeWidth={sw} strokeDasharray={dash} />;
  };

  const oLabel = originalShape === 'rectangle' ? `${oSize}x${oLength}cm` : `${oSize}cm`;
  const tLabel = targetShape === 'rectangle' ? `${tSize}x${tLength}cm` : `${tSize}cm`;

  return (
    <div>
      <p className="text-[11px] text-text-muted uppercase tracking-wide font-medium mb-3">Shape Visualisation</p>
      <svg viewBox="0 0 300 190" className="w-full" style={{ maxHeight: 260 }}>
        {/* Draw larger shape first so smaller overlaps on top */}
        {calculateArea(originalShape, originalSize, originalLength) >= calculateArea(targetShape, targetSize, targetLength) ? (
          <>
            {renderShape(originalShape, oSize, oLength, '#a3a3a3', true)}
            {renderShape(targetShape, tSize, tLength, '#2563eb', false)}
          </>
        ) : (
          <>
            {renderShape(targetShape, tSize, tLength, '#2563eb', false)}
            {renderShape(originalShape, oSize, oLength, '#a3a3a3', true)}
          </>
        )}

        {/* Legend */}
        <line x1="40" y1="175" x2="55" y2="175" stroke="#a3a3a3" strokeWidth="2" strokeDasharray="6 3" />
        <text x="60" y="179" fill="#a3a3a3" fontSize="10" fontFamily="'DM Sans', sans-serif">Your tin ({oLabel})</text>

        <line x1="175" y1="175" x2="190" y2="175" stroke="#2563eb" strokeWidth="2" />
        <text x="195" y="179" fill="#2563eb" fontSize="10" fontFamily="'DM Sans', sans-serif">Recipe tin ({tLabel})</text>
      </svg>
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

  const [unitSystem, setUnitSystem] = useState('metric');

  const inputCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono';
  const selectCls = 'w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer';
  const presetCls = 'px-2 py-1 text-xs bg-surface hover:bg-surface-hover border border-border rounded-[4px] text-text-primary transition';
  const presetAccentCls = 'px-2 py-1 text-xs bg-white hover:bg-surface border border-accent/30 rounded-[4px] text-accent transition';

  const handleOriginalShapeChange = (shape) => {
    setOriginalShape(shape);
    if (shape === 'rectangle') setOriginalLength('30');
    else setOriginalLength('');
  };

  const handleTargetShapeChange = (shape) => {
    setTargetShape(shape);
    if (shape === 'rectangle') setTargetLength('33');
    else setTargetLength('');
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

  const ingredients = unitSystem === 'metric' ? METRIC_INGREDIENTS : US_INGREDIENTS;

  const scaleIngredient = (amount, isWhole = false, decimals = 0) => {
    const scaled = amount * scaleFactor;
    if (isWhole) {
      const rounded = Math.round(scaled);
      const frac = scaled - Math.floor(scaled);
      if (frac > 0.25 && frac < 0.75) return `${Math.floor(scaled)} to ${Math.ceil(scaled)}`;
      return rounded.toString();
    }
    return decimals > 0 ? scaled.toFixed(decimals) : Math.round(scaled).toString();
  };

  const presets = (shape) => PRESET_SIZES[shape] || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
      {/* LEFT - inputs */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 space-y-4">
        {/* Your Tin */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-text-primary text-[15px]">Your Tin</h3>

          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Shape</label>
            <select value={originalShape} onChange={(e) => handleOriginalShapeChange(e.target.value)} className={selectCls}>
              <option value="round">Round</option>
              <option value="square">Square</option>
              <option value="rectangle">Rectangle</option>
            </select>
          </div>

          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">
              {originalShape === 'round' ? 'Diameter (cm)' : originalShape === 'square' ? 'Side (cm)' : 'Width (cm)'}
            </label>
            <input type="number" step="0.5" value={originalSize} onChange={(e) => setOriginalSize(e.target.value)} className={inputCls} />
          </div>

          {originalShape === 'rectangle' && (
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Length (cm)</label>
              <input type="number" step="0.5" value={originalLength} onChange={(e) => setOriginalLength(e.target.value)} className={inputCls} />
            </div>
          )}

          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Depth</label>
            <select value={originalDepth} onChange={(e) => setOriginalDepth(e.target.value)} className={selectCls}>
              <option value="2">2" (standard)</option>
              <option value="3">3" (deep)</option>
            </select>
          </div>

          {presets(originalShape).length > 0 && (
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Quick sizes</label>
              <div className="flex flex-wrap gap-1">
                {presets(originalShape).map((p) => (
                  <button key={p.cm} onClick={() => setOriginalSize(String(p.cm))} className={presetCls}>{p.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recipe Tin */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h3 className="font-heading font-bold text-accent text-[15px]">Recipe Tin</h3>

          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Shape</label>
            <select value={targetShape} onChange={(e) => handleTargetShapeChange(e.target.value)} className={selectCls}>
              <option value="round">Round</option>
              <option value="square">Square</option>
              <option value="rectangle">Rectangle</option>
            </select>
          </div>

          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">
              {targetShape === 'round' ? 'Diameter (cm)' : targetShape === 'square' ? 'Side (cm)' : 'Width (cm)'}
            </label>
            <input type="number" step="0.5" value={targetSize} onChange={(e) => setTargetSize(e.target.value)} className={inputCls} />
          </div>

          {targetShape === 'rectangle' && (
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Length (cm)</label>
              <input type="number" step="0.5" value={targetLength} onChange={(e) => setTargetLength(e.target.value)} className={inputCls} />
            </div>
          )}

          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Depth</label>
            <select value={targetDepth} onChange={(e) => setTargetDepth(e.target.value)} className={selectCls}>
              <option value="2">2" (standard)</option>
              <option value="3">3" (deep)</option>
            </select>
          </div>

          {presets(targetShape).length > 0 && (
            <div>
              <label className="text-[13px] text-text-secondary mb-1 block">Quick sizes</label>
              <div className="flex flex-wrap gap-1">
                {presets(targetShape).map((p) => (
                  <button key={p.cm} onClick={() => setTargetSize(String(p.cm))} className={presetAccentCls}>{p.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT - results */}
      <div className="space-y-4">
        {/* Shape visualisation */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <ShapeVisualisation
            originalShape={originalShape} originalSize={originalSize} originalLength={originalLength}
            targetShape={targetShape} targetSize={targetSize} targetLength={targetLength}
          />
        </div>

        {/* Scale factor hero */}
        <div className="bg-accent-muted border border-accent/15 rounded-[var(--radius-card)] px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-text-secondary">Scaling factor</p>
            <p className="text-3xl font-bold font-mono text-accent leading-tight">{scaleFactor.toFixed(2)}x</p>
          </div>
          <div className="text-right text-[12px] text-text-muted leading-snug hidden sm:block">
            <p>Your tin: <span className="font-mono">{originalArea.toFixed(0)} cm{'\u00B2'}</span></p>
            <p>Recipe tin: <span className="font-mono">{targetArea.toFixed(0)} cm{'\u00B2'}</span></p>
            <p className="text-text-secondary mt-1">Multiply all ingredients by <span className="font-mono font-medium">{scaleFactor.toFixed(2)}</span></p>
          </div>
        </div>

        {/* Ingredient scaling with metric/US tabs */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-heading font-bold text-text-primary text-sm">Ingredient Scaling</h4>
            <div className="flex rounded-[var(--radius-input)] border border-border overflow-hidden">
              <button
                onClick={() => setUnitSystem('metric')}
                className={`px-3 py-1 text-[12px] font-medium transition ${unitSystem === 'metric' ? 'bg-accent text-white' : 'bg-white text-text-secondary hover:bg-surface'}`}
              >
                Metric
              </button>
              <button
                onClick={() => setUnitSystem('us')}
                className={`px-3 py-1 text-[12px] font-medium transition ${unitSystem === 'us' ? 'bg-accent text-white' : 'bg-white text-text-secondary hover:bg-surface'}`}
              >
                US Cups
              </button>
            </div>
          </div>

          <p className="text-[11px] text-text-muted mb-3">Based on a standard Victoria sponge recipe{unitSystem === 'us' ? ' (US measurements)' : ''}</p>

          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-1.5 pr-2 font-semibold text-text-primary">Ingredient</th>
                <th className="text-right py-1.5 px-2 font-semibold text-text-primary w-20">Original</th>
                <th className="text-right py-1.5 pl-2 font-semibold text-accent w-20">Scaled</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ing) => (
                <tr key={ing.name} className="border-b border-border/50">
                  <td className="py-1.5 pr-2 text-text-secondary">{ing.name}{ing.unit ? ` (${ing.unit})` : ''}</td>
                  <td className="py-1.5 px-2 text-right font-mono text-text-primary">{ing.decimals ? ing.original.toFixed(ing.decimals) : ing.original}</td>
                  <td className="py-1.5 pl-2 text-right font-mono font-medium text-accent">{scaleIngredient(ing.original, ing.isWhole, ing.decimals)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Baking time */}
        <div className="bg-surface border border-border rounded-[var(--radius-card)] px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-text-muted uppercase font-medium tracking-wide mb-1">Baking time adjustment</p>
              <p className="text-text-primary text-[13px]">
                Original recipe time x <span className="font-mono font-bold">{timeAdjustment.toFixed(2)}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-text-muted">
                {scaleFactor > 1.2 ? 'Larger tin, check earlier' : scaleFactor < 0.7 ? 'Smaller tin, bakes faster' : 'Same time, same temp'}
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-[13px] font-medium text-text-primary mb-2">Tips</p>
          <div className="text-[13px] text-text-secondary space-y-1.5">
            <p>Fill tins about two-thirds full for the best rise. Overfilling causes spillage, underfilling gives a flat result.</p>
            <p>Temperature stays the same when changing tin size. Only the ingredients and baking time need adjusting.</p>
            <p>Always check doneness with a skewer 5 minutes before the calculated time, especially with unfamiliar tin sizes.</p>
            <p>Deep tins (3") need lower temperature and longer baking to cook through without burning the outside.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
