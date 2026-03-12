'use client';

import { useState, useMemo } from 'react';

export default function PregnancyDueDateCalculator() {
  const [dateMode, setDateMode] = useState('lmp');
  const [lmpDate, setLmpDate] = useState('2025-09-01');
  const [conceptionDate, setConceptionDate] = useState('2025-09-15');

  const calculations = useMemo(() => {
    const startDate = dateMode === 'lmp' ? new Date(lmpDate) : new Date(conceptionDate);
    const today = new Date();

    let dueDate;
    let weeksSinceStart;

    if (dateMode === 'lmp') {
      dueDate = new Date(startDate);
      dueDate.setDate(dueDate.getDate() + 280);
      weeksSinceStart = Math.floor((today - startDate) / (7 * 24 * 60 * 60 * 1000));
    } else {
      dueDate = new Date(startDate);
      dueDate.setDate(dueDate.getDate() + 266);
      weeksSinceStart = Math.floor((today - startDate) / (7 * 24 * 60 * 60 * 1000)) - 2;
    }

    const daysIntoWeek = Math.floor(((today - startDate) % (7 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const daysRemaining = Math.floor((dueDate - today) / (24 * 60 * 60 * 1000));
    const weeksRemaining = Math.floor(daysRemaining / 7);

    const isFullTerm = weeksSinceStart >= 37;
    const isViable = weeksSinceStart >= 24;
    const isThirdTrimester = weeksSinceStart >= 28;
    const isSecondTrimester = weeksSinceStart >= 14;

    const endFirstTrimester = new Date(startDate);
    endFirstTrimester.setDate(endFirstTrimester.getDate() + 91);

    const endSecondTrimester = new Date(startDate);
    endSecondTrimester.setDate(endSecondTrimester.getDate() + 196);

    const viabilityDate = new Date(startDate);
    viabilityDate.setDate(viabilityDate.getDate() + 168);

    const fullTermDate = new Date(startDate);
    fullTermDate.setDate(fullTermDate.getDate() + 259);

    return {
      dueDate: dueDate.toDateString(),
      weeksSinceStart: Math.max(0, weeksSinceStart),
      daysIntoWeek,
      weeksRemaining: Math.max(0, weeksRemaining),
      daysRemaining: Math.max(0, daysRemaining),
      currentTrimester: isThirdTrimester ? '3rd' : isSecondTrimester ? '2nd' : '1st',
      isFullTerm,
      isViable,
      endFirstTrimester: endFirstTrimester.toDateString(),
      endSecondTrimester: endSecondTrimester.toDateString(),
      viabilityDate: viabilityDate.toDateString(),
      fullTermDate: fullTermDate.toDateString(),
    };
  }, [dateMode, lmpDate, conceptionDate]);

  const getTrimesterProgress = () => {
    const weeks = calculations.weeksSinceStart;
    if (weeks >= 40) return 100;
    if (weeks < 0) return 0;
    return Math.round((weeks / 40) * 100);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface rounded-[var(--radius-card)] border border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Pregnancy Due Date Calculator</h2>

      <div className="space-y-4 mb-8">
        {/* Date Mode Toggle */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Calculate from</label>
          <div className="flex gap-4">
            {['lmp', 'conception'].map((mode) => (
              <label key={mode} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateMode"
                  value={mode}
                  checked={dateMode === mode}
                  onChange={(e) => setDateMode(e.target.value)}
                  className="w-4 h-4 text-accent"
                />
                <span className="text-text-primary">
                  {mode === 'lmp' ? 'Last Menstrual Period' : 'Conception Date'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Input */}
        {dateMode === 'lmp' ? (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Last Menstrual Period</label>
            <input
              type="date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Conception Date</label>
            <input
              type="date"
              value={conceptionDate}
              onChange={(e) => setConceptionDate(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4 border-t border-border pt-6">
        {/* Due Date */}
        <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
          <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Estimated Due Date</p>
          <p className="font-mono-num text-2xl font-bold text-accent">{calculations.dueDate}</p>
          <p className="text-xs text-text-secondary mt-2">
            {calculations.daysRemaining} days away • {calculations.weeksRemaining} weeks remaining
          </p>
        </div>

        {/* Current Progress */}
        <div className="p-4 bg-blue-50 rounded-[var(--radius-input)] border border-blue-200">
          <div className="flex justify-between items-baseline mb-2">
            <p className="text-sm font-medium text-blue-700">Current Pregnancy Progress</p>
            <p className="font-mono-num text-lg font-bold text-blue-600">
              {calculations.weeksSinceStart}w {calculations.daysIntoWeek}d
            </p>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-300"
              style={{ width: `${getTrimesterProgress()}%` }}
            />
          </div>
          <p className="text-xs text-blue-600 mt-2">Trimester {calculations.currentTrimester}</p>
        </div>

        {/* Key Milestones */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-[var(--radius-input)] border ${
            calculations.isViable
              ? 'bg-green-50 border-green-200'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <p className={`text-xs font-medium mb-1 ${
              calculations.isViable ? 'text-green-700' : 'text-gray-600'
            }`}>
              Viability (24w)
            </p>
            <p className={`font-mono-num text-sm font-bold ${
              calculations.isViable ? 'text-green-600' : 'text-gray-600'
            }`}>
              {calculations.viabilityDate}
            </p>
            {calculations.isViable && (
              <p className="text-xs text-green-600 mt-1">✓ Reached</p>
            )}
          </div>

          <div className={`p-4 rounded-[var(--radius-input)] border ${
            calculations.isFullTerm
              ? 'bg-green-50 border-green-200'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <p className={`text-xs font-medium mb-1 ${
              calculations.isFullTerm ? 'text-green-700' : 'text-gray-600'
            }`}>
              Full Term (37w)
            </p>
            <p className={`font-mono-num text-sm font-bold ${
              calculations.isFullTerm ? 'text-green-600' : 'text-gray-600'
            }`}>
              {calculations.fullTermDate}
            </p>
            {calculations.isFullTerm && (
              <p className="text-xs text-green-600 mt-1">✓ Reached</p>
            )}
          </div>
        </div>

        {/* Trimester Dates */}
        <div className="p-4 bg-white rounded-[var(--radius-input)] border border-border">
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium mb-3">Trimester Milestones</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-primary">1st Trimester Ends (13 weeks)</span>
              <span className="font-mono-num text-text-secondary">{calculations.endFirstTrimester}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-2">
              <span className="text-text-primary">2nd Trimester Ends (26 weeks)</span>
              <span className="font-mono-num text-text-secondary">{calculations.endSecondTrimester}</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-purple-50 rounded-[var(--radius-input)] border border-purple-200">
          <p className="text-xs text-purple-700 font-medium mb-2">💜 Important Notes</p>
          <ul className="text-xs text-purple-600 space-y-1">
            <li>• Due date is an estimate; most babies arrive within 2 weeks before or after</li>
            <li>• Your healthcare provider may adjust based on ultrasound dating</li>
            <li>• Viability milestone is significant for preterm birth outcomes</li>
            <li>• Regular prenatal care is essential for monitoring pregnancy health</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
