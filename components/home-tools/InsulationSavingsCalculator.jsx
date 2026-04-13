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

export default function InsulationSavingsCalculator() {
  const [propertyType, setPropertyType] = useState('semi');
  const [propertySize, setPropertySize] = useState('medium');
  const [loftInsulation, setLoftInsulation] = useState('0');
  const [cavityWallFilled, setCavityWallFilled] = useState(false);
  const [solidWallInsulation, setSolidWallInsulation] = useState('none');
  const [floorInsulation, setFloorInsulation] = useState('none');

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

  const loftDepths = [
    { value: '0', label: 'None (0mm)' },
    { value: '100', label: '100mm' },
    { value: '200', label: '200mm' },
    { value: '270', label: '270mm+' },
  ];

  const solidWallOptions = [
    { value: 'none', label: 'No insulation' },
    { value: 'internal', label: 'Internal insulation' },
    { value: 'external', label: 'External insulation' },
  ];

  const floorOptions = [
    { value: 'none', label: 'No insulation' },
    { value: 'partial', label: 'Partial insulation' },
    { value: 'full', label: 'Fully insulated' },
  ];

  const calculations = useMemo(() => {
    const improvements = [];

    // Property area estimates (sq m)
    const propertyAreas = {
      small: { detached: 100, semi: 90, terrace: 80, flat: 60 },
      medium: { detached: 180, semi: 160, terrace: 140, flat: 100 },
      large: { detached: 280, semi: 240, terrace: 200, flat: 150 },
    };

    const propertyArea = propertyAreas[propertySize][propertyType];
    const roofArea = propertyArea * 0.6; // Approximate roof area

    // 1. Loft Insulation
    const loftCurrentDepth = parseInt(loftInsulation);
    if (loftCurrentDepth < 270) {
      let costPerM2, savingPerM2;

      if (loftCurrentDepth === 0) {
        costPerM2 = 5;
        savingPerM2 = 2.5;
      } else if (loftCurrentDepth === 100) {
        costPerM2 = 3.5;
        savingPerM2 = 2;
      } else {
        costPerM2 = 2;
        savingPerM2 = 1;
      }

      const cost = roofArea * costPerM2;
      const saving = roofArea * savingPerM2;

      improvements.push({
        id: 'loft',
        name: 'Loft Insulation',
        description: `Upgrade from ${loftCurrentDepth}mm to 270mm`,
        cost,
        annualSaving: saving,
        payback: cost / saving,
        priority: 1,
        heatLoss: 25,
      });
    }

    // 2. Cavity Wall Insulation
    if (!cavityWallFilled && propertyType !== 'flat') {
      // Estimated wall area (minus windows/doors, roughly 60% of external area)
      const wallArea = propertyArea * 1.3; // External perimeter estimate

      let costPerM2, savingPerM2;

      if (propertyType === 'detached') {
        costPerM2 = 13;
        savingPerM2 = 2;
      } else if (propertyType === 'semi') {
        costPerM2 = 11;
        savingPerM2 = 2.4;
      } else {
        costPerM2 = 10;
        savingPerM2 = 2;
      }

      const cost = wallArea * costPerM2;
      const saving = wallArea * savingPerM2;

      improvements.push({
        id: 'cavity',
        name: 'Cavity Wall Insulation',
        description: 'Fill cavity walls with mineral or foam insulation',
        cost,
        annualSaving: saving,
        payback: cost / saving,
        priority: 2,
        heatLoss: 33,
      });
    }

    // 3. Solid Wall Insulation
    if (solidWallInsulation === 'none') {
      const wallArea = propertyArea * 1.3;

      const options = [
        {
          type: 'internal',
          cost: wallArea * 20,
          saving: wallArea * 3.5,
          description: 'Internal insulation boards (reduces room size)',
        },
        {
          type: 'external',
          cost: wallArea * 35,
          saving: wallArea * 3.8,
          description: 'External insulation with render (maintains room size)',
        },
      ];

      improvements.push({
        id: 'solid-wall',
        name: 'Solid Wall Insulation',
        description: options.map(o => o.description).join(' or '),
        cost: options[0].cost,
        annualSaving: options[0].saving,
        payback: options[0].cost / options[0].saving,
        priority: 4,
        heatLoss: 35,
        note: `Internal: £${(options[0].cost).toFixed(0)}, External: £${(options[1].cost).toFixed(0)}`,
      });
    }

    // 4. Floor Insulation
    if (floorInsulation === 'none') {
      const floorArea = propertyArea;

      let cost, saving;

      if (propertyType === 'flat') {
        cost = floorArea * 8;
        saving = floorArea * 0.5;
      } else {
        cost = floorArea * 15;
        saving = floorArea * 1.2;
      }

      improvements.push({
        id: 'floor',
        name: 'Ground Floor Insulation',
        description: 'Insulate suspended floor or concrete slab',
        cost,
        annualSaving: saving,
        payback: cost / saving,
        priority: 5,
        heatLoss: 15,
      });
    }

    // 5. Window Replacement (not insulation but included for completeness)
    improvements.push({
      id: 'windows',
      name: 'Double Glazing Upgrade',
      description: 'Replace single with modern double glazing',
      cost: propertyArea * 50,
      annualSaving: propertyArea * 1.5,
      payback: (propertyArea * 50) / (propertyArea * 1.5),
      priority: 3,
      heatLoss: 10,
    });

    // Sort by payback period
    improvements.sort((a, b) => a.payback - b.payback);

    // Summary totals
    const totalCost = improvements.reduce((sum, i) => sum + i.cost, 0);
    const totalAnnualSaving = improvements.reduce((sum, i) => sum + i.annualSaving, 0);
    const totalPayback = totalCost > 0 ? totalCost / totalAnnualSaving : 0;

    // Total heat loss addressed
    const totalHeatLoss = improvements.reduce((sum, i) => sum + i.heatLoss, 0);

    return {
      improvements,
      propertyArea,
      roofArea,
      totalCost,
      totalAnnualSaving,
      totalPayback,
      totalHeatLoss: Math.min(totalHeatLoss, 100),
    };
  }, [propertyType, propertySize, loftInsulation, cavityWallFilled, solidWallInsulation, floorInsulation]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Configuration */}
      <div className="bg-surface rounded-[12px] border border-border space-y-4">


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            label="Loft Insulation Depth"
            options={loftDepths}
            value={loftInsulation}
            onChange={(e) => setLoftInsulation(e.target.value)}
          />
          <Select
            label="Solid Wall Insulation"
            options={solidWallOptions}
            value={solidWallInsulation}
            onChange={(e) => setSolidWallInsulation(e.target.value)}
          />
          <Select
            label="Floor Insulation"
            options={floorOptions}
            value={floorInsulation}
            onChange={(e) => setFloorInsulation(e.target.value)}
          />
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={cavityWallFilled}
                onChange={(e) => setCavityWallFilled(e.target.checked)}
                className="w-4 h-4 rounded accent-accent"
              />
              <span className="text-sm text-text-secondary">Cavity Wall Filled</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-border text-sm text-text-secondary">
          <p>Estimated property area: {calculations.propertyArea.toFixed(0)} m²</p>
          <p>Estimated roof area: {calculations.roofArea.toFixed(0)} m²</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-[12px] p-4">
          <p className="text-xs text-text-muted uppercase font-semibold mb-1">Total Investment</p>
          <p className="text-2xl font-bold font-mono text-text-primary">
            {formatCurrency(calculations.totalCost)}
          </p>
          <p className="text-xs text-text-secondary mt-1">for all improvements</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-[12px] p-4">
          <p className="text-xs text-green-700 uppercase font-semibold mb-1">Annual Savings</p>
          <p className="text-2xl font-bold font-mono text-green-600">
            {formatCurrency(calculations.totalAnnualSaving)}
          </p>
          <p className="text-xs text-green-600 mt-1">per year</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-4">
          <p className="text-xs text-blue-700 uppercase font-semibold mb-1">Payback Period</p>
          <p className="text-2xl font-bold font-mono text-blue-600">
            {calculations.totalPayback.toFixed(1)}
          </p>
          <p className="text-xs text-blue-600 mt-1">years</p>
        </div>
      </div>

      {/* Heat Loss Reduction */}
      <div className="bg-white border border-border rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Heat Loss Reduction</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text-primary">Total Heat Loss Addressed</span>
            <span className="text-sm font-bold text-text-primary">{calculations.totalHeatLoss}%</span>
          </div>
          <div className="w-full bg-surface rounded-[12px] overflow-hidden h-8">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${calculations.totalHeatLoss}%` }}
            >
              {calculations.totalHeatLoss > 10 && `${calculations.totalHeatLoss}%`}
            </div>
          </div>
          <p className="text-xs text-text-secondary mt-2">
            Typical UK home loses 25% through loft, 33% through walls, 15% through floor, 10% through windows
          </p>
        </div>
      </div>

      {/* Recommended Improvements */}
      <div className="bg-white border border-border rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Recommended Improvements (Priority Order)</h3>

        <div className="space-y-3">
          {calculations.improvements.map((improvement, idx) => (
            <div key={improvement.id} className="border border-border rounded-[8px] p-4 hover:bg-surface transition">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-text-primary">{improvement.name}</h4>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold">
                      {improvement.heatLoss}% heat loss
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary ml-8">{improvement.description}</p>
                  {improvement.note && (
                    <p className="text-xs text-text-muted ml-8 mt-1">{improvement.note}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 ml-8 text-sm">
                <div className="bg-surface rounded-[6px] p-2">
                  <p className="text-xs text-text-muted">Cost</p>
                  <p className="font-mono font-bold text-text-primary">
                    {formatCurrency(improvement.cost)}
                  </p>
                </div>
                <div className="bg-surface rounded-[6px] p-2">
                  <p className="text-xs text-text-muted">Annual Saving</p>
                  <p className="font-mono font-bold text-green-600">
                    {formatCurrency(improvement.annualSaving)}
                  </p>
                </div>
                <div className="bg-surface rounded-[6px] p-2">
                  <p className="text-xs text-text-muted">Payback</p>
                  <p className="font-mono font-bold text-text-primary">
                    {improvement.payback.toFixed(1)} yrs
                  </p>
                </div>
                <div className="bg-surface rounded-[6px] p-2">
                  <p className="text-xs text-text-muted">ROI</p>
                  <p className="font-mono font-bold text-amber-600">
                    {(100 / improvement.payback).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Wins */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-[12px]">
          <h3 className="text-lg font-bold font-heading text-green-900 mb-4">Quick Wins (payback under 5 years)</h3>
          <ul className="space-y-2">
            {calculations.improvements
              .filter(i => i.payback < 5)
              .map((i) => (
                <li key={i.id} className="text-sm text-green-800 flex items-start gap-2">
                  <span className="font-bold text-green-600 mt-0.5">✓</span>
                  <span>
                    <strong>{i.name}</strong>
                    <br />
                    <span className="text-xs text-green-700">
                      {formatCurrency(i.cost)} investment, {formatCurrency(i.annualSaving)} annual saving
                    </span>
                  </span>
                </li>
              ))}
            {calculations.improvements.filter(i => i.payback < 5).length === 0 && (
              <li className="text-sm text-green-700">No quick wins available</li>
            )}
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-[12px]">
          <h3 className="text-lg font-bold font-heading text-blue-900 mb-4">Long-term Investments (5-15 years)</h3>
          <ul className="space-y-2">
            {calculations.improvements
              .filter(i => i.payback >= 5 && i.payback <= 15)
              .map((i) => (
                <li key={i.id} className="text-sm text-blue-800 flex items-start gap-2">
                  <span className="font-bold text-blue-600 mt-0.5">▪</span>
                  <span>
                    <strong>{i.name}</strong>
                    <br />
                    <span className="text-xs text-blue-700">
                      {formatCurrency(i.cost)} investment, {formatCurrency(i.annualSaving)} annual saving
                    </span>
                  </span>
                </li>
              ))}
            {calculations.improvements.filter(i => i.payback >= 5 && i.payback <= 15).length === 0 && (
              <li className="text-sm text-blue-700">No medium-term investments</li>
            )}
          </ul>
        </div>
      </div>

      {/* Insulation Types Guide */}
      <div className="bg-white border border-border rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-text-primary mb-4">Insulation Types Explained</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-bold text-text-primary mb-2">Loft Insulation</h4>
            <p className="text-text-secondary mb-2">
              Laying insulation material (mineral wool, cellulose, sheep's wool) between joists. Easiest to install, biggest impact.
            </p>
            <ul className="text-text-secondary space-y-1 list-disc list-inside text-xs">
              <li>Saves 25% heat loss (largest source)</li>
              <li>Recommended depth: 270mm</li>
              <li>DIY possible for some properties</li>
              <li>Cost: £2-5 per m²</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-2">Cavity Wall Insulation</h4>
            <p className="text-text-secondary mb-2">
              Filling the gap between inner and outer brick layers with foam, mineral wool, or beads. Permanent and unobtrusive.
            </p>
            <ul className="text-text-secondary space-y-1 list-disc list-inside text-xs">
              <li>Saves 33% heat loss</li>
              <li>Only works on cavity walls (post-1920)</li>
              <li>Professional installation required</li>
              <li>Cost: £10-15 per m²</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-2">Solid Wall Insulation</h4>
            <p className="text-text-secondary mb-2">
              For properties with solid brick walls. Internal boards or external render. More complex and expensive.
            </p>
            <ul className="text-text-secondary space-y-1 list-disc list-inside text-xs">
              <li>Saves 35% heat loss</li>
              <li>Internal: reduces room space</li>
              <li>External: maintains room size, more visible</li>
              <li>Cost: £20-35 per m²</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-2">Ground Floor Insulation</h4>
            <p className="text-text-secondary mb-2">
              For suspended floors, adds rigid insulation boards below joists. For concrete slabs, internal rigid boards.
            </p>
            <ul className="text-text-secondary space-y-1 list-disc list-inside text-xs">
              <li>Saves 15% heat loss</li>
              <li>Often overlooked but worthwhile</li>
              <li>Access required from below (hard in flats)</li>
              <li>Cost: £8-15 per m²</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-[12px]">
        <h3 className="text-lg font-bold font-heading text-amber-900 mb-4">💡 Installation Tips</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>Always use MCS-accredited or trusted installers</li>
          <li>Request a survey first to identify suitable insulation types</li>
          <li>Check for damp or condensation issues before insulating</li>
          <li>Ensure adequate ventilation after insulation work</li>
          <li>Many installers offer phased payments to spread costs</li>
          <li>Check local authority grants before starting work</li>
          <li>Ask about warranty periods (typically 25+ years for cavity fill)</li>
          <li>Combine improvements for better results and grant eligibility</li>
        </ul>
      </div>
    </div>
  );
}
