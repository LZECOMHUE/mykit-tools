'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const PRESET_SIZES = {
  round: [
    { size: '15cm (6")', cm: 15, name: '6" round' },
    { size: '18cm (7")', cm: 18, name: '7" round' },
    { size: '20cm (8")', cm: 20, name: '8" round' },
    { size: '23cm (9")', cm: 23, name: '9" round' },
    { size: '25cm (10")', cm: 25, name: '10" round' },
    { size: '30cm (12")', cm: 30, name: '12" round' },
  ],
  square: [
    { size: '20cm (8")', cm: 20, name: '8" square' },
    { size: '23cm (9")', cm: 23, name: '9" square' },
    { size: '25cm (10")', cm: 25, name: '10" square' },
  ],
  rectangle: [
    { size: '20×30cm (8×12")', width: 20, length: 30, name: '8×12" rectangle' },
    { size: '23×33cm (9×13")', width: 23, length: 33, name: '9×13" rectangle' },
  ],
};

const calculateArea = (shape, original) => {
  if (shape === 'round') {
    const radius = (original.diameter || original.cm) / 2;
    return Math.PI * radius * radius;
  }
  if (shape === 'square') {
    const side = original.cm || original.width;
    return side * side;
  }
  if (shape === 'rectangle') {
    return (original.width || original.w) * (original.length || original.l);
  }
  return 0;
};

