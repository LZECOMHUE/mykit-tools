'use client';

import { useState, useMemo } from 'react';

const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

const simplifyFraction = (num, den) => {
  if (den === 0) return { num: 0, den: 1 };
  const divisor = gcd(num, den);
  return { num: num / divisor, den: den / divisor };
};

const fractionToMixed = (num, den) => {
  const whole = Math.floor(Math.abs(num) / Math.abs(den));
  const remainder = Math.abs(num) % Math.abs(den);
  const sign = (num < 0 && den > 0) || (num > 0 && den < 0) ? -1 : 1;
  return {
    whole: whole === 0 ? 0 : sign * whole,
    num: remainder,
    den: Math.abs(den)
  };
};

export default function FractionCalculator() {
  const [mode, setMode] = useState('operation');
  const [operation, setOperation] = useState('add');

  // Operation mode
  const [frac1Num, setFrac1Num] = useState('');
  const [frac1Den, setFrac1Den] = useState('');
  const [frac2Num, setFrac2Num] = useState('');
  const [frac2Den, setFrac2Den] = useState('');

  // Simplify mode
  const [simplifyNum, setSimplifyNum] = useState('');
  const [simplifyDen, setSimplifyDen] = useState('');

  const result = useMemo(() => {
    if (mode === 'operation') {
      if (!frac1Num || !frac1Den || !frac2Num || !frac2Den) return null;

      const n1 = parseInt(frac1Num);
      const d1 = parseInt(frac1Den);
      const n2 = parseInt(frac2Num);
      const d2 = parseInt(frac2Den);

      if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) return null;

      let resultNum, resultDen;
      let steps = [];

      switch (operation) {
        case 'add':
          steps.push(`${n1}/${d1} + ${n2}/${d2}`);
          resultNum = n1 * d2 + n2 * d1;
          resultDen = d1 * d2;
          steps.push(`= (${n1} × ${d2} + ${n2} × ${d1}) / (${d1} × ${d2})`);
          steps.push(`= (${n1 * d2} + ${n2 * d1}) / ${resultDen}`);
          steps.push(`= ${resultNum} / ${resultDen}`);
          break;

        case 'subtract':
          steps.push(`${n1}/${d1} - ${n2}/${d2}`);
          resultNum = n1 * d2 - n2 * d1;
          resultDen = d1 * d2;
          steps.push(`= (${n1} × ${d2} - ${n2} × ${d1}) / (${d1} × ${d2})`);
          steps.push(`= (${n1 * d2} - ${n2 * d1}) / ${resultDen}`);
          steps.push(`= ${resultNum} / ${resultDen}`);
          break;

        case 'multiply':
          steps.push(`${n1}/${d1} × ${n2}/${d2}`);
          resultNum = n1 * n2;
          resultDen = d1 * d2;
          steps.push(`= (${n1} × ${n2}) / (${d1} × ${d2})`);
          steps.push(`= ${resultNum} / ${resultDen}`);
          break;

        case 'divide':
          steps.push(`${n1}/${d1} ÷ ${n2}/${d2}`);
          steps.push(`= ${n1}/${d1} × ${d2}/${n2}`);
          resultNum = n1 * d2;
          resultDen = d1 * n2;
          steps.push(`= (${n1} × ${d2}) / (${d1} × ${n2})`);
          steps.push(`= ${resultNum} / ${resultDen}`);
          break;

        default:
          return null;
      }

      const simplified = simplifyFraction(resultNum, resultDen);
      const mixed = fractionToMixed(simplified.num, simplified.den);
      const decimal = (simplified.num / simplified.den).toFixed(6);

      steps.push(`= ${simplified.num}/${simplified.den} (simplified)`);

      let mixedStr = '';
      if (mixed.whole !== 0) {
        mixedStr = `${mixed.whole} ${Math.abs(mixed.num)}/${mixed.den}`;
      } else {
        mixedStr = `${simplified.num}/${simplified.den}`;
      }

      return {
        improper: `${simplified.num}/${simplified.den}`,
        mixed: mixedStr,
        decimal: parseFloat(decimal).toString(),
        steps
      };
    } else {
      // Simplify mode
      if (!simplifyNum || !simplifyDen) return null;

      const num = parseInt(simplifyNum);
      const den = parseInt(simplifyDen);

      if (isNaN(num) || isNaN(den) || den === 0) return null;

      const simplified = simplifyFraction(num, den);
      const mixed = fractionToMixed(simplified.num, simplified.den);
      const decimal = (simplified.num / simplified.den).toFixed(6);

      const steps = [
        `Simplify ${num}/${den}`,
        `GCD of ${Math.abs(num)} and ${den} is ${gcd(num, den)}`,
        `${num}/${den} = ${simplified.num}/${simplified.den}`
      ];

      let mixedStr = '';
      if (mixed.whole !== 0) {
        mixedStr = `${mixed.whole} ${Math.abs(mixed.num)}/${mixed.den}`;
      } else {
        mixedStr = `${simplified.num}/${simplified.den}`;
      }

      return {
        improper: `${simplified.num}/${simplified.den}`,
        mixed: mixedStr,
        decimal: parseFloat(decimal).toString(),
        steps
      };
    }
  }, [mode, operation, frac1Num, frac1Den, frac2Num, frac2Den, simplifyNum, simplifyDen]);

  const handleReset = () => {
    setFrac1Num('');
    setFrac1Den('');
    setFrac2Num('');
    setFrac2Den('');
    setSimplifyNum('');
    setSimplifyDen('');
  };

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
              setMode('operation');
              handleReset();
            }}
            className={`py-2 px-4 rounded-[var(--radius-input)] font-medium transition-colors ${
              mode === 'operation'
                ? 'bg-accent text-white'
                : 'bg-white border border-border text-text-primary hover:border-gray-400'
            }`}
          >
            Operation
          </button>
          <button
            onClick={() => {
              setMode('simplify');
              handleReset();
            }}
            className={`py-2 px-4 rounded-[var(--radius-input)] font-medium transition-colors ${
              mode === 'simplify'
                ? 'bg-accent text-white'
                : 'bg-white border border-border text-text-primary hover:border-gray-400'
            }`}
          >
            Simplify
          </button>
        </div>
      </div>

      {mode === 'operation' && (
        <>
          {/* Operation Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Operation
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'add', label: 'Add (+)' },
                { id: 'subtract', label: 'Subtract (−)' },
                { id: 'multiply', label: 'Multiply (×)' },
                { id: 'divide', label: 'Divide (÷)' }
              ].map((op) => (
                <button
                  key={op.id}
                  onClick={() => setOperation(op.id)}
                  className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition-colors ${
                    operation === op.id
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-gray-400'
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          {/* First Fraction */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              First Fraction
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={frac1Num}
                onChange={(e) => setFrac1Num(e.target.value)}
                placeholder="Numerator"
                className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
              <div className="text-2xl text-text-secondary">–</div>
              <input
                type="number"
                value={frac1Den}
                onChange={(e) => setFrac1Den(e.target.value)}
                placeholder="Denominator"
                className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Second Fraction */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Second Fraction
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={frac2Num}
                onChange={(e) => setFrac2Num(e.target.value)}
                placeholder="Numerator"
                className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
              <div className="text-2xl text-text-secondary">–</div>
              <input
                type="number"
                value={frac2Den}
                onChange={(e) => setFrac2Den(e.target.value)}
                placeholder="Denominator"
                className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </>
      )}

      {mode === 'simplify' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-secondary mb-3">
            Fraction to Simplify
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={simplifyNum}
              onChange={(e) => setSimplifyNum(e.target.value)}
              placeholder="Numerator"
              className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
            />
            <div className="text-2xl text-text-secondary">–</div>
            <input
              type="number"
              value={simplifyDen}
              onChange={(e) => setSimplifyDen(e.target.value)}
              placeholder="Denominator"
              className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6">
          <div className="mb-4">
            <p className="text-text-secondary text-sm mb-3">Step-by-step:</p>
            <div className="space-y-1">
              {result.steps.map((step, idx) => (
                <p key={idx} className="text-text-primary text-sm font-mono-num">
                  {step}
                </p>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            <div>
              <p className="text-text-secondary text-sm mb-1">Improper Fraction:</p>
              <p className="text-xl font-bold text-accent font-mono-num">
                {result.improper}
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-sm mb-1">Mixed Number:</p>
              <p className="text-xl font-bold text-accent font-mono-num">
                {result.mixed}
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-sm mb-1">Decimal:</p>
              <p className="text-xl font-bold text-accent font-mono-num">
                {result.decimal}
              </p>
            </div>
          </div>
        </div>
      )}

      {!result && (
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-4 mb-6 text-center">
          <p className="text-text-muted">
            {mode === 'operation'
              ? 'Enter both fractions to calculate'
              : 'Enter a fraction to simplify'}
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
