'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { COUNTRIES, CHILD_COST_DATA, formatCurrency, detectUserCountry } from '@/data/unpaid-work-wages';

const CHILDCARE_OPTIONS = [
  { value: 'nursery', label: 'Nursery' },
  { value: 'childminder', label: 'Childminder' },
  { value: 'grandparents', label: 'Grandparents (unpaid)' },
  { value: 'stay-at-home', label: 'Stay-at-home parent' },
];

const EDUCATION_OPTIONS = [
  { value: 'state', label: 'State school' },
  { value: 'private', label: 'Private school' },
];

const ACTIVITY_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'basic', label: 'Basic' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'intensive', label: 'Intensive' },
];

export default function CostOfRaisingChild() {
  const [country, setCountry] = useState(() => { if (typeof window !== 'undefined') return detectUserCountry(); return 'uk'; });
  const [childName, setChildName] = useState('');
  const [childcareApproach, setChildcareApproach] = useState('nursery');
  const [education, setEducation] = useState('state');
  const [activityLevel, setActivityLevel] = useState('moderate');

  const getCountryCostData = () => {
    const rawData = CHILD_COST_DATA[country];
    if (!rawData) return null;
    if (typeof rawData === 'number') {
      const multiplier = rawData;
      const ukData = CHILD_COST_DATA.uk;
      const scaledData = {};
      Object.entries(ukData).forEach(([ageBand, costs]) => {
        scaledData[ageBand] = {};
        Object.entries(costs).forEach(([category, cost]) => {
          scaledData[ageBand][category] = Math.round(cost * multiplier);
        });
      });
      return scaledData;
    }
    return rawData;
  };

  const calculateCosts = useMemo(() => {
    const countryData = getCountryCostData();
    if (!countryData) return null;

    const ageBands = ['0-2', '3-4', '5-11', '11-16', '16-18'];
    const ageBandYears = { '0-2': 3, '3-4': 2, '5-11': 7, '11-16': 5, '16-18': 2 };
    const breakdown = {};
    let totalCost = 0;

    ageBands.forEach((band) => {
      const yearCosts = { ...countryData[band] };

      if (band === '0-2' || band === '3-4') {
        if (childcareApproach === 'grandparents' || childcareApproach === 'stay-at-home') {
          yearCosts.childcare = 0;
        }
      } else {
        delete yearCosts.childcare;
      }

      if ((band === '5-11' || band === '11-16') && education === 'private' && yearCosts.school) {
        yearCosts.school = Math.round(yearCosts.school * 1.3);
      }

      if (band === '16-18' && education === 'private' && yearCosts.education) {
        yearCosts.education = Math.round(yearCosts.education * 1.3);
      }

      const activityMultipliers = { none: 0, basic: 0.5, moderate: 1, intensive: 1.5 };
      const activityMultiplier = activityMultipliers[activityLevel];
      if (yearCosts.activities) {
        yearCosts.activities = Math.round(yearCosts.activities * activityMultiplier);
      }

      const annualCost = Object.values(yearCosts).reduce((sum, cost) => sum + cost, 0);
      const totalYears = ageBandYears[band];
      const bandTotal = annualCost * totalYears;
      breakdown[band] = { annualCost, totalYears, bandTotal, categories: yearCosts };
      totalCost += bandTotal;
    });

    return { breakdown, totalCost };
  }, [country, childcareApproach, education, activityLevel]);

  if (!calculateCosts) {
    return (
      <div className="rounded-lg border border-border bg-surface">
        <p className="text-text-secondary">Country data not available.</p>
      </div>
    );
  }

  const { breakdown, totalCost } = calculateCosts;
  const countryData = COUNTRIES.find((c) => c.id === country);
  const displayName = childName.trim() || 'your child';
  const displayCurrency = formatCurrency(totalCost, country);

  const ageBandTotals = Object.entries(breakdown).map(([band, data]) => ({
    band,
    total: data.bandTotal,
  }));
  const maxBandTotal = Math.max(...ageBandTotals.map((a) => a.total));

  const categoryTotals = {};
  Object.values(breakdown).forEach((bandData) => {
    Object.entries(bandData.categories).forEach(([category, cost]) => {
      if (!categoryTotals[category]) categoryTotals[category] = 0;
      categoryTotals[category] += cost * bandData.totalYears;
    });
  });

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const categoryColors = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed', '#ec4899', '#06b6d4', '#f59e0b'];
  const categoryPie = sortedCategories.map(([category, cost], i) => ({
    category,
    cost,
    percent: (cost / totalCost) * 100,
    color: categoryColors[i % categoryColors.length],
  }));

  let pieConic = 'conic-gradient(';
  let cumulativePercent = 0;
  categoryPie.forEach((item, i) => {
    pieConic += `${item.color} ${cumulativePercent}% ${cumulativePercent + item.percent}%`;
    if (i < categoryPie.length - 1) pieConic += ',';
    cumulativePercent += item.percent;
  });
  pieConic += ')';

  const mostExpensiveBand = ageBandTotals.reduce((prev, current) =>
    current.total > prev.total ? current : prev
  );

  const Pill = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${active ? 'bg-accent text-white' : 'border border-border hover:bg-surface-hover text-text-primary'}`}>
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-4">
      {/* Controls: compact inline */}
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
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Childcare</p>
          <div className="flex gap-1 flex-wrap">
            {CHILDCARE_OPTIONS.map(opt => (
              <Pill key={opt.value} active={childcareApproach === opt.value} onClick={() => setChildcareApproach(opt.value)}>
                {opt.label.split(' ')[0]}
              </Pill>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">School</p>
          <div className="flex gap-1">
            {EDUCATION_OPTIONS.map(opt => (
              <Pill key={opt.value} active={education === opt.value} onClick={() => setEducation(opt.value)}>
                {opt.value === 'state' ? 'State' : 'Private'}
              </Pill>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Activities</p>
          <div className="flex gap-1">
            {ACTIVITY_OPTIONS.map(opt => (
              <Pill key={opt.value} active={activityLevel === opt.value} onClick={() => setActivityLevel(opt.value)}>
                {opt.label}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      {/* Child name input - compact */}
      <div className="mb-4 w-full sm:w-52">
        <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Child's name (optional)</p>
        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder="e.g. Emma"
          maxLength="20"
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent bg-background text-text-primary"
        />
      </div>

      {/* Big headline + age bands compact side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Headline */}
        <div className="md:col-span-2 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl border border-accent/20 p-5">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">Total cost to age 18</p>
          <div className="font-heading text-4xl sm:text-5xl font-bold text-accent mb-2">
            {displayCurrency}
          </div>
          <p className="text-text-secondary text-sm mb-4">to raise {displayName}</p>

          {/* Age band bars compact inline */}
          <div className="space-y-2">
            {ageBandTotals.map((item) => {
              const percentage = (item.total / maxBandTotal) * 100;
              return (
                <div key={item.band} className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-text-primary w-12">{item.band}</span>
                  <div className="h-3 flex-1 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-xs font-mono text-text-muted w-20 text-right">{formatCurrency(item.total, country)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pie chart small */}
        <div className="flex flex-col items-center justify-center bg-surface rounded-xl border border-border p-4">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">Breakdown</p>
          <div className="w-20 h-20 rounded-full" style={{ background: pieConic }} />
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-3">
            {categoryPie.slice(0, 4).map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[9px] text-text-muted truncate">{item.category.substring(0, 6)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category legend - compact horizontal */}
      <div className="bg-surface rounded-xl border border-border p-4 mb-4 overflow-x-auto">
        <p className="text-xs font-medium text-text-primary mb-3">Spending by category</p>
        <div className="flex gap-4 min-w-max">
          {categoryPie.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <div>
                <div className="text-xs font-mono font-semibold text-text-primary">{formatCurrency(item.cost, country)}</div>
                <div className="text-[10px] text-text-muted capitalize">{item.category === 'school' ? 'School' : item.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Age band detail table - compact text-xs */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-hover">
                <th className="text-left py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Ages</th>
                <th className="text-right py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Annual</th>
                <th className="text-right py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Years</th>
                <th className="text-right py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Total</th>
              </tr>
            </thead>
            <tbody>
              {ageBandTotals.map((item) => (
                <tr key={item.band} className="border-t border-border/50 hover:bg-surface-hover/50">
                  <td className="py-2 px-3 font-mono font-bold text-text-primary">{item.band}</td>
                  <td className="py-2 px-3 text-right font-mono text-text-secondary">{formatCurrency(breakdown[item.band].annualCost, country)}</td>
                  <td className="py-2 px-3 text-right text-text-muted">{breakdown[item.band].totalYears}</td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-text-primary">{formatCurrency(item.total, country)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key insights compact */}
      <div className="bg-surface rounded-xl border border-border p-4 mb-4">
        <p className="text-xs font-medium text-text-primary mb-2">Key insight</p>
        <p className="text-xs text-text-secondary">
          Ages <span className="font-mono font-bold">{mostExpensiveBand.band}</span> cost most at <span className="font-mono">{formatCurrency(breakdown[mostExpensiveBand.band].annualCost, country)}/year</span>.
          {childcareApproach === 'stay-at-home' && ' This excludes parent opportunity cost.'}
        </p>
      </div>

      {/* Reset button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          setCountry('uk');
          setChildName('');
          setChildcareApproach('nursery');
          setEducation('state');
          setActivityLevel('moderate');
        }}
      >
        Reset
      </Button>
    </div>
  );
}
