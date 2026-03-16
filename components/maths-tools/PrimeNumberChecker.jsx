'use client';

import { useState, useMemo } from 'react';

export default function PrimeNumberChecker() {
  const [input, setInput] = useState(17);
  const [mode, setMode] = useState('check');
  const [limit, setLimit] = useState(100);

  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const getFactors = (num) => {
    const factors = [];
    for (let i = 2; i <= num; i++) {
      while (num % i === 0) {
        factors.push(i);
        num /= i;
      }
    }
    return factors;
  };

  const getNextPrimes = (num, count) => {
    const primes = [];
    let candidate = num + 1;
    while (primes.length < count) {
      if (isPrime(candidate)) {
        primes.push(candidate);
      }
      candidate++;
    }
    return primes;
  };

  const getPrimesUpTo = (n) => {
    const primes = [];
    for (let i = 2; i <= n; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }
    return primes;
  };

  const num = Math.abs(Math.floor(input));

  const checkResult = useMemo(() => {
    if (mode === 'check') {
      const prime = isPrime(num);
      const factors = prime ? null : getFactors(num);
      const nextPrimes = getNextPrimes(num, 10);
      return { prime, factors, nextPrimes };
    } else if (mode === 'list') {
      return { primesList: getPrimesUpTo(limit) };
    }
  }, [input, mode, limit, num]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setMode('check')}
          className={`flex-1 px-4 py-2 font-medium rounded-[var(--radius-input)] transition ${
            mode === 'check'
              ? 'bg-accent text-white'
              : 'bg-white border border-border text-text-primary hover:bg-surface'
          }`}
        >
          Check Prime
        </button>
        <button
          onClick={() => setMode('list')}
          className={`flex-1 px-4 py-2 font-medium rounded-[var(--radius-input)] transition ${
            mode === 'list'
              ? 'bg-accent text-white'
              : 'bg-white border border-border text-text-primary hover:bg-surface'
          }`}
        >
          List Primes
        </button>
      </div>

      {mode === 'check' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-text-primary font-medium mb-2">Enter a number</label>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div className="bg-surface p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm mb-2">Is {num} prime?</p>
            <p className="text-3xl font-mono font-bold text-text-primary">
              {checkResult.prime ? '✓ Yes' : '✗ No'}
            </p>
          </div>

          {!checkResult.prime && checkResult.factors && (
            <div className="bg-surface p-4 rounded-[var(--radius-card)]">
              <p className="text-text-secondary text-sm mb-2">Prime Factorization</p>
              <p className="font-mono text-text-primary">
                {num} = {checkResult.factors.join(' × ')}
              </p>
              <p className="text-text-muted text-xs mt-2">
                Factors: {Array.from(new Set(checkResult.factors)).join(', ')}
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm font-medium mb-2">
              Next 10 primes after {num}
            </p>
            <p className="font-mono text-text-primary text-sm">
              {checkResult.nextPrimes.join(', ')}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-text-primary font-medium mb-2">
              List all primes up to
            </label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Math.max(2, Math.floor(e.target.value) || 100))}
              className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div className="bg-surface p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm mb-2">
              Found {checkResult.primesList.length} primes
            </p>
            <p className="font-mono text-text-primary text-sm break-words">
              {checkResult.primesList.join(', ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
