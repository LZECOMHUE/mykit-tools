'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import GamblingDisclaimer from '@/components/ui/GamblingDisclaimer';

export default function OddsConverter() {
  const [inputType, setInputType] = useState('decimal');
  const [inputValue, setInputValue] = useState('2.5');

  const commonOdds = [
    { decimal: 1.01, fractional: '1/100', american: '-10000', label: 'Evens' },
    { decimal: 1.5, fractional: '1/2', american: '-200', label: '1/2' },
    { decimal: 2.0, fractional: '1/1', american: '100', label: '1/1' },
    { decimal: 3.0, fractional: '2/1', american: '200', label: '2/1' },
    { decimal: 5.0, fractional: '4/1', american: '400', label: '4/1' },
    { decimal: 6.0, fractional: '5/1', american: '500', label: '5/1' },
    { decimal: 11.0, fractional: '10/1', american: '1000', label: '10/1' },
    { decimal: 101.0, fractional: '100/1', american: '10000', label: '100/1' },
  ];

  const parseInput = (value, type) => {
    if (!value || isNaN(value)) return null;

    if (type === 'decimal') {
      const num = parseFloat(value);
      return num > 0 ? num : null;
    }

    if (type === 'fractional') {
      const [num, denom] = value.split('/').map(parseFloat);
      if (num && denom && denom !== 0) {
        return (num + denom) / denom;
      }
      return null;
    }

    if (type === 'american') {
      const num = parseFloat(value);
      if (num === 0) return null;
      return num > 0 ? (num / 100) + 1 : (100 / Math.abs(num)) + 1;
    }

    return null;
  };

  const conversions = useMemo(() => {
    const decimal = parseInput(inputValue, inputType);
    if (decimal === null) return null;

    // Decimal is our base
    const num = Math.round((decimal - 1) * 100);
    const denom = 100;
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(num, denom);

    const fractionalNum = num / divisor;
    const fractionalDenom = denom / divisor;
    const fractionalStr = fractionalNum === 0 ? '1/100' : `${fractionalNum}/${fractionalDenom}`;

    let american;
    if (decimal > 2) {
      american = Math.round((decimal - 1) * 100);
    } else if (decimal < 2) {
      american = Math.round(-100 / (decimal - 1));
    } else {
      american = 0;
    }

    const probability = ((1 / decimal) * 100).toFixed(2);
    const returnOn10 = (10 * decimal).toFixed(2);

    return {
      decimal: decimal.toFixed(2),
      fractional: fractionalStr,
      american: american > 0 ? `+${american}` : `${american}`,
      probability,
      returnOn10,
    };
  }, [inputValue, inputType]);

  const tabOptions = [
    { value: 'decimal', label: 'Decimal' },
    { value: 'fractional', label: 'Fractional' },
    { value: 'american', label: 'American' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-surface border border-border rounded-lg p-4">
        <p className="text-secondary text-sm">
          Convert between decimal, fractional, and American (moneyline) odds formats. See implied probability and calculate returns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <h3 className="font-heading text-lg font-bold text-primary mb-4">Enter Odds</h3>
          <div className="space-y-4">
            <div className="flex gap-1 border-b border-border mb-2">
              {tabOptions.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setInputType(tab.value)}
                  className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
                    inputType === tab.value
                      ? 'border-accent text-accent'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <Input
              label={inputType === 'decimal' ? 'Decimal Odds' : inputType === 'fractional' ? 'Fractional Odds' : 'American (Moneyline)'}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputType === 'decimal' ? '2.5' : inputType === 'fractional' ? '5/2' : '+250'}
              helperText={
                inputType === 'decimal'
                  ? 'e.g., 2.5 (€1 stake returns €2.50)'
                  : inputType === 'fractional'
                    ? 'e.g., 5/2 (€1 stake wins €2.50)'
                    : 'e.g., +250 (€100 stake wins €250) or -200 (€200 stake wins €100)'
              }
            />

            <div className="border-t border-border pt-4">
              <p className="text-secondary text-xs font-bold mb-3">Quick Reference</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {commonOdds.map((odd, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputType('decimal');
                      setInputValue(odd.decimal.toString());
                    }}
                    className="w-full text-left px-3 py-2 rounded text-sm hover:bg-surface-hover transition"
                  >
                    <span className="text-primary font-mono font-bold">{odd.label}</span>
                    <span className="text-muted text-xs ml-2">
                      {odd.decimal} / {odd.fractional} / {odd.american}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Conversions */}
        {conversions && (
          <Card>
            <h3 className="font-heading text-lg font-bold text-primary mb-4">Converted Odds</h3>
            <div className="space-y-4">
              <div className="bg-surface rounded p-3">
                <p className="text-secondary text-xs mb-1">Decimal</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  {conversions.decimal}
                </p>
              </div>

              <div className="bg-surface rounded p-3">
                <p className="text-secondary text-xs mb-1">Fractional</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  {conversions.fractional}
                </p>
              </div>

              <div className="bg-surface rounded p-3">
                <p className="text-secondary text-xs mb-1">American (Moneyline)</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  {conversions.american}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-heading text-sm font-bold text-primary mb-3">
                  Analysis
                </h4>

                <div className="space-y-3">
                  <div className="bg-blue-50 rounded p-3">
                    <p className="text-secondary text-xs mb-1">Implied Probability</p>
                    <p className="font-mono text-xl font-bold text-primary">
                      {conversions.probability}%
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded p-3">
                    <p className="text-secondary text-xs mb-1">Return on £10 Bet</p>
                    <p className="font-mono text-xl font-bold text-success">
                      £{conversions.returnOn10}
                    </p>
                    <p className="text-muted text-xs mt-1">
                      Profit: £{(parseFloat(conversions.returnOn10) - 10).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-warning rounded p-3">
                <p className="text-secondary text-xs mb-2 font-bold">Formulas</p>
                <div className="space-y-1 text-muted text-xs font-mono">
                  <p>Decimal = Fractional + 1</p>
                  <p>Probability = 1 / Decimal * 100</p>
                  <p>American = (Decimal - 1) * 100 (if odds {"> "}2.0)</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <GamblingDisclaimer type="betting" />
    </div>
  );
}
