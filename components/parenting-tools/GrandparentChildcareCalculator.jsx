'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { COUNTRIES, CHILDCARE_RATES, formatCurrency, detectUserCountry } from '@/data/unpaid-work-wages';

const AGE_BANDS = [
  { id: 'under2', label: 'Under 2', value: 'under2' },
  { id: '2-3', label: '2-3', value: '2-3' },
  { id: '3-5', label: '3-5', value: '3-5' },
  { id: '5-11', label: '5-11', value: '5-11' },
  { id: '11plus', label: '11+', value: '11plus' },
];

const CARE_TYPES = [
  { id: 'fullDays', label: 'Full days', short: 'Full days' },
  { id: 'schoolPickup', label: 'School pickup', short: 'Pickup' },
  { id: 'afterSchool', label: 'After school', short: 'After school' },
  { id: 'holidayClub', label: 'Holiday cover', short: 'Holiday' },
  { id: 'overnights', label: 'Overnights', short: 'Overnights' },
];

function getMarketRate(country, ageGroup, careType) {
  const rates = CHILDCARE_RATES[country];
  if (!rates) return 0;
  const careKeyMap = {
    'fullDays': { 'under2': 'nurseryUnder2', '2-3': 'nursery2to3', '3-5': 'nursery3to5', '5-11': 'childminder', '11plus': 'childminder' },
    'schoolPickup': 'childminder',
    'afterSchool': 'afterSchool',
    'holidayClub': 'holidayClub',
    'overnights': 'nurseryUnder2',
  };
  const rateKey = careKeyMap[careType]?.[ageGroup] || careKeyMap[careType];
  return rates[rateKey] || 0;
}

