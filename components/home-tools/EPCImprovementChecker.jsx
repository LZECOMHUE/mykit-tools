'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const formatCurrency = (value) => {
  return '£' + value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

export default function EPCImprovementChecker() {
  const [currentRating, setCurrentRating] = useState('E');
  const [propertyType, setPropertyType] = useState('semi');
  const [ageBand, setAgeBand] = useState('1975-1995');
  const [cavityWallInsulated, setCavityWallInsulated] = useState(false);
  const [loftInsulationDepth, setLoftInsulationDepth] = useState('0');
  const [glazingType, setGlazingType] = useState('single');
  const [boilerAge, setBoilerAge] = useState('15');
  const [heatingControls, setHeatingControls] = useState('basic');

  const ratings = [
    { value: 'A', label: 'A (92+) - Most Efficient' },
    { value: 'B', label: 'B (81-91)' },
    { value: 'C', label: 'C (69-80)' },
    { value: 'D', label: 'D (55-68)' },
    { value: 'E', label: 'E (39-54)' },
    { value: 'F', label: 'F (21-38)' },
    { value: 'G', label: 'G (1-20) - Least Efficient' },
  ];

  const propertyTypes = [
    { value: 'detached', label: 'Detached House' },
    { value: 'semi', label: 'Semi-Detached House' },
    { value: 'terrace', label: 'Terraced House' },
    { value: 'flat', label: 'Flat/Apartment' },
  ];

  const ageBands = [
    { value: 'pre-1930', label: 'Pre-1930 (Victorian/Edwardian)' },
    { value: '1930-1975', label: '1930-1975 (Pre-Regulations)' },
    { value: '1975-1995', label: '1975-1995 (Early Regs)' },
    { value: 'post-1995', label: 'Post-1995 (Modern Regs)' },
  ];

  const loftDepths = [
    { value: '0', label: 'None (0mm)' },
    { value: '100', label: '100mm' },
    { value: '200', label: '200mm' },
    { value: '270', label: '270mm+' },
  ];

  const glazing = [
    { value: 'single', label: 'Single Glazing' },
    { value: 'old-double', label: 'Old Double Glazing (pre-2000)' },
    { value: 'modern-double', label: 'Modern Double Glazing' },
    { value: 'triple', label: 'Triple Glazing' },
  ];

  const boilerAges = [
    { value: '0', label: 'New (0-3 years)' },
    { value: '5', label: '5 years old' },
    { value: '10', label: '10 years old' },
    { value: '15', label: '15+ years old' },
    { value: '20', label: '20+ years old' },
  ];

  const controls = [
    { value: 'none', label: 'None or manual only' },
    { value: 'basic', label: 'Basic thermostat' },
    { value: 'programmer', label: 'Programmer (7-day)' },
    { value: 'smart', label: 'Smart/TRVs' },
  ];

  const calculations = useMemo(() => {
    // List of possible improvements ranked by cost-effectiveness
    const improvements = [];

    // 1. Loft Insulation
    if (parseInt(loftInsulationDepth) < 270) {
      const targetDepth = 270;
      const currentDepth = parseInt(loftInsulationDepth);

      let cost, saving, epcGain;
      if (currentDepth === 0) {
        cost = 500;
        saving = 150;
        epcGain = 15;
      } else if (currentDepth === 100) {
        cost = 300;
        saving = 100;
        epcGain = 10;
      } else {
        cost = 200;
        saving = 50;
        epcGain = 5;
      }

      improvements.push({
        id: 'loft',
        measure: 'Loft Insulation to 270mm',
        cost,
        annualSaving: saving,
        payback: cost / saving,
        epcGain,
        priority: 1,
        description: `Upgrade loft insulation from ${currentDepth}mm to 270mm`,
      });
    }

    // 2. Cavity Wall Insulation
    if (!cavityWallInsulated && propertyType !== 'flat') {
      let cost, saving;

      if (propertyType === 'detached') {
        cost = 1500;
        saving = 100;
      } else {
        cost = 1200;
        saving = 120;
      }

      improvements.push({
        id: 'cavity',
        measure: 'Cavity Wall Insulation',
        cost,
        annualSaving: saving,
        payback: cost / saving,
        epcGain: 12,
        priority: 2,
        description: 'Fill cavity walls with insulation (one-time, permanent)',
      });
    }

    // 3. Window Replacement
    if (glazingType === 'single' || glazingType === 'old-double') {
      const cost = propertyType === 'flat' ? 3000 : 5000;
      const saving = glazingType === 'single' ? 200 : 100;

      improvements.push({
        id: 'windows',
        measure: 'Modern Double/Triple Glazing',
        cost,
        annualSaving: saving,
        payback: cost / saving,
        epcGain: 10,
        priority: 3,
        description: `Replace ${glazingType === 'single' ? 'single' : 'old double'} glazing with high-performance windows`,
      });
    }

    // 4. Boiler Replacement
    if (parseInt(boilerAge) >= 15) {
      const cost = 2500;
      const saving = 200;

      improvements.push({
        id: 'boiler',
        measure: 'Replace Old Boiler with High-Efficiency',
        cost,
        annualSaving: saving,
        payback: cost / saving,
        epcGain: 8,
        priority: 2,
        description: 'Install new condensing boiler (90%+ efficiency)',
      });
    } else if (parseInt(boilerAge) >= 10) {
      const cost = 2500;
      const saving = 100;

      improvements.push({
        id: 'boiler',
        measure: 'Replace Boiler with High-Efficiency',
        cost,
        annualSaving: saving,
        payback: cost / saving,
        epcGain: 5,
        priority: 3,
        description: 'Install new condensing boiler',
      });
    }

    // 5. Heating Controls
    if (heatingControls !== 'smart') {
      const costs = {
        none: 600,
        basic: 400,
        programmer: 300,
      };

      const savingsMap = {
        none: 120,
        basic: 80,
        programmer: 40,
      };

      const cost = costs[heatingControls] || 200;
      const saving = savingsMap[heatingControls] || 30;

      improvements.push({
        id: 'controls',
        measure: 'Upgrade to Smart Heating Controls',
        cost,
        annualSaving: saving,
        payback: cost / saving,
        epcGain: 5,
        priority: 4,
        description: 'Install smart thermostat and TRVs for precise heating control',
      });
    }

    // 6. Heat Pump (major upgrade)
    improvements.push({
      id: 'heat-pump',
      measure: 'Install Air Source Heat Pump',
      cost: 10000,
      annualSaving: 500,
      payback: 10000 / 500,
      epcGain: 25,
      priority: 5,
      description: 'Replace boiler with heat pump (requires grants consideration)',
    });

    // 7. Solar Panels
    improvements.push({
      id: 'solar',
      measure: 'Install 5kW Solar Panel System',
      cost: 10000,
      annualSaving: 600,
      payback: 10000 / 600,
      epcGain: 15,
      priority: 6,
      description: 'Install solar PV system with battery storage potential',
    });

    // Sort by cost-effectiveness (payback period)
    improvements.sort((a, b) => a.payback - b.payback);

    // Calculate potential new EPC rating
    const ratingScale = { A: 92, B: 81, C: 69, D: 55, E: 39, F: 21, G: 1 };
    let currentScore = ratingScale[currentRating];

    // Add EPC gains from all improvements
    const totalEpcGain = improvements.reduce((sum, imp) => sum + imp.epcGain, 0);
    const newScore = Math.min(currentScore + totalEpcGain, 100);

    // Determine new rating
    let newRating = 'A';
    if (newScore < 92) newRating = newScore >= 81 ? 'B' : newScore >= 69 ? 'C' : newScore >= 55 ? 'D' : newScore >= 39 ? 'E' : newScore >= 21 ? 'F' : 'G';

    // Total costs and savings
    const totalCost = improvements.reduce((sum, imp) => sum + imp.cost, 0);
    const totalAnnualSaving = improvements.reduce((sum, imp) => sum + imp.annualSaving, 0);
    const totalPayback = totalCost > 0 ? totalCost / totalAnnualSaving : 0;

    return {
      improvements,
      currentScore,
      newScore,
      currentRating,
      newRating,
      totalEpcGain,
      totalCost,
      totalAnnualSaving,
      totalPayback,
    };
  }, [currentRating, propertyType, ageBand, cavityWallInsulated, loftInsulationDepth, glazingType, boilerAge, heatingControls]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Configuration */}
      <div className="bg-surface rounded-[12px] border border-border p-6 space-y-4">
        <h2 className="text-2xl font-bold font-heading text-text-primary">EPC Improvement Checker</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Current EPC Rating"
            options={ratings}
            value={currentRating}
            onChange={(e) => setCurrentRating(e.target.value)}
          />
          <Select
            label="Property Type"
            options={propertyTypes}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          />
          <Select
            label="Property Age"
            options={ageBands}
            value={ageBand}
            onChange={(e) => setAgeBand(e.target.value)}
          />
          <Select
            label="Loft Insulation Depth"
            options={loftDepths}
            value={loftInsulationDepth}
            onChange={(e) => setLoftInsulationDepth(e.target.value)}
          />
          <Select
            label="Glazing Type"
            options={glazing}
            value={glazingType}
            onChange={(e) => setGlazingType(e.target.value)}
          />
          <Select
            label="Boiler Age"
            options={boilerAges}
            value={boilerAge}
            onChange={(e) => setBoilerAge(e.target.value)}
          />
          <Select
            label="Heating Controls"
            options={controls}
            value={heatingControls}
            onChange={(e) => setHeatingControls(e.target.value)}
          />
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={cavityWallInsulated}
                onChange={(e) => setCavityWallInsulated(e.target.checked)}
                className="w-4 h-4 rounded accent-accent"
              />
              <span className="text-sm text-text-secondary">Cavity Wall Insulated</span>
            </label>
          </div>
        </div>
      </div>

      {/* EPC Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-sm text-text-muted uppercase font-semibold mb-2">Current EPC Rating</h3>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-3xl font-bold font-heading text-red-600">
                {calculations.currentRating}
              </span>
            </div>
            <div>
              <p className="text-lg font-bold text-text-primary">{calculations.currentScore}</p>
              <p className="text-xs text-text-secondary">out of 100</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-6">
          <h3 className="text-sm text-text-muted uppercase font-semibold mb-2">Potential New Rating</h3>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-3xl font-bold font-heading text-green-600">
                {calculations.newRating}
              </span>
            </div>
            <div>
              <p className="text-lg font-bold text-text-primary">{calculations.newScore.toFixed(0)}</p>
              <p className="text-xs text-green-600 font-semibold">+{calculations.totalEpcGain} points</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-6">
          <h3 className="text-sm text-blue-700 uppercase font-semibold mb-2">Total Investment</h3>
          <p className="text-2xl font-bold font-mono text-blue-600 mb-2">
            {formatCurrency(calculations.totalCost)}
          </p>
          <p className="text-xs text-blue-700">
            Annual saving: {formatCurrency(calculations.totalAnnualSaving)}
          </p>
          <p className="text-xs text-blue-700 font-semibold">
            Payback: {calculations.totalPayback.toFixed(1)} years
          </p>
        </div>
      </div>

      {/* Recommended Improvements */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Recommended Improvements (by Cost-Effectiveness)</h3>

        <div className="space-y-3">
          {calculations.improvements.map((improvement, idx) => {
            const roi = improvement.annualSaving > 0 ? (improvement.annualSaving / improvement.cost) * 100 : 0;

            return (
              <div key={improvement.id} className="border border-border rounded-[8px] p-4 hover:bg-surface transition">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-text-primary">{improvement.measure}</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                        +{improvement.epcGain} EPC points
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary ml-8">{improvement.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 ml-8 text-sm">
                  <div className="bg-surface rounded-[6px] p-2">
                    <p className="text-xs text-text-muted">Cost</p>
                    <p className="font-mono font-bold text-text-primary">{formatCurrency(improvement.cost)}</p>
                  </div>
                  <div className="bg-surface rounded-[6px] p-2">
                    <p className="text-xs text-text-muted">Annual Saving</p>
                    <p className="font-mono font-bold text-green-600">{formatCurrency(improvement.annualSaving)}</p>
                  </div>
                  <div className="bg-surface rounded-[6px] p-2">
                    <p className="text-xs text-text-muted">Payback</p>
                    <p className="font-mono font-bold text-text-primary">{improvement.payback.toFixed(1)} yrs</p>
                  </div>
                  <div className="bg-surface rounded-[6px] p-2">
                    <p className="text-xs text-text-muted">ROI</p>
                    <p className="font-mono font-bold text-amber-600">{roi.toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Wins vs Major Investments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-green-900 mb-4">Quick Wins (under £500)</h3>
          <ul className="space-y-2 text-sm text-green-800">
            {calculations.improvements
              .filter(i => i.cost < 500)
              .map((i, idx) => (
                <li key={i.id} className="flex items-start gap-2">
                  <span className="font-bold text-green-600 mt-0.5">✓</span>
                  <span>{i.measure} ({i.payback.toFixed(1)} yr payback)</span>
                </li>
              ))}
            {calculations.improvements.filter(i => i.cost < 500).length === 0 && (
              <li className="text-text-muted">No quick wins identified for your property</li>
            )}
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-blue-900 mb-4">Medium (£500-5000)</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            {calculations.improvements
              .filter(i => i.cost >= 500 && i.cost < 5000)
              .map((i, idx) => (
                <li key={i.id} className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 mt-0.5">▪</span>
                  <span>{i.measure} ({i.payback.toFixed(1)} yr payback)</span>
                </li>
              ))}
            {calculations.improvements.filter(i => i.cost >= 500 && i.cost < 5000).length === 0 && (
              <li className="text-text-muted">No medium-cost improvements</li>
            )}
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-purple-900 mb-4">Major (£5000+)</h3>
          <ul className="space-y-2 text-sm text-purple-800">
            {calculations.improvements
              .filter(i => i.cost >= 5000)
              .map((i, idx) => (
                <li key={i.id} className="flex items-start gap-2">
                  <span className="font-bold text-purple-600 mt-0.5">●</span>
                  <span>{i.measure} ({i.payback.toFixed(1)} yr payback)</span>
                </li>
              ))}
            {calculations.improvements.filter(i => i.cost >= 5000).length === 0 && (
              <li className="text-text-muted">No major upgrades needed</li>
            )}
          </ul>
        </div>
      </div>

      {/* Grants and Support */}
      <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-amber-900 mb-4">💰 Grants & Support Available</h3>
        <div className="space-y-3 text-sm text-amber-800">
          <div className="border-b border-amber-200 pb-3">
            <p className="font-semibold">BUS Grant (Boiler Upgrade Scheme)</p>
            <p>£7,500 towards heat pump installation. Check eligibility on gov.uk</p>
          </div>
          <div className="border-b border-amber-200 pb-3">
            <p className="font-semibold">Local Authority Grants</p>
            <p>Many councils offer insulation and heating grants. Contact your local authority</p>
          </div>
          <div className="border-b border-amber-200 pb-3">
            <p className="font-semibold">Energy Company Obligation (ECO)</p>
            <p>Some energy suppliers offer free/discounted insulation. Ask your provider</p>
          </div>
          <div>
            <p className="font-semibold">Tax Relief</p>
            <p>Energy-efficient improvements may qualify for 5% VAT rate instead of 20%</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-blue-900 mb-4">💡 Improvement Strategy</h3>
        <ol className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
          <li><span className="font-semibold">Start with loft insulation:</span> Fastest payback, biggest impact</li>
          <li><span className="font-semibold">Add cavity wall insulation:</span> Permanent benefit, no disruption</li>
          <li><span className="font-semibold">Upgrade windows:</span> Improves comfort and appearance too</li>
          <li><span className="font-semibold">Replace old boiler:</span> Consider heat pump for green credentials</li>
          <li><span className="font-semibold">Invest in controls:</span> Smart controls save money with less investment</li>
          <li><span className="font-semibold">Add solar later:</span> Combine with other upgrades for best savings</li>
        </ol>
      </div>
    </div>
  );
}
