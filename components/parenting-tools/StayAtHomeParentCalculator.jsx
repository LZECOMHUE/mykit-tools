'use client';

import { useMemo, useState, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import {
  COUNTRIES, ROLE_RATES, SAHP_ROLES, AGE_PRESETS, formatCurrency, detectUserCountry,
} from '@/data/unpaid-work-wages';

const COLORS = ['#2563eb','#ec4899','#f59e0b','#10b981','#8b5cf6','#f97316','#06b6d4','#ef4444','#6366f1','#14b8a6','#84cc16','#f43f5e'];

export default function StayAtHomeParentCalculator() {
  const [country, setCountry] = useState(() => {
    if (typeof window !== 'undefined') return detectUserCountry();
    return 'uk';
  });
  const [timePeriod, setTimePeriod] = useState('yearly');
  // Default hours: reasonable starting point, user edits from here
  const [hours, setHours] = useState({
    childcare: 30, nightCare: 5, cooking: 14, cleaning: 10,
    householdMgmt: 5, tutoring: 4, emotionalSupport: 7, driving: 7,
    nursing: 2, entertainment: 8, admin: 4, laundry: 6,
  });
  const [showExtras, setShowExtras] = useState(false);
  const [daysSinceBreak, setDaysSinceBreak] = useState(0);
  const [copied, setCopied] = useState(false);
  // Track which cell is being edited: { roleId, unit } or null
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  const countryData = COUNTRIES.find(c => c.id === country);
  const rates = ROLE_RATES[country];

  // Caps per unit
  const CAPS = { day: 24, week: 168, month: 730, year: 8760 };

  // Convert any unit to weekly (base)
  const toWeekly = useCallback((value, unit) => {
    const num = Math.min(Math.max(0, parseFloat(value) || 0), CAPS[unit] || 168);
    switch (unit) {
      case 'day': return num * 7;
      case 'month': return (num * 12) / 52;
      case 'year': return num / 52;
      default: return num;
    }
  }, []);

  // Live update as user types
  const handleEditChange = useCallback((roleId, rawValue, unit) => {
    setEditValue(rawValue);
    const weekly = toWeekly(rawValue, unit);
    setHours(prev => ({ ...prev, [roleId]: weekly }));
  }, [toWeekly]);

  const startEditing = (roleId, unit, currentValue) => {
    setEditing({ roleId, unit });
    setEditValue(String(currentValue));
  };

  const stopEditing = () => {
    setEditing(null);
    setEditValue('');
  };

  const calc = useMemo(() => {
    const breakdown = SAHP_ROLES.map(role => {
      const hpw = hours[role.id] || 0;
      const hpd = hpw / 7;
      const hpm = (hpw * 52) / 12;
      const hpy = hpw * 52;
      const rate = rates[role.id] || 0;
      const weekly = hpw * rate;
      return { ...role, id: role.id, hpw, hpd, hpm, hpy, rate, weekly, yearly: weekly * 52 };
    });
    const totalHpw = breakdown.reduce((s, b) => s + b.hpw, 0);
    const totalHpd = breakdown.reduce((s, b) => s + b.hpd, 0);
    const totalHpm = breakdown.reduce((s, b) => s + b.hpm, 0);
    const totalHpy = breakdown.reduce((s, b) => s + b.hpy, 0);
    const totalWeekly = breakdown.reduce((s, b) => s + b.weekly, 0);
    const totalYearly = totalWeekly * 52;
    return {
      breakdown, totalHpw, totalHpd, totalHpm, totalHpy, totalWeekly, totalYearly,
      totalDaily: totalWeekly / 7, totalMonthly: totalYearly / 12,
      pctSalary: (totalYearly / rates.avgSalary) * 100,
      fteJobs: totalHpw / 40,
    };
  }, [hours, rates]);

  const displayVal = { daily: calc.totalDaily, weekly: calc.totalWeekly, monthly: calc.totalMonthly, yearly: calc.totalYearly }[timePeriod];
  const periodLabel = { daily: 'day', weekly: 'week', monthly: 'month', yearly: 'year' }[timePeriod];

  // Pie chart
  const pieData = calc.breakdown.filter(b => b.yearly > 0);
  let cumPct = 0;
  const conicStops = pieData.map((b, i) => {
    const pct = (b.yearly / calc.totalYearly) * 100;
    const start = cumPct;
    cumPct += pct;
    return `${COLORS[i % COLORS.length]} ${start}% ${cumPct}%`;
  }).join(',');

  const handleCopy = () => {
    const text = `My stay-at-home parenting is worth ${formatCurrency(calc.totalYearly, country)}/year. That's ${calc.pctSalary.toFixed(0)}% of an average salary and ${calc.fteJobs.toFixed(1)} full-time jobs.\n\nmykit.tools/stay-at-home-mum-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Pill helper
  const Pill = ({ active, onClick, children, className = '' }) => (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${active ? 'bg-accent text-white' : 'border border-border hover:bg-surface-hover text-text-primary'} ${className}`}>
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      {/* ── Controls: just country ── */}
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div className="w-44">
          <Select
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={COUNTRIES.map(c => ({ value: c.id, label: `${c.flag} ${c.name}` }))}
          />
        </div>
        <p className="text-xs text-text-muted pb-2">
          Edit the hours below to match your week. Everything recalculates live.
        </p>
      </div>

      {/* ── Big result + pie chart side by side ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Left: headline + stats */}
        <div className="md:col-span-2 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl border border-accent/20 p-5">
          {/* Time period toggle inline */}
          <div className="flex gap-1 mb-3">
            {['daily','weekly','monthly','yearly'].map(p => (
              <Pill key={p} active={timePeriod === p} onClick={() => setTimePeriod(p)} className="text-[10px]">
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Pill>
            ))}
          </div>

          <div className="font-heading text-4xl sm:text-5xl font-bold text-accent mb-1">
            {formatCurrency(displayVal, country)}
          </div>
          <p className="text-text-secondary text-sm mb-4">per {periodLabel}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="text-text-primary">
              <span className="font-mono font-bold text-lg">{calc.pctSalary.toFixed(0)}%</span>
              <span className="text-text-muted ml-1">of avg {countryData.name} salary</span>
            </span>
            <span className="text-text-primary">
              <span className="font-mono font-bold text-lg">{calc.fteJobs.toFixed(1)}</span>
              <span className="text-text-muted ml-1">full-time jobs</span>
            </span>
            <span className="text-text-primary">
              <span className="font-mono font-bold text-lg">{calc.totalHpw.toFixed(0)}</span>
              <span className="text-text-muted ml-1">hours/week</span>
            </span>
          </div>
        </div>

        {/* Right: pie chart */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-36 h-36 rounded-full shadow-inner" style={{ background: `conic-gradient(${conicStops})` }} />
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-3">
            {pieData.slice(0, 8).map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px]">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-text-muted truncate">{b.name.replace(/\s*\(.*\)/, '')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hours table: all time units editable ── */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-hover">
                <th className="text-left py-2 px-2.5 text-[10px] text-text-muted uppercase tracking-wide">Role</th>
                <th className="text-center py-2 px-0.5 text-[10px] text-text-muted uppercase tracking-wide w-14">/ Day</th>
                <th className="py-2 px-0 hidden sm:table-cell w-3" />
                <th className="text-center py-2 px-0.5 text-[10px] text-text-muted uppercase tracking-wide w-14">/ Week</th>
                <th className="py-2 px-0 hidden sm:table-cell w-3" />
                <th className="text-center py-2 px-0.5 text-[10px] text-text-muted uppercase tracking-wide w-14 hidden sm:table-cell">/ Month</th>
                <th className="py-2 px-0 hidden md:table-cell w-3" />
                <th className="text-center py-2 px-0.5 text-[10px] text-text-muted uppercase tracking-wide w-14 hidden md:table-cell">/ Year</th>
                <th className="text-right py-2 px-2 text-[10px] text-text-muted uppercase tracking-wide hidden sm:table-cell">Rate</th>
                <th className="text-right py-2 px-2.5 text-[10px] text-text-muted uppercase tracking-wide">Value</th>
              </tr>
            </thead>
            <tbody>
              {calc.breakdown.map((item, idx) => {
                const inputCls = "w-14 py-1 px-1 border border-border rounded text-center font-mono text-[11px] bg-background focus:ring-1 focus:ring-accent focus:border-accent";
                const isEd = (unit) => editing?.roleId === item.id && editing?.unit === unit;
                const cellVal = (unit, computed) => isEd(unit) ? editValue : computed;
                const eq = <span className="text-text-muted text-[9px]">=</span>;
                return (
                  <tr key={item.id} className="border-t border-border/50 hover:bg-surface-hover/50">
                    <td className="py-1.5 px-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                        <div>
                          <div className="text-text-primary text-xs font-medium">{item.name}</div>
                          <div className="text-text-muted text-[10px] hidden sm:block">{item.tasks || ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-1.5 px-0.5 text-center">
                      <input type="number" value={cellVal('day', item.hpd.toFixed(1))} onChange={(e) => handleEditChange(item.id, e.target.value, 'day')} onFocus={() => startEditing(item.id, 'day', item.hpd.toFixed(1))} onBlur={stopEditing} min="0" max="24" step="0.5" className={inputCls} />
                    </td>
                    <td className="py-1.5 px-0 text-center hidden sm:table-cell">{eq}</td>
                    <td className="py-1.5 px-0.5 text-center">
                      <input type="number" value={cellVal('week', item.hpw.toFixed(1))} onChange={(e) => handleEditChange(item.id, e.target.value, 'week')} onFocus={() => startEditing(item.id, 'week', item.hpw.toFixed(1))} onBlur={stopEditing} min="0" max="168" step="0.5" className={inputCls} />
                    </td>
                    <td className="py-1.5 px-0 text-center hidden sm:table-cell">{eq}</td>
                    <td className="py-1.5 px-0.5 text-center hidden sm:table-cell">
                      <input type="number" value={cellVal('month', item.hpm.toFixed(0))} onChange={(e) => handleEditChange(item.id, e.target.value, 'month')} onFocus={() => startEditing(item.id, 'month', item.hpm.toFixed(0))} onBlur={stopEditing} min="0" max="730" step="1" className={inputCls} />
                    </td>
                    <td className="py-1.5 px-0 text-center hidden md:table-cell">{eq}</td>
                    <td className="py-1.5 px-0.5 text-center hidden md:table-cell">
                      <input type="number" value={cellVal('year', item.hpy.toFixed(0))} onChange={(e) => handleEditChange(item.id, e.target.value, 'year')} onFocus={() => startEditing(item.id, 'year', item.hpy.toFixed(0))} onBlur={stopEditing} min="0" max="8760" step="1" className={inputCls} />
                    </td>
                    <td className="py-1.5 px-2 text-right hidden sm:table-cell text-[11px]">
                      <span className="font-mono text-text-primary">{formatCurrency(item.rate, country)}</span>
                      <span className="text-text-muted text-[9px] ml-0.5">({item.equivalent})</span>
                    </td>
                    <td className="py-1.5 px-2.5 text-right font-mono text-[11px] font-medium text-text-primary">
                      {formatCurrency(item.yearly, country)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-accent bg-accent/5">
                <td className="py-2 px-2.5 font-bold text-xs text-text-primary">TOTAL</td>
                <td className="py-2 px-0.5 text-center font-mono font-bold text-[11px] text-accent">{calc.totalHpd.toFixed(1)}</td>
                <td className="py-2 px-0 hidden sm:table-cell" />
                <td className="py-2 px-0.5 text-center font-mono font-bold text-[11px] text-accent">{calc.totalHpw.toFixed(0)}</td>
                <td className="py-2 px-0 hidden sm:table-cell" />
                <td className="py-2 px-0.5 text-center font-mono font-bold text-[11px] text-accent hidden sm:table-cell">{calc.totalHpm.toFixed(0)}</td>
                <td className="py-2 px-0 hidden md:table-cell" />
                <td className="py-2 px-0.5 text-center font-mono font-bold text-[11px] text-accent hidden md:table-cell">{calc.totalHpy.toFixed(0)}</td>
                <td className="py-2 px-2 hidden sm:table-cell" />
                <td className="py-2 px-2.5 text-right font-mono font-bold text-[11px] text-accent">{formatCurrency(calc.totalYearly, country)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── Replacement cost + share: side by side ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Replacement cost */}
        <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-4">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">If you hired professionals</p>
          <div className="space-y-1.5">
            {calc.breakdown.filter(b => b.yearly > 0).slice(0, 5).map(b => (
              <div key={b.id} className="flex justify-between text-xs">
                <span className="text-text-secondary">{b.equivalent}</span>
                <span className="font-mono text-text-primary">{formatCurrency(b.yearly, country)}</span>
              </div>
            ))}
            {calc.breakdown.filter(b => b.yearly > 0).length > 5 && (
              <p className="text-[10px] text-text-muted">+ {calc.breakdown.filter(b => b.yearly > 0).length - 5} more roles</p>
            )}
            <div className="border-t border-amber-200/50 pt-1.5 flex justify-between text-xs font-bold text-text-primary">
              <span>Total recruitment cost</span>
              <span className="font-mono">{formatCurrency(calc.totalYearly, country)}/yr</span>
            </div>
          </div>
        </div>

        {/* Share card */}
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">Share your worth</p>
          <p className="text-xs text-text-secondary mb-3">
            My stay-at-home parenting is worth <span className="font-bold text-accent">{formatCurrency(calc.totalYearly, country)}/year</span>.
            That's {calc.pctSalary.toFixed(0)}% of an average salary and {calc.fteJobs.toFixed(1)} full-time jobs.
          </p>
          <Button variant="primary" size="sm" className="w-full" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy to Share'}
          </Button>
        </div>
      </div>

      {/* ── Extras (collapsed) ── */}
      <button
        onClick={() => setShowExtras(!showExtras)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-text-primary border border-border rounded-xl hover:bg-surface-hover transition-colors"
      >
        <span>The Emotional Extras</span>
        <span className="text-text-muted text-xs">{showExtras ? '\u25B2' : '\u25BC'}</span>
      </button>

      {showExtras && (
        <div className="mt-2 border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-secondary">Days since your last full day off:</span>
            <input
              type="number" value={daysSinceBreak} min="0"
              onChange={(e) => setDaysSinceBreak(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-20 py-1 px-2 border border-border rounded text-center font-mono text-sm bg-background focus:ring-1 focus:ring-accent"
            />
            {daysSinceBreak > 0 && (
              <span className="text-xs text-text-secondary">
                = <span className="font-bold text-accent">{(daysSinceBreak / 7).toFixed(1)} weeks</span> continuous
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted bg-surface rounded-lg p-3">
            Professional childcare workers in {countryData.name} get paid annual leave, sick days, and breaks. As a stay-at-home parent, you do all of this without those. Your work is real work.
          </p>
        </div>
      )}

      {/* Footer */}
      <p className="text-center text-[10px] text-text-muted mt-6">
        Values based on professional wage benchmarks from {countryData.name}. Your worth isn't defined by a number - but it deserves to be seen.
      </p>
    </div>
  );
}
