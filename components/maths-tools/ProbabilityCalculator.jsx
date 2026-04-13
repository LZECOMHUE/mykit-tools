'use client';

import { useState } from 'react';

export default function ProbabilityCalculator() {
  const [tab, setTab] = useState('basic');
  const [favorableOutcomes, setFavorableOutcomes] = useState(3);
  const [totalOutcomes, setTotalOutcomes] = useState(6);
  const [n, setN] = useState(5);
  const [r, setR] = useState(2);
  const [pA, setPa] = useState(0.5);
  const [pB, setPb] = useState(0.5);

  const factorial = (n) => {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const combination = (n, r) => {
    if (r > n || r < 0) return 0;
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  const permutation = (n, r) => {
    if (r > n || r < 0) return 0;
    return factorial(n) / factorial(n - r);
  };

  const basicProb = (favorableOutcomes / totalOutcomes).toFixed(4);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'basic', label: 'Basic' },
          { id: 'combinations', label: 'Combinations (nCr)' },
          { id: 'permutations', label: 'Permutations (nPr)' },
          { id: 'independent', label: 'Independent Events' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 font-medium rounded-[var(--radius-input)] transition text-sm ${
              tab === t.id
                ? 'bg-accent text-white'
                : 'bg-white border border-border text-text-primary hover:bg-surface'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'basic' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Favorable Outcomes
              </label>
              <input
                type="number"
                value={favorableOutcomes}
                onChange={(e) => setFavorableOutcomes(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">Total Outcomes</label>
              <input
                type="number"
                value={totalOutcomes}
                onChange={(e) => setTotalOutcomes(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-surface p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm mb-2">Probability</p>
            <p className="text-3xl font-mono font-bold text-text-primary">{basicProb}</p>
            <p className="text-text-secondary text-sm mt-2">
              {(basicProb * 100).toFixed(2)}% chance
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm font-medium mb-2">Formula</p>
            <p className="text-text-secondary text-xs font-mono">
              P(Event) = Favorable Outcomes / Total Outcomes
            </p>
            <p className="text-text-secondary text-xs font-mono mt-2">
              P = {favorableOutcomes} / {totalOutcomes} = {basicProb}
            </p>
          </div>
        </div>
      )}

      {tab === 'combinations' && (
        <div className="space-y-4">
          <p className="text-text-secondary text-sm">
            Combinations: choosing r items from n items where order does not matter
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">n (Total items)</label>
              <input
                type="number"
                value={n}
                onChange={(e) => setN(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">r (Items chosen)</label>
              <input
                type="number"
                value={r}
                onChange={(e) => setR(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-surface p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm mb-2">
              C({n}, {r}) or {n}C{r}
            </p>
            <p className="text-3xl font-mono font-bold text-text-primary">
              {combination(n, r)}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm font-medium mb-2">Formula</p>
            <p className="text-text-secondary text-xs font-mono">
              nCr = n! / (r! × (n-r)!)
            </p>
            <p className="text-text-secondary text-xs font-mono mt-2">
              {n}C{r} = {factorial(n)} / ({factorial(r)} × {factorial(n - r)}) = {combination(n, r)}
            </p>
          </div>
        </div>
      )}

      {tab === 'permutations' && (
        <div className="space-y-4">
          <p className="text-text-secondary text-sm">
            Permutations: arranging r items from n items where order matters
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">n (Total items)</label>
              <input
                type="number"
                value={n}
                onChange={(e) => setN(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">r (Items chosen)</label>
              <input
                type="number"
                value={r}
                onChange={(e) => setR(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-surface p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm mb-2">
              P({n}, {r}) or {n}P{r}
            </p>
            <p className="text-3xl font-mono font-bold text-text-primary">
              {permutation(n, r)}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)]">
            <p className="text-text-secondary text-sm font-medium mb-2">Formula</p>
            <p className="text-text-secondary text-xs font-mono">
              nPr = n! / (n-r)!
            </p>
            <p className="text-text-secondary text-xs font-mono mt-2">
              {n}P{r} = {factorial(n)} / {factorial(n - r)} = {permutation(n, r)}
            </p>
          </div>
        </div>
      )}

      {tab === 'independent' && (
        <div className="space-y-4">
          <p className="text-text-secondary text-sm">
            Probability of independent events A and B occurring
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                P(A) Probability of event A
              </label>
              <input
                type="number"
                value={pA}
                onChange={(e) => setPa(Math.max(0, Math.min(1, parseFloat(e.target.value) || 0)))}
                min="0"
                max="1"
                step="0.01"
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">
                P(B) Probability of event B
              </label>
              <input
                type="number"
                value={pB}
                onChange={(e) => setPb(Math.max(0, Math.min(1, parseFloat(e.target.value) || 0)))}
                min="0"
                max="1"
                step="0.01"
                className="w-full px-4 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-surface p-4 rounded-[var(--radius-card)]">
              <p className="text-text-secondary text-sm mb-2">P(A and B) - Both occur</p>
              <p className="text-2xl font-mono font-bold text-text-primary">
                {(pA * pB).toFixed(4)}
              </p>
              <p className="text-text-muted text-xs mt-1">
                {(pA * pB * 100).toFixed(2)}% chance
              </p>
            </div>

            <div className="bg-surface p-4 rounded-[var(--radius-card)]">
              <p className="text-text-secondary text-sm mb-2">P(A or B) - At least one occurs</p>
              <p className="text-2xl font-mono font-bold text-text-primary">
                {(pA + pB - pA * pB).toFixed(4)}
              </p>
              <p className="text-text-muted text-xs mt-1">
                {((pA + pB - pA * pB) * 100).toFixed(2)}% chance
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-[var(--radius-card)] space-y-2">
            <p className="text-text-secondary text-sm font-medium">Formulas</p>
            <p className="text-text-secondary text-xs font-mono">
              P(A and B) = P(A) × P(B) = {pA} × {pB} = {(pA * pB).toFixed(4)}
            </p>
            <p className="text-text-secondary text-xs font-mono">
              P(A or B) = P(A) + P(B) - P(A and B)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
