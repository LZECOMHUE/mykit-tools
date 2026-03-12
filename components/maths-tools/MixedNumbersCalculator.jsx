'use client';

import { useState, useMemo } from 'react';

// Helper Functions
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a || 1;
};

const simplify = (num, den) => {
  if (den === 0) return { num: 0, den: 1 };
  const divisor = gcd(num, den);
  return {
    num: num / divisor,
    den: den / divisor,
  };
};

const toImproper = (whole, num, den) => {
  if (den === 0) den = 1;
  const improperNum = Math.abs(whole) * den + Math.abs(num);
  const sign = whole < 0 || (whole === 0 && num < 0) ? -1 : 1;
  return {
    num: improperNum * sign,
    den: den,
  };
};

const toMixed = (num, den) => {
  if (den === 0) return { whole: 0, num: 0, den: 1 };
  const sign = (num < 0) !== (den < 0) ? -1 : 1;
  num = Math.abs(num);
  den = Math.abs(den);
  const whole = Math.floor(num / den) * sign;
  const remainder = num % den;
  return {
    whole,
    num: remainder,
    den: den,
  };
};

const toDecimal = (num, den) => {
  if (den === 0) return 0;
  return num / den;
};

const FractionDisplay = ({ numerator, denominator, className = '' }) => {
  return (
    <span className={`inline-flex flex-col items-center mx-1 ${className}`}>
      <span className="border-b border-text-primary px-2 py-1 font-mono-num text-sm font-semibold">
        {numerator}
      </span>
      <span className="px-2 py-1 font-mono-num text-sm font-semibold">
        {denominator}
      </span>
    </span>
  );
};

const MixedNumberInput = ({ label, whole, numerator, denominator, onWholeChange, onNumeratorChange, onDenominatorChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-secondary">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={whole}
          onChange={(e) => onWholeChange(parseInt(e.target.value) || 0)}
          placeholder="0"
          className="w-16 px-3 py-2 border border-border bg-white rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        <span className="text-text-secondary">+</span>
        <input
          type="number"
          value={numerator}
          onChange={(e) => onNumeratorChange(parseInt(e.target.value) || 0)}
          placeholder="0"
          className="w-14 px-3 py-2 border border-border bg-white rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        <span className="text-text-secondary">/</span>
        <input
          type="number"
          value={denominator}
          onChange={(e) => onDenominatorChange(parseInt(e.target.value) || 1)}
          placeholder="1"
          className="w-14 px-3 py-2 border border-border bg-white rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          min="1"
        />
      </div>
      <p className="text-xs text-text-muted">Whole + Numerator / Denominator</p>
    </div>
  );
};

