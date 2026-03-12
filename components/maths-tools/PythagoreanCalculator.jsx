'use client';

import { useState, useMemo } from 'react';

const calculatePythagorean = (a, b, c) => {
  const aVal = a ? parseFloat(a) : null;
  const bVal = b ? parseFloat(b) : null;
  const cVal = c ? parseFloat(c) : null;

  // Count how many values are provided
  const providedCount = [aVal, bVal, cVal].filter((v) => v !== null && !isNaN(v) && v > 0).length;

  if (providedCount < 2) return null;

  // Calculate missing side
  if (aVal && bVal && !cVal) {
    const c = Math.sqrt(aVal * aVal + bVal * bVal);
    return {
      type: 'findC',
      a: aVal.toFixed(4),
      b: bVal.toFixed(4),
      c: c.toFixed(4),
      formula: 'c² = a² + b²',
      steps: [
        `c² = ${aVal}² + ${bVal}²`,
        `c² = ${(aVal * aVal).toFixed(4)} + ${(bVal * bVal).toFixed(4)}`,
        `c² = ${(aVal * aVal + bVal * bVal).toFixed(4)}`,
        `c = √${(aVal * aVal + bVal * bVal).toFixed(4)}`,
        `c = ${c.toFixed(4)}`
      ]
    };
  }

  if (aVal && cVal && !bVal) {
    if (cVal <= aVal) return { error: 'Hypotenuse must be greater than side a' };
    const b = Math.sqrt(cVal * cVal - aVal * aVal);
    return {
      type: 'findB',
      a: aVal.toFixed(4),
      b: b.toFixed(4),
      c: cVal.toFixed(4),
      formula: 'b² = c² - a²',
      steps: [
        `b² = ${cVal}² - ${aVal}²`,
        `b² = ${(cVal * cVal).toFixed(4)} - ${(aVal * aVal).toFixed(4)}`,
        `b² = ${(cVal * cVal - aVal * aVal).toFixed(4)}`,
        `b = √${(cVal * cVal - aVal * aVal).toFixed(4)}`,
        `b = ${b.toFixed(4)}`
      ]
    };
  }

  if (bVal && cVal && !aVal) {
    if (cVal <= bVal) return { error: 'Hypotenuse must be greater than side b' };
    const a = Math.sqrt(cVal * cVal - bVal * bVal);
    return {
      type: 'findA',
      a: a.toFixed(4),
      b: bVal.toFixed(4),
      c: cVal.toFixed(4),
      formula: 'a² = c² - b²',
      steps: [
        `a² = ${cVal}² - ${bVal}²`,
        `a² = ${(cVal * cVal).toFixed(4)} - ${(bVal * bVal).toFixed(4)}`,
        `a² = ${(cVal * cVal - bVal * bVal).toFixed(4)}`,
        `a = √${(cVal * cVal - bVal * bVal).toFixed(4)}`,
        `a = ${a.toFixed(4)}`
      ]
    };
  }

  // Check if it's a right triangle
  if (aVal && bVal && cVal) {
    const aSq = aVal * aVal;
    const bSq = bVal * bVal;
    const cSq = cVal * cVal;
    const sum = (aSq + bSq).toFixed(4);
    const cVal4 = cSq.toFixed(4);
    const isRight = Math.abs(aSq + bSq - cSq) < 0.0001;

    return {
      type: 'check',
      a: aVal.toFixed(4),
      b: bVal.toFixed(4),
      c: cVal.toFixed(4),
      isRight,
      verification: `${aVal}² + ${bVal}² = ${cVal}²`,
      calculation: `${aSq.toFixed(4)} + ${bSq.toFixed(4)} = ${cVal4}`,
      equation: `${sum} = ${cVal4}`,
      steps: [
        `Check: a² + b² = c²`,
        `${aVal}² + ${bVal}² = ${cVal}²`,
        `${aSq.toFixed(4)} + ${bSq.toFixed(4)} = ${cVal4}`,
        `${sum} ${isRight ? '=' : '≠'} ${cVal4}`,
        isRight ? '✓ This IS a right triangle' : '✗ This is NOT a right triangle'
      ]
    };
  }

  return null;
};

