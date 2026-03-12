'use client';

import { useState, useMemo } from 'react';

const UNIT_CONVERSIONS = {
  feet: 1,
  metres: 3.28084,
  centimetres: 0.0328084,
  yards: 3,
};

const PRESETS = {
  bedroom: { name: 'Average UK bedroom', sections: [{ shape: 'rectangle', length: 10, width: 12, unit: 'feet' }] },
  livingRoom: { name: 'Average UK living room', sections: [{ shape: 'rectangle', length: 16, width: 13, unit: 'feet' }] },
  singleGarage: { name: 'Single garage', sections: [{ shape: 'rectangle', length: 8, width: 16, unit: 'feet' }] },
  doubleGarage: { name: 'Double garage', sections: [{ shape: 'rectangle', length: 16, width: 16, unit: 'feet' }] },
  garden: { name: 'Average UK garden', sections: [{ shape: 'rectangle', length: 30, width: 20, unit: 'feet' }] },
};

function convertToFeet(value, fromUnit) {
  return value * UNIT_CONVERSIONS[fromUnit];
}

function calculateSectionArea(section) {
  if (!section.length || !section.width) return 0;

  const lengthFt = convertToFeet(parseFloat(section.length), section.unit);
  const widthFt = convertToFeet(parseFloat(section.width), section.unit);

  switch (section.shape) {
    case 'rectangle':
      return lengthFt * widthFt;
    case 'circle':
      const radiusFt = convertToFeet(parseFloat(section.length), section.unit);
      return Math.PI * radiusFt * radiusFt;
    case 'triangle':
      return (lengthFt * widthFt) / 2;
    case 'trapezoid':
      if (!section.height) return 0;
      const heightFt = convertToFeet(parseFloat(section.height), section.unit);
      return ((lengthFt + widthFt) / 2) * heightFt;
    default:
      return 0;
  }
}

