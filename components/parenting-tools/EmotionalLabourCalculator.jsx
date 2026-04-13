'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { COUNTRIES, ROLE_RATES, EMOTIONAL_LABOUR_ROLES, formatCurrency, detectUserCountry } from '@/data/unpaid-work-wages';

const COLORS = ['#2563eb', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#f97316', '#06b6d4', '#ef4444', '#6366f1', '#14b8a6'];

const BalanceBar = ({ percentage }) => {
  const clamp = Math.max(0, Math.min(100, percentage || 0));
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
        <div className="h-full bg-accent transition-all" style={{ width: `${clamp}%` }} />
      </div>
      <span className="font-mono text-xs font-medium text-text-primary w-10 text-right">{Math.round(clamp)}%</span>
    </div>
  );
};

const Pill = ({ active, onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
      active ? 'bg-accent text-white' : 'border border-border hover:bg-surface-hover text-text-primary'
    } ${className}`}
  >
    {children}
  </button>
);

export default function EmotionalLabourCalculator() {
  const [country, setCountry] = useState(() => { if (typeof window !== 'undefined') return detectUserCountry(); return 'uk'; });
  const [relationshipStatus, setRelationshipStatus] = useState('partnered');
  const [selectedRoles, setSelectedRoles] = useState(
    EMOTIONAL_LABOUR_ROLES.reduce((acc, role) => ({ ...acc, [role.id]: true }), {})
  );
  const [hours, setHours] = useState(
    EMOTIONAL_LABOUR_ROLES.reduce((acc, role) => ({ ...acc, [role.id]: 8 }), {})
  );
  const [partnerPercentage, setPartnerPercentage] = useState(20);
  const [showPartnerSection, setShowPartnerSection] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  const countryData = COUNTRIES.find(c => c.id === country);
  const rates = ROLE_RATES[country];

  const breakdown = useMemo(() => {
    return EMOTIONAL_LABOUR_ROLES.filter(role => selectedRoles[role.id])
      .map(role => {
        const hourlyRate = rates[role.rateKey] || rates.emotionalSupport;
        const annualValue = hourlyRate * (hours[role.id] || 0) * 52;
        return {
          id: role.id,
          name: role.name,
          description: role.desc,
          hourlyRate,
          hoursPerWeek: hours[role.id] || 0,
          annualValue,
        };
      });
  }, [selectedRoles, hours, rates]);

  const totalEmotionalLabour = breakdown.reduce((sum, item) => sum + item.annualValue, 0);

  const estimatedPhysicalWork = useMemo(() => {
    const baselineHours = 35;
    const avgRate = (rates.childcare + rates.cooking + rates.cleaning + rates.householdMgmt) / 4;
    return baselineHours * avgRate * 52;
  }, [rates]);

  const combinedValue = totalEmotionalLabour + estimatedPhysicalWork;

  const handleToggleRole = (roleId) => {
    setSelectedRoles(prev => ({ ...prev, [roleId]: !prev[roleId] }));
  };

  const handleHourChange = (roleId, value) => {
    setHours(prev => ({ ...prev, [roleId]: Math.max(0, parseInt(value) || 0) }));
  };

  const handleCopy = () => {
    const text = `My invisible mental load is worth ${formatCurrency(totalEmotionalLabour, country)}/year. That's the value of the emotional labour I do - remembering, planning, worrying, managing relationships. This doesn't include physical unpaid work. Calculate yours: mykit.tools/emotional-labour-calculator`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4">
      {/* ── Controls: compact inline row ── */}
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div className="w-44">
          <Select
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={COUNTRIES.map(c => ({ value: c.id, label: `${c.flag} ${c.name}` }))}
          />
        </div>
        <div>
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Family</p>
          <div className="flex gap-1">
            <Pill active={relationshipStatus === 'partnered'} onClick={() => setRelationshipStatus('partnered')}>
              Partnered
            </Pill>
            <Pill active={relationshipStatus === 'single'} onClick={() => setRelationshipStatus('single')}>
              Single
            </Pill>
          </div>
        </div>
      </div>

      {/* ── Task checkboxes: compact table rows ── */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-hover">
                <th className="text-left py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide w-8"></th>
                <th className="text-left py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Task</th>
                <th className="text-center py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide w-24">Hrs/Wk</th>
                <th className="text-right py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide hidden sm:table-cell">Annual</th>
              </tr>
            </thead>
            <tbody>
              {EMOTIONAL_LABOUR_ROLES.map((role, idx) => (
                <tr key={role.id} className="border-t border-border/50 hover:bg-surface-hover/50">
                  <td className="py-2 px-3">
                    <input
                      type="checkbox"
                      checked={selectedRoles[role.id] || false}
                      onChange={() => handleToggleRole(role.id)}
                      className="w-4 h-4 accent-accent rounded border-border cursor-pointer"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <div>
                        <p className="text-xs font-medium text-text-primary">{role.name}</p>
                        <p className="text-[10px] text-text-muted hidden sm:block">{role.desc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <input
                      type="number"
                      value={hours[role.id] || 0}
                      onChange={(e) => handleHourChange(role.id, e.target.value)}
                      min="0"
                      max="168"
                      className="w-14 py-1 px-1.5 border border-border rounded text-center font-mono text-xs bg-background focus:ring-1 focus:ring-accent focus:border-accent"
                    />
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-xs font-medium text-text-primary hidden sm:table-cell">
                    {formatCurrency((rates[role.rateKey] || rates.emotionalSupport) * (hours[role.id] || 0) * 52, country)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Calculate button ── */}
      <Button onClick={() => setShowResults(true)} className="w-full sm:w-auto mb-4">
        Calculate My Mental Load
      </Button>

      {/* ── Results (inline, not separate section) ── */}
      {showResults && (
        <>
          {/* Big headline + stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl border border-accent/20 p-5">
              <div className="font-heading text-4xl sm:text-5xl font-bold text-accent mb-1">
                {formatCurrency(totalEmotionalLabour, country)}
              </div>
              <p className="text-text-secondary text-sm mb-4">mental load value per year</p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <span className="text-text-primary">
                  <span className="font-mono font-bold text-lg">{breakdown.length}</span>
                  <span className="text-text-muted ml-1">tasks tracked</span>
                </span>
                <span className="text-text-primary">
                  <span className="font-mono font-bold text-lg">{breakdown.reduce((s, b) => s + b.hoursPerWeek, 0)}</span>
                  <span className="text-text-muted ml-1">hours/week</span>
                </span>
                <span className="text-text-primary">
                  <span className="font-mono font-bold text-lg">{((totalEmotionalLabour / rates.avgSalary) * 100).toFixed(0)}%</span>
                  <span className="text-text-muted ml-1">of avg salary</span>
                </span>
              </div>
            </div>

            {/* Pie chart */}
            <div className="flex flex-col items-center justify-center">
              {breakdown.length > 0 && (
                <>
                  <div className="w-32 h-32 rounded-full shadow-inner" style={{
                    background: `conic-gradient(${breakdown.reduce((stops, b, i) => {
                      const pct = (b.annualValue / totalEmotionalLabour) * 100;
                      const start = stops.length === 0 ? 0 : parseFloat(stops[stops.length - 1].split(' ')[1]);
                      return [...stops, `${COLORS[i % COLORS.length]} ${start}% ${start + pct}%`];
                    }, []).join(',')})`
                  }} />
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-3 text-[10px]">
                    {breakdown.slice(0, 6).map((b, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="text-text-muted truncate">{b.name}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Breakdown table */}
          {breakdown.length > 0 && (
            <div className="bg-surface rounded-xl border border-border overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-surface-hover">
                      <th className="text-left py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Task</th>
                      <th className="text-center py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Hrs/Wk</th>
                      <th className="text-right py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide hidden sm:table-cell">Rate</th>
                      <th className="text-right py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Annual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakdown.map((item, idx) => (
                      <tr key={item.id} className="border-t border-border/50 hover:bg-surface-hover/50">
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                            <span className="text-text-primary font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-2 px-3 text-center font-mono text-xs text-text-primary">{item.hoursPerWeek}</td>
                        <td className="py-2 px-3 text-right font-mono text-xs text-text-muted hidden sm:table-cell">
                          {formatCurrency(item.hourlyRate, country)}/hr
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-xs font-medium text-text-primary">
                          {formatCurrency(item.annualValue, country)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-accent bg-accent/5">
                      <td className="py-2.5 px-3 font-bold text-xs text-text-primary">TOTAL</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-xs text-accent">
                        {breakdown.reduce((s, b) => s + b.hoursPerWeek, 0)}
                      </td>
                      <td className="py-2.5 px-3 hidden sm:table-cell" />
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-xs text-accent">
                        {formatCurrency(totalEmotionalLabour, country)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Combined value */}
          <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 mb-4">
            <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">Full unpaid work value</p>
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Emotional labour (mental load)</span>
                <span className="font-mono font-medium">{formatCurrency(totalEmotionalLabour, country)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Physical unpaid work (estimated)</span>
                <span className="font-mono font-medium">{formatCurrency(estimatedPhysicalWork, country)}</span>
              </div>
            </div>
            <div className="border-t border-amber-200/50 pt-2 flex justify-between items-center">
              <span className="text-xs font-bold text-text-primary">Combined annual</span>
              <span className="font-mono font-bold text-text-primary">{formatCurrency(combinedValue, country)}</span>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              For context, average {countryData.name} salary is {formatCurrency(rates.avgSalary, country)}/year. Your unpaid work exceeds this.
            </p>
          </div>

          {/* Partner section - collapsed */}
          {relationshipStatus === 'partnered' && (
            <div className="bg-surface rounded-xl border border-border overflow-hidden mb-4">
              <button
                onClick={() => setShowPartnerSection(!showPartnerSection)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors"
              >
                <span>Partner comparison (for reflection)</span>
                <span className="text-text-muted text-xs">{showPartnerSection ? '−' : '+'}</span>
              </button>

              {showPartnerSection && (
                <div className="border-t border-border px-4 py-3 space-y-3">
                  <p className="text-xs text-text-secondary">
                    Estimate what percentage your partner handles (this is for reflection, not blame):
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={partnerPercentage}
                    onChange={(e) => setPartnerPercentage(parseInt(e.target.value))}
                    className="w-full accent-accent"
                  />
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="text-text-secondary mb-1">You:</p>
                      <BalanceBar percentage={100 - partnerPercentage} />
                    </div>
                    <div>
                      <p className="text-text-secondary mb-1">Partner:</p>
                      <BalanceBar percentage={partnerPercentage} />
                    </div>
                  </div>
                  {partnerPercentage < 40 && (
                    <p className="text-xs text-text-muted italic pt-1 border-t border-border">
                      Research shows one partner typically manages more of the mental load, even in "equal" households.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Share */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
              <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">Share your mental load</p>
              <p className="text-xs text-text-secondary mb-3">
                My invisible mental load is worth <span className="font-bold text-accent">{formatCurrency(totalEmotionalLabour, country)}/year</span>.
              </p>
              <Button variant="primary" size="sm" className="w-full" onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy to Share'}
              </Button>
            </div>

            <div className="bg-surface border border-border rounded-xl p-4">
              <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">Related</p>
              <a href="/stay-at-home-parent-calculator" className="text-xs text-accent hover:text-accent-hover font-medium">
                See full SAHP breakdown
              </a>
              <p className="text-[10px] text-text-muted mt-2">Including all physical childcare tasks</p>
            </div>
          </div>

          {/* Reset */}
          <Button variant="secondary" onClick={() => setShowResults(false)} className="w-full">
            Adjust Calculation
          </Button>
        </>
      )}

      {/* Initial info */}
      {!showResults && (
        <div className="bg-surface rounded-xl border border-border p-4 text-text-secondary text-sm">
          <p className="mb-2">
            The "mental load" is the invisible work of thinking, planning, and worrying that keeps a household running - remembering appointments, managing relationships, deciding what's for dinner.
          </p>
          <p>
            This calculator values that work using professional equivalents. The result is about making visible work that's usually invisible, not generating guilt.
          </p>
        </div>
      )}
    </div>
  );
}