export default function MixedNumbersCalculator() {
  const [mode, setMode] = useState('calculate'); // 'calculate', 'convert', 'simplify'

  // Calculate Mode
  const [whole1, setWhole1] = useState(2);
  const [num1, setNum1] = useState(1);
  const [den1, setDen1] = useState(3);
  const [operation, setOperation] = useState('add');
  const [whole2, setWhole2] = useState(1);
  const [num2, setNum2] = useState(1);
  const [den2, setDen2] = useState(2);

  // Convert Mode
  const [convertType, setConvertType] = useState('mixed'); // 'mixed', 'improper', 'decimal'
  const [convertWhole, setConvertWhole] = useState(3);
  const [convertNum, setConvertNum] = useState(1);
  const [convertDen, setConvertDen] = useState(4);
  const [convertDecimal, setConvertDecimal] = useState(3.25);

  // Simplify Mode
  const [simpNum, setSimpNum] = useState(12);
  const [simpDen, setSimpDen] = useState(16);

  // Calculate Results
  const calculateResult = useMemo(() => {
    const frac1 = toImproper(whole1, num1, den1);
    const frac2 = toImproper(whole2, num2, den2);

    let resultNum, resultDen;
    let steps = [];

    steps.push({
      title: 'Convert to Improper Fractions',
      content: `${whole1} ${num1}/${den1} = ${frac1.num}/${frac1.den}\n${whole2} ${num2}/${den2} = ${frac2.num}/${frac2.den}`,
    });

    if (operation === 'add') {
      const lcm = (frac1.den * frac2.den) / gcd(frac1.den, frac2.den);
      steps.push({
        title: 'Find Common Denominator',
        content: `LCD of ${frac1.den} and ${frac2.den} = ${lcm}`,
      });
      resultNum = (frac1.num * (lcm / frac1.den)) + (frac2.num * (lcm / frac2.den));
      resultDen = lcm;
      steps.push({
        title: 'Add Fractions',
        content: `${frac1.num * (lcm / frac1.den)}/${lcm} + ${frac2.num * (lcm / frac2.den)}/${lcm} = ${resultNum}/${resultDen}`,
      });
    } else if (operation === 'subtract') {
      const lcm = (frac1.den * frac2.den) / gcd(frac1.den, frac2.den);
      steps.push({
        title: 'Find Common Denominator',
        content: `LCD of ${frac1.den} and ${frac2.den} = ${lcm}`,
      });
      resultNum = (frac1.num * (lcm / frac1.den)) - (frac2.num * (lcm / frac2.den));
      resultDen = lcm;
      steps.push({
        title: 'Subtract Fractions',
        content: `${frac1.num * (lcm / frac1.den)}/${lcm} − ${frac2.num * (lcm / frac2.den)}/${lcm} = ${resultNum}/${resultDen}`,
      });
    } else if (operation === 'multiply') {
      resultNum = frac1.num * frac2.num;
      resultDen = frac1.den * frac2.den;
      steps.push({
        title: 'Multiply Fractions',
        content: `${frac1.num} × ${frac2.num} = ${resultNum}\n${frac1.den} × ${frac2.den} = ${resultDen}`,
      });
    } else if (operation === 'divide') {
      resultNum = frac1.num * frac2.den;
      resultDen = frac1.den * frac2.num;
      steps.push({
        title: 'Divide Fractions (Multiply by Reciprocal)',
        content: `${frac1.num}/${frac1.den} × ${frac2.den}/${frac2.num} = ${resultNum}/${resultDen}`,
      });
    }

    const simplified = simplify(resultNum, resultDen);
    const divisor = gcd(resultNum, resultDen);
    if (divisor !== 1) {
      steps.push({
        title: 'Simplify',
        content: `GCD(${resultNum}, ${resultDen}) = ${divisor}\n${resultNum}/${resultDen} ÷ ${divisor}/${divisor} = ${simplified.num}/${simplified.den}`,
      });
    }

    const mixed = toMixed(simplified.num, simplified.den);
    const decimal = toDecimal(simplified.num, simplified.den);

    if (mixed.num !== 0) {
      steps.push({
        title: 'Convert to Mixed Number',
        content: `${simplified.num} ÷ ${simplified.den} = ${mixed.whole} remainder ${mixed.num}\n= ${mixed.whole} ${mixed.num}/${mixed.den}`,
      });
    }

    return {
      improperNum: simplified.num,
      improperDen: simplified.den,
      mixed: mixed,
      decimal: decimal.toFixed(6),
      steps: steps,
    };
  }, [whole1, num1, den1, whole2, num2, den2, operation]);

  // Convert Results
  const convertResult = useMemo(() => {
    let improper, mixed, decimal, percentage;

    if (convertType === 'mixed') {
      improper = toImproper(convertWhole, convertNum, convertDen);
      decimal = toDecimal(improper.num, improper.den);
      const simp = simplify(improper.num, improper.den);
      mixed = { whole: convertWhole, num: convertNum, den: convertDen };
      improper = simp;
    } else if (convertType === 'improper') {
      const simp = simplify(convertNum, convertDen);
      improper = simp;
      decimal = toDecimal(simp.num, simp.den);
      mixed = toMixed(simp.num, simp.den);
    } else if (convertType === 'decimal') {
      decimal = convertDecimal;
      const denominator = 10000;
      let numerator = Math.round(convertDecimal * denominator);
      const simp = simplify(numerator, denominator);
      improper = simp;
      mixed = toMixed(simp.num, simp.den);
    }

    percentage = (decimal * 100).toFixed(2);

    return { improper, mixed, decimal: decimal.toFixed(6), percentage };
  }, [convertType, convertWhole, convertNum, convertDen, convertDecimal]);

  // Simplify Results
  const simplifyResult = useMemo(() => {
    const divisor = gcd(simpNum, simpDen);
    const simplified = simplify(simpNum, simpDen);
    return {
      original: `${simpNum}/${simpDen}`,
      gcd: divisor,
      simplified: `${simplified.num}/${simplified.den}`,
      decimal: (simpNum / simpDen).toFixed(6),
    };
  }, [simpNum, simpDen]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Mode Tabs */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: 'calculate', label: 'Calculate' },
          { id: 'convert', label: 'Convert' },
          { id: 'simplify', label: 'Simplify' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              mode === tab.id
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Calculate Mode */}
      {mode === 'calculate' && (
        <div className="space-y-3">
          <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
            <MixedNumberInput
              label="First Number"
              whole={whole1}
              numerator={num1}
              denominator={den1}
              onWholeChange={setWhole1}
              onNumeratorChange={setNum1}
              onDenominatorChange={setDen1}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">
                Operation
              </label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full px-4 py-2 border border-border bg-white rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="add">Add (+)</option>
                <option value="subtract">Subtract (−)</option>
                <option value="multiply">Multiply (×)</option>
                <option value="divide">Divide (÷)</option>
              </select>
            </div>

            <MixedNumberInput
              label="Second Number"
              whole={whole2}
              numerator={num2}
              denominator={den2}
              onWholeChange={setWhole2}
              onNumeratorChange={setNum2}
              onDenominatorChange={setDen2}
            />
          </div>

          {/* Result Card */}
          <div className="bg-accent bg-opacity-5 border border-accent border-opacity-20 rounded-lg p-6 space-y-4">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Result
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Mixed Number
                </p>
                <div className="flex items-center text-2xl font-semibold text-text-primary">
                  {calculateResult.mixed.whole !== 0 && (
                    <span className="font-mono-num mr-2">
                      {calculateResult.mixed.whole}
                    </span>
                  )}
                  {calculateResult.mixed.num !== 0 && (
                    <FractionDisplay
                      numerator={Math.abs(calculateResult.mixed.num)}
                      denominator={calculateResult.mixed.den}
                      className="text-lg"
                    />
                  )}
                  {calculateResult.mixed.whole === 0 && calculateResult.mixed.num === 0 && (
                    <span className="font-mono-num">0</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Improper Fraction
                </p>
                <div className="flex items-center text-2xl font-semibold text-text-primary">
                  <FractionDisplay
                    numerator={calculateResult.improperNum}
                    denominator={calculateResult.improperDen}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Decimal
                </p>
                <p className="text-2xl font-semibold font-mono-num text-text-primary">
                  {calculateResult.decimal}
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-step Working */}
          <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Step-by-Step Working
            </h3>
            <div className="space-y-4">
              {calculateResult.steps.map((step, index) => (
                <div key={index} className="border-l-4 border-accent pl-4 py-2">
                  <p className="font-medium text-text-primary text-sm">
                    Step {index + 1}: {step.title}
                  </p>
                  <p className="text-text-secondary text-sm whitespace-pre-line mt-1 font-mono-num">
                    {step.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Convert Mode */}
      {mode === 'convert' && (
        <div className="space-y-3">
          <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">
                Convert From
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'mixed', label: 'Mixed Number' },
                  { id: 'improper', label: 'Improper Fraction' },
                  { id: 'decimal', label: 'Decimal' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setConvertType(type.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      convertType === type.id
                        ? 'bg-accent text-white'
                        : 'bg-white border border-border text-text-primary hover:bg-surface'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {convertType === 'mixed' && (
              <MixedNumberInput
                label="Enter Mixed Number"
                whole={convertWhole}
                numerator={convertNum}
                denominator={convertDen}
                onWholeChange={setConvertWhole}
                onNumeratorChange={setConvertNum}
                onDenominatorChange={setConvertDen}
              />
            )}

            {convertType === 'improper' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-secondary">
                  Enter Improper Fraction
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={convertNum}
                    onChange={(e) => setConvertNum(parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="flex-1 px-3 py-2 border border-border bg-white rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <span className="text-text-secondary">/</span>
                  <input
                    type="number"
                    value={convertDen}
                    onChange={(e) => setConvertDen(parseInt(e.target.value) || 1)}
                    placeholder="1"
                    className="flex-1 px-3 py-2 border border-border bg-white rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>
            )}

            {convertType === 'decimal' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-secondary">
                  Enter Decimal
                </label>
                <input
                  type="number"
                  value={convertDecimal}
                  onChange={(e) => setConvertDecimal(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-3 py-2 border border-border bg-white rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Conversion Results */}
          <div className="bg-accent bg-opacity-5 border border-accent border-opacity-20 rounded-lg p-6 space-y-4">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Conversions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 bg-white border border-border rounded-lg p-4">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Mixed Number
                </p>
                <div className="flex items-center text-xl font-semibold text-text-primary">
                  {convertResult.mixed.whole !== 0 && (
                    <span className="font-mono-num mr-2">
                      {convertResult.mixed.whole}
                    </span>
                  )}
                  {convertResult.mixed.num !== 0 && (
                    <FractionDisplay
                      numerator={Math.abs(convertResult.mixed.num)}
                      denominator={convertResult.mixed.den}
                    />
                  )}
                  {convertResult.mixed.whole === 0 && convertResult.mixed.num === 0 && (
                    <span className="font-mono-num">0</span>
                  )}
                </div>
              </div>

              <div className="space-y-2 bg-white border border-border rounded-lg p-4">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Improper Fraction
                </p>
                <div className="flex items-center text-xl font-semibold text-text-primary">
                  <FractionDisplay
                    numerator={convertResult.improper.num}
                    denominator={convertResult.improper.den}
                  />
                </div>
              </div>

              <div className="space-y-2 bg-white border border-border rounded-lg p-4">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Decimal
                </p>
                <p className="text-xl font-semibold font-mono-num text-text-primary">
                  {convertResult.decimal}
                </p>
              </div>

              <div className="space-y-2 bg-white border border-border rounded-lg p-4">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Percentage
                </p>
                <p className="text-xl font-semibold font-mono-num text-text-primary">
                  {convertResult.percentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simplify Mode */}
      {mode === 'simplify' && (
        <div className="space-y-3">
          <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
            <label className="block text-sm font-medium text-text-secondary">
              Enter Fraction to Simplify
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={simpNum}
                onChange={(e) => setSimpNum(parseInt(e.target.value) || 0)}
                placeholder="0"
                className="flex-1 px-3 py-2 border border-border bg-white rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <span className="text-text-secondary">/</span>
              <input
                type="number"
                value={simpDen}
                onChange={(e) => setSimpDen(parseInt(e.target.value) || 1)}
                placeholder="1"
                className="flex-1 px-3 py-2 border border-border bg-white rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                min="1"
              />
            </div>
          </div>

          {/* Simplification Result */}
          <div className="bg-accent bg-opacity-5 border border-accent border-opacity-20 rounded-lg p-6 space-y-4">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Simplification
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 bg-white border border-border rounded-lg p-4">
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    Original
                  </p>
                  <div className="flex items-center text-xl font-semibold text-text-primary">
                    <FractionDisplay
                      numerator={simpNum}
                      denominator={simpDen}
                    />
                  </div>
                </div>

                <div className="space-y-2 bg-white border border-border rounded-lg p-4">
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    Simplified
                  </p>
                  <div className="flex items-center text-xl font-semibold text-text-primary">
                    <FractionDisplay
                      numerator={simplifyResult.simplified.split('/')[0]}
                      denominator={simplifyResult.simplified.split('/')[1]}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-border rounded-lg p-4">
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">
                    GCD (Greatest Common Divisor)
                  </p>
                  <p className="text-2xl font-semibold font-mono-num text-accent">
                    {simplifyResult.gcd}
                  </p>
                </div>

                <div className="bg-white border border-border rounded-lg p-4">
                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">
                    Decimal Value
                  </p>
                  <p className="text-2xl font-semibold font-mono-num text-text-primary">
                    {simplifyResult.decimal}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-border rounded-lg p-4 space-y-2">
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Calculation
                </p>
                <p className="text-sm text-text-secondary font-mono-num">
                  {simpNum} ÷ {simplifyResult.gcd} = {simplifyResult.simplified.split('/')[0]}
                </p>
                <p className="text-sm text-text-secondary font-mono-num">
                  {simpDen} ÷ {simplifyResult.gcd} = {simplifyResult.simplified.split('/')[1]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