export default function SquareFootageCalculator() {
  const [unitInput, setUnitInput] = useState('feet');
  const [sections, setSections] = useState([
    { id: 1, shape: 'rectangle', length: '', width: '', height: '', unit: 'feet' },
  ]);
  const [nextId, setNextId] = useState(2);
  const [costPerUnit, setCostPerUnit] = useState('');
  const [costUnitType, setCostUnitType] = useState('sqft');
  const [wastagePercent, setWastagePercent] = useState(10);

  const addSection = () => {
    setSections([
      ...sections,
      { id: nextId, shape: 'rectangle', length: '', width: '', height: '', unit: unitInput },
    ]);
    setNextId(nextId + 1);
  };

  const removeSection = (id) => {
    if (sections.length > 1) {
      setSections(sections.filter((s) => s.id !== id));
    }
  };

  const updateSection = (id, field, value) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const applyPreset = (presetKey) => {
    const preset = PRESETS[presetKey];
    setSections(preset.sections.map((s, idx) => ({ ...s, id: idx + 1 })));
    setNextId(preset.sections.length + 1);
  };

  const sectionAreas = useMemo(() => {
    return sections.map((s) => ({ id: s.id, area: calculateSectionArea(s) }));
  }, [sections]);

  const totalAreaSqFt = useMemo(() => {
    return sectionAreas.reduce((sum, s) => sum + s.area, 0);
  }, [sectionAreas]);

  const conversions = useMemo(() => {
    return {
      sqFt: totalAreaSqFt,
      sqM: totalAreaSqFt / 10.764,
      sqYd: totalAreaSqFt / 9,
      sqIn: totalAreaSqFt * 144,
      acres: totalAreaSqFt / 43560,
    };
  }, [totalAreaSqFt]);

  const costCalculation = useMemo(() => {
    if (!costPerUnit || costPerUnit <= 0) return { total: 0, withWastage: 0, breakdown: [] };

    const costPer = parseFloat(costPerUnit);
    let areaForCost = totalAreaSqFt;

    if (costUnitType === 'sqyd') {
      areaForCost = conversions.sqYd;
    } else if (costUnitType === 'sqm') {
      areaForCost = conversions.sqM;
    }

    const baseTotal = areaForCost * costPer;
    const wasteAmount = baseTotal * (wastagePercent / 100);
    const withWastage = baseTotal + wasteAmount;

    const breakdown = sectionAreas.map((s) => {
      let sectionAreaForCost = s.area;
      if (costUnitType === 'sqyd') {
        sectionAreaForCost = s.area / 9;
      } else if (costUnitType === 'sqm') {
        sectionAreaForCost = s.area / 10.764;
      }
      return {
        id: s.id,
        cost: sectionAreaForCost * costPer,
      };
    });

    return { total: baseTotal, withWastage, breakdown };
  }, [costPerUnit, costUnitType, totalAreaSqFt, wastagePercent, conversions, sectionAreas]);

  const getShapeLabel = (shape) => {
    const labels = {
      rectangle: 'Rectangle',
      circle: 'Circle',
      triangle: 'Triangle',
      trapezoid: 'Trapezoid',
    };
    return labels[shape] || shape;
  };

  const getInputLabel = (shape, field) => {
    switch (shape) {
      case 'circle':
        return field === 'length' ? 'Radius' : null;
      case 'triangle':
        return field === 'length' ? 'Base' : 'Height';
      case 'trapezoid':
        return field === 'length' ? 'Base 1' : field === 'width' ? 'Base 2' : 'Height';
      case 'rectangle':
      default:
        return field === 'length' ? 'Length' : 'Width';
    }
  };

  const unitLabel = {
    feet: 'ft',
    metres: 'm',
    centimetres: 'cm',
    yards: 'yd',
  };

  return (
    <div className="space-y-3">
      {/* Unit Selector */}
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
          Measurement Unit
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(UNIT_CONVERSIONS).map((unit) => (
            <button
              key={unit}
              onClick={() => setUnitInput(unit)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                unitInput === unit
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
              }`}
            >
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Shape Sections */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Add Shapes</h2>
        {sections.map((section, idx) => {
          const sectionArea = sectionAreas.find((s) => s.id === section.id)?.area || 0;
          const isCircle = section.shape === 'circle';
          const isTrapezoid = section.shape === 'trapezoid';

          return (
            <div
              key={section.id}
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <div className="flex flex-col md:flex-row md:items-end md:gap-4 gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Shape {idx + 1}
                  </label>
                  <select
                    value={section.shape}
                    onChange={(e) => updateSection(section.id, 'shape', e.target.value)}
                    className="w-full rounded-[var(--radius-input)] border border-[var(--color-border)] bg-white px-3 py-2 text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  >
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                    <option value="triangle">Triangle</option>
                    <option value="trapezoid">Trapezoid</option>
                  </select>
                </div>

                {sections.length > 1 && (
                  <button
                    onClick={() => removeSection(section.id)}
                    className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {/* First input (length/radius/base) */}
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                    {getInputLabel(section.shape, 'length')}
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      value={section.length}
                      onChange={(e) => updateSection(section.id, 'length', e.target.value)}
                      placeholder="0"
                      className="flex-1 rounded-l-[var(--radius-input)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    />
                    <span className="rounded-r-[var(--radius-input)] border border-l-0 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-muted)]">
                      {unitLabel[unitInput]}
                    </span>
                  </div>
                </div>

                {/* Second input (width/height/base2) - hidden for circle */}
                {!isCircle && (
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                      {getInputLabel(section.shape, 'width')}
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        value={section.width}
                        onChange={(e) => updateSection(section.id, 'width', e.target.value)}
                        placeholder="0"
                        className="flex-1 rounded-l-[var(--radius-input)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                      />
                      <span className="rounded-r-[var(--radius-input)] border border-l-0 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-muted)]">
                        {unitLabel[unitInput]}
                      </span>
                    </div>
                  </div>
                )}

                {/* Third input (height - only for trapezoid) */}
                {isTrapezoid && (
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                      Height
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        value={section.height}
                        onChange={(e) => updateSection(section.id, 'height', e.target.value)}
                        placeholder="0"
                        className="flex-1 rounded-l-[var(--radius-input)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                      />
                      <span className="rounded-r-[var(--radius-input)] border border-l-0 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-muted)]">
                        {unitLabel[unitInput]}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Area Result for this section */}
              <div className="rounded-lg bg-blue-50 p-3 border border-blue-100">
                <span className="text-xs text-[var(--color-text-secondary)] block mb-1">
                  {getShapeLabel(section.shape)} Area
                </span>
                <span className="text-lg font-mono-num text-[var(--color-accent)] font-semibold">
                  {sectionArea.toFixed(2)} sq ft
                </span>
              </div>
            </div>
          );
        })}

        <button
          onClick={addSection}
          className="w-full rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-border)] bg-white px-4 py-3 text-center text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
        >
          + Add Another Section
        </button>
      </div>

      {/* Total Area Results */}
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">Total Area</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-white border border-[var(--color-border)] p-4">
            <span className="block text-xs text-[var(--color-text-muted)] mb-2">Square Feet</span>
            <span className="block text-2xl font-semibold text-[var(--color-accent)] font-mono-num">
              {conversions.sqFt.toFixed(0)}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">sq ft</span>
          </div>

          <div className="rounded-lg bg-white border border-[var(--color-border)] p-4">
            <span className="block text-xs text-[var(--color-text-muted)] mb-2">Square Metres</span>
            <span className="block text-lg font-semibold text-[var(--color-text-primary)] font-mono-num">
              {conversions.sqM.toFixed(2)}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">sq m</span>
          </div>

          <div className="rounded-lg bg-white border border-[var(--color-border)] p-4">
            <span className="block text-xs text-[var(--color-text-muted)] mb-2">Square Yards</span>
            <span className="block text-lg font-semibold text-[var(--color-text-primary)] font-mono-num">
              {conversions.sqYd.toFixed(2)}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">sq yd</span>
          </div>

          <div className="rounded-lg bg-white border border-[var(--color-border)] p-4">
            <span className="block text-xs text-[var(--color-text-muted)] mb-2">Square Inches</span>
            <span className="block text-lg font-semibold text-[var(--color-text-primary)] font-mono-num">
              {conversions.sqIn.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">sq in</span>
          </div>

          <div className="rounded-lg bg-white border border-[var(--color-border)] p-4">
            <span className="block text-xs text-[var(--color-text-muted)] mb-2">Acres</span>
            <span className="block text-lg font-semibold text-[var(--color-text-primary)] font-mono-num">
              {conversions.acres.toFixed(4)}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">acres</span>
          </div>
        </div>
      </div>

      {/* Cost Estimator */}
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">Cost Estimator</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Cost Per Unit
            </label>
            <div className="flex">
              <span className="rounded-l-[var(--radius-input)] border border-r-0 border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-muted)]">
                £
              </span>
              <input
                type="number"
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="flex-1 border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
              <select
                value={costUnitType}
                onChange={(e) => setCostUnitType(e.target.value)}
                className="rounded-r-[var(--radius-input)] border border-l-0 border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              >
                <option value="sqft">/ sq ft</option>
                <option value="sqyd">/ sq yd</option>
                <option value="sqm">/ sq m</option>
              </select>
            </div>
          </div>
        </div>

        {/* Wastage Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-[var(--color-text-primary)]">Wastage</label>
            <span className="text-sm font-semibold text-[var(--color-accent)]">{wastagePercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={wastagePercent}
            onChange={(e) => setWastagePercent(parseInt(e.target.value))}
            className="w-full h-2 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
          />
          <div className="flex justify-between mt-2 text-xs text-[var(--color-text-muted)]">
            <span>0%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Cost Results */}
        {costPerUnit && costPerUnit > 0 && (
          <div className="space-y-4">
            {/* Cost Breakdown by Section */}
            {costCalculation.breakdown.length > 1 && (
              <div className="rounded-lg bg-white border border-[var(--color-border)] p-4 mb-4">
                <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase mb-3">
                  Cost by Section
                </h3>
                <div className="space-y-2">
                  {costCalculation.breakdown.map((item, idx) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">Section {idx + 1}</span>
                      <span className="font-mono-num text-[var(--color-text-primary)]">
                        £{item.cost.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Base Cost */}
            <div className="rounded-lg bg-white border border-[var(--color-border)] p-4 mb-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-[var(--color-text-secondary)]">Base Cost</span>
                <span className="text-lg font-semibold text-[var(--color-text-primary)] font-mono-num">
                  £{costCalculation.total.toFixed(2)}
                </span>
              </div>
              {wastagePercent > 0 && (
                <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
                  <span>Wastage ({wastagePercent}%)</span>
                  <span>+ £{(costCalculation.withWastage - costCalculation.total).toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Total with Wastage */}
            <div className="rounded-lg bg-[var(--color-accent)] text-white p-4 font-semibold text-center">
              <div className="text-xs opacity-90 mb-1">Total Including Wastage</div>
              <div className="text-3xl font-mono-num">£{costCalculation.withWastage.toFixed(2)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Presets */}
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Quick Presets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="rounded-[var(--radius-input)] border border-[var(--color-border)] bg-white px-4 py-3 text-left text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
