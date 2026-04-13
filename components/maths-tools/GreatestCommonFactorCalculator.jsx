'use client';

import { useState, useMemo } from 'react';

export default function GreatestCommonFactorCalculator() {
  const [numbers, setNumbers] = useState([24, 36]);

  const getPrimeFactors = (n) => {
    const factors = {};
    for (let i = 2; i * i <= n; i++) {
      while (n % i === 0) {
        factors[i] = (factors[i] || 0) + 1;
        n /= i;
      }
    }
    if (n > 1) factors[n] = (factors[n] || 0) + 1;
    return factors;
  };

  const gcd = (a, b) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const lcm = (a, b) => {
    return (a * b) / gcd(a, b);
  };

  const result = useMemo(() => {
    const validNumbers = numbers.filter((n) => n > 0);
    if (validNumbers.length === 0) return null;

    const gcfValue = validNumbers.reduce((a, b) => gcd(a, b));
    const lcmValue = validNumbers.reduce((a, b) => lcm(a, b));
    const primeFactorizations = validNumbers.map((n) => getPrimeFactors(n));

    return {
      gcf: gcfValue,
      lcm: lcmValue,
      primeFactorizations,
      numbers: validNumbers,
    };
  }, [numbers]);

  const handleNumberChange = (index, value) => {
    const newNumbers = [...numbers];
    newNumbers[index] = parseFloat(value) || 0;
    setNumbers(newNumbers);
  };

  const handleAddNumber = () => {
    setNumbers([...numbers, 0]);
  };

  const handleRemoveNumber = (index) => {
    if (numbers.length > 2) {
      setNumbers(numbers.filter((_, i) => i !== index));
    }
  };

  const handleReset = () => {
    setNumbers([24, 36]);
  };

  const formatPrimeFactorization = (factors) => {
    return Object.entries(factors)
      .map(([prime, power]) => (power > 1 ? `${prime}^${power}` : prime))
      .join(' × ');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="space-y-3">
        <label className="block text-text-primary font-medium">Numbers</label>
        {numbers.map((num, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="number"
              value={num}
              onChange={(e) => handleNumberChange(index, e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Enter a number"
            />
            {numbers.length > 2 && (
              <button
                onClick={() => handleRemoveNumber(index)}
                className="px-3 py-2 bg-white border border-border text-red-600 font-medium rounded-[var(--radius-input)] hover:bg-red-50 transition"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleAddNumber}
          className="w-full px-4 py-2 bg-white border border-border text-text-primary font-medium rounded-[var(--radius-input)] hover:bg-surface transition"
        >
          Add Another Number
        </button>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface p-4 rounded-[var(--radius-card)]">
              <p className="text-text-secondary text-sm mb-2">GCF (Greatest Common Factor)</p>
              <p className="text-3xl font-mono font-bold text-text-primary">{result.gcf}</p>
            </div>

            <div className="bg-surface p-4 rounded-[var(--radius-card)]">
              <p className="text-text-secondary text-sm mb-2">LCM (Least Common Multiple)</p>
              <p className="text-3xl font-mono font-bold text-text-primary">{result.lcm}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)] space-y-3">
            <p className="text-text-secondary font-medium">Prime Factorizations</p>
            {result.numbers.map((num, index) => (
              <div key={index} className="font-mono text-sm text-text-primary">
                {num} = {formatPrimeFactorization(result.primeFactorizations[index])}
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm font-medium mb-2">Euclidean Algorithm Steps</p>
            <p className="text-text-secondary text-xs font-mono">
              GCF({result.numbers[0]}, {result.numbers[1]}) calculated by repeatedly finding remainders
              until remainder is 0. Result = {result.gcf}
            </p>
          </div>
        </>
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
