'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const formatCurrency = (value) => {
  if (value < 1) {
    return 'p' + (value * 100).toFixed(1);
  }
  return '£' + value.toFixed(2);
};

export default function DoubleGlazingPaybackCalculator() {
  const [numWindows, setNumWindows] = useState(10);
  const [avgWindowSize, setAvgWindowSize] = useState('medium');
  const [currentGlazing, setCurrentGlazing] = useState('single');
  const [propertyType, setPropertyType] = useState('semi');

  const windowSizes = [
    { value: 'small', label: 'Small (600 x 900mm)' },
    { value: 'medium', label: 'Medium (900 x 1200mm)' },
    { value: 'large', label: 'Large (1200 x 1500mm)' },
  ];

  const glazingTypes = [
    { value: 'single', label: 'Single Glazing' },
    { value: 'old-double', label: 'Old Double Glazing (pre-2000)' },
    { value: 'modern-double', label: 'Modern Double Glazing (2000+)' },
  ];

  const propertyTypes = [
    { value: 'detached', label: 'Detached House' },
    { value: 'semi', label: 'Semi-Detached House' },
    { value: 'terrace', label: 'Terraced House' },
    { value: 'flat', label: 'Flat/Apartment' },
  ];

  const calculations = useMemo(() => {
    // Window cost per unit by size
    const costBySize = {
      small: { old: 250, modern: 300 },
      medium: { old: 350, modern: 450 },
      large: { old: 500, modern: 650 },
    };

    const costPerWindow = costBySize[avgWindowSize]['modern'];
    const installationCost = numWindows * costPerWindow;

    // Energy savings per window per year
    const savingsBySize = {
      small: { single: 35, old: 15 },
      medium: { single: 50, old: 20 },
      large: { single: 75, old: 30 },
    };

    const savingPerWindow = savingsBySize[avgWindowSize][currentGlazing];
    const totalAnnualSaving = numWindows * savingPerWindow;

    // Payback period
    const paybackPeriod = installationCost / totalAnnualSaving;

    // 25-year projection
    const years = Array.from({ length: 26 }, (_, i) => i);
    const projection = years.map(year => ({
      year,
      cumulative: totalAnnualSaving * year - (year > 0 ? installationCost : 0),
    }));

    // Comfort improvements
    const comfortRating = currentGlazing === 'single' ? 4 : 2;
    const draftExcluded = currentGlazing === 'single' ? 90 : currentGlazing === 'old-double' ? 60 : 20;
    const noiseReduction = currentGlazing === 'single' ? 20 : 10;
    const condensation = currentGlazing === 'single' ? 'Very common' : currentGlazing === 'old-double' ? 'Occasional' : 'Rare';

    // Additional benefits
    const securityImprovement = currentGlazing === 'single' ? 8 : 3;
    const uvBlockage = currentGlazing === 'single' ? 0 : 10;

    // Disruption and timing
    const installationTime = Math.ceil(numWindows / 4); // ~1 window per day per installer

    return {
      costPerWindow,
      installationCost,
      savingPerWindow,
      totalAnnualSaving,
      paybackPeriod,
      projection,
      comfortRating,
      draftExcluded,
      noiseReduction,
      condensation,
      securityImprovement,
      uvBlockage,
      installationTime,
    };
  }, [numWindows, avgWindowSize, currentGlazing, propertyType]);

  const maxCumulative = Math.max(
    ...calculations.projection.map(p => Math.abs(p.cumulative))
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Configuration */}
      <div className="bg-surface rounded-[12px] border border-border p-6 space-y-4">
        <h2 className="text-2xl font-bold font-heading text-text-primary">Double Glazing Payback Calculator</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Number of Windows"
            type="number"
            value={numWindows}
            onChange={(e) => setNumWindows(parseInt(e.target.value) || 1)}
            min="1"
            step="1"
            helper="Total windows in your property"
          />
          <Select
            label="Average Window Size"
            options={windowSizes}
            value={avgWindowSize}
            onChange={(e) => setAvgWindowSize(e.target.value)}
          />
          <Select
            label="Current Glazing Type"
            options={glazingTypes}
            value={currentGlazing}
            onChange={(e) => setCurrentGlazing(e.target.value)}
          />
          <Select
            label="Property Type"
            options={propertyTypes}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            helper="For context only"
          />
        </div>
      </div>

      {/* Key Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase font-semibold mb-1">Total Installation</p>
          <p className="text-2xl font-bold font-mono text-text-primary">
            {formatCurrency(calculations.installationCost)}
          </p>
          <p className="text-xs text-text-secondary mt-1">{numWindows} windows</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-[12px] p-4">
          <p className="text-xs text-green-700 uppercase font-semibold mb-1">Annual Savings</p>
          <p className="text-2xl font-bold font-mono text-green-600">
            {formatCurrency(calculations.totalAnnualSaving)}
          </p>
          <p className="text-xs text-green-600 mt-1">energy savings</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-4">
          <p className="text-xs text-blue-700 uppercase font-semibold mb-1">Payback Period</p>
          <p className="text-2xl font-bold font-mono text-blue-600">
            {calculations.paybackPeriod.toFixed(1)}
          </p>
          <p className="text-xs text-blue-600 mt-1">years</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-4">
          <p className="text-xs text-amber-700 uppercase font-semibold mb-1">Installation Time</p>
          <p className="text-2xl font-bold font-mono text-amber-600">
            {calculations.installationTime}
          </p>
          <p className="text-xs text-amber-600 mt-1">days (approx)</p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Cost Breakdown</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Per Window</h4>
            <div className="space-y-2">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Window + Installation</span>
                <span className="font-mono font-bold text-text-primary">
                  {formatCurrency(calculations.costPerWindow)}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Annual Saving per Window</span>
                <span className="font-mono font-bold text-green-600">
                  {formatCurrency(calculations.savingPerWindow)}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-text-primary font-semibold">Payback per Window</span>
                <span className="font-mono font-bold text-text-primary">
                  {(calculations.costPerWindow / calculations.savingPerWindow).toFixed(1)} years
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-3">Total ({numWindows} windows)</h4>
            <div className="space-y-2">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Total Installation Cost</span>
                <span className="font-mono font-bold text-text-primary">
                  {formatCurrency(calculations.installationCost)}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-text-secondary">Total Annual Saving</span>
                <span className="font-mono font-bold text-green-600">
                  {formatCurrency(calculations.totalAnnualSaving)}
                </span>
              </div>
              <div className="flex justify-between pt-2 bg-blue-50 px-3 py-2 rounded-[8px]">
                <span className="text-text-primary font-semibold">Payback Period</span>
                <span className="font-mono font-bold text-blue-600">
                  {calculations.paybackPeriod.toFixed(1)} years
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 25-Year Projection */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-6">25-Year Return on Investment</h3>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {calculations.projection.map((item, idx) => {
            if (idx % 2 !== 0) return null; // Show every other year to keep it compact

            const isPositive = item.cumulative > 0;
            const width = maxCumulative > 0 ? (Math.abs(item.cumulative) / maxCumulative) * 100 : 0;

            return (
              <div key={item.year}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-text-secondary">Year {item.year}</span>
                  <span className="text-xs font-mono text-text-primary">
                    {isPositive ? '+' : ''}{formatCurrency(item.cumulative)}
                  </span>
                </div>
                <div className="w-full bg-surface rounded-[4px] overflow-hidden h-3">
                  <div
                    className={isPositive ? 'bg-green-500' : 'bg-red-500'}
                    style={{
                      width: `${width}%`,
                      marginLeft: isPositive ? '0' : 'auto',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-[8px]">
          <p className="text-sm text-green-800 font-semibold">
            After 25 years, your investment will have saved {formatCurrency(calculations.totalAnnualSaving * 25)}
          </p>
        </div>
      </div>

      {/* Comfort & Non-Financial Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Comfort Improvements</h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-text-secondary">Draught Exclusion</span>
                <span className="text-sm font-bold text-text-primary">{calculations.draftExcluded}% better</span>
              </div>
              <div className="w-full bg-surface rounded-[4px] h-2 overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: `${calculations.draftExcluded}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-text-secondary">Noise Reduction</span>
                <span className="text-sm font-bold text-text-primary">{calculations.noiseReduction} dB</span>
              </div>
              <div className="w-full bg-surface rounded-[4px] h-2 overflow-hidden">
                <div className="bg-amber-500 h-full" style={{ width: `${Math.min(calculations.noiseReduction, 100)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-text-secondary">Condensation</span>
                <span className="text-sm font-bold text-text-primary">{calculations.condensation}</span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Double glazing prevents indoor moisture from condensing on cold glass
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-text-secondary">Security Rating</span>
                <span className="text-sm font-bold text-text-primary">+{calculations.securityImprovement}</span>
              </div>
              <p className="text-xs text-text-secondary">Modern locks and toughened glass improve security</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-text-secondary">UV Protection</span>
                <span className="text-sm font-bold text-text-primary">{calculations.uvBlockage}%</span>
              </div>
              <p className="text-xs text-text-secondary">Reduces furniture and carpet fading</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-green-900 mb-4">Non-Financial Benefits</h3>

          <ul className="space-y-2 text-sm text-green-800">
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Improved comfort:</strong> No more cold windows or draughts in winter</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Reduced noise:</strong> Quieter inside, blocking traffic and street noise</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>No condensation:</strong> Cleaner windows, healthier air, prevents mould</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Better security:</strong> Modern locks and toughened glass harder to break</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Increased home value:</strong> New windows add 5-10% to property value</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Better appearance:</strong> Modern frames available in many styles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Reduced UV damage:</strong> Furniture and carpets fade less</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">✓</span>
              <span><strong>Lower maintenance:</strong> Modern frames need less painting/varnishing</span>
            </li>
          </ul>
        </div>
      </div>

      {/* What to Look For */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">What to Look For in New Windows</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-bold text-text-primary mb-2">Glazing Specifications</h4>
            <ul className="space-y-1 text-text-secondary">
              <li>U-value: aim for 1.4 W/m²K or better</li>
              <li>Solar factor: 0.3-0.4 for south-facing</li>
              <li>Acoustic rating: Rw 30dB+ if near roads</li>
              <li>Low-emissivity (Low-E) coating essential</li>
              <li>Argon gas fill between panes</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-2">Frame Materials</h4>
            <ul className="space-y-1 text-text-secondary">
              <li>uPVC: Most affordable, low maintenance</li>
              <li>Aluminium: Modern look, good thermal break</li>
              <li>Timber: Best appearance, needs maintenance</li>
              <li>Composite: Best of both, premium price</li>
              <li>All should have multi-chamber design</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-2">Installation Quality</h4>
            <ul className="space-y-1 text-text-secondary">
              <li>FENSA certified installers only</li>
              <li>Proper frames sealed with expanding foam</li>
              <li>Quality sills and damp-proof membranes</li>
              <li>All vents and trickle ventilation functional</li>
              <li>10-year warranty minimum</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-2">Optional Extras</h4>
            <ul className="space-y-1 text-text-secondary">
              <li>Self-cleaning glass (hydrophobic coating)</li>
              <li>Noise-reducing glass if near roads</li>
              <li>Tinted or privacy glass options</li>
              <li>Decorative glazing bars (authenticity)</li>
              <li>Opening restrictors (safety, especially kids)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-amber-900 mb-4">💡 Tips for Best Value</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>Get at least 3 quotes before deciding</li>
          <li>Phase installation (do worst windows first)</li>
          <li>Ask about multi-window discounts (bulk savings)</li>
          <li>Consider DIY removal if competent (saves £50-100 per window)</li>
          <li>Time installation during off-season (summer is more expensive)</li>
          <li>Check for Energy Company Obligation (ECO) grants</li>
          <li>Ensure FENSA certification for Building Regulations compliance</li>
          <li>Get everything in writing: quote, timescale, warranty, guarantee</li>
          <li>Pay by credit card for buyer protection</li>
          <li>Add energy-saving controls (smart thermostats) for max benefit</li>
        </ul>
      </div>
    </div>
  );
}