export default function CakeTinConverter() {
  const [originalShape, setOriginalShape] = useState('round');
  const [originalSize, setOriginalSize] = useState('20');
  const [originalLength, setOriginalLength] = useState('');
  const [originalDepth, setOriginalDepth] = useState('2');

  const [targetShape, setTargetShape] = useState('round');
  const [targetSize, setTargetSize] = useState('23');
  const [targetLength, setTargetLength] = useState('');
  const [targetDepth, setTargetDepth] = useState('2');

  // Calculate areas
  const originalArea = useMemo(() => {
    if (originalShape === 'round') {
      const radius = parseFloat(originalSize) / 2;
      return Math.PI * radius * radius;
    }
    if (originalShape === 'square') {
      return parseFloat(originalSize) ** 2;
    }
    if (originalShape === 'rectangle') {
      return parseFloat(originalSize) * parseFloat(originalLength);
    }
    return 0;
  }, [originalShape, originalSize, originalLength]);

  const targetArea = useMemo(() => {
    if (targetShape === 'round') {
      const radius = parseFloat(targetSize) / 2;
      return Math.PI * radius * radius;
    }
    if (targetShape === 'square') {
      return parseFloat(targetSize) ** 2;
    }
    if (targetShape === 'rectangle') {
      return parseFloat(targetSize) * parseFloat(targetLength);
    }
    return 0;
  }, [targetShape, targetSize, targetLength]);

  // Calculate scale factor
  const scaleFactor = useMemo(() => {
    if (originalArea === 0) return 1;
    return targetArea / originalArea;
  }, [originalArea, targetArea]);

  // Estimate time adjustment (larger = slightly less time)
  const timeAdjustment = useMemo(() => {
    if (scaleFactor <= 0.7) return 0.85;
    if (scaleFactor <= 1) return 1;
    if (scaleFactor <= 1.2) return 1;
    if (scaleFactor <= 1.5) return 0.95;
    return 0.9;
  }, [scaleFactor]);

  const showOriginalLength = originalShape === 'rectangle';
  const showTargetLength = targetShape === 'rectangle';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Original Tin */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Original Tin
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Shape */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tin Shape
              </label>
              <select
                value={originalShape}
                onChange={(e) => {
                  setOriginalShape(e.target.value);
                  if (e.target.value === 'round') {
                    setOriginalSize('20');
                    setOriginalLength('');
                  } else if (e.target.value === 'square') {
                    setOriginalSize('20');
                    setOriginalLength('');
                  } else {
                    setOriginalSize('20');
                    setOriginalLength('30');
                  }
                }}
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="round">Round</option>
                <option value="square">Square</option>
                <option value="rectangle">Rectangle</option>
              </select>
            </div>

            {/* Depth */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Depth
              </label>
              <select
                value={originalDepth}
                onChange={(e) => setOriginalDepth(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="2">2" (standard)</option>
                <option value="3">3" (deep)</option>
              </select>
            </div>
          </div>

          {/* Size Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                label={originalShape === 'round' ? 'Diameter (cm)' : originalShape === 'square' ? 'Width (cm)' : 'Width (cm)'}
                type="number"
                step="0.1"
                value={originalSize}
                onChange={(e) => setOriginalSize(e.target.value)}
              />
            </div>

            {showOriginalLength && (
              <div>
                <Input
                  label="Length (cm)"
                  type="number"
                  step="0.1"
                  value={originalLength}
                  onChange={(e) => setOriginalLength(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Target Tin */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Target Tin
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Shape */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tin Shape
              </label>
              <select
                value={targetShape}
                onChange={(e) => {
                  setTargetShape(e.target.value);
                  if (e.target.value === 'round') {
                    setTargetSize('23');
                    setTargetLength('');
                  } else if (e.target.value === 'square') {
                    setTargetSize('23');
                    setTargetLength('');
                  } else {
                    setTargetSize('23');
                    setTargetLength('33');
                  }
                }}
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="round">Round</option>
                <option value="square">Square</option>
                <option value="rectangle">Rectangle</option>
              </select>
            </div>

            {/* Depth */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Depth
              </label>
              <select
                value={targetDepth}
                onChange={(e) => setTargetDepth(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="2">2" (standard)</option>
                <option value="3">3" (deep)</option>
              </select>
            </div>
          </div>

          {/* Size Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                label={targetShape === 'round' ? 'Diameter (cm)' : targetShape === 'square' ? 'Width (cm)' : 'Width (cm)'}
                type="number"
                step="0.1"
                value={targetSize}
                onChange={(e) => setTargetSize(e.target.value)}
              />
            </div>

            {showTargetLength && (
              <div>
                <Input
                  label="Length (cm)"
                  type="number"
                  step="0.1"
                  value={targetLength}
                  onChange={(e) => setTargetLength(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Conversion Results
        </h3>

        <div className="space-y-4">
          {/* Scale Factor */}
          <div className="bg-accent-muted rounded-[var(--radius-input)] p-4">
            <p className="text-text-muted text-sm font-medium mb-1">Recipe Scaling Factor</p>
            <p className="text-text-primary font-mono text-3xl font-bold">
              {scaleFactor.toFixed(2)}×
            </p>
            <p className="text-text-muted text-xs mt-2">
              Multiply all ingredient quantities by this number
            </p>
          </div>

          {/* Area Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-surface rounded-[var(--radius-input)] p-4">
              <p className="text-text-muted text-xs font-medium mb-1">Original Tin Area</p>
              <p className="text-text-primary font-mono font-bold">
                {originalArea.toFixed(0)} cm²
              </p>
            </div>
            <div className="bg-surface rounded-[var(--radius-input)] p-4">
              <p className="text-text-muted text-xs font-medium mb-1">Target Tin Area</p>
              <p className="text-text-primary font-mono font-bold">
                {targetArea.toFixed(0)} cm²
              </p>
            </div>
          </div>

          {/* Baking Time Adjustment */}
          <div className="bg-surface rounded-[var(--radius-input)] p-4">
            <p className="text-text-muted text-sm font-medium mb-2">
              Baking Time Adjustment
            </p>
            <p className="text-text-primary text-sm">
              Original recipe time × <span className="font-mono font-bold">{timeAdjustment.toFixed(2)}</span>
            </p>
            <p className="text-text-muted text-xs mt-2">
              {scaleFactor > 1.2
                ? 'Larger tins need slightly less time. Start checking earlier.'
                : scaleFactor < 0.7
                ? 'Smaller tins bake faster. Start checking earlier.'
                : 'Keep baking time approximately the same.'}
            </p>
          </div>
        </div>
      </Card>

      {/* Visual Representation */}
      <Card>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Visual Comparison
        </h3>

        <div className="flex justify-between items-end gap-4">
          {/* Original */}
          <div className="text-center flex-1">
            <div className="mb-3 flex justify-center">
              <div
                className="border-2 border-text-secondary rounded-lg bg-surface flex items-center justify-center text-text-muted text-xs font-medium"
                style={{
                  width: Math.min(100, parseFloat(originalSize || 20) * 2) + 'px',
                  height: Math.min(100, parseFloat(originalSize || 20) * 2) + 'px',
                }}
              >
                Original
              </div>
            </div>
            <p className="text-text-primary font-medium text-sm">
              {originalShape === 'round'
                ? `${originalSize}cm Ø`
                : originalShape === 'square'
                ? `${originalSize}cm`
                : `${originalSize}×${originalLength}cm`}
            </p>
          </div>

          {/* Arrow */}
          <div className="text-text-secondary text-2xl">→</div>

          {/* Target */}
          <div className="text-center flex-1">
            <div className="mb-3 flex justify-center">
              <div
                className="border-2 border-accent rounded-lg bg-accent-muted flex items-center justify-center text-accent text-xs font-medium"
                style={{
                  width: Math.min(100, parseFloat(targetSize || 23) * 2) + 'px',
                  height: Math.min(100, parseFloat(targetSize || 23) * 2) + 'px',
                }}
              >
                Target
              </div>
            </div>
            <p className="text-text-primary font-medium text-sm">
              {targetShape === 'round'
                ? `${targetSize}cm Ø`
                : targetShape === 'square'
                ? `${targetSize}cm`
                : `${targetSize}×${targetLength}cm`}
            </p>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="bg-surface">
        <h4 className="font-medium text-text-primary mb-3">💡 Tips</h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>
            • <span className="font-medium text-text-primary">Depth matters:</span> Deep tins hold more batter
          </li>
          <li>
            • <span className="font-medium text-text-primary">Shape changes behavior:</span> Round vs square = different heat distribution
          </li>
          <li>
            • <span className="font-medium text-text-primary">Always check doneness:</span> Use a skewer or thermometer, especially with new sizes
          </li>
          <li>
            • <span className="font-medium text-text-primary">Temperature stays the same:</span> Only ingredients and time change
          </li>
          <li>
            • <span className="font-medium text-text-primary">Fill 2/3 full:</span> All tins should be about 2/3 full for best results
          </li>
        </ul>
      </Card>
    </div>
  );
}
