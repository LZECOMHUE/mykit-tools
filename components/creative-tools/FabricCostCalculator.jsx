'use client';

import { useState, useMemo } from 'react';

const inputCls = 'w-full px-3 py-2 text-[13px] bg-white border border-border rounded-[8px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent-muted';
const selectCls = 'w-full px-3 py-2 text-[13px] bg-white border border-border rounded-[8px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent-muted appearance-none cursor-pointer';
const cardCls = 'bg-white border border-border rounded-[var(--radius-card)] p-4';

export default function FabricCostCalculator() {
  const [projectType, setProjectType] = useState('dress');
  const [measurement1, setMeasurement1] = useState(1.5);
  const [measurement2, setMeasurement2] = useState(1.0);
  const [fabricWidth, setFabricWidth] = useState('54');
  const [patternRepeat, setPatternRepeat] = useState(0);
  const [pricePerMetre, setPricePerMetre] = useState(12);

  const projectGuide = {
    dress: { label: 'Dress', hint: 'Length (m) and width needed' },
    curtains: { label: 'Curtains', hint: 'Width (m) and drop/length (m)' },
    quilt: { label: 'Quilt', hint: 'Length (m) and width (m)' },
    bag: { label: 'Bag', hint: 'Width (cm) and height (cm)' },
    cushion: { label: 'Cushion covers', hint: 'Size (cm) - width/height' },
  };

  const fabricWidths = {
    '44': 1.12,
    '54': 1.37,
    '60': 1.52,
  };

  const calculation = useMemo(() => {
    let requiredArea = 0;
    const widthMetres = fabricWidths[fabricWidth];

    if (projectType === 'dress') {
      requiredArea = measurement1 * 1.2;
    } else if (projectType === 'curtains') {
      requiredArea = measurement1 * measurement2 * 1.1;
    } else if (projectType === 'quilt') {
      requiredArea = measurement1 * measurement2;
    } else if (projectType === 'bag') {
      const areaCm = measurement1 * measurement2;
      requiredArea = (areaCm / 10000) * 1.5;
    } else if (projectType === 'cushion') {
      const areaCm = measurement1 * measurement2;
      requiredArea = (areaCm / 10000) * 2;
    }

    let metresNeeded = requiredArea / widthMetres;
    if (patternRepeat > 0) {
      const repeats = Math.ceil(requiredArea / (patternRepeat * 0.01));
      metresNeeded += patternRepeat * 0.01 * repeats;
    }

    const wastePercent = 10;
    const metresWithWaste = metresNeeded * (1 + wastePercent / 100);
    const metresRounded = Math.ceil(metresWithWaste * 4) / 4;

    const yards = (metresRounded * 1.09361).toFixed(2);
    const cost = (metresRounded * pricePerMetre).toFixed(2);

    return {
      requiredArea: requiredArea.toFixed(2),
      metresNeeded: metresNeeded.toFixed(2),
      wastePercent,
      metresWithWaste: metresWithWaste.toFixed(2),
      metresRounded: metresRounded.toFixed(2),
      yards,
      cost,
    };
  }, [projectType, measurement1, measurement2, fabricWidth, patternRepeat, pricePerMetre]);

  return (
    <div className="space-y-4">
      <div className={cardCls}>
        <h2 className="text-text-primary font-heading text-base font-bold mb-4">Project Details</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Project Type</label>
            <select
              className={selectCls}
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              {Object.entries(projectGuide).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
            <p className="text-text-muted text-[11px] mt-1">{projectGuide[projectType].hint}</p>
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Measurement 1</label>
            <input
              type="number"
              className={inputCls}
              min="0"
              step="0.1"
              value={measurement1}
              onChange={(e) => setMeasurement1(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Measurement 2</label>
            <input
              type="number"
              className={inputCls}
              min="0"
              step="0.1"
              value={measurement2}
              onChange={(e) => setMeasurement2(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Fabric Width</label>
            <select className={selectCls} value={fabricWidth} onChange={(e) => setFabricWidth(e.target.value)}>
              <option value="44">44 inches (1.12m)</option>
              <option value="54">54 inches (1.37m)</option>
              <option value="60">60 inches (1.52m)</option>
            </select>
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Pattern Repeat (cm)</label>
            <input
              type="number"
              className={inputCls}
              min="0"
              step="1"
              value={patternRepeat}
              onChange={(e) => setPatternRepeat(parseFloat(e.target.value) || 0)}
            />
            <p className="text-text-muted text-[11px] mt-1">Leave 0 if no repeat</p>
          </div>
          <div>
            <label className="text-[13px] text-text-secondary mb-1 block">Price per Metre ({'\u00a3'})</label>
            <input
              type="number"
              className={inputCls}
              min="0"
              step="0.5"
              value={pricePerMetre}
              onChange={(e) => setPricePerMetre(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-accent rounded-[var(--radius-card)]" style={{ backgroundColor: 'var(--accent-muted)' }}>
        <h2 className="text-text-primary font-heading text-lg font-bold mb-4">Fabric Needed</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-text-secondary text-[11px] mb-1">Base Requirement</p>
            <p className="font-mono text-sm font-bold text-text-primary">{calculation.metresNeeded}m</p>
          </div>
          <div>
            <p className="text-text-secondary text-[11px] mb-1">With {calculation.wastePercent}% Waste</p>
            <p className="font-mono text-sm font-bold text-text-primary">{calculation.metresWithWaste}m</p>
          </div>
          <div>
            <p className="text-text-secondary text-[11px] mb-1">To Buy (rounded)</p>
            <p className="font-mono text-lg font-bold text-accent">{calculation.metresRounded}m</p>
          </div>
          <div>
            <p className="text-text-secondary text-[11px] mb-1">In Yards</p>
            <p className="font-mono text-sm font-bold text-text-primary">{calculation.yards}yd</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-text-secondary text-[11px] mb-2">Total Cost</p>
          <p className="font-mono text-2xl font-bold text-accent">{'\u00a3'}{calculation.cost}</p>
        </div>
      </div>
    </div>
  );
}