export default function GrandparentChildcareCalculator() {
  const [country, setCountry] = useState(() => { if (typeof window !== 'undefined') return detectUserCountry(); return 'uk'; });
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [childrenByAge, setChildrenByAge] = useState({ under2: 0, '2-3': 0, '3-5': 0, '5-11': 0, '11plus': 0 });
  const [selectedCareTypes, setSelectedCareTypes] = useState({ fullDays: false, schoolPickup: false, afterSchool: false, holidayClub: false, overnights: false });
  const [yearsOfCare, setYearsOfCare] = useState(5);

  const countryData = COUNTRIES.find(c => c.id === country);
  const totalChildren = Object.values(childrenByAge).reduce((a, b) => a + b, 0);
  const hasCareTypes = Object.values(selectedCareTypes).some(v => v);

  const calculations = useMemo(() => {
    if (totalChildren === 0 || !hasCareTypes || hoursPerWeek === 0) return { breakdown: [], annualTotal: 0, totalOverYears: 0 };
    const breakdown = [];
    let weeklyTotal = 0;
    const activeCareTypes = Object.entries(selectedCareTypes).filter(([, active]) => active).map(([type]) => type);
    const hoursPerCareType = hoursPerWeek / activeCareTypes.length;
    activeCareTypes.forEach(careType => {
      Object.entries(childrenByAge).forEach(([ageGroup, count]) => {
        if (count === 0) return;
        const hourlyRate = getMarketRate(country, ageGroup, careType);
        if (hourlyRate === 0) return;
        const weeklyCost = hoursPerCareType * hourlyRate * count;
        const annualCost = weeklyCost * 52;
        breakdown.push({ careType, ageGroup, count, hourlyRate, annualCost });
        weeklyTotal += weeklyCost;
      });
    });
    const annualTotal = weeklyTotal * 52;
    const totalOverYears = annualTotal * yearsOfCare;
    return { breakdown, annualTotal: Math.round(annualTotal * 100) / 100, totalOverYears: Math.round(totalOverYears * 100) / 100 };
  }, [country, childrenByAge, selectedCareTypes, hoursPerWeek, yearsOfCare]);

  const Pill = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${active ? 'bg-accent text-white' : 'border border-border hover:bg-surface-hover text-text-primary'}`}>
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      {/* ── Controls: compact inline ── */}
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div className="w-40">
          <Select value={country} onChange={(e) => setCountry(e.target.value)} options={COUNTRIES.map(c => ({ value: c.id, label: `${c.flag} ${c.name}` }))} />
        </div>
        <div>
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Children by age</p>
          <div className="flex gap-1">
            {AGE_BANDS.map(band => (
              <Pill key={band.id} active={childrenByAge[band.value] > 0} onClick={() => {}} children={`${childrenByAge[band.value] > 0 ? childrenByAge[band.value] : ''} ${band.label}`} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Care types</p>
          <div className="flex gap-1 flex-wrap">
            {CARE_TYPES.filter(ct => selectedCareTypes[ct.id]).map(ct => (
              <Pill key={ct.id} active={true} onClick={() => {}} children={ct.short} />
            ))}
            {!hasCareTypes && <Pill active={false} onClick={() => {}} children="None selected" />}
          </div>
        </div>
      </div>

      {/* ── Configure: compact grid ── */}
      <div className="bg-surface border border-border rounded-xl p-4 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          {AGE_BANDS.map(band => (
            <div key={band.id}>
              <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">{band.label} yrs</label>
              <input type="number" min="0" max="10" value={childrenByAge[band.value]} onChange={(e) => setChildrenByAge(prev => ({ ...prev, [band.value]: Math.max(0, parseInt(e.target.value) || 0) }))} className="w-full py-1.5 px-2 border border-border rounded text-center font-mono text-xs bg-background focus:ring-1 focus:ring-accent focus:border-accent" />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">Care types</p>
          <div className="flex flex-wrap gap-2">
            {CARE_TYPES.map(ct => (
              <button key={ct.id} onClick={() => setSelectedCareTypes(prev => ({ ...prev, [ct.id]: !prev[ct.id] }))} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCareTypes[ct.id] ? 'bg-accent text-white' : 'border border-border hover:bg-surface-hover text-text-primary'}`}>
                {ct.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Hours/week</p>
            <input type="range" min="0" max="50" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(parseInt(e.target.value))} className="w-full accent-accent" />
            <p className="text-[10px] text-text-muted mt-1">{hoursPerWeek}h/week</p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Years ahead</p>
            <input type="range" min="1" max="15" value={yearsOfCare} onChange={(e) => setYearsOfCare(parseInt(e.target.value))} className="w-full accent-accent" />
            <p className="text-[10px] text-text-muted mt-1">{yearsOfCare} years</p>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      {totalChildren > 0 && hasCareTypes ? (
        <>
          {/* Big headline + stats inline */}
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl border border-accent/20 p-5 mb-4">
            <div className="font-heading text-4xl sm:text-5xl font-bold text-accent mb-1">
              {formatCurrency(calculations.annualTotal, country)}
            </div>
            <p className="text-text-secondary text-sm mb-3">per year in childcare costs saved</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
              <span className="text-text-primary">
                <span className="font-mono font-bold text-lg">{Math.round(hoursPerWeek * 52)}</span>
                <span className="text-text-muted ml-1">hours/year</span>
              </span>
              <span className="text-text-primary">
                <span className="font-mono font-bold text-lg">{totalChildren}</span>
                <span className="text-text-muted ml-1">grandchildren</span>
              </span>
              <span className="text-text-primary">
                <span className="font-mono font-bold text-lg">{yearsOfCare}</span>
                <span className="text-text-muted ml-1">years of care</span>
              </span>
            </div>
          </div>

          {/* Breakdown table: compact */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-surface-hover">
                    <th className="text-left py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Care type</th>
                    <th className="text-left py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Age</th>
                    <th className="text-center py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Kids</th>
                    <th className="text-right py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Rate/h</th>
                    <th className="text-right py-2 px-3 text-[10px] text-text-muted uppercase tracking-wide">Annual</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.breakdown.map((item, idx) => (
                    <tr key={idx} className="border-t border-border/50 hover:bg-surface-hover/50">
                      <td className="py-2 px-3 text-text-primary">{CARE_TYPES.find(ct => ct.id === item.careType)?.short}</td>
                      <td className="py-2 px-3 text-text-secondary">{AGE_BANDS.find(ab => ab.value === item.ageGroup)?.label}</td>
                      <td className="py-2 px-3 text-center font-mono text-text-primary">{item.count}</td>
                      <td className="py-2 px-3 text-right font-mono text-xs text-text-muted">{formatCurrency(item.hourlyRate, country)}</td>
                      <td className="py-2 px-3 text-right font-mono text-xs font-medium text-text-primary">{formatCurrency(item.annualCost, country)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-accent bg-accent/5">
                    <td colSpan="4" className="py-2.5 px-3 font-bold text-xs text-text-primary">TOTAL</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-xs text-accent">{formatCurrency(calculations.annualTotal, country)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Multi-year total + appreciation: side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-xl p-4">
              <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">Over {yearsOfCare} years</p>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-accent">
                {formatCurrency(calculations.totalOverYears, country)}
              </div>
              <p className="text-xs text-text-secondary mt-2">That's a house deposit, a car, a dream holiday - or priceless peace of mind.</p>
            </div>

            <div className="bg-white border border-accent/20 rounded-xl p-4">
              <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">Your impact</p>
              <p className="text-xs text-text-secondary">You're not just saving money. You're building relationships, creating memories, and giving your grandchildren something priceless: time with people who love them unconditionally. You're incredible.</p>
            </div>
          </div>

          {/* Share */}
          <div className="bg-surface border border-border rounded-xl p-4">
            <p className="text-xs text-text-secondary mb-3">Tell other grandparents about your contribution</p>
            <Button variant="primary" size="sm" className="w-full" onClick={() => {
              const text = `I provide childcare worth ${formatCurrency(calculations.annualTotal, country)} per year to my grandchildren on MyKit.tools`;
              if (navigator.share) {
                navigator.share({ title: 'Grandparent Childcare Value', text });
              } else {
                navigator.clipboard.writeText(text);
              }
            }}>
              Share your worth
            </Button>
          </div>
        </>
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <p className="text-text-secondary text-sm">{totalChildren === 0 ? 'Add grandchildren to calculate' : 'Select a care type to calculate'}</p>
        </div>
      )}
    </div>
  );
}
