'use client';

import { useState, useMemo } from 'react';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';

const formatCurrency = (value) => {
  if (value < 1) {
    return 'p' + (value * 100).toFixed(1);
  }
  return '£' + value.toFixed(2);
};

export default function RetrofitSavingsEstimator() {
  const [propertyAge, setPropertyAge] = useState('1975-1995');
  const [propertyType, setPropertyType] = useState('semi');
  const [propertySize, setPropertySize] = useState('medium');
  const [currentEpc, setCurrentEpc] = useState('E');
  const [currentHeating, setCurrentHeating] = useState('gas');
  const [insulationStatus, setInsulationStatus] = useState('none');

  const ages = [
    { value: 'pre-1930', label: 'Pre-1930 (Victorian/Edwardian)' },
    { value: '1930-1975', label: '1930-1975' },
    { value: '1975-1995', label: '1975-1995' },
    { value: 'post-1995', label: 'Post-1995 (Modern)' },
  ];

  const propertyTypes = [
    { value: 'detached', label: 'Detached House' },
    { value: 'semi', label: 'Semi-Detached House' },
    { value: 'terrace', label: 'Terraced House' },
    { value: 'flat', label: 'Flat/Apartment' },
  ];

  const sizes = [
    { value: 'small', label: 'Small (1-2 bed)' },
    { value: 'medium', label: 'Medium (3-4 bed)' },
    { value: 'large', label: 'Large (5+ bed)' },
  ];

  const epcRatings = [
    { value: 'D', label: 'D (55-68)' },
    { value: 'E', label: 'E (39-54)' },
    { value: 'F', label: 'F (21-38)' },
    { value: 'G', label: 'G (1-20)' },
  ];

  const heatingTypes = [
    { value: 'gas', label: 'Gas Boiler' },
    { value: 'oil', label: 'Oil Boiler' },
    { value: 'electric', label: 'Electric Heating' },
  ];

  const insulationOptions = [
    { value: 'none', label: 'None or minimal' },
    { value: 'partial', label: 'Partial (some measures)' },
    { value: 'good', label: 'Good (loft + cavity)' },
  ];

  const calculations = useMemo(() => {
    // Base annual energy cost by property age and size
    const energyCostByAge = {
      'pre-1930': 2500,
      '1930-1975': 2200,
      '1975-1995': 1800,
      'post-1995': 1400,
    };

    const baseCost = energyCostByAge[propertyAge];
    const sizeMultiplier = { small: 0.7, medium: 1.0, large: 1.3 }[propertySize];
    const currentAnnualCost = baseCost * sizeMultiplier;

    // Comprehensive retrofit measures
    const measures = [];

    // 1. Loft Insulation (Quick Win)
    if (insulationStatus !== 'good') {
      measures.push({
        id: 'loft',
        category: 'Quick Win',
        name: 'Loft Insulation to 270mm',
        cost: 500,
        saving: Math.round(currentAnnualCost * 0.12),
        payback: 5,
        epcGain: 12,
        priority: 1,
        description: 'Lay 270mm mineral wool in loft',
        impact: 'high',
      });
    }

    // 2. Cavity Wall Insulation (Quick Win)
    if (propertyType !== 'flat' && insulationStatus !== 'good') {
      measures.push({
        id: 'cavity',
        category: 'Quick Win',
        name: 'Cavity Wall Insulation',
        cost: 1200,
        saving: Math.round(currentAnnualCost * 0.15),
        payback: 8,
        epcGain: 15,
        priority: 2,
        description: 'Fill cavity walls with foam or mineral wool',
        impact: 'high',
      });
    }

    // 3. Boiler Replacement (Medium)
    measures.push({
      id: 'boiler',
      category: 'Medium Investment',
      name: 'High-Efficiency Gas Boiler',
      cost: 2500,
      saving: Math.round(currentAnnualCost * 0.08),
      payback: 31,
      epcGain: 8,
      priority: 4,
      description: 'Replace old boiler with modern condensing boiler (90%+ efficiency)',
      impact: 'medium',
    });

    // 4. Window Replacement (Medium)
    measures.push({
      id: 'windows',
      category: 'Medium Investment',
      name: 'Double Glazing Upgrade',
      cost: 5000,
      saving: Math.round(currentAnnualCost * 0.07),
      payback: 71,
      epcGain: 10,
      priority: 5,
      description: 'Replace single/old double glazing with modern double glazing',
      impact: 'medium',
    });

    // 5. Heating Controls (Quick Win)
    measures.push({
      id: 'controls',
      category: 'Quick Win',
      name: 'Smart Heating Controls',
      cost: 600,
      saving: Math.round(currentAnnualCost * 0.06),
      payback: 10,
      epcGain: 5,
      priority: 3,
      description: 'Install smart thermostat with TRVs on all radiators',
      impact: 'medium',
    });

    // 6. Heat Pump (Major)
    measures.push({
      id: 'heat-pump',
      category: 'Major Upgrade',
      name: 'Air Source Heat Pump',
      cost: 10000,
      saving: Math.round(currentAnnualCost * 0.40),
      payback: 25,
      epcGain: 25,
      priority: 6,
      description: 'Replace boiler with ASHP (COP 3.2). Needs BUS grant consideration.',
      impact: 'very-high',
    });

    // 7. Solar Panels (Major)
    measures.push({
      id: 'solar',
      category: 'Major Upgrade',
      name: '5kW Solar Panel System',
      cost: 10000,
      saving: Math.round(currentAnnualCost * 0.35),
      payback: 29,
      epcGain: 15,
      priority: 7,
      description: 'Install 5kW solar PV system with grid export',
      impact: 'very-high',
    });

    // 8. Solid Wall Insulation (Major)
    if (propertyType === 'detached') {
      measures.push({
        id: 'solid-wall',
        category: 'Major Upgrade',
        name: 'Solid Wall Insulation',
        cost: 15000,
        saving: Math.round(currentAnnualCost * 0.25),
        payback: 60,
        epcGain: 20,
        priority: 8,
        description: 'External or internal insulation for solid walls',
        impact: 'very-high',
      });
    }

    // 9. Battery Storage (Premium)
    measures.push({
      id: 'battery',
      category: 'Premium Addition',
      name: '5kWh Battery Storage',
      cost: 5000,
      saving: Math.round(currentAnnualCost * 0.05),
      payback: 100,
      epcGain: 0,
      priority: 9,
      description: 'Adds to solar: increases self-consumption, enables backup power',
      impact: 'low',
    });

    // Sort by ROI
    measures.sort((a, b) => a.payback - b.payback);

    // Total potential
    const totalCost = measures.reduce((sum, m) => sum + m.cost, 0);
    const totalSaving = measures.reduce((sum, m) => sum + m.saving, 0);
    const totalEpcGain = measures.reduce((sum, m) => sum + m.epcGain, 0);

    // Calculate new EPC rating
    const ratingScale = { D: 55, E: 39, F: 21, G: 1 };
    const currentScore = ratingScale[currentEpc];
    const newScore = Math.min(currentScore + totalEpcGain, 100);
    let newRating = 'A';
    if (newScore < 92) newRating = newScore >= 81 ? 'B' : newScore >= 69 ? 'C' : newScore >= 55 ? 'D' : newScore >= 39 ? 'E' : newScore >= 21 ? 'F' : 'G';

    // Group by category
    const byCategory = {};
    measures.forEach(m => {
      if (!byCategory[m.category]) byCategory[m.category] = [];
      byCategory[m.category].push(m);
    });

    return {
      measures,
      byCategory,
      currentAnnualCost,
      totalCost,
      totalSaving,
      totalPayback: totalCost > 0 ? totalCost / totalSaving : 0,
      totalEpcGain,
      currentScore,
      newScore,
      currentEpc,
      newRating,
    };
  }, [propertyAge, propertyType, propertySize, currentEpc, currentHeating, insulationStatus]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Configuration */}
      <div className="bg-surface rounded-[12px] border border-border p-6 space-y-4">
        <h2 className="text-2xl font-bold font-heading text-text-primary">Retrofit Savings Estimator</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Property Age"
            options={ages}
            value={propertyAge}
            onChange={(e) => setPropertyAge(e.target.value)}
          />
          <Select
            label="Property Type"
            options={propertyTypes}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          />
          <Select
            label="Property Size"
            options={sizes}
            value={propertySize}
            onChange={(e) => setPropertySize(e.target.value)}
          />
          <Select
            label="Current EPC Rating"
            options={epcRatings}
            value={currentEpc}
            onChange={(e) => setCurrentEpc(e.target.value)}
          />
          <Select
            label="Current Heating Type"
            options={heatingTypes}
            value={currentHeating}
            onChange={(e) => setCurrentHeating(e.target.value)}
          />
          <Select
            label="Insulation Status"
            options={insulationOptions}
            value={insulationStatus}
            onChange={(e) => setInsulationStatus(e.target.value)}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase mb-1">Current Annual Cost</p>
          <p className="text-xl font-bold font-mono text-text-primary">
            {formatCurrency(calculations.currentAnnualCost)}
          </p>
        </div>

        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase mb-1">Total Investment</p>
          <p className="text-xl font-bold font-mono text-text-primary">
            {formatCurrency(calculations.totalCost)}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-[12px] p-4">
          <p className="text-xs text-green-700 uppercase mb-1">Annual Saving</p>
          <p className="text-xl font-bold font-mono text-green-600">
            {formatCurrency(calculations.totalSaving)}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-4">
          <p className="text-xs text-blue-700 uppercase mb-1">Payback Period</p>
          <p className="text-xl font-bold font-mono text-blue-600">
            {calculations.totalPayback.toFixed(1)}
          </p>
          <p className="text-xs text-blue-600 mt-1">years</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-[12px] p-4">
          <p className="text-xs text-purple-700 uppercase mb-1">EPC Rating</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold font-heading text-purple-600">{calculations.currentEpc}</span>
            <span className="text-xs text-text-muted">to</span>
            <span className="text-lg font-bold font-heading text-green-600">{calculations.newRating}</span>
          </div>
        </div>
      </div>

      {/* Retrofit Plan by Priority */}
      {Object.keys(calculations.byCategory).map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-bold font-heading text-text-primary px-6">
            {category} ({calculations.byCategory[category].length} measures)
          </h3>

          <div className="space-y-3">
            {calculations.byCategory[category].map((measure, idx) => (
              <div key={measure.id} className="bg-white border border-border rounded-[12px] p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white text-xs font-bold">
                        {measure.priority}
                      </span>
                      <h4 className="font-bold text-text-primary text-lg">{measure.name}</h4>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        measure.impact === 'very-high' ? 'bg-red-100 text-red-800' :
                        measure.impact === 'high' ? 'bg-green-100 text-green-800' :
                        measure.impact === 'medium' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {measure.impact}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1 ml-11">{measure.description}</p>
                  </div>
                </div>

                <div className="ml-11 grid grid-cols-5 gap-2 text-sm">
                  <div className="bg-surface rounded-[6px] p-2">
                    <p className="text-xs text-text-muted">Cost</p>
                    <p className="font-mono font-bold text-text-primary">
                      {formatCurrency(measure.cost)}
                    </p>
                  </div>
                  <div className="bg-surface rounded-[6px] p-2">
                    <p className="text-xs text-text-muted">Annual Saving</p>
                    <p className="font-mono font-bold text-green-600">
                      {formatCurrency(measure.saving)}
                    </p>
                  </div>
                  <div className="bg-surface rounded-[6px] p-2">
                    <p className="text-xs text-text-muted">Payback</p>
                    <p className="font-mono font-bold text-text-primary">
                      {measure.payback} yrs
                    </p>
                  </div>
                  <div className="bg-surface rounded-[6px] p-2">
                    <p className="text-xs text-text-muted">EPC Gain</p>
                    <p className="font-mono font-bold text-amber-600">
                      +{measure.epcGain}
                    </p>
                  </div>
                  <div className="bg-surface rounded-[6px] p-2">
                    <p className="text-xs text-text-muted">ROI</p>
                    <p className="font-mono font-bold text-text-primary">
                      {((measure.saving / measure.cost) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Summary Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-green-900 mb-3">Do These First</h3>
          <ul className="space-y-2 text-sm text-green-800">
            {calculations.measures
              .filter(m => m.payback <= 10)
              .slice(0, 4)
              .map(m => (
                <li key={m.id} className="flex items-start gap-2">
                  <span className="font-bold text-green-600 mt-0.5">▸</span>
                  <span>
                    <strong>{m.name}</strong>
                    <br />
                    <span className="text-xs text-green-700">
                      {m.payback} yr payback, {formatCurrency(m.saving)}/yr saving
                    </span>
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-blue-900 mb-3">Medium-Term</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            {calculations.measures
              .filter(m => m.payback > 10 && m.payback <= 35)
              .slice(0, 4)
              .map(m => (
                <li key={m.id} className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 mt-0.5">▪</span>
                  <span>
                    <strong>{m.name}</strong>
                    <br />
                    <span className="text-xs text-blue-700">
                      {m.payback} yr payback, {formatCurrency(m.saving)}/yr saving
                    </span>
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-[12px] p-6">
          <h3 className="text-lg font-bold font-heading text-purple-900 mb-3">Long-Term Investment</h3>
          <ul className="space-y-2 text-sm text-purple-800">
            {calculations.measures
              .filter(m => m.payback > 35)
              .slice(0, 4)
              .map(m => (
                <li key={m.id} className="flex items-start gap-2">
                  <span className="font-bold text-purple-600 mt-0.5">●</span>
                  <span>
                    <strong>{m.name}</strong>
                    <br />
                    <span className="text-xs text-purple-700">
                      {m.payback} yr payback, {formatCurrency(m.saving)}/yr saving
                    </span>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* EPC Impact */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">EPC Rating Impact</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Current Rating</h4>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-4xl font-bold font-heading text-red-600">
                  {calculations.currentEpc}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{calculations.currentScore}</p>
                <p className="text-sm text-text-secondary">out of 100</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-3">After All Upgrades</h4>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-4xl font-bold font-heading text-green-600">
                  {calculations.newRating}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{calculations.newScore.toFixed(0)}</p>
                <p className="text-sm text-green-600 font-semibold">+{calculations.totalEpcGain} points</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-amber-900 mb-4">💡 Retrofit Strategy</h3>
        <ol className="space-y-2 text-sm text-amber-800 list-decimal list-inside">
          <li><span className="font-semibold">Start with quick wins:</span> Loft insulation, cavity fill, controls have best payback</li>
          <li><span className="font-semibold">Apply for grants:</span> Check BUS grant (£7,500 for heat pump), ECO grants, council funding</li>
          <li><span className="font-semibold">Combine measures:</span> Installing together is cheaper and more effective</li>
          <li><span className="font-semibold">Improve insulation first:</span> Before installing heat pump or solar</li>
          <li><span className="font-semibold">Phase the work:</span> Don't need to do everything at once</li>
          <li><span className="font-semibold">Get professional advice:</span> EPC assessor can prioritize for your property</li>
          <li><span className="font-semibold">Plan for the future:</span> Gas boilers will be phased out by 2035</li>
          <li><span className="font-semibold">Consider package financing:</span> Many installers offer payment plans</li>
        </ol>
      </div>

      {/* ROI Ranking */}
      <div className="bg-white border border-border rounded-[12px] p-6">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Ranked by Return on Investment (ROI)</h3>

        <div className="space-y-2">
          {calculations.measures
            .sort((a, b) => (b.saving / b.cost) - (a.saving / a.cost))
            .slice(0, 6)
            .map((measure, idx) => {
              const roi = (measure.saving / measure.cost) * 100;
              return (
                <div key={measure.id} className="flex items-center gap-4 pb-2 border-b border-border last:border-b-0">
                  <span className="font-bold text-accent text-sm">{idx + 1}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-text-primary">{measure.name}</p>
                    <p className="text-xs text-text-secondary">
                      {formatCurrency(measure.cost)} cost, {formatCurrency(measure.saving)}/year saving
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold font-mono text-green-600">{roi.toFixed(0)}% ROI</p>
                    <p className="text-xs text-text-secondary">{measure.payback} yr payback</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
