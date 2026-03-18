'use client';

import { useState, useMemo } from 'react';
import Select from '@/components/ui/Select';
import { COUNTRIES, formatCurrency, detectUserCountry } from '@/data/unpaid-work-wages';

export default function CareerSacrificeCalculator() {
  const [country, setCountry] = useState(() => { if (typeof window !== 'undefined') return detectUserCountry(); return 'uk'; });
  const [salaryBefore, setSalaryBefore] = useState(50000);
  const [currentSalary, setCurrentSalary] = useState(0);
  const [yearsOut, setYearsOut] = useState(5);
  const [ageAtBreak, setAgeAtBreak] = useState(30);
  const [numberOfChildren, setNumberOfChildren] = useState(2);

  const calculations = useMemo(() => {
    if (salaryBefore <= 0 || yearsOut === 0) return { lostEarnings: 0, lostPension: 0, lostProgression: 0, motherhoodPenalty: 0, total: 0 };

    const salaryDifference = salaryBefore - (currentSalary || 0);
    const lostEarnings = salaryDifference * yearsOut;

    const annualEmployerContribution = salaryBefore * 0.05;
    const yearsToRetirement = Math.max(0, 67 - ageAtBreak);
    const yearsOutOfPension = yearsOut;
    const yearsCompounding = yearsToRetirement - yearsOut;

    let pensionLoss = 0;
    for (let year = 0; year < yearsOutOfPension; year++) {
      const yearsRemaining = yearsCompounding - (yearsOutOfPension - year);
      if (yearsRemaining > 0) pensionLoss += annualEmployerContribution * Math.pow(1.05, yearsRemaining);
    }

    let projectedSalary = salaryBefore;
    for (let year = 0; year < yearsOut; year++) projectedSalary *= 1.035;
    const lostProgression = projectedSalary - salaryBefore;

    const penaltyRate = 0.04 * numberOfChildren;
    const effectiveRemainingCareer = 67 - (ageAtBreak + yearsOut);
    const motherhoodPenalty = (currentSalary || salaryBefore) * penaltyRate * effectiveRemainingCareer;

    const total = lostEarnings + pensionLoss + lostProgression + motherhoodPenalty;
    return { lostEarnings: Math.round(lostEarnings), lostPension: Math.round(pensionLoss), lostProgression: Math.round(lostProgression), motherhoodPenalty: Math.round(motherhoodPenalty), total: Math.round(total) };
  }, [salaryBefore, currentSalary, yearsOut, ageAtBreak, numberOfChildren]);

  const selectedCountry = COUNTRIES.find(c => c.id === country);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      {/* ── Controls: compact grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <Select value={country} onChange={(e) => setCountry(e.target.value)} options={COUNTRIES.map(c => ({ value: c.id, label: `${c.flag} ${c.name}` }))} />
        </div>

        <div>
          <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">Salary before</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs text-text-muted">{selectedCountry?.currency}</span>
            <input type="number" value={salaryBefore} onChange={(e) => setSalaryBefore(Math.max(0, Number(e.target.value)))} className="w-full pl-6 pr-2 py-1.5 border border-border rounded text-sm font-mono bg-background focus:ring-1 focus:ring-accent focus:border-accent" />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">Current salary</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs text-text-muted">{selectedCountry?.currency}</span>
            <input type="number" value={currentSalary} onChange={(e) => setCurrentSalary(Math.max(0, Number(e.target.value)))} className="w-full pl-6 pr-2 py-1.5 border border-border rounded text-sm font-mono bg-background focus:ring-1 focus:ring-accent focus:border-accent" />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">Years out</label>
          <input type="number" value={yearsOut} onChange={(e) => setYearsOut(Math.max(0, Number(e.target.value)))} min="0" max="40" step="0.5" className="w-full px-2 py-1.5 border border-border rounded text-sm font-mono bg-background focus:ring-1 focus:ring-accent focus:border-accent" />
        </div>

        <div>
          <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">Age at break</label>
          <input type="number" value={ageAtBreak} onChange={(e) => setAgeAtBreak(Math.max(18, Number(e.target.value)))} min="18" max="65" className="w-full px-2 py-1.5 border border-border rounded text-sm font-mono bg-background focus:ring-1 focus:ring-accent focus:border-accent" />
        </div>

        <div>
          <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">Children</label>
          <input type="number" value={numberOfChildren} onChange={(e) => setNumberOfChildren(Math.max(1, Number(e.target.value)))} min="1" max="10" className="w-full px-2 py-1.5 border border-border rounded text-sm font-mono bg-background focus:ring-1 focus:ring-accent focus:border-accent" />
        </div>
      </div>

      {/* ── Big headline ── */}
      <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl border border-accent/20 p-5 mb-4">
        <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Estimated financial impact</p>
        <div className="font-heading text-4xl sm:text-5xl font-bold text-accent mb-1">
          {formatCurrency(calculations.total, country)}
        </div>
        <p className="text-text-secondary text-sm">Over your career, from now to retirement</p>
      </div>

      {/* ── Breakdown: 2x2 grid cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Direct lost earnings</p>
          <p className="font-heading text-2xl font-bold text-text-primary font-mono">{formatCurrency(calculations.lostEarnings, country)}</p>
          <p className="text-[10px] text-text-muted mt-2">Salary gap × {yearsOut} years out</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Lost pension</p>
          <p className="font-heading text-2xl font-bold text-text-primary font-mono">{formatCurrency(calculations.lostPension, country)}</p>
          <p className="text-[10px] text-text-muted mt-2">5% match + growth to 67</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Lost progression</p>
          <p className="font-heading text-2xl font-bold text-text-primary font-mono">{formatCurrency(calculations.lostProgression, country)}</p>
          <p className="text-[10px] text-text-muted mt-2">Missed 3.5% annual raises</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Motherhood penalty</p>
          <p className="font-heading text-2xl font-bold text-text-primary font-mono">{formatCurrency(calculations.motherhoodPenalty, country)}</p>
          <p className="text-[10px] text-text-muted mt-2">4% per child, rest of career</p>
        </div>
      </div>

      {/* ── Context callout ── */}
      <div className="bg-gradient-to-br from-accent/5 to-white border border-accent/20 rounded-xl p-4">
        <p className="text-xs font-bold text-text-primary mb-2">This is structural, not personal.</p>
        <p className="text-xs text-text-secondary mb-3">The financial penalty for caregiving is systemic - caregiving is undervalued and unsupported. Countries like Germany, France, and Nordic regions offer 12-48 weeks of paid leave; the UK offers 39 weeks mostly unpaid; the US has no federal guarantee.</p>
        <p className="text-[10px] text-text-muted">Your choice to care for your family is valid. The financial cost shouldn't be this high.</p>
      </div>
    </div>
  );
}
