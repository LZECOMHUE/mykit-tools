'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { COUNTRIES, ROLE_RATES, BF_DATA, formatCurrency, detectUserCountry } from '@/data/unpaid-work-wages';

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

export default function BreastfeedingCalculator() {
  const [countryId, setCountryId] = useState(() => { if (typeof window !== 'undefined') return detectUserCountry(); return 'uk'; });
  const [ageMonths, setAgeMonths] = useState(6);
  const [feedingPattern, setFeedingPattern] = useState('exclusive');
  const [formulaPercentage, setFormulaPercentage] = useState(50);
  const [copied, setCopied] = useState(false);

  const getAgeBracket = (months) => {
    if (months < 3) return '0-3';
    if (months < 6) return '3-6';
    if (months < 12) return '6-12';
    return '12-24';
  };

  const results = useMemo(() => {
    const bracket = getAgeBracket(ageMonths);
    const country = COUNTRIES.find(c => c.id === countryId);
    const rates = ROLE_RATES[countryId];

    if (!country || !rates) return null;

    const feedsPerDay = BF_DATA.feedsPerDay[bracket];
    const minsPerFeed = BF_DATA.minsPerFeed[bracket];
    const nightFeeds = BF_DATA.nightFeeds[bracket];

    let totalMinsPerDay = feedsPerDay * minsPerFeed;
    let nightFeeds_mins = nightFeeds * minsPerFeed;
    let bfMinsPerDay = totalMinsPerDay;
    let savingsMultiplier = 1;

    if (feedingPattern === 'combination') {
      const bfRatio = (100 - formulaPercentage) / 100;
      bfMinsPerDay = totalMinsPerDay * bfRatio;
      savingsMultiplier = bfRatio;
    } else if (feedingPattern === 'express') {
      bfMinsPerDay = totalMinsPerDay * 1.2;
    }

    const hoursPerDay = bfMinsPerDay / 60;
    const nightHoursPerDay = nightFeeds_mins / 60;
    const daysOfBF = ageMonths * 30;
    const totalHours = hoursPerDay * daysOfBF;

    const hourlyRate = rates.avgFemaleWage;
    const timeValue = totalHours * hourlyRate;

    const formulaCostWeekly = BF_DATA.formulaCostWeekly[countryId];
    const weeksOfBF = daysOfBF / 7;
    const formulaValueSaved = formulaCostWeekly * weeksOfBF * savingsMultiplier;
    const equipmentSaved = BF_DATA.equipmentSaved[countryId] * savingsMultiplier;
    const totalValue = timeValue + formulaValueSaved + equipmentSaved;

    let mlProduced = 0, bathtubs = 0;
    if (feedingPattern === 'exclusive') {
      mlProduced = BF_DATA.mlPerDay * daysOfBF;
      bathtubs = Math.round(mlProduced / 150000);
    }

    const feedCount = Math.round(feedsPerDay * daysOfBF);

    return {
      country, rates, bracket, feedsPerDay, minsPerFeed, nightFeeds, hoursPerDay, nightHoursPerDay,
      totalHours, daysOfBF, timeValue, formulaCostWeekly, formulaValueSaved, equipmentSaved,
      totalValue, mlProduced, bathtubs, feedCount, hourlyRate,
    };
  }, [countryId, ageMonths, feedingPattern, formulaPercentage]);

  if (!results) return null;

  const { country } = results;
  const feedingLabel = feedingPattern === 'exclusive' ? 'exclusive' : feedingPattern === 'combination' ? `${100 - formulaPercentage}% breast` : 'expressing';

  const handleCopy = () => {
    const text = `I've spent ${results.totalHours.toFixed(0)} hours breastfeeding for ${results.ageMonths} months - my work is worth ${formatCurrency(results.totalValue, countryId)}. Fed is best. Calculate yours: mykit.tools/breastfeeding-value-calculator`;
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
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            options={COUNTRIES.map(c => ({ value: c.id, label: `${c.flag} ${c.name}` }))}
          />
        </div>
        <div>
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Age</p>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="24"
              value={ageMonths}
              onChange={(e) => setAgeMonths(parseInt(e.target.value))}
              className="w-32 h-1.5 bg-border rounded-full accent-accent cursor-pointer"
            />
            <span className="font-mono text-xs font-medium text-text-primary w-12">{ageMonths}m</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Pattern</p>
          <div className="flex gap-1">
            <Pill active={feedingPattern === 'exclusive'} onClick={() => setFeedingPattern('exclusive')}>
              Exclusive
            </Pill>
            <Pill active={feedingPattern === 'combination'} onClick={() => setFeedingPattern('combination')}>
              Mix
            </Pill>
            <Pill active={feedingPattern === 'express'} onClick={() => setFeedingPattern('express')}>
              Express
            </Pill>
          </div>
        </div>
      </div>

      {feedingPattern === 'combination' && (
        <div className="mb-4 p-3 bg-surface rounded-lg flex items-center gap-3">
          <label className="text-xs text-text-secondary flex-shrink-0">Formula %:</label>
          <input
            type="range"
            min="1"
            max="99"
            value={formulaPercentage}
            onChange={(e) => setFormulaPercentage(parseInt(e.target.value))}
            className="flex-1 h-1.5 bg-border rounded-full accent-accent cursor-pointer"
          />
          <span className="font-mono text-xs font-medium text-text-primary w-10 text-right">{formulaPercentage}%</span>
        </div>
      )}

      {/* ── Big result + stats inline ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2 bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl border border-accent/20 p-5">
          <div className="font-heading text-4xl sm:text-5xl font-bold text-accent mb-1">
            {formatCurrency(results.totalValue, countryId)}
          </div>
          <p className="text-text-secondary text-sm mb-4">over {ageMonths} months of {feedingLabel} breastfeeding</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="text-text-primary">
              <span className="font-mono font-bold text-lg">{results.feedCount.toLocaleString()}</span>
              <span className="text-text-muted ml-1">feeds</span>
            </span>
            <span className="text-text-primary">
              <span className="font-mono font-bold text-lg">{results.totalHours.toFixed(0)}</span>
              <span className="text-text-muted ml-1">hours</span>
            </span>
            <span className="text-text-primary">
              <span className="font-mono font-bold text-lg">{(results.totalHours / 24).toFixed(1)}</span>
              <span className="text-text-muted ml-1">days of time</span>
            </span>
          </div>
        </div>

        {/* Fun stats as compact badges */}
        <div className="space-y-2">
          <div className="bg-surface rounded-lg p-3 text-center">
            <p className="text-sm font-mono font-bold text-accent">{(results.hoursPerDay * 60).toFixed(0)}</p>
            <p className="text-[10px] text-text-secondary">min/day</p>
          </div>
          {feedingPattern === 'exclusive' && (
            <>
              <div className="bg-surface rounded-lg p-3 text-center">
                <p className="text-sm font-mono font-bold text-accent">{(results.mlProduced / 1000).toFixed(0)}L</p>
                <p className="text-[10px] text-text-secondary">milk made</p>
              </div>
              <div className="bg-surface rounded-lg p-3 text-center">
                <p className="text-sm font-mono font-bold text-accent">{results.bathtubs}</p>
                <p className="text-[10px] text-text-secondary">bathtubs</p>
              </div>
            </>
          )}
          {feedingPattern !== 'exclusive' && (
            <div className="bg-surface rounded-lg p-3 text-center">
              <p className="text-sm font-mono font-bold text-accent">{results.feedsPerDay}</p>
              <p className="text-[10px] text-text-secondary">feeds/day</p>
            </div>
          )}
          <div className="bg-surface rounded-lg p-3 text-center">
            <p className="text-sm font-mono font-bold text-accent">{results.nightFeeds}</p>
            <p className="text-[10px] text-text-secondary">night feeds</p>
          </div>
        </div>
      </div>

      {/* ── Breakdown: compact grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-surface rounded-lg p-3 border border-border/50">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Your Time</p>
          <p className="font-mono text-xs text-text-secondary mb-0.5">{results.totalHours.toFixed(0)} hrs @ {country.currency}{results.hourlyRate.toFixed(2)}/hr</p>
          <p className="font-mono font-bold text-sm text-accent">{formatCurrency(results.timeValue, countryId)}</p>
        </div>

        <div className="bg-surface rounded-lg p-3 border border-border/50">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Formula Saved</p>
          <p className="font-mono text-xs text-text-secondary mb-0.5">{country.currency}{results.formulaCostWeekly.toFixed(2)}/week</p>
          <p className="font-mono font-bold text-sm text-accent">{formatCurrency(results.formulaValueSaved, countryId)}</p>
        </div>

        <div className="bg-surface rounded-lg p-3 border border-border/50">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Equipment</p>
          <p className="font-mono text-xs text-text-secondary mb-0.5">Bottles, warmer, etc.</p>
          <p className="font-mono font-bold text-sm text-accent">{formatCurrency(results.equipmentSaved, countryId)}</p>
        </div>
      </div>

      {/* ── Total breakdown ── */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-text-primary">TOTAL VALUE</span>
          <span className="font-heading font-bold text-2xl text-accent">{formatCurrency(results.totalValue, countryId)}</span>
        </div>
      </div>

      {/* ── Share + reset: side by side ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2">Share</p>
          <p className="text-xs text-text-secondary mb-3">
            My breastfeeding work is worth <span className="font-bold text-accent">{formatCurrency(results.totalValue, countryId)}</span>
          </p>
          <Button variant="primary" size="sm" className="w-full" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy to Share'}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => {
              setCountryId('uk');
              setAgeMonths(6);
              setFeedingPattern('exclusive');
              setFormulaPercentage(50);
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* ── Fed is Best disclaimer + info ── */}
      <div className="space-y-3">
        <div className="bg-amber-50 border border-amber-200/50 rounded-lg p-4">
          <p className="font-heading font-bold text-text-primary mb-2">Fed is Best</p>
          <p className="text-xs text-text-secondary leading-relaxed">
            This celebrates the unpaid labour of breastfeeding. But fed IS best - breast, bottle, combination, or any method that nourishes your baby. There's no shame in any feeding choice. All feeding parents are doing an incredible job.
          </p>
        </div>

        <div className="bg-surface rounded-lg border border-border p-3 text-[10px] text-text-secondary space-y-1">
          <p className="font-semibold text-text-primary">How it's calculated</p>
          <ul className="space-y-0.5 list-disc list-inside">
            <li>Time value = average female wage in your country</li>
            <li>Formula costs = typical weekly infant formula expenses</li>
            <li>Equipment = typical one-time supply costs</li>
            <li>Milk production = exclusive feeding only</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