export default function PythagoreanCalculator() {
  const [mode, setMode] = useState('calculate');
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [sideC, setSideC] = useState('');

  const result = useMemo(() => {
    return calculatePythagorean(sideA, sideB, sideC);
  }, [sideA, sideB, sideC]);

  const handleReset = () => {
    setSideA('');
    setSideB('');
    setSideC('');
  };

  const svgSize = 200;
  const padding = 20;
  const innerSize = svgSize - padding * 2;

  let svg = null;

  if (result && !result.error) {
    const a = parseFloat(result.a);
    const b = parseFloat(result.b);
    const c = parseFloat(result.c);

    const maxSide = Math.max(a, b, c);
    const scale = innerSize / maxSide;

    const x1 = padding;
    const y1 = padding + b * scale;
    const x2 = padding + a * scale;
    const y2 = padding + b * scale;
    const x3 = padding;
    const y3 = padding;

    svg = (
      <svg width={svgSize} height={svgSize} className="mx-auto mb-4">
        {/* Triangle */}
        <polygon
          points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
          fill="rgba(37, 99, 235, 0.1)"
          stroke="rgb(37, 99, 235)"
          strokeWidth="2"
        />

        {/* Right angle indicator */}
        <rect
          x={x1}
          y={y1 - 10}
          width="10"
          height="10"
          fill="none"
          stroke="rgb(37, 99, 235)"
          strokeWidth="1"
        />

        {/* Labels */}
        <text
          x={(x1 + x2) / 2}
          y={y2 + 20}
          textAnchor="middle"
          className="font-mono-num text-xs fill-text-primary"
        >
          a = {result.a}
        </text>
        <text
          x={x1 - 20}
          y={(y1 + y3) / 2}
          textAnchor="end"
          className="font-mono-num text-xs fill-text-primary"
        >
          b = {result.b}
        </text>
        <text
          x={(x2 + x3) / 2 - 10}
          y={(y1 + y3) / 2 - 10}
          textAnchor="middle"
          className="font-mono-num text-xs fill-accent font-bold"
        >
          c = {result.c}
        </text>

        {/* Vertices */}
        <circle cx={x1} cy={y1} r="3" fill="rgb(37, 99, 235)" />
        <circle cx={x2} cy={y2} r="3" fill="rgb(37, 99, 235)" />
        <circle cx={x3} cy={y3} r="3" fill="rgb(37, 99, 235)" />
      </svg>
    );
  }

  return (
    <div className="w-full bg-surface border border-border rounded-[var(--radius-card)] p-6">
      {/* Mode Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Mode
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMode('calculate');
              handleReset();
            }}
            className={`py-2 px-4 rounded-[var(--radius-input)] font-medium transition-colors ${
              mode === 'calculate'
                ? 'bg-accent text-white'
                : 'bg-white border border-border text-text-primary hover:border-gray-400'
            }`}
          >
            Find Missing Side
          </button>
          <button
            onClick={() => {
              setMode('check');
              handleReset();
            }}
            className={`py-2 px-4 rounded-[var(--radius-input)] font-medium transition-colors ${
              mode === 'check'
                ? 'bg-accent text-white'
                : 'bg-white border border-border text-text-primary hover:border-gray-400'
            }`}
          >
            Check Triangle
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Side a
            {mode === 'calculate' && <span className="text-text-muted text-xs ml-1">(or leave empty)</span>}
          </label>
          <input
            type="number"
            value={sideA}
            onChange={(e) => setSideA(e.target.value)}
            placeholder="Enter side a"
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Side b
            {mode === 'calculate' && <span className="text-text-muted text-xs ml-1">(or leave empty)</span>}
          </label>
          <input
            type="number"
            value={sideB}
            onChange={(e) => setSideB(e.target.value)}
            placeholder="Enter side b"
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Side c (hypotenuse)
            {mode === 'calculate' && <span className="text-text-muted text-xs ml-1">(or leave empty)</span>}
          </label>
          <input
            type="number"
            value={sideC}
            onChange={(e) => setSideC(e.target.value)}
            placeholder="Enter side c"
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
          />
        </div>

        <p className="text-text-muted text-xs italic">
          {mode === 'calculate'
            ? 'Enter any 2 sides to find the missing one'
            : 'Enter all 3 sides to check if it forms a right triangle'}
        </p>
      </div>

      {/* Result */}
      {result && !result.error && (
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6">
          {/* SVG Triangle */}
          {svg}

          {/* Formula */}
          <div className="mb-4">
            <p className="text-text-secondary text-sm mb-2">Formula:</p>
            <p className="text-text-primary font-medium font-mono-num">{result.formula}</p>
          </div>

          {/* Verification for Check Mode */}
          {mode === 'check' && result.type === 'check' && (
            <div className="mb-4">
              <p className="text-text-secondary text-sm mb-2">Verification:</p>
              <p className="text-text-primary font-mono-num text-sm mb-2">{result.verification}</p>
              <p className="text-text-primary font-mono-num text-sm mb-2">{result.calculation}</p>
              <p className="text-text-primary font-mono-num text-sm font-bold">{result.equation}</p>
            </div>
          )}

          {/* Step-by-step */}
          <div className="mb-4">
            <p className="text-text-secondary text-sm mb-2">Step-by-step:</p>
            <div className="space-y-1">
              {result.steps.map((step, idx) => (
                <p
                  key={idx}
                  className={`text-sm font-mono-num ${
                    step.includes('✓') || step.includes('✗')
                      ? 'text-accent font-bold'
                      : 'text-text-primary'
                  }`}
                >
                  {step}
                </p>
              ))}
            </div>
          </div>

          {/* Result Status */}
          {mode === 'check' && result.type === 'check' && (
            <div
              className={`border-t border-border pt-4 ${
                result.isRight ? 'bg-green-50' : 'bg-red-50'
              } rounded-[var(--radius-input)] p-3 text-center`}
            >
              <p
                className={`text-lg font-bold ${
                  result.isRight ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {result.isRight ? '✓ Valid Right Triangle' : '✗ Not a Right Triangle'}
              </p>
            </div>
          )}

          {/* Sides Summary */}
          {mode === 'calculate' && result.type !== 'check' && (
            <div className="border-t border-border pt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-text-secondary text-xs mb-1">Side a</p>
                <p className="text-lg font-bold text-accent font-mono-num">
                  {result.a}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Side b</p>
                <p className="text-lg font-bold text-accent font-mono-num">
                  {result.b}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Side c</p>
                <p className="text-lg font-bold text-accent font-mono-num">
                  {result.c}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {result && result.error && (
        <div className="bg-red-50 border border-red-200 rounded-[var(--radius-card)] p-4 mb-6 text-center">
          <p className="text-red-700 font-medium">{result.error}</p>
        </div>
      )}

      {!result && (
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6 text-center">
          <p className="text-text-muted">
            {mode === 'calculate'
              ? 'Enter 2 sides to find the missing one'
              : 'Enter all 3 sides to check the triangle'}
          </p>
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
