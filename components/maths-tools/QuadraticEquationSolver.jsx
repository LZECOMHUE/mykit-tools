'use client';

import { useState, useMemo } from 'react';

export default function QuadraticEquationSolver() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(6);

  const result = useMemo(() => {
    if (a === 0) {
      return { error: 'Coefficient a cannot be zero for a quadratic equation' };
    }

    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
      const realPart = (-b) / (2 * a);
      const imagPart = Math.sqrt(-discriminant) / (2 * a);
      return {
        discriminant,
        isComplex: true,
        root1: { real: realPart, imag: imagPart },
        root2: { real: realPart, imag: -imagPart },
      };
    }

    const sqrtDisc = Math.sqrt(discriminant);
    const root1 = (-b + sqrtDisc) / (2 * a);
    const root2 = (-b - sqrtDisc) / (2 * a);

    return {
      discriminant,
      isComplex: false,
      root1,
      root2,
    };
  }, [a, b, c]);

  const handleReset = () => {
    setA(1);
    setB(-5);
    setC(6);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <label className="block text-text-primary font-medium">
          Equation: ax² + bx + c = 0
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              a (coefficient of x²)
            </label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              b (coefficient of x)
            </label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              c (constant)
            </label>
            <input
              type="number"
              value={c}
              onChange={(e) => setC(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)]">
        <p className="text-text-secondary text-sm font-mono">
          Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a
        </p>
      </div>

      {result.error ? (
        <div className="bg-red-50 border border-red-200 p-4 rounded-[var(--radius-card)]">
          <p className="text-red-700 font-medium">{result.error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-surface p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm mb-2">Discriminant (Δ)</p>
            <p className="text-2xl font-mono font-semibold text-text-primary">
              {result.discriminant.toFixed(2)}
            </p>
            <p className="text-text-muted text-xs mt-2">
              {result.discriminant > 0 && 'Two distinct real roots'}
              {result.discriminant === 0 && 'One repeated real root'}
              {result.discriminant < 0 && 'Complex roots'}
            </p>
          </div>

          {result.isComplex ? (
            <div className="space-y-3">
              <div className="bg-surface p-4 rounded-[var(--radius-card)]">
                <p className="text-text-secondary text-sm mb-2">Root 1</p>
                <p className="text-xl font-mono font-semibold text-text-primary">
                  {result.root1.real.toFixed(2)} + {result.root1.imag.toFixed(2)}i
                </p>
              </div>
              <div className="bg-surface p-4 rounded-[var(--radius-card)]">
                <p className="text-text-secondary text-sm mb-2">Root 2</p>
                <p className="text-xl font-mono font-semibold text-text-primary">
                  {result.root2.real.toFixed(2)} - {result.root2.imag.toFixed(2)}i
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-surface p-4 rounded-[var(--radius-card)]">
                <p className="text-text-secondary text-sm mb-2">Root 1</p>
                <p className="text-2xl font-mono font-semibold text-text-primary">
                  {result.root1.toFixed(4)}
                </p>
              </div>
              <div className="bg-surface p-4 rounded-[var(--radius-card)]">
                <p className="text-text-secondary text-sm mb-2">Root 2</p>
                <p className="text-2xl font-mono font-semibold text-text-primary">
                  {result.root2.toFixed(4)}
                </p>
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-xs font-mono">
              Step 1: Calculate discriminant (b² - 4ac) = {b}² - 4({a})({c}) = {result.discriminant.toFixed(2)}
            </p>
            <p className="text-text-secondary text-xs font-mono mt-2">
              Step 2: Apply quadratic formula x = (-{b} ± √{result.discriminant.toFixed(2)}) / {2 * a}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={handleReset}
        className="w-full px-4 py-2 bg-white border border-border text-text-primary font-medium rounded-[var(--radius-input)] hover:bg-surface transition"
      >
        Reset
      </button>
    </div>
  );
}
