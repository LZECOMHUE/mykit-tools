'use client';

import { useState, useMemo } from 'react';

export default function AreaCalculator() {
  const [shapeType, setShapeType] = useState('rectangle');
  const [unitSystem, setUnitSystem] = useState('metric');

  // Rectangle
  const [rectLength, setRectLength] = useState('');
  const [rectWidth, setRectWidth] = useState('');

  // Circle
  const [circleRadius, setCircleRadius] = useState('');

  // Triangle
  const [triBase, setTriBase] = useState('');
  const [triHeight, setTriHeight] = useState('');

  // Trapezoid
  const [trapBase1, setTrapBase1] = useState('');
  const [trapBase2, setTrapBase2] = useState('');
  const [trapHeight, setTrapHeight] = useState('');

  // Ellipse
  const [ellipseA, setEllipseA] = useState('');
  const [ellipseB, setEllipseB] = useState('');

  // Parallelogram
  const [paraBase, setParaBase] = useState('');
  const [paraHeight, setParaHeight] = useState('');

  const unitLabel = unitSystem === 'metric' ? 'm²' : 'ft²';

  const calculation = useMemo(() => {
    switch (shapeType) {
      case 'rectangle': {
        if (!rectLength || !rectWidth) return null;
        const length = parseFloat(rectLength);
        const width = parseFloat(rectWidth);
        if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) return null;
        const area = length * width;
        return {
          area: area.toFixed(4),
          formula: 'Area = length × width',
          steps: [
            `Area = ${length} × ${width}`,
            `Area = ${area.toFixed(4)} ${unitLabel}`
          ]
        };
      }
      case 'circle': {
        if (!circleRadius) return null;
        const radius = parseFloat(circleRadius);
        if (isNaN(radius) || radius <= 0) return null;
        const area = Math.PI * radius * radius;
        return {
          area: area.toFixed(4),
          formula: 'Area = π × r²',
          steps: [
            `Area = π × ${radius}²`,
            `Area = π × ${(radius * radius).toFixed(4)}`,
            `Area = ${area.toFixed(4)} ${unitLabel}`
          ]
        };
      }
      case 'triangle': {
        if (!triBase || !triHeight) return null;
        const base = parseFloat(triBase);
        const height = parseFloat(triHeight);
        if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) return null;
        const area = (base * height) / 2;
        return {
          area: area.toFixed(4),
          formula: 'Area = (base × height) ÷ 2',
          steps: [
            `Area = (${base} × ${height}) ÷ 2`,
            `Area = ${(base * height).toFixed(4)} ÷ 2`,
            `Area = ${area.toFixed(4)} ${unitLabel}`
          ]
        };
      }
      case 'trapezoid': {
        if (!trapBase1 || !trapBase2 || !trapHeight) return null;
        const base1 = parseFloat(trapBase1);
        const base2 = parseFloat(trapBase2);
        const height = parseFloat(trapHeight);
        if (isNaN(base1) || isNaN(base2) || isNaN(height) || base1 <= 0 || base2 <= 0 || height <= 0) return null;
        const area = ((base1 + base2) / 2) * height;
        return {
          area: area.toFixed(4),
          formula: 'Area = ((base₁ + base₂) ÷ 2) × height',
          steps: [
            `Area = ((${base1} + ${base2}) ÷ 2) × ${height}`,
            `Area = (${(base1 + base2).toFixed(4)} ÷ 2) × ${height}`,
            `Area = ${((base1 + base2) / 2).toFixed(4)} × ${height}`,
            `Area = ${area.toFixed(4)} ${unitLabel}`
          ]
        };
      }
      case 'ellipse': {
        if (!ellipseA || !ellipseB) return null;
        const a = parseFloat(ellipseA);
        const b = parseFloat(ellipseB);
        if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return null;
        const area = Math.PI * a * b;
        return {
          area: area.toFixed(4),
          formula: 'Area = π × a × b',
          steps: [
            `Area = π × ${a} × ${b}`,
            `Area = π × ${(a * b).toFixed(4)}`,
            `Area = ${area.toFixed(4)} ${unitLabel}`
          ]
        };
      }
      case 'parallelogram': {
        if (!paraBase || !paraHeight) return null;
        const base = parseFloat(paraBase);
        const height = parseFloat(paraHeight);
        if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) return null;
        const area = base * height;
        return {
          area: area.toFixed(4),
          formula: 'Area = base × height',
          steps: [
            `Area = ${base} × ${height}`,
            `Area = ${area.toFixed(4)} ${unitLabel}`
          ]
        };
      }
      default:
        return null;
    }
  }, [shapeType, rectLength, rectWidth, circleRadius, triBase, triHeight, trapBase1, trapBase2, trapHeight, ellipseA, ellipseB, paraBase, paraHeight, unitSystem, unitLabel]);

  const handleReset = () => {
    setRectLength('');
    setRectWidth('');
    setCircleRadius('');
    setTriBase('');
    setTriHeight('');
    setTrapBase1('');
    setTrapBase2('');
    setTrapHeight('');
    setEllipseA('');
    setEllipseB('');
    setParaBase('');
    setParaHeight('');
  };

  const shapes = [
    { id: 'rectangle', label: 'Rectangle' },
    { id: 'circle', label: 'Circle' },
    { id: 'triangle', label: 'Triangle' },
    { id: 'trapezoid', label: 'Trapezoid' },
    { id: 'ellipse', label: 'Ellipse' },
    { id: 'parallelogram', label: 'Parallelogram' }
  ];

  return (
    <div className="w-full bg-surface border border-border rounded-[var(--radius-card)] p-6">
      {/* Unit System Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Unit System
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="metric"
              checked={unitSystem === 'metric'}
              onChange={(e) => setUnitSystem(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-text-primary">Metric (m², cm²)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="imperial"
              checked={unitSystem === 'imperial'}
              onChange={(e) => setUnitSystem(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-text-primary">Imperial (ft², in²)</span>
          </label>
        </div>
      </div>

      {/* Shape Tabs */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Shape
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => {
                setShapeType(shape.id);
                handleReset();
              }}
              className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition-colors ${
                shapeType === shape.id
                  ? 'bg-accent text-white'
                  : 'bg-white border border-border text-text-primary hover:border-gray-400'
              }`}
            >
              {shape.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        {shapeType === 'rectangle' && (
          <>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Length
              </label>
              <input
                type="number"
                value={rectLength}
                onChange={(e) => setRectLength(e.target.value)}
                placeholder="Enter length"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Width
              </label>
              <input
                type="number"
                value={rectWidth}
                onChange={(e) => setRectWidth(e.target.value)}
                placeholder="Enter width"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
          </>
        )}

        {shapeType === 'circle' && (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Radius
            </label>
            <input
              type="number"
              value={circleRadius}
              onChange={(e) => setCircleRadius(e.target.value)}
              placeholder="Enter radius"
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
            />
          </div>
        )}

        {shapeType === 'triangle' && (
          <>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Base
              </label>
              <input
                type="number"
                value={triBase}
                onChange={(e) => setTriBase(e.target.value)}
                placeholder="Enter base"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Height
              </label>
              <input
                type="number"
                value={triHeight}
                onChange={(e) => setTriHeight(e.target.value)}
                placeholder="Enter height"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
          </>
        )}

        {shapeType === 'trapezoid' && (
          <>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Base 1
              </label>
              <input
                type="number"
                value={trapBase1}
                onChange={(e) => setTrapBase1(e.target.value)}
                placeholder="Enter first base"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Base 2
              </label>
              <input
                type="number"
                value={trapBase2}
                onChange={(e) => setTrapBase2(e.target.value)}
                placeholder="Enter second base"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Height
              </label>
              <input
                type="number"
                value={trapHeight}
                onChange={(e) => setTrapHeight(e.target.value)}
                placeholder="Enter height"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
          </>
        )}

        {shapeType === 'ellipse' && (
          <>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Semi-major Axis (a)
              </label>
              <input
                type="number"
                value={ellipseA}
                onChange={(e) => setEllipseA(e.target.value)}
                placeholder="Enter semi-major axis"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Semi-minor Axis (b)
              </label>
              <input
                type="number"
                value={ellipseB}
                onChange={(e) => setEllipseB(e.target.value)}
                placeholder="Enter semi-minor axis"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
          </>
        )}

        {shapeType === 'parallelogram' && (
          <>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Base
              </label>
              <input
                type="number"
                value={paraBase}
                onChange={(e) => setParaBase(e.target.value)}
                placeholder="Enter base"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Height
              </label>
              <input
                type="number"
                value={paraHeight}
                onChange={(e) => setParaHeight(e.target.value)}
                placeholder="Enter height"
                className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
          </>
        )}
      </div>

      {/* Result */}
      {calculation && (
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6">
          <div className="mb-4">
            <p className="text-text-secondary text-sm mb-2">Formula:</p>
            <p className="text-text-primary font-medium">{calculation.formula}</p>
          </div>

          <div className="mb-4">
            <p className="text-text-secondary text-sm mb-2">Step-by-step:</p>
            <div className="space-y-1">
              {calculation.steps.map((step, idx) => (
                <p key={idx} className="text-text-primary text-sm font-mono-num">
                  {step}
                </p>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-text-secondary text-sm mb-2">Result:</p>
            <p className="text-2xl font-bold text-accent font-mono-num">
              {calculation.area} {unitLabel}
            </p>
          </div>
        </div>
      )}

      {!calculation && (
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6 text-center">
          <p className="text-text-muted">Enter values to calculate area</p>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full py-2 px-4 bg-white border border-border text-text-primary rounded-[var(--radius-input)] font-medium hover:bg-gray-50 transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
